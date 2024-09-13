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
          // Case 1: Handle completed tasks (- [x])
          if (line.startsWith("- [x]") && !line.includes("~~")) {
            // Add strikethrough if task is marked completed and not already struck through
            const newLine = line.replace(
              /^- \[x\] (.*)$/,
              "- [x] ~~$1~~"
            );
            editor.setLine(index, newLine);
          }

          // Case 2: Handle unchecked tasks (- [ ])
          if (line.startsWith("- [ ]") && line.includes("~~")) {
            // Remove strikethrough if task is unchecked
            const newLine = line.replace(
              /^- \[ \] ~~(.*)~~$/,
              "- [ ] $1"
            );
            editor.setLine(index, newLine);
          }
        });
      })
    );
  }

  onunload() {
    console.log("AutoStrikethroughTasksPlugin unloaded");
  }
}
