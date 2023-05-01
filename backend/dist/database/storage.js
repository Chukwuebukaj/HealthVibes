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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createToken = exports.fileExistence = exports.appendToDatabase = exports.openFile = exports.saveFile = exports.userProfile = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.userProfile = {
    Id: '',
    Name: '',
    email: '',
    gender: '',
    country: '',
    city: '',
    emergencyContact: '',
    interest: '',
    hashedPassword: ''
};
const saveFile = (database) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.stringify(database, null, 2);
    (0, fs_1.writeFile)('database.sqlite', data, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Data saved in Database');
        }
    });
});
exports.saveFile = saveFile;
const openFile = (database) => {
    (0, fs_1.readFile)(database, 'utf-8', (error, data) => {
        if (error) {
            console.log(error);
        }
        else {
            return JSON.parse(data);
        }
    });
};
exports.openFile = openFile;
const appendToDatabase = (database, newData) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = (0, fs_1.existsSync)(database);
    if (exists) {
        const data = JSON.stringify(newData);
        yield (0, promises_1.appendFile)(database, data, 'utf-8');
    }
    else {
        throw new Error;
    }
});
exports.appendToDatabase = appendToDatabase;
const fileExistence = (database) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = (0, fs_1.existsSync)(database);
    return exists;
});
exports.fileExistence = fileExistence;
const createToken = (username, id) => {
    const token = (0, jsonwebtoken_1.sign)({
        username: username,
        id: id
    }, 'thisIsACommonSecret');
    return token;
};
exports.createToken = createToken;
const validateToken = (req, res, next) => {
    try {
        let token = req.cookies['invisibleToken'];
        if (!token) {
            req.authenticated = true;
            res.status(403);
            res.render('login', { errMessage: "Session time Ended, Login again" });
        }
        else {
            let validator = (0, jsonwebtoken_1.verify)(token, "thisIsACommonSecret");
            if (validator) {
                return next();
            }
            else {
                res.render('login');
            }
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
        }
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=storage.js.map