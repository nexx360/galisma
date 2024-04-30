/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _injection_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./injection/dynamic */ \"./src/injection/dynamic.ts\");\n/* harmony import */ var _injection_injected__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./injection/injected */ \"./src/injection/injected.ts\");\n\n\nwindow.galisma = {\n    createInjectedSlots: _injection_injected__WEBPACK_IMPORTED_MODULE_1__.createInjectedSlots,\n    createDynamicSlots: _injection_dynamic__WEBPACK_IMPORTED_MODULE_0__.createDynamicSlots,\n};\n\n\n//# sourceURL=webpack://galaxiemedialibraryv2/./src/app.ts?");

/***/ }),

/***/ "./src/injection/dynamic.ts":
/*!**********************************!*\
  !*** ./src/injection/dynamic.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createDynamicSlots: () => (/* binding */ createDynamicSlots),\n/* harmony export */   createDynamicSlotsFromPayload: () => (/* binding */ createDynamicSlotsFromPayload),\n/* harmony export */   sanitizePayload: () => (/* binding */ sanitizePayload)\n/* harmony export */ });\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logger */ \"./src/logger.ts\");\n/* harmony import */ var _types_prismaSlotType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/prismaSlotType */ \"./src/types/prismaSlotType.ts\");\n/* harmony import */ var _injectionTools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./injectionTools */ \"./src/injection/injectionTools.ts\");\n\n\n\nvar setInitialOffset = function (firstOffsetSelector) {\n    if (!firstOffsetSelector || firstOffsetSelector === '')\n        return 0;\n    var offsetDiv = document.querySelector(firstOffsetSelector);\n    return offsetDiv === null ? 0 : offsetDiv.getBoundingClientRect().bottom + window.pageYOffset;\n};\nvar getEffectiveWindowHeight = function (contentHeight, maxRepetition) {\n    /**\n       * Reminder\n       * const theoricContentHeight = contentHeight + 300 * (contentHeight / windowHeight);\n       * const theoricRepetition =  theoricContentHeight / windowHeight;\n       *\n       * As consequence, we need to solve\n       * maxRepetition = (contentHeight + 300 * (contentHeight / windowHeight)) / windowHeight;\n       * where windowHeight is the unknown\n       * maxRepetition = contentHeight / windowHeight +\n       *  300 * contentHeight / ( windowHeight * windowHeight);\n       * maxRepetition * x2 - contentHeight  * x - 300 * contentHeight = 0;\n       *\n       * https://www.maths-et-tiques.fr/telech/Secondegre2ESL.pdf\n       * https://stackoverflow.com/questions/33454438/quadratic-equation-solver-in-javascript\n       */\n    var solve = function (a, b, c) {\n        var result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);\n        var result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);\n        return [result, result2];\n    };\n    /**\n     * The 1.4 is added to take into account the fact that p length\n     * is not linear\n     */\n    var output = solve(maxRepetition * 1.4, -contentHeight, -300 * contentHeight);\n    return Math.max.apply(Math, output);\n};\nvar sanitizePayload = function (payload) {\n    if (typeof payload !== 'object')\n        throw new Error('Payload must be an object');\n    var _a = payload, selector = _a.selector, mainContentSelector = _a.mainContentSelector, firstOffsetSelector = _a.firstOffsetSelector, maxRepetition = _a.maxRepetition, densityIndex = _a.densityIndex, injectionClassName = _a.injectionClassName, style = _a.style, beforeStyle = _a.beforeStyle, divIdPrefix = _a.divIdPrefix, prismaType = _a.prismaType;\n    if (typeof selector !== 'string')\n        throw new Error('Selector must be a string');\n    if (typeof mainContentSelector !== 'string')\n        throw new Error('Main content selector must be a string');\n    if (typeof maxRepetition !== 'number')\n        throw new Error('Max repetition must be a number');\n    if (typeof prismaType !== 'string' && !_types_prismaSlotType__WEBPACK_IMPORTED_MODULE_1__.prismaSlotType.includes(prismaType))\n        throw new Error(\"Prisma type must be one of \".concat(_types_prismaSlotType__WEBPACK_IMPORTED_MODULE_1__.prismaSlotType.join(', ')));\n    if (typeof firstOffsetSelector !== 'string')\n        throw new Error('First offset selector must be a string');\n    if (typeof densityIndex !== 'number')\n        throw new Error('Density index must be a number');\n    if (typeof injectionClassName !== 'string')\n        throw new Error('Injection class name must be a string');\n    if (typeof style !== 'string')\n        throw new Error('Style must be a string');\n    if (typeof beforeStyle !== 'string')\n        throw new Error('Before style must be a string');\n    if (typeof divIdPrefix !== 'string')\n        throw new Error('Div id prefix must be a string');\n    return {\n        selector: selector,\n        mainContentSelector: mainContentSelector,\n        firstOffsetSelector: firstOffsetSelector,\n        maxRepetition: maxRepetition,\n        densityIndex: densityIndex,\n        injectionClassName: injectionClassName,\n        style: style,\n        beforeStyle: beforeStyle,\n        divIdPrefix: divIdPrefix,\n        prismaType: prismaType,\n    };\n};\nvar createDynamicSlotsFromPayload = function (_a) {\n    var selector = _a.selector, mainContentSelector = _a.mainContentSelector, firstOffsetSelector = _a.firstOffsetSelector, maxRepetition = _a.maxRepetition, densityIndex = _a.densityIndex, injectionClassName = _a.injectionClassName, style = _a.style, beforeStyle = _a.beforeStyle, divIdPrefix = _a.divIdPrefix, prismaType = _a.prismaType;\n    /**\n     * Wrapper identifier is the name of the div win ('#main for instance')\n     * selectors is a string or an array of selectors\n    * */\n    var windowHeight = (window.innerHeight || document.documentElement.clientHeight);\n    var selectedDivs = document.querySelectorAll(selector);\n    if (selectedDivs.length === 0)\n        throw new Error(\"We cannot match any div with selector '\".concat(selector, \"'\"));\n    // We detect content height\n    var contentDiv = document.querySelector(mainContentSelector);\n    if (!contentDiv)\n        throw new Error(\"We cannot match any div with selector '\".concat(mainContentSelector, \"'\"));\n    var contentHeight = contentDiv.clientHeight;\n    (0,_injectionTools__WEBPACK_IMPORTED_MODULE_2__.createInjectionStyle)({ injectionClassName: injectionClassName, style: style, beforeStyle: beforeStyle });\n    var distanceToPreviousInsertionBottom = setInitialOffset(firstOffsetSelector);\n    /**\n     * We test whether theoric injections is above maxRepetition\n     */\n    // params.injected.maxRepetition = 3;\n    var effectiveWindowHeight = 0;\n    var theoricContentHeight = contentHeight + 300 * (contentHeight / windowHeight);\n    var theoricRepetition = theoricContentHeight / windowHeight;\n    if (maxRepetition !== 0 && theoricRepetition > maxRepetition) {\n        effectiveWindowHeight = getEffectiveWindowHeight(contentHeight, maxRepetition);\n    }\n    else {\n        effectiveWindowHeight = windowHeight * densityIndex;\n    }\n    /**\n     * Insertion algorithm\n     * We test wether the selectedDiv is eligible\n     */\n    var j = 0;\n    var isEligible = function (i) { return i < selectedDivs.length\n        && (maxRepetition === 0 || j < maxRepetition); };\n    for (var i = 0; isEligible(i); i += 1) {\n        var selectedDiv = selectedDivs[i];\n        var bottomDistanceToPageTop = selectedDiv.getBoundingClientRect().bottom + window.scrollY;\n        // eslint-disable-next-line max-len\n        var test = bottomDistanceToPageTop > effectiveWindowHeight + distanceToPreviousInsertionBottom;\n        if (test) {\n            j += 1;\n            var divId = \"\".concat(divIdPrefix, \"-\").concat(j);\n            var newDiv = document.createElement('div');\n            newDiv.id = divId;\n            newDiv.dataset.adsCore = \"{\\\"type\\\": \\\"\".concat(prismaType, \"\\\"}\");\n            newDiv.classList.add(injectionClassName);\n            newDiv.classList.add('ads-core-placer');\n            selectedDiv.insertAdjacentHTML('afterend', newDiv.outerHTML);\n            var createdDiv = document.getElementById(divId);\n            // eslint-disable-next-line max-len\n            distanceToPreviousInsertionBottom = createdDiv.getBoundingClientRect().bottom + window.pageYOffset;\n        }\n    }\n    if (contentHeight > 0)\n        _logger__WEBPACK_IMPORTED_MODULE_0__[\"default\"].log(\"Estimated ad coverage: \".concat(((j + 1) * 350) / contentHeight, \" %\"));\n};\nvar createDynamicSlots = function (payload) {\n    var action = function () { return createDynamicSlotsFromPayload(sanitizePayload(payload)); };\n    if (document.readyState === 'loading') {\n        // Loading hasn't finished yet\n        document.addEventListener('DOMContentLoaded', action);\n    }\n    else {\n        // `DOMContentLoaded` has already fired\n        action();\n    }\n};\n\n\n//# sourceURL=webpack://galaxiemedialibraryv2/./src/injection/dynamic.ts?");

/***/ }),

/***/ "./src/injection/injected.ts":
/*!***********************************!*\
  !*** ./src/injection/injected.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createInjectedSlots: () => (/* binding */ createInjectedSlots),\n/* harmony export */   createInjectedSlotsFromPayload: () => (/* binding */ createInjectedSlotsFromPayload),\n/* harmony export */   sanitizePayload: () => (/* binding */ sanitizePayload)\n/* harmony export */ });\n/* harmony import */ var _injectionTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./injectionTools */ \"./src/injection/injectionTools.ts\");\n/* harmony import */ var _types_insertAdjacentHTMLPosition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/insertAdjacentHTMLPosition */ \"./src/types/insertAdjacentHTMLPosition.ts\");\n/* harmony import */ var _types_prismaSlotType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/prismaSlotType */ \"./src/types/prismaSlotType.ts\");\n// const logger = require('../utils/logger');\n\n\n\nvar sanitizePayload = function (payload) {\n    if (typeof payload !== 'object')\n        throw new Error('Payload must be an object');\n    var _a = payload, selector = _a.selector, position = _a.position, maxRepetition = _a.maxRepetition, divIdPrefix = _a.divIdPrefix, prismaType = _a.prismaType, style = _a.style, beforeStyle = _a.beforeStyle;\n    if (typeof selector !== 'string')\n        throw new Error('Selector must be a string');\n    if (typeof position !== 'string' && !_types_insertAdjacentHTMLPosition__WEBPACK_IMPORTED_MODULE_1__.insertAdjacentHTMLPosition.includes(position))\n        throw new Error(\"Position must be one of \".concat(_types_insertAdjacentHTMLPosition__WEBPACK_IMPORTED_MODULE_1__.insertAdjacentHTMLPosition.join(', ')));\n    if (typeof prismaType !== 'string' && !_types_prismaSlotType__WEBPACK_IMPORTED_MODULE_2__.prismaSlotType.includes(prismaType))\n        throw new Error(\"Prisma type must be one of \".concat(_types_prismaSlotType__WEBPACK_IMPORTED_MODULE_2__.prismaSlotType.join(', ')));\n    if (typeof maxRepetition !== 'number')\n        throw new Error('Max repetition must be a number');\n    if (typeof divIdPrefix !== 'string')\n        throw new Error('Div id prefix must be a string');\n    // if (typeof type !== 'string') throw new Error('Type must be a string');\n    if (style && typeof style !== 'string')\n        throw new Error('Style must be a string');\n    if (beforeStyle && typeof beforeStyle !== 'string')\n        throw new Error('Before style must be a string');\n    return {\n        selector: selector,\n        position: position,\n        maxRepetition: maxRepetition,\n        divIdPrefix: divIdPrefix,\n        prismaType: prismaType,\n        style: style,\n        beforeStyle: beforeStyle,\n    };\n};\nvar createInjectedSlotsFromPayload = function (_a) {\n    var selector = _a.selector, position = _a.position, maxRepetition = _a.maxRepetition, divIdPrefix = _a.divIdPrefix, prismaType = _a.prismaType, style = _a.style, beforeStyle = _a.beforeStyle;\n    var target = document.querySelectorAll(selector);\n    if (target.length === 0)\n        throw new Error(\"We cannot match any div with selector '\".concat(selector, \"'\"));\n    var injectionClassName = \"\".concat(divIdPrefix, \"_injection_class\");\n    (0,_injectionTools__WEBPACK_IMPORTED_MODULE_0__.createInjectionStyle)({\n        injectionClassName: injectionClassName,\n        style: style,\n        beforeStyle: beforeStyle,\n    });\n    // We set max injection\n    var maxInjection = target.length;\n    if (maxRepetition > 0) {\n        maxInjection = Math.min(maxRepetition, target.length);\n    }\n    for (var i = 1; i <= maxInjection; i += 1) {\n        var divId = \"\".concat(divIdPrefix, \"-\").concat(i);\n        var newDiv = document.createElement('div');\n        newDiv.classList.add(injectionClassName);\n        newDiv.dataset.adsCore = prismaType;\n        newDiv.id = divId;\n        target[i - 1].insertAdjacentHTML(position, newDiv.outerHTML);\n    }\n};\nvar createInjectedSlots = function (payload) {\n    var action = function () { return createInjectedSlotsFromPayload(sanitizePayload(payload)); };\n    if (document.readyState === 'loading') {\n        // Loading hasn't finished yet\n        document.addEventListener('DOMContentLoaded', action);\n    }\n    else {\n        // `DOMContentLoaded` has already fired\n        action();\n    }\n};\n\n\n//# sourceURL=webpack://galaxiemedialibraryv2/./src/injection/injected.ts?");

/***/ }),

/***/ "./src/injection/injectionTools.ts":
/*!*****************************************!*\
  !*** ./src/injection/injectionTools.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createInjectionStyle: () => (/* binding */ createInjectionStyle),\n/* harmony export */   sanitizeStyle: () => (/* binding */ sanitizeStyle)\n/* harmony export */ });\n// const setInjectionParams = (nexx360Slot:SetInjectionParamsPayload): => {\n//   const params = {\n//     adUnitId: nexx360Slot.adUnitId,\n//     sizes: nexx360Slot.sizes,\n//     divId: nexx360Slot.divId,\n//     injected: {},\n//   };\n//   if (nexx360Slot.targeting !== undefined) params.targeting = nexx360Slot.targeting;\n//   if (!nexx360Slot.injected.selector) throw new Error('Selector must be set');\n//   params.injected.selector = nexx360Slot.injected.selector;\n//   params.style = nexx360Slot.style || '';\n//   params.beforeStyle = nexx360Slot.beforeStyle || '';\n//   params.injected.label = nexx360Slot.injected.label || params.divId;\n//   params.injected.incrementalTargeting = nexx360Slot.injected.incrementalTargeting || [];\n//   params.injected.incrementalAdUnitId = nexx360Slot.injected.incrementalAdUnitId || false;\n//   params.injected.mainContentSelector = nexx360Slot.injected.mainContentSelector || false;\n//   // Max Repetition Part\n//   params.injected.maxRepetition = nexx360Slot.injected.maxRepetition || 0;\n//   if (Number.isInteger(params.injected.maxRepetition) === false)\n// throw new Error('Max repetition must be an integer');\n//   if (nexx360Slot.type === 'injected') {\n//     // Position Part\n//     params.injected.position = nexx360Slot.injected.position || 'beforebegin';\n//     const testPosition = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'].\n// includes(params.injected.position);\n//     if (!testPosition) throw new Error(\n// 'Position must be in beforebegin, afterbegin, beforeend, afterend');\n//   }\n//   if (nexx360Slot.type === 'dynamic') {\n//     params.injected.firstOffsetSelector = nexx360Slot.injected.firstOffsetSelector || '';\n//     params.injected.densityIndex = nexx360Slot.injected.densityIndex || 0.8;\n//   }\n//   return params;\n// };\nvar sanitizeStyle = function (style) {\n    var output = '';\n    var styleArray = style.split(';');\n    if (styleArray.length === 0)\n        return output;\n    styleArray.forEach(function (styleElement) {\n        var foo = styleElement.split(':');\n        if (foo.length !== 2)\n            return;\n        if (foo[0].trim() === 'content')\n            foo[1] = \"\\\"\".concat(foo[1].trim(), \"\\\"\");\n        output += \"\".concat(foo[0].trim(), \":\").concat(foo[1].trim(), \";\");\n    });\n    return output;\n};\nvar createInjectionStyle = function (_a) {\n    var injectionClassName = _a.injectionClassName, style = _a.style, beforeStyle = _a.beforeStyle;\n    // We define styles bases on class\n    var styleElement = document.createElement('style');\n    styleElement.textContent = \".\".concat(injectionClassName, \" { \").concat(style, \" } \");\n    styleElement.textContent += \".\".concat(injectionClassName, \"::before { \").concat(sanitizeStyle(beforeStyle), \" } \");\n    document.head.appendChild(styleElement);\n};\n\n\n//# sourceURL=webpack://galaxiemedialibraryv2/./src/injection/injectionTools.ts?");

/***/ }),

/***/ "./src/logger.ts":
/*!***********************!*\
  !*** ./src/logger.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   log: () => (/* binding */ log)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar log = function () {\n    var message = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        message[_i] = arguments[_i];\n    }\n    return __awaiter(void 0, void 0, void 0, function () {\n        return __generator(this, function (_a) {\n            // eslint-disable-next-line no-console\n            console.log.apply(console, __spreadArray([new Date().toISOString(),\n                ' - '], message, false));\n            return [2 /*return*/];\n        });\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ log: log });\n\n\n//# sourceURL=webpack://galaxiemedialibraryv2/./src/logger.ts?");

/***/ }),

/***/ "./src/types/insertAdjacentHTMLPosition.ts":
/*!*************************************************!*\
  !*** ./src/types/insertAdjacentHTMLPosition.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   insertAdjacentHTMLPosition: () => (/* binding */ insertAdjacentHTMLPosition)\n/* harmony export */ });\nvar insertAdjacentHTMLPosition = [\n    'beforebegin',\n    'afterbegin',\n    'beforeend',\n    'afterend',\n];\n\n\n//# sourceURL=webpack://galaxiemedialibraryv2/./src/types/insertAdjacentHTMLPosition.ts?");

/***/ }),

/***/ "./src/types/prismaSlotType.ts":
/*!*************************************!*\
  !*** ./src/types/prismaSlotType.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prismaSlotType: () => (/* binding */ prismaSlotType)\n/* harmony export */ });\nvar prismaSlotType = [\n    'Banniere-Basse',\n    'Banniere-Haute',\n    'Habillage',\n    'Native',\n    'Out-Of-Banner',\n    'Pave-Bas',\n    'Pave-Bas2',\n    'Pave-Haut',\n    'Pave-Haut2',\n    'Pave-Haut2-Desktop',\n    'Postitiel',\n];\n\n\n//# sourceURL=webpack://galaxiemedialibraryv2/./src/types/prismaSlotType.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;