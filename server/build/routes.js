"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const index_1 = require("./index");
exports.router = (0, express_1.Router)();
exports.router.get('/', index_1.getDeepLinks);
