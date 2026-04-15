import "dotenv/config";
import { req, ORG_ID, WORKSPACE_ID } from "../lib/kognitos";

async function main() {
  console.log("Verifying Kognitos API connection...\n");

  const path = `/organizations/${ORG_ID}/workspaces/${WORKSPACE_ID}/automations?pageSize=50`;
  const res = await req(path);
  console.log(`Status: ${res.status} ${res.statusText}`);

  if (!res.ok) {
    const body = await res.text();
    console.error("Error response:", body);
    process.exit(1);
  }

  const data = (await res.json()) as {
    automations?: Array<{ name: string; display_name: string; english_code?: string }>;
  };
  const automations = data.automations ?? [];

  console.log(`\nFound ${automations.length} automation(s):\n`);
  for (const a of automations) {
    const id = a.name.split("/").pop();
    console.log(`  • ${a.display_name}  (ID: ${id})`);
  }

  if (automations.length === 0) {
    console.log("  (none yet — use create-automation.ts to create one)");
  }

  console.log("\nConnection verified successfully.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
