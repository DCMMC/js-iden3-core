"use strict";
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
exports.ElemBytes = exports.BytesHelper = void 0;
var constants_1 = require("./constants");
var cross_sha256_1 = require("cross-sha256");
var utils_1 = require("./utils");
var hex_1 = require("./hex");
var BytesHelper = /** @class */ (function () {
    function BytesHelper() {
    }
    BytesHelper.intToBytes = function (int) {
        return BytesHelper.intToNBytes(int, constants_1.Constants.BYTES_LENGTH);
    };
    BytesHelper.intToNBytes = function (int, n) {
        return Uint8Array.from((0, utils_1.toLittleEndian)(int, n));
    };
    BytesHelper.checkChecksum = function (bytes) {
        var _a = BytesHelper.decomposeBytes(bytes), typ = _a.typ, genesis = _a.genesis, checksum = _a.checksum;
        if (!checksum.length || JSON.stringify(Uint8Array.from([0, 0])) === JSON.stringify(checksum)) {
            return false;
        }
        var c = BytesHelper.calculateChecksum(typ, genesis);
        return JSON.stringify(c) === JSON.stringify(checksum);
    };
    BytesHelper.decomposeBytes = function (b) {
        var offset = 2;
        var len = b.length - offset;
        return {
            typ: b.slice(0, offset),
            genesis: b.slice(offset, len),
            checksum: b.slice(-offset)
        };
    };
    BytesHelper.calculateChecksum = function (typ, genesis) {
        var toChecksum = __spreadArray(__spreadArray([], __read(typ), false), __read(genesis), false);
        var s = toChecksum.reduce(function (acc, cur) { return acc + cur; }, 0);
        var checksum = [s >> 8, s & 0xff];
        return Uint8Array.from(checksum.reverse());
    };
    BytesHelper.hashBytes = function (str) {
        var hash = new cross_sha256_1.sha256().update(str).digest();
        return new Uint8Array(hash);
    };
    BytesHelper.hexToBytes = function (str) {
        var buffer = Buffer.from(str, 'hex');
        return Uint8Array.from(buffer);
    };
    BytesHelper.bytesToHex = function (bytes) {
        var hex = [];
        for (var i = 0; i < bytes.length; i++) {
            var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
            hex.push((current >>> 4).toString(16));
            hex.push((current & 0xf).toString(16));
        }
        return hex.join('');
    };
    BytesHelper.bytesToInt = function (bytes) {
        return (0, utils_1.fromLittleEndian)(bytes);
    };
    return BytesHelper;
}());
exports.BytesHelper = BytesHelper;
var ElemBytes = /** @class */ (function () {
    function ElemBytes(bytes) {
        this._bytes = new Uint8Array(constants_1.Constants.BYTES_LENGTH);
        if (bytes) {
            this._bytes = bytes;
        }
        if (this._bytes.length !== constants_1.Constants.BYTES_LENGTH) {
            throw new Error('Invalid bytes length');
        }
    }
    Object.defineProperty(ElemBytes.prototype, "bytes", {
        get: function () {
            return this._bytes;
        },
        set: function (value) {
            this._bytes = value;
        },
        enumerable: false,
        configurable: true
    });
    ElemBytes.prototype.toBigInt = function () {
        return BytesHelper.bytesToInt(this._bytes);
    };
    ElemBytes.prototype.setBigInt = function (n) {
        if (!(0, utils_1.checkBigIntInField)(n)) {
            throw new Error(constants_1.Constants.ERRORS.DATA_OVERFLOW);
        }
        this._bytes = BytesHelper.intToBytes(n);
        return this;
    };
    ElemBytes.prototype.slotFromHex = function (hex) {
        var bytes = hex_1.Hex.decodeString(hex);
        if (bytes.length !== constants_1.Constants.BYTES_LENGTH) {
            throw new Error('Invalid bytes length');
        }
        this._bytes.set(bytes, 0);
        return this;
    };
    ElemBytes.prototype.hex = function () {
        return hex_1.Hex.encodeString(this._bytes);
    };
    // ElemBytesToInts converts slice of ElemBytes to slice of *big.Int
    ElemBytes.elemBytesToInts = function (elements) {
        var result = [];
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            result.push(element.toBigInt());
        }
        return result;
    };
    ElemBytes.fromInt = function (i) {
        if (!(0, utils_1.checkBigIntInField)(i)) {
            throw new Error(constants_1.Constants.ERRORS.DATA_OVERFLOW);
        }
        var bytes = BytesHelper.intToBytes(i);
        return new ElemBytes(bytes);
    };
    return ElemBytes;
}());
exports.ElemBytes = ElemBytes;
