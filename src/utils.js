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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poseidon = exports.poseidonHash = exports.checkBigIntArrayInField = exports.checkBigIntInField = exports.getDateFromUnixTimestamp = exports.getUnixTimestamp = exports.getUint64 = exports.putUint64 = exports.getUint32 = exports.putUint32 = exports.toBigEndian = exports.toLittleEndian = exports.fromBigEndian = exports.fromLittleEndian = void 0;
var constants_1 = require("./constants");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var poseidonLib = require('circomlibjs');
function fromLittleEndian(bytes) {
    var n256 = BigInt(256);
    var result = BigInt(0);
    var base = BigInt(1);
    bytes.forEach(function (byte) {
        result += base * BigInt(byte);
        base = base * n256;
    });
    return result;
}
exports.fromLittleEndian = fromLittleEndian;
function fromBigEndian(bytes) {
    return fromLittleEndian(bytes.reverse());
}
exports.fromBigEndian = fromBigEndian;
function toLittleEndian(bigNumber, len) {
    if (len === void 0) { len = 31; }
    var n256 = BigInt(256);
    var result = new Uint8Array(len);
    var i = 0;
    while (bigNumber > BigInt(0)) {
        result[i] = Number(bigNumber % n256);
        bigNumber = bigNumber / n256;
        i += 1;
    }
    return result;
}
exports.toLittleEndian = toLittleEndian;
function toBigEndian(bigNumber) {
    return toLittleEndian(bigNumber).reverse();
}
exports.toBigEndian = toBigEndian;
function putUint32(n) {
    var buf = new ArrayBuffer(4);
    var view = new DataView(buf);
    view.setUint32(0, n, true);
    return new Uint8Array(buf);
}
exports.putUint32 = putUint32;
function getUint32(arr) {
    var buf = arr.buffer.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
    return new DataView(buf).getUint32(0, true);
}
exports.getUint32 = getUint32;
function putUint64(n) {
    var buf = new ArrayBuffer(8);
    var view = new DataView(buf);
    view.setBigUint64(0, BigInt(n), true);
    return new Uint8Array(buf);
}
exports.putUint64 = putUint64;
function getUint64(arr) {
    var buf = arr.buffer.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
    return Number(new DataView(buf).getBigUint64(0, true));
}
exports.getUint64 = getUint64;
function getUnixTimestamp(d) {
    return Math.floor(d.getTime() / 1000);
}
exports.getUnixTimestamp = getUnixTimestamp;
function getDateFromUnixTimestamp(n) {
    return new Date(n * 1000);
}
exports.getDateFromUnixTimestamp = getDateFromUnixTimestamp;
// checkBigIntInField checks if given *big.Int fits in a Field Q element
function checkBigIntInField(a) {
    return a < constants_1.Constants.Q;
}
exports.checkBigIntInField = checkBigIntInField;
function checkBigIntArrayInField(arr) {
    return arr.every(function (n) { return checkBigIntInField(n); });
}
exports.checkBigIntArrayInField = checkBigIntArrayInField;
function poseidonHash(input) {
    return __awaiter(this, void 0, void 0, function () {
        var poseidon;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, poseidonLib.buildPoseidon()];
                case 1:
                    poseidon = _a.sent();
                    return [2 /*return*/, poseidon.F.toObject(poseidon(input))];
            }
        });
    });
}
exports.poseidonHash = poseidonHash;
var Poseidon = /** @class */ (function () {
    function Poseidon() {
    }
    Poseidon.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Poseidon;
                        return [4 /*yield*/, poseidonLib.buildPoseidon()];
                    case 1:
                        _a._poseidon = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Poseidon.hash = function (input) {
        return Poseidon._poseidon.F.toObject(Poseidon._poseidon(input));
    };
    return Poseidon;
}());
exports.Poseidon = Poseidon;
