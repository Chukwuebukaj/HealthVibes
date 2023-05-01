"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_formidable_1 = __importDefault(require("express-formidable"));
const professionalController_1 = require("../controllers/professionalController");
router.get("/professional", professionalController_1.getProfessional);
router.get("/professional/:id", professionalController_1.getProfessionalById);
router.post("/registerprofessional", (0, express_formidable_1.default)(), professionalController_1.createProfessional);
exports.default = router;
//# sourceMappingURL=professionalRoutes.js.map