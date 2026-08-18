"use client";

import { useEffect } from "react";

export function DevtoolsGreeting() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const label = "%c hey. ";
    const rest = "%c you opened devtools. i respect that.\nemail: rakhiagr2020@gmail.com";
    console.log(
      label + rest,
      "background:#e8a038;color:#0a0d14;font-weight:700;padding:4px 8px;border-radius:3px;font-family:JetBrains Mono, monospace",
      "color:#f5f1e8;font-family:JetBrains Mono, monospace;padding-left:8px",
    );
  }, []);
  return null;
}
