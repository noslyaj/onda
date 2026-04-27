#!/usr/bin/env node
/**
 * Data-integrity validator for /data/*.json.
 *
 * Fails the build (exit 1) on any integrity error. Silent drift in the
 * JSON seed is the failure mode this script exists to prevent.
 *
 * Zero runtime deps. Run with `npm run validate`.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");

const DATA_STATUS = new Set(["verified", "tentative", "deprecated"]);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?$/;
const GROUPS = new Set(["eastern", "central", "western"]);
const SEASONS = new Set(["year_round", "summer"]);
const FREQUENCIES = new Set(["daily", "frequent", "occasional"]);

const errors = [];
const err = (file, msg) => errors.push(`[${file}] ${msg}`);

async function loadFile(name) {
  const raw = await readFile(join(DATA_DIR, name), "utf8");
  const parsed = JSON.parse(raw);
  if (!parsed._meta || typeof parsed._meta !== "object") {
    err(name, "missing _meta block");
  }
  if (!Array.isArray(parsed.data)) {
    err(name, "missing or non-array 'data' field");
    return { _meta: {}, data: [] };
  }
  return parsed;
}

function checkSlug(file, label, value) {
  if (typeof value !== "string" || !SLUG_RE.test(value)) {
    err(file, `${label} is not a valid ASCII slug: ${JSON.stringify(value)}`);
  }
}

function checkStatus(file, label, value) {
  if (!DATA_STATUS.has(value)) {
    err(file, `${label} has invalid data_status: ${JSON.stringify(value)}`);
  }
}

function checkUniqueIds(file, rows, key = "id") {
  const seen = new Set();
  for (const row of rows) {
    if (seen.has(row[key])) err(file, `duplicate ${key}: ${row[key]}`);
    seen.add(row[key]);
  }
}

const islandsFile = await loadFile("islands.json");
const portsFile = await loadFile("ports.json");
const operatorsFile = await loadFile("operators.json");
const linesFile = await loadFile("lines.json");
const routesFile = await loadFile("routes.json");
const lineRoutesFile = await loadFile("line_routes.json");

const islands = islandsFile.data;
const ports = portsFile.data;
const operators = operatorsFile.data;
const lines = linesFile.data;
const routes = routesFile.data;
const lineRoutes = lineRoutesFile.data;

const islandIds = new Set(islands.map((i) => i.id));
const portIds = new Set(ports.map((p) => p.id));
const operatorIds = new Set(operators.map((o) => o.id));
const lineIds = new Set(lines.map((l) => l.id));
const routeIds = new Set(routes.map((r) => r.id));

// islands
checkUniqueIds("islands.json", islands);
for (const i of islands) {
  checkSlug("islands.json", `island.id`, i.id);
  checkStatus("islands.json", `island ${i.id}`, i.data_status);
  if (!GROUPS.has(i.group)) err("islands.json", `island ${i.id} has invalid group: ${i.group}`);
  if (typeof i.has_ferry_service !== "boolean") {
    err("islands.json", `island ${i.id} has_ferry_service must be boolean`);
  }
  if (i.has_ferry_service === false) {
    if (!i.no_ferry_note_en || !i.no_ferry_note_pt) {
      err("islands.json", `island ${i.id} has_ferry_service=false must carry no_ferry_note_en and no_ferry_note_pt`);
    }
  }
}

// ports
checkUniqueIds("ports.json", ports);
for (const p of ports) {
  checkSlug("ports.json", `port.id`, p.id);
  checkStatus("ports.json", `port ${p.id}`, p.data_status);
  if (!islandIds.has(p.island_id)) {
    err("ports.json", `port ${p.id} references unknown island_id: ${p.island_id}`);
  } else {
    const island = islands.find((i) => i.id === p.island_id);
    if (island && island.has_ferry_service === false) {
      err("ports.json", `port ${p.id} is on island ${p.island_id} which has has_ferry_service=false`);
    }
  }
  if (typeof p.lat !== "number" || typeof p.lon !== "number") {
    err("ports.json", `port ${p.id} lat/lon must be numbers`);
  }
}

// operators
checkUniqueIds("operators.json", operators);
for (const o of operators) {
  checkSlug("operators.json", `operator.id`, o.id);
  checkStatus("operators.json", `operator ${o.id}`, o.data_status);
  try {
    const u = new URL(o.website);
    if (u.protocol !== "https:") err("operators.json", `operator ${o.id} website must be https`);
  } catch {
    err("operators.json", `operator ${o.id} website is not a valid URL: ${o.website}`);
  }
}

// lines
checkUniqueIds("lines.json", lines);
for (const l of lines) {
  checkSlug("lines.json", `line.id`, l.id);
  checkStatus("lines.json", `line ${l.id}`, l.data_status);
  if (!operatorIds.has(l.operator_id)) {
    err("lines.json", `line ${l.id} references unknown operator_id: ${l.operator_id}`);
  }
  if (!SEASONS.has(l.season)) err("lines.json", `line ${l.id} has invalid season: ${l.season}`);
  if (!FREQUENCIES.has(l.frequency)) err("lines.json", `line ${l.id} has invalid frequency: ${l.frequency}`);
  if (!/^#[0-9a-fA-F]{6}$/.test(l.color_hex || "")) {
    err("lines.json", `line ${l.id} has invalid color_hex: ${l.color_hex}`);
  }
}

// routes
checkUniqueIds("routes.json", routes);
for (const r of routes) {
  checkSlug("routes.json", `route.id`, r.id);
  checkStatus("routes.json", `route ${r.id}`, r.data_status);
  if (r.id !== `${r.from_port_id}__${r.to_port_id}`) {
    err("routes.json", `route ${r.id} id does not match {from}__{to} convention`);
  }
  if (r.from_port_id === r.to_port_id) {
    err("routes.json", `route ${r.id} has from_port_id === to_port_id`);
  }
  if (!portIds.has(r.from_port_id)) {
    err("routes.json", `route ${r.id} references unknown from_port_id: ${r.from_port_id}`);
  }
  if (!portIds.has(r.to_port_id)) {
    err("routes.json", `route ${r.id} references unknown to_port_id: ${r.to_port_id}`);
  }
  // No route may touch a no-ferry island (defence in depth; ports.json already checks this).
  for (const portId of [r.from_port_id, r.to_port_id]) {
    const port = ports.find((p) => p.id === portId);
    const island = port && islands.find((i) => i.id === port.island_id);
    if (island && island.has_ferry_service === false) {
      err("routes.json", `route ${r.id} touches port ${portId} on no-ferry island ${island.id}`);
    }
  }
}

// line_routes (composite key: line_id + route_id)
const seenPairs = new Set();
for (const lr of lineRoutes) {
  const key = `${lr.line_id}::${lr.route_id}`;
  if (seenPairs.has(key)) err("line_routes.json", `duplicate mapping: ${key}`);
  seenPairs.add(key);
  checkStatus("line_routes.json", `line_route ${key}`, lr.data_status);
  if (!lineIds.has(lr.line_id)) {
    err("line_routes.json", `mapping ${key} references unknown line_id: ${lr.line_id}`);
  }
  if (!routeIds.has(lr.route_id)) {
    err("line_routes.json", `mapping ${key} references unknown route_id: ${lr.route_id}`);
  }
}

// Orphan reports (informational: routes not mapped to any line).
const mappedRoutes = new Set(lineRoutes.map((lr) => lr.route_id));
for (const r of routes) {
  if (!mappedRoutes.has(r.id) && r.data_status !== "deprecated") {
    err("routes.json", `route ${r.id} is not referenced by any line in line_routes.json`);
  }
}

if (errors.length > 0) {
  console.error(`Data validation FAILED with ${errors.length} error(s):\n`);
  for (const e of errors) console.error("  - " + e);
  console.error("");
  process.exit(1);
}

const counts = {
  islands: islands.length,
  ports: ports.length,
  operators: operators.length,
  lines: lines.length,
  routes: routes.length,
  line_routes: lineRoutes.length,
};
const tentative = {
  routes: routes.filter((r) => r.data_status === "tentative").length,
  line_routes: lineRoutes.filter((lr) => lr.data_status === "tentative").length,
  lines: lines.filter((l) => l.data_status === "tentative").length,
};
console.log("Data validation OK.");
console.log("  counts:    ", JSON.stringify(counts));
console.log("  tentative: ", JSON.stringify(tentative));
