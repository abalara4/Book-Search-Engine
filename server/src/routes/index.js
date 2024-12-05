"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var node_path_1 = require("node:path");
var node_url_1 = require("node:url");
var __filename = (0, node_url_1.fileURLToPath)(import.meta.url);
var __dirname = node_path_1.default.dirname(__filename);
var index_js_1 = require("./api/index.js");
router.use('/api', index_js_1.default);
// serve up react front-end in production
router.use(function (_req, res) {
    res.sendFile(node_path_1.default.join(__dirname, '../../client/build/index.html'));
});
exports.default = router;
