"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hex = void 0;
var Hex = /** @class */ (function () {
    function Hex() {
    }
    Hex.encodeLength = function (n) {
        return n * 2;
    };
    Hex.encode = function (src) {
        var dst = new Uint8Array(Hex.encodeLength(src.length));
        var j = 0;
        for (var i = 0; i < src.length; i++) {
            dst[j] = Hex.HEX_TABLE[src[i] >> 4].charCodeAt(0);
            dst[j + 1] = Hex.HEX_TABLE[src[i] & 0x0f].charCodeAt(0);
            j += 2;
        }
        return dst;
    };
    Hex.decodeString = function (s) {
        return Hex.decode(s);
    };
    Hex.fromHexChar = function (c) {
        if ('0'.charCodeAt(0) <= c && c <= '9'.charCodeAt(0)) {
            return c - '0'.charCodeAt(0);
        }
        else if ('a'.charCodeAt(0) <= c && c <= 'f'.charCodeAt(0)) {
            return c - 'a'.charCodeAt(0) + 10;
        }
        if ('A'.charCodeAt(0) <= c && c <= 'F'.charCodeAt(0)) {
            return c - 'A'.charCodeAt(0) + 10;
        }
        throw new Error("Invalid byte char ".concat(c));
    };
    Hex.decode = function (src) {
        var i = 0;
        var j = 1;
        var dst = [];
        for (; j < src.length; j += 2) {
            var a = Hex.fromHexChar(src[j - 1].charCodeAt(0));
            var b = Hex.fromHexChar(src[j].charCodeAt(0));
            dst[i] = (a << 4) | b;
            i++;
        }
        if (src.length % 2 == 1) {
            throw new Error('Invalid hex string');
        }
        return Uint8Array.from(dst);
    };
    Hex.encodeString = function (b) {
        return new TextDecoder().decode(Hex.encode(b));
    };
    Hex.HEX_TABLE = '0123456789abcdef';
    Hex.textEncoder = new TextEncoder();
    return Hex;
}());
exports.Hex = Hex;
