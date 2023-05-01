"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../database/db.config"));
class AppointmentInstance extends sequelize_1.Model {
    static find(arg0) {
        throw new Error("Method not implemented.");
    }
}
exports.AppointmentInstance = AppointmentInstance;
AppointmentInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    serviceType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sessionType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sessionDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    sessionFrequency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    additionalInfo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    },
    // userId: {
    //   type: DataTypes.UUIDV4,
    // },
    professionalId: {
        type: sequelize_1.DataTypes.UUIDV4,
    },
}, {
    sequelize: db_config_1.default,
    tableName: "appointment",
});
exports.default = AppointmentInstance;
//# sourceMappingURL=appointmentModel.js.map