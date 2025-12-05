"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
const paginate = (page = 1, limit = 10) => {
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;
    return { skip, take };
};
exports.paginate = paginate;
//# sourceMappingURL=pagination.util.js.map