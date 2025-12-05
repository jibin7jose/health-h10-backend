"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
const success = (data, message = 'success') => ({
    success: true,
    message,
    data,
});
exports.success = success;
const failure = (message = 'error', errors = null) => ({
    success: false,
    message,
    errors,
});
exports.failure = failure;
//# sourceMappingURL=response.util.js.map