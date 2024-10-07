import { Plugin } from "obsidian";

export default class AutoStrikethroughTasksPlugin extends Plugin {
  async onload() {
    console.log("AutoStrikethroughTasksPlugin loaded");

    // Register an event listener for editor changes
    this.registerEvent(
      this.app.workspace.on("editor-change", (editor) => {
        const lines = editor.getValue().split("\n");

        // Loop through all lines in the editor
        lines.forEach((line, index) => {
          const trimmedLine = line.trim(); // Remove leading and trailing whitespace
          const indent = line.match(/^\s*/)?.[0] || ""; // Capture leading whitespace (indentation)

          // Case 1: Handle completed tasks (- [x])
          if (trimmedLine.startsWith("- [x]")) {
            // Extract the task content after "- [x]"
            const taskContent = trimmedLine.slice(6).trim(); 

            // If task content is not already struck through, add strikethrough
            if (!taskContent.startsWith("~~") || !taskContent.endsWith("~~")) {
              const newLine = `- [x] ~~${taskContent}~~`;
              editor.setLine(index, indent + newLine); // Preserve indentation
            }
          }

          // Case 2: Handle unchecked tasks (- [ ])
          if (trimmedLine.startsWith("- [ ]")) {
            // Extract the task content after "- [ ]"
            const taskContent = trimmedLine.slice(6).trim();

            // If task is struck through, remove the strikethrough
            if (taskContent.startsWith("~~") && taskContent.endsWith("~~")) {
              const newLine = `- [ ] ${taskContent.slice(2, -2).trim()}`;
              editor.setLine(index, indent + newLine); // Preserve indentation
            }
          }
        });
      })
    );
  }

  onunload() {
    console.log("AutoStrikethroughTasksPlugin unloaded");
  }
}
