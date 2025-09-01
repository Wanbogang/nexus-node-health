import { spawn } from "child_process";

function run() {
  const p = spawn("node", ["src/health.js"], { stdio: "inherit" });
  p.on("exit", () => {});
}
run();
setInterval(run, 5 * 60 * 1000); // tiap 5 menit
