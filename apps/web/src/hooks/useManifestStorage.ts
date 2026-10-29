"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createEmptyManifest,
  parseManifest,
  serializeManifest,
  type PassportManifest,
} from "@qms-passport/sdk";

const STORAGE_KEY = "qms-passport-manifest-v1";

export function useManifestStorage() {
  const [manifest, setManifest] = useState<PassportManifest>(() => createEmptyManifest());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setManifest(parseManifest(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: PassportManifest) => {
    setManifest(next);
    localStorage.setItem(STORAGE_KEY, serializeManifest(next));
  }, []);

  const markExported = useCallback(() => {
    localStorage.setItem("qms-passport-exported", new Date().toISOString());
  }, []);

  const didExport = hydrated && Boolean(localStorage.getItem("qms-passport-exported"));

  return { manifest, persist, markExported, didExport, hydrated };
}
