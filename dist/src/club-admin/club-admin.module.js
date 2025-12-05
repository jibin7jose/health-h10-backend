"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubAdminModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const club_admin_service_1 = require("./club-admin.service");
const club_admin_controller_1 = require("./club-admin.controller");
let ClubAdminModule = class ClubAdminModule {
};
exports.ClubAdminModule = ClubAdminModule;
exports.ClubAdminModule = ClubAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [club_admin_service_1.ClubAdminService],
        controllers: [club_admin_controller_1.ClubAdminController],
        exports: [club_admin_service_1.ClubAdminService],
    })
], ClubAdminModule);
//# sourceMappingURL=club-admin.module.js.map