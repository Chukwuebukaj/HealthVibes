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
exports.isUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const jwtsecret = process.env.JWT_SECRET;
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.cookies.token;
        if (!authorization) {
            return res.redirect("/login");
        }
        let verifiedUser = jsonwebtoken_1.default.verify(authorization, jwtsecret);
        if (!verifiedUser) {
            return res.redirect("/login");
        }
        const { id } = verifiedUser;
        const user = yield userModel_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.redirect("/registrationuser");
        }
        req.user = verifiedUser;
        next();
    }
    catch (err) {
        return res.redirect("/login");
    }
});
exports.isUser = isUser;
//# sourceMappingURL=isUser.js.map