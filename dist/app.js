"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// ts에서 자주 사용하는 utility들 keyof, partial, required, readonly, record, pick, omit, exclude, nonNullable
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('welcome!');
});
app.listen('3000', () => {
    console.log(`3000 port에서 서버 실행중`);
});
