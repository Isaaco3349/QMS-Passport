# Contributing

QMS Passport is an open public good for the QMS Testnet ecosystem. Contributions welcome.

## Setup

```bash
pnpm install
pnpm build
```

Contracts:

```powershell
cd packages/contracts; forge test
```

On Windows PowerShell 5.x, use `;` instead of `&&` to chain commands.

## Pull requests

- Keep changes scoped to QMS Testnet correctness and documented APIs.
- Do not commit private keys or mainnet deployment manifests with secrets.
- Update `docs/INTEGRATIONS.md` when adding new external contract addresses.

## Collaboration with QMS core team

If you are from QMS and want to co-maintain or link Passport from official onboarding, open an issue or contact the maintainers listed in the application draft.
