"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPlansController = void 0;
const common_1 = require("@nestjs/common");
const payment_plans_service_1 = require("./payment-plans.service");
const create_payment_plan_dto_1 = require("./dto/create-payment-plan.dto");
let PaymentPlansController = class PaymentPlansController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return await this.service.create(dto);
    }
    async findAll() {
        return await this.service.findAll();
    }
};
exports.PaymentPlansController = PaymentPlansController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_plan_dto_1.CreatePaymentPlanDto]),
    __metadata("design:returntype", Promise)
], PaymentPlansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentPlansController.prototype, "findAll", null);
exports.PaymentPlansController = PaymentPlansController = __decorate([
    (0, common_1.Controller)('payment-plans'),
    __metadata("design:paramtypes", [payment_plans_service_1.PaymentPlansService])
], PaymentPlansController);
//# sourceMappingURL=payment-plans.controller.js.map