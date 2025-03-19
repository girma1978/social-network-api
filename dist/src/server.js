"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./config/connection"));
const index_1 = __importDefault(require("./routes/api/index"));
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
// Middleware for parsing JSON and urlencoded form data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Use API routes
app.use('/api', index_1.default);
// Start server after DB connection
connection_1.default.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
