"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');
exports.default = mongoose_1.default.connection;
