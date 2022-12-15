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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DID = exports.DIDOptions = exports.findDIDMethodByValue = exports.findBlockchainForDIDMethodByValue = exports.findNetworkIDForDIDMethodByValue = exports.buildDIDType = exports.DIDMethodNetwork = exports.DIDNetworkFlag = exports.DIDMethodByte = exports.DidMethod = exports.NetworkId = exports.Blockchain = void 0;
var id_1 = require("./id");
var constants_1 = require("./constants");
var Blockchain;
(function (Blockchain) {
    Blockchain["Ethereum"] = "eth";
    Blockchain["Polygon"] = "polygon";
    Blockchain["Unknown"] = "unknown";
    Blockchain["NoChain"] = "";
})(Blockchain = exports.Blockchain || (exports.Blockchain = {}));
var NetworkId;
(function (NetworkId) {
    NetworkId["Main"] = "main";
    NetworkId["Mumbai"] = "mumbai";
    NetworkId["Goerli"] = "goerli";
    NetworkId["Unknown"] = "unknown";
    NetworkId["NoNetwork"] = "";
})(NetworkId = exports.NetworkId || (exports.NetworkId = {}));
var DidMethod;
(function (DidMethod) {
    DidMethod["Iden3"] = "iden3";
})(DidMethod = exports.DidMethod || (exports.DidMethod = {}));
exports.DIDMethodByte = (_a = {},
    _a[DidMethod.Iden3] = 1,
    _a);
// DIDNetworkFlag is a structure to represent DID blockchain and network id
var DIDNetworkFlag = /** @class */ (function () {
    function DIDNetworkFlag(blockchain, networkId) {
        this.blockchain = blockchain;
        this.networkId = networkId;
    }
    DIDNetworkFlag.prototype.toString = function () {
        return "".concat(this.blockchain || '_', ":").concat(this.networkId || '_');
    };
    DIDNetworkFlag.fromString = function (s) {
        var _a = __read(s.split(':'), 2), blockchain = _a[0], networkId = _a[1];
        return new DIDNetworkFlag(blockchain.replace('_', ''), networkId.replace('_', ''));
    };
    return DIDNetworkFlag;
}());
exports.DIDNetworkFlag = DIDNetworkFlag;
// DIDMethodNetwork is map for did methods and their blockchain networks
exports.DIDMethodNetwork = (_b = {},
    _b[DidMethod.Iden3] = {
        '_:_': 0,
        'polygon:main': 16 | 1,
        'polygon:mumbai': 16 | 2,
        'ethereum:main': 32 | 1,
        'ethereum:goerli': 32 | 2
    },
    _b);
// BuildDIDType builds bytes type from chain and network
function buildDIDType(method, blockchain, network) {
    var fb = exports.DIDMethodByte[method];
    if (!fb) {
        throw new Error("method ".concat(method, " is not defined in core lib"));
    }
    var methodFn = exports.DIDMethodNetwork[method];
    if (!methodFn) {
        throw new Error("method ".concat(method, " is not defined in core lib"));
    }
    var sb = methodFn[new DIDNetworkFlag(blockchain, network).toString()];
    if (!sb) {
        throw new Error("blockchain ".concat(blockchain, " and network ").concat(network, " is not defined in core lib"));
    }
    return Uint8Array.from([fb, sb]);
}
exports.buildDIDType = buildDIDType;
// FindNetworkIDForDIDMethodByValue finds network by byte value
function findNetworkIDForDIDMethodByValue(method, byteNumber) {
    var e_1, _a;
    var methodMap = exports.DIDMethodNetwork[method];
    if (!methodMap) {
        throw new Error("did method ".concat(method, " is not defined in core lib"));
    }
    try {
        for (var _b = __values(Object.entries(methodMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (value === byteNumber) {
                return DIDNetworkFlag.fromString(key).networkId;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return NetworkId.Unknown;
}
exports.findNetworkIDForDIDMethodByValue = findNetworkIDForDIDMethodByValue;
// findBlockchainForDIDMethodByValue finds blockchain type by byte value
function findBlockchainForDIDMethodByValue(method, byteNumber) {
    var e_2, _a;
    var methodMap = exports.DIDMethodNetwork[method];
    if (!methodMap) {
        throw new Error("did method ".concat(method, " is not defined in core lib"));
    }
    try {
        for (var _b = __values(Object.entries(methodMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (value === byteNumber) {
                return DIDNetworkFlag.fromString(key).blockchain;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return Blockchain.Unknown;
}
exports.findBlockchainForDIDMethodByValue = findBlockchainForDIDMethodByValue;
// findDIDMethodByValue finds did method by its byte value
function findDIDMethodByValue(byteNumber) {
    var e_3, _a;
    try {
        for (var _b = __values(Object.entries(exports.DIDMethodByte)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (value === byteNumber) {
                return key;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    throw new Error("bytes ".concat(byteNumber, " are not defined in core lib as valid did method"));
}
exports.findDIDMethodByValue = findDIDMethodByValue;
var DIDOptions = /** @class */ (function () {
    function DIDOptions() {
    }
    // WithNetwork sets Blockchain and NetworkID (eth:main)
    DIDOptions.withNetwork = function (blockchain, network) {
        return function (did) {
            did.networkId = network;
            did.blockchain = blockchain;
        };
    };
    return DIDOptions;
}());
exports.DIDOptions = DIDOptions;
// DID Decentralized Identifiers (DIDs)
// https://w3c.github.io/did-core/#did-syntax
var DID = /** @class */ (function () {
    function DID() {
        this.method = DidMethod.Iden3;
        this.id = new id_1.Id(new Uint8Array(2), new Uint8Array(27));
        this.blockchain = Blockchain.NoChain;
        this.networkId = NetworkId.NoNetwork;
    }
    // toString did as a string
    DID.prototype.toString = function () {
        if (this.blockchain == '') {
            return [constants_1.Constants.DID.DID_SCHEMA, DidMethod.Iden3, this.id.string()].join(':');
        }
        return [
            constants_1.Constants.DID.DID_SCHEMA,
            DidMethod.Iden3,
            this.blockchain,
            this.networkId,
            this.id.string()
        ]
            .filter(function (i) { return !!i; })
            .join(':');
    };
    // ParseDIDFromID returns did from ID
    DID.parseFromId = function (id) {
        var did = new DID();
        did.id = id;
        var typ = id.type();
        did.method = findDIDMethodByValue(typ[0]);
        did.blockchain = findBlockchainForDIDMethodByValue(did.method, typ[1]);
        did.networkId = findNetworkIDForDIDMethodByValue(did.method, typ[1]);
        return did;
    };
    // ParseDID method parse string and extract DID if string is valid Iden3 identifier
    DID.parse = function (s) {
        var args = s.split(':');
        var did = new DID();
        did.method = args[1];
        switch (args.length) {
            case 5:
                // validate id
                did.id = id_1.Id.fromString(args[4]);
                did.blockchain = args[2];
                did.networkId = args[3];
                break;
            case 3:
                // validate readonly id
                did.id = id_1.Id.fromString(args[2]);
                did.blockchain = Blockchain.NoChain;
                did.networkId = NetworkId.NoNetwork;
                break;
        }
        // check did method defined in core lib
        var methodByte = exports.DIDMethodByte[did.method];
        if (!methodByte) {
            throw new Error("DIDMethodByte: did method ".concat(did.method, " is not defined in core lib"));
        }
        // check did network defined in core lib for did method
        var method = exports.DIDMethodNetwork[did.method];
        if (!method) {
            throw new Error("DIDMethodNetwork: did method ".concat(did.method, " is not defined in core lib"));
        }
        var byte = method[new DIDNetworkFlag(did.blockchain, did.networkId).toString()];
        if (!(byte === null || byte === void 0 ? void 0 : byte.toString())) {
            throw new Error("blockchain network \"".concat(did.blockchain, " ").concat(did.networkId, "\" is not defined for ").concat(did.method, " did method"));
        }
        // check id contains did network and method
        var d = DID.parseFromId(did.id);
        if (d.method !== did.method) {
            throw new Error("did method of core identity ".concat(did.method, " differs from given did method ").concat(did.method));
        }
        if (d.networkId !== did.networkId) {
            throw new Error("network method of core identity ".concat(d.networkId, " differs from given did network specific id ").concat(did.networkId));
        }
        if (d.blockchain !== did.blockchain) {
            throw new Error("blockchain network of core identity ".concat(d.blockchain, " differs from given did blockchain network ").concat(did.blockchain));
        }
        return did;
    };
    DID.newDID = function (didStr) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var did = new DID();
        did.id = id_1.Id.fromString(didStr);
        args.filter(function (opt) { return !!opt; }).forEach(function (arg) { return arg(did); });
        return did;
    };
    return DID;
}());
exports.DID = DID;
