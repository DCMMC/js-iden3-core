"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaHash = void 0;
var hex_1 = require("./hex");
var constants_1 = require("./constants");
var elemBytes_1 = require("./elemBytes");
var SchemaHash = /** @class */ (function () {
    /**
     * Constructor
     * @param bytes
     */
    function SchemaHash(bytes) {
        this._bytes = new Uint8Array(constants_1.Constants.SCHEMA.HASH_LENGTH);
        if (bytes) {
            this._bytes = bytes;
        }
        if (this.bytes.length !== constants_1.Constants.SCHEMA.HASH_LENGTH) {
            throw new Error("Schema hash must be ".concat(constants_1.Constants.SCHEMA.HASH_LENGTH, " bytes long"));
        }
    }
    Object.defineProperty(SchemaHash.prototype, "bytes", {
        get: function () {
            return this._bytes;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * MarshalText returns HEX representation of SchemaHash.
     * @returns {Uint8Array} 32 bytes//
     */
    SchemaHash.prototype.marshalTextBytes = function () {
        return hex_1.Hex.encode(this.bytes);
    };
    SchemaHash.prototype.marshalText = function () {
        return new TextDecoder().decode(this.marshalTextBytes());
    };
    /**
     * NewSchemaHashFromHex creates new SchemaHash from hex string
     * @param s
     * @returns {SchemaHash}
     */
    SchemaHash.newSchemaHashFromHex = function (s) {
        var schemaEncodedBytes = hex_1.Hex.decodeString(s);
        if (schemaEncodedBytes.length !== constants_1.Constants.SCHEMA.HASH_LENGTH) {
            throw new Error("invalid schema hash length: ".concat(schemaEncodedBytes.length));
        }
        return new SchemaHash(schemaEncodedBytes);
    };
    /**
     * NewSchemaHashFromInt creates new SchemaHash from big.Int
     * @param i
     * @returns
     */
    SchemaHash.newSchemaHashFromInt = function (i) {
        return new SchemaHash(elemBytes_1.BytesHelper.intToBytes(i));
    };
    /**
     * Convert SchemaHash to big.Int
     * @returns {bigint}
     */
    SchemaHash.prototype.bigInt = function () {
        return elemBytes_1.BytesHelper.bytesToInt(this.bytes);
    };
    return SchemaHash;
}());
exports.SchemaHash = SchemaHash;
