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
exports.getProfessionalById = exports.getProfessional = exports.createProfessional = void 0;
const { v4: uuidv4 } = require("uuid");
const professionalModel_1 = require("../models/professionalModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs = require("fs");
var ProfessionalStatus;
(function (ProfessionalStatus) {
    ProfessionalStatus["Pending"] = "Pending";
    ProfessionalStatus["Verified"] = "Verified";
})(ProfessionalStatus || (ProfessionalStatus = {}));
const getProfessional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professionals = yield professionalModel_1.ProfessionalInstance.findAll({
            attributes: { exclude: ["CV", "password"] },
        });
        return res.status(200).json({
            data: professionals,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            err: "Server error",
        });
    }
});
exports.getProfessional = getProfessional;
const getProfessionalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professionalId = req.params.id;
        const professional = yield professionalModel_1.ProfessionalInstance.findByPk(professionalId, {
            attributes: { exclude: ["CV", "password"] }
        });
        if (!professional) {
            return res.status(400).json({
                error: "Professional not found"
            });
        }
        return res.status(200).json({
            data: professional
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            err: "SERVER ERROR"
        });
    }
});
exports.getProfessionalById = getProfessionalById;
const createProfessional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        let fields = req.fields;
        let files = req.files;
        if (fields) {
            let email = fields.email;
            let name = fields.name;
            let availability = fields.availability;
            let rate = fields.rate;
            let phoneNumber = fields.phoneNumber;
            let linkedin = fields.linkedin;
            if (typeof name !== "string") {
                return res.status(400).send("Invalid name");
            }
            if (typeof email !== "string") {
                return res.status(400).send("Invalid email");
            }
            if (typeof availability !== "string") {
                return res.status(400).send("Invalid availabilty");
            }
            if (typeof rate !== "string") {
                return res.status(400).send("Invalid rate");
            }
            if (typeof phoneNumber !== "string") {
                return res.status(400).send("Invalid phone number");
            }
            if (typeof linkedin !== "string") {
                return res.status(400).send("Invalid linkedin");
            }
            let existingUser = yield professionalModel_1.ProfessionalInstance.findOne({
                where: { email },
            });
            if (existingUser) {
                return res.status(404).send("User already exists");
            }
            let password = fields.password;
            if (typeof password !== "string") {
                return res.status(400).send("Invalid password");
            }
            const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
            let fileArray = Array.isArray(files) ? files : [files];
            let cvPath = (_b = (_a = fileArray[0]) === null || _a === void 0 ? void 0 : _a.CV) === null || _b === void 0 ? void 0 : _b.path;
            let imagePath = (_d = (_c = fileArray[0]) === null || _c === void 0 ? void 0 : _c.image) === null || _d === void 0 ? void 0 : _d.path;
            const newProfessional = yield professionalModel_1.ProfessionalInstance.create({
                id: uuidv4(),
                name: name,
                email: email,
                password: encryptedPassword,
                image: imagePath,
                CV: cvPath,
                availability: availability,
                rate: rate,
                phoneNumber: phoneNumber,
                linkedin: linkedin,
                status: ProfessionalStatus.Pending,
            });
            return res.status(201).json({
                message: "Professional has been created",
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createProfessional = createProfessional;
//# sourceMappingURL=professionalController.js.map