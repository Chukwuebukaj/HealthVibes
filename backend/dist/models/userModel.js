"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../database/db.config"));
const appointmentModel_1 = require("./appointmentModel");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    dob: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    gender: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    country: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    city: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    interest: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    emergencyContact: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    sequelize: db_config_1.default,
    tableName: "user",
});
exports.default = UserInstance;
UserInstance.hasMany(appointmentModel_1.AppointmentInstance, {
    foreignKey: "userId",
    as: "appointment",
});
appointmentModel_1.AppointmentInstance.belongsTo(UserInstance, {
    foreignKey: "userId",
    as: "user",
});
//# sourceMappingURL=userModel.js.map