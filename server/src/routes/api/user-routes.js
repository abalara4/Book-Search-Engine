"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var user_controller_js_1 = require("../../controllers/user-controller.js");
// import middleware
var auth_js_1 = require("../../services/auth.js");
// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(user_controller_js_1.createUser).put(auth_js_1.authenticateToken, user_controller_js_1.saveBook);
router.route('/login').post(user_controller_js_1.login);
router.route('/me').get(auth_js_1.authenticateToken, user_controller_js_1.getSingleUser);
router.route('/books/:bookId').delete(auth_js_1.authenticateToken, user_controller_js_1.deleteBook);
exports.default = router;
