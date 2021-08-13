"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser = require("csv-parse/lib/sync");
const os_1 = require("os");
const vscode = require("vscode");
const PMD_COLUMNS = [
    'problem',
    'package',
    'file',
    'priority',
    'line',
    'description',
    'ruleSet',
    'rule',
];
function parsePmdCsv(csv) {
    let results;
    const parseOpts = {
        columns: PMD_COLUMNS,
        // eslint-disable-next-line @typescript-eslint/camelcase
        relax_column_count: true,
    };
    try {
        results = parser(csv, parseOpts);
    }
    catch (e) {
        //try to recover parsing... remove last ln and try again
        const lines = csv.split(os_1.EOL);
        lines.pop();
        csv = lines.join(os_1.EOL);
        try {
            results = parser(csv, parseOpts);
        }
        catch (e) {
            throw new Error('Failed to parse PMD Results.  Enable please logging (STDOUT & STDERROR) and submit an issue if this problem persists.');
        }
        vscode.window.showWarningMessage('Failed to read all PMD problems!');
    }
    return results;
}
exports.parsePmdCsv = parsePmdCsv;
//# sourceMappingURL=pmdCsvParser.js.map