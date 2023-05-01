"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.AppointmentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.AppointmentSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    fullName: joi_1.default.string().required(),
    sessionType: joi_1.default.string().required(),
    serviceType: joi_1.default.string().required(),
    sessionDate: joi_1.default.string().required(),
    sessionFrequency: joi_1.default.string().required(),
    additionalInfo: joi_1.default.string(),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
//# sourceMappingURL=appointmentUtils.js.map