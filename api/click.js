/**
 * POST /api/click — log an outbound booking-intent click.
 *
 * Design constraints (see project brief):
 *   - The site is currently non-commercial. No affiliate IDs, no revenue-
 *     earning parameters. This endpoint must not mutate the destination URL.
 *   - Booking links go only to Atlânticoline and DirectFerries. Any other
 *     destination is rejected so the endpoint cannot be abused as an open
 *     redirect or arbitrary event logger.
 *   - Telemetry is forwarded to Plausible as a custom event. Plausible is
 *     already in the Ondas stack. No new data store is introduced.
 *   - The client navigates to the destination in parallel; this endpoint's
 *     latency never blocks user navigation. A telemetry failure must not
 *     break the user's click.
 *
 * Request body:
 *   {
 *     "destination_url": "https://www.atlanticoline.pt/...",
 *     "route_id":   "horta__madalena" | null,
 *     "line_id":    "blue" | null,
 *     "source_page": "/routes/horta-madalena" | null
 *   }
 *
 * Responses:
 *   204 on accepted-and-forwarded (or accepted with telemetry disabled)
 *   400 on malformed input or disallowed destination
 *   405 on non-POST
 */

const ALLOWED_HOSTS = new Set([
  "atlanticoline.pt",
  "www.atlanticoline.pt",
  "directferries.com",
  "www.directferries.com",
]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const { destination_url, route_id, line_id, source_page } = body;

  if (typeof destination_url !== "string") {
    res.status(400).json({ error: "destination_url_required" });
    return;
  }

  let destUrl;
  try {
    destUrl = new URL(destination_url);
  } catch {
    res.status(400).json({ error: "destination_url_invalid" });
    return;
  }

  if (destUrl.protocol !== "https:" || !ALLOWED_HOSTS.has(destUrl.hostname)) {
    res.status(400).json({ error: "destination_host_not_allowed" });
    return;
  }

  const domain = process.env.PLAUSIBLE_DOMAIN;
  if (domain) {
    try {
      await fetch("https://plausible.io/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": req.headers["user-agent"] || "ondas-azores",
          "X-Forwarded-For": req.headers["x-forwarded-for"] || "",
        },
        body: JSON.stringify({
          name: "outbound_click",
          url: typeof source_page === "string" ? source_page : `https://${domain}/`,
          domain,
          props: {
            destination_host: destUrl.hostname,
            route_id: typeof route_id === "string" ? route_id : "",
            line_id: typeof line_id === "string" ? line_id : "",
          },
        }),
      });
    } catch {
      // Telemetry is best-effort; never block the user on a failure here.
    }
  }

  res.status(204).end();
}
