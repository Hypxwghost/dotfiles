"use strict";
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
const bash_language_server_1 = require("bash-language-server");
const vscode_languageserver_1 = require("vscode-languageserver");
const connection = vscode_languageserver_1.createConnection(vscode_languageserver_1.ProposedFeatures.all);
connection.onInitialize((params) => __awaiter(void 0, void 0, void 0, function* () {
    connection.console.info('BashLanguageServer initializing...');
    const server = yield bash_language_server_1.default.initialize(connection, params);
    server.register(connection);
    connection.console.info('BashLanguageServer initialized');
    return {
        capabilities: server.capabilities(),
    };
}));
connection.listen();
// Don't die on unhandled Promise rejections
process.on('unhandledRejection', (reason, p) => {
    connection.console.error(`Unhandled Rejection at promise: ${p}, reason: ${reason}`);
});
process.on('SIGPIPE', () => {
    // Don't die when attempting to pipe stdin to a bad spawn
    // https://github.com/electron/electron/issues/13254
});
//# sourceMappingURL=server.js.map