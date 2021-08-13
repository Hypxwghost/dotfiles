"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//=== Util ===
const fs = require("fs");
const vscode = require("vscode");
function getRootWorkspacePath() {
    const ws = vscode.workspace;
    const hasWorkspaceRoot = ws && ws.workspaceFolders && ws.workspaceFolders.length > 0;
    return hasWorkspaceRoot ? vscode.workspace.workspaceFolders[0].uri.fsPath : '';
}
exports.getRootWorkspacePath = getRootWorkspacePath;
function fileExists(filePath) {
    try {
        const stat = fs.statSync(filePath);
        return stat.isFile();
    }
    catch (err) {
        return false;
    }
}
exports.fileExists = fileExists;
function dirExists(filePath) {
    try {
        const stat = fs.statSync(filePath);
        return stat.isDirectory();
    }
    catch (err) {
        return false;
    }
}
exports.dirExists = dirExists;
function stripQuotes(s) {
    return s.substr(1, s.length - 2);
}
exports.stripQuotes = stripQuotes;
//# sourceMappingURL=utils.js.map