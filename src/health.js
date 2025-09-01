import "dotenv/config";
import psList from "ps-list";
import fs from "fs";

const NODE_PROCESS_NAME = process.env.NODE_PROCESS_NAME || "nexus-cli";
const LOG_PATH = process.env.LOG_PATH || "./sample.log";
const WALLET = process.env.WALLET_ADDRESS || "0x0000000000000000000000000000000000000000";

async function checkProcess() {
  const list = await psList();
  const proc = list.find(p => (p.name || "").includes(NODE_PROCESS_NAME));
  return proc ? { ok: true, pid: proc.pid } : { ok: false };
}

function readProofsFromLog() {
  try {
    if (!fs.existsSync(LOG_PATH)) return { ok: false, count: 0, note: "log not found" };
    const txt = fs.readFileSync(LOG_PATH, "utf8");
    const matches = txt.match(/proof submitted/gi) || [];
    return { ok: true, count: matches.length };
  } catch (e) {
    return { ok: false, count: 0, note: e.message };
  }
}

(async () => {
  console.log("[Node Health Checker]");
  const proc = await checkProcess();
  console.log(proc.ok ? `✔ Process running: ${NODE_PROCESS_NAME} (PID ${proc.pid})` : `❌ Process not found: ${NODE_PROCESS_NAME}`);

  const proofs = readProofsFromLog();
  console.log(proofs.ok ? `✔ Proofs found in log: ${proofs.count}` : `⚠ Cannot read log (${proofs.note || "unknown error"})`);

  console.log(`Explorer: https://testnet3.explorer.nexus.xyz/address/${WALLET}`);
})();
