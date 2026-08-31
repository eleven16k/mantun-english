/**
 * Mask a phone number for display: `138****8000` (V4 C2-Δ / B1).
 * Single client-side source; the API masks server-side too — raw numbers
 * never need to reach the wire for list views.
 */
export function maskPhone(phone: string | null | undefined): string {
  if (!phone || phone.length < 11) return "";
  return phone.slice(0, 3) + "****" + phone.slice(7);
}
