"use client";

import { useEffect } from "react";
import { kv } from "@/lib/kv";

/**
 * Global URL-parameter bridge (mounted once in the root layout).
 *
 * - ?token=<JWT> — handed over by the marketing site's /login after a
 *   successful simulated-SMS login: store it and strip the query so a
 *   refresh doesn't re-process it.
 * - ?inv=<6 digits> — teacher referral code (V7 F2): stash it; the next
 *   login carries it and the server consumes it on new registrations.
 */
export function BridgeParams() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const inv = params.get("inv");
    if (token && /^[\w-]+\.[\w-]+\.[\w-]+$/.test(token)) {
      kv.setItem("lexi-token", token);
      params.delete("token");
    }
    if (inv && /^\d{6}$/.test(inv)) {
      kv.setItem("lexi-invite", inv);
      params.delete("inv");
    }
    if (token || inv) {
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        window.location.pathname + (qs ? `?${qs}` : "")
      );
    }
  }, []);
  return null;
}
