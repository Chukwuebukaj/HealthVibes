"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProfessional = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const professionalModel_1 = require("../models/professionalModel");
const jwtsecret = process.env.JWT_SECRET;
const isProfessional = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.cookies.token;
        if (!authorization) {
            return res.redirect("/login");
        }
        let verifiedProfessional = jsonwebtoken_1.default.verify(authorization, jwtsecret);
        if (!verifiedProfessional) {
            return res.redirect("/login");
        }
        const { id } = verifiedProfessional;
        const professional = yield professionalModel_1.ProfessionalInstance.findOne({ where: { id } });
        if (!professional) {
            return res.redirect("/login");
        }
        req.professional = verifiedProfessional;
        next();
    }
    catch (err) {
        return res.redirect("/login");
    }
});
exports.isProfessional = isProfessional;
//# sourceMappingURL=isProfessional.js.map