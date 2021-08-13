"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamplesFeature = void 0;
const path = require("path");
const vscode = require("vscode");
class ExamplesFeature {
    constructor() {
        this.examplesPath = path.resolve(__dirname, "../../../examples");
        this.command = vscode.commands.registerCommand("PowerShell.OpenExamplesFolder", () => {
            vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file(this.examplesPath), true);
        });
    }
    dispose() {
        this.command.dispose();
    }
}
exports.ExamplesFeature = ExamplesFeature;
//# sourceMappingURL=Examples.js.map