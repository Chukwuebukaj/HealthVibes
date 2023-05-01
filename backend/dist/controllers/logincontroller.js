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
exports.loginUser = exports.RegisterUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const util_1 = require("../utils/util");
const userModel_1 = require("../models/userModel");
const professionalModel_1 = require("../models/professionalModel");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET || "default_secret_key";
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uuid = (0, uuid_1.v4)();
        const { username, email, password, confirm_password, gender, country, city, dob, interest, emergencyContact, } = req.body;
        const validationResult = util_1.registrationSchema.validate(req.body, util_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.details[0].message,
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield userModel_1.UserInstance.findOne({
            where: { email: email },
        });
        if (!user) {
            let newUser = yield userModel_1.UserInstance.create({
                id: uuid,
                username,
                email,
                gender,
                country,
                city,
                dob,
                interest,
                emergencyContact,
                password: hashedPassword,
            });
            const User = (yield userModel_1.UserInstance.findOne({
                where: { email: email },
            }));
            const { id } = User;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, {
                expiresIn: "30mins",
            });
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 30 * 60 * 1000,
            });
            //   return res.redirect("/login");
            return res.status(200).json({ message: "User created successfully" });
        }
        return res.render("RegisterUser", { error: "Email already exists" });
    }
    catch (err) {
        console.error(err);
    }
});
exports.RegisterUser = RegisterUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const resultValidation = util_1.loginSchema.validate(req.body, util_1.options);
        if (resultValidation.error) {
            return res.render("Login", {
                error: resultValidation.error.details[0].message,
            });
        }
        // If user is a client
        const user = (yield userModel_1.UserInstance.findOne({
            where: { email },
        }));
        if (user) {
            const loginValidation = yield bcrypt_1.default.compare(password, user.password);
            if (loginValidation) {
                // return res.redirect("/userdashboard");
                return res.status(200).json({ message: "User logged in Successfully" });
            }
        }
        // If user is a professional
        const professional = (yield professionalModel_1.ProfessionalInstance.findOne({
            where: { email },
        }));
        if (professional) {
            const loginValidation = yield bcrypt_1.default.compare(password, professional.password);
            if (loginValidation) {
                // return res.redirect("/professionaldashboard");
                return res
                    .status(200)
                    .json({ message: "Professional logged in Successfully" });
            }
        }
        // If user is an admin
        const admins = [
            {
                email: "muhammadalkali.muawiya@decagon.dev",
                name: "MM Alkali",
                phone: "+2347080407711",
            },
            {
                email: "favour.adjushi@decagon.dev",
                name: "Favour Adjushi",
                phone: "+2348122788996",
            },
            {
                email: "otonye.amietubodie@decagon.dev",
                name: "Otonye Amietubodie",
                phone: "+2348124015475",
            },
            {
                email: "damilola.adegoke@decagon.dev",
                name: "Damilola Adegoke",
                phone: "+2348188270170",
            },
            {
                email: "chukwuebuka.anunihu@decagon.dev",
                name: "Chukwuebuka Anunihu",
                phone: "+2347064527012",
            },
        ];
        const adminPassword = "ThisIsTheAdminPassword!";
        const admin = admins.find((admin) => admin.email === email && adminPassword === password);
        if (admin) {
            // return res.redirect("/admindashboard");
            return res.status(200).json({ message: "Admin logged in Successfully" });
        }
        res.status(400).json({ error: "Invalid email/password" });
    }
    catch (error) {
        console.error(error);
        return res.json({
            status: 500,
            Error: "Internal server error",
            success: false,
        });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=logincontroller.js.map