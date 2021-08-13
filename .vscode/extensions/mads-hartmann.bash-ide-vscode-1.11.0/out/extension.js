'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const explainshellEndpoint = vscode_1.workspace
            .getConfiguration('bashIde')
            .get('explainshellEndpoint', '');
        const globPattern = vscode_1.workspace.getConfiguration('bashIde').get('globPattern', '');
        const highlightParsingErrors = vscode_1.workspace
            .getConfiguration('bashIde')
            .get('highlightParsingErrors', false);
        const env = Object.assign(Object.assign({}, process.env), { EXPLAINSHELL_ENDPOINT: explainshellEndpoint, GLOB_PATTERN: globPattern, HIGHLIGHT_PARSING_ERRORS: highlightParsingErrors });
        const serverExecutable = {
            module: context.asAbsolutePath(path.join('out', 'server.js')),
            transport: vscode_languageclient_1.TransportKind.ipc,
            options: {
                env,
            },
        };
        const debugServerExecutable = Object.assign(Object.assign({}, serverExecutable), { options: Object.assign(Object.assign({}, serverExecutable.options), { execArgv: ['--nolazy', '--inspect=6009'] }) });
        const serverOptions = {
            run: serverExecutable,
            debug: debugServerExecutable,
        };
        const clientOptions = {
            documentSelector: [
                {
                    scheme: 'file',
                    language: 'shellscript',
                },
            ],
            synchronize: {
                configurationSection: 'Bash IDE',
                // Notify the server about file changes to '.clientrc files contain in the workspace
                fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc'),
            },
        };
        const client = new vscode_languageclient_1.LanguageClient('Bash IDE', 'Bash IDE', serverOptions, clientOptions);
        // Push the disposable to the context's subscriptions so that the
        // client can be deactivated on extension deactivation
        context.subscriptions.push(client.start());
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map