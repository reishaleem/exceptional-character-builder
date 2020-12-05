"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var app = express_1.default();
var port = process.env.PORT;
app.use(cors_1.default());
app.use(express_1.default.json());
app.listen(port, function () {
    console.log("Server is running on port " + port);
});
//# sourceMappingURL=server.js.map