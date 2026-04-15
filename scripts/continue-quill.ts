import "dotenv/config";
import { AUTOMATION_ID } from "../lib/kognitos";
import { createQuillThread, askQuill } from "../lib/quill";

const message = process.argv[2];
if (!message) {
  console.error("Usage: npx tsx scripts/continue-quill.ts \"your message to Quill\"");
  console.error('Example: npx tsx scripts/continue-quill.ts "The IDP connection is now set up. Please build the automation."');
  process.exit(1);
}

if (!AUTOMATION_ID) {
  console.error("KOGNITOS_AUTOMATION_ID not set in .env. Run create-automation.ts first.");
  process.exit(1);
}

async function main() {
  console.log(`Automation: ${AUTOMATION_ID}`);
  console.log(`Message: ${message}\n`);

  console.log("Creating Quill thread...");
  const threadId = await createQuillThread(AUTOMATION_ID!);
  console.log(`Thread: ${threadId}\n`);

  console.log("Sending message to Quill...\n");
  const result = await askQuill(threadId, message);

  if (result.thinkingSteps.length > 0) {
    console.log("Thinking steps:");
    for (const step of result.thinkingSteps) {
      console.log(`  - ${step.slice(0, 150)}`);
    }
    console.log();
  }

  console.log("Answer:");
  console.log(result.answer);
  console.log();

  if (result.spyCode.length > 0) {
    console.log(`Generated ${result.spyCode.length} code block(s):`);
    for (const block of result.spyCode) {
      console.log(`\n--- Code Block (${block.toolCallId}) ---`);
      console.log(block.code);
    }
  }

  if (result.executionIds.length > 0) {
    console.log(`\nExecution IDs: ${result.executionIds.join(", ")}`);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
