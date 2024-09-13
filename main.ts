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
          // Case 1: Handle completed tasks (- [x])
          if (trimmedLine.startsWith("- [x]") && !trimmedLine.includes("~~")) {
            // Add strikethrough if task is marked completed and not already struck through
            const newLine = trimmedLine.replace(
              /^- \[x\] (.*)$/,
              "- [x] ~~$1~~"
            );
            editor.setLine(index, newLine.trim());
          }

          // Case 2: Handle unchecked tasks (- [ ])
          if (line.startsWith("- [ ]") && line.includes("~~")) {
            // Remove strikethrough if task is unchecked
            const newLine = line.replace(
              /^- \[ \] ~~(.*)~~$/,
              "- [ ] $1"
            );
            editor.setLine(index, newLine.trim());
          }
        });
      })
    );
  }

  onunload() {
    console.log("AutoStrikethroughTasksPlugin unloaded");
  }
}
