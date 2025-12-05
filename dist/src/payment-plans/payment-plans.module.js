"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPlansModule = void 0;
const common_1 = require("@nestjs/common");
const payment_plans_controller_1 = require("./payment-plans.controller");
const payment_plans_service_1 = require("./payment-plans.service");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentPlansModule = class PaymentPlansModule {
};
exports.PaymentPlansModule = PaymentPlansModule;
exports.PaymentPlansModule = PaymentPlansModule = __decorate([
    (0, common_1.Module)({
        controllers: [payment_plans_controller_1.PaymentPlansController],
        providers: [payment_plans_service_1.PaymentPlansService, prisma_service_1.PrismaService],
    })
], PaymentPlansModule);
//# sourceMappingURL=payment-plans.module.js.map