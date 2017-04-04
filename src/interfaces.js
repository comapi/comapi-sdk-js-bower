/**
 * Log level enum
 */
(function (LogLevels) {
    LogLevels[LogLevels["None"] = 0] = "None";
    LogLevels[LogLevels["Error"] = 1] = "Error";
    LogLevels[LogLevels["Warn"] = 2] = "Warn";
    LogLevels[LogLevels["Debug"] = 3] = "Debug";
})(exports.LogLevels || (exports.LogLevels = {}));
var LogLevels = exports.LogLevels;
;
/**
 * Log persistence enum
 */
(function (LogPersistences) {
    LogPersistences[LogPersistences["None"] = 0] = "None";
    LogPersistences[LogPersistences["IndexedDB"] = 1] = "IndexedDB";
    LogPersistences[LogPersistences["LocalStorage"] = 2] = "LocalStorage";
})(exports.LogPersistences || (exports.LogPersistences = {}));
var LogPersistences = exports.LogPersistences;
;
;
;
;
/**
 * Environment enum
 */
(function (Environment) {
    Environment[Environment["development"] = 0] = "development";
    Environment[Environment["production"] = 1] = "production";
})(exports.Environment || (exports.Environment = {}));
var Environment = exports.Environment;
;
;
;
/**
 * Log level enum
 */
(function (ConversationScope) {
    ConversationScope[ConversationScope["public"] = 0] = "public";
    ConversationScope[ConversationScope["participant"] = 1] = "participant";
})(exports.ConversationScope || (exports.ConversationScope = {}));
var ConversationScope = exports.ConversationScope;
;
//# sourceMappingURL=interfaces.js.map