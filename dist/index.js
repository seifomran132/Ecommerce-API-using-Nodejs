"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env = __importStar(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const CategoryRoute_1 = __importDefault(require("./routes/CategoryRoute"));
const ProductRoute_1 = __importDefault(require("./routes/ProductRoute"));
env.config();
const { PORT } = process.env;
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.listen(PORT, () => {
    console.log("Server is running of port ", PORT);
});
(0, database_1.default)();
// Routes
app.use("/category", CategoryRoute_1.default);
app.use("/product", ProductRoute_1.default);
app.get("/", (req, res) => {
    res.send("Hello");
});
