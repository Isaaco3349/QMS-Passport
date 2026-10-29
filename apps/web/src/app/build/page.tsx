"use client";

import { useState } from "react";
import { serializeManifest, type DeploymentEntry } from "@qms-passport/sdk";
import { useManifestStorage } from "@/hooks/useManifestStorage";

export default function BuildPage() {
  const { manifest, persist, markExported } = useManifestStorage();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  function addDeployment() {
    if (!name.trim() || !address.startsWith("0x")) return;
    const entry: DeploymentEntry = {
      name: name.trim(),
      address: address as `0x${string}`,
    };
    persist({
      ...manifest,
      exportedAt: new Date().toISOString(),
      deployments: [...manifest.deployments, entry],
    });
    setName("");
    setAddress("");
  }

  function downloadManifest() {
    const json = serializeManifest({ ...manifest, exportedAt: new Date().toISOString() });
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qms-passport-manifest.json";
    a.click();
    URL.revokeObjectURL(url);
    markExported();
  }

  return (
    <main>
      <section className="hero">
        <h1>Migration Kit</h1>
        <p className="lead">
          Register contract deployments and export a <code>passport-manifest/v1</code> file before
          the testnet reset. Redeploy on the new testnet with Foundry scripts in{" "}
          <code>packages/contracts</code>.
        </p>
      </section>

      <div className="card">
        <h2>Add deployment</h2>
        <div className="field">
          <label htmlFor="dep-name">Contract name</label>
          <input id="dep-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="MyToken" />
        </div>
        <div className="field">
          <label htmlFor="dep-addr">Address</label>
          <input
            id="dep-addr"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x…"
          />
        </div>
        <button type="button" className="btn primary" onClick={addDeployment}>
          Add to manifest
        </button>
      </div>

      <div className="card">
        <h2>Saved deployments ({manifest.deployments.length})</h2>
        {manifest.deployments.length === 0 ? (
          <p className="muted">No deployments yet. Paste addresses from QMSScan after deploy.</p>
        ) : (
          <ul className="steps">
            {manifest.deployments.map((d) => (
              <li key={`${d.name}-${d.address}`}>
                <div className="step-body">
                  <strong>{d.name}</strong>
                  <p className="mono">{d.address}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p style={{ marginTop: "1rem" }}>
          <button type="button" className="btn primary" onClick={downloadManifest} disabled={!manifest.deployments.length}>
            Download manifest JSON
          </button>
        </p>
      </div>
    </main>
  );
}
