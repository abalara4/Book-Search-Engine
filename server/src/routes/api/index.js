"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var user_routes_js_1 = require("./user-routes.js");
router.use('/users', user_routes_js_1.default);
exports.default = router;
