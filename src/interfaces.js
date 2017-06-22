"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevels;
(function (LogLevels) {
    LogLevels[LogLevels["None"] = 0] = "None";
    LogLevels[LogLevels["Error"] = 1] = "Error";
    LogLevels[LogLevels["Warn"] = 2] = "Warn";
    LogLevels[LogLevels["Debug"] = 3] = "Debug";
})(LogLevels = exports.LogLevels || (exports.LogLevels = {}));
;
var LogPersistences;
(function (LogPersistences) {
    LogPersistences[LogPersistences["None"] = 0] = "None";
    LogPersistences[LogPersistences["IndexedDB"] = 1] = "IndexedDB";
    LogPersistences[LogPersistences["LocalStorage"] = 2] = "LocalStorage";
})(LogPersistences = exports.LogPersistences || (exports.LogPersistences = {}));
;
;
;
;
var Environment;
(function (Environment) {
    Environment[Environment["development"] = 0] = "development";
    Environment[Environment["production"] = 1] = "production";
})(Environment = exports.Environment || (exports.Environment = {}));
;
;
;
var ConversationScope;
(function (ConversationScope) {
    ConversationScope[ConversationScope["public"] = 0] = "public";
    ConversationScope[ConversationScope["participant"] = 1] = "participant";
})(ConversationScope = exports.ConversationScope || (exports.ConversationScope = {}));
;
//# sourceMappingURL=interfaces.js.map