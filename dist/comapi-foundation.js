var COMAPI =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/*! *****************************************************************************
	Copyright (C) Microsoft. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	var Reflect;
	(function (Reflect) {
	    "use strict";
	    var hasOwn = Object.prototype.hasOwnProperty;
	    // feature test for Symbol support
	    var supportsSymbol = typeof Symbol === "function";
	    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
	    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
	    var HashMap;
	    (function (HashMap) {
	        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
	        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
	        var downLevel = !supportsCreate && !supportsProto;
	        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
	        HashMap.create = supportsCreate
	            ? function () { return MakeDictionary(Object.create(null)); }
	            : supportsProto
	                ? function () { return MakeDictionary({ __proto__: null }); }
	                : function () { return MakeDictionary({}); };
	        HashMap.has = downLevel
	            ? function (map, key) { return hasOwn.call(map, key); }
	            : function (map, key) { return key in map; };
	        HashMap.get = downLevel
	            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
	            : function (map, key) { return map[key]; };
	    })(HashMap || (HashMap = {}));
	    // Load global or shim versions of Map, Set, and WeakMap
	    var functionPrototype = Object.getPrototypeOf(Function);
	    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
	    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
	    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
	    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
	    // [[Metadata]] internal slot
	    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
	    var Metadata = new _WeakMap();
	    /**
	      * Applies a set of decorators to a property of a target object.
	      * @param decorators An array of decorators.
	      * @param target The target object.
	      * @param propertyKey (Optional) The property key to decorate.
	      * @param attributes (Optional) The property descriptor for the target key.
	      * @remarks Decorators are applied in reverse order.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Example = Reflect.decorate(decoratorsArray, Example);
	      *
	      *     // property (on constructor)
	      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Object.defineProperty(Example, "staticMethod",
	      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
	      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
	      *
	      *     // method (on prototype)
	      *     Object.defineProperty(Example.prototype, "method",
	      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
	      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
	      *
	      */
	    function decorate(decorators, target, propertyKey, attributes) {
	        if (!IsUndefined(propertyKey)) {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
	                throw new TypeError();
	            if (IsNull(attributes))
	                attributes = undefined;
	            propertyKey = ToPropertyKey(propertyKey);
	            return DecorateProperty(decorators, target, propertyKey, attributes);
	        }
	        else {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsConstructor(target))
	                throw new TypeError();
	            return DecorateConstructor(decorators, target);
	        }
	    }
	    Reflect.decorate = decorate;
	    // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
	    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
	    /**
	      * A default metadata decorator factory that can be used on a class, class member, or parameter.
	      * @param metadataKey The key for the metadata entry.
	      * @param metadataValue The value for the metadata entry.
	      * @returns A decorator function.
	      * @remarks
	      * If `metadataKey` is already defined for the target and target key, the
	      * metadataValue for that key will be overwritten.
	      * @example
	      *
	      *     // constructor
	      *     @Reflect.metadata(key, value)
	      *     class Example {
	      *     }
	      *
	      *     // property (on constructor, TypeScript only)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         static staticProperty;
	      *     }
	      *
	      *     // property (on prototype, TypeScript only)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         property;
	      *     }
	      *
	      *     // method (on constructor)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         static staticMethod() { }
	      *     }
	      *
	      *     // method (on prototype)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         method() { }
	      *     }
	      *
	      */
	    function metadata(metadataKey, metadataValue) {
	        function decorator(target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
	                throw new TypeError();
	            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
	        }
	        return decorator;
	    }
	    Reflect.metadata = metadata;
	    /**
	      * Define a unique metadata entry on the target.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param metadataValue A value that contains attached metadata.
	      * @param target The target object on which to define metadata.
	      * @param propertyKey (Optional) The property key for the target.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Reflect.defineMetadata("custom:annotation", options, Example);
	      *
	      *     // property (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
	      *
	      *     // decorator factory as metadata-producing annotation.
	      *     function MyAnnotation(options): Decorator {
	      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	      *     }
	      *
	      */
	    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
	    }
	    Reflect.defineMetadata = defineMetadata;
	    /**
	      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function hasMetadata(metadataKey, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
	    }
	    Reflect.hasMetadata = hasMetadata;
	    /**
	      * Gets a value indicating whether the target object has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function hasOwnMetadata(metadataKey, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
	    }
	    Reflect.hasOwnMetadata = hasOwnMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function getMetadata(metadataKey, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
	    }
	    Reflect.getMetadata = getMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function getOwnMetadata(metadataKey, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
	    }
	    Reflect.getOwnMetadata = getOwnMetadata;
	    /**
	      * Gets the metadata keys defined on the target object or its prototype chain.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadataKeys(Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
	      *
	      */
	    function getMetadataKeys(target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryMetadataKeys(target, propertyKey);
	    }
	    Reflect.getMetadataKeys = getMetadataKeys;
	    /**
	      * Gets the unique metadata keys defined on the target object.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadataKeys(Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
	      *
	      */
	    function getOwnMetadataKeys(target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryOwnMetadataKeys(target, propertyKey);
	    }
	    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
	    /**
	      * Deletes the metadata entry from the target object with the provided key.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.deleteMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function deleteMetadata(metadataKey, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
	        if (IsUndefined(metadataMap))
	            return false;
	        if (!metadataMap.delete(metadataKey))
	            return false;
	        if (metadataMap.size > 0)
	            return true;
	        var targetMetadata = Metadata.get(target);
	        targetMetadata.delete(propertyKey);
	        if (targetMetadata.size > 0)
	            return true;
	        Metadata.delete(target);
	        return true;
	    }
	    Reflect.deleteMetadata = deleteMetadata;
	    function DecorateConstructor(decorators, target) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target);
	            if (!IsUndefined(decorated) && !IsNull(decorated)) {
	                if (!IsConstructor(decorated))
	                    throw new TypeError();
	                target = decorated;
	            }
	        }
	        return target;
	    }
	    function DecorateProperty(decorators, target, propertyKey, descriptor) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target, propertyKey, descriptor);
	            if (!IsUndefined(decorated) && !IsNull(decorated)) {
	                if (!IsObject(decorated))
	                    throw new TypeError();
	                descriptor = decorated;
	            }
	        }
	        return descriptor;
	    }
	    function GetOrCreateMetadataMap(O, P, Create) {
	        var targetMetadata = Metadata.get(O);
	        if (IsUndefined(targetMetadata)) {
	            if (!Create)
	                return undefined;
	            targetMetadata = new _Map();
	            Metadata.set(O, targetMetadata);
	        }
	        var metadataMap = targetMetadata.get(P);
	        if (IsUndefined(metadataMap)) {
	            if (!Create)
	                return undefined;
	            metadataMap = new _Map();
	            targetMetadata.set(P, metadataMap);
	        }
	        return metadataMap;
	    }
	    // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
	    function OrdinaryHasMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn)
	            return true;
	        var parent = OrdinaryGetPrototypeOf(O);
	        if (!IsNull(parent))
	            return OrdinaryHasMetadata(MetadataKey, parent, P);
	        return false;
	    }
	    // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
	    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	        if (IsUndefined(metadataMap))
	            return false;
	        return ToBoolean(metadataMap.has(MetadataKey));
	    }
	    // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
	    function OrdinaryGetMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn)
	            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	        var parent = OrdinaryGetPrototypeOf(O);
	        if (!IsNull(parent))
	            return OrdinaryGetMetadata(MetadataKey, parent, P);
	        return undefined;
	    }
	    // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
	    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	        if (IsUndefined(metadataMap))
	            return undefined;
	        return metadataMap.get(MetadataKey);
	    }
	    // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
	    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
	        metadataMap.set(MetadataKey, MetadataValue);
	    }
	    // 3.1.6.1 OrdinaryMetadataKeys(O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
	    function OrdinaryMetadataKeys(O, P) {
	        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
	        var parent = OrdinaryGetPrototypeOf(O);
	        if (parent === null)
	            return ownKeys;
	        var parentKeys = OrdinaryMetadataKeys(parent, P);
	        if (parentKeys.length <= 0)
	            return ownKeys;
	        if (ownKeys.length <= 0)
	            return parentKeys;
	        var set = new _Set();
	        var keys = [];
	        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
	            var key = ownKeys_1[_i];
	            var hasKey = set.has(key);
	            if (!hasKey) {
	                set.add(key);
	                keys.push(key);
	            }
	        }
	        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
	            var key = parentKeys_1[_a];
	            var hasKey = set.has(key);
	            if (!hasKey) {
	                set.add(key);
	                keys.push(key);
	            }
	        }
	        return keys;
	    }
	    // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
	    function OrdinaryOwnMetadataKeys(O, P) {
	        var keys = [];
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	        if (IsUndefined(metadataMap))
	            return keys;
	        var keysObj = metadataMap.keys();
	        var iterator = GetIterator(keysObj);
	        var k = 0;
	        while (true) {
	            var next = IteratorStep(iterator);
	            if (!next) {
	                keys.length = k;
	                return keys;
	            }
	            var nextValue = IteratorValue(next);
	            try {
	                keys[k] = nextValue;
	            }
	            catch (e) {
	                try {
	                    IteratorClose(iterator);
	                }
	                finally {
	                    throw e;
	                }
	            }
	            k++;
	        }
	    }
	    // 6 ECMAScript Data Typ0es and Values
	    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
	    function Type(x) {
	        if (x === null)
	            return 1 /* Null */;
	        switch (typeof x) {
	            case "undefined": return 0 /* Undefined */;
	            case "boolean": return 2 /* Boolean */;
	            case "string": return 3 /* String */;
	            case "symbol": return 4 /* Symbol */;
	            case "number": return 5 /* Number */;
	            case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
	            default: return 6 /* Object */;
	        }
	    }
	    // 6.1.1 The Undefined Type
	    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
	    function IsUndefined(x) {
	        return x === undefined;
	    }
	    // 6.1.2 The Null Type
	    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
	    function IsNull(x) {
	        return x === null;
	    }
	    // 6.1.5 The Symbol Type
	    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
	    function IsSymbol(x) {
	        return typeof x === "symbol";
	    }
	    // 6.1.7 The Object Type
	    // https://tc39.github.io/ecma262/#sec-object-type
	    function IsObject(x) {
	        return typeof x === "object" ? x !== null : typeof x === "function";
	    }
	    // 7.1 Type Conversion
	    // https://tc39.github.io/ecma262/#sec-type-conversion
	    // 7.1.1 ToPrimitive(input [, PreferredType])
	    // https://tc39.github.io/ecma262/#sec-toprimitive
	    function ToPrimitive(input, PreferredType) {
	        switch (Type(input)) {
	            case 0 /* Undefined */: return input;
	            case 1 /* Null */: return input;
	            case 2 /* Boolean */: return input;
	            case 3 /* String */: return input;
	            case 4 /* Symbol */: return input;
	            case 5 /* Number */: return input;
	        }
	        var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
	        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
	        if (exoticToPrim !== undefined) {
	            var result = exoticToPrim.call(input, hint);
	            if (IsObject(result))
	                throw new TypeError();
	            return result;
	        }
	        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
	    }
	    // 7.1.1.1 OrdinaryToPrimitive(O, hint)
	    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
	    function OrdinaryToPrimitive(O, hint) {
	        if (hint === "string") {
	            var toString_1 = O.toString;
	            if (IsCallable(toString_1)) {
	                var result = toString_1.call(O);
	                if (!IsObject(result))
	                    return result;
	            }
	            var valueOf = O.valueOf;
	            if (IsCallable(valueOf)) {
	                var result = valueOf.call(O);
	                if (!IsObject(result))
	                    return result;
	            }
	        }
	        else {
	            var valueOf = O.valueOf;
	            if (IsCallable(valueOf)) {
	                var result = valueOf.call(O);
	                if (!IsObject(result))
	                    return result;
	            }
	            var toString_2 = O.toString;
	            if (IsCallable(toString_2)) {
	                var result = toString_2.call(O);
	                if (!IsObject(result))
	                    return result;
	            }
	        }
	        throw new TypeError();
	    }
	    // 7.1.2 ToBoolean(argument)
	    // https://tc39.github.io/ecma262/2016/#sec-toboolean
	    function ToBoolean(argument) {
	        return !!argument;
	    }
	    // 7.1.12 ToString(argument)
	    // https://tc39.github.io/ecma262/#sec-tostring
	    function ToString(argument) {
	        return "" + argument;
	    }
	    // 7.1.14 ToPropertyKey(argument)
	    // https://tc39.github.io/ecma262/#sec-topropertykey
	    function ToPropertyKey(argument) {
	        var key = ToPrimitive(argument, 3 /* String */);
	        if (IsSymbol(key))
	            return key;
	        return ToString(key);
	    }
	    // 7.2 Testing and Comparison Operations
	    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
	    // 7.2.2 IsArray(argument)
	    // https://tc39.github.io/ecma262/#sec-isarray
	    function IsArray(argument) {
	        return Array.isArray
	            ? Array.isArray(argument)
	            : argument instanceof Object
	                ? argument instanceof Array
	                : Object.prototype.toString.call(argument) === "[object Array]";
	    }
	    // 7.2.3 IsCallable(argument)
	    // https://tc39.github.io/ecma262/#sec-iscallable
	    function IsCallable(argument) {
	        // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
	        return typeof argument === "function";
	    }
	    // 7.2.4 IsConstructor(argument)
	    // https://tc39.github.io/ecma262/#sec-isconstructor
	    function IsConstructor(argument) {
	        // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
	        return typeof argument === "function";
	    }
	    // 7.2.7 IsPropertyKey(argument)
	    // https://tc39.github.io/ecma262/#sec-ispropertykey
	    function IsPropertyKey(argument) {
	        switch (Type(argument)) {
	            case 3 /* String */: return true;
	            case 4 /* Symbol */: return true;
	            default: return false;
	        }
	    }
	    // 7.3 Operations on Objects
	    // https://tc39.github.io/ecma262/#sec-operations-on-objects
	    // 7.3.9 GetMethod(V, P)
	    // https://tc39.github.io/ecma262/#sec-getmethod
	    function GetMethod(V, P) {
	        var func = V[P];
	        if (func === undefined || func === null)
	            return undefined;
	        if (!IsCallable(func))
	            throw new TypeError();
	        return func;
	    }
	    // 7.4 Operations on Iterator Objects
	    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
	    function GetIterator(obj) {
	        var method = GetMethod(obj, iteratorSymbol);
	        if (!IsCallable(method))
	            throw new TypeError(); // from Call
	        var iterator = method.call(obj);
	        if (!IsObject(iterator))
	            throw new TypeError();
	        return iterator;
	    }
	    // 7.4.4 IteratorValue(iterResult)
	    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
	    function IteratorValue(iterResult) {
	        return iterResult.value;
	    }
	    // 7.4.5 IteratorStep(iterator)
	    // https://tc39.github.io/ecma262/#sec-iteratorstep
	    function IteratorStep(iterator) {
	        var result = iterator.next();
	        return result.done ? false : result;
	    }
	    // 7.4.6 IteratorClose(iterator, completion)
	    // https://tc39.github.io/ecma262/#sec-iteratorclose
	    function IteratorClose(iterator) {
	        var f = iterator["return"];
	        if (f)
	            f.call(iterator);
	    }
	    // 9.1 Ordinary Object Internal Methods and Internal Slots
	    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
	    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
	    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
	    function OrdinaryGetPrototypeOf(O) {
	        var proto = Object.getPrototypeOf(O);
	        if (typeof O !== "function" || O === functionPrototype)
	            return proto;
	        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
	        // Try to determine the superclass constructor. Compatible implementations
	        // must either set __proto__ on a subclass constructor to the superclass constructor,
	        // or ensure each class has a valid `constructor` property on its prototype that
	        // points back to the constructor.
	        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
	        // This is the case when in ES6 or when using __proto__ in a compatible browser.
	        if (proto !== functionPrototype)
	            return proto;
	        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
	        var prototype = O.prototype;
	        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
	        if (prototypeProto == null || prototypeProto === Object.prototype)
	            return proto;
	        // If the constructor was not a function, then we cannot determine the heritage.
	        var constructor = prototypeProto.constructor;
	        if (typeof constructor !== "function")
	            return proto;
	        // If we have some kind of self-reference, then we cannot determine the heritage.
	        if (constructor === O)
	            return proto;
	        // we have a pretty good guess at the heritage.
	        return constructor;
	    }
	    // naive Map shim
	    function CreateMapPolyfill() {
	        var cacheSentinel = {};
	        var arraySentinel = [];
	        var MapIterator = (function () {
	            function MapIterator(keys, values, selector) {
	                this._index = 0;
	                this._keys = keys;
	                this._values = values;
	                this._selector = selector;
	            }
	            MapIterator.prototype["@@iterator"] = function () { return this; };
	            MapIterator.prototype[iteratorSymbol] = function () { return this; };
	            MapIterator.prototype.next = function () {
	                var index = this._index;
	                if (index >= 0 && index < this._keys.length) {
	                    var result = this._selector(this._keys[index], this._values[index]);
	                    if (index + 1 >= this._keys.length) {
	                        this._index = -1;
	                        this._keys = arraySentinel;
	                        this._values = arraySentinel;
	                    }
	                    else {
	                        this._index++;
	                    }
	                    return { value: result, done: false };
	                }
	                return { value: undefined, done: true };
	            };
	            MapIterator.prototype.throw = function (error) {
	                if (this._index >= 0) {
	                    this._index = -1;
	                    this._keys = arraySentinel;
	                    this._values = arraySentinel;
	                }
	                throw error;
	            };
	            MapIterator.prototype.return = function (value) {
	                if (this._index >= 0) {
	                    this._index = -1;
	                    this._keys = arraySentinel;
	                    this._values = arraySentinel;
	                }
	                return { value: value, done: true };
	            };
	            return MapIterator;
	        }());
	        return (function () {
	            function Map() {
	                this._keys = [];
	                this._values = [];
	                this._cacheKey = cacheSentinel;
	                this._cacheIndex = -2;
	            }
	            Object.defineProperty(Map.prototype, "size", {
	                get: function () { return this._keys.length; },
	                enumerable: true,
	                configurable: true
	            });
	            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
	            Map.prototype.get = function (key) {
	                var index = this._find(key, /*insert*/ false);
	                return index >= 0 ? this._values[index] : undefined;
	            };
	            Map.prototype.set = function (key, value) {
	                var index = this._find(key, /*insert*/ true);
	                this._values[index] = value;
	                return this;
	            };
	            Map.prototype.delete = function (key) {
	                var index = this._find(key, /*insert*/ false);
	                if (index >= 0) {
	                    var size = this._keys.length;
	                    for (var i = index + 1; i < size; i++) {
	                        this._keys[i - 1] = this._keys[i];
	                        this._values[i - 1] = this._values[i];
	                    }
	                    this._keys.length--;
	                    this._values.length--;
	                    if (key === this._cacheKey) {
	                        this._cacheKey = cacheSentinel;
	                        this._cacheIndex = -2;
	                    }
	                    return true;
	                }
	                return false;
	            };
	            Map.prototype.clear = function () {
	                this._keys.length = 0;
	                this._values.length = 0;
	                this._cacheKey = cacheSentinel;
	                this._cacheIndex = -2;
	            };
	            Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
	            Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
	            Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
	            Map.prototype["@@iterator"] = function () { return this.entries(); };
	            Map.prototype[iteratorSymbol] = function () { return this.entries(); };
	            Map.prototype._find = function (key, insert) {
	                if (this._cacheKey !== key) {
	                    this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
	                }
	                if (this._cacheIndex < 0 && insert) {
	                    this._cacheIndex = this._keys.length;
	                    this._keys.push(key);
	                    this._values.push(undefined);
	                }
	                return this._cacheIndex;
	            };
	            return Map;
	        }());
	        function getKey(key, _) {
	            return key;
	        }
	        function getValue(_, value) {
	            return value;
	        }
	        function getEntry(key, value) {
	            return [key, value];
	        }
	    }
	    // naive Set shim
	    function CreateSetPolyfill() {
	        return (function () {
	            function Set() {
	                this._map = new _Map();
	            }
	            Object.defineProperty(Set.prototype, "size", {
	                get: function () { return this._map.size; },
	                enumerable: true,
	                configurable: true
	            });
	            Set.prototype.has = function (value) { return this._map.has(value); };
	            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
	            Set.prototype.delete = function (value) { return this._map.delete(value); };
	            Set.prototype.clear = function () { this._map.clear(); };
	            Set.prototype.keys = function () { return this._map.keys(); };
	            Set.prototype.values = function () { return this._map.values(); };
	            Set.prototype.entries = function () { return this._map.entries(); };
	            Set.prototype["@@iterator"] = function () { return this.keys(); };
	            Set.prototype[iteratorSymbol] = function () { return this.keys(); };
	            return Set;
	        }());
	    }
	    // naive WeakMap shim
	    function CreateWeakMapPolyfill() {
	        var UUID_SIZE = 16;
	        var keys = HashMap.create();
	        var rootKey = CreateUniqueKey();
	        return (function () {
	            function WeakMap() {
	                this._key = CreateUniqueKey();
	            }
	            WeakMap.prototype.has = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? HashMap.has(table, this._key) : false;
	            };
	            WeakMap.prototype.get = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? HashMap.get(table, this._key) : undefined;
	            };
	            WeakMap.prototype.set = function (target, value) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
	                table[this._key] = value;
	                return this;
	            };
	            WeakMap.prototype.delete = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? delete table[this._key] : false;
	            };
	            WeakMap.prototype.clear = function () {
	                // NOTE: not a real clear, just makes the previous data unreachable
	                this._key = CreateUniqueKey();
	            };
	            return WeakMap;
	        }());
	        function CreateUniqueKey() {
	            var key;
	            do
	                key = "@@WeakMap@@" + CreateUUID();
	            while (HashMap.has(keys, key));
	            keys[key] = true;
	            return key;
	        }
	        function GetOrCreateWeakMapTable(target, create) {
	            if (!hasOwn.call(target, rootKey)) {
	                if (!create)
	                    return undefined;
	                Object.defineProperty(target, rootKey, { value: HashMap.create() });
	            }
	            return target[rootKey];
	        }
	        function FillRandomBytes(buffer, size) {
	            for (var i = 0; i < size; ++i)
	                buffer[i] = Math.random() * 0xff | 0;
	            return buffer;
	        }
	        function GenRandomBytes(size) {
	            if (typeof Uint8Array === "function") {
	                if (typeof crypto !== "undefined")
	                    return crypto.getRandomValues(new Uint8Array(size));
	                if (typeof msCrypto !== "undefined")
	                    return msCrypto.getRandomValues(new Uint8Array(size));
	                return FillRandomBytes(new Uint8Array(size), size);
	            }
	            return FillRandomBytes(new Array(size), size);
	        }
	        function CreateUUID() {
	            var data = GenRandomBytes(UUID_SIZE);
	            // mark as random - RFC 4122 § 4.4
	            data[6] = data[6] & 0x4f | 0x40;
	            data[8] = data[8] & 0xbf | 0x80;
	            var result = "";
	            for (var offset = 0; offset < UUID_SIZE; ++offset) {
	                var byte = data[offset];
	                if (offset === 4 || offset === 6 || offset === 8)
	                    result += "-";
	                if (byte < 16)
	                    result += "0";
	                result += byte.toString(16).toLowerCase();
	            }
	            return result;
	        }
	    }
	    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
	    function MakeDictionary(obj) {
	        obj.__ = undefined;
	        delete obj.__;
	        return obj;
	    }
	    // patch global Reflect
	    (function (__global) {
	        if (typeof __global.Reflect !== "undefined") {
	            if (__global.Reflect !== Reflect) {
	                for (var p in Reflect) {
	                    if (hasOwn.call(Reflect, p)) {
	                        __global.Reflect[p] = Reflect[p];
	                    }
	                }
	            }
	        }
	        else {
	            __global.Reflect = Reflect;
	        }
	    })(typeof global !== "undefined" ? global :
	        typeof self !== "undefined" ? self :
	            Function("return this;")());
	})(Reflect || (Reflect = {}));
	//# sourceMappingURL=Reflect.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), (function() { return this; }())))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var interfaces_1 = __webpack_require__(43);
	var indexedDBLogger_1 = __webpack_require__(44);
	var messagePager_1 = __webpack_require__(45);
	var conversationBuilder_1 = __webpack_require__(47);
	exports.ConversationBuilder = conversationBuilder_1.ConversationBuilder;
	var messageBuilder_1 = __webpack_require__(48);
	exports.MessageBuilder = messageBuilder_1.MessageBuilder;
	var messageStatusBuilder_1 = __webpack_require__(49);
	exports.MessageStatusBuilder = messageStatusBuilder_1.MessageStatusBuilder;
	var indexedDBOrphanedEventManager_1 = __webpack_require__(50);
	var localStorageOrphanedEventManager_1 = __webpack_require__(51);
	var comapiConfig_1 = __webpack_require__(52);
	exports.ComapiConfig = comapiConfig_1.ComapiConfig;
	var appMessaging_1 = __webpack_require__(54);
	var profile_1 = __webpack_require__(55);
	var services_1 = __webpack_require__(56);
	var device_1 = __webpack_require__(57);
	var channels_1 = __webpack_require__(58);
	var urlConfig_1 = __webpack_require__(53);
	var interfaceManager_1 = __webpack_require__(59);
	exports.InterfaceManager = interfaceManager_1.InterfaceManager;
	var interfaceSymbols_1 = __webpack_require__(64);
	exports.INTERFACE_SYMBOLS = interfaceSymbols_1.INTERFACE_SYMBOLS;
	var inversify_config_1 = __webpack_require__(60);
	var Foundation = Foundation_1 = (function () {
	    function Foundation(_eventManager, _logger, _localStorageData, _networkManager, _deviceManager, _facebookManager, _conversationManager, _profileManager, _messageManager, _comapiConfig) {
	        this._eventManager = _eventManager;
	        this._logger = _logger;
	        this._networkManager = _networkManager;
	        var dbSupported = "indexedDB" in window;
	        var orphanedEventManager;
	        if (dbSupported) {
	            orphanedEventManager = new indexedDBOrphanedEventManager_1.IndexedDBOrphanedEventManager();
	        }
	        else {
	            orphanedEventManager = new localStorageOrphanedEventManager_1.LocalStorageOrphanedEventManager(_localStorageData);
	        }
	        var messagePager = new messagePager_1.MessagePager(_logger, _localStorageData, _messageManager, orphanedEventManager);
	        var appMessaging = new appMessaging_1.AppMessaging(this._networkManager, _conversationManager, _messageManager, messagePager);
	        var profile = new profile_1.Profile(this._networkManager, _localStorageData, _profileManager);
	        this._services = new services_1.Services(appMessaging, profile);
	        this._device = new device_1.Device(this._networkManager, _deviceManager);
	        this._channels = new channels_1.Channels(this._networkManager, _facebookManager);
	    }
	    Foundation.initialiseShared = function (comapiConfig) {
	        return Foundation_1._initialise(comapiConfig, true);
	    };
	    Foundation.initialise = function (comapiConfig) {
	        return Foundation_1._initialise(comapiConfig, false);
	    };
	    Object.defineProperty(Foundation, "version", {
	        get: function () {
	            return "1.0.2.115";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Foundation._initialise = function (comapiConfig, doSingleton) {
	        if (inversify_config_1.container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)) {
	            inversify_config_1.container.unbind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig);
	        }
	        inversify_config_1.container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig).toDynamicValue(function (context) {
	            return comapiConfig;
	        });
	        if (doSingleton && Foundation_1._foundation) {
	            return Promise.resolve(Foundation_1._foundation);
	        }
	        if (comapiConfig.foundationRestUrls === undefined) {
	            comapiConfig.foundationRestUrls = new urlConfig_1.FoundationRestUrls();
	        }
	        if (comapiConfig.logPersistence &&
	            comapiConfig.logPersistence === interfaces_1.LogPersistences.IndexedDB) {
	            var indexedDBLogger_2 = new indexedDBLogger_1.IndexedDBLogger();
	            return indexedDBLogger_2.openDatabase()
	                .then(function () {
	                var retentionHours = comapiConfig.logRetentionHours === undefined ? 24 : comapiConfig.logRetentionHours;
	                var purgeDate = new Date((new Date()).valueOf() - 1000 * 60 * 60 * retentionHours);
	                return indexedDBLogger_2.purge(purgeDate);
	            })
	                .then(function () {
	                var foundation = foundationFactory(comapiConfig, indexedDBLogger_2);
	                if (doSingleton) {
	                    Foundation_1._foundation = foundation;
	                }
	                return Promise.resolve(foundation);
	            });
	        }
	        else {
	            var foundation = foundationFactory(comapiConfig);
	            if (doSingleton) {
	                Foundation_1._foundation = foundation;
	            }
	            return Promise.resolve(foundation);
	        }
	        function foundationFactory(config, indexedDBLogger) {
	            var eventManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager);
	            var localStorageData = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData);
	            var logger = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger);
	            if (config.logLevel) {
	                logger.logLevel = config.logLevel;
	            }
	            var networkManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager);
	            var deviceManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager);
	            var facebookManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager);
	            var conversationManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager);
	            var profileManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager);
	            var messageManager = inversify_config_1.container.get(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager);
	            var foundation = new Foundation_1(eventManager, logger, localStorageData, networkManager, deviceManager, facebookManager, conversationManager, profileManager, messageManager, config);
	            return foundation;
	        }
	    };
	    Foundation.prototype.startSession = function () {
	        return this._networkManager.startSession()
	            .then(function (sessionInfo) {
	            return sessionInfo.session;
	        });
	    };
	    Foundation.prototype.endSession = function () {
	        return this._networkManager.endSession();
	    };
	    Object.defineProperty(Foundation.prototype, "services", {
	        get: function () {
	            return this._services;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Foundation.prototype, "device", {
	        get: function () {
	            return this._device;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Foundation.prototype, "channels", {
	        get: function () {
	            return this._channels;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Foundation.prototype, "session", {
	        get: function () {
	            return this._networkManager.session;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Foundation.prototype, "logger", {
	        get: function () {
	            return this._logger;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Foundation.prototype.on = function (eventType, handler) {
	        this._eventManager.subscribeToLocalEvent(eventType, handler);
	    };
	    Foundation.prototype.off = function (eventType, handler) {
	        this._eventManager.unsubscribeFromLocalEvent(eventType, handler);
	    };
	    Foundation.prototype.getLogs = function () {
	        return this._logger.getLog();
	    };
	    return Foundation;
	}());
	Foundation = Foundation_1 = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
	    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager)),
	    __param(5, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager)),
	    __param(6, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager)),
	    __param(7, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager)),
	    __param(8, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager)),
	    __param(9, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
	], Foundation);
	exports.Foundation = Foundation;
	var Foundation_1;
	//# sourceMappingURL=foundation.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var container_1 = __webpack_require__(5);
	exports.Container = container_1.Container;
	var container_module_1 = __webpack_require__(33);
	exports.ContainerModule = container_module_1.ContainerModule;
	var injectable_1 = __webpack_require__(34);
	exports.injectable = injectable_1.injectable;
	var tagged_1 = __webpack_require__(35);
	exports.tagged = tagged_1.tagged;
	var named_1 = __webpack_require__(37);
	exports.named = named_1.named;
	var inject_1 = __webpack_require__(38);
	exports.inject = inject_1.inject;
	var optional_1 = __webpack_require__(39);
	exports.optional = optional_1.optional;
	var unmanaged_1 = __webpack_require__(40);
	exports.unmanaged = unmanaged_1.unmanaged;
	var multi_inject_1 = __webpack_require__(41);
	exports.multiInject = multi_inject_1.multiInject;
	var target_name_1 = __webpack_require__(42);
	exports.targetName = target_name_1.targetName;
	var metadata_reader_1 = __webpack_require__(32);
	exports.MetadataReader = metadata_reader_1.MetadataReader;
	var guid_1 = __webpack_require__(7);
	exports.guid = guid_1.guid;
	var decorator_utils_1 = __webpack_require__(36);
	exports.decorate = decorator_utils_1.decorate;
	var constraint_helpers_1 = __webpack_require__(30);
	exports.traverseAncerstors = constraint_helpers_1.traverseAncerstors;
	exports.taggedConstraint = constraint_helpers_1.taggedConstraint;
	exports.namedConstraint = constraint_helpers_1.namedConstraint;
	exports.typeConstraint = constraint_helpers_1.typeConstraint;
	var serialization_1 = __webpack_require__(21);
	exports.getServiceIdentifierAsString = serialization_1.getServiceIdentifierAsString;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_1 = __webpack_require__(6);
	var lookup_1 = __webpack_require__(9);
	var planner_1 = __webpack_require__(11);
	var resolver_1 = __webpack_require__(22);
	var binding_to_syntax_1 = __webpack_require__(24);
	var serialization_1 = __webpack_require__(21);
	var container_snapshot_1 = __webpack_require__(31);
	var guid_1 = __webpack_require__(7);
	var ERROR_MSGS = __webpack_require__(10);
	var METADATA_KEY = __webpack_require__(17);
	var literal_types_1 = __webpack_require__(8);
	var metadata_reader_1 = __webpack_require__(32);
	var Container = (function () {
	    function Container(containerOptions) {
	        if (containerOptions !== undefined) {
	            if (typeof containerOptions !== "object") {
	                throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
	            }
	            else if (containerOptions.defaultScope === undefined) {
	                throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
	            }
	            else if (containerOptions.defaultScope !== literal_types_1.BindingScopeEnum.Singleton &&
	                containerOptions.defaultScope !== literal_types_1.BindingScopeEnum.Transient) {
	                throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
	            }
	            this.options = {
	                defaultScope: containerOptions.defaultScope
	            };
	        }
	        else {
	            this.options = {
	                defaultScope: literal_types_1.BindingScopeEnum.Transient
	            };
	        }
	        this.guid = guid_1.guid();
	        this._bindingDictionary = new lookup_1.Lookup();
	        this._snapshots = [];
	        this._middleware = null;
	        this.parent = null;
	        this._metadataReader = new metadata_reader_1.MetadataReader();
	    }
	    Container.merge = function (container1, container2) {
	        var container = new Container();
	        var bindingDictionary = planner_1.getBindingDictionary(container);
	        var bindingDictionary1 = planner_1.getBindingDictionary(container1);
	        var bindingDictionary2 = planner_1.getBindingDictionary(container2);
	        function copyDictionary(origing, destination) {
	            origing.traverse(function (key, value) {
	                value.forEach(function (binding) {
	                    destination.add(binding.serviceIdentifier, binding.clone());
	                });
	            });
	        }
	        copyDictionary(bindingDictionary1, bindingDictionary);
	        copyDictionary(bindingDictionary2, bindingDictionary);
	        return container;
	    };
	    Container.prototype.load = function () {
	        var _this = this;
	        var modules = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            modules[_i] = arguments[_i];
	        }
	        var setModuleId = function (bindingToSyntax, moduleId) {
	            bindingToSyntax._binding.moduleId = moduleId;
	        };
	        var getBindFunction = function (moduleId) {
	            return function (serviceIdentifier) {
	                var bindingToSyntax = _this.bind.call(_this, serviceIdentifier);
	                setModuleId(bindingToSyntax, moduleId);
	                return bindingToSyntax;
	            };
	        };
	        var getUnbindFunction = function (moduleId) {
	            return function (serviceIdentifier) {
	                var _unbind = _this.unbind.bind(_this);
	                _unbind(serviceIdentifier);
	            };
	        };
	        var getIsboundFunction = function (moduleId) {
	            return function (serviceIdentifier) {
	                var _isBound = _this.isBound.bind(_this);
	                return _isBound(serviceIdentifier);
	            };
	        };
	        var getRebindFunction = function (moduleId) {
	            return function (serviceIdentifier) {
	                var bindingToSyntax = _this.rebind.call(_this, serviceIdentifier);
	                setModuleId(bindingToSyntax, moduleId);
	                return bindingToSyntax;
	            };
	        };
	        modules.forEach(function (module) {
	            var bindFunction = getBindFunction(module.guid);
	            var unbindFunction = getUnbindFunction(module.guid);
	            var isboundFunction = getIsboundFunction(module.guid);
	            var rebindFunction = getRebindFunction(module.guid);
	            module.registry(bindFunction, unbindFunction, isboundFunction, rebindFunction);
	        });
	    };
	    Container.prototype.unload = function () {
	        var _this = this;
	        var modules = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            modules[_i] = arguments[_i];
	        }
	        var conditionFactory = function (expected) { return function (item) {
	            return item.moduleId === expected;
	        }; };
	        modules.forEach(function (module) {
	            var condition = conditionFactory(module.guid);
	            _this._bindingDictionary.removeByCondition(condition);
	        });
	    };
	    Container.prototype.bind = function (serviceIdentifier) {
	        var defaultScope = literal_types_1.BindingScopeEnum.Transient;
	        defaultScope = (this.options.defaultScope === defaultScope) ? defaultScope : literal_types_1.BindingScopeEnum.Singleton;
	        var binding = new binding_1.Binding(serviceIdentifier, defaultScope);
	        this._bindingDictionary.add(serviceIdentifier, binding);
	        return new binding_to_syntax_1.BindingToSyntax(binding);
	    };
	    Container.prototype.rebind = function (serviceIdentifier) {
	        this.unbind(serviceIdentifier);
	        return this.bind(serviceIdentifier);
	    };
	    Container.prototype.unbind = function (serviceIdentifier) {
	        try {
	            this._bindingDictionary.remove(serviceIdentifier);
	        }
	        catch (e) {
	            throw new Error(ERROR_MSGS.CANNOT_UNBIND + " " + serialization_1.getServiceIdentifierAsString(serviceIdentifier));
	        }
	    };
	    Container.prototype.unbindAll = function () {
	        this._bindingDictionary = new lookup_1.Lookup();
	    };
	    Container.prototype.isBound = function (serviceIdentifier) {
	        return this._bindingDictionary.hasKey(serviceIdentifier);
	    };
	    Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
	        return this.isBoundTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
	    };
	    Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
	        var bindings = this._bindingDictionary.get(serviceIdentifier);
	        var request = planner_1.createMockRequest(this, serviceIdentifier, key, value);
	        return bindings.some(function (b) { return b.constraint(request); });
	    };
	    Container.prototype.snapshot = function () {
	        this._snapshots.push(container_snapshot_1.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware));
	    };
	    Container.prototype.restore = function () {
	        var snapshot = this._snapshots.pop();
	        if (snapshot === undefined) {
	            throw new Error(ERROR_MSGS.NO_MORE_SNAPSHOTS_AVAILABLE);
	        }
	        this._bindingDictionary = snapshot.bindings;
	        this._middleware = snapshot.middleware;
	    };
	    Container.prototype.createChild = function () {
	        var child = new Container();
	        child.parent = this;
	        return child;
	    };
	    Container.prototype.applyMiddleware = function () {
	        var middlewares = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            middlewares[_i] = arguments[_i];
	        }
	        var initial = (this._middleware) ? this._middleware : this._planAndResolve();
	        this._middleware = middlewares.reduce(function (prev, curr) {
	            return curr(prev);
	        }, initial);
	    };
	    Container.prototype.applyCustomMetadataReader = function (metadataReader) {
	        this._metadataReader = metadataReader;
	    };
	    Container.prototype.get = function (serviceIdentifier) {
	        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
	    };
	    Container.prototype.getTagged = function (serviceIdentifier, key, value) {
	        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
	    };
	    Container.prototype.getNamed = function (serviceIdentifier, named) {
	        return this.getTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
	    };
	    Container.prototype.getAll = function (serviceIdentifier) {
	        return this._get(true, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
	    };
	    Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
	        return this._get(false, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
	    };
	    Container.prototype.getAllNamed = function (serviceIdentifier, named) {
	        return this.getAllTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
	    };
	    Container.prototype.resolve = function (constructorFunction) {
	        var tempContainer = new Container();
	        tempContainer.bind(constructorFunction).toSelf();
	        tempContainer.parent = this;
	        return tempContainer.get(constructorFunction);
	    };
	    Container.prototype._get = function (avoidConstraints, isMultiInject, targetType, serviceIdentifier, key, value) {
	        var result = null;
	        var defaultArgs = {
	            avoidConstraints: avoidConstraints,
	            contextInterceptor: function (context) { return context; },
	            isMultiInject: isMultiInject,
	            key: key,
	            serviceIdentifier: serviceIdentifier,
	            targetType: targetType,
	            value: value
	        };
	        if (this._middleware) {
	            result = this._middleware(defaultArgs);
	            if (result === undefined || result === null) {
	                throw new Error(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);
	            }
	        }
	        else {
	            result = this._planAndResolve()(defaultArgs);
	        }
	        return result;
	    };
	    Container.prototype._planAndResolve = function () {
	        var _this = this;
	        return function (args) {
	            var context = planner_1.plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
	            context = args.contextInterceptor(context);
	            var result = resolver_1.resolve(context);
	            return result;
	        };
	    };
	    return Container;
	}());
	exports.Container = Container;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(7);
	var literal_types_1 = __webpack_require__(8);
	var Binding = (function () {
	    function Binding(serviceIdentifier, defaultScope) {
	        this.guid = guid_1.guid();
	        this.activated = false;
	        this.serviceIdentifier = serviceIdentifier;
	        this.scope = defaultScope;
	        this.type = literal_types_1.BindingTypeEnum.Invalid;
	        this.constraint = function (request) { return true; };
	        this.implementationType = null;
	        this.cache = null;
	        this.factory = null;
	        this.provider = null;
	        this.onActivation = null;
	        this.dynamicValue = null;
	    }
	    Binding.prototype.clone = function () {
	        var clone = new Binding(this.serviceIdentifier, this.scope);
	        clone.activated = false;
	        clone.implementationType = this.implementationType;
	        clone.dynamicValue = this.dynamicValue;
	        clone.scope = this.scope;
	        clone.type = this.type;
	        clone.factory = this.factory;
	        clone.provider = this.provider;
	        clone.constraint = this.constraint;
	        clone.onActivation = this.onActivation;
	        clone.cache = this.cache;
	        return clone;
	    };
	    return Binding;
	}());
	exports.Binding = Binding;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function guid() {
	    function s4() {
	        return Math.floor((1 + Math.random()) * 0x10000)
	            .toString(16)
	            .substring(1);
	    }
	    return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
	        s4() + "-" + s4() + s4() + s4();
	}
	exports.guid = guid;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var BindingScopeEnum = {
	    Singleton: "Singleton",
	    Transient: "Transient"
	};
	exports.BindingScopeEnum = BindingScopeEnum;
	var BindingTypeEnum = {
	    ConstantValue: "ConstantValue",
	    Constructor: "Constructor",
	    DynamicValue: "DynamicValue",
	    Factory: "Factory",
	    Function: "Function",
	    Instance: "Instance",
	    Invalid: "Invalid",
	    Provider: "Provider"
	};
	exports.BindingTypeEnum = BindingTypeEnum;
	var TargetTypeEnum = {
	    ClassProperty: "ClassProperty",
	    ConstructorArgument: "ConstructorArgument",
	    Variable: "Variable"
	};
	exports.TargetTypeEnum = TargetTypeEnum;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERROR_MSGS = __webpack_require__(10);
	var Lookup = (function () {
	    function Lookup() {
	        this._map = new Map();
	    }
	    Lookup.prototype.getMap = function () {
	        return this._map;
	    };
	    Lookup.prototype.add = function (serviceIdentifier, value) {
	        if (serviceIdentifier === null || serviceIdentifier === undefined) {
	            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
	        }
	        if (value === null || value === undefined) {
	            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
	        }
	        var entry = this._map.get(serviceIdentifier);
	        if (entry !== undefined) {
	            entry.push(value);
	            this._map.set(serviceIdentifier, entry);
	        }
	        else {
	            this._map.set(serviceIdentifier, [value]);
	        }
	    };
	    Lookup.prototype.get = function (serviceIdentifier) {
	        if (serviceIdentifier === null || serviceIdentifier === undefined) {
	            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
	        }
	        var entry = this._map.get(serviceIdentifier);
	        if (entry !== undefined) {
	            return entry;
	        }
	        else {
	            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
	        }
	    };
	    Lookup.prototype.remove = function (serviceIdentifier) {
	        if (serviceIdentifier === null || serviceIdentifier === undefined) {
	            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
	        }
	        if (!this._map.delete(serviceIdentifier)) {
	            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
	        }
	    };
	    Lookup.prototype.removeByCondition = function (condition) {
	        var _this = this;
	        this._map.forEach(function (entries, key) {
	            var updatedEntries = entries.filter(function (entry) { return !condition(entry); });
	            if (updatedEntries.length > 0) {
	                _this._map.set(key, updatedEntries);
	            }
	            else {
	                _this._map.delete(key);
	            }
	        });
	    };
	    Lookup.prototype.hasKey = function (serviceIdentifier) {
	        if (serviceIdentifier === null || serviceIdentifier === undefined) {
	            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
	        }
	        return this._map.has(serviceIdentifier);
	    };
	    Lookup.prototype.clone = function () {
	        var copy = new Lookup();
	        this._map.forEach(function (value, key) {
	            value.forEach(function (b) { return copy.add(key, b.clone()); });
	        });
	        return copy;
	    };
	    Lookup.prototype.traverse = function (func) {
	        this._map.forEach(function (value, key) {
	            func(key, value);
	        });
	    };
	    return Lookup;
	}());
	exports.Lookup = Lookup;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
	exports.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
	exports.NULL_ARGUMENT = "NULL argument";
	exports.KEY_NOT_FOUND = "Key Not Found";
	exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
	exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
	exports.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
	exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
	exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
	exports.CIRCULAR_DEPENDENCY = "Circular dependency found:";
	exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
	exports.INVALID_BINDING_TYPE = "Invalid binding type:";
	exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
	exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
	exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
	exports.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
	    "used as service identifier";
	exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
	    "must be applied to the parameters of a class constructor or a class property.";
	exports.ARGUMENTS_LENGTH_MISMATCH_1 = "The number of constructor arguments in the derived class ";
	exports.ARGUMENTS_LENGTH_MISMATCH_2 = " must be >= than the number of constructor arguments of its base class.";
	exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
	    "must be an object.";
	exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
	    "be a string ('singleton' or 'transient').";


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var plan_1 = __webpack_require__(12);
	var context_1 = __webpack_require__(13);
	var request_1 = __webpack_require__(14);
	var target_1 = __webpack_require__(15);
	var binding_count_1 = __webpack_require__(19);
	var reflection_utils_1 = __webpack_require__(20);
	var metadata_1 = __webpack_require__(16);
	var ERROR_MSGS = __webpack_require__(10);
	var METADATA_KEY = __webpack_require__(17);
	var literal_types_1 = __webpack_require__(8);
	var serialization_1 = __webpack_require__(21);
	function getBindingDictionary(cntnr) {
	    return cntnr._bindingDictionary;
	}
	exports.getBindingDictionary = getBindingDictionary;
	function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
	    var metadataKey = isMultiInject ? METADATA_KEY.MULTI_INJECT_TAG : METADATA_KEY.INJECT_TAG;
	    var injectMetadata = new metadata_1.Metadata(metadataKey, serviceIdentifier);
	    var target = new target_1.Target(targetType, name, serviceIdentifier, injectMetadata);
	    if (key !== undefined) {
	        var tagMetadata = new metadata_1.Metadata(key, value);
	        target.metadata.push(tagMetadata);
	    }
	    return target;
	}
	function _getActiveBindings(avoidConstraints, context, parentRequest, target) {
	    var bindings = getBindings(context.container, target.serviceIdentifier);
	    var activeBindings = [];
	    if (avoidConstraints === false) {
	        activeBindings = bindings.filter(function (binding) {
	            var request = new request_1.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
	            return binding.constraint(request);
	        });
	    }
	    else {
	        activeBindings = bindings;
	    }
	    _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
	    return activeBindings;
	}
	function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
	    switch (bindings.length) {
	        case binding_count_1.BindingCount.NoBindingsAvailable:
	            if (target.isOptional() === true) {
	                return bindings;
	            }
	            else {
	                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
	                var msg = ERROR_MSGS.NOT_REGISTERED;
	                msg += serialization_1.listMetadataForTarget(serviceIdentifierString, target);
	                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
	                throw new Error(msg);
	            }
	        case binding_count_1.BindingCount.OnlyOneBindingAvailable:
	            if (target.isArray() === false) {
	                return bindings;
	            }
	        case binding_count_1.BindingCount.MultipleBindingsAvailable:
	        default:
	            if (target.isArray() === false) {
	                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier), msg = ERROR_MSGS.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
	                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
	                throw new Error(msg);
	            }
	            else {
	                return bindings;
	            }
	    }
	}
	function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
	    try {
	        var activeBindings = void 0;
	        var childRequest_1;
	        if (parentRequest === null) {
	            activeBindings = _getActiveBindings(avoidConstraints, context, null, target);
	            childRequest_1 = new request_1.Request(serviceIdentifier, context, null, activeBindings, target);
	            var plan_2 = new plan_1.Plan(context, childRequest_1);
	            context.addPlan(plan_2);
	        }
	        else {
	            activeBindings = _getActiveBindings(avoidConstraints, context, parentRequest, target);
	            childRequest_1 = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
	        }
	        activeBindings.forEach(function (binding) {
	            var subChildRequest = null;
	            if (target.isArray()) {
	                subChildRequest = childRequest_1.addChildRequest(binding.serviceIdentifier, binding, target);
	            }
	            else {
	                subChildRequest = childRequest_1;
	            }
	            if (binding.type === literal_types_1.BindingTypeEnum.Instance && binding.implementationType !== null) {
	                var dependencies = reflection_utils_1.getDependencies(metadataReader, binding.implementationType);
	                dependencies.forEach(function (dependency) {
	                    _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
	                });
	            }
	        });
	    }
	    catch (error) {
	        if (error instanceof RangeError && parentRequest !== null) {
	            serialization_1.circularDependencyToException(parentRequest.parentContext.plan.rootRequest);
	        }
	        else {
	            throw new Error(error.message);
	        }
	    }
	}
	function getBindings(container, serviceIdentifier) {
	    var bindings = [];
	    var bindingDictionary = getBindingDictionary(container);
	    if (bindingDictionary.hasKey(serviceIdentifier)) {
	        bindings = bindingDictionary.get(serviceIdentifier);
	    }
	    else if (container.parent !== null) {
	        bindings = getBindings(container.parent, serviceIdentifier);
	    }
	    return bindings;
	}
	function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
	    if (avoidConstraints === void 0) { avoidConstraints = false; }
	    var context = new context_1.Context(container);
	    var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
	    _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
	    return context;
	}
	exports.plan = plan;
	function createMockRequest(container, serviceIdentifier, key, value) {
	    var target = new target_1.Target(literal_types_1.TargetTypeEnum.Variable, "", serviceIdentifier, new metadata_1.Metadata(key, value));
	    var context = new context_1.Context(container);
	    var request = new request_1.Request(serviceIdentifier, context, null, [], target);
	    return request;
	}
	exports.createMockRequest = createMockRequest;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Plan = (function () {
	    function Plan(parentContext, rootRequest) {
	        this.parentContext = parentContext;
	        this.rootRequest = rootRequest;
	    }
	    return Plan;
	}());
	exports.Plan = Plan;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(7);
	var Context = (function () {
	    function Context(container) {
	        this.guid = guid_1.guid();
	        this.container = container;
	    }
	    Context.prototype.addPlan = function (plan) {
	        this.plan = plan;
	    };
	    return Context;
	}());
	exports.Context = Context;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(7);
	var Request = (function () {
	    function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
	        this.guid = guid_1.guid();
	        this.serviceIdentifier = serviceIdentifier;
	        this.parentContext = parentContext;
	        this.parentRequest = parentRequest;
	        this.target = target;
	        this.childRequests = [];
	        this.bindings = (Array.isArray(bindings) ? bindings : [bindings]);
	    }
	    Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
	        var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
	        this.childRequests.push(child);
	        return child;
	    };
	    return Request;
	}());
	exports.Request = Request;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var metadata_1 = __webpack_require__(16);
	var queryable_string_1 = __webpack_require__(18);
	var guid_1 = __webpack_require__(7);
	var METADATA_KEY = __webpack_require__(17);
	var Target = (function () {
	    function Target(type, name, serviceIdentifier, namedOrTagged) {
	        this.guid = guid_1.guid();
	        this.type = type;
	        this.serviceIdentifier = serviceIdentifier;
	        this.name = new queryable_string_1.QueryableString(name || "");
	        this.metadata = new Array();
	        var metadataItem = null;
	        if (typeof namedOrTagged === "string") {
	            metadataItem = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, namedOrTagged);
	        }
	        else if (namedOrTagged instanceof metadata_1.Metadata) {
	            metadataItem = namedOrTagged;
	        }
	        if (metadataItem !== null) {
	            this.metadata.push(metadataItem);
	        }
	    }
	    Target.prototype.hasTag = function (key) {
	        for (var i = 0; i < this.metadata.length; i++) {
	            var m = this.metadata[i];
	            if (m.key === key) {
	                return true;
	            }
	        }
	        return false;
	    };
	    Target.prototype.isArray = function () {
	        return this.hasTag(METADATA_KEY.MULTI_INJECT_TAG);
	    };
	    Target.prototype.matchesArray = function (name) {
	        return this.matchesTag(METADATA_KEY.MULTI_INJECT_TAG)(name);
	    };
	    Target.prototype.isNamed = function () {
	        return this.hasTag(METADATA_KEY.NAMED_TAG);
	    };
	    Target.prototype.isTagged = function () {
	        return this.metadata.some(function (m) {
	            return (m.key !== METADATA_KEY.INJECT_TAG) &&
	                (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
	                (m.key !== METADATA_KEY.NAME_TAG) &&
	                (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
	                (m.key !== METADATA_KEY.NAMED_TAG);
	        });
	    };
	    Target.prototype.isOptional = function () {
	        return this.matchesTag(METADATA_KEY.OPTIONAL_TAG)(true);
	    };
	    Target.prototype.getNamedTag = function () {
	        if (this.isNamed()) {
	            return this.metadata.filter(function (m) { return m.key === METADATA_KEY.NAMED_TAG; })[0];
	        }
	        return null;
	    };
	    Target.prototype.getCustomTags = function () {
	        if (this.isTagged()) {
	            return this.metadata.filter(function (m) {
	                return (m.key !== METADATA_KEY.INJECT_TAG) &&
	                    (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
	                    (m.key !== METADATA_KEY.NAME_TAG) &&
	                    (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
	                    (m.key !== METADATA_KEY.NAMED_TAG);
	            });
	        }
	        return null;
	    };
	    Target.prototype.matchesNamedTag = function (name) {
	        return this.matchesTag(METADATA_KEY.NAMED_TAG)(name);
	    };
	    Target.prototype.matchesTag = function (key) {
	        var _this = this;
	        return function (value) {
	            for (var i = 0; i < _this.metadata.length; i++) {
	                var m = _this.metadata[i];
	                if (m.key === key && m.value === value) {
	                    return true;
	                }
	            }
	            return false;
	        };
	    };
	    return Target;
	}());
	exports.Target = Target;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(17);
	var Metadata = (function () {
	    function Metadata(key, value) {
	        this.key = key;
	        this.value = value;
	    }
	    Metadata.prototype.toString = function () {
	        if (this.key === METADATA_KEY.NAMED_TAG) {
	            return "named: " + this.value.toString() + " ";
	        }
	        else {
	            return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
	        }
	    };
	    return Metadata;
	}());
	exports.Metadata = Metadata;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NAMED_TAG = "named";
	exports.NAME_TAG = "name";
	exports.UNMANAGED_TAG = "unmanaged";
	exports.OPTIONAL_TAG = "optional";
	exports.INJECT_TAG = "inject";
	exports.MULTI_INJECT_TAG = "multi_inject";
	exports.TAGGED = "inversify:tagged";
	exports.TAGGED_PROP = "inversify:tagged_props";
	exports.PARAM_TYPES = "inversify:paramtypes";
	exports.DESIGN_PARAM_TYPES = "design:paramtypes";


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var QueryableString = (function () {
	    function QueryableString(str) {
	        this.str = str;
	    }
	    QueryableString.prototype.startsWith = function (searchString) {
	        return this.str.indexOf(searchString) === 0;
	    };
	    QueryableString.prototype.endsWith = function (searchString) {
	        var reverseString = "";
	        var reverseSearchString = searchString.split("").reverse().join("");
	        reverseString = this.str.split("").reverse().join("");
	        return this.startsWith.call({ str: reverseString }, reverseSearchString);
	    };
	    QueryableString.prototype.contains = function (searchString) {
	        return (this.str.indexOf(searchString) !== -1);
	    };
	    QueryableString.prototype.equals = function (compareString) {
	        return this.str === compareString;
	    };
	    QueryableString.prototype.value = function () {
	        return this.str;
	    };
	    return QueryableString;
	}());
	exports.QueryableString = QueryableString;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var BindingCount = {
	    MultipleBindingsAvailable: 2,
	    NoBindingsAvailable: 0,
	    OnlyOneBindingAvailable: 1
	};
	exports.BindingCount = BindingCount;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var serialization_1 = __webpack_require__(21);
	var target_1 = __webpack_require__(15);
	var ERROR_MSGS = __webpack_require__(10);
	var METADATA_KEY = __webpack_require__(17);
	var literal_types_1 = __webpack_require__(8);
	function getDependencies(metadataReader, func) {
	    var constructorName = serialization_1.getFunctionName(func);
	    var targets = getTargets(metadataReader, constructorName, func, false);
	    return targets;
	}
	exports.getDependencies = getDependencies;
	function getTargets(metadataReader, constructorName, func, isBaseClass) {
	    var metadata = metadataReader.getConstructorMetadata(func);
	    var serviceIdentifiers = metadata.compilerGeneratedMetadata;
	    if (serviceIdentifiers === undefined) {
	        var msg = ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
	        throw new Error(msg);
	    }
	    var constructorArgsMetadata = metadata.userGeneratedMetadata;
	    var keys = Object.keys(constructorArgsMetadata);
	    var hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
	    var iterations = (hasUserDeclaredUnknownInjections) ? keys.length : func.length;
	    var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
	    var propertyTargets = getClassPropsAsTargets(metadataReader, func);
	    var targets = constructorTargets.concat(propertyTargets);
	    var baseClassDepencencyCount = getBaseClassDepencencyCount(metadataReader, func);
	    if (targets.length < baseClassDepencencyCount) {
	        var error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH_1 +
	            constructorName + ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH_2;
	        throw new Error(error);
	    }
	    return targets;
	}
	function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
	    var targetMetadata = constructorArgsMetadata[index.toString()] || [];
	    var metadata = formatTargetMetadata(targetMetadata);
	    var isManaged = metadata.unmanaged !== true;
	    var serviceIndentifier = serviceIdentifiers[index];
	    var injectIndentifier = (metadata.inject || metadata.multiInject);
	    serviceIndentifier = (injectIndentifier) ? (injectIndentifier) : serviceIndentifier;
	    if (isManaged === true) {
	        var isObject = serviceIndentifier === Object;
	        var isFunction = serviceIndentifier === Function;
	        var isUndefined = serviceIndentifier === undefined;
	        var isUnknownType = (isObject || isFunction || isUndefined);
	        if (isBaseClass === false && isUnknownType) {
	            var msg = ERROR_MSGS.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
	            throw new Error(msg);
	        }
	        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIndentifier);
	        target.metadata = targetMetadata;
	        return target;
	    }
	    return null;
	}
	function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
	    var targets = [];
	    for (var i = 0; i < iterations; i++) {
	        var index = i;
	        var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
	        if (target !== null) {
	            targets.push(target);
	        }
	    }
	    return targets;
	}
	function getClassPropsAsTargets(metadataReader, constructorFunc) {
	    var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
	    var targets = [];
	    var keys = Object.keys(classPropsMetadata);
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var targetMetadata = classPropsMetadata[key];
	        var metadata = formatTargetMetadata(classPropsMetadata[key]);
	        var targetName = metadata.targetName || key;
	        var serviceIndentifier = (metadata.inject || metadata.multiInject);
	        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ClassProperty, targetName, serviceIndentifier);
	        target.metadata = targetMetadata;
	        targets.push(target);
	    }
	    var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
	    if (baseConstructor !== Object) {
	        var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor);
	        targets = targets.concat(baseTargets);
	    }
	    return targets;
	}
	function getBaseClassDepencencyCount(metadataReader, func) {
	    var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
	    if (baseConstructor !== Object) {
	        var baseConstructorName = serialization_1.getFunctionName(baseConstructor);
	        var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
	        var metadata = targets.map(function (t) {
	            return t.metadata.filter(function (m) {
	                return m.key === METADATA_KEY.UNMANAGED_TAG;
	            });
	        });
	        var unmanagedCount = [].concat.apply([], metadata).length;
	        var dependencyCount = targets.length - unmanagedCount;
	        if (dependencyCount > 0) {
	            return dependencyCount;
	        }
	        else {
	            return getBaseClassDepencencyCount(metadataReader, baseConstructor);
	        }
	    }
	    else {
	        return 0;
	    }
	}
	function formatTargetMetadata(targetMetadata) {
	    var targetMetadataMap = {};
	    targetMetadata.forEach(function (m) {
	        targetMetadataMap[m.key.toString()] = m.value;
	    });
	    return {
	        inject: targetMetadataMap[METADATA_KEY.INJECT_TAG],
	        multiInject: targetMetadataMap[METADATA_KEY.MULTI_INJECT_TAG],
	        targetName: targetMetadataMap[METADATA_KEY.NAME_TAG],
	        unmanaged: targetMetadataMap[METADATA_KEY.UNMANAGED_TAG]
	    };
	}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERROR_MSGS = __webpack_require__(10);
	function getServiceIdentifierAsString(serviceIdentifier) {
	    if (typeof serviceIdentifier === "function") {
	        var _serviceIdentifier = serviceIdentifier;
	        return _serviceIdentifier.name;
	    }
	    else if (typeof serviceIdentifier === "symbol") {
	        return serviceIdentifier.toString();
	    }
	    else {
	        var _serviceIdentifier = serviceIdentifier;
	        return _serviceIdentifier;
	    }
	}
	exports.getServiceIdentifierAsString = getServiceIdentifierAsString;
	function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
	    var registeredBindingsList = "";
	    var registeredBindings = getBindings(container, serviceIdentifier);
	    if (registeredBindings.length !== 0) {
	        registeredBindingsList = "\nRegistered bindings:";
	        registeredBindings.forEach(function (binding) {
	            var name = "Object";
	            if (binding.implementationType !== null) {
	                name = getFunctionName(binding.implementationType);
	            }
	            registeredBindingsList = registeredBindingsList + "\n " + name;
	            if (binding.constraint.metaData) {
	                registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
	            }
	        });
	    }
	    return registeredBindingsList;
	}
	exports.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;
	function circularDependencyToException(request, previousServiceIdentifiers) {
	    if (previousServiceIdentifiers === void 0) { previousServiceIdentifiers = []; }
	    var parentServiceIdentifier = getServiceIdentifierAsString(request.serviceIdentifier);
	    previousServiceIdentifiers.push(parentServiceIdentifier);
	    request.childRequests.forEach(function (childRequest) {
	        var childServiceIdentifier = getServiceIdentifierAsString(childRequest.serviceIdentifier);
	        if (previousServiceIdentifiers.indexOf(childServiceIdentifier) === -1) {
	            if (childRequest.childRequests.length > 0) {
	                circularDependencyToException(childRequest, previousServiceIdentifiers);
	            }
	            else {
	                previousServiceIdentifiers.push(childServiceIdentifier);
	            }
	        }
	        else {
	            previousServiceIdentifiers.push(childServiceIdentifier);
	            var services = previousServiceIdentifiers.reduce(function (prev, curr) {
	                return (prev !== "") ? prev + " -> " + curr : "" + curr;
	            }, "");
	            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY + " " + services);
	        }
	    });
	}
	exports.circularDependencyToException = circularDependencyToException;
	function listMetadataForTarget(serviceIdentifierString, target) {
	    if (target.isTagged() || target.isNamed()) {
	        var m_1 = "";
	        var namedTag = target.getNamedTag();
	        var otherTags = target.getCustomTags();
	        if (namedTag !== null) {
	            m_1 += namedTag.toString() + "\n";
	        }
	        if (otherTags !== null) {
	            otherTags.forEach(function (tag) {
	                m_1 += tag.toString() + "\n";
	            });
	        }
	        return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
	    }
	    else {
	        return " " + serviceIdentifierString;
	    }
	}
	exports.listMetadataForTarget = listMetadataForTarget;
	function getFunctionName(v) {
	    if (v.name) {
	        return v.name;
	    }
	    else {
	        var name_1 = v.toString();
	        var match = name_1.match(/^function\s*([^\s(]+)/);
	        return match ? match[1] : "Anonymous function: " + name_1;
	    }
	}
	exports.getFunctionName = getFunctionName;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var literal_types_1 = __webpack_require__(8);
	var serialization_1 = __webpack_require__(21);
	var instantiation_1 = __webpack_require__(23);
	var ERROR_MSGS = __webpack_require__(10);
	function _resolveRequest(request) {
	    var bindings = request.bindings;
	    var childRequests = request.childRequests;
	    var targetIsAnAray = request.target && request.target.isArray();
	    var targetParentIsNotAnArray = !request.parentRequest ||
	        !request.parentRequest.target ||
	        !request.target ||
	        !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
	    if (targetIsAnAray && targetParentIsNotAnArray) {
	        return childRequests.map(function (childRequest) {
	            return _resolveRequest(childRequest);
	        });
	    }
	    else {
	        var result = null;
	        if (request.target.isOptional() === true && bindings.length === 0) {
	            return undefined;
	        }
	        var binding = bindings[0];
	        var isSingleton = binding.scope === literal_types_1.BindingScopeEnum.Singleton;
	        if (isSingleton && binding.activated === true) {
	            return binding.cache;
	        }
	        if (binding.type === literal_types_1.BindingTypeEnum.ConstantValue) {
	            result = binding.cache;
	        }
	        else if (binding.type === literal_types_1.BindingTypeEnum.Function) {
	            result = binding.cache;
	        }
	        else if (binding.type === literal_types_1.BindingTypeEnum.Constructor) {
	            result = binding.implementationType;
	        }
	        else if (binding.type === literal_types_1.BindingTypeEnum.DynamicValue && binding.dynamicValue !== null) {
	            result = binding.dynamicValue(request.parentContext);
	        }
	        else if (binding.type === literal_types_1.BindingTypeEnum.Factory && binding.factory !== null) {
	            result = binding.factory(request.parentContext);
	        }
	        else if (binding.type === literal_types_1.BindingTypeEnum.Provider && binding.provider !== null) {
	            result = binding.provider(request.parentContext);
	        }
	        else if (binding.type === literal_types_1.BindingTypeEnum.Instance && binding.implementationType !== null) {
	            result = instantiation_1.resolveInstance(binding.implementationType, childRequests, _resolveRequest);
	        }
	        else {
	            var serviceIdentifier = serialization_1.getServiceIdentifierAsString(request.serviceIdentifier);
	            throw new Error(ERROR_MSGS.INVALID_BINDING_TYPE + " " + serviceIdentifier);
	        }
	        if (typeof binding.onActivation === "function") {
	            result = binding.onActivation(request.parentContext, result);
	        }
	        if (isSingleton) {
	            binding.cache = result;
	            binding.activated = true;
	        }
	        return result;
	    }
	}
	function resolve(context) {
	    return _resolveRequest(context.plan.rootRequest);
	}
	exports.resolve = resolve;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var literal_types_1 = __webpack_require__(8);
	function _injectProperties(instance, childRequests, resolveRequest) {
	    var propertyInjectionsRequests = childRequests.filter(function (childRequest) {
	        return (childRequest.target !== null && childRequest.target.type === literal_types_1.TargetTypeEnum.ClassProperty);
	    });
	    var propertyInjections = propertyInjectionsRequests.map(function (childRequest) {
	        return resolveRequest(childRequest);
	    });
	    propertyInjectionsRequests.forEach(function (r, index) {
	        var propertyName = "";
	        propertyName = r.target.name.value();
	        var injection = propertyInjections[index];
	        instance[propertyName] = injection;
	    });
	    return instance;
	}
	function _createInstance(Func, injections) {
	    return new (Func.bind.apply(Func, [void 0].concat(injections)))();
	}
	function resolveInstance(constr, childRequests, resolveRequest) {
	    var result = null;
	    if (childRequests.length > 0) {
	        var constructorInjectionsRequests = childRequests.filter(function (childRequest) {
	            return (childRequest.target !== null && childRequest.target.type === literal_types_1.TargetTypeEnum.ConstructorArgument);
	        });
	        var constructorInjections = constructorInjectionsRequests.map(function (childRequest) {
	            return resolveRequest(childRequest);
	        });
	        result = _createInstance(constr, constructorInjections);
	        result = _injectProperties(result, childRequests, resolveRequest);
	    }
	    else {
	        result = new constr();
	    }
	    return result;
	}
	exports.resolveInstance = resolveInstance;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_in_when_on_syntax_1 = __webpack_require__(25);
	var binding_when_on_syntax_1 = __webpack_require__(27);
	var literal_types_1 = __webpack_require__(8);
	var ERROR_MSGS = __webpack_require__(10);
	var BindingToSyntax = (function () {
	    function BindingToSyntax(binding) {
	        this._binding = binding;
	    }
	    BindingToSyntax.prototype.to = function (constructor) {
	        this._binding.type = literal_types_1.BindingTypeEnum.Instance;
	        this._binding.implementationType = constructor;
	        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toSelf = function () {
	        if (typeof this._binding.serviceIdentifier !== "function") {
	            throw new Error("" + ERROR_MSGS.INVALID_TO_SELF_VALUE);
	        }
	        var self = this._binding.serviceIdentifier;
	        return this.to(self);
	    };
	    BindingToSyntax.prototype.toConstantValue = function (value) {
	        this._binding.type = literal_types_1.BindingTypeEnum.ConstantValue;
	        this._binding.cache = value;
	        this._binding.dynamicValue = null;
	        this._binding.implementationType = null;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toDynamicValue = function (func) {
	        this._binding.type = literal_types_1.BindingTypeEnum.DynamicValue;
	        this._binding.cache = null;
	        this._binding.dynamicValue = func;
	        this._binding.implementationType = null;
	        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toConstructor = function (constructor) {
	        this._binding.type = literal_types_1.BindingTypeEnum.Constructor;
	        this._binding.implementationType = constructor;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toFactory = function (factory) {
	        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
	        this._binding.factory = factory;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toFunction = function (func) {
	        if (typeof func !== "function") {
	            throw new Error(ERROR_MSGS.INVALID_FUNCTION_BINDING);
	        }
	        var bindingWhenOnSyntax = this.toConstantValue(func);
	        this._binding.type = literal_types_1.BindingTypeEnum.Function;
	        return bindingWhenOnSyntax;
	    };
	    BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
	        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
	        this._binding.factory = function (context) {
	            return function () {
	                return context.container.get(serviceIdentifier);
	            };
	        };
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toProvider = function (provider) {
	        this._binding.type = literal_types_1.BindingTypeEnum.Provider;
	        this._binding.provider = provider;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    return BindingToSyntax;
	}());
	exports.BindingToSyntax = BindingToSyntax;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_in_syntax_1 = __webpack_require__(26);
	var binding_when_syntax_1 = __webpack_require__(28);
	var binding_on_syntax_1 = __webpack_require__(29);
	var BindingInWhenOnSyntax = (function () {
	    function BindingInWhenOnSyntax(binding) {
	        this._binding = binding;
	        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
	        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
	        this._bindingInSyntax = new binding_in_syntax_1.BindingInSyntax(binding);
	    }
	    BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
	        return this._bindingInSyntax.inSingletonScope();
	    };
	    BindingInWhenOnSyntax.prototype.inTransientScope = function () {
	        return this._bindingInSyntax.inTransientScope();
	    };
	    BindingInWhenOnSyntax.prototype.when = function (constraint) {
	        return this._bindingWhenSyntax.when(constraint);
	    };
	    BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
	        return this._bindingWhenSyntax.whenTargetNamed(name);
	    };
	    BindingInWhenOnSyntax.prototype.whenTargetIsDefault = function () {
	        return this._bindingWhenSyntax.whenTargetIsDefault();
	    };
	    BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
	    };
	    BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
	        return this._bindingWhenSyntax.whenInjectedInto(parent);
	    };
	    BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
	        return this._bindingWhenSyntax.whenParentNamed(name);
	    };
	    BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenParentTagged(tag, value);
	    };
	    BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
	        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
	    };
	    BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
	        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
	    };
	    BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
	        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
	    };
	    BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
	    };
	    BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
	        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
	    };
	    BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
	    };
	    BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
	        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
	    };
	    BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
	        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
	    };
	    BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
	        return this._bindingOnSyntax.onActivation(handler);
	    };
	    return BindingInWhenOnSyntax;
	}());
	exports.BindingInWhenOnSyntax = BindingInWhenOnSyntax;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var literal_types_1 = __webpack_require__(8);
	var binding_when_on_syntax_1 = __webpack_require__(27);
	var BindingInSyntax = (function () {
	    function BindingInSyntax(binding) {
	        this._binding = binding;
	    }
	    BindingInSyntax.prototype.inSingletonScope = function () {
	        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingInSyntax.prototype.inTransientScope = function () {
	        this._binding.scope = literal_types_1.BindingScopeEnum.Transient;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    return BindingInSyntax;
	}());
	exports.BindingInSyntax = BindingInSyntax;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_when_syntax_1 = __webpack_require__(28);
	var binding_on_syntax_1 = __webpack_require__(29);
	var BindingWhenOnSyntax = (function () {
	    function BindingWhenOnSyntax(binding) {
	        this._binding = binding;
	        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
	        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    }
	    BindingWhenOnSyntax.prototype.when = function (constraint) {
	        return this._bindingWhenSyntax.when(constraint);
	    };
	    BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
	        return this._bindingWhenSyntax.whenTargetNamed(name);
	    };
	    BindingWhenOnSyntax.prototype.whenTargetIsDefault = function () {
	        return this._bindingWhenSyntax.whenTargetIsDefault();
	    };
	    BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
	    };
	    BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
	        return this._bindingWhenSyntax.whenInjectedInto(parent);
	    };
	    BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
	        return this._bindingWhenSyntax.whenParentNamed(name);
	    };
	    BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenParentTagged(tag, value);
	    };
	    BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
	        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
	    };
	    BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
	        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
	    };
	    BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
	        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
	    };
	    BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
	    };
	    BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
	        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
	    };
	    BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
	    };
	    BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
	        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
	    };
	    BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
	        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
	    };
	    BindingWhenOnSyntax.prototype.onActivation = function (handler) {
	        return this._bindingOnSyntax.onActivation(handler);
	    };
	    return BindingWhenOnSyntax;
	}());
	exports.BindingWhenOnSyntax = BindingWhenOnSyntax;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_on_syntax_1 = __webpack_require__(29);
	var constraint_helpers_1 = __webpack_require__(30);
	var BindingWhenSyntax = (function () {
	    function BindingWhenSyntax(binding) {
	        this._binding = binding;
	    }
	    BindingWhenSyntax.prototype.when = function (constraint) {
	        this._binding.constraint = constraint;
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
	        this._binding.constraint = constraint_helpers_1.namedConstraint(name);
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
	        this._binding.constraint = function (request) {
	            var targetIsDefault = (request.target !== null) &&
	                (request.target.isNamed() === false) &&
	                (request.target.isTagged() === false);
	            return targetIsDefault;
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
	        this._binding.constraint = constraint_helpers_1.taggedConstraint(tag)(value);
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.typeConstraint(parent)(request.parentRequest);
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenParentNamed = function (name) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.namedConstraint(name)(request.parentRequest);
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.taggedConstraint(tag)(value)(request.parentRequest);
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
	        this._binding.constraint = function (request) {
	            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
	        this._binding.constraint = function (request) {
	            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
	        this._binding.constraint = function (request) {
	            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.traverseAncerstors(request, constraint);
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
	        this._binding.constraint = function (request) {
	            return !constraint_helpers_1.traverseAncerstors(request, constraint);
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    return BindingWhenSyntax;
	}());
	exports.BindingWhenSyntax = BindingWhenSyntax;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_when_syntax_1 = __webpack_require__(28);
	var BindingOnSyntax = (function () {
	    function BindingOnSyntax(binding) {
	        this._binding = binding;
	    }
	    BindingOnSyntax.prototype.onActivation = function (handler) {
	        this._binding.onActivation = handler;
	        return new binding_when_syntax_1.BindingWhenSyntax(this._binding);
	    };
	    return BindingOnSyntax;
	}());
	exports.BindingOnSyntax = BindingOnSyntax;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var metadata_1 = __webpack_require__(16);
	var METADATA_KEY = __webpack_require__(17);
	var traverseAncerstors = function (request, constraint) {
	    var parent = request.parentRequest;
	    if (parent !== null) {
	        return constraint(parent) ? true : traverseAncerstors(parent, constraint);
	    }
	    else {
	        return false;
	    }
	};
	exports.traverseAncerstors = traverseAncerstors;
	var taggedConstraint = function (key) { return function (value) {
	    var constraint = function (request) {
	        return request !== null && request.target !== null && request.target.matchesTag(key)(value);
	    };
	    constraint.metaData = new metadata_1.Metadata(key, value);
	    return constraint;
	}; };
	exports.taggedConstraint = taggedConstraint;
	var namedConstraint = taggedConstraint(METADATA_KEY.NAMED_TAG);
	exports.namedConstraint = namedConstraint;
	var typeConstraint = function (type) { return function (request) {
	    var binding = null;
	    if (request !== null) {
	        binding = request.bindings[0];
	        if (typeof type === "string") {
	            var serviceIdentifier = binding.serviceIdentifier;
	            return serviceIdentifier === type;
	        }
	        else {
	            var constructor = request.bindings[0].implementationType;
	            return type === constructor;
	        }
	    }
	    return false;
	}; };
	exports.typeConstraint = typeConstraint;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ContainerSnapshot = (function () {
	    function ContainerSnapshot() {
	    }
	    ContainerSnapshot.of = function (bindings, middleware) {
	        var snapshot = new ContainerSnapshot();
	        snapshot.bindings = bindings;
	        snapshot.middleware = middleware;
	        return snapshot;
	    };
	    return ContainerSnapshot;
	}());
	exports.ContainerSnapshot = ContainerSnapshot;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(17);
	var MetadataReader = (function () {
	    function MetadataReader() {
	    }
	    MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
	        var compilerGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, constructorFunc);
	        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED, constructorFunc);
	        return {
	            compilerGeneratedMetadata: compilerGeneratedMetadata,
	            userGeneratedMetadata: userGeneratedMetadata || {}
	        };
	    };
	    MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
	        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED_PROP, constructorFunc) || [];
	        return userGeneratedMetadata;
	    };
	    return MetadataReader;
	}());
	exports.MetadataReader = MetadataReader;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(7);
	var ContainerModule = (function () {
	    function ContainerModule(registry) {
	        this.guid = guid_1.guid();
	        this.registry = registry;
	    }
	    return ContainerModule;
	}());
	exports.ContainerModule = ContainerModule;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(17);
	var ERRORS_MSGS = __webpack_require__(10);
	function injectable() {
	    return function (target) {
	        if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target) === true) {
	            throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
	        }
	        var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
	        Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);
	        return target;
	    };
	}
	exports.injectable = injectable;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var metadata_1 = __webpack_require__(16);
	var decorator_utils_1 = __webpack_require__(36);
	function tagged(metadataKey, metadataValue) {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(metadataKey, metadataValue);
	        if (typeof index === "number") {
	            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	        }
	        else {
	            decorator_utils_1.tagProperty(target, targetKey, metadata);
	        }
	    };
	}
	exports.tagged = tagged;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(17);
	var ERROR_MSGS = __webpack_require__(10);
	function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
	    var metadataKey = METADATA_KEY.TAGGED;
	    _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
	}
	exports.tagParameter = tagParameter;
	function tagProperty(annotationTarget, propertyName, metadata) {
	    var metadataKey = METADATA_KEY.TAGGED_PROP;
	    _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
	}
	exports.tagProperty = tagProperty;
	function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
	    var paramsOrPropertiesMetadata = {};
	    var isParameterDecorator = (typeof parameterIndex === "number");
	    var key = (parameterIndex !== undefined && isParameterDecorator) ? parameterIndex.toString() : propertyName;
	    if (isParameterDecorator === true && propertyName !== undefined) {
	        throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
	    }
	    if (Reflect.hasOwnMetadata(metadataKey, annotationTarget) === true) {
	        paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
	    }
	    var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
	    if (Array.isArray(paramOrPropertyMetadata) !== true) {
	        paramOrPropertyMetadata = [];
	    }
	    else {
	        for (var i = 0; i < paramOrPropertyMetadata.length; i++) {
	            var m = paramOrPropertyMetadata[i];
	            if (m.key === metadata.key) {
	                throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + m.key);
	            }
	        }
	    }
	    paramOrPropertyMetadata.push(metadata);
	    paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
	    Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
	}
	function _decorate(decorators, target) {
	    Reflect.decorate(decorators, target);
	}
	function _param(paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); };
	}
	function decorate(decorator, target, parameterIndex) {
	    if (typeof parameterIndex === "number") {
	        _decorate([_param(parameterIndex, decorator)], target);
	    }
	    else {
	        _decorate([decorator], target);
	    }
	}
	exports.decorate = decorate;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var metadata_1 = __webpack_require__(16);
	var decorator_utils_1 = __webpack_require__(36);
	var METADATA_KEY = __webpack_require__(17);
	function named(name) {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, name);
	        if (typeof index === "number") {
	            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	        }
	        else {
	            decorator_utils_1.tagProperty(target, targetKey, metadata);
	        }
	    };
	}
	exports.named = named;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var metadata_1 = __webpack_require__(16);
	var decorator_utils_1 = __webpack_require__(36);
	var METADATA_KEY = __webpack_require__(17);
	function inject(serviceIdentifier) {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.INJECT_TAG, serviceIdentifier);
	        if (typeof index === "number") {
	            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	        }
	        else {
	            decorator_utils_1.tagProperty(target, targetKey, metadata);
	        }
	    };
	}
	exports.inject = inject;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var metadata_1 = __webpack_require__(16);
	var decorator_utils_1 = __webpack_require__(36);
	var METADATA_KEY = __webpack_require__(17);
	function optional() {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.OPTIONAL_TAG, true);
	        if (typeof index === "number") {
	            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	        }
	        else {
	            decorator_utils_1.tagProperty(target, targetKey, metadata);
	        }
	    };
	}
	exports.optional = optional;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var metadata_1 = __webpack_require__(16);
	var decorator_utils_1 = __webpack_require__(36);
	var METADATA_KEY = __webpack_require__(17);
	function unmanaged() {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.UNMANAGED_TAG, true);
	        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	    };
	}
	exports.unmanaged = unmanaged;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var metadata_1 = __webpack_require__(16);
	var decorator_utils_1 = __webpack_require__(36);
	var METADATA_KEY = __webpack_require__(17);
	function multiInject(serviceIdentifier) {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.MULTI_INJECT_TAG, serviceIdentifier);
	        if (typeof index === "number") {
	            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	        }
	        else {
	            decorator_utils_1.tagProperty(target, targetKey, metadata);
	        }
	    };
	}
	exports.multiInject = multiInject;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var metadata_1 = __webpack_require__(16);
	var decorator_utils_1 = __webpack_require__(36);
	var METADATA_KEY = __webpack_require__(17);
	function targetName(name) {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.NAME_TAG, name);
	        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	    };
	}
	exports.targetName = targetName;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var LogLevels;
	(function (LogLevels) {
	    LogLevels[LogLevels["None"] = 0] = "None";
	    LogLevels[LogLevels["Error"] = 1] = "Error";
	    LogLevels[LogLevels["Warn"] = 2] = "Warn";
	    LogLevels[LogLevels["Debug"] = 3] = "Debug";
	})(LogLevels = exports.LogLevels || (exports.LogLevels = {}));
	;
	var LogPersistences;
	(function (LogPersistences) {
	    LogPersistences[LogPersistences["None"] = 0] = "None";
	    LogPersistences[LogPersistences["IndexedDB"] = 1] = "IndexedDB";
	    LogPersistences[LogPersistences["LocalStorage"] = 2] = "LocalStorage";
	})(LogPersistences = exports.LogPersistences || (exports.LogPersistences = {}));
	;
	;
	;
	;
	var Environment;
	(function (Environment) {
	    Environment[Environment["development"] = 0] = "development";
	    Environment[Environment["production"] = 1] = "production";
	})(Environment = exports.Environment || (exports.Environment = {}));
	;
	;
	;
	var ConversationScope;
	(function (ConversationScope) {
	    ConversationScope[ConversationScope["public"] = 0] = "public";
	    ConversationScope[ConversationScope["participant"] = 1] = "participant";
	})(ConversationScope = exports.ConversationScope || (exports.ConversationScope = {}));
	;
	//# sourceMappingURL=interfaces.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var IndexedDBLogger = (function () {
	    function IndexedDBLogger(name) {
	        this.idbSupported = "indexedDB" in window;
	        this._name = "Comapi";
	        this._version = 1;
	        this._store = "Logs";
	        if (name) {
	            this._name = name;
	        }
	    }
	    IndexedDBLogger.prototype.openDatabase = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this.idbSupported) {
	                var self_1 = _this;
	                var openRequest = indexedDB.open(_this._name, _this._version);
	                openRequest.onupgradeneeded = function (e) {
	                    console.log("Upgrading database...");
	                    var thisDB = e.target.result;
	                    if (!thisDB.objectStoreNames.contains(self_1._store)) {
	                        var os = thisDB.createObjectStore(self_1._store, { autoIncrement: true });
	                        os.createIndex("created", "created", { unique: false });
	                    }
	                };
	                openRequest.onsuccess = function (e) {
	                    self_1._database = e.target.result;
	                    resolve(true);
	                };
	                openRequest.onerror = function (e) {
	                    reject({ message: "IndexedDBLogger.open failed : " + e.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "IndexedDBLogger not supported on this platform" });
	            }
	        });
	    };
	    IndexedDBLogger.prototype.purge = function (when) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._database) {
	                var transaction = _this._database.transaction([_this._store], "readwrite");
	                var objectStore_1 = transaction.objectStore(_this._store);
	                var index = objectStore_1.index("created");
	                var keyRangeValue = IDBKeyRange.upperBound(when.valueOf());
	                index.openCursor(keyRangeValue).onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    if (cursor) {
	                        objectStore_1["delete"](cursor.primaryKey);
	                        cursor["continue"]();
	                    }
	                    else {
	                        resolve(true);
	                    }
	                };
	            }
	            else {
	                reject({ message: "Database not open" });
	            }
	        });
	    };
	    IndexedDBLogger.prototype.deleteDatabase = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var req = indexedDB.deleteDatabase(_this._name);
	            var self = _this;
	            req.onsuccess = function () {
	                console.log("Deleted database " + self._name + " successfully");
	                resolve(true);
	            };
	            req.onerror = function (e) {
	                reject({ message: "Couldn't delete database " + self._name + " : " + e.target.error.name });
	            };
	            req.onblocked = function () {
	                console.warn("Couldn't delete database " + self._name + " due to the operation being blocked");
	            };
	        });
	    };
	    IndexedDBLogger.prototype.clearData = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._database) {
	                var transaction_1 = _this._database.transaction([_this._store], "readwrite");
	                transaction_1.onerror = function (event) {
	                    console.error("Transaction not opened due to error: " + transaction_1.error);
	                };
	                var objectStore = transaction_1.objectStore(_this._store);
	                var objectStoreRequest = objectStore.clear();
	                objectStoreRequest.onsuccess = function (event) {
	                    resolve(true);
	                };
	                objectStoreRequest.onerror = function (e) {
	                    reject({ message: "Failed to clear object store: " + e.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "Database not open" });
	            }
	        });
	    };
	    IndexedDBLogger.prototype.getData = function (count, getIndexes) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._database) {
	                var transaction = _this._database.transaction([_this._store], "readonly");
	                var objectStore = transaction.objectStore(_this._store);
	                var cursorRequest = objectStore.openCursor();
	                var numRetrieved_1 = 0;
	                var data_1 = [];
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    numRetrieved_1++;
	                    if (cursor) {
	                        var record = cursor.value;
	                        if (getIndexes === true) {
	                            record.key = cursor.key;
	                        }
	                        data_1.push(cursor.value);
	                        if (numRetrieved_1 && numRetrieved_1 >= count) {
	                            resolve(data_1);
	                        }
	                        else {
	                            cursor.continue();
	                        }
	                    }
	                    else {
	                        resolve(data_1);
	                    }
	                };
	                cursorRequest.onerror = function (e) {
	                    reject({ message: "Failed to openCursor: " + e.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "Database not open" });
	            }
	        });
	    };
	    IndexedDBLogger.prototype.getCount = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._database) {
	                var transaction = _this._database.transaction([_this._store], "readonly");
	                var objectStore = transaction.objectStore(_this._store);
	                var count_1 = objectStore.count();
	                count_1.onerror = function (e) {
	                    reject({ message: "Failed to get count: " + e.target.error.name });
	                };
	                count_1.onsuccess = function () {
	                    resolve(count_1.result);
	                };
	            }
	            else {
	                reject({ message: "Database not open" });
	            }
	        });
	    };
	    IndexedDBLogger.prototype.closeDatabase = function () {
	        if (this._database) {
	            this._database.close();
	        }
	    };
	    IndexedDBLogger.prototype.addRecord = function (entity) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._database) {
	                var transaction = _this._database.transaction([_this._store], "readwrite");
	                var store = transaction.objectStore(_this._store);
	                var request = store.add(entity);
	                request.onerror = function (e) {
	                    console.error("Error", e.target.error.name);
	                    reject({ message: "add failed: " + e.target.error.name });
	                };
	                request.onsuccess = function (e) {
	                    resolve(e.target.result);
	                };
	            }
	            else {
	                reject({ message: "Database not open" });
	            }
	        });
	    };
	    return IndexedDBLogger;
	}());
	exports.IndexedDBLogger = IndexedDBLogger;
	//# sourceMappingURL=indexedDBLogger.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(46);
	var MessagePager = (function () {
	    function MessagePager(_logger, _localStorage, _messageManager, _orphanedEventManager) {
	        this._logger = _logger;
	        this._localStorage = _localStorage;
	        this._messageManager = _messageManager;
	        this._orphanedEventManager = _orphanedEventManager;
	    }
	    MessagePager.prototype.getMessages = function (conversationId, pageSize, continuationToken) {
	        var _this = this;
	        if (continuationToken <= 0) {
	            return Promise.reject({ message: "All messages from conversation " + conversationId + " have been loaded" });
	        }
	        var _continuationToken = null;
	        var _conversationMessagesResult;
	        return this._orphanedEventManager.getContinuationToken(conversationId)
	            .then(function (token) {
	            _continuationToken = token;
	            if (continuationToken !== undefined) {
	                if (_continuationToken !== continuationToken) {
	                    return Promise.reject({ message: "Invalid continuation token: " + continuationToken + " for " + conversationId + ", you nust start from the end" });
	                }
	                else {
	                    return Promise.resolve(true);
	                }
	            }
	            else {
	                return _this._orphanedEventManager.clear(conversationId);
	            }
	        })
	            .then(function () {
	            return _this._messageManager.getConversationMessages(conversationId, pageSize, continuationToken);
	        })
	            .then(function (result) {
	            _conversationMessagesResult = result;
	            if (result.messages === undefined) {
	                _this._logger.log("No messages in this channel yet");
	                return Promise.resolve({ messages: [] });
	            }
	            else {
	                return _this.getOrphanedEvents(conversationId, _conversationMessagesResult.orphanedEvents)
	                    .then(function (orphanedEvents) {
	                    return _this.applyOrphanedEvents(_conversationMessagesResult.messages, orphanedEvents);
	                })
	                    .then(function () {
	                    _continuationToken = _conversationMessagesResult.earliestEventId - 1;
	                    return _this._orphanedEventManager.setContinuationToken(conversationId, _continuationToken);
	                })
	                    .then(function () {
	                    return Promise.resolve({
	                        continuationToken: _continuationToken,
	                        earliestEventId: _conversationMessagesResult.earliestEventId,
	                        latestEventId: _conversationMessagesResult.latestEventId,
	                        messages: _conversationMessagesResult.messages,
	                    });
	                });
	            }
	        });
	    };
	    MessagePager.prototype.getOrphanedEvents = function (conversationId, orphanedEvents) {
	        var _this = this;
	        var mapped = orphanedEvents.map(function (e) { return _this.mapOrphanedEvent(e); });
	        return utils_1.Utils.eachSeries(mapped, function (event) {
	            return _this._orphanedEventManager.addOrphanedEvent(event);
	        })
	            .then(function (done) {
	            return _this._orphanedEventManager.getOrphanedEvents(conversationId);
	        });
	    };
	    MessagePager.prototype.markMessagesAsDelivered = function (id, messages, userId) {
	        var messageIds = [];
	        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
	            var message = messages_1[_i];
	            if (message.context && message.context.from && message.context.from.id !== userId) {
	                var alreadyDelivered = false;
	                if (message.statusUpdates && message.statusUpdates[userId]) {
	                    if (message.statusUpdates[userId].status === "delivered" ||
	                        message.statusUpdates[userId].status === "read") {
	                        alreadyDelivered = true;
	                    }
	                }
	                if (!alreadyDelivered) {
	                    messageIds.unshift(message.id);
	                }
	            }
	        }
	        if (messageIds.length > 0) {
	            var statusUpdate = {
	                messageIds: messageIds,
	                status: "delivered",
	                timestamp: new Date().toISOString()
	            };
	            return this._messageManager.sendMessageStatusUpdates(id, [statusUpdate]);
	        }
	        else {
	            return Promise.resolve("OK");
	        }
	    };
	    MessagePager.prototype.resetConversation = function (conversationId) {
	        return this._orphanedEventManager.clear(conversationId);
	    };
	    MessagePager.prototype.applyOrphanedEvents = function (messages, orphanedEvents) {
	        var _this = this;
	        return utils_1.Utils.eachSeries(orphanedEvents, function (event) {
	            if (_this.playEvent(event, messages)) {
	                _this._logger.log("succesfuly played event " + event.conversationEventId);
	                return _this._orphanedEventManager.removeOrphanedEvent(event);
	            }
	            else {
	                _this._logger.warn("failed to play event " + event.conversationEventId, event);
	                return Promise.resolve(false);
	            }
	        });
	    };
	    MessagePager.prototype.playEvent = function (event, messages) {
	        var played = false;
	        var found = messages.filter(function (message) { return message.id === event.payload.messageId; });
	        var message;
	        if (found.length === 1) {
	            message = found[0];
	            played = true;
	        }
	        else if (found.length >= 1) {
	            this._logger.error("Found more than 1 message with same messageId: " + event.payload.messageId);
	        }
	        else {
	            this._logger.log("Message " + event.payload.messageId + " not found ...");
	        }
	        switch (event.name) {
	            case "conversationMessage.read":
	                {
	                    if (message) {
	                        message.statusUpdates[event.payload.profileId] = {
	                            "status": "read",
	                            "on": event.payload.timestamp
	                        };
	                    }
	                }
	                break;
	            case "conversationMessage.delivered":
	                {
	                    if (message) {
	                        var updateForProfileId = message.statusUpdates[event.payload.profileId];
	                        if (updateForProfileId && updateForProfileId.status === "read") {
	                            this._logger.log("Message already marked as read, not marking as delivered");
	                        }
	                        else {
	                            message.statusUpdates[event.payload.profileId] = {
	                                "status": "delivered",
	                                "on": event.payload.timestamp
	                            };
	                        }
	                    }
	                }
	                break;
	            default:
	                this._logger.error("Unknown eventName " + event.name + " for messageId: " + event.payload.messageId);
	                break;
	        }
	        return played;
	    };
	    MessagePager.prototype.mapOrphanedEvent = function (event) {
	        var mapped = {};
	        mapped.conversationEventId = event.id;
	        mapped.name = "conversationMessage." + event.data.name;
	        mapped.eventId = event.data.eventId;
	        mapped.conversationId = event.data.payload.conversationId;
	        mapped.payload = event.data.payload;
	        return mapped;
	    };
	    return MessagePager;
	}());
	exports.MessagePager = MessagePager;
	//# sourceMappingURL=messagePager.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Utils = (function () {
	    function Utils() {
	        throw new Error("Cannot new this class");
	    }
	    Utils.clone = function (obj) {
	        return JSON.parse(JSON.stringify(obj));
	    };
	    Utils.uuid = function () {
	        var d = new Date().getTime();
	        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
	            var r = (d + Math.random() * 16) % 16 | 0;
	            d = Math.floor(d / 16);
	            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
	        });
	        return uuid;
	    };
	    Utils.getBrowserInfo = function (userAgent) {
	        var ua = userAgent !== undefined ? userAgent : navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	        if (/trident/i.test(M[1])) {
	            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
	            return {
	                name: "IE",
	                version: tem[1] || ""
	            };
	        }
	        if (M[1] === "Chrome") {
	            tem = ua.match(/\bOPR\/(\d+)/);
	            if (tem !== null) {
	                return {
	                    name: "Opera",
	                    version: tem[1]
	                };
	            }
	        }
	        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
	        tem = ua.match(/version\/(\d+)/i);
	        if (tem !== null) {
	            M.splice(1, 1, tem[1]);
	        }
	        return {
	            name: M[0],
	            version: M[1]
	        };
	    };
	    Utils.eachSeries = function (arr, iteratorFn) {
	        return arr.reduce(function (p, item) {
	            return p.then(function () {
	                return iteratorFn(item);
	            });
	        }, Promise.resolve());
	    };
	    Utils.doUntil = function (operation, test, data) {
	        return operation(data)
	            .then(function (rslt) {
	            return test(rslt) ? Utils.doUntil(operation, test, rslt) : rslt;
	        });
	    };
	    Utils.format = function (content, tags) {
	        return content.replace(/{{(.*?)}}/g, function (tag, key) {
	            var replacement = false;
	            if (typeof tags[key] === "string") {
	                replacement = tags[key];
	            }
	            if (typeof replacement === "string") {
	                return replacement;
	            }
	            else {
	                return tag;
	            }
	        });
	    };
	    return Utils;
	}());
	exports.Utils = Utils;
	;
	//# sourceMappingURL=utils.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(46);
	var ConversationBuilder = (function () {
	    function ConversationBuilder() {
	        this.description = undefined;
	        this.roles = {
	            "owner": {
	                "canSend": true,
	                "canAddParticipants": true,
	                "canRemoveParticipants": true
	            },
	            "participant": {
	                "canSend": true,
	                "canAddParticipants": true,
	                "canRemoveParticipants": true
	            }
	        };
	        this.isPublic = false;
	        this.participants = undefined;
	        this.id = utils_1.Utils.uuid();
	    }
	    ConversationBuilder.prototype.withId = function (id) {
	        this.id = id;
	        return this;
	    };
	    ConversationBuilder.prototype.withName = function (name) {
	        this.name = name;
	        return this;
	    };
	    ConversationBuilder.prototype.withDescription = function (description) {
	        this.description = description;
	        return this;
	    };
	    ConversationBuilder.prototype.withUsers = function (users) {
	        this.participants = [];
	        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
	            var user = users_1[_i];
	            this.participants.push({ id: user });
	        }
	        return this;
	    };
	    ConversationBuilder.prototype.withUser = function (user) {
	        this.participants = [{ id: user }];
	        return this;
	    };
	    ConversationBuilder.prototype.withParticipants = function (participants) {
	        this.participants = participants;
	        return this;
	    };
	    ConversationBuilder.prototype.withOwnerPrivelages = function (privelages) {
	        this.roles.owner = privelages;
	        return this;
	    };
	    ConversationBuilder.prototype.withParticipantPrivelages = function (privelages) {
	        this.roles.participant = privelages;
	        return this;
	    };
	    return ConversationBuilder;
	}());
	exports.ConversationBuilder = ConversationBuilder;
	//# sourceMappingURL=conversationBuilder.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var MessageBuilder = (function () {
	    function MessageBuilder() {
	        this.id = undefined;
	        this.metadata = {};
	        this.parts = [];
	        this.alert = undefined;
	        this.context = undefined;
	        this.sentEventId = undefined;
	        this.statusUpdates = undefined;
	    }
	    MessageBuilder.prototype.withText = function (text) {
	        this.parts.push({
	            data: text,
	            size: text.length,
	            type: "text/plain",
	        });
	        return this;
	    };
	    MessageBuilder.prototype.withData = function (type, data) {
	        this.parts.push({
	            data: data,
	            size: data.length,
	            type: type,
	        });
	        return this;
	    };
	    MessageBuilder.prototype.withPart = function (part) {
	        this.parts.push(part);
	        return this;
	    };
	    MessageBuilder.prototype.withPush = function (text) {
	        this.alert = {
	            "text": text,
	            "platforms": {
	                "apns": undefined,
	                "fcm": undefined
	            }
	        };
	        return this;
	    };
	    MessageBuilder.prototype.withApnsAlert = function (info) {
	        this.alert.platforms.apns = info;
	        return this;
	    };
	    MessageBuilder.prototype.withFcmAlert = function (info) {
	        this.alert.platforms.fcm = info;
	        return this;
	    };
	    MessageBuilder.prototype.withMetadata = function (metadata) {
	        this.metadata = metadata;
	        return this;
	    };
	    return MessageBuilder;
	}());
	exports.MessageBuilder = MessageBuilder;
	//# sourceMappingURL=messageBuilder.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var MessageStatusBuilder = (function () {
	    function MessageStatusBuilder() {
	    }
	    MessageStatusBuilder.prototype.deliveredStatusUpdate = function (messageId) {
	        return {
	            messageIds: [messageId],
	            status: "delivered",
	            timestamp: new Date().toISOString()
	        };
	    };
	    MessageStatusBuilder.prototype.deliveredStatusUpdates = function (messageIds) {
	        return {
	            messageIds: messageIds,
	            status: "delivered",
	            timestamp: new Date().toISOString()
	        };
	    };
	    MessageStatusBuilder.prototype.readStatusUpdate = function (messageId) {
	        return {
	            messageIds: [messageId],
	            status: "read",
	            timestamp: new Date().toISOString()
	        };
	    };
	    MessageStatusBuilder.prototype.readStatusUpdates = function (messageIds) {
	        return {
	            messageIds: messageIds,
	            status: "read",
	            timestamp: new Date().toISOString()
	        };
	    };
	    return MessageStatusBuilder;
	}());
	exports.MessageStatusBuilder = MessageStatusBuilder;
	//# sourceMappingURL=messageStatusBuilder.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	;
	var IndexedDBOrphanedEventManager = (function () {
	    function IndexedDBOrphanedEventManager() {
	        this.idbSupported = "indexedDB" in window;
	        this._name = "Comapi.OrphanedEvents";
	        this._version = 1;
	        this._continuationTokenStore = "ContinuationTokens";
	        this._orphanedEventStore = "OrphanedEvents";
	    }
	    IndexedDBOrphanedEventManager.prototype.clearAll = function () {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return _this.clearObjectStore(_this._continuationTokenStore);
	        })
	            .then(function (cleared) {
	            return _this.clearObjectStore(_this._orphanedEventStore);
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.clear = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return _this.deleteTokenInfo(conversationId);
	        })
	            .then(function (deleted) {
	            return _this.deleteEvents(conversationId);
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.getContinuationToken = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._continuationTokenStore], "readonly");
	                var objectStore = transaction.objectStore(_this._continuationTokenStore);
	                var keyRange = IDBKeyRange.only(conversationId);
	                var cursorRequest = objectStore.openCursor(keyRange);
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    if (cursor) {
	                        var info = cursor.value;
	                        resolve(info.continuationToken);
	                    }
	                    else {
	                        resolve(null);
	                    }
	                };
	                cursorRequest.onerror = function (e) {
	                    reject({ message: "Failed to openCursor: " + e.target.error.name });
	                };
	            });
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.setContinuationToken = function (conversationId, continuationToken) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._continuationTokenStore], "readwrite");
	                var store = transaction.objectStore(_this._continuationTokenStore);
	                var request = store.put({
	                    continuationToken: continuationToken,
	                    conversationId: conversationId
	                });
	                request.onerror = function (event) {
	                    reject({ message: "add failed: " + event.target.error.name });
	                };
	                request.onsuccess = function (event) {
	                    resolve(true);
	                };
	            });
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.addOrphanedEvent = function (event) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
	                var store = transaction.objectStore(_this._orphanedEventStore);
	                var request = store.put(event);
	                request.onerror = function (e) {
	                    console.error("Error", e.target.error.name);
	                    reject({ message: "add failed: " + e.target.error.name });
	                };
	                request.onsuccess = function (e) {
	                    resolve(true);
	                };
	            });
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.removeOrphanedEvent = function (event) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
	                var store = transaction.objectStore(_this._orphanedEventStore);
	                var request = store.delete(event.eventId);
	                request.onerror = function (e) {
	                    reject({ message: "delete failed: " + e.target.error.name });
	                };
	                request.onsuccess = function (e) {
	                    console.log("store.delete", e.target.result);
	                    resolve(true);
	                };
	            });
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.getOrphanedEvents = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._orphanedEventStore], "readonly");
	                var objectStore = transaction.objectStore(_this._orphanedEventStore);
	                var index = objectStore.index("conversationId");
	                var keyRange = IDBKeyRange.only(conversationId);
	                var events = [];
	                var cursorRequest = index.openCursor(keyRange, "prev");
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    if (cursor) {
	                        events.unshift(cursor.value);
	                        cursor.continue();
	                    }
	                    else {
	                        resolve(events.sort(function (e1, e2) {
	                            return e1.conversationEventId - e2.conversationEventId;
	                        }));
	                    }
	                };
	                cursorRequest.onerror = function (event) {
	                    reject({ message: "Failed to openCursor: " + event.target.error.name });
	                };
	            });
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.ensureInitialised = function () {
	        return this._database ? Promise.resolve(true) : this.initialise();
	    };
	    IndexedDBOrphanedEventManager.prototype.initialise = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this.idbSupported) {
	                var self_1 = _this;
	                var openRequest = indexedDB.open(_this._name, _this._version);
	                openRequest.onupgradeneeded = function (event) {
	                    var thisDB = event.target.result;
	                    if (!thisDB.objectStoreNames.contains(self_1._continuationTokenStore)) {
	                        thisDB.createObjectStore(self_1._continuationTokenStore, { keyPath: "conversationId" });
	                    }
	                    if (!thisDB.objectStoreNames.contains(self_1._orphanedEventStore)) {
	                        var os = thisDB.createObjectStore(self_1._orphanedEventStore, { keyPath: "eventId" });
	                        os.createIndex("conversationId", "conversationId", { unique: false });
	                    }
	                };
	                openRequest.onsuccess = function (event) {
	                    _this._database = event.target.result;
	                    resolve(true);
	                };
	                openRequest.onerror = function (event) {
	                    reject({ message: "IndexedDBOrphanedEventManager.initialise failed : " + event.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "IndexedDBOrphanedEventManager not supported on this platform" });
	            }
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.clearObjectStore = function (objectStoreName) {
	        var _this = this;
	        var _objectStoreName = objectStoreName;
	        return new Promise(function (resolve, reject) {
	            var transaction = _this._database.transaction([_objectStoreName], "readwrite");
	            transaction.onerror = function (event) {
	                console.error("Transaction not opened due to error: " + transaction.error);
	            };
	            var objectStore = transaction.objectStore(_objectStoreName);
	            var objectStoreRequest = objectStore.clear();
	            objectStoreRequest.onsuccess = function (event) {
	                resolve(true);
	            };
	            objectStoreRequest.onerror = function (event) {
	                reject({ message: "Failed to clear object store: " + event.target.error.name });
	            };
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.deleteTokenInfo = function (conversationId) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var transaction = _this._database.transaction([_this._continuationTokenStore], "readwrite");
	            var store = transaction.objectStore(_this._continuationTokenStore);
	            var request = store.delete(conversationId);
	            request.onerror = function (event) {
	                reject({ message: "delete failed: " + event.target.error.name });
	            };
	            request.onsuccess = function (event) {
	                console.log("store.delete", event.target.result);
	                resolve(true);
	            };
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.deleteEvents = function (conversationId) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
	            var objectStore = transaction.objectStore(_this._orphanedEventStore);
	            var index = objectStore.index("conversationId");
	            var keyRange = IDBKeyRange.only(conversationId);
	            var cursorRequest = index.openCursor(keyRange, "next");
	            cursorRequest.onsuccess = function (event) {
	                var cursor = event.target.result;
	                if (cursor) {
	                    objectStore.delete(cursor.primaryKey);
	                    cursor.continue();
	                }
	                else {
	                    resolve(true);
	                }
	            };
	            cursorRequest.onerror = function (e) {
	                reject({ message: "Failed to openCursor: " + e.target.error.name });
	            };
	        });
	    };
	    return IndexedDBOrphanedEventManager;
	}());
	exports.IndexedDBOrphanedEventManager = IndexedDBOrphanedEventManager;
	//# sourceMappingURL=indexedDBOrphanedEventManager.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	;
	var LocalStorageOrphanedEventManager = (function () {
	    function LocalStorageOrphanedEventManager(_localStorage) {
	        this._localStorage = _localStorage;
	        this._orphanedEevnts = {};
	        this._orphanedEevnts = this._localStorage.getObject("orphanedEevnts") || {};
	    }
	    LocalStorageOrphanedEventManager.prototype.clearAll = function () {
	        this._orphanedEevnts = {};
	        this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
	        return Promise.resolve(true);
	    };
	    LocalStorageOrphanedEventManager.prototype.clear = function (conversationId) {
	        this._orphanedEevnts[conversationId] = {
	            orphanedEvents: []
	        };
	        this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
	        return Promise.resolve(true);
	    };
	    LocalStorageOrphanedEventManager.prototype.getContinuationToken = function (conversationId) {
	        var container = this._orphanedEevnts[conversationId];
	        return Promise.resolve(container ? container.continuationToken : null);
	    };
	    LocalStorageOrphanedEventManager.prototype.setContinuationToken = function (conversationId, continuationToken) {
	        var _info = this._orphanedEevnts[conversationId];
	        if (_info) {
	            _info.continuationToken = continuationToken;
	        }
	        else {
	            this._orphanedEevnts[conversationId] = {
	                continuationToken: continuationToken,
	                orphanedEvents: []
	            };
	        }
	        return Promise.resolve(true);
	    };
	    LocalStorageOrphanedEventManager.prototype.addOrphanedEvent = function (event) {
	        var info = this._orphanedEevnts[event.conversationId];
	        if (info) {
	            var found = info.orphanedEvents.filter(function (e) { return e.eventId === event.eventId; });
	            if (found.length === 0) {
	                info.orphanedEvents.unshift(event);
	                info.orphanedEvents = info.orphanedEvents.sort(function (e1, e2) {
	                    if (e1.conversationEventId > e2.conversationEventId) {
	                        return 1;
	                    }
	                    else if (e1.conversationEventId < e2.conversationEventId) {
	                        return -1;
	                    }
	                    else {
	                        return 0;
	                    }
	                });
	                this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
	            }
	        }
	        else {
	            return Promise.reject({ message: "No container for conversation " + event.conversationId });
	        }
	    };
	    LocalStorageOrphanedEventManager.prototype.removeOrphanedEvent = function (event) {
	        var info = this._orphanedEevnts[event.conversationId];
	        if (info) {
	            for (var i = info.orphanedEvents.length - 1; i >= 0; i--) {
	                var e = info.orphanedEvents[i];
	                if (e.eventId === event.eventId) {
	                    info.orphanedEvents.splice(i, 1);
	                    break;
	                }
	            }
	            this._localStorage.setObject("orphanedEevnts", this._orphanedEevnts);
	            return Promise.resolve(true);
	        }
	        else {
	            return Promise.reject({ message: "No container for conversation " + event.conversationId });
	        }
	    };
	    LocalStorageOrphanedEventManager.prototype.getOrphanedEvents = function (conversationId) {
	        var info = this._orphanedEevnts[conversationId];
	        return Promise.resolve(info ? info.orphanedEvents : []);
	    };
	    return LocalStorageOrphanedEventManager;
	}());
	exports.LocalStorageOrphanedEventManager = LocalStorageOrphanedEventManager;
	//# sourceMappingURL=localStorageOrphanedEventManager.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var interfaces_1 = __webpack_require__(43);
	var urlConfig_1 = __webpack_require__(53);
	var ComapiConfig = (function () {
	    function ComapiConfig() {
	        this.logRetentionHours = 24;
	        this.urlBase = "https://api.comapi.com";
	        this.webSocketBase = "wss://api.comapi.com";
	        this.logLevel = interfaces_1.LogLevels.Error;
	        this.logPersistence = interfaces_1.LogPersistences.LocalStorage;
	        this.isTypingTimeout = 10;
	        this.isTypingOffTimeout = 10;
	        this.foundationRestUrls = new urlConfig_1.FoundationRestUrls();
	        this.apiSpaceId = undefined;
	    }
	    ComapiConfig.prototype.withApiSpace = function (id) {
	        this.apiSpaceId = id;
	        return this;
	    };
	    ComapiConfig.prototype.withLogRetentionTime = function (hours) {
	        this.logRetentionHours = hours;
	        return this;
	    };
	    ComapiConfig.prototype.withAuthChallenge = function (authChallenge) {
	        this.authChallenge = authChallenge;
	        return this;
	    };
	    ComapiConfig.prototype.withUrlBase = function (urlBase) {
	        this.urlBase = urlBase;
	        return this;
	    };
	    ComapiConfig.prototype.withWebSocketBase = function (webSocketBase) {
	        this.webSocketBase = webSocketBase;
	        return this;
	    };
	    ComapiConfig.prototype.withLogLevel = function (logLevel) {
	        this.logLevel = logLevel;
	        return this;
	    };
	    ComapiConfig.prototype.withLogPersistence = function (logPersistence) {
	        this.logPersistence = logPersistence;
	        return this;
	    };
	    ComapiConfig.prototype.withFoundationRestUrls = function (foundationRestUrls) {
	        this.foundationRestUrls = foundationRestUrls;
	        return this;
	    };
	    ComapiConfig.prototype.withEventMapping = function (eventMapping) {
	        this.eventMapping = eventMapping;
	        return this;
	    };
	    return ComapiConfig;
	}());
	exports.ComapiConfig = ComapiConfig;
	//# sourceMappingURL=comapiConfig.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var FoundationRestUrls = (function () {
	    function FoundationRestUrls() {
	        this.conversations = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations";
	        this.conversation = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}";
	        this.participants = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/participants";
	        this.typing = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/typing";
	        this.push = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/{{sessionId}}/push";
	        this.facebook = "{{urlBase}}/apispaces/{{apiSpaceId}}/channels/facebook/state";
	        this.events = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/events";
	        this.messages = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/messages";
	        this.statusUpdates = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/messages/statusupdates";
	        this.profiles = "{{urlBase}}/apispaces/{{apiSpaceId}}/profiles";
	        this.profile = "{{urlBase}}/apispaces/{{apiSpaceId}}/profiles/{{profileId}}";
	        this.sessions = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions";
	        this.sessionStart = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/start";
	        this.session = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/{{sessionId}}";
	    }
	    return FoundationRestUrls;
	}());
	exports.FoundationRestUrls = FoundationRestUrls;
	//# sourceMappingURL=urlConfig.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var AppMessaging = (function () {
	    function AppMessaging(_networkManager, _conversationManager, _messageManager, _messagePager) {
	        this._networkManager = _networkManager;
	        this._conversationManager = _conversationManager;
	        this._messageManager = _messageManager;
	        this._messagePager = _messagePager;
	    }
	    AppMessaging.prototype.createConversation = function (conversationDetails) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.createConversation(conversationDetails);
	        });
	    };
	    AppMessaging.prototype.updateConversation = function (conversationDetails, eTag) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.updateConversation(conversationDetails, eTag);
	        });
	    };
	    AppMessaging.prototype.getConversation = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.getConversation(conversationId);
	        });
	    };
	    AppMessaging.prototype.deleteConversation = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.deleteConversation(conversationId);
	        })
	            .then(function (deleted) {
	            return _this._messagePager.resetConversation(conversationId);
	        });
	    };
	    AppMessaging.prototype.addParticipantsToConversation = function (conversationId, participants) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.addParticipantsToConversation(conversationId, participants);
	        });
	    };
	    AppMessaging.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.deleteParticipantsFromConversation(conversationId, participants);
	        });
	    };
	    AppMessaging.prototype.getParticipantsInConversation = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.getParticipantsInConversation(conversationId);
	        });
	    };
	    AppMessaging.prototype.getConversations = function (scope, profileId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.getConversations(scope, profileId);
	        });
	    };
	    AppMessaging.prototype.getConversationEvents = function (conversationId, from, limit) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._messageManager.getConversationEvents(conversationId, from, limit);
	        });
	    };
	    AppMessaging.prototype.sendMessageToConversation = function (conversationId, message) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._messageManager.sendMessageToConversation(conversationId, message);
	        });
	    };
	    AppMessaging.prototype.sendMessageStatusUpdates = function (conversationId, statuses) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._messageManager.sendMessageStatusUpdates(conversationId, statuses);
	        });
	    };
	    AppMessaging.prototype.getMessages = function (conversationId, pageSize, continuationToken) {
	        var _this = this;
	        var profileId;
	        var _getMessagesResponse;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            profileId = sessionInfo.session.profileId;
	            return _this._messagePager.getMessages(conversationId, pageSize, continuationToken);
	        })
	            .then(function (getMessagesResponse) {
	            _getMessagesResponse = getMessagesResponse;
	            return _this._messagePager.markMessagesAsDelivered(conversationId, getMessagesResponse.messages, profileId);
	        })
	            .then(function (markDeliveredresponse) {
	            return Promise.resolve(_getMessagesResponse);
	        });
	    };
	    AppMessaging.prototype.sendIsTyping = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.sendIsTyping(conversationId);
	        });
	    };
	    AppMessaging.prototype.sendIsTypingOff = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.sendIsTypingOff(conversationId);
	        });
	    };
	    return AppMessaging;
	}());
	exports.AppMessaging = AppMessaging;
	//# sourceMappingURL=appMessaging.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Profile = (function () {
	    function Profile(_networkManager, _localStorage, _profileManager) {
	        this._networkManager = _networkManager;
	        this._localStorage = _localStorage;
	        this._profileManager = _profileManager;
	    }
	    Profile.prototype.getProfile = function (profileId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.getProfile(profileId);
	        });
	    };
	    Profile.prototype.queryProfiles = function (query) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.queryProfiles(query);
	        });
	    };
	    Profile.prototype.updateProfile = function (profileId, profile, eTag) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.updateProfile(profileId, profile, eTag);
	        });
	    };
	    Profile.prototype.patchProfile = function (profileId, profile, eTag) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.patchProfile(profileId, profile, eTag);
	        });
	    };
	    Profile.prototype.getMyProfile = function (useEtag) {
	        var _this = this;
	        if (useEtag === void 0) { useEtag = true; }
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.getProfile(sessionInfo.session.profileId);
	        })
	            .then(function (result) {
	            if (useEtag) {
	                _this._localStorage.setString("MyProfileETag", result.headers.ETag);
	            }
	            return Promise.resolve(result.response);
	        });
	    };
	    Profile.prototype.updateMyProfile = function (profile, useEtag) {
	        var _this = this;
	        if (useEtag === void 0) { useEtag = true; }
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.updateProfile(sessionInfo.session.profileId, profile, useEtag ? _this._localStorage.getString("MyProfileETag") : undefined);
	        })
	            .then(function (result) {
	            if (useEtag) {
	                _this._localStorage.setString("MyProfileETag", result.headers.ETag);
	            }
	            return Promise.resolve(result.response);
	        });
	    };
	    Profile.prototype.patchMyProfile = function (profile, useEtag) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._profileManager.patchProfile(sessionInfo.session.profileId, profile, useEtag ? _this._localStorage.getString("MyProfileETag") : undefined);
	        })
	            .then(function (result) {
	            if (useEtag) {
	                _this._localStorage.setString("MyProfileETag", result.headers.ETag);
	            }
	            return Promise.resolve(result.response);
	        });
	    };
	    return Profile;
	}());
	exports.Profile = Profile;
	//# sourceMappingURL=profile.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Services = (function () {
	    function Services(_appMessaging, _profile) {
	        this._appMessaging = _appMessaging;
	        this._profile = _profile;
	    }
	    Object.defineProperty(Services.prototype, "appMessaging", {
	        get: function () {
	            return this._appMessaging;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Services.prototype, "profile", {
	        get: function () {
	            return this._profile;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Services;
	}());
	exports.Services = Services;
	//# sourceMappingURL=services.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Device = (function () {
	    function Device(_networkManager, _deviceManager) {
	        this._networkManager = _networkManager;
	        this._deviceManager = _deviceManager;
	    }
	    Device.prototype.setFCMPushDetails = function (packageName, registrationId) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._deviceManager.setFCMPushDetails(sessionInfo.session.id, packageName, registrationId);
	        });
	    };
	    Device.prototype.setAPNSPushDetails = function (bundleId, environment, token) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._deviceManager.setAPNSPushDetails(sessionInfo.session.id, bundleId, environment, token);
	        });
	    };
	    Device.prototype.removePushDetails = function () {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._deviceManager.removePushDetails(sessionInfo.session.id);
	        });
	    };
	    return Device;
	}());
	exports.Device = Device;
	//# sourceMappingURL=device.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Channels = (function () {
	    function Channels(_networkManager, _facebookManager) {
	        this._networkManager = _networkManager;
	        this._facebookManager = _facebookManager;
	    }
	    Channels.prototype.createFbOptInState = function (data) {
	        var _this = this;
	        return this._networkManager.ensureSessionAndSocket()
	            .then(function (sessionInfo) {
	            return _this._facebookManager.createSendToMessengerState(data);
	        });
	    };
	    return Channels;
	}());
	exports.Channels = Channels;
	//# sourceMappingURL=channels.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_config_1 = __webpack_require__(60);
	var interfaceSymbols_1 = __webpack_require__(64);
	var InterfaceManager = (function () {
	    function InterfaceManager() {
	    }
	    InterfaceManager.getInterface = function (serviceIdentifier) {
	        return inversify_config_1.container.get(serviceIdentifier);
	    };
	    InterfaceManager.setInterface = function (serviceIdentifier, instance) {
	        if (inversify_config_1.container.isBound(serviceIdentifier)) {
	            inversify_config_1.container.unbind(serviceIdentifier);
	        }
	        InterfaceManager.interfaces[serviceIdentifier.toString()] = instance;
	        inversify_config_1.container.bind(serviceIdentifier).toDynamicValue(function (context) {
	            return InterfaceManager.interfaces[serviceIdentifier.toString()];
	        });
	    };
	    Object.defineProperty(InterfaceManager, "IEventManager", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager);
	        },
	        set: function (eventManager) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager, eventManager);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "ILocalStorageData", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData);
	        },
	        set: function (localStorageData) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData, localStorageData);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "ILogger", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger);
	        },
	        set: function (logger) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger, logger);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "IRestClient", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient);
	        },
	        set: function (restClient) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient, restClient);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "ISessionManager", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager);
	        },
	        set: function (sessionManager) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager, sessionManager);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "IWebSocketManager", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager);
	        },
	        set: function (webSocketManager) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager, webSocketManager);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "INetworkManager", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager);
	        },
	        set: function (networkManager) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager, networkManager);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "AuthenticatedRestClient", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient);
	        },
	        set: function (authenticatedRestClient) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient, authenticatedRestClient);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "IDeviceManager", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager);
	        },
	        set: function (deviceManager) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager, deviceManager);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "IFacebookManager", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager);
	        },
	        set: function (facebookManager) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager, facebookManager);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "IConversationManager", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager);
	        },
	        set: function (facebookManager) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager, facebookManager);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "IProfileManager", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager);
	        },
	        set: function (profileManager) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager, profileManager);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(InterfaceManager, "IMessageManager", {
	        get: function () {
	            return InterfaceManager.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager);
	        },
	        set: function (messageManager) {
	            InterfaceManager.setInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager, messageManager);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return InterfaceManager;
	}());
	InterfaceManager.interfaces = {};
	exports.InterfaceManager = InterfaceManager;
	//# sourceMappingURL=interfaceManager.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	__webpack_require__(1);
	var inversify_1 = __webpack_require__(4);
	var eventManager_1 = __webpack_require__(61);
	var localStorageData_1 = __webpack_require__(62);
	var logger_1 = __webpack_require__(63);
	var restClient_1 = __webpack_require__(65);
	var authenticatedRestClient_1 = __webpack_require__(66);
	var sessionManager_1 = __webpack_require__(67);
	var webSocketManager_1 = __webpack_require__(68);
	var networkManager_1 = __webpack_require__(69);
	var deviceManager_1 = __webpack_require__(70);
	var facebookManager_1 = __webpack_require__(71);
	var conversationManager_1 = __webpack_require__(72);
	var profileManager_1 = __webpack_require__(73);
	var messageManager_1 = __webpack_require__(74);
	var interfaceSymbols_1 = __webpack_require__(64);
	var container = new inversify_1.Container();
	exports.container = container;
	function initInterfaces() {
	    "use strict";
	    container.unbindAll();
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager).to(eventManager_1.EventManager).inSingletonScope();
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData).to(localStorageData_1.LocalStorageData);
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger).to(logger_1.Logger);
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient).to(restClient_1.RestClient);
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager).to(sessionManager_1.SessionManager).inSingletonScope();
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager).to(webSocketManager_1.WebSocketManager);
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager).to(networkManager_1.NetworkManager);
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient).to(authenticatedRestClient_1.AuthenticatedRestClient);
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager).to(deviceManager_1.DeviceManager);
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager).to(facebookManager_1.FacebookManager);
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager).to(conversationManager_1.ConversationManager);
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager).to(profileManager_1.ProfileManager);
	    container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager).to(messageManager_1.MessageManager);
	}
	exports.initInterfaces = initInterfaces;
	initInterfaces();
	//# sourceMappingURL=inversify.config.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var EventManager = (function () {
	    function EventManager() {
	        this.eventSubscribers = [];
	    }
	    EventManager.prototype.subscribeToLocalEvent = function (eventType, handler) {
	        this.eventSubscribers.push({
	            eventType: eventType,
	            handler: handler,
	        });
	    };
	    EventManager.prototype.isSubscribedToLocalEvent = function (eventType) {
	        var isSubscribed = false;
	        for (var _i = 0, _a = this.eventSubscribers; _i < _a.length; _i++) {
	            var subscriber = _a[_i];
	            if (subscriber.eventType === eventType) {
	                isSubscribed = true;
	                break;
	            }
	        }
	        return isSubscribed;
	    };
	    EventManager.prototype.unsubscribeFromLocalEvent = function (eventType, handler) {
	        for (var i = this.eventSubscribers.length - 1; i >= 0; i--) {
	            var subscriber = this.eventSubscribers[i];
	            if (handler && subscriber.handler === handler && subscriber.eventType === eventType) {
	                this.eventSubscribers.splice(i, 1);
	            }
	            else if (subscriber.eventType === eventType) {
	                this.eventSubscribers.splice(i, 1);
	            }
	        }
	    };
	    EventManager.prototype.publishLocalEvent = function (eventType, data) {
	        var _this = this;
	        setTimeout(function () {
	            for (var _i = 0, _a = _this.eventSubscribers; _i < _a.length; _i++) {
	                var subscriber = _a[_i];
	                if (subscriber.eventType === eventType) {
	                    subscriber.handler(data);
	                }
	            }
	        });
	    };
	    return EventManager;
	}());
	EventManager = __decorate([
	    inversify_1.injectable(),
	    __metadata("design:paramtypes", [])
	], EventManager);
	exports.EventManager = EventManager;
	//# sourceMappingURL=eventManager.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var LocalStorageData = (function () {
	    function LocalStorageData() {
	        this._prefix = "comapi.";
	    }
	    Object.defineProperty(LocalStorageData.prototype, "prefix", {
	        set: function (prefix) {
	            this._prefix = prefix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LocalStorageData.prototype.getString = function (key) {
	        return localStorage.getItem(this._prefix + key);
	    };
	    LocalStorageData.prototype.setString = function (key, value) {
	        localStorage.setItem(this._prefix + key, value);
	    };
	    LocalStorageData.prototype.getObject = function (key) {
	        var obj = null;
	        var raw = this.getString(key);
	        try {
	            obj = JSON.parse(raw);
	        }
	        catch (e) {
	            console.error("caught exception in LocalStorageData.get(" + key + "): " + e);
	        }
	        return obj;
	    };
	    LocalStorageData.prototype.setObject = function (key, data) {
	        var succeeded = true;
	        try {
	            var stringified = JSON.stringify(data);
	            this.setString(key, stringified);
	        }
	        catch (e) {
	            console.log("caught exception in LocalStorageData.set(" + key + "): " + e);
	            succeeded = false;
	        }
	        return succeeded;
	    };
	    LocalStorageData.prototype.remove = function (key) {
	        try {
	            localStorage.removeItem(this._prefix + key);
	        }
	        catch (e) {
	            console.error("caught exception in LocalStorageData.remove(" + key + "): " + e);
	        }
	    };
	    return LocalStorageData;
	}());
	LocalStorageData = __decorate([
	    inversify_1.injectable(),
	    __metadata("design:paramtypes", [])
	], LocalStorageData);
	exports.LocalStorageData = LocalStorageData;
	//# sourceMappingURL=localStorageData.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var interfaces_1 = __webpack_require__(43);
	var indexedDBLogger_1 = __webpack_require__(44);
	var interfaceSymbols_1 = __webpack_require__(64);
	var Logger = (function () {
	    function Logger(_eventManager, _localStorageData, _indexedDB) {
	        this._eventManager = _eventManager;
	        this._localStorageData = _localStorageData;
	        this._indexedDB = _indexedDB;
	        this._logLevel = interfaces_1.LogLevels.Debug;
	        this._uid = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
	        this._maxLocalStorageLogSize = 1024;
	        this._localStorageKey = "rollingLogfile";
	    }
	    Object.defineProperty(Logger.prototype, "logLevel", {
	        get: function () {
	            return this._logLevel;
	        },
	        set: function (theLogLevel) {
	            this._logLevel = theLogLevel;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Logger.prototype.log = function (message, data) {
	        return this._log(interfaces_1.LogLevels.Debug, message, data);
	    };
	    Logger.prototype.warn = function (message, data) {
	        return this._log(interfaces_1.LogLevels.Warn, message, data);
	    };
	    Logger.prototype.error = function (message, data) {
	        return this._log(interfaces_1.LogLevels.Error, message, data);
	    };
	    Logger.prototype.getLog = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._indexedDB) {
	                _this._indexedDB.getData().then(function (data) {
	                    resolve(JSON.stringify(data));
	                }).catch(function (error) {
	                    reject(error);
	                });
	            }
	            else if (_this._localStorageData) {
	                resolve(_this._localStorageData.getString(_this._localStorageKey));
	            }
	            else {
	                reject({ message: "No logfile to get" });
	            }
	        });
	    };
	    Logger.prototype.clearLog = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._indexedDB) {
	                _this._indexedDB.clearData().then(function () {
	                    resolve(true);
	                })
	                    .catch(function (error) {
	                    reject(error);
	                });
	            }
	            else if (_this._localStorageData) {
	                _this._localStorageData.remove(_this._localStorageKey);
	                resolve(true);
	            }
	            else {
	                reject({ message: "No logfile to clear" });
	            }
	        });
	    };
	    Logger.prototype._stringForLogLevel = function (level) {
	        switch (level) {
	            case interfaces_1.LogLevels.Debug:
	                return "Debug";
	            case interfaces_1.LogLevels.Warn:
	                return "Warning";
	            case interfaces_1.LogLevels.Error:
	                return "Error";
	            default:
	                return "?";
	        }
	    };
	    Logger.prototype._log = function (level, message, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (level <= _this._logLevel) {
	                var formattedMessage = "[" + _this._uid + "] : " + new Date().toJSON() + " ["
	                    + _this._stringForLogLevel(level) + "] : " + message + (data !== undefined ? (" : "
	                    + JSON.stringify(data)) : "") + "\r\n";
	                switch (level) {
	                    case interfaces_1.LogLevels.Error:
	                        console.error(formattedMessage);
	                        break;
	                    case interfaces_1.LogLevels.Warn:
	                        console.warn(formattedMessage);
	                        break;
	                    case interfaces_1.LogLevels.Debug:
	                        console.log(formattedMessage);
	                        break;
	                    default:
	                        break;
	                }
	                var now = new Date();
	                var logEvent = {
	                    created: now.valueOf(),
	                    data: data,
	                    logLevel: level,
	                    message: message,
	                    timestamp: now.toISOString(),
	                };
	                if (_this._indexedDB) {
	                    _this._indexedDB.addRecord(logEvent).then(function (index) {
	                        resolve(true);
	                    });
	                }
	                else if (_this._localStorageData) {
	                    var log = _this._localStorageData.getString(_this._localStorageKey);
	                    if (log !== null) {
	                        log += formattedMessage;
	                    }
	                    else {
	                        log = formattedMessage;
	                    }
	                    if (log.length > _this._maxLocalStorageLogSize) {
	                        log = log.substring(formattedMessage.length);
	                    }
	                    _this._localStorageData.setString(_this._localStorageKey, log);
	                    resolve(true);
	                }
	                else {
	                    resolve(true);
	                }
	                if (_this._eventManager) {
	                    _this._eventManager.publishLocalEvent("LogMessage", logEvent);
	                }
	            }
	        });
	    };
	    return Logger;
	}());
	Logger = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger)), __param(2, inversify_1.optional()),
	    __metadata("design:paramtypes", [Object, Object, indexedDBLogger_1.IndexedDBLogger])
	], Logger);
	exports.Logger = Logger;
	//# sourceMappingURL=logger.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var INTERFACE_SYMBOLS = {
	    AuthenticatedRestClient: Symbol("AuthenticatedRestClient"),
	    ComapiConfig: Symbol("ComapiConfig"),
	    ConversationManager: Symbol("ConversationManager"),
	    DeviceManager: Symbol("DeviceManager"),
	    EventManager: Symbol("EventManager"),
	    FacebookManager: Symbol("FacebookManager"),
	    IndexedDBLogger: Symbol("IndexedDBLogger"),
	    LocalStorageData: Symbol("LocalStorageData"),
	    Logger: Symbol("Logger"),
	    MessageManager: Symbol("MessageManager"),
	    NetworkManager: Symbol("NetworkManager"),
	    ProfileManager: Symbol("ProfileManager"),
	    RestClient: Symbol("RestClient"),
	    SessionManager: Symbol("SessionManager"),
	    WebSocketManager: Symbol("WebSocketManager"),
	};
	exports.INTERFACE_SYMBOLS = INTERFACE_SYMBOLS;
	//# sourceMappingURL=interfaceSymbols.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var interfaceSymbols_1 = __webpack_require__(64);
	var RestClient = (function () {
	    function RestClient(logger) {
	        this.logger = logger;
	        this._readyStates = [
	            "request not initialized",
	            "server connection established",
	            "request received ",
	            "processing request",
	            "request finished and response is ready"
	        ];
	    }
	    RestClient.prototype.get = function (url, headers) {
	        return this.makeRequest("GET", url, headers);
	    };
	    RestClient.prototype.post = function (url, headers, data) {
	        return this.makeRequest("POST", url, headers, data);
	    };
	    RestClient.prototype.put = function (url, headers, data) {
	        return this.makeRequest("PUT", url, headers, data);
	    };
	    RestClient.prototype.patch = function (url, headers, data) {
	        return this.makeRequest("PATCH", url, headers, data);
	    };
	    RestClient.prototype.delete = function (url, headers) {
	        return this.makeRequest("DELETE", url, headers);
	    };
	    RestClient.prototype.addHeaders = function (request, headers) {
	        for (var prop in headers) {
	            if (headers.hasOwnProperty(prop)) {
	                request.setRequestHeader(prop, headers[prop]);
	            }
	        }
	    };
	    RestClient.prototype.getResponseHeaders = function (xhr) {
	        var headers = {};
	        var headerStr = xhr.getAllResponseHeaders();
	        if (headerStr) {
	            var headerPairs = headerStr.split("\u000d\u000a");
	            for (var i = 0; i < headerPairs.length; i++) {
	                var headerPair = headerPairs[i];
	                var index = headerPair.indexOf("\u003a\u0020");
	                if (index > 0) {
	                    var key = headerPair.substring(0, index);
	                    var val = headerPair.substring(index + 2);
	                    headers[key] = val;
	                }
	            }
	        }
	        return headers;
	    };
	    RestClient.prototype.createCORSRequest = function (method, url) {
	        var xhr = new XMLHttpRequest();
	        if ("withCredentials" in xhr) {
	            xhr.open(method, url, true);
	        }
	        return xhr;
	    };
	    RestClient.prototype.makeRequest = function (method, url, headers, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            headers = headers || {};
	            if (!headers["Content-Type"]) {
	                headers["Content-Type"] = "application/json";
	            }
	            if (!headers["Cache-Control"]) {
	                headers["Cache-Control"] = "no-cache";
	            }
	            if (_this.logger) {
	                _this.logger.log(method + "'ing " + url + "  ...");
	            }
	            var xhr = _this.createCORSRequest(method, url);
	            if (_this.logger) {
	                _this.logger.log("Created XMLHttpRequest ...");
	            }
	            if (headers !== undefined) {
	                _this.addHeaders(xhr, headers);
	            }
	            if (_this.logger) {
	                _this.logger.log("added headers", headers);
	            }
	            xhr.onload = function () {
	                if (_this.logger) {
	                    _this.logger.log("xhr.onload", xhr.responseText);
	                }
	                var succeeded = xhr.status >= 200 && xhr.status < 300;
	                var result = {
	                    headers: _this.getResponseHeaders(xhr),
	                    response: undefined,
	                    statusCode: xhr.status,
	                };
	                if (xhr.responseText) {
	                    try {
	                        result.response = JSON.parse(xhr.responseText);
	                        if (_this.logger) {
	                            _this.logger.log(method + "'ing to " + url + " returned this object: ", result.response);
	                        }
	                    }
	                    catch (e) {
	                        result.response = xhr.responseText;
	                        if (_this.logger) {
	                            _this.logger.log(method + "'ing to " + url + " returned this text: " + xhr.responseText);
	                        }
	                    }
	                }
	                if (succeeded) {
	                    resolve(result);
	                }
	                else {
	                    reject(result);
	                }
	            };
	            xhr.onerror = function () {
	                if (_this.logger) {
	                    _this.logger.log("xhr.onerror", xhr.responseText);
	                }
	                if (_this.logger) {
	                    _this.logger.error(method + "'ing to " + url + " failed");
	                }
	                var result = {
	                    headers: _this.getResponseHeaders(xhr),
	                    response: xhr.responseText,
	                    statusCode: xhr.status,
	                };
	                reject(result);
	            };
	            xhr.onreadystatechange = function (evt) {
	                if (_this.logger) {
	                    _this.logger.log("onreadystatechange: " + _this._readyStates[xhr.readyState] + " [status=" + xhr.status + "]");
	                }
	            };
	            xhr.onabort = function (evt) {
	                if (_this.logger) {
	                    _this.logger.log("onabort", evt);
	                }
	            };
	            xhr.send(data ? JSON.stringify(data) : null);
	            if (_this.logger) {
	                _this.logger.log("send data", data);
	            }
	        });
	    };
	    return RestClient;
	}());
	RestClient = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)), __param(0, inversify_1.optional()),
	    __metadata("design:paramtypes", [Object])
	], RestClient);
	exports.RestClient = RestClient;
	//# sourceMappingURL=restClient.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var interfaceSymbols_1 = __webpack_require__(64);
	var AuthenticatedRestClient = (function () {
	    function AuthenticatedRestClient(logger, restClient, networkManager) {
	        this.logger = logger;
	        this.restClient = restClient;
	        this.networkManager = networkManager;
	        this.retryCount = 3;
	    }
	    AuthenticatedRestClient.prototype.get = function (url, headers) {
	        var _this = this;
	        headers = headers || {};
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _this.makeRequestWithRetry(0, _this.restClient.get.bind(_this.restClient), url, headers);
	        });
	    };
	    AuthenticatedRestClient.prototype.post = function (url, headers, data) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _this.makeRequestWithRetry(0, _this.restClient.post.bind(_this.restClient), url, headers, data);
	        });
	    };
	    AuthenticatedRestClient.prototype.patch = function (url, headers, data) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _this.makeRequestWithRetry(0, _this.restClient.patch.bind(_this.restClient), url, headers, data);
	        });
	    };
	    AuthenticatedRestClient.prototype.put = function (url, headers, data) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _this.makeRequestWithRetry(0, _this.restClient.put.bind(_this.restClient), url, headers, data);
	        });
	    };
	    AuthenticatedRestClient.prototype.delete = function (url, headers) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _this.makeRequestWithRetry(0, _this.restClient.delete.bind(_this.restClient), url, headers);
	        });
	    };
	    AuthenticatedRestClient.prototype.makeRequestWithRetry = function (count, verb, url, headers, data) {
	        var _this = this;
	        return verb(url, headers, data)
	            .catch(function (result) {
	            if (count < _this.retryCount && result.statusCode === 401 && _this.networkManager) {
	                return _this.networkManager.restartSession()
	                    .then(function (sessionInfo) {
	                    headers.authorization = _this.constructAUthHeader(sessionInfo.token);
	                    return _this.makeRequestWithRetry(++count, verb, url, headers, data);
	                });
	            }
	            throw result;
	        });
	    };
	    AuthenticatedRestClient.prototype.constructAUthHeader = function (token) {
	        return "Bearer " + token;
	    };
	    return AuthenticatedRestClient;
	}());
	AuthenticatedRestClient = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
	    __metadata("design:paramtypes", [Object, Object, Object])
	], AuthenticatedRestClient);
	exports.AuthenticatedRestClient = AuthenticatedRestClient;
	//# sourceMappingURL=authenticatedRestClient.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(46);
	var interfaceSymbols_1 = __webpack_require__(64);
	var SessionManager = (function () {
	    function SessionManager(_logger, _restClient, _localStorageData, _comapiConfig) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._deviceId = _localStorageData.getString("deviceId");
	        if (!this._deviceId) {
	            this._deviceId = utils_1.Utils.uuid();
	            _localStorageData.setString("deviceId", this._deviceId);
	        }
	        this._getSession();
	    }
	    Object.defineProperty(SessionManager.prototype, "sessionInfo", {
	        get: function () {
	            return this._sessionInfo;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SessionManager.prototype, "expiry", {
	        get: function () {
	            return this._sessionInfo.session.expiresOn;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SessionManager.prototype, "isActive", {
	        get: function () {
	            var result = false;
	            if (this._sessionInfo) {
	                var now = new Date();
	                var expiry = new Date(this._sessionInfo.session.expiresOn);
	                if (now < expiry) {
	                    result = true;
	                }
	                else {
	                    this._removeSession();
	                }
	            }
	            return result;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SessionManager.prototype.getValidToken = function () {
	        return this.isActive
	            ? Promise.resolve(this._sessionInfo.token)
	            : this.startSession()
	                .then(function (sessionInfo) {
	                return Promise.resolve(sessionInfo.token);
	            });
	    };
	    SessionManager.prototype.startSession = function () {
	        var _this = this;
	        var self = this;
	        return new Promise(function (resolve, reject) {
	            if (_this.isActive) {
	                self._logger.log("startSession() found an existing session: ");
	                resolve(_this._getSession());
	            }
	            else {
	                _this._startAuth().then(function (sessionStartResponse) {
	                    var authChallengeOptions = {
	                        nonce: sessionStartResponse.nonce
	                    };
	                    self._comapiConfig.authChallenge(authChallengeOptions, function (jwt) {
	                        if (jwt) {
	                            self._createAuthenticatedSession(jwt, sessionStartResponse.authenticationId, {})
	                                .then(function (sessionInfo) {
	                                self._setSession(sessionInfo);
	                                resolve(sessionInfo);
	                            }).catch(function (error) {
	                                reject(error);
	                            });
	                        }
	                        else {
	                            reject({ message: "Failed to get a JWT from authChallenge", statusCode: 401 });
	                        }
	                    });
	                }).catch(function (error) { return reject(error); });
	            }
	        });
	    };
	    SessionManager.prototype.endSession = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._sessionInfo) {
	                _this._endAuth()
	                    .then(function (result) {
	                    _this._removeSession();
	                    resolve(true);
	                }).catch(function (error) {
	                    _this._removeSession();
	                    reject(error);
	                });
	            }
	            else {
	                reject({ message: "No active session is present, create one before ending one" });
	            }
	        });
	    };
	    SessionManager.prototype._createAuthenticatedSession = function (jwt, authenticationId, deviceInfo) {
	        var browserInfo = utils_1.Utils.getBrowserInfo();
	        var data = {
	            authenticationId: authenticationId,
	            authenticationToken: jwt,
	            deviceId: this._deviceId,
	            platform: "javascript",
	            platformVersion: browserInfo.version,
	            sdkType: "native",
	            sdkVersion: "1.0.2.115"
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.sessions, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, data)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    SessionManager.prototype._startAuth = function () {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.sessionStart, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    SessionManager.prototype._endAuth = function () {
	        var headers = {
	            "Content-Type": "application/json",
	            "authorization": this.getAuthHeader(),
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.session, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url, headers)
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    SessionManager.prototype._getSession = function () {
	        var sessionInfo = this._localStorageData.getObject("session");
	        if (sessionInfo) {
	            this._sessionInfo = sessionInfo;
	        }
	        return sessionInfo;
	    };
	    SessionManager.prototype._setSession = function (sessionInfo) {
	        var expiry = new Date(sessionInfo.session.expiresOn);
	        var now = new Date();
	        if (expiry < now) {
	            this._logger.error("Was given an expired token ;-(");
	        }
	        this._sessionInfo = sessionInfo;
	        this._localStorageData.setObject("session", sessionInfo);
	    };
	    SessionManager.prototype._removeSession = function () {
	        this._localStorageData.remove("session");
	        this._sessionInfo = undefined;
	    };
	    SessionManager.prototype.getAuthHeader = function () {
	        return "Bearer " + this.sessionInfo.token;
	    };
	    return SessionManager;
	}());
	SessionManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object])
	], SessionManager);
	exports.SessionManager = SessionManager;
	//# sourceMappingURL=sessionManager.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var interfaceSymbols_1 = __webpack_require__(64);
	var WebSocketManager = (function () {
	    function WebSocketManager(_logger, _localStorageData, _comapiConfig, _sessionManager, _eventManager) {
	        this._logger = _logger;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	        this._eventManager = _eventManager;
	        this.readystates = [
	            "Connecting",
	            "Open",
	            "Closing",
	            "Closed"
	        ];
	        this.manuallyClosed = false;
	        this.connected = false;
	        this.didConnect = false;
	        this.attempts = 1;
	        this.echoIntervalTimeout = 1000 * 60 * 3;
	    }
	    WebSocketManager.prototype.connect = function () {
	        var _this = this;
	        this._logger.log("WebSocketManager.connect();");
	        return new Promise(function (resolve, reject) {
	            if (!_this.webSocket) {
	                _this._logger.log("WebSocketManager.connect()");
	                _this._sessionManager.getValidToken()
	                    .then(function (token) {
	                    _this._logger.log("WebSocketManager.connect() - got auth token", token);
	                    _this.manuallyClosed = false;
	                    var url = _this._comapiConfig.webSocketBase + "/apispaces/" + _this._comapiConfig.apiSpaceId + "/socket";
	                    var queryString = "?token=" + token;
	                    var fullUrl = url + queryString;
	                    _this._logger.log("connecting ...", fullUrl);
	                    _this.webSocket = new WebSocket(fullUrl);
	                    _this.echoIntervalId = setInterval(function () { return _this.echo(); }, _this.echoIntervalTimeout);
	                    _this.webSocket.onopen = function () {
	                        _this._logger.log("websocket onopen");
	                        _this.connected = true;
	                        if (_this.didConnect === false) {
	                            _this.didConnect = true;
	                            _this._logger.log("resolving connect() promise");
	                            resolve(true);
	                        }
	                    };
	                    _this.webSocket.onerror = function (event) {
	                        _this._logger.log("websocket onerror - readystate: " + _this.readystates[_this.webSocket.readyState]);
	                    };
	                    _this.webSocket.onmessage = function (event) {
	                        var message;
	                        try {
	                            message = JSON.parse(event.data);
	                        }
	                        catch (e) {
	                            _this._logger.error("socket onmessage: (not JSON)", event.data);
	                        }
	                        if (message) {
	                            _this._logger.log("websocket onmessage: ", message);
	                            _this.publishWebsocketEvent(message);
	                        }
	                    };
	                    _this.webSocket.onclose = function () {
	                        _this.connected = false;
	                        _this.webSocket = undefined;
	                        _this._logger.log("WebSocket Connection closed.");
	                        if (_this.didConnect === false) {
	                            reject();
	                        }
	                        if (!_this.manuallyClosed && _this.didConnect) {
	                            _this._logger.log("socket not manually closed, reconnecting ...");
	                            var time = _this.generateInterval(_this.attempts);
	                            setTimeout(function () {
	                                _this.attempts++;
	                                _this._logger.log("reconnecting ...");
	                                _this.connect();
	                            }, time);
	                        }
	                    };
	                });
	            }
	            else {
	                if (_this.didConnect) {
	                    resolve(true);
	                }
	                else {
	                    reject();
	                }
	            }
	        });
	    };
	    WebSocketManager.prototype.send = function (data) {
	        if (this.webSocket) {
	            this.webSocket.send(JSON.stringify(data));
	        }
	    };
	    WebSocketManager.prototype.isConnected = function () {
	        return this.didConnect;
	    };
	    WebSocketManager.prototype.hasSocket = function () {
	        return this.webSocket ? true : false;
	    };
	    WebSocketManager.prototype.disconnect = function () {
	        var _this = this;
	        this._logger.log("WebSocketManager.disconnect();");
	        return new Promise(function (resolve, reject) {
	            if (_this.webSocket) {
	                _this.webSocket.onclose = function () {
	                    _this.connected = false;
	                    _this.didConnect = false;
	                    _this._logger.log("socket closed.");
	                    _this.webSocket = undefined;
	                    resolve(true);
	                };
	                clearInterval(_this.echoIntervalId);
	                _this.manuallyClosed = true;
	                _this.webSocket.close();
	            }
	            else {
	                resolve(false);
	            }
	        });
	    };
	    WebSocketManager.prototype.generateInterval = function (k) {
	        var maxInterval = (Math.pow(2, k) - 1) * 1000;
	        if (maxInterval > 30 * 1000) {
	            maxInterval = 30 * 1000;
	        }
	        var interval = Math.random() * maxInterval;
	        this._logger.log("generateInterval() => " + interval);
	        return interval;
	    };
	    WebSocketManager.prototype.echo = function () {
	        if (this.connected) {
	            this.send({
	                name: "echo",
	                payload: {},
	                publishedOn: new Date().toISOString(),
	            });
	        }
	    };
	    WebSocketManager.prototype.mapEventName = function (name) {
	        if (this._comapiConfig.eventMapping) {
	            if (name) {
	                var split = name.split(".");
	                var category = split[0];
	                var type = split[1];
	                for (var eventCategory in this._comapiConfig.eventMapping) {
	                    if (this._comapiConfig.eventMapping.hasOwnProperty(eventCategory)) {
	                        var aliases = this._comapiConfig.eventMapping[eventCategory];
	                        for (var _i = 0, aliases_1 = aliases; _i < aliases_1.length; _i++) {
	                            var val = aliases_1[_i];
	                            if (val === category) {
	                                return eventCategory + "." + type;
	                            }
	                        }
	                    }
	                }
	            }
	        }
	        return name;
	    };
	    WebSocketManager.prototype.publishWebsocketEvent = function (event) {
	        var mappedName = this.mapEventName(event.name);
	        switch (mappedName) {
	            case "conversation.delete":
	                {
	                    var conversationDeletedEventData = {
	                        conversationId: event.conversationId,
	                        createdBy: event.context.createdBy,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("conversationDeleted", conversationDeletedEventData);
	                }
	                break;
	            case "conversation.undelete":
	                {
	                    var conversationUndeletedEventData = {
	                        conversationId: event.conversationId,
	                        createdBy: event.context.createdBy,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("conversationUndeleted", conversationUndeletedEventData);
	                }
	                break;
	            case "conversation.update":
	                {
	                    var conversationUpdatedEventData = {
	                        conversationId: event.conversationId,
	                        createdBy: event.context.createdBy,
	                        description: event.payload.description,
	                        eTag: event.etag,
	                        isPublic: event.payload.isPublic,
	                        name: event.payload.name,
	                        roles: event.payload.roles,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("conversationUpdated", conversationUpdatedEventData);
	                }
	                break;
	            case "conversation.participantAdded":
	                {
	                    var participantAddedEventData = {
	                        conversationId: event.conversationId,
	                        createdBy: event.context.createdBy,
	                        profileId: event.payload.profileId,
	                        role: event.payload.role,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("participantAdded", participantAddedEventData);
	                }
	                break;
	            case "conversation.participantRemoved":
	                {
	                    var participantRemovedEventData = {
	                        conversationId: event.conversationId,
	                        createdBy: event.context.createdBy,
	                        profileId: event.payload.profileId,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("participantRemoved", participantRemovedEventData);
	                }
	                break;
	            case "conversation.participantTyping":
	                {
	                    var participantTypingEventData = {
	                        conversationId: event.payload.conversationId,
	                        createdBy: event.context.createdBy,
	                        profileId: event.payload.profileId,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("participantTyping", participantTypingEventData);
	                }
	                break;
	            case "conversation.participantTypingOff":
	                {
	                    var participantTypingOffEventData = {
	                        conversationId: event.payload.conversationId,
	                        createdBy: event.context.createdBy,
	                        profileId: event.payload.profileId,
	                        timestamp: event.publishedOn,
	                    };
	                    this._eventManager.publishLocalEvent("participantTypingOff", participantTypingOffEventData);
	                }
	                break;
	            case "conversationMessage.sent":
	                {
	                    var _event = {
	                        conversationEventId: event.conversationEventId,
	                        conversationId: event.payload.context.conversationId,
	                        eventId: event.eventId,
	                        name: "conversationMessage.sent",
	                        payload: {
	                            alert: event.payload.alert,
	                            context: event.payload.context,
	                            messageId: event.payload.messageId,
	                            metadata: event.payload.metadata,
	                            parts: event.payload.parts,
	                        }
	                    };
	                    this._eventManager.publishLocalEvent("conversationMessageEvent", _event);
	                }
	                break;
	            case "conversationMessage.read":
	                {
	                    var _event = {
	                        conversationEventId: event.conversationEventId,
	                        conversationId: event.payload.conversationId,
	                        eventId: event.eventId,
	                        name: "conversationMessage.read",
	                        payload: {
	                            conversationId: event.payload.conversationId,
	                            messageId: event.payload.messageId,
	                            profileId: event.payload.profileId,
	                            timestamp: event.payload.timestamp
	                        }
	                    };
	                    this._eventManager.publishLocalEvent("conversationMessageEvent", _event);
	                }
	                break;
	            case "conversationMessage.delivered":
	                {
	                    var _event = {
	                        conversationEventId: event.conversationEventId,
	                        conversationId: event.payload.conversationId,
	                        eventId: event.eventId,
	                        name: "conversationMessage.delivered",
	                        payload: {
	                            conversationId: event.payload.conversationId,
	                            messageId: event.payload.messageId,
	                            profileId: event.payload.profileId,
	                            timestamp: event.payload.timestamp
	                        }
	                    };
	                    this._eventManager.publishLocalEvent("conversationMessageEvent", _event);
	                }
	                break;
	            case "profile.update":
	                {
	                    var _event = {
	                        eTag: event.eTag,
	                        profile: event.payload
	                    };
	                    if (event.eTag) {
	                        this._localStorageData.setString("MyProfileETag", event.eTag);
	                    }
	                    this._eventManager.publishLocalEvent("profileUpdated", _event);
	                }
	                break;
	            default:
	                this._logger.warn("Unknown Event", event);
	                this._eventManager.publishLocalEvent("webSocketEvent", event);
	                break;
	        }
	    };
	    return WebSocketManager;
	}());
	WebSocketManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
	    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
	], WebSocketManager);
	exports.WebSocketManager = WebSocketManager;
	//# sourceMappingURL=webSocketManager.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var interfaceSymbols_1 = __webpack_require__(64);
	var NetworkManager = (function () {
	    function NetworkManager(_sessionManager, _webSocketManager) {
	        this._sessionManager = _sessionManager;
	        this._webSocketManager = _webSocketManager;
	    }
	    NetworkManager.prototype.startSession = function () {
	        var _this = this;
	        return this._sessionManager.startSession()
	            .then(function (sessionInfo) {
	            return _this._webSocketManager.connect();
	        })
	            .then(function (connected) {
	            return _this._sessionManager.sessionInfo;
	        });
	    };
	    NetworkManager.prototype.restartSession = function () {
	        var _this = this;
	        return this._webSocketManager.disconnect()
	            .then(function (succeeded) {
	            return _this._sessionManager.startSession();
	        })
	            .then(function (sessionInfo) {
	            return _this._webSocketManager.connect();
	        })
	            .then(function (connected) {
	            return _this._sessionManager.sessionInfo;
	        });
	    };
	    Object.defineProperty(NetworkManager.prototype, "session", {
	        get: function () {
	            return this._sessionManager.sessionInfo ? this._sessionManager.sessionInfo.session : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    NetworkManager.prototype.endSession = function () {
	        var _this = this;
	        return this._webSocketManager.disconnect()
	            .then(function () {
	            return _this._sessionManager.endSession();
	        });
	    };
	    NetworkManager.prototype.getValidToken = function () {
	        return this._sessionManager.getValidToken();
	    };
	    NetworkManager.prototype.ensureSessionAndSocket = function () {
	        var _this = this;
	        return this.ensureSession()
	            .then(function (sessionInfo) {
	            return _this.ensureSocket();
	        })
	            .then(function (connected) {
	            return _this._sessionManager.sessionInfo;
	        });
	    };
	    NetworkManager.prototype.ensureSession = function () {
	        return this._sessionManager.sessionInfo ? Promise.resolve(this._sessionManager.sessionInfo) : this._sessionManager.startSession();
	    };
	    NetworkManager.prototype.ensureSocket = function () {
	        return this._webSocketManager.hasSocket() ? Promise.resolve(true) : this._webSocketManager.connect();
	    };
	    return NetworkManager;
	}());
	NetworkManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager)),
	    __metadata("design:paramtypes", [Object, Object])
	], NetworkManager);
	exports.NetworkManager = NetworkManager;
	//# sourceMappingURL=networkManager.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var interfaces_1 = __webpack_require__(43);
	var utils_1 = __webpack_require__(46);
	var interfaceSymbols_1 = __webpack_require__(64);
	var DeviceManager = (function () {
	    function DeviceManager(_logger, _restClient, _localStorageData, _comapiConfig) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	    }
	    DeviceManager.prototype.setFCMPushDetails = function (sessionId, packageName, registrationId) {
	        var data = {
	            "fcm": {
	                "package": packageName,
	                "registrationId": registrationId
	            }
	        };
	        return this._restClient.put(this.getPushUrl(sessionId), {}, data)
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    DeviceManager.prototype.setAPNSPushDetails = function (sessionId, bundleId, environment, token) {
	        var data = {
	            "apns": {
	                "bundleId": bundleId,
	                "environment": interfaces_1.Environment[environment],
	                "token": token
	            }
	        };
	        return this._restClient.put(this.getPushUrl(sessionId), {}, data)
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    DeviceManager.prototype.removePushDetails = function (sessionId) {
	        return this._restClient.delete(this.getPushUrl(sessionId), {})
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    DeviceManager.prototype.getPushUrl = function (sessionId) {
	        return utils_1.Utils.format(this._comapiConfig.foundationRestUrls.push, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            sessionId: sessionId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	    };
	    return DeviceManager;
	}());
	DeviceManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object])
	], DeviceManager);
	exports.DeviceManager = DeviceManager;
	//# sourceMappingURL=deviceManager.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(46);
	var interfaceSymbols_1 = __webpack_require__(64);
	var FacebookManager = (function () {
	    function FacebookManager(_restClient, _comapiConfig) {
	        this._restClient = _restClient;
	        this._comapiConfig = _comapiConfig;
	    }
	    FacebookManager.prototype.createSendToMessengerState = function (data) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.facebook, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, data || {});
	    };
	    return FacebookManager;
	}());
	FacebookManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __metadata("design:paramtypes", [Object, Object])
	], FacebookManager);
	exports.FacebookManager = FacebookManager;
	//# sourceMappingURL=facebookManager.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var interfaces_1 = __webpack_require__(43);
	var utils_1 = __webpack_require__(46);
	var interfaceSymbols_1 = __webpack_require__(64);
	var ConversationManager = (function () {
	    function ConversationManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	        this.isTypingInfo = {};
	        this.isTypingOffInfo = {};
	    }
	    ConversationManager.prototype.createConversation = function (conversationDetails) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversations, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, conversationDetails)
	            .then(function (result) {
	            result.response._etag = result.headers.ETag;
	            return Promise.resolve(result.response);
	        });
	    };
	    ConversationManager.prototype.updateConversation = function (conversationDetails, eTag) {
	        var headers = {};
	        if (eTag) {
	            headers["if-match"] = eTag;
	        }
	        var args = {
	            description: conversationDetails.description,
	            isPublic: conversationDetails.isPublic,
	            name: conversationDetails.name,
	            roles: conversationDetails.roles,
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationDetails.id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.put(url, headers, args)
	            .then(function (result) {
	            result.response._etag = result.headers.ETag;
	            return Promise.resolve(result.response);
	        });
	    };
	    ConversationManager.prototype.getConversation = function (conversationId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url)
	            .then(function (result) {
	            result.response._etag = result.headers.ETag;
	            return Promise.resolve(result.response);
	        });
	    };
	    ConversationManager.prototype.deleteConversation = function (conversationId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url, {})
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    ConversationManager.prototype.addParticipantsToConversation = function (conversationId, participants) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, participants)
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    ConversationManager.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
	        var query = "";
	        for (var i = 0; i < participants.length; i++) {
	            query += (i === 0 ? "?id=" + participants[i] : "&id=" + participants[i]);
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url + query, {})
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    ConversationManager.prototype.getParticipantsInConversation = function (conversationId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    ConversationManager.prototype.getConversations = function (scope, profileId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversations, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        if (scope || profileId) {
	            url += "?";
	            if (scope !== undefined) {
	                url += "scope=" + interfaces_1.ConversationScope[scope] + "&";
	            }
	            if (profileId !== undefined) {
	                url += "profileId=" + profileId;
	            }
	        }
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    ConversationManager.prototype.sendIsTyping = function (conversationId) {
	        var _this = this;
	        if (this.isTypingInfo[conversationId]) {
	            var lastSentTime = new Date(this.isTypingInfo[conversationId]);
	            var now = new Date();
	            var diff = (now.getTime() - lastSentTime.getTime()) / 1000;
	            if (diff < (this._comapiConfig.isTypingTimeout || 10)) {
	                return Promise.resolve(false);
	            }
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.typing, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, {})
	            .then(function (result) {
	            _this.isTypingInfo[conversationId] = new Date().toISOString();
	            return Promise.resolve(true);
	        });
	    };
	    ConversationManager.prototype.sendIsTypingOff = function (conversationId) {
	        var _this = this;
	        if (this.isTypingOffInfo[conversationId]) {
	            var lastSentTime = new Date(this.isTypingOffInfo[conversationId]);
	            var now = new Date();
	            var diff = (now.getTime() - lastSentTime.getTime()) / 1000;
	            if (diff < (this._comapiConfig.isTypingOffTimeout || 10)) {
	                return Promise.resolve(false);
	            }
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.typing, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url, {})
	            .then(function (result) {
	            _this.isTypingOffInfo[conversationId] = new Date().toISOString();
	            return Promise.resolve(true);
	        });
	    };
	    return ConversationManager;
	}());
	ConversationManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
	], ConversationManager);
	exports.ConversationManager = ConversationManager;
	//# sourceMappingURL=conversationManager.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(46);
	var interfaceSymbols_1 = __webpack_require__(64);
	var ProfileManager = (function () {
	    function ProfileManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	    }
	    ProfileManager.prototype.getProfile = function (id) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            profileId: id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url);
	    };
	    ProfileManager.prototype.queryProfiles = function (query) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profiles, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        if (query) {
	            url += ("?" + query);
	        }
	        return this._restClient.get(url);
	    };
	    ProfileManager.prototype.updateProfile = function (id, profile, eTag) {
	        var headers = {};
	        if (eTag) {
	            headers["If-Match"] = eTag;
	        }
	        var data = utils_1.Utils.clone(profile);
	        if (data.id === undefined) {
	            data.id = id;
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            profileId: id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.put(url, headers, data);
	    };
	    ProfileManager.prototype.patchProfile = function (id, profile, eTag) {
	        var headers = {};
	        if (eTag) {
	            headers["If-Match"] = eTag;
	        }
	        var data = utils_1.Utils.clone(profile);
	        if (data.id === undefined) {
	            data.id = id;
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            profileId: id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.patch(url, headers, data);
	    };
	    return ProfileManager;
	}());
	ProfileManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
	], ProfileManager);
	exports.ProfileManager = ProfileManager;
	//# sourceMappingURL=profileManager.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(46);
	var interfaceSymbols_1 = __webpack_require__(64);
	var MessageManager = (function () {
	    function MessageManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager, _conversationManager) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	        this._conversationManager = _conversationManager;
	    }
	    MessageManager.prototype.getConversationEvents = function (conversationId, from, limit) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.events, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        url += "?from=" + from;
	        url += "&limit=" + limit;
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    MessageManager.prototype.getConversationMessages = function (conversationId, limit, from) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        url += "?limit=" + limit;
	        if (from !== undefined) {
	            url += "&from=" + from;
	        }
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    MessageManager.prototype._sendMessageToConversation = function (conversationId, metadata, parts, alert) {
	        var request = {
	            alert: alert,
	            metadata: metadata,
	            parts: parts,
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, request)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    MessageManager.prototype.sendMessageToConversation = function (conversationId, message) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, message)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    MessageManager.prototype.sendMessageStatusUpdates = function (conversationId, statuses) {
	        var headers = {
	            "Content-Type": "application/json",
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.statusUpdates, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, headers, statuses)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    return MessageManager;
	}());
	MessageManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
	    __param(5, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
	], MessageManager);
	exports.MessageManager = MessageManager;
	//# sourceMappingURL=messageManager.js.map

/***/ })
/******/ ]);