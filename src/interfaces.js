"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationScope = exports.Environment = exports.OrphanedEventPersistences = exports.LogPersistences = exports.LogLevels = void 0;
/**
 * Log level enum
 */
var LogLevels;
(function (LogLevels) {
    LogLevels[LogLevels["None"] = 0] = "None";
    LogLevels[LogLevels["Error"] = 1] = "Error";
    LogLevels[LogLevels["Warn"] = 2] = "Warn";
    LogLevels[LogLevels["Debug"] = 3] = "Debug";
})(LogLevels = exports.LogLevels || (exports.LogLevels = {}));
;
/**
 * Log persistence enum
 */
var LogPersistences;
(function (LogPersistences) {
    LogPersistences[LogPersistences["None"] = 0] = "None";
    LogPersistences[LogPersistences["IndexedDB"] = 1] = "IndexedDB";
    LogPersistences[LogPersistences["LocalStorage"] = 2] = "LocalStorage";
})(LogPersistences = exports.LogPersistences || (exports.LogPersistences = {}));
;
/**
 * Log persistence enum
 */
var OrphanedEventPersistences;
(function (OrphanedEventPersistences) {
    OrphanedEventPersistences[OrphanedEventPersistences["None"] = 0] = "None";
    OrphanedEventPersistences[OrphanedEventPersistences["IndexedDbIfSupported"] = 1] = "IndexedDbIfSupported";
    OrphanedEventPersistences[OrphanedEventPersistences["LocalStorage"] = 2] = "LocalStorage"; // force local storage
})(OrphanedEventPersistences = exports.OrphanedEventPersistences || (exports.OrphanedEventPersistences = {}));
;
;
;
;
/**
 * Environment enum
 */
var Environment;
(function (Environment) {
    Environment[Environment["development"] = 0] = "development";
    Environment[Environment["production"] = 1] = "production";
})(Environment = exports.Environment || (exports.Environment = {}));
;
;
;
;
;
/**
 * Log level enum
 */
var ConversationScope;
(function (ConversationScope) {
    ConversationScope[ConversationScope["public"] = 0] = "public";
    ConversationScope[ConversationScope["participant"] = 1] = "participant";
})(ConversationScope = exports.ConversationScope || (exports.ConversationScope = {}));
;
//# sourceMappingURL=interfaces.js.map