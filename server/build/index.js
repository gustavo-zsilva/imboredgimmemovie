"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeepLinks = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function getDeepLinks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { countryCode, movie } = req.query;
        try {
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.goto(`https://www.justwatch.com/${countryCode}/filme/${movie}`);
            const deepLinks = yield page.evaluate(() => {
                const providers = [];
                const streamDiv = document.querySelector('.price-comparison__grid__row--stream');
                if (!streamDiv)
                    return null;
                streamDiv.querySelectorAll('.price-comparison__grid__row__element')
                    .forEach(element => {
                    const link = element.querySelector('a').href;
                    const name = element.querySelector('img').title;
                    providers.push({
                        name,
                        link,
                    });
                });
                return providers;
            });
            yield browser.close();
            res.json({ status: '201', deepLinks });
        }
        catch (err) {
            console.error(err);
            res.json({ status: '500', error: err.message });
        }
    });
}
exports.getDeepLinks = getDeepLinks;
