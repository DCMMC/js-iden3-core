"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ClaimOptions = exports.Claim = exports.Flags = exports.MerklizedRootPosition = exports.MerklizedFlag = exports.IdPosition = exports.SubjectFlag = exports.ErrSlotOverflow = exports.SlotName = void 0;
var schemaHash_1 = require("./schemaHash");
var elemBytes_1 = require("./elemBytes");
var constants_1 = require("./constants");
var id_1 = require("./id");
var utils_1 = require("./utils");
/*
Claim structure

Index:
 i_0: [ 128  bits ] claim schema
      [ 32 bits ] option flags
          [3] Subject:
            000: A.1 Self
            001: invalid
            010: A.2.i OtherIden Index
            011: A.2.v OtherIden Value
            100: B.i Object Index
            101: B.v Object Value
          [1] Expiration: bool
          [1] Updatable: bool
          [3] Merklized: data is merklized root is stored in the:
            000: none
            001: C.i Root Index (root located in i_2)
            010: C.v Root Value (root located in v_2)
          [24] 0
      [ 32 bits ] version (optional?)
      [ 61 bits ] 0 - reserved for future use
 i_1: [ 248 bits] identity (case b) (optional)
      [  5 bits ] 0
 i_2: [ 253 bits] 0
 i_3: [ 253 bits] 0
Value:
 v_0: [ 64 bits ]  revocation nonce
      [ 64 bits ]  expiration date (optional)
      [ 125 bits] 0 - reserved
 v_1: [ 248 bits] identity (case c) (optional)
      [  5 bits ] 0
 v_2: [ 253 bits] 0
 v_3: [ 253 bits] 0
*/
var SlotName;
(function (SlotName) {
    SlotName["IndexA"] = "IndexA";
    SlotName["IndexB"] = "IndexB";
    SlotName["ValueA"] = "ValueA";
    SlotName["ValueB"] = "ValueB";
})(SlotName = exports.SlotName || (exports.SlotName = {}));
// ErrSlotOverflow means some ElemBytes overflows Q Field. And wraps the name
// of overflowed slot.
var ErrSlotOverflow = /** @class */ (function (_super) {
    __extends(ErrSlotOverflow, _super);
    function ErrSlotOverflow(msg) {
        var _this = _super.call(this, "Slot ".concat(msg, " not in field (too large)")) || this;
        Object.setPrototypeOf(_this, ErrSlotOverflow.prototype);
        return _this;
    }
    return ErrSlotOverflow;
}(Error));
exports.ErrSlotOverflow = ErrSlotOverflow;
// subjectFlag for the time being describes the location of Id (in index or value
// slots or nowhere at all).
//
// Values subjectFlagInvalid presents for backward compatibility and for now means nothing.
var SubjectFlag;
(function (SubjectFlag) {
    SubjectFlag[SubjectFlag["Self"] = 0] = "Self";
    SubjectFlag[SubjectFlag["Invalid"] = 1] = "Invalid";
    SubjectFlag[SubjectFlag["OtherIdenIndex"] = 2] = "OtherIdenIndex";
    SubjectFlag[SubjectFlag["OtherIdenValue"] = 3] = "OtherIdenValue";
})(SubjectFlag = exports.SubjectFlag || (exports.SubjectFlag = {}));
var IdPosition;
(function (IdPosition) {
    IdPosition[IdPosition["None"] = 0] = "None";
    IdPosition[IdPosition["Index"] = 1] = "Index";
    IdPosition[IdPosition["Value"] = 2] = "Value";
})(IdPosition = exports.IdPosition || (exports.IdPosition = {}));
// merklizedFlag for the time being describes the location of root (in index or value
// slots or nowhere at all).
//
// Values merklizedFlagIndex indicates that root is located in index[2] slots.
// Values merklizedFlagValue indicates that root is located in value[2] slots.
var MerklizedFlag;
(function (MerklizedFlag) {
    MerklizedFlag[MerklizedFlag["None"] = 0] = "None";
    MerklizedFlag[MerklizedFlag["Index"] = 32] = "Index";
    MerklizedFlag[MerklizedFlag["Value"] = 64] = "Value";
    MerklizedFlag[MerklizedFlag["Invalid"] = 128] = "Invalid";
})(MerklizedFlag = exports.MerklizedFlag || (exports.MerklizedFlag = {}));
var MerklizedRootPosition;
(function (MerklizedRootPosition) {
    MerklizedRootPosition[MerklizedRootPosition["None"] = 0] = "None";
    MerklizedRootPosition[MerklizedRootPosition["Index"] = 1] = "Index";
    MerklizedRootPosition[MerklizedRootPosition["Value"] = 2] = "Value";
})(MerklizedRootPosition = exports.MerklizedRootPosition || (exports.MerklizedRootPosition = {}));
var Flags;
(function (Flags) {
    Flags[Flags["ByteIdx"] = 16] = "ByteIdx";
    Flags[Flags["ExpirationBitIdx"] = 3] = "ExpirationBitIdx";
    Flags[Flags["UpdatableBitIdx"] = 4] = "UpdatableBitIdx";
})(Flags = exports.Flags || (exports.Flags = {}));
var Claim = /** @class */ (function () {
    function Claim() {
        this._index = [];
        this._value = [];
        for (var i = 0; i < constants_1.Constants.ELEM_BYTES_LENGTH; i++) {
            this._index[i] = new elemBytes_1.ElemBytes();
            this._value[i] = new elemBytes_1.ElemBytes();
        }
    }
    // NewClaim creates new Claim with specified SchemaHash and any number of
    // options. Using options you can specify any field in claim.
    Claim.newClaim = function (sh) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var c = new Claim();
        c.setSchemaHash(sh);
        for (var i = 0; i < args.length; i++) {
            var fn = args[i];
            fn(c);
        }
        return c;
    };
    // GetSchemaHash return copy of claim's schema hash.
    Claim.prototype.getSchemaHash = function () {
        return new schemaHash_1.SchemaHash(this._index[0].bytes.slice(0, constants_1.Constants.SCHEMA.HASH_LENGTH));
    };
    Object.defineProperty(Claim.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Claim.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: false,
        configurable: true
    });
    // SetSchemaHash updates claim's schema hash.
    Claim.prototype.setSchemaHash = function (sh) {
        this._index[0] = new elemBytes_1.ElemBytes(Uint8Array.from(__spreadArray(__spreadArray([], __read(sh.bytes), false), __read(new Array(constants_1.Constants.SCHEMA.HASH_LENGTH).fill(0)), false)));
    };
    Claim.prototype.setSubject = function (s) {
        // clean first 3 bits
        this._index[0].bytes[Flags.ByteIdx] &= 248;
        this._index[0].bytes[Flags.ByteIdx] |= s;
    };
    Claim.prototype.getSubject = function () {
        var sbj = this._index[0].bytes[Flags.ByteIdx];
        // clean all except first 3 bits
        sbj &= 7;
        return sbj;
    };
    Claim.prototype.setFlagExpiration = function (val) {
        if (val) {
            this._index[0].bytes[Flags.ByteIdx] |= 1 << Flags.ExpirationBitIdx;
        }
        else {
            this._index[0].bytes[Flags.ByteIdx] &= ~(1 << Flags.ExpirationBitIdx);
        }
    };
    Claim.prototype.getFlagExpiration = function () {
        var mask = 1 << Flags.ExpirationBitIdx;
        return (this._index[0].bytes[Flags.ByteIdx] & mask) > 0;
    };
    // GetIDPosition returns the position at which the Id is stored.
    Claim.prototype.getIdPosition = function () {
        switch (this.getSubject()) {
            case SubjectFlag.Self:
                return IdPosition.None;
            case SubjectFlag.OtherIdenIndex:
                return IdPosition.Index;
            case SubjectFlag.OtherIdenValue:
                return IdPosition.Value;
            default:
                throw new Error(constants_1.Constants.ERRORS.INVALID_SUBJECT_POSITION);
        }
    };
    // SetValueDataInts sets data to value slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    Claim.prototype.setValueDataInts = function (slotA, slotB) {
        this.setSlotInt(this._value[2], slotA, SlotName.ValueA);
        this.setSlotInt(this._value[3], slotB, SlotName.ValueB);
    };
    // SetValueDataBytes sets data to value slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    Claim.prototype.setValueDataBytes = function (slotA, slotB) {
        this.setSlotBytes(this._value[2], slotA, SlotName.ValueA);
        this.setSlotBytes(this._value[3], slotB, SlotName.ValueB);
    };
    // SetValueData sets data to value slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    Claim.prototype.setValueData = function (slotA, slotB) {
        var slotsAsInts = [slotA.toBigInt(), slotB.toBigInt()];
        if (!(0, utils_1.checkBigIntArrayInField)(slotsAsInts)) {
            throw new Error(constants_1.Constants.ERRORS.DATA_OVERFLOW);
        }
        this._value[2] = slotA;
        this._value[3] = slotB;
    };
    // SetIndexDataInts sets data to index slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    Claim.prototype.setIndexDataInts = function (slotA, slotB) {
        this.setSlotInt(this._index[2], slotA, SlotName.IndexA);
        this.setSlotInt(this._index[3], slotB, SlotName.IndexB);
    };
    // SetIndexDataBytes sets data to index slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    Claim.prototype.setIndexDataBytes = function (slotA, slotB) {
        this.setSlotBytes(this._index[2], slotA, SlotName.IndexA);
        this.setSlotBytes(this._index[3], slotB, SlotName.IndexB);
    };
    Claim.prototype.setSlotBytes = function (slot, value, slotName) {
        slot = new elemBytes_1.ElemBytes(value);
        if (!(0, utils_1.checkBigIntInField)(slot.toBigInt())) {
            throw new ErrSlotOverflow(slotName);
        }
    };
    Claim.prototype.setFlagMerklized = function (s) {
        var f;
        switch (s) {
            case MerklizedRootPosition.Index:
                f = MerklizedFlag.Index;
                break;
            case MerklizedRootPosition.Value:
                f = MerklizedFlag.Value;
                break;
            default:
                f = MerklizedFlag.None;
        }
        // clean last 3 bits
        this.index[0].bytes[Flags.ByteIdx] &= 31;
        this.index[0].bytes[Flags.ByteIdx] |= f;
    };
    Claim.prototype.getMerklized = function () {
        var mt = this.index[0].bytes[Flags.ByteIdx];
        // clean all except last 3 bits
        mt &= 224;
        return mt;
    };
    // GetMerklizedPosition returns the position at which the Merklized flag is stored.
    Claim.prototype.getMerklizedPosition = function () {
        switch (this.getMerklized()) {
            case MerklizedFlag.None:
                return MerklizedRootPosition.None;
            case MerklizedFlag.Index:
                return MerklizedRootPosition.Index;
            case MerklizedFlag.Value:
                return MerklizedRootPosition.Value;
            default:
                throw new Error(constants_1.Constants.ERRORS.INCORRECT_MERKLIZED_POSITION);
        }
    };
    Claim.prototype.setSlotInt = function (slot, value, slotName) {
        if (!value) {
            value = BigInt(0);
        }
        if (!(0, utils_1.checkBigIntInField)(value)) {
            throw new ErrSlotOverflow(slotName);
        }
        slot.setBigInt(value);
    };
    // SetIndexData sets data to index slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    Claim.prototype.setIndexData = function (slotA, slotB) {
        var slotsAsInts = [slotA.toBigInt(), slotB.toBigInt()];
        if (!(0, utils_1.checkBigIntArrayInField)(slotsAsInts)) {
            throw new Error(constants_1.Constants.ERRORS.DATA_OVERFLOW);
        }
        this._index[2] = slotA;
        this._index[3] = slotB;
    };
    Claim.prototype.resetExpirationDate = function () {
        this.setFlagExpiration(false);
        var bytes = Array.from({ length: constants_1.Constants.NONCE_BYTES_LENGTH }, function () { return 0; });
        var arr = Array.from(this._value[0].bytes);
        arr.splice.apply(arr, __spreadArray([constants_1.Constants.NONCE_BYTES_LENGTH, constants_1.Constants.NONCE_BYTES_LENGTH], __read(bytes), false));
        this._value[0] = new elemBytes_1.ElemBytes(Uint8Array.from(arr));
    };
    // GetExpirationDate returns expiration date and flag. Flag is true if
    // expiration date is present, false if null.
    Claim.prototype.getExpirationDate = function () {
        if (this.getFlagExpiration()) {
            var unixTimestamp = (0, utils_1.getUint64)(this._value[0].bytes.slice(8, 16));
            return (0, utils_1.getDateFromUnixTimestamp)(unixTimestamp);
        }
        return null;
    };
    // SetExpirationDate sets expiration date to dt
    Claim.prototype.setExpirationDate = function (dt) {
        this.setFlagExpiration(true);
        var bytes = (0, utils_1.putUint64)((0, utils_1.getUnixTimestamp)(dt));
        var arr = Array.from(this._value[0].bytes);
        arr.splice.apply(arr, __spreadArray([constants_1.Constants.NONCE_BYTES_LENGTH, constants_1.Constants.NONCE_BYTES_LENGTH], __read(bytes), false));
        this._value[0] = new elemBytes_1.ElemBytes(Uint8Array.from(arr));
    };
    // GetRevocationNonce returns revocation nonce
    Claim.prototype.getRevocationNonce = function () {
        return (0, utils_1.getUint64)(this._value[0].bytes.slice(0, 8));
    };
    // SetRevocationNonce sets claim's revocation nonce
    Claim.prototype.setRevocationNonce = function (nonce) {
        var bytes = (0, utils_1.putUint64)(nonce);
        if (bytes.length > constants_1.Constants.NONCE_BYTES_LENGTH) {
            throw new Error('Nonce length is not valid');
        }
        var arr = Array.from(this._value[0].bytes);
        arr.splice.apply(arr, __spreadArray([0, constants_1.Constants.NONCE_BYTES_LENGTH], __read(bytes), false));
        this._value[0] = new elemBytes_1.ElemBytes(Uint8Array.from(arr));
    };
    Claim.prototype.getValueId = function () {
        return id_1.Id.fromBytes(this._value[1].bytes);
    };
    // SetValueId sets id to value. Removes id from index if any.
    Claim.prototype.setValueId = function (id) {
        this.resetIndexId();
        this.setSubject(SubjectFlag.OtherIdenValue);
        var arr = Array.from(this._index[1].bytes);
        arr.splice.apply(arr, __spreadArray([0, id.bytes.length], __read(id.bytes), false));
        this._value[1] = new elemBytes_1.ElemBytes(Uint8Array.from(arr));
    };
    Claim.prototype.resetIndexId = function () {
        this._index[1] = new elemBytes_1.ElemBytes(new Uint8Array(constants_1.Constants.BYTES_LENGTH).fill(0));
    };
    Claim.prototype.resetValueId = function () {
        this._value[1] = new elemBytes_1.ElemBytes(new Uint8Array(constants_1.Constants.BYTES_LENGTH).fill(0));
    };
    Claim.prototype.getIndexId = function () {
        return id_1.Id.fromBytes(this._index[1].bytes);
    };
    // SetIndexId sets id to index. Removes id from value if any.
    Claim.prototype.setIndexId = function (id) {
        this.resetValueId();
        this.setSubject(SubjectFlag.OtherIdenIndex);
        var arr = Array.from(this._index[1].bytes);
        arr.splice.apply(arr, __spreadArray([0, id.bytes.length], __read(id.bytes), false));
        this._index[1] = new elemBytes_1.ElemBytes(Uint8Array.from(arr));
    };
    // SetVersion sets claim's version
    Claim.prototype.setVersion = function (ver) {
        var bytes = (0, utils_1.putUint32)(ver);
        this._index[0].bytes[20] = bytes[0];
        this._index[0].bytes[21] = bytes[1];
        this._index[0].bytes[22] = bytes[2];
        this._index[0].bytes[23] = bytes[3];
    };
    // GetVersion returns claim's version
    Claim.prototype.getVersion = function () {
        return (0, utils_1.getUint32)(this._index[0].bytes.slice(20, 24));
    };
    // SetFlagUpdatable sets claim's flag `updatable`
    Claim.prototype.setFlagUpdatable = function (val) {
        if (val) {
            this._index[0].bytes[Flags.ByteIdx] |= 1 << Flags.UpdatableBitIdx;
        }
        else {
            this._index[0].bytes[Flags.ByteIdx] &= ~(1 << Flags.UpdatableBitIdx);
        }
    };
    // HIndex calculates the hash of the Index of the Claim
    Claim.prototype.hIndex = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.poseidonHash)(elemBytes_1.ElemBytes.elemBytesToInts(this._index))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // GetFlagUpdatable returns claim's flag `updatable`
    Claim.prototype.getFlagUpdatable = function () {
        var mask = 1 << Flags.UpdatableBitIdx;
        return (this._index[0].bytes[Flags.ByteIdx] & mask) > 0;
    };
    // HValue calculates the hash of the Value of the Claim
    Claim.prototype.hValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.poseidonHash)(elemBytes_1.ElemBytes.elemBytesToInts(this._value))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // HiHv returns the HIndex and HValue of the Claim
    Claim.prototype.hiHv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, this.hIndex()];
                    case 1:
                        _a.hi = _b.sent();
                        return [4 /*yield*/, this.hValue()];
                    case 2: return [2 /*return*/, (_a.hv = _b.sent(), _a)];
                }
            });
        });
    };
    // SetIndexMerklizedRoot sets merklized root to index. Removes root from value[2] if any.
    Claim.prototype.setIndexMerklizedRoot = function (r) {
        this.resetValueMerklizedRoot();
        this.setFlagMerklized(MerklizedRootPosition.Index);
        this.setSlotInt(this.index[2], r, SlotName.IndexA);
    };
    Claim.prototype.resetIndexMerklizedRoot = function () {
        this._index[2] = new elemBytes_1.ElemBytes(new Uint8Array(constants_1.Constants.BYTES_LENGTH).fill(0));
    };
    // SetValueMerklizedRoot sets merklized root to value. Removes root from index[2] if any.
    Claim.prototype.setValueMerklizedRoot = function (r) {
        this.resetIndexMerklizedRoot();
        this.setFlagMerklized(MerklizedRootPosition.Value);
        this.setSlotInt(this.value[2], r, SlotName.ValueA);
    };
    Claim.prototype.resetValueMerklizedRoot = function () {
        this._value[2] = new elemBytes_1.ElemBytes(new Uint8Array(constants_1.Constants.BYTES_LENGTH).fill(0));
    };
    // GetMerklizedRoot returns merklized root from claim's index of value.
    // Returns error ErrNoMerklizedRoot if MerklizedRoot is not set.
    Claim.prototype.getMerklizedRoot = function () {
        switch (this.getMerklized()) {
            case MerklizedFlag.Index:
                return this.index[2].toBigInt();
            case MerklizedFlag.Value:
                return this.value[2].toBigInt();
            default:
                throw new Error(constants_1.Constants.ERRORS.NO_MERKLIZED_ROOT);
        }
    };
    // resetId deletes Id from index and from value.
    Claim.prototype.resetId = function () {
        this.resetIndexId();
        this.resetValueId();
        this.setSubject(SubjectFlag.Self);
    };
    // GetId returns Id from claim's index of value.
    // Returns error ErrNoId if Id is not set.
    Claim.prototype.getId = function () {
        switch (this.getSubject()) {
            case SubjectFlag.OtherIdenIndex:
                return this.getIndexId();
            case SubjectFlag.OtherIdenValue:
                return this.getValueId();
            default:
                throw new Error(constants_1.Constants.ERRORS.NO_ID);
        }
    };
    // RawSlots returns raw bytes of claim's index and value
    Claim.prototype.rawSlots = function () {
        return {
            index: this._index,
            value: this._value
        };
    };
    // RawSlotsAsInts returns slots as []bigint
    Claim.prototype.rawSlotsAsInts = function () {
        return __spreadArray(__spreadArray([], __read(elemBytes_1.ElemBytes.elemBytesToInts(this._index)), false), __read(elemBytes_1.ElemBytes.elemBytesToInts(this._value)), false);
    };
    Claim.prototype.clone = function () {
        return JSON.parse(JSON.stringify(this));
    };
    Claim.prototype.marshalJson = function () {
        return JSON.stringify(this.rawSlotsAsInts().map(function (b) { return b.toString(); }));
    };
    Claim.prototype.unMarshalJson = function (b) {
        var ints = JSON.parse(b).map(function (s) { return BigInt(s); });
        if (ints.length !== this._index.length + this._value.length) {
            throw new Error("invalid number of claim's slots");
        }
        this._index = [];
        this._value = [];
        for (var i = 0, j = constants_1.Constants.ELEM_BYTES_LENGTH; i < ints.length / 2; i++, j++) {
            this._index[i] = new elemBytes_1.ElemBytes();
            this._index[i].setBigInt(ints[i]);
            this._value[i] = new elemBytes_1.ElemBytes();
            this._value[i].setBigInt(ints[j]);
        }
        return this;
    };
    Claim.prototype.marshalBinary = function () {
        var getBytes = function (src) {
            return src.reduce(function (acc, cur) {
                return __spreadArray(__spreadArray([], __read(acc), false), __read(cur.bytes), false);
            }, []);
        };
        return Uint8Array.from(getBytes(this._index).concat(getBytes(this._value)));
    };
    Claim.prototype.unMarshalBinary = function (data) {
        var wantLen = 2 * constants_1.Constants.ELEM_BYTES_LENGTH * constants_1.Constants.BYTES_LENGTH;
        if (data.length !== wantLen) {
            throw new Error('unexpected length of input data');
        }
        this._index = [];
        this._value = [];
        for (var i = 0, j = constants_1.Constants.ELEM_BYTES_LENGTH; i < constants_1.Constants.ELEM_BYTES_LENGTH; i++, j++) {
            this._index[i] = new elemBytes_1.ElemBytes(data.slice(i * constants_1.Constants.BYTES_LENGTH, (i + 1) * constants_1.Constants.BYTES_LENGTH));
            this._value[i] = new elemBytes_1.ElemBytes(data.slice(j * constants_1.Constants.BYTES_LENGTH, (j + 1) * constants_1.Constants.BYTES_LENGTH));
        }
    };
    return Claim;
}());
exports.Claim = Claim;
var ClaimOptions = /** @class */ (function () {
    function ClaimOptions() {
    }
    // WithFlagUpdatable sets claim's flag `updatable`
    ClaimOptions.withFlagUpdatable = function (val) {
        return function (c) { return c.setFlagUpdatable(val); };
    };
    // WithVersion sets claim's version
    ClaimOptions.withVersion = function (ver) {
        return function (c) { return c.setVersion(ver); };
    };
    // WithIndexId sets Id to claim's index
    ClaimOptions.withIndexId = function (id) {
        return function (c) { return c.setIndexId(id); };
    };
    // WithValueId sets Id to claim's value
    ClaimOptions.withValueId = function (id) {
        return function (c) { return c.setValueId(id); };
    };
    // WithFlagMerklized sets claim's flag `merklized`
    ClaimOptions.withFlagMerklized = function (p) {
        return function (c) { return c.setFlagMerklized(p); };
    };
    // WithId sets Id to claim's index or value depending on `pos`.
    ClaimOptions.withId = function (id, pos) {
        return function (c) {
            switch (pos) {
                case IdPosition.Index:
                    c.setIndexId(id);
                    break;
                case IdPosition.Value:
                    c.setValueId(id);
                    break;
                default:
                    throw new Error(constants_1.Constants.ERRORS.INCORRECT_ID_POSITION);
            }
        };
    };
    // WithRevocationNonce sets claim's revocation nonce.
    ClaimOptions.withRevocationNonce = function (nonce) {
        return function (c) { return c.setRevocationNonce(nonce); };
    };
    // WithExpirationDate sets claim's expiration date to `dt`.
    ClaimOptions.withExpirationDate = function (dt) {
        return function (c) { return c.setExpirationDate(dt); };
    };
    // WithIndexData sets data to index slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    ClaimOptions.withIndexData = function (slotA, slotB) {
        return function (c) { return c.setIndexData(slotA, slotB); };
    };
    // WithIndexDataBytes sets data to index slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    ClaimOptions.withIndexDataBytes = function (slotA, slotB) {
        return function (c) { return c.setIndexDataBytes(slotA, slotB); };
    };
    // WithIndexDataInts sets data to index slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    ClaimOptions.withIndexDataInts = function (slotA, slotB) {
        return function (c) { return c.setIndexDataInts(slotA, slotB); };
    };
    // WithValueData sets data to value slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    ClaimOptions.withValueData = function (slotA, slotB) {
        return function (c) { return c.setValueData(slotA, slotB); };
    };
    // WithValueDataBytes sets data to value slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    ClaimOptions.withValueDataBytes = function (slotA, slotB) {
        return function (c) { return c.setValueDataBytes(slotA, slotB); };
    };
    // WithValueDataInts sets data to value slots A & B.
    // Returns ErrSlotOverflow if slotA or slotB value are too big.
    ClaimOptions.withValueDataInts = function (slotA, slotB) {
        return function (c) { return c.setValueDataInts(slotA, slotB); };
    };
    // WithIndexMerklizedRoot sets root to index i_2
    // Returns ErrSlotOverflow if root value are too big.
    ClaimOptions.withIndexMerklizedRoot = function (r) {
        return function (c) {
            c.setFlagMerklized(MerklizedRootPosition.Index);
            c.setSlotInt(c.index[2], r, SlotName.IndexA);
        };
    };
    // WithValueMerklizedRoot sets root to value v_2
    // Returns ErrSlotOverflow if root value are too big.
    ClaimOptions.withValueMerklizedRoot = function (r) {
        return function (c) {
            c.setFlagMerklized(MerklizedRootPosition.Value);
            c.setSlotInt(c.value[2], r, SlotName.ValueA);
        };
    };
    // WithMerklizedRoot sets root to value v_2 or index i_2
    // Returns ErrSlotOverflow if root value are too big.
    ClaimOptions.withMerklizedRoot = function (r, pos) {
        return function (c) {
            switch (pos) {
                case MerklizedRootPosition.Index:
                    c.setFlagMerklized(MerklizedRootPosition.Index);
                    c.setSlotInt(c.index[2], r, SlotName.IndexA);
                    break;
                case MerklizedRootPosition.Value:
                    c.setFlagMerklized(MerklizedRootPosition.Value);
                    c.setSlotInt(c.value[2], r, SlotName.ValueA);
                    break;
                default:
                    throw new Error(constants_1.Constants.ERRORS.INCORRECT_MERKLIZED_POSITION);
            }
        };
    };
    return ClaimOptions;
}());
exports.ClaimOptions = ClaimOptions;
