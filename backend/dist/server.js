"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_config_1 = __importDefault(require("./database/db.config"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const userRoutes_1 = __importDefault(require("../src/routes/userRoutes"));
const appointmentRoute_1 = __importDefault(require("./routes/appointmentRoute"));
const professionalRoutes_1 = __importDefault(require("../src/routes/professionalRoutes"));
const cors_1 = __importDefault(require("cors"));
db_config_1.default.sync()
    .then(() => {
    console.log("database connected successfully");
})
    .catch((err) => {
    console.log(err);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/admin", adminRoute_1.default);
app.use("/", userRoutes_1.default);
app.use("/appointment", appointmentRoute_1.default);
app.use("/", professionalRoutes_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map