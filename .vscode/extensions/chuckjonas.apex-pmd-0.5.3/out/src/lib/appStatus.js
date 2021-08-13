"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class AppStatus {
    constructor() {
        this._appStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 5);
        this._appStatus.text = AppStatus._okMsg;
        this._appStatus.command = AppStatus.DEFAULT_COMMAND;
        this._appStatus.show();
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            this._appStatus.hide();
            this._isHidden = true;
        }
        else {
            this._appStatus.show();
            this._isHidden = false;
        }
    }
    static get _thinkingMsg() {
        return `${AppStatus._appName} ${AppStatus.APP_THINKING_ICON}`;
    }
    static get _errorsMsg() {
        return `${AppStatus._appName} ${AppStatus.APP_HAS_ERR_ICON}`;
    }
    static get _okMsg() {
        return `${AppStatus._appName} ${AppStatus.APP_IS_OK_ICON}`;
    }
    static setAppName(newAppName) {
        // should only be called once. Further calls change nothing
        AppStatus._appName = AppStatus._appName || newAppName;
    }
    static getInstance() {
        if (AppStatus._instance == null) {
            AppStatus._instance = AppStatus.create();
        }
        return AppStatus._instance;
    }
    static create() {
        return new AppStatus();
    }
    show() {
        if (this._isHidden) {
            this._appStatus.text = AppStatus._okMsg;
            this._appStatus.show();
            this._isHidden = false;
        }
    }
    hide() {
        this._appStatus.hide();
        this._isHidden = true;
    }
    thinking() {
        this._appStatus.text = AppStatus._thinkingMsg;
    }
    errors() {
        this._appStatus.text = AppStatus._errorsMsg;
    }
    ok() {
        this._appStatus.text = AppStatus._okMsg;
    }
    dispose() {
        this._appStatus.dispose();
    }
}
exports.AppStatus = AppStatus;
AppStatus.DEFAULT_COMMAND = 'workbench.actions.view.problems';
AppStatus.APP_THINKING_ICON = `$(clock)`;
AppStatus.APP_IS_OK_ICON = `$(check)`;
AppStatus.APP_HAS_ERR_ICON = `$(alert)`;
AppStatus._instance = null;
//# sourceMappingURL=appStatus.js.map