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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = void 0;
var constants_1 = require("./constants");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var base58Js = require('base58-js');
var utils_1 = require("./utils");
var elemBytes_1 = require("./elemBytes");
// ID is a byte array with
// [  type  | root_genesis | checksum ]
// [2 bytes |   27 bytes   | 2 bytes  ]
// where the root_genesis are the first 28 bytes from the hash root_genesis
var Id = /** @class */ (function () {
    function Id(typ, genesis) {
        this._checksum = elemBytes_1.BytesHelper.calculateChecksum(typ, genesis);
        this._bytes = Uint8Array.from(__spreadArray(__spreadArray(__spreadArray([], __read(typ), false), __read(genesis), false), __read(this._checksum), false));
    }
    Id.getFromBytes = function (bytes) {
        var _a = elemBytes_1.BytesHelper.decomposeBytes(bytes), typ = _a.typ, genesis = _a.genesis;
        return new Id(typ, genesis);
    };
    Id.prototype.checksum = function () {
        return this._checksum;
    };
    Id.prototype.string = function () {
        return base58Js.binary_to_base58(this._bytes);
    };
    Object.defineProperty(Id.prototype, "bytes", {
        get: function () {
            return this._bytes;
        },
        set: function (b) {
            this._bytes = b;
        },
        enumerable: false,
        configurable: true
    });
    Id.prototype.type = function () {
        return this._bytes.slice(0, 2);
    };
    Id.prototype.bigInt = function () {
        return (0, utils_1.fromLittleEndian)(this._bytes);
    };
    Id.prototype.equal = function (id) {
        return JSON.stringify(this._bytes) === JSON.stringify(id.bytes);
    };
    Id.prototype.marshal = function () {
        return new TextEncoder().encode(this.string());
    };
    Id.unMarshal = function (b) {
        return Id.fromString(new TextDecoder().decode(b));
    };
    Id.fromBytes = function (b) {
        var bytes = b !== null && b !== void 0 ? b : Uint8Array.from([]);
        if (bytes.length !== constants_1.Constants.ID.ID_LENGTH) {
            throw new Error('fromBytes error: byte array incorrect length');
        }
        if (bytes.every(function (i) { return i === 0; })) {
            throw new Error('fromBytes error: byte array empty');
        }
        var id = Id.getFromBytes(bytes);
        if (!elemBytes_1.BytesHelper.checkChecksum(bytes)) {
            throw new Error('fromBytes error: checksum error');
        }
        return id;
    };
    Id.fromString = function (s) {
        var bytes = base58Js.base58_to_binary(s);
        return Id.fromBytes(bytes);
    };
    Id.fromBigInt = function (bigInt) {
        var b = elemBytes_1.BytesHelper.intToNBytes(bigInt, constants_1.Constants.ID.ID_LENGTH);
        return Id.fromBytes(b);
    };
    Id.profileId = function (id, nonce) {
        return __awaiter(this, void 0, void 0, function () {
            var bigIntHash, typ, genesis;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.poseidonHash)([id.bigInt(), nonce])];
                    case 1:
                        bigIntHash = _a.sent();
                        typ = elemBytes_1.BytesHelper.decomposeBytes(id.bytes).typ;
                        genesis = elemBytes_1.BytesHelper.intToNBytes(bigIntHash, 27);
                        return [2 /*return*/, new Id(typ, genesis)];
                }
            });
        });
    };
    return Id;
}());
exports.Id = Id;
