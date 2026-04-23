/**
 * Shared JSDoc typedefs for /data/*.json.
 *
 * Every JSON file in /data/ has the shape:
 *   { "_meta": FileMeta, "data": T[] }
 * where T is one of the typedefs below.
 *
 * Record IDs are stable ASCII slugs (lowercase, hyphens). They flow
 * through to URLs and will become primary keys when this data is
 * migrated to SQL. Do not rename an ID without a deprecation path.
 */

/**
 * @typedef {"verified" | "tentative" | "deprecated"} DataStatus
 *   - verified: confirmed against an Atlânticoline PDF or other primary source.
 *   - tentative: best-guess pending primary-source verification. Must be
 *     surfaced visually in the UI (never hidden in code).
 *   - deprecated: kept for URL/slug stability, no longer active.
 */

/**
 * @typedef {Object} FileMeta
 * @property {string} source - Where the data was compiled from.
 * @property {string} compiled_at - ISO date (YYYY-MM-DD).
 * @property {string | null} verified_against - Name of the PDF/page this
 *   file was last verified against, or null if not yet verified.
 * @property {string} notes - Free-form provenance notes.
 */

/**
 * @typedef {Object} Island
 * @property {string} id - ASCII slug, e.g. "sao-miguel".
 * @property {string} name_en
 * @property {string} name_pt
 * @property {"eastern" | "central" | "western"} group
 * @property {boolean} has_ferry_service - False for São Miguel and Santa Maria.
 * @property {string | null} no_ferry_note_en - Shown when the island is
 *   selected in a dropdown but has no service. Null if has_ferry_service.
 * @property {string | null} no_ferry_note_pt
 * @property {DataStatus} data_status
 * @property {string | null} notes
 */

/**
 * @typedef {Object} Port
 * @property {string} id - ASCII slug, e.g. "praia-da-vitoria".
 * @property {string} island_id - FK islands.id.
 * @property {string} name_en
 * @property {string} name_pt
 * @property {number} lat - Approximate harbour latitude.
 * @property {number} lon - Approximate harbour longitude.
 * @property {DataStatus} data_status
 * @property {string | null} notes
 */

/**
 * @typedef {Object} Operator
 * @property {string} id
 * @property {string} name
 * @property {string} website - Used for outbound booking links. Must resolve
 *   to an allowed host in api/click.js.
 * @property {string | null} phone
 * @property {string | null} email
 * @property {DataStatus} data_status
 * @property {string | null} notes
 */

/**
 * @typedef {Object} Line
 * @property {string} id - Color slug, e.g. "blue", "pink".
 * @property {string} operator_id - FK operators.id.
 * @property {string} name_en - e.g. "Blue Line".
 * @property {string} name_pt
 * @property {string} color_hex
 * @property {"year_round" | "summer"} season
 * @property {"daily" | "frequent" | "occasional"} frequency
 * @property {string} description_en
 * @property {string} description_pt
 * @property {DataStatus} data_status
 * @property {string | null} notes
 */

/**
 * @typedef {Object} Route
 * @property {string} id - "{from_port_id}__{to_port_id}". Double underscore
 *   keeps slugs that already contain single hyphens unambiguous.
 * @property {string} from_port_id - FK ports.id.
 * @property {string} to_port_id - FK ports.id. Must differ from from_port_id.
 * @property {DataStatus} data_status
 * @property {string | null} notes
 */

/**
 * @typedef {Object} LineRoute
 * @property {string} line_id - FK lines.id.
 * @property {string} route_id - FK routes.id.
 * @property {DataStatus} data_status - Uncertainty about whether this line
 *   actually operates this route lives here, independent of whether the
 *   route itself is operated at all.
 * @property {string | null} notes
 */

export {};
