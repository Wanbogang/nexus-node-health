# Nexus Node Health (MVP)

A tiny CLI to help Nexus Testnet III users check local node health (process up/down), count proofs in logs, and jump to explorer for the configured wallet.

## Why
Official web dashboards can lag or miss updates. This tool gives a quick local sanity check.

## Usage
1) Copy `.env.example` to `.env` and set:
   - NODE_PROCESS_NAME=nexus-cli
   - LOG_PATH=/path/to/your/nexus.log
   - WALLET_ADDRESS=0xYOUR_WALLET_HERE
2) Run:
   ```bash
   npm start


