"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalInstance = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../database/db.config"));
const appointmentModel_1 = __importDefault(require("./appointmentModel"));
class ProfessionalInstance extends sequelize_1.Model {
}
exports.ProfessionalInstance = ProfessionalInstance;
ProfessionalInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    image: { type: sequelize_1.DataTypes.BLOB, allowNull: true },
    CV: { type: sequelize_1.DataTypes.BLOB, allowNull: true },
    availability: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    rate: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    phoneNumber: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    linkedin: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    status: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    sequelize: db_config_1.default,
    tableName: "professional",
});
ProfessionalInstance.hasMany(appointmentModel_1.default, {
    foreignKey: "professionalId",
    as: "appointment",
    sourceKey: "id",
});
appointmentModel_1.default.belongsTo(ProfessionalInstance, {
    foreignKey: "professionalId",
    as: "professional",
    targetKey: "id",
});
//# sourceMappingURL=professionalModel.js.map