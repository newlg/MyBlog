;;;
(function (global, factory) {
if (typeof exports === 'object' && typeof module === 'object')
module.exports = factory()
else if (typeof define === 'function' && define.amd)
define([], factory)
else if (typeof exports === 'object')
exports.avalon = factory()
else
global.avalon = factory()
} (this, function () {
function avalon(el) {
return new avalon.init(el)
}
avalon.init = function (el) {
this[0] = this.element = el
}
avalon.fn = avalon.prototype = avalon.init.prototype
avalon.shadowCopy = function (destination, source) {
for (var property in source) {
destination[property] = source[property]
}
return destination
}
var cssHooks = {}
var rhyphen = /([a-z\d])([A-Z]+)/g
var rcamelize = /[-_][^-_]/g
var rhashcode = /\d\.\d{4}/
var rescape = /[-.*+?^${}()|[\]\/\\]/g
var _slice = [].slice
function defaultParse(cur, pre, binding) {
cur[binding.name] = avalon.parseExpr(binding)
}
var rword = /[^, ]+/g
var hasConsole = typeof console === 'object'
avalon.shadowCopy(avalon, {
noop: function () {
},
version: "2.1.16.1",
rword: rword,
inspect: ({}).toString,
ohasOwn: ({}).hasOwnProperty,
caches: {},
vmodels: {},
filters: {},
components: {},
directives: {},
eventHooks: {},
eventListeners: {},
validators: {},
scopes: {},
effects: {},
cssHooks: cssHooks,
parsers: {
number: function (a) {
return a === '' ? '' : parseFloat(a) || 0
},
string: function (a) {
return a === null || a === void 0 ? '' : a + ''
},
boolean: function (a) {
if (a === '')
return a
return a === 'true' || a === '1'
}
},
log: function () {
if (hasConsole && avalon.config.debug) {
Function.apply.call(console.log, console, arguments)
}
},
warn: function () {
if (hasConsole && avalon.config.debug) {
var method = console.warn || console.log
Function.apply.call(method, console, arguments)
}
},
error: function (str, e) {
throw (e || Error)(str)
},
oneObject: function (array, val) {
if (typeof array === 'string') {
array = array.match(rword) || []
}
var result = {},
value = val !== void 0 ? val : 1
for (var i = 0, n = array.length; i < n; i++) {
result[array[i]] = value
}
return result
},
isObject: function (a) {
return a !== null && typeof a === 'object'
},
range: function (start, end, step) {
step || (step = 1)
if (end == null) {
end = start || 0
start = 0
}
var index = - 1,
length = Math.max(0, Math.ceil((end - start) / step)),
result = new Array(length)
while (++index < length) {
result[index] = start
start += step
}
return result
},
hyphen: function (target) {
return target.replace(rhyphen, '$1-$2').toLowerCase()
},
camelize: function (target) {
if (!target || target.indexOf('-') < 0 && target.indexOf('_') < 0) {
return target
}
return target.replace(rcamelize, function (match) {
return match.charAt(1).toUpperCase()
})
},
slice: function (nodes, start, end) {
return _slice.call(nodes, start, end)
},
css: function (node, name, value, fn) {
if (node instanceof avalon) {
node = node[0]
}
if (node.nodeType !== 1) {
return
}
var prop = avalon.camelize(name)
name = avalon.cssName(prop) ||  prop
if (value === void 0 || typeof value === 'boolean') {
fn = cssHooks[prop + ':get'] || cssHooks['@:get']
if (name === 'background') {
name = 'backgroundColor'
}
var val = fn(node, name)
return value === true ? parseFloat(val) || 0 : val
} else if (value === '') {
node.style[name] = ''
} else {
if (value == null || value !== value) {
return
}
if (isFinite(value) && !avalon.cssNumber[prop]) {
value += 'px'
}
fn = cssHooks[prop + ':set'] || cssHooks['@:set']
fn(node, name, value)
}
},
directive: function (name, definition) {
definition.parse = definition.parse ||  defaultParse
return this.directives[name] = definition
},
makeHashCode: function (prefix) {
prefix = prefix || 'avalon'
return String(Math.random() + Math.random()).replace(rhashcode, prefix)
},
escapeRegExp: function (target) {
return (target + '').replace(rescape, '\\$&')
},
Array: {
merge: function (target, other) {
target.push.apply(target, other)
},
ensure: function (target, item) {
if (target.indexOf(item) === - 1) {
return target.push(item)
}
},
removeAt: function (target, index) {
return !!target.splice(index, 1).length
},
remove: function (target, item) {
var index = target.indexOf(item)
if (~index)
return avalon.Array.removeAt(target, index)
return false
}
}
})
var ohasOwn = Object.prototype.hasOwnProperty
function isNative(fn) {
return /\[native code\]/.test(fn)
}
if (!isNative('司徒正美'.trim)) {
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
String.prototype.trim = function () {
return this.replace(rtrim, '')
}
}
var hasDontEnumBug = !({
'toString': null
}).propertyIsEnumerable('toString');
var hasProtoEnumBug = (function () {
}).propertyIsEnumerable('prototype')
var dontEnums = [
'toString',
'toLocaleString',
'valueOf',
'hasOwnProperty',
'isPrototypeOf',
'propertyIsEnumerable',
'constructor'
]
var dontEnumsLength = dontEnums.length
if (!isNative(Object.keys)) {
Object.keys = function (object) {
var theKeys = []
var skipProto = hasProtoEnumBug && typeof object === 'function'
if (typeof object === 'string' || (object && object.callee)) {
for (var i = 0; i < object.length; ++i) {
theKeys.push(String(i))
}
} else {
for (var name in object) {
if (!(skipProto && name === 'prototype') &&
ohasOwn.call(object, name)) {
theKeys.push(String(name))
}
}
}
if (hasDontEnumBug) {
var ctor = object.constructor,
skipConstructor = ctor && ctor.prototype === object
for (var j = 0; j < dontEnumsLength; j++) {
var dontEnum = dontEnums[j]
if (!(skipConstructor && dontEnum === 'constructor') && ohasOwn.call(object, dontEnum)) {
theKeys.push(dontEnum)
}
}
}
return theKeys
}
}
if (!isNative(Array.isArray)) {
Array.isArray = function (a) {
return Object.prototype.toString.call(a) === '[object Array]'
}
}
if (!isNative(isNative.bind)) {
Function.prototype.bind = function (scope) {
if (arguments.length < 2 && scope === void 0)
return this
var fn = this,
argv = arguments
return function () {
var args = [],
i
for (i = 1; i < argv.length; i++)
args.push(argv[i])
for (i = 0; i < arguments.length; i++)
args.push(arguments[i])
return fn.apply(scope, args)
}
}
}
var ap = Array.prototype
var _slice$1 = ap.slice
try {
_slice$1.call(document.documentElement)
} catch (e) {
ap.slice = function (begin, end) {
end = (typeof end !== 'undefined') ? end : this.length
if (Array.isArray(this)) {
return _slice$1.call(this, begin, end)
}
var i, cloned = [],
size, len = this.length
var start = begin || 0
start = (start >= 0) ? start : len + start
var upTo = (end) ? end : len
if (end < 0) {
upTo = len + end
}
size = upTo - start
if (size > 0) {
cloned = new Array(size)
if (this.charAt) {
for (i = 0; i < size; i++) {
cloned[i] = this.charAt(start + i)
}
} else {
for (i = 0; i < size; i++) {
cloned[i] = this[start + i]
}
}
}
return cloned
}
}
function iterator(vars, body, ret) {
var fun = 'for(var ' + vars + 'i=0,n = this.length; i < n; i++){' +
body.replace('_', '((i in this) && fn.call(scope,this[i],i,this))') +
'}' + ret
return Function('fn,scope', fun)
}
if (!isNative(ap.map)) {
var shim = {
indexOf: function (item, index) {
var n = this.length,
i = ~~index
if (i < 0)
i += n
for (; i < n; i++)
if (this[i] === item)
return i
return -1
},
lastIndexOf: function (item, index) {
var n = this.length,
i = index == null ? n - 1 : index
if (i < 0)
i = Math.max(0, n + i)
for (; i >= 0; i--)
if (this[i] === item)
return i
return -1
},
forEach: iterator('', '_', ''),
filter: iterator('r=[],j=0,', 'if(_)r[j++]=this[i]', 'return r'),
map: iterator('r=[],', 'r[i]=_', 'return r'),
some: iterator('', 'if(_)return true', 'return false'),
every: iterator('', 'if(!_)return false', 'return true')
}
for (var i in shim) {
ap[i] = shim[i]
}
}
var window = Function(' return this')() || this
var browser = {
window: window,
document: {
createElement: Object,
createElementNS: Object,
contains: Boolean
},
root: {
outerHTML: 'x'
},
msie: NaN,
browser: false,
modern: true,
avalonDiv: {},
avalonFragment: null
}
window.avalon = avalon
if (window.location && window.navigator && window.window) {
var doc = window.document
browser.inBrowser = true
browser.document = doc
browser.root = doc.documentElement
browser.avalonDiv = doc.createElement('div')
browser.avalonFragment = doc.createDocumentFragment()
if (window.VBArray) {
browser.msie = doc.documentMode || (window.XMLHttpRequest ? 7 : 6)
browser.modern = browser.msie > 8
} else {
browser.modern = true
}
}
avalon.shadowCopy(avalon, browser)
avalon.quote = typeof JSON !== 'undefined' ? JSON.stringify : new function () {
var Escapes = {
92: "\\\\",
34: '\\"',
8: "\\b",
12: "\\f",
10: "\\n",
13: "\\r",
9: "\\t"
}
var leadingZeroes = '000000'
var toPaddedString = function (width, value) {
return (leadingZeroes + (value || 0)).slice(-width)
};
var unicodePrefix = '\\u00'
var escapeChar = function (character) {
var charCode = character.charCodeAt(0), escaped = Escapes[charCode]
if (escaped) {
return escaped
}
return unicodePrefix + toPaddedString(2, charCode.toString(16))
};
var reEscape = /[\x00-\x1f\x22\x5c]/g
return function (value) {
reEscape.lastIndex = 0
return '"' + (reEscape.test(value) ? String(value).replace(reEscape, escapeChar) : value) + '"'
}
}
var tos = avalon.inspect
var class2type = {}
'Boolean Number String Function Array Date RegExp Object Error'.replace(avalon.rword, function (name) {
class2type['[object ' + name + ']'] = name.toLowerCase()
})
avalon.type = function (obj) {
if (obj == null) {
return String(obj)
}
return typeof obj === 'object' || typeof obj === 'function' ?
class2type[tos.call(obj)] || 'object' :
typeof obj
}
var rfunction = /^\s*\bfunction\b/
avalon.isFunction = typeof alert === 'object' ? function (fn) {
try {
return rfunction.test(fn + '')
} catch (e) {
return false
}
} : function (fn) {
return tos.call(fn) === '[object Function]'
}
function isWindowCompact(obj) {
if (!obj)
return false
return obj == obj.document && obj.document != obj
}
var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/
function isWindowModern(obj) {
return rwindow.test(tos.call(obj))
}
avalon.isWindow = isWindowModern(avalon.window) ?
isWindowModern : isWindowCompact
var enu;
var enumerateBUG;
for (enu in avalon({})) {
break
}
var ohasOwn = avalon.ohasOwn
enumerateBUG = enu !== '0'
function isPlainObjectCompact(obj, key) {
if (!obj || avalon.type(obj) !== 'object' || obj.nodeType || avalon.isWindow(obj)) {
return false
}
try {
if (obj.constructor &&
!ohasOwn.call(obj, 'constructor') &&
!ohasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
return false
}
} catch (e) {
return false
}
if (enumerateBUG) {
for (key in obj) {
return ohasOwn.call(obj, key)
}
}
for (key in obj) {
}
return key === void 0 || ohasOwn.call(obj, key)
}
function isPlainObjectModern(obj) {
return tos.call(obj) === '[object Object]' &&
Object.getPrototypeOf(obj) === Object.prototype
}
avalon.isPlainObject = /\[native code\]/.test(Object.getPrototypeOf) ?
isPlainObjectModern : isPlainObjectCompact
avalon.mix = avalon.fn.mix = function () {
var options, name, src, copy, copyIsArray, clone,
target = arguments[0] || {},
i = 1,
length = arguments.length,
deep = false
if (typeof target === 'boolean') {
deep = target
target = arguments[1] || {}
i++
}
if (typeof target !== 'object' && !avalon.isFunction(target)) {
target = {}
}
if (i === length) {
target = this
i--
}
for (; i < length; i++) {
if ((options = arguments[i]) != null) {
for (name in options) {
try {
src = target[name]
copy = options[name]
} catch (e) {
continue
}
if (target === copy) {
continue
}
if (deep && copy && (avalon.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
if (copyIsArray) {
copyIsArray = false
clone = src && Array.isArray(src) ? src : []
} else {
clone = src && avalon.isPlainObject(src) ? src : {}
}
target[name] = avalon.mix(deep, clone, copy)
} else if (copy !== void 0) {
target[name] = copy
}
}
}
}
return target
}
var rarraylike = /(Array|List|Collection|Map|Arguments)\]$/
function isArrayLike(obj) {
if (!obj)
return false
var n = obj.length
if (n === (n >>> 0)) {
var type = tos.call(obj).slice(8, -1)
if (rarraylike.test(type))
return false
if (type === 'Array')
return true
try {
if ({}.propertyIsEnumerable.call(obj, 'length') === false) {
return rfunction.test(obj.item || obj.callee)
}
return true
} catch (e) {
return !obj.window
}
}
return false
}
avalon.each = function (obj, fn) {
if (obj) {
var i = 0
if (isArrayLike(obj)) {
for (var n = obj.length; i < n; i++) {
if (fn(i, obj[i]) === false)
break
}
} else {
for (i in obj) {
if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
break
}
}
}
}
}
new function welcome() {
var welcomeIntro = ["%cavalon.js %c" + avalon.version + " %cin debug mode, %cmore...", "color: rgb(114, 157, 52); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;"];
var welcomeMessage = "You're running avalon in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\n" +
'To disable debug mode, add this line at the start of your app:\n\n  avalon.config({debug: false});\n\n' +
'Debug mode also automatically shut down amicably when your app is minified.\n\n' +
"Get help and support:\n  https://segmentfault.com/t/avalon\n  http://avalonjs.coding.me/\n  http://www.baidu-x.com/?q=avalonjs\n  http://www.avalon.org.cn/\n\nFound a bug? Raise an issue:\n  https://github.com/RubyLouvre/avalon/issues\n\n";
if (typeof console === 'object') {
var con = console
var method = con.groupCollapsed || con.log
Function.apply.call(method, con, welcomeIntro)
con.log(welcomeMessage)
if (method !== console.log) {
con.groupEnd(welcomeIntro);
}
}
}
function Cache(maxLength) {
this.size = 0
this.limit = maxLength
this.head = this.tail = void 0
this._keymap = {}
}
var p = Cache.prototype
p.put = function (key, value) {
var entry = {
key: key,
value: value
}
this._keymap[key] = entry
if (this.tail) {
this.tail.newer = entry
entry.older = this.tail
} else {
this.head = entry
}
this.tail = entry
if (this.size === this.limit) {
this.shift()
} else {
this.size++
}
return value
}
p.shift = function () {
var entry = this.head
if (entry) {
this.head = this.head.newer
this.head.older =
entry.newer =
entry.older =
this._keymap[entry.key] =
void 0
delete this._keymap[entry.key]
this.size--
}
}
p.get = function (key) {
var entry = this._keymap[key]
if (entry === void 0)
return
if (entry === this.tail) {
return entry.value
}
if (entry.newer) {
if (entry === this.head) {
this.head = entry.newer
}
entry.newer.older = entry.older
}
if (entry.older) {
entry.older.newer = entry.newer
}
entry.newer = void 0
entry.older = this.tail
if (this.tail) {
this.tail.newer = entry
}
this.tail = entry
return entry.value
}
var rentities = /&[a-z0-9#]{2,10};/
var temp = avalon.avalonDiv
avalon.shadowCopy(avalon, {
evaluatorPool: new Cache(888),
_decode: function (str) {
if (rentities.test(str)) {
temp.innerHTML = str
return temp.innerText || temp.textContent
}
return str
}
})
var directives = avalon.directives
function markID(fn) {
return fn.uuid || (fn.uuid = avalon.makeHashCode('e'))
}
var UUID = 1
function markID$1(fn) {
return fn.uuid || (fn.uuid = '_' + (++UUID))
}
var quote = avalon.quote
var win = avalon.window
var doc$1 = avalon.document
var root$1 = avalon.root
var W3C = avalon.modern
var eventHooks = avalon.eventHooks
function config(settings) {
for (var p in settings) {
if (!avalon.ohasOwn.call(settings, p))
continue
var val = settings[p]
if (typeof config.plugins[p] === 'function') {
config.plugins[p](val)
} else {
config[p] = val
}
}
return this
}
avalon.config = config
var plugins = {
interpolate: function (array) {
var openTag = array[0]
var closeTag = array[1]
if (openTag === closeTag) {
throw new SyntaxError('openTag!==closeTag')
}
var test = openTag + 'test' + closeTag
var div = avalon.avalonDiv
div.innerHTML = test
if (div.innerHTML !== test && div.innerHTML.indexOf('&lt;') > -1) {
throw new SyntaxError('此定界符不合法')
}
div.innerHTML = ''
config.openTag = openTag
config.closeTag = closeTag
var o = avalon.escapeRegExp(openTag)
var c = avalon.escapeRegExp(closeTag)
config.rexpr = new RegExp(o + '([\\s\\S]*)' + c)
}
}
config.plugins = plugins
avalon.config({
interpolate: ['{{', '}}'],
debug: true
})
function numberFilter(number, decimals, point, thousands) {
number = (number + '')
.replace(/[^0-9+\-Ee.]/g, '')
var n = !isFinite(+number) ? 0 : +number,
prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
sep = thousands || ",",
dec = point || ".",
s = '',
toFixedFix = function (n, prec) {
var k = Math.pow(10, prec)
return '' + (Math.round(n * k) / k)
.toFixed(prec)
}
s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
.split('.')
if (s[0].length > 3) {
s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
}
if ((s[1] || '')
.length < prec) {
s[1] = s[1] || ''
s[1] += new Array(prec - s[1].length + 1)
.join('0')
}
return s.join(dec)
}
var rscripts = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim
var ron = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g
var ropen = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/ig
var rsanitize = {
a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/ig,
img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/ig,
form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/ig
}
function sanitizeFilter(str) {
return str.replace(rscripts, "").replace(ropen, function (a, b) {
var match = a.toLowerCase().match(/<(\w+)\s/)
if (match) {
var reg = rsanitize[match[1]]
if (reg) {
a = a.replace(reg, function (s, name, value) {
var quote = value.charAt(0)
return name + "=" + quote + "javascript:void(0)" + quote
})
}
}
return a.replace(ron, " ").replace(/\s+/g, " ")
})
}
function toInt(str) {
return parseInt(str, 10) || 0
}
function padNumber(num, digits, trim) {
var neg = ''
if (num < 0) {
neg = '-'
num = -num
}
num = '' + num
while (num.length < digits)
num = '0' + num
if (trim)
num = num.substr(num.length - digits)
return neg + num
}
function dateGetter(name, size, offset, trim) {
return function (date) {
var value = date["get" + name]()
if (offset > 0 || value > -offset)
value += offset
if (value === 0 && offset === -12) {
value = 12
}
return padNumber(value, size, trim)
}
}
function dateStrGetter(name, shortForm) {
return function (date, formats) {
var value = date["get" + name]()
var get = (shortForm ? ("SHORT" + name) : name).toUpperCase()
return formats[get][value]
}
}
function timeZoneGetter(date) {
var zone = -1 * date.getTimezoneOffset()
var paddedZone = (zone >= 0) ? "+" : ""
paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2)
return paddedZone
}
function ampmGetter(date, formats) {
return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
}
var DATE_FORMATS = {
yyyy: dateGetter("FullYear", 4),
yy: dateGetter("FullYear", 2, 0, true),
y: dateGetter("FullYear", 1),
MMMM: dateStrGetter("Month"),
MMM: dateStrGetter("Month", true),
MM: dateGetter("Month", 2, 1),
M: dateGetter("Month", 1, 1),
dd: dateGetter("Date", 2),
d: dateGetter("Date", 1),
HH: dateGetter("Hours", 2),
H: dateGetter("Hours", 1),
hh: dateGetter("Hours", 2, -12),
h: dateGetter("Hours", 1, -12),
mm: dateGetter("Minutes", 2),
m: dateGetter("Minutes", 1),
ss: dateGetter("Seconds", 2),
s: dateGetter("Seconds", 1),
sss: dateGetter("Milliseconds", 3),
EEEE: dateStrGetter("Day"),
EEE: dateStrGetter("Day", true),
a: ampmGetter,
Z: timeZoneGetter
}
var rdateFormat = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/
var raspnetjson = /^\/Date\((\d+)\)\/$/
function dateFilter(date, format) {
var locate = dateFilter.locate,
text = "",
parts = [],
fn, match
format = format || "mediumDate"
format = locate[format] || format
if (typeof date === "string") {
if (/^\d+$/.test(date)) {
date = toInt(date)
} else if (raspnetjson.test(date)) {
date = +RegExp.$1
} else {
var trimDate = date.trim()
var dateArray = [0, 0, 0, 0, 0, 0, 0]
var oDate = new Date(0)
trimDate = trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/, function (_, a, b, c) {
var array = c.length === 4 ? [c, a, b] : [a, b, c]
dateArray[0] = toInt(array[0])
dateArray[1] = toInt(array[1]) - 1
dateArray[2] = toInt(array[2])
return ""
})
var dateSetter = oDate.setFullYear
var timeSetter = oDate.setHours
trimDate = trimDate.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function (_, a, b, c, d) {
dateArray[3] = toInt(a)
dateArray[4] = toInt(b)
dateArray[5] = toInt(c)
if (d) {
dateArray[6] = Math.round(parseFloat("0." + d) * 1000)
}
return ""
})
var tzHour = 0
var tzMin = 0
trimDate = trimDate.replace(/Z|([+-])(\d\d):?(\d\d)/, function (z, symbol, c, d) {
dateSetter = oDate.setUTCFullYear
timeSetter = oDate.setUTCHours
if (symbol) {
tzHour = toInt(symbol + c)
tzMin = toInt(symbol + d)
}
return ''
})
dateArray[3] -= tzHour
dateArray[4] -= tzMin
dateSetter.apply(oDate, dateArray.slice(0, 3))
timeSetter.apply(oDate, dateArray.slice(3))
date = oDate
}
}
if (typeof date === 'number') {
date = new Date(date)
}
while (format) {
match = rdateFormat.exec(format)
if (match) {
parts = parts.concat(match.slice(1))
format = parts.pop()
} else {
parts.push(format)
format = null
}
}
parts.forEach(function (value) {
fn = DATE_FORMATS[value]
text += fn ? fn(date, locate) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
})
return text
}
var locate = {
AMPMS: {
0: '上午',
1: '下午'
},
DAY: {
0: '星期日',
1: '星期一',
2: '星期二',
3: '星期三',
4: '星期四',
5: '星期五',
6: '星期六'
},
MONTH: {
0: '1月',
1: '2月',
2: '3月',
3: '4月',
4: '5月',
5: '6月',
6: '7月',
7: '8月',
8: '9月',
9: '10月',
10: '11月',
11: '12月'
},
SHORTDAY: {
'0': '周日',
'1': '周一',
'2': '周二',
'3': '周三',
'4': '周四',
'5': '周五',
'6': '周六'
},
fullDate: 'y年M月d日EEEE',
longDate: 'y年M月d日',
medium: 'yyyy-M-d H:mm:ss',
mediumDate: 'yyyy-M-d',
mediumTime: 'H:mm:ss',
'short': 'yy-M-d ah:mm',
shortDate: 'yy-M-d',
shortTime: 'ah:mm'
}
locate.SHORTMONTH = locate.MONTH
dateFilter.locate = locate
function orderBy(array, criteria, reverse) {
var type = avalon.type(array)
if (type !== 'array' && type !== 'object')
throw 'orderBy只能处理对象或数组'
var order = (reverse && reverse < 0) ? -1 : 1
if (typeof criteria === 'string') {
var key = criteria
criteria = function (a) {
return a && a[key]
}
}
array = convertArray(array)
array.forEach(function (el) {
el.order = criteria(el.value, el.key)
})
array.sort(function (left, right) {
var a = left.order
var b = right.order
if (Number.isNaN(a) && Number.isNaN(b)) {
return 0
}
return a === b ? 0 : a > b ? order : -order
})
var isArray = type === 'array'
var target = isArray ? [] : {}
return recovery(target, array, function (el) {
if (isArray) {
target.push(el.value)
} else {
target[el.key] = el.value
}
})
}
function filterBy(array, search) {
var type = avalon.type(array)
if (type !== 'array' && type !== 'object')
throw 'filterBy只能处理对象或数组'
var args = avalon.slice(arguments, 2)
var stype = avalon.type(search)
if (stype === 'function') {
var criteria = search
} else if (stype === 'string' || stype === 'number') {
if (search === '') {
return array
} else {
var reg = new RegExp(avalon.escapeRegExp(search), 'i')
criteria = function (el) {
return reg.test(el)
}
}
} else {
return array
}
array = convertArray(array).filter(function (el, i) {
return !!criteria.apply(el, [el.value, i].concat(args))
})
var isArray = type === 'array'
var target = isArray ? [] : {}
return recovery(target, array, function (el) {
if (isArray) {
target.push(el.value)
} else {
target[el.key] = el.value
}
})
}
function selectBy(data, array, defaults) {
if (avalon.isObject(data) && !Array.isArray(data)) {
var target = []
return recovery(target, array, function (name) {
target.push(data.hasOwnProperty(name) ? data[name] : defaults ? defaults[name] : '')
})
} else {
return data
}
}
Number.isNaN = Number.isNaN ||  function (a) {
return a !== a
}
function limitBy(input, limit, begin) {
var type = avalon.type(input)
if (type !== 'array' && type !== 'object')
throw 'limitBy只能处理对象或数组'
if (typeof limit !== 'number') {
return input
}
if (Number.isNaN(limit)) {
return input
}
if (type === 'object') {
input = convertArray(input)
}
var n = input.length
limit = Math.floor(Math.min(n, limit))
begin = typeof begin === 'number' ? begin : 0
if (begin < 0) {
begin = Math.max(0, n + begin)
}
var data = []
for (var i = begin; i < n; i++) {
if (data.length === limit) {
break
}
data.push(input[i])
}
var isArray = type === 'array'
if (isArray) {
return data
}
var target = {}
return recovery(target, data, function (el) {
target[el.key] = el.value
})
}
function recovery(ret, array, callback) {
for (var i = 0, n = array.length; i < n; i++) {
callback(array[i])
}
return ret
}
function convertArray(array) {
var ret = [], i = 0
avalon.each(array, function (key, value) {
ret[i++] = {
value: value,
key: key
}
})
return ret
}
var arrayFilters = {
orderBy: orderBy,
filterBy: filterBy,
selectBy: selectBy,
limitBy: limitBy
}
var eventFilters = {
stop: function (e) {
e.stopPropagation()
return e
},
prevent: function (e) {
e.preventDefault()
return e
}
}
var keys = {
esc: 27,
tab: 9,
enter: 13,
space: 32,
del: 46,
up: 38,
left: 37,
right: 39,
down: 40
}
for (var name in keys) {
(function (filter, key) {
eventFilters[filter] = function (e) {
if (e.which !== key) {
e.$return = true
}
return e
}
})(name, keys[name])
}
function escapeFilter(str) {
if (str == null)
return ''
return String(str).
replace(/&/g, '&amp;').
replace(/</g, '&lt;').
replace(/>/g, '&gt;').
replace(/"/g, '&quot;').
replace(/'/g, '&#39;')
}
var filters = avalon.filters
function K(a) {
return a
}
avalon.escapeHtml = escapeFilter
avalon.__format__ = function (name) {
var fn = filters[name]
if (fn) {
return fn
}
return K
}
avalon.mix(filters, {
uppercase: function (str) {
return String(str).toUpperCase()
},
lowercase: function (str) {
return String(str).toLowerCase()
},
truncate: function (str, length, end) {
if (!str) {
return ''
}
str = String(str)
if (isNaN(length)) {
length = 30
}
end = typeof end === "string" ? end : "..."
return str.length > length ?
str.slice(0, length - end.length) + end :
str
},
camelize: avalon.camelize,
date: dateFilter,
escape: escapeFilter,
sanitize: sanitizeFilter,
number: numberFilter,
currency: function (amount, symbol, fractionSize) {
return (symbol || '\u00a5') +
numberFilter(amount,
isFinite(fractionSize) ? fractionSize : 2)
}
}, arrayFilters, eventFilters)
function VText(text) {
this.nodeName = '#text'
this.nodeValue = text
this.skipContent = !avalon.config.rexpr.test(text)
}
VText.prototype = {
constructor: VText,
toDOM: function () {
if (this.dom)
return this.dom
var v = avalon._decode(this.nodeValue)
return this.dom = document.createTextNode(v)
},
toHTML: function () {
return this.nodeValue
}
}
function VComment(text) {
this.nodeName = '#comment'
this.nodeValue = text
}
VComment.prototype = {
constructor: VComment,
toDOM: function () {
return this.dom = document.createComment(this.nodeValue)
},
toHTML: function () {
return '<!--' + this.nodeValue + '-->'
}
}
function VElement(type, props, children) {
this.nodeName = type
this.props = props
this.children = children
}
function skipFalseAndFunction(a) {
return a !== false && (Object(a) !== a)
}
var specalAttrs = {
"class": function (dom, val) {
dom.className = val
},
style: function (dom, val) {
dom.style.cssText = val
},
type: function (dom, val) {
try {
dom.type = val
} catch (e) { }
},
'for': function (dom, val) {
dom.htmlFor = val
}
}
VElement.prototype = {
constructor: VElement,
toDOM: function () {
if (this.dom)
return this.dom
var dom, tagName = this.nodeName
if (avalon.modern && svgTags[tagName]) {
dom = createSVG(tagName)
} else if (!avalon.modern && (VMLTags[tagName] || rvml.test(tagName))) {
dom = createVML(tagName)
} else {
dom = document.createElement(tagName)
}
var props = this.props || {}
var wid = (props['ms-important'] ||
props['ms-controller'] || this.wid)
if (wid) {
var scope = avalon.scopes[wid]
var element = scope && scope.vmodel && scope.vmodel.$element
if (element) {
var oldVdom = element.vtree[0]
if (oldVdom.children) {
this.children = oldVdom.children
}
return element
}
}
for (var i in props) {
var val = props[i]
if (skipFalseAndFunction(val)) {
if (specalAttrs[i] && avalon.msie < 8) {
specalAttrs[i](dom, val)
} else {
dom.setAttribute(i, val + '')
}
}
}
var c = this.children || []
var template = c[0] ? c[0].nodeValue : ''
switch (this.nodeName) {
case 'script':
dom.type = 'noexec'
dom.text = template
dom.type = props.type || ''
break
case 'style':
if ('styleSheet' in dom) {
dom.setAttribute('type', 'text/css')
dom.styleSheet.cssText = template
} else {
dom.innerHTML = template
}
break
case 'xmp':
case 'noscript':
dom.textContent = template
break
case 'template':
dom.innerHTML = template
break
default:
if (!this.isVoidTag) {
this.children.forEach(function (c) {
c && dom.appendChild(avalon.vdom(c, 'toDOM'))
})
}
break
}
return this.dom = dom
},
toHTML: function () {
var arr = []
var props = this.props || {}
for (var i in props) {
var val = props[i]
if (skipFalseAndFunction(val)) {
arr.push(i + '=' + avalon.quote(props[i] + ''))
}
}
arr = arr.length ? ' ' + arr.join(' ') : ''
var str = '<' + this.nodeName + arr
if (this.isVoidTag) {
return str + '/>'
}
str += '>'
if (this.children) {
str += this.children.map(function (c) {
return c ? avalon.vdom(c, 'toHTML') : ''
}).join('')
}
return str + '</' + this.nodeName + '>'
}
}
function createSVG(type) {
return document.createElementNS('http://www.w3.org/2000/svg', type)
}
var svgTags = avalon.oneObject('circle,defs,ellipse,image,line,' +
'path,polygon,polyline,rect,symbol,text,use,g,svg')
var rvml = /^\w+\:\w+/
function createVML(type) {
if (document.styleSheets.length < 31) {
document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
} else {
document.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
}
var arr = type.split(':')
if (arr.length === 1) {
arr.unshift('v')
}
var tag = arr[1]
var ns = arr[0]
if (!document.namespaces[ns]) {
document.namespaces.add(ns, "urn:schemas-microsoft-com:vml")
}
return document.createElement('<' + ns + ':' + tag + ' class="rvml">');
}
var VMLTags = avalon.oneObject('shape,line,polyline,rect,roundrect,oval,arc,' +
'curve,background,image,shapetype,group,fill,' +
'stroke,shadow, extrusion, textbox, imagedata, textpath')
function VFragment(a) {
this.nodeName = '#document-fragment'
this.children = a
}
VFragment.prototype = {
constructor: VFragment,
toDOM: function () {
if (this.dom)
return this.dom
var f = document.createDocumentFragment()
for (var i = 0, el; el = this.children[i++];) {
f.appendChild(avalon.vdom(el, 'toDOM'))
}
this.split = f.lastChild
return this.dom = f
},
toHTML: function () {
return this.children.map(function (a) {
return avalon.vdom(a, 'toHTML')
}).join('')
}
}
avalon.vdom = avalon.vdomAdaptor = function (obj, method) {
if (!obj) {
return method === "toHTML" ? '' : document.createDocumentFragment()
}
switch (obj.nodeName) {
case '#text':
return VText.prototype[method].call(obj)
case '#comment':
return VComment.prototype[method].call(obj)
case '#document-fragment':
return VFragment.prototype[method].call(obj)
case void (0):
return (new VFragment(obj))[method]()
default:
return VElement.prototype[method].call(obj)
}
}
var mix = {
VText: VText,
VComment: VComment,
VElement: VElement,
VFragment: VFragment
}
avalon.shadowCopy(avalon.vdom, mix)
avalon.domize = function (a) {
return avalon.vdom(a, 'toDOM')
}
var rcheckedType = /radio|checkbox/
function fix(dest, src) {
if (dest.nodeType !== 1) {
return
}
var nodeName = dest.nodeName.toLowerCase()
if (nodeName === 'object') {
if (dest.parentNode) {
dest.outerHTML = src.outerHTML
}
} else if (nodeName === 'input' && rcheckedType.test(src.nodeName)) {
dest.defaultChecked = dest.checked = src.checked
if (dest.value !== src.value) {
dest.value = src.value
}
} else if (nodeName === 'option') {
dest.defaultSelected = dest.selected = src.defaultSelected
} else if (nodeName === 'input' || nodeName === 'textarea') {
dest.defaultValue = src.defaultValue
}
}
function getAll(context) {
return typeof context.getElementsByTagName !== 'undefined' ?
context.getElementsByTagName('*') :
typeof context.querySelectorAll !== 'undefined' ?
context.querySelectorAll('*') : []
}
function fixCloneNode(src) {
var target = src.cloneNode(true)
var s = getAll(src)
for (var i = 0; i < s.length; i++) {
fix(t[i], s[i])
}
return target
}
avalon.cloneNode = function (a) {
return a.cloneNode(true)
}
function fixContains(root, el) {
try {
while ((el = el.parentNode))
if (el === root)
return true
return false
} catch (e) {
return false
}
}
avalon.contains = fixContains
if (avalon.browser) {
if (avalon.msie < 10) {
avalon.cloneNode = fixCloneNode
}
if (!document.contains) {
document.contains = function (b) {
return fixContains(document, b)
}
}
if (window.Node && !document.createTextNode('x').contains) {
Node.prototype.contains = function (arg) {
return !!(this.compareDocumentPosition(arg) & 16)
}
}
if (window.HTMLElement && !avalon.root.outerHTML) {
HTMLElement.prototype.__defineGetter__('outerHTML', function () {
var div = document.createElement('div')
div.appendChild(this)
return div.innerHTML
})
}
}
var rnowhite = /\S+/g
var fakeClassListMethods = {
_toString: function () {
var node = this.node
var cls = node.className
var str = typeof cls === 'string' ? cls : cls.baseVal
var match = str.match(rnowhite)
return match ? match.join(' ') : ''
},
_contains: function (cls) {
return (' ' + this + ' ').indexOf(' ' + cls + ' ') > -1
},
_add: function (cls) {
if (!this.contains(cls)) {
this._set(this + ' ' + cls)
}
},
_remove: function (cls) {
this._set((' ' + this + ' ').replace(' ' + cls + ' ', ' '))
},
__set: function (cls) {
cls = cls.trim()
var node = this.node
if (typeof node.className === 'object') {
node.setAttribute('class', cls)
} else {
node.className = cls
}
}
}
function fakeClassList(node) {
if (!('classList' in node)) {
node.classList = {
node: node
}
for (var k in fakeClassListMethods) {
node.classList[k.slice(1)] = fakeClassListMethods[k]
}
}
return node.classList
}
'add,remove'.replace(avalon.rword, function (method) {
avalon.fn[method + 'Class'] = function (cls) {
var el = this[0] || {}
if (cls && typeof cls === 'string' && el.nodeType === 1) {
cls.replace(rnowhite, function (c) {
fakeClassList(el)[method](c)
})
}
return this
}
})
avalon.shadowCopy(avalon.fn, {
hasClass: function (cls) {
var el = this[0] || {}
return el.nodeType === 1 && fakeClassList(el).contains(cls)
},
toggleClass: function (value, stateVal) {
var isBool = typeof stateVal === 'boolean'
var me = this
String(value).replace(rnowhite, function (c) {
var state = isBool ? stateVal : !me.hasClass(c)
me[state ? 'addClass' : 'removeClass'](c)
})
return this
}
})
var propMap = {
'accept-charset': 'acceptCharset',
'char': 'ch',
charoff: 'chOff',
'class': 'className',
'for': 'htmlFor',
'http-equiv': 'httpEquiv'
}
var bools = ['autofocus,autoplay,async,allowTransparency,checked,controls',
'declare,disabled,defer,defaultChecked,defaultSelected,',
'isMap,loop,multiple,noHref,noResize,noShade',
'open,readOnly,selected'
].join(',')
bools.replace(/\w+/g, function (name) {
propMap[name.toLowerCase()] = name
})
var anomaly = ['accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan',
'dateTime,defaultValue,contentEditable,frameBorder,longDesc,maxLength,' +
'marginWidth,marginHeight,rowSpan,tabIndex,useMap,vSpace,valueType,vAlign'
].join(',')
anomaly.replace(/\w+/g, function (name) {
propMap[name.toLowerCase()] = name
})
function isVML(src) {
var nodeName = src.nodeName
return nodeName.toLowerCase() === nodeName && src.scopeName && src.outerText === ''
}
var rsvg = /^\[object SVG\w*Element\]$/
var ramp = /&amp;/g
function attrUpdate(node, vnode) {
if (!node || node.nodeType !== 1) {
return
}
vnode.dynamic['ms-attr'] = 1
var attrs = vnode['ms-attr']
for (var attrName in attrs) {
var val = attrs[attrName]
if (attrName === 'href' || attrName === 'src') {
if (!node.hasAttribute) {
val = String(val).replace(ramp, '&')
}
node[attrName] = val
if (window.chrome && node.tagName === 'EMBED') {
var parent = node.parentNode
var comment = document.createComment('ms-src')
parent.replaceChild(comment, node)
parent.replaceChild(node, comment)
}
} else if (attrName.indexOf('data-') === 0) {
node.setAttribute(attrName, val)
} else {
var propName = propMap[attrName] || attrName
if (typeof node[propName] === 'boolean') {
node[propName] = !!val
}
if (val === false) {
node.removeAttribute(propName)
continue
}
var isInnate = rsvg.test(node) ? false :
(!avalon.modern && isVML(node)) ? true :
attrName in node.cloneNode(false)
if (isInnate) {
node[propName] = val + ''
} else {
node.setAttribute(attrName, val)
}
}
}
}
var rvalidchars = /^[\],:{}\s]*$/;
var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
var rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g;
var rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
avalon.parseJSON = typeof JSON === 'object' ? JSON.parse : function (data) {
if (typeof data === 'string') {
data = data.trim()
if (data) {
if (rvalidchars.test(data.replace(rvalidescape, '@')
.replace(rvalidtokens, ']')
.replace(rvalidbraces, ''))) {
return (new Function('return ' + data))()
}
}
avalon.error('Invalid JSON: ' + data)
}
return data
}
avalon.fn.attr = function (name, value) {
if (arguments.length === 2) {
this[0].setAttribute(name, value)
return this
} else {
return this[0].getAttribute(name)
}
}
var cssHooks$1 = avalon.cssHooks
var cssMap = {
'float': 'cssFloat'
}
avalon.cssNumber = avalon.oneObject('animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom')
var prefixes = ['', '-webkit-', '-o-', '-moz-', '-ms-']
avalon.cssName = function (name, host, camelCase) {
if (cssMap[name]) {
return cssMap[name]
}
host = host || avalon.root.style || {}
for (var i = 0, n = prefixes.length; i < n; i++) {
camelCase = avalon.camelize(prefixes[i] + name)
if (camelCase in host) {
return (cssMap[name] = camelCase)
}
}
return null
}
avalon.fn.css = function (name, value) {
if (avalon.isPlainObject(name)) {
for (var i in name) {
avalon.css(this, i, name[i])
}
} else {
var ret = avalon.css(this, name, value)
}
return ret !== void 0 ? ret : this
}
avalon.fn.position = function () {
var offsetParent, offset,
elem = this[0],
parentOffset = {
top: 0,
left: 0
}
if (!elem) {
return parentOffset
}
if (this.css('position') === 'fixed') {
offset = elem.getBoundingClientRect()
} else {
offsetParent = this.offsetParent()
offset = this.offset()
if (offsetParent[0].tagName !== 'HTML') {
parentOffset = offsetParent.offset()
}
parentOffset.top += avalon.css(offsetParent[0], 'borderTopWidth', true)
parentOffset.left += avalon.css(offsetParent[0], 'borderLeftWidth', true)
parentOffset.top -= offsetParent.scrollTop()
parentOffset.left -= offsetParent.scrollLeft()
}
return {
top: offset.top - parentOffset.top - avalon.css(elem, 'marginTop', true),
left: offset.left - parentOffset.left - avalon.css(elem, 'marginLeft', true)
}
}
avalon.fn.offsetParent = function () {
var offsetParent = this[0].offsetParent
while (offsetParent && avalon.css(offsetParent, 'position') === 'static') {
offsetParent = offsetParent.offsetParent
}
return avalon(offsetParent || avalon.root)
}
cssHooks$1['@:set'] = function (node, name, value) {
try {
node.style[name] = value
} catch (e) {
}
}
cssHooks$1['@:get'] = function (node, name) {
if (!node || !node.style) {
throw new Error('getComputedStyle要求传入一个节点 ' + node)
}
var ret, styles = getComputedStyle(node, null)
if (styles) {
ret = name === 'filter' ? styles.getPropertyValue(name) : styles[name]
if (ret === '') {
ret = node.style[name]
}
}
return ret
}
cssHooks$1['opacity:get'] = function (node) {
var ret = cssHooks$1['@:get'](node, 'opacity')
return ret === '' ? '1' : ret
}
'top,left'.replace(avalon.rword, function (name) {
cssHooks$1[name + ':get'] = function (node) {
var computed = cssHooks$1['@:get'](node, name)
return /px$/.test(computed) ? computed :
avalon(node).position()[name] + 'px'
}
})
var cssShow = {
position: 'absolute',
visibility: 'hidden',
display: 'block'
}
var rdisplayswap = /^(none|table(?!-c[ea]).+)/
function showHidden(node, array) {
if (node.offsetWidth <= 0) {
if (rdisplayswap.test(cssHooks$1['@:get'](node, 'display'))) {
var obj = {
node: node
}
for (var name in cssShow) {
obj[name] = node.style[name]
node.style[name] = cssShow[name]
}
array.push(obj)
}
var parent = node.parentNode
if (parent && parent.nodeType === 1) {
showHidden(parent, array)
}
}
}
avalon.each({
Width: 'width',
Height: 'height'
}, function (name, method) {
var clientProp = 'client' + name,
scrollProp = 'scroll' + name,
offsetProp = 'offset' + name
cssHooks$1[method + ':get'] = function (node, which, override) {
var boxSizing = -4
if (typeof override === 'number') {
boxSizing = override
}
which = name === 'Width' ? ['Left', 'Right'] : ['Top', 'Bottom']
var ret = node[offsetProp]
if (boxSizing === 2) {
return ret + avalon.css(node, 'margin' + which[0], true) + avalon.css(node, 'margin' + which[1], true)
}
if (boxSizing < 0) {
ret = ret - avalon.css(node, 'border' + which[0] + 'Width', true) - avalon.css(node, 'border' + which[1] + 'Width', true)
}
if (boxSizing === -4) {
ret = ret - avalon.css(node, 'padding' + which[0], true) - avalon.css(node, 'padding' + which[1], true)
}
return ret
}
cssHooks$1[method + '&get'] = function (node) {
var hidden = []
showHidden(node, hidden)
var val = cssHooks$1[method + ':get'](node)
for (var i = 0, obj; obj = hidden[i++];) {
node = obj.node
for (var n in obj) {
if (typeof obj[n] === 'string') {
node.style[n] = obj[n]
}
}
}
return val
}
avalon.fn[method] = function (value) {
var node = this[0]
if (arguments.length === 0) {
if (node.setTimeout) {
return node['inner' + name] ||
node.document.documentElement[clientProp] ||
node.document.body[clientProp]
}
if (node.nodeType === 9) {
var doc = node.documentElement
return Math.max(node.body[scrollProp], doc[scrollProp], node.body[offsetProp], doc[offsetProp], doc[clientProp])
}
return cssHooks$1[method + '&get'](node)
} else {
return this.css(method, value)
}
}
avalon.fn['inner' + name] = function () {
return cssHooks$1[method + ':get'](this[0], void 0, -2)
}
avalon.fn['outer' + name] = function (includeMargin) {
return cssHooks$1[method + ':get'](this[0], void 0, includeMargin === true ? 2 : 0)
}
})
if (avalon.msie < 9) {
cssMap['float'] = 'styleFloat'
var rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i
var rposition = /^(top|right|bottom|left)$/
var ralpha = /alpha\([^)]*\)/i
var ie8 = avalon.msie === 8
var salpha = 'DXImageTransform.Microsoft.Alpha'
var border = {
thin: ie8 ? '1px' : '2px',
medium: ie8 ? '3px' : '4px',
thick: ie8 ? '5px' : '6px'
}
cssHooks$1['@:get'] = function (node, name) {
var currentStyle = node.currentStyle
var ret = currentStyle[name]
if ((rnumnonpx.test(ret) && !rposition.test(ret))) {
var style = node.style,
left = style.left,
rsLeft = node.runtimeStyle.left
node.runtimeStyle.left = currentStyle.left
style.left = name === 'fontSize' ? '1em' : (ret || 0)
ret = style.pixelLeft + 'px'
style.left = left
node.runtimeStyle.left = rsLeft
}
if (ret === 'medium') {
name = name.replace('Width', 'Style')
if (currentStyle[name] === 'none') {
ret = '0px'
}
}
return ret === '' ? 'auto' : border[ret] || ret
}
cssHooks$1['opacity:set'] = function (node, name, value) {
var style = node.style
var opacity = isFinite(value) && value <= 1 ? 'alpha(opacity=' + value * 100 + ')' : ''
var filter = style.filter || ''
style.zoom = 1
style.filter = (ralpha.test(filter) ?
filter.replace(ralpha, opacity) :
filter + ' ' + opacity).trim()
if (!style.filter) {
style.removeAttribute('filter')
}
}
cssHooks$1['opacity:get'] = function (node) {
var ropactiy = /(opacity|\d(\d|\.)*)/g
var match = node.style.filter.match(ropactiy) || []
var ret = false
for (var i = 0, el; el = match[i++];) {
if (el === 'opacity') {
ret = true
} else if (ret) {
return (el / 100) + ''
}
}
return '1'
}
}
avalon.fn.offset = function () {
var node = this[0],
box = {
left: 0,
top: 0
}
if (!node || !node.tagName || !node.ownerDocument) {
return box
}
var doc = node.ownerDocument
var body = doc.body
var root = doc.documentElement
var win = doc.defaultView || doc.parentWindow
if (!avalon.contains(root, node)) {
return box
}
if (node.getBoundingClientRect) {
box = node.getBoundingClientRect()
}
var clientTop = root.clientTop || body.clientTop,
clientLeft = root.clientLeft || body.clientLeft,
scrollTop = Math.max(win.pageYOffset || 0, root.scrollTop, body.scrollTop),
scrollLeft = Math.max(win.pageXOffset || 0, root.scrollLeft, body.scrollLeft)
return {
top: box.top + scrollTop - clientTop,
left: box.left + scrollLeft - clientLeft
}
}
avalon.each({
scrollLeft: 'pageXOffset',
scrollTop: 'pageYOffset'
}, function (method, prop) {
avalon.fn[method] = function (val) {
var node = this[0] || {},
win = getWindow(node),
top = method === 'scrollTop'
if (!arguments.length) {
return win ? (prop in win) ? win[prop] : root[method] : node[method]
} else {
if (win) {
win.scrollTo(!top ? val : avalon(win).scrollLeft(), top ? val : avalon(win).scrollTop())
} else {
node[method] = val
}
}
}
})
function getWindow(node) {
return node.window || node.defaultView || node.parentWindow || false
}
function getValType(elem) {
var ret = elem.tagName.toLowerCase()
return ret === 'input' && rcheckedType.test(elem.type) ? 'checked' : ret
}
var roption = /^<option(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s+value[\s=]/i
var valHooks = {
'option:get': avalon.msie ? function (node) {
return roption.test(node.outerHTML) ? node.value : node.text.trim()
} : function (node) {
return node.value
},
'select:get': function (node, value) {
var option, options = node.options,
index = node.selectedIndex,
getter = valHooks['option:get'],
one = node.type === 'select-one' || index < 0,
values = one ? null : [],
max = one ? index + 1 : options.length,
i = index < 0 ? max : one ? index : 0
for (; i < max; i++) {
option = options[i]
if ((option.selected || i === index) && !option.disabled &&
(!option.parentNode.disabled || option.parentNode.tagName !== 'OPTGROUP')
) {
value = getter(option)
if (one) {
return value
}
values.push(value)
}
}
return values
},
'select:set': function (node, values, optionSet) {
values = [].concat(values)
var getter = valHooks['option:get']
for (var i = 0, el; el = node.options[i++];) {
if ((el.selected = values.indexOf(getter(el)) > -1)) {
optionSet = true
}
}
if (!optionSet) {
node.selectedIndex = -1
}
}
}
avalon.fn.val = function (value) {
var node = this[0]
if (node && node.nodeType === 1) {
var get = arguments.length === 0
var access = get ? ':get' : ':set'
var fn = valHooks[getValType(node) + access]
if (fn) {
var val = fn(node, value)
} else if (get) {
return (node.value || '').replace(/\r/g, '')
} else {
node.value = value
}
}
return get ? val : this
}
var rhtml = /<|&#?\w+;/
var htmlCache = new Cache(128)
var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig
avalon.parseHTML = function (html) {
var fragment = avalon.avalonFragment.cloneNode(false)
if (typeof html !== 'string') {
return fragment
}
if (!rhtml.test(html)) {
return document.createTextNode(html)
}
html = html.replace(rxhtml, '<$1></$2>').trim()
var hasCache = htmlCache.get(html)
if (hasCache) {
return avalon.cloneNode(hasCache)
}
var vnodes = avalon.lexer(html)
for (var i = 0, el; el = vnodes[i++];) {
fragment.appendChild(avalon.vdom(el, 'toDOM'))
}
if (html.length < 1024) {
htmlCache.put(html, fragment)
}
return fragment
}
avalon.innerHTML = function (node, html) {
var parsed = this.parseHTML(html)
this.clearHTML(node).appendChild(parsed)
}
avalon.unescapeHTML = function (html) {
return String(html)
.replace(/&quot;/g, '"')
.replace(/&#39;/g, '\'')
.replace(/&lt;/g, '<')
.replace(/&gt;/g, '>')
.replace(/&amp;/g, '&')
}
avalon.clearHTML = function (node) {
node.textContent = ''
while (node.lastChild) {
node.removeChild(node.lastChild)
}
return node
}
var canBubbleUp = {
click: true,
dblclick: true,
keydown: true,
keypress: true,
keyup: true,
mousedown: true,
mousemove: true,
mouseup: true,
mouseover: true,
mouseout: true,
wheel: true,
mousewheel: true,
input: true,
change: true,
beforeinput: true,
compositionstart: true,
compositionupdate: true,
compositionend: true,
select: true,
cut: true,
copy: true,
paste: true,
beforecut: true,
beforecopy: true,
beforepaste: true,
focusin: true,
focusout: true,
DOMFocusIn: true,
DOMFocusOut: true,
DOMActivate: true,
dragend: true,
datasetchanged: true
}
var hackSafari = avalon.modern && doc$1.ontouchstart
avalon.fn.bind = function (type, fn, phase) {
if (this[0]) {
return avalon.bind(this[0], type, fn, phase)
}
}
avalon.fn.unbind = function (type, fn, phase) {
if (this[0]) {
avalon.unbind(this[0], type, fn, phase)
}
return this
}
avalon.bind = function (elem, type, fn) {
if (elem.nodeType === 1) {
var value = elem.getAttribute('avalon-events') || ''
var uuid = markID$1(fn)
var hook = eventHooks[type]
if (type === 'click' && hackSafari) {
elem.addEventListener('click', avalon.noop)
}
if (hook) {
type = hook.type || type
if (hook.fix) {
fn = hook.fix(elem, fn)
fn.uuid = uuid
}
}
var key = type + ':' + uuid
avalon.eventListeners[fn.uuid] = fn
if (value.indexOf(type + ':') === -1) {
if (canBubbleUp[type] || (avalon.modern && focusBlur[type])) {
delegateEvent(type)
} else {
avalon._nativeBind(elem, type, dispatch)
}
}
var keys = value.split(',')
if (keys[0] === '') {
keys.shift()
}
if (keys.indexOf(key) === -1) {
keys.push(key)
elem.setAttribute('avalon-events', keys.join(','))
}
} else {
avalon._nativeBind(elem, type, fn)
}
return fn
}
avalon.unbind = function (elem, type, fn) {
if (elem.nodeType === 1) {
var value = elem.getAttribute('avalon-events') || ''
switch (arguments.length) {
case 1:
avalon._nativeUnBind(elem, type, dispatch)
elem.removeAttribute('avalon-events')
break
case 2:
value = value.split(',').filter(function (str) {
return str.indexOf(type + ':') === -1
}).join(',')
elem.setAttribute('avalon-events', value)
break
default:
var search = type + ':' + fn.uuid
value = value.split(',').filter(function (str) {
return str !== search
}).join(',')
elem.setAttribute('avalon-events', value)
delete avalon.eventListeners[fn.uuid]
break
}
} else {
avalon._nativeUnBind(elem, type, fn)
}
}
var typeRegExp = {}
function collectHandlers(elem, type, handlers) {
var value = elem.getAttribute('avalon-events')
if (value && (elem.disabled !== true || type !== 'click')) {
var uuids = []
var reg = typeRegExp[type] || (typeRegExp[type] = new RegExp("\\b" + type + '\\:([^,\\s]+)', 'g'))
value.replace(reg, function (a, b) {
uuids.push(b)
return a
})
if (uuids.length) {
handlers.push({
elem: elem,
uuids: uuids
})
}
}
elem = elem.parentNode
var g = avalon.gestureEvents || {}
if (elem && elem.getAttribute && (canBubbleUp[type] || g[type])) {
collectHandlers(elem, type, handlers)
}
}
var rhandleHasVm = /^e/
var stopImmediate = false
function dispatch(event) {
event = new avEvent(event)
var type = event.type
var elem = event.target
var handlers = []
collectHandlers(elem, type, handlers)
var i = 0, j, uuid, handler
while ((handler = handlers[i++]) && !event.cancelBubble) {
var host = event.currentTarget = handler.elem
j = 0
while ((uuid = handler.uuids[j++])) {
if (stopImmediate) {
stopImmediate = false
break
}
var fn = avalon.eventListeners[uuid]
if (fn) {
var vm = rhandleHasVm.test(uuid) ? handler.elem._ms_context_ : 0
if (vm && vm.$hashcode === false) {
return avalon.unbind(elem, type, fn)
}
var ret = fn.call(vm || elem, event, host._ms_local)
if (ret === false) {
event.preventDefault()
event.stopPropagation()
}
}
}
}
}
var focusBlur = {
focus: true,
blur: true
}
function delegateEvent(type) {
var value = root$1.getAttribute('delegate-events') || ''
if (value.indexOf(type) === -1) {
var arr = value.match(avalon.rword) || []
arr.push(type)
root$1.setAttribute('delegate-events', arr.join(','))
avalon._nativeBind(root$1, type, dispatch, !!focusBlur[type])
}
}
var rconstant = /^[A-Z_]+$/
function avEvent(event) {
if (event.originalEvent) {
return event
}
for (var i in event) {
if (!rconstant.test(i) && typeof event[i] !== 'function') {
this[i] = event[i]
}
}
if (!this.target) {
this.target = event.srcElement
}
var target = this.target
this.fixEvent()
this.timeStamp = new Date() - 0
this.originalEvent = event
}
avEvent.prototype = {
fixEvent: function () { },
preventDefault: function () {
var e = this.originalEvent || {}
e.returnValue = this.returnValue = false
if (e.preventDefault) {
e.preventDefault()
}
},
stopPropagation: function () {
var e = this.originalEvent || {}
e.cancelBubble = this.cancelBubble = true
if (e.stopPropagation) {
e.stopPropagation()
}
},
stopImmediatePropagation: function () {
stopImmediate = true;
this.stopPropagation()
},
toString: function () {
return '[object Event]'
}
}
if (!('onmouseenter' in root$1)) {
avalon.each({
mouseenter: 'mouseover',
mouseleave: 'mouseout'
}, function (origType, fixType) {
eventHooks[origType] = {
type: fixType,
fix: function (elem, fn) {
return function (e) {
var t = e.relatedTarget
if (!t || (t !== elem && !(elem.compareDocumentPosition(t) & 16))) {
delete e.type
e.type = origType
return fn.apply(this, arguments)
}
}
}
}
})
}
avalon.each({
AnimationEvent: 'animationend',
WebKitAnimationEvent: 'webkitAnimationEnd'
}, function (construct, fixType) {
if (win[construct] && !eventHooks.animationend) {
eventHooks.animationend = {
type: fixType
}
}
})
if (doc$1.onmousewheel === void 0) {
var fixWheelType = doc$1.onwheel !== void 0 ? 'wheel' : 'DOMMouseScroll'
var fixWheelDelta = fixWheelType === 'wheel' ? 'deltaY' : 'detail'
eventHooks.mousewheel = {
type: fixWheelType,
fix: function (elem, fn) {
return function (e) {
var delta = e[fixWheelDelta] > 0 ? -120 : 120
e.wheelDelta = ~~elem._ms_wheel_ + delta
elem._ms_wheel_ = e.wheelDeltaY = e.wheelDelta
e.wheelDeltaX = 0
if (Object.defineProperty) {
Object.defineProperty(e, 'type', {
value: 'mousewheel'
})
}
return fn.apply(this, arguments)
}
}
}
}
if (!W3C) {
delete canBubbleUp.change
delete canBubbleUp.select
}
avalon._nativeBind = W3C ? function (el, type, fn, capture) {
el.addEventListener(type, fn, capture)
} : function (el, type, fn) {
el.attachEvent('on' + type, fn)
}
avalon._nativeUnBind = W3C ? function (el, type, fn) {
el.removeEventListener(type, fn)
} : function (el, type, fn) {
el.detachEvent('on' + type, fn)
}
avalon.fireDom = function (elem, type, opts) {
if (doc$1.createEvent) {
var hackEvent = doc$1.createEvent('Events')
hackEvent.initEvent(type, true, true, opts)
avalon.shadowCopy(hackEvent, opts)
elem.dispatchEvent(hackEvent)
} else if (root$1.contains(elem)) {
hackEvent = doc$1.createEventObject()
avalon.shadowCopy(hackEvent, opts)
elem.fireEvent('on' + type, hackEvent)
}
}
var rmouseEvent = /^(?:mouse|contextmenu|drag)|click/
avEvent.prototype.fixEvent = function () {
var event = this
if (this.which == null && event.type.indexOf('key') === 0) {
this.which = event.charCode != null ? event.charCode : event.keyCode
} else if (rmouseEvent.test(event.type) && !('pageX' in this)) {
var DOC = event.target.ownerDocument || doc$1
var box = DOC.compatMode === 'BackCompat' ? DOC.body : DOC.documentElement
this.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0)
this.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0)
this.wheelDeltaY = this.wheelDelta
this.wheelDeltaX = 0
}
}
if (!('oninput' in doc$1.createElement('input'))) {
eventHooks.input = {
type: 'propertychange',
fix: function (elem, fn) {
return function (e) {
if (e.propertyName === 'value') {
e.type = 'input'
return fn.apply(this, arguments)
}
}
}
}
}
var voidTag = {
area: 1,
base: 1,
basefont: 1,
bgsound: 1,
br: 1,
col: 1,
command: 1,
embed: 1,
frame: 1,
hr: 1,
img: 1,
input: 1,
keygen: 1,
link: 1,
meta: 1,
param: 1,
source: 1,
track: 1,
wbr: 1
}
function markNode(node) {
var ret = {}
var type = node.nodeName.toLowerCase()
ret.nodeName = type
ret.dom = node
if (type.charAt(0) === '#') {
var nodeValue = node.nodeValue
if (/\S/.test(nodeValue)) {
ret.nodeValue = nodeValue
}
} else {
var props = markProps(node)
if (voidTag[type]) {
ret.isVoidTag = true
}
ret.children = markChildren(node)
if (props) {
if ('selectedIndex' in props) {
node.selectedIndex = props.selectedIndex
delete props.selectedIndex
}
ret.props = props
}
}
return ret
}
var rformElement = /input|textarea|select/i
var rcolon = /^\:/
function markProps(node) {
var attrs = node.attributes, ret = {}
for (var i = 0, n = attrs.length; i < n; i++) {
var attr = attrs[i]
if (attr.specified) {
var name = attr.name
if (name.charAt(0) === ':') {
name = name.replace(rcolon, 'ms-')
}
ret[name] = attr.value
}
}
if (rformElement.test(node.nodeName)) {
ret.type = node.type
}
var style = node.style.cssText
if (style) {
ret.style = style
}
if (ret.type === 'select-one') {
ret.selectedIndex = node.selectedIndex
}
if (isEmpty(ret)) {
return null
}
return ret
}
function isEmpty(a) {
for (var i in a) {
return false
}
return true
}
function markChildren(parent) {
var arr = []
var node = parent.firstChild
if (!node) {
return arr
}
do {
var next = node.nextSibling
switch (node.nodeType) {
case 1:
var a = node.getAttributeNode(':for') || node.getAttributeNode('ms-for')
if (a) {
var start = document.createComment('ms-for:' + a.value)
var end = document.createComment('ms-for-end:')
node.removeAttributeNode(a)
if (parent) {
parent.insertBefore(end, node.nextSibling)
parent.insertBefore(start, node)
}
arr.push(markNode(start), markNode(node), markNode(end))
} else {
arr.push(markNode(node))
}
break
case 3:
if (/\S/.test(node.nodeValue)) {
arr.push(markNode(node))
} else {
var p = node.parentNode
if (p) {
p.removeChild(node)
}
}
break
case 8:
arr.push(markNode(node))
}
node = next
} while (node)
return arr
}
avalon.scan = function (a) {
if (!a || !a.nodeType) {
avalon.warn('[avalon.scan] first argument must be element , documentFragment, or document')
return
}
scanNodes([a])
}
avalon._hydrate = markNode
var onceWarn = true
function scanNodes(nodes) {
for (var i = 0, elem; elem = nodes[i++];) {
if (elem.nodeType === 1) {
var $id = getController(elem)
var vm = avalon.vmodels[$id]
if (vm && !vm.$element) {
vm.$element = elem
if (avalon.serverTemplates && avalon.serverTemplates[$id]) {
var tmpl = avalon.serverTemplates[$id]
var oldTree = avalon.speedUp(avalon.lexer(tmpl))
var render = avalon.render(oldTree)
var vtree = render(vm)
var dom = avalon.vdom(vtree[0], 'toDOM')
vm.$element = dom
dom.vtree = vtree
vm.$render = render
elem.parentNode.replaceChild(dom, elem)
avalon.diff(vtree, vtree)
continue
}
var vtree = [markNode(elem)]
var now = new Date()
elem.vtree = avalon.speedUp(vtree)
var now2 = new Date()
onceWarn && avalon.log('构建虚拟DOM耗时', now2 - now, 'ms')
vm.$render = avalon.render(elem.vtree)
avalon.scopes[vm.$id] = {
vmodel: vm,
local: {},
isTemp: true
}
var now3 = new Date()
if (onceWarn && (now3 - now2 > 100)) {
avalon.log('构建当前vm的$render方法耗时 ', now3 - now2, 'ms\n',
'如果此时间太长,达100ms以上\n',
'建议将当前ms-controller拆分成多个ms-controller,减少每个vm管辖的区域')
onceWarn = false
}
avalon.rerenderStart = now3
avalon.batch($id)
} else if (!$id) {
scanNodes(elem.childNodes)
}
}
}
}
function getController(a) {
return a.getAttribute('ms-controller') ||
a.getAttribute(':controller')
}
var readyList = [];
var isReady;
var fireReady = function (fn) {
isReady = true
while (fn = readyList.shift()) {
fn(avalon)
}
}
avalon.ready = function (fn) {
if (!isReady) {
readyList.push(fn)
} else {
fn(avalon)
}
}
avalon.ready(function () {
avalon.scan(doc$1.body)
})
new function () {
if (!avalon.inBrowser)
return
function doScrollCheck() {
try {
root$1.doScroll('left')
fireReady()
} catch (e) {
setTimeout(doScrollCheck)
}
}
if (doc$1.readyState === 'complete') {
setTimeout(fireReady)
} else if (doc$1.addEventListener) {
doc$1.addEventListener('DOMContentLoaded', fireReady)
} else if (doc$1.attachEvent) {
doc$1.attachEvent('onreadystatechange', function () {
if (doc$1.readyState === 'complete') {
fireReady()
}
})
try {
var isTop = win.frameElement === null
} catch (e) {
}
if (root$1.doScroll && isTop && win.external) {
doScrollCheck()
}
}
avalon.bind(win, 'load', fireReady)
}
var warlords = {}
function adjustVm(vm, expr) {
var toppath = expr.split(".")[0], other
try {
if (vm.hasOwnProperty(toppath)) {
if (vm.$accessors) {
other = vm.$accessors[toppath].get.heirloom.__vmodel__
} else {
other = Object.getOwnPropertyDescriptor(vm, toppath).get.heirloom.__vmodel__
}
}
} catch (e) {
}
return other || vm
}
function $watch(expr, callback) {
var fuzzy = expr.indexOf('.*') > 0 || expr === '*'
var vm = fuzzy ? this : $watch.adjust(this, expr)
var hive = this.$events
var list = hive[expr] || (hive[expr] = [])
if (fuzzy) {
list.reg = list.reg || toRegExp(expr)
}
addFuzzy(fuzzy, hive, expr)
if (vm !== this) {
addFuzzy(fuzzy, this.$events, expr)
}
avalon.Array.ensure(list, callback)
return function () {
avalon.Array.remove(list, callback)
}
}
$watch.adjust = adjustVm
function $emit(list, vm, path, a, b, i) {
if (list && list.length) {
try {
for (i = i || list.length - 1; i >= 0; i--) {
var callback = list[i]
callback.call(vm, a, b, path)
}
} catch (e) {
if (i - 1 > 0)
$emit(list, vm, path, a, b, i - 1)
avalon.log(e, path)
}
}
}
function toRegExp(expr) {
var arr = expr.split('.')
return new RegExp("^" + arr.map(function (el) {
return el === '*' ? '(?:[^.]+)' : el
}).join('\\.') + '$', 'i')
}
function addFuzzy(add, obj, expr) {
if (add) {
if (obj.__fuzzy__) {
if (obj.__fuzzy__.indexOf(',' + expr) === -1) {
obj.__fuzzy__ += ',' + expr
}
} else {
obj.__fuzzy__ = expr
}
}
}
var $$skipArray$1 = avalon.oneObject('$id,$render,$track,$element,$watch,$fire,$events,$skipArray,$accessors,$hashcode,$run,$wait,__proxy__,__data__,__const__')
function notifySize(array, size) {
if (array.length !== size) {
array.notify('length', array.length, size, true)
}
}
var __array__ = {
set: function (index, val) {
if (((index >>> 0) === index) && this[index] !== val) {
if (index > this.length) {
throw Error(index + 'set方法的第一个参数不能大于原数组长度')
}
this.splice(index, 1, val)
}
},
contains: function (el) {
return this.indexOf(el) !== -1
},
ensure: function (el) {
if (!this.contains(el)) {
this.push(el)
}
return this
},
pushArray: function (arr) {
return this.push.apply(this, arr)
},
remove: function (el) {
return this.removeAt(this.indexOf(el))
},
removeAt: function (index) {
if ((index >>> 0) === index) {
return this.splice(index, 1)
}
return []
},
clear: function () {
this.removeAll()
return this
}
}
var ap$1 = Array.prototype
var _splice = ap$1.splice
__array__.removeAll = function (all) {
var size = this.length
if (Array.isArray(all)) {
for (var i = this.length - 1; i >= 0; i--) {
if (all.indexOf(this[i]) !== -1) {
_splice.call(this, i, 1)
}
}
} else if (typeof all === 'function') {
for (i = this.length - 1; i >= 0; i--) {
var el = this[i]
if (all(el, i)) {
_splice.call(this, i, 1)
}
}
} else {
_splice.call(this, 0, this.length)
}
warlords.toModel(this)
notifySize(this, size)
this.notify()
}
var __method__ = ['push', 'pop', 'shift', 'unshift', 'splice']
__method__.forEach(function (method) {
var original = ap$1[method]
__array__[method] = function (a, b) {
var args = [], size = this.length
if (method === 'splice' && Object(this[0]) === this[0]) {
var old = this.slice(a, b)
var neo = ap$1.slice.call(arguments, 2)
var args = [a, b]
for (var j = 0, jn = neo.length; j < jn; j++) {
var item = old[j]
args[j + 2] = warlords.modelAdaptor(neo[j], item, (item && item.$events || {}), {
id: this.$id + '.*',
master: true
})
}
} else {
for (var i = 0, n = arguments.length; i < n; i++) {
args[i] = warlords.modelAdaptor(arguments[i], 0, {}, {
id: this.$id + '.*',
master: true
})
}
}
var result = original.apply(this, args)
warlords.toModel(this)
notifySize(this, size)
this.notify()
return result
}
})
'sort,reverse'.replace(/\w+/g, function (method) {
__array__[method] = function () {
ap$1[method].apply(this, arguments)
warlords.toModel(this)
this.notify()
return this
}
})
var rskip = /function|window|date|regexp|element/i
function isSkip$1(key, value, skipArray) {
return key.charAt(0) === '$' ||
skipArray[key] ||
(rskip.test(avalon.type(value))) ||
(value && value.nodeName && value.nodeType > 0)
}
warlords.isSkip = isSkip$1
function modelAdaptor(definition, old, heirloom, options) {
var type = avalon.type(definition)
switch (type) {
case 'array':
return warlords.arrayFactory(definition, old, heirloom, options)
case 'object':
if (old && old.$id) {
++avalon.suspendUpdate
if (old.$track !== Object.keys(definition).sort().join(';;')) {
var vm = warlords.slaveFactory(old, definition, heirloom, options)
} else {
vm = old
}
for (var i in definition) {
if ($$skipArray$1[i])
continue
vm[i] = definition[i]
}
--avalon.suspendUpdate
return vm
} else {
vm = warlords.masterFactory(definition, heirloom, options)
return vm
}
default:
return definition
}
}
warlords.modelAdaptor = modelAdaptor
function makeAccessor$1(sid, spath, heirloom) {
var old = NaN
function get() {
return old
}
get.heirloom = heirloom
return {
get: get,
set: function (val) {
if (old === val) {
return
}
var older = old
if (older && older.$model) {
older = older.$model
}
var vm = heirloom.__vmodel__
if (val && typeof val === 'object') {
val = modelAdaptor(val, old, heirloom, {
pathname: spath,
id: sid
})
}
old = val
if (this.$hashcode && vm) {
vm.$events.$$dirty$$ = true
if (vm.$events.$$wait$$)
return
if (heirloom !== vm.$events) {
get.heirloom = vm.$events
}
emitWidget(get.$decompose, spath, val, older)
if (spath.indexOf('*') === -1) {
$emit(get.heirloom[spath], vm, spath, val, older)
}
emitArray(sid + '', vm, spath, val, older)
emitWildcard(get.heirloom, vm, spath, val, older)
vm.$events.$$dirty$$ = false
batchUpdateView(vm.$id)
}
},
enumerable: true,
configurable: true
}
}
warlords.makeAccessor = makeAccessor$1
function batchUpdateView(id) {
avalon.rerenderStart = new Date
var dotIndex = id.indexOf('.')
if (dotIndex > 0) {
avalon.batch(id.slice(0, dotIndex))
} else {
avalon.batch(id)
}
}
avalon.define = function (definition) {
var $id = definition.$id
if (!$id) {
avalon.warn('vm.$id must be specified')
}
if (avalon.vmodels[$id]) {
throw Error('error:[' + $id + '] had defined!')
}
var vm = warlords.masterFactory(definition, {}, {
pathname: '',
id: $id,
master: true
})
return avalon.vmodels[$id] = vm
}
function arrayFactory(array, old, heirloom, options) {
if (old && old.splice) {
var args = [0, old.length].concat(array)
++avalon.suspendUpdate
avalon.callArray = options.pathname
old.splice.apply(old, args)
--avalon.suspendUpdate
return old
} else {
for (var i in __array__) {
array[i] = __array__[i]
}
array.notify = function (a, b, c, d) {
var vm = heirloom.__vmodel__
if (vm) {
var path = a === null || a === void 0 ?
options.pathname :
options.pathname + '.' + a
vm.$fire(path, b, c)
if (!d && !heirloom.$$wait$$ && !avalon.suspendUpdate) {
avalon.callArray = path
batchUpdateView(vm.$id)
delete avalon.callArray
}
}
}
var hashcode = avalon.makeHashCode('$')
options.array = true
options.hashcode = hashcode
options.id = options.id || hashcode
warlords.initViewModel(array, heirloom, {}, {}, options)
for (var j = 0, n = array.length; j < n; j++) {
array[j] = modelAdaptor(array[j], 0, {}, {
id: array.$id + '.*',
master: true
})
}
return array
}
}
warlords.arrayFactory = arrayFactory
var rtopsub = /([^.]+)\.(.+)/
function emitArray(sid, vm, spath, val, older) {
if (sid.indexOf('.*.') > 0) {
var arr = sid.match(rtopsub)
var top = avalon.vmodels[arr[1]]
if (top) {
var path = arr[2]
$emit(top.$events[path], vm, spath, val, older)
}
}
}
function emitWidget(whole, spath, val, older) {
if (whole && whole[spath]) {
var wvm = whole[spath]
if (!wvm.$hashcode) {
delete whole[spath]
} else {
var wpath = spath.replace(/^[^.]+\./, '')
if (wpath !== spath) {
$emit(wvm.$events[wpath], wvm, wpath, val, older)
}
}
}
}
function emitWildcard(obj, vm, spath, val, older) {
if (obj.__fuzzy__) {
obj.__fuzzy__.replace(avalon.rword, function (expr) {
var list = obj[expr]
var reg = list.reg
if (reg && reg.test(spath)) {
$emit(list, vm, spath, val, older)
}
return expr
})
}
}
warlords.$$skipArray = $$skipArray$1
var canHideProperty = true
try {
Object.defineProperty({}, '_', {
value: 'x'
})
} catch (e) {
canHideProperty = false
}
warlords.canHideProperty = canHideProperty
function toJson(val) {
switch (avalon.type(val)) {
case 'array':
var array = []
for (var i = 0; i < val.length; i++) {
array[i] = toJson(val[i])
}
return array
case 'object':
var obj = {}
for (i in val) {
if (i === '__proxy__' || i === '__data__' || i === '__const__')
continue
if (val.hasOwnProperty(i)) {
var value = val[i]
obj[i] = value && value.nodeType ? value : toJson(value)
}
}
return obj
default:
return val
}
}
warlords.toJson = toJson
warlords.toModel = function (obj) {
if (!avalon.modern) {
obj.$model = toJson(obj)
}
}
function hideProperty(host, name, value) {
if (canHideProperty) {
Object.defineProperty(host, name, {
value: value,
writable: true,
enumerable: false,
configurable: true
})
} else {
host[name] = value
}
}
warlords.hideProperty = hideProperty
var modelAccessor$1 = {
get: function () {
return toJson(this)
},
set: avalon.noop,
enumerable: false,
configurable: true
}
warlords.modelAccessor = modelAccessor$1
function initViewModel$1($vmodel, heirloom, keys, accessors, options) {
if (options.array) {
if (avalon.modern) {
Object.defineProperty($vmodel, '$model', modelAccessor$1)
} else {
$vmodel.$model = toJson($vmodel)
}
} else {
hideProperty($vmodel, '$accessors', accessors)
hideProperty($vmodel, 'hasOwnProperty', function (key) {
return keys[key] === true
})
hideProperty($vmodel, '$track', Object.keys(keys).sort().join(';;'))
}
hideProperty($vmodel, '$id', options.id)
hideProperty($vmodel, '$hashcode', options.hashcode)
if (options.master === true) {
hideProperty($vmodel, '$run', function () {
run.call($vmodel)
})
hideProperty($vmodel, '$wait', function () {
wait.call($vmodel)
})
hideProperty($vmodel, '$element', null)
hideProperty($vmodel, '$render', 0)
heirloom.__vmodel__ = $vmodel
hideProperty($vmodel, '$events', heirloom)
hideProperty($vmodel, '$watch', function () {
return $watch.apply($vmodel, arguments)
})
hideProperty($vmodel, '$fire', function (expr, a, b) {
var list = $vmodel.$events[expr]
$emit(list, $vmodel, expr, a, b)
})
}
}
warlords.initViewModel = initViewModel$1
function wait() {
this.$events.$$wait$$ = true
}
function run() {
var host = this.$events
delete host.$$wait$$
if (host.$$dirty$$) {
delete host.$$dirty$$
avalon.rerenderStart = new Date
var id = this.$id
var dotIndex = id.indexOf('.')
if (dotIndex > 0) {
avalon.batch(id.slice(0, dotIndex))
} else {
avalon.batch(id)
}
}
}
var defineProperties = Object.defineProperties
var defineProperty
var timeBucket = new Date() - 0
if (!canHideProperty) {
if ('__defineGetter__' in avalon) {
defineProperty = function (obj, prop, desc) {
if ('value' in desc) {
obj[prop] = desc.value
}
if ('get' in desc) {
obj.__defineGetter__(prop, desc.get)
}
if ('set' in desc) {
obj.__defineSetter__(prop, desc.set)
}
return obj
}
defineProperties = function (obj, descs) {
for (var prop in descs) {
if (descs.hasOwnProperty(prop)) {
defineProperty(obj, prop, descs[prop])
}
}
return obj
}
}
if (avalon.msie < 9) {
var VBClassPool = {}
window.execScript([
'Function parseVB(code)',
'\tExecuteGlobal(code)',
'End Function'
].join('\n'), 'VBScript');
var VBMediator = function (instance, accessors, name, value) {
var accessor = accessors[name]
if (arguments.length === 4) {
accessor.set.call(instance, value)
} else {
return accessor.get.call(instance)
}
}
defineProperties = function (name, accessors, properties) {
var buffer = []
buffer.push(
'\r\n\tPrivate [__data__], [__proxy__]',
'\tPublic Default Function [__const__](d' + timeBucket + ', p' + timeBucket + ')',
'\t\tSet [__data__] = d' + timeBucket + ': set [__proxy__] = p' + timeBucket,
'\t\tSet [__const__] = Me',
'\tEnd Function')
var uniq = {
__proxy__: true,
__data__: true,
__const__: true
}
for (name in accessors) {
if (uniq[name] || $$skipArray$1[name]) {
continue
}
uniq[name] = true
buffer.push(
'\tPublic Property Let [' + name + '](val' + timeBucket + ')',
'\t\tCall [__proxy__](Me,[__data__], "' + name + '", val' + timeBucket + ')',
'\tEnd Property',
'\tPublic Property Set [' + name + '](val' + timeBucket + ')',
'\t\tCall [__proxy__](Me,[__data__], "' + name + '", val' + timeBucket + ')',
'\tEnd Property',
'\tPublic Property Get [' + name + ']',
'\tOn Error Resume Next',
'\t\tSet[' + name + '] = [__proxy__](Me,[__data__],"' + name + '")',
'\tIf Err.Number <> 0 Then',
'\t\t[' + name + '] = [__proxy__](Me,[__data__],"' + name + '")',
'\tEnd If',
'\tOn Error Goto 0',
'\tEnd Property')
}
for (name in properties) {
if (uniq[name] || $$skipArray$1[name]) {
continue
}
uniq[name] = true
buffer.push('\tPublic [' + name + ']')
}
for (name in $$skipArray$1) {
if (!uniq[name]) {
buffer.push('\tPublic [' + name + ']')
}
}
buffer.push('\tPublic [' + 'hasOwnProperty' + ']')
buffer.push('End Class')
var body = buffer.join('\r\n')
var className = VBClassPool[body]
if (!className) {
className = avalon.makeHashCode('VBClass')
window.parseVB('Class ' + className + body)
window.parseVB([
'Function ' + className + 'Factory(a, b)',
'\tDim o',
'\tSet o = (New ' + className + ')(a, b)',
'\tSet ' + className + 'Factory = o',
'End Function'
].join('\r\n'))
VBClassPool[body] = className
}
var ret = window[className + 'Factory'](accessors, VBMediator)
return ret
}
}
}
warlords.createViewModel = defineProperties
var isSkip = warlords.isSkip
var $$skipArray = warlords.$$skipArray
if (warlords.canHideProperty) {
delete $$skipArray.$accessors
delete $$skipArray.__data__
delete $$skipArray.__proxy__
delete $$skipArray.__const__
}
var makeAccessor = warlords.makeAccessor
var modelAccessor = warlords.modelAccessor
var createViewModel = warlords.createViewModel
var initViewModel = warlords.initViewModel
var makeHashCode = avalon.makeHashCode
function Observer() {
}
function masterFactory(definition, heirloom, options) {
var $skipArray = {}
if (definition.$skipArray) {
$skipArray = avalon.oneObject(definition.$skipArray)
delete definition.$skipArray
}
var keys = {}
options = options || {}
heirloom = heirloom || {}
var accessors = {}
var hashcode = makeHashCode('$')
var pathname = options.pathname || ''
options.id = options.id || hashcode
options.hashcode = options.hashcode || hashcode
var key, sid, spath
for (key in definition) {
if ($$skipArray[key])
continue
var val = keys[key] = definition[key]
if (!isSkip(key, val, $skipArray)) {
sid = options.id + '.' + key
spath = pathname ? pathname + '.' + key : key
accessors[key] = makeAccessor(sid, spath, heirloom)
}
}
accessors.$model = modelAccessor
var $vmodel = new Observer()
$vmodel = createViewModel($vmodel, accessors, definition)
for (key in keys) {
$vmodel[key] = keys[key]
if (key in $skipArray) {
delete keys[key]
} else {
keys[key] = true
}
}
initViewModel($vmodel, heirloom, keys, accessors, options)
return $vmodel
}
warlords.masterFactory = masterFactory
var empty = {}
function slaveFactory(before, after, heirloom, options) {
var keys = {}
var skips = {}
var accessors = {}
heirloom = heirloom || {}
var pathname = options.pathname
var resue = before.$accessors || {}
var key, sid, spath
for (key in after) {
if ($$skipArray[key])
continue
keys[key] = true
if (!isSkip(key, after[key], empty)) {
if (resue[key]) {
accessors[key] = resue[key]
} else {
sid = options.id + '.' + key
spath = pathname ? pathname + '.' + key : key
accessors[key] = makeAccessor(sid, spath, heirloom)
}
} else {
skips[key] = after[key]
delete after[key]
}
}
options.hashcode = before.$hashcode || makeHashCode('$')
accessors.$model = modelAccessor
var $vmodel = new Observer()
$vmodel = createViewModel($vmodel, accessors, skips)
for (key in skips) {
$vmodel[key] = skips[key]
}
initViewModel($vmodel, heirloom, keys, accessors, options)
return $vmodel
}
warlords.slaveFactory = slaveFactory
function mediatorFactory(before, after) {
var keys = {}, key
var accessors = {}
var unresolve = {}
var heirloom = {}
var arr = avalon.slice(arguments)
var $skipArray = {}
var isWidget = typeof this === 'function' && this.isWidget
var config
var configName
for (var i = 0; i < arr.length; i++) {
var obj = arr[i]
var $accessors = obj.$accessors
for (var key in obj) {
if (!obj.hasOwnProperty(key)) {
continue
}
var cur = obj[key]
if (key === '$skipArray') {
if (Array.isArray(cur)) {
cur.forEach(function (el) {
$skipArray[el] = 1
})
}
continue
}
if (isWidget && arr.indexOf(cur) !== -1) {
config = cur
configName = key
continue
}
keys[key] = cur
if (accessors[key] && avalon.isObject(cur)) {
delete accessors[key]
}
if ($accessors && $accessors[key]) {
accessors[key] = $accessors[key]
} else if (typeof keys[key] !== 'function') {
unresolve[key] = 1
}
}
}
if (typeof this === 'function') {
this(keys, unresolve)
}
for (key in unresolve) {
if ($$skipArray[key] || accessors[key])
continue
if (!isSkip(key, keys[key], $skipArray)) {
accessors[key] = makeAccessor(before.$id, key, heirloom)
accessors[key].set(keys[key])
}
}
var $vmodel = new Observer()
$vmodel = createViewModel($vmodel, accessors, keys)
for (key in keys) {
if (!accessors[key]) {
$vmodel[key] = keys[key]
}
if (isWidget && config && accessors[key] && config.hasOwnProperty(key)) {
var GET = accessors[key].get
if (!GET.$decompose) {
GET.$decompose = {}
}
GET.$decompose[configName + '.' + key] = $vmodel
}
if (key in $$skipArray) {
delete keys[key]
} else {
keys[key] = true
}
}
initViewModel($vmodel, heirloom, keys, accessors, {
id: before.$id,
hashcode: makeHashCode('$'),
master: true
})
return $vmodel
}
avalon.mediatorFactory = mediatorFactory
function update(vdom, update, hookName) {
if (hookName) {
vdom.afterChange = vdom.afterChange || []
avalon.Array.ensure(vdom.afterChange, update)
} else {
var dom = vdom.dom
update(vdom.dom, vdom, dom && dom.parentNode)
}
}
avalon.directive('important', {
priority: 1,
parse: function (copy, src, binding) {
var quoted = quote(binding.expr)
copy.local = '{}'
copy.vmodel = '__vmodel__'
copy[binding.name] = 1
src.$prepend = ['(function(__top__){',
'var __i = avalon.scopes[' + quoted + ']',
'var ok = !__i || __i.vmodel === __top__',
'if( !ok ){',
'vnodes.push({skipContent:true,nodeName:"' + copy.nodeName + '"})',
'avalon.log("不进入"+' + quoted + ');return }',
'var __vmodel__ = avalon.vmodels[' + quoted + '];'
].join('\n') + '\n'
src.$append = '\n})(__vmodel__);'
},
diff: function (copy, src, name) {
if (!src.dynamic[name]) {
src.local = copy.local
src.vmodel = copy.vmodel
update(src, this.update)
}
},
update: function (dom, vdom, parent) {
avalon.directives.controller.update(dom, vdom, parent, 'important')
}
})
var cacheMediator = {}
avalon.mediatorFactoryCache = function (top, $id) {
var vm = avalon.vmodels[$id]
if (vm && top && vm !== top) {
var a = top.$hashcode
var b = vm.$hashcode
var id = a + b
if (cacheMediator[id]) {
return cacheMediator[id]
}
var c = avalon.mediatorFactory(top, vm)
return cacheMediator[id] = c
} else {
return top
}
}
avalon.directive('controller', {
priority: 2,
parse: function (copy, src, binding) {
var quoted = quote(binding.expr)
copy.local = '__local__'
copy.vmodel = '__vmodel__'
copy[binding.name] = 1
src.$prepend = '(function(__top__){\n' +
'var __vmodel__ = avalon.mediatorFactoryCache(__top__,' + quoted + ')\n'
src.$append = '\n})(__vmodel__);'
},
diff: function (copy, src, name) {
if (!src.dynamic[name]) {
src.local = copy.local
src.vmodel = copy.vmodel
update(src, this.update)
}
},
update: function (dom, vdom, parent, important) {
var vmodel = vdom.vmodel
var local = vdom.local
var name = important ? 'ms-important' : 'ms-controller'
vdom.dynamic[name] = 1
var id = vdom.props[name]
var scope = avalon.scopes[id]
if (scope) {
return
}
var top = avalon.vmodels[id]
if (vmodel.$element && vmodel.$element.vtree[0] === vdom) {
var render = vmodel.$render
} else {
render = avalon.render([vdom], local)
}
vmodel.$render = render
vmodel.$element = dom
dom.vtree = [vdom]
if (top !== vmodel) {
top.$render = top.$render || render
top.$element = top.$element || dom
}
var needFire = important ? vmodel : top
var scope = avalon.scopes[id] = {
vmodel: vmodel,
local: local
}
update(vdom, function () {
avalon(dom).removeClass('ms-controller')
dom.setAttribute('wid', id)
if (avalon._disposeComponent)
avalon._disposeComponent(dom)
var events = needFire.$events["onReady"]
if (events) {
needFire.$fire('onReady')
delete needFire.$events.onReady
}
scope.isMount = true
}, 'afterChange')
}
})
var cssDir = avalon.directive('css', {
diff: function (copy, src, name) {
var a = copy[name]
var p = src[name]
if (Object(a) === a) {
a = a.$model || a
if (Array.isArray(a)) {
var b = {}
a.forEach(function (el) {
el && avalon.shadowCopy(b, el)
})
a = b
}
var hasChange = false
if (!src.dynamic[name] || !p) {
src[name] = a
hasChange = true
} else {
var patch = {}
for (var i in a) {
if (a[i] !== p[i]) {
hasChange = true
}
patch[i] = a[i]
}
for (var i in p) {
if (!(i in patch)) {
hasChange = true
patch[i] = ''
}
}
src[name] = patch
}
if (hasChange) {
if (name === 'ms-effect') {
src[name] = a
}
update(src, this.update)
}
}
delete copy[name]
},
update: function (dom, vdom) {
if (dom && dom.nodeType === 1) {
var wrap = avalon(dom)
vdom.dynamic['ms-css'] = 1
var change = vdom['ms-css']
for (var name in change) {
wrap.css(name, change[name])
}
}
}
})
var cssDiff = cssDir.diff
avalon.directive('attr', {
diff: cssDiff,
update: attrUpdate
})
var none = 'none'
function parseDisplay(elem, val) {
var doc = elem.ownerDocument
var nodeName = elem.nodeName
var key = '_' + nodeName
if (!parseDisplay[key]) {
var temp = doc.body.appendChild(doc.createElement(nodeName))
val = avalon.css(temp, 'display')
doc.body.removeChild(temp)
if (val === none) {
val = 'block'
}
parseDisplay[key] = val
}
return parseDisplay[key]
}
avalon.parseDisplay = parseDisplay
avalon.directive('visible', {
diff: function (copy, src, name) {
var c = !!copy[name]
if (!src.dynamic[name] || c !== src[name]) {
src[name] = c
update(src, this.update)
}
},
update: function (dom, vdom) {
if (dom && dom.nodeType === 1) {
vdom.dynamic['ms-visible'] = 1
var show = vdom['ms-visible']
var display = dom.style.display
var value
if (show) {
if (display === none) {
value = vdom.displayValue
if (!value) {
dom.style.display = ''
}
}
if (dom.style.display === '' && avalon(dom).css('display') === none &&
avalon.contains(dom.ownerDocument, dom)) {
value = parseDisplay(dom)
}
} else {
if (display !== none) {
value = none
vdom.displayValue = display
}
}
var cb = function () {
if (value !== void 0) {
dom.style.display = value
}
}
avalon.applyEffect(dom, vdom, {
hook: show ? 'onEnterDone' : 'onLeaveDone',
cb: cb
})
}
}
})
avalon.directive('expr', {
parse: avalon.noop
})
avalon.directive('text', {
parse: function (copy, src, binding) {
copy[binding.name] = 1
src.children = []
copy.children = '[{\nnodeName:"#text",\ndynamic:true,' +
'\nnodeValue:avalon.parsers.string(' +
avalon.parseExpr(binding) + ')}]'
},
diff: function (copy, src) {
if (!src.children.length) {
update(src, this.update)
}
},
update: function (dom, vdom) {
if (dom && !vdom.isVoidTag) {
var parent = dom
while (parent.firstChild) {
parent.removeChild(parent.firstChild)
}
var dom = document.createTextNode('x')
parent.appendChild(dom)
var a = { nodeType: 3, nodeName: '#text', dom: dom }
vdom.children.push(a)
}
}
})
avalon.directive('html', {
parse: function (copy, src, binding) {
if (!src.isVoidTag) {
copy[binding.name] = avalon.parseExpr(binding)
copy.vmodel = '__vmodel__'
copy.local = '__local__'
} else {
copy.children = '[]'
}
},
diff: function (copy, src, name) {
var copyValue = copy[name] + ''
if (!src.dynamic['ms-html'] || !src.render || copyValue !== src[name]) {
src[name] = copyValue
var oldTree = avalon.speedUp(avalon.lexer(copyValue))
var render = avalon.render(oldTree, copy.local)
src.render = render
var newTree = render(copy.vmodel, copy.local)
src.children = copy.children = newTree
update(src, this.update)
} else if (src.render) {
var newTree = src.render(copy.vmodel, copy.local)
copy.children = newTree
}
},
update: function (dom, vdom) {
vdom.dynamic['ms-html'] = 1
avalon.clearHTML(dom)
dom.appendChild(avalon.domize(vdom.children))
}
})
function classNames() {
var classes = []
for (var i = 0; i < arguments.length; i++) {
var arg = arguments[i]
var argType = typeof arg
if (argType === 'string' || argType === 'number' || arg === true) {
classes.push(arg)
} else if (Array.isArray(arg)) {
classes.push(classNames.apply(null, arg))
} else if (argType === 'object') {
for (var key in arg) {
if (arg.hasOwnProperty(key) && arg[key]) {
classes.push(key)
}
}
}
}
return classes.join(' ')
}
avalon.directive('class', {
diff: function (copy, src, name) {
var type = name.slice(3)
var copyValue = copy[name]
var srcValue = src[name] || ''
var classEvent = src.classEvent || {}
if (type === 'hover') {
classEvent.mouseenter = activateClass
classEvent.mouseleave = abandonClass
} else if (type === 'active') {
src.props.tabindex = copy.props.tabindex || -1
classEvent.tabIndex = src.props.tabindex
classEvent.mousedown = activateClass
classEvent.mouseup = abandonClass
classEvent.mouseleave = abandonClass
}
src.classEvent = classEvent
var className = classNames(copyValue)
if (!src.dynamic[name] || srcValue !== className) {
src[name] = className
src['change-' + type] = className
update(src, this.update, type)
}
},
update: function (dom, vdom) {
if (!dom || dom.nodeType !== 1)
return
var classEvent = vdom.classEvent
if (classEvent) {
for (var i in classEvent) {
if (i === 'tabIndex') {
dom[i] = classEvent[i]
} else {
avalon.bind(dom, i, classEvent[i])
}
}
vdom.classEvent = {}
}
var names = ['class', 'hover', 'active']
names.forEach(function (type) {
var name = 'change-' + type
var value = vdom[name]
if (value === void 0)
return
vdom.dynamic['ms-' + type] = 1
if (type === 'class') {
dom && setClass(dom, vdom)
} else {
var oldType = dom.getAttribute('change-' + type)
if (oldType) {
avalon(dom).removeClass(oldType)
}
dom.setAttribute(name, value)
}
})
}
})
directives.active = directives.hover = directives['class']
var classMap = {
mouseenter: 'change-hover',
mouseleave: 'change-hover',
mousedown: 'change-active',
mouseup: 'change-active'
}
function activateClass(e) {
var elem = e.target
avalon(elem).addClass(elem.getAttribute(classMap[e.type]) || '')
}
function abandonClass(e) {
var elem = e.target
var name = classMap[e.type]
avalon(elem).removeClass(elem.getAttribute(name) || '')
if (name !== 'change-active') {
avalon(elem).removeClass(elem.getAttribute('change-active') || '')
}
}
function setClass(dom, vdom) {
var old = dom.getAttribute('old-change-class')
var neo = vdom['ms-class']
if (old !== neo) {
avalon(dom).removeClass(old).addClass(neo)
dom.setAttribute('old-change-class', neo)
}
}
markID(activateClass)
markID(abandonClass)
var rmson = /^ms\-on\-(\w+)/
avalon.directive('on', {
priority: 3000,
parse: function (copy, src, binding) {
var underline = binding.name.replace('ms-on-', 'e').replace('-', '_')
var uuid = underline + '_' + binding.expr.
replace(/\s/g, '').
replace(/[^$a-z]/ig, function (e) {
return e.charCodeAt(0)
})
var quoted = avalon.quote(uuid)
var fn = '(function(){\n' +
'var fn610 = ' +
avalon.parseExpr(binding) +
'\nfn610.uuid =' + quoted + ';\nreturn fn610})()'
copy.vmodel = '__vmodel__'
copy.local = '__local__'
copy[binding.name] = fn
},
diff: function (copy, src, name) {
var fn = copy[name]
var uuid = fn.uuid
var srcFn = src[name] || {}
var hasChange = false
if (!src.dynamic[name] || srcFn.uuid !== uuid) {
src[name] = fn
avalon.eventListeners[uuid] = fn
hasChange = true
}
if (diffObj(src.local || {}, copy.local)) {
hasChange = true
}
if (hasChange) {
src.local = copy.local
src.vmodel = copy.vmodel
update(src, this.update)
} else if (src.dom) {
src.dom._ms_local = copy.local
}
},
update: function (dom, vdom) {
if (dom && dom.nodeType === 1) {
var key, listener
dom._ms_context_ = vdom.vmodel
dom._ms_local = vdom.local
for (key in vdom) {
var match = key.match(rmson)
if (match) {
listener = vdom[key]
vdom.dynamic[key] = 1
avalon.bind(dom, match[1], listener)
}
}
}
}
})
function diffObj(a, b) {
for (var i in a) {
if (a[i] !== b[i]) {
return true
}
}
return false
}
var keyMap = avalon.oneObject("break,case,catch,continue,debugger,default,delete,do,else,false," +
"finally,for,function,if,in,instanceof,new,null,return,switch,this," +
"throw,true,try,typeof,var,void,while,with," +
"abstract,boolean,byte,char,class,const,double,enum,export,extends," +
"final,float,goto,implements,import,int,interface,long,native," +
"package,private,protected,public,short,static,super,synchronized," +
"throws,transient,volatile")
avalon.keyMap = keyMap
var quoted = {
nodeName: 1,
forExpr: 1,
type: 1,
template: 1,
nodeValue: 1,
signature: 1,
wid: 1
}
var rneedQuote = /[W\:-]/
function fixKey(k) {
return (rneedQuote.test(k) || keyMap[k]) ? quote(k) : k
}
function stringify(obj) {
var arr1 = []
for (var i in obj) {
var type = typeof obj[i]
if (type === 'object') {
if (i === 'props') {
var arr2 = []
for (var k in obj.props) {
var kv = obj.props[k]
if (typeof kv === 'string') {
kv = quote(kv)
}
arr2.push(fixKey(k) + ': ' + kv)
}
arr1.push(i + ': {' + arr2.join(',\n') + '}')
} else if (i === 'children') {
arr1.push('children: [' + obj[i].map(function (a) {
return stringify(a)
}) + ']')
}
} else if (obj.hasOwnProperty(i)) {
var v = obj[i]
if (type === 'string') {
v = quoted[i] ? quote(v) : v
}
arr1.push(fixKey(i) + ':' + v)
}
}
return '{\n' + arr1.join(',\n') + '}'
}
var updateModelMethods = {
input: function (prop) {
var data = this
prop = prop || 'value'
var dom = data.dom
var rawValue = dom[prop]
var parsedValue = data.parse(rawValue)
data.value = rawValue
data.set(data.vmodel, parsedValue)
callback(data)
var pos = data.pos
if (dom.caret) {
data.setCaret(dom, pos)
}
},
radio: function () {
var data = this
if (data.isChecked) {
var val = !data.value
data.set(data.vmodel, val)
callback(data)
} else {
updateModelMethods.input.call(data)
data.value = NaN
}
},
checkbox: function () {
var data = this
var array = data.value
if (!Array.isArray(array)) {
avalon.warn('ms-duplex应用于checkbox上要对应一个数组')
array = [array]
}
var method = data.dom.checked ? 'ensure' : 'remove'
if (array[method]) {
var val = data.parse(data.dom.value)
array[method](val)
callback(data)
}
},
select: function () {
var data = this
var val = avalon(data.dom).val()
if (val + '' !== this.value + '') {
if (Array.isArray(val)) {
val = val.map(function (v) {
return data.parse(v)
})
} else {
val = data.parse(val)
}
data.set(data.vmodel, val)
callback(data)
}
},
contenteditable: function () {
updateModelMethods.input.call(this, 'innerHTML')
}
}
function callback(data) {
if (data.callback) {
data.callback.call(data.vmodel, {
type: 'changed',
target: data.dom
}, data.local)
}
}
function updateModelHandle(event) {
var elem = this
var field = this.__ms_duplex__
if (elem.composing) {
return
}
if (elem.value === field.value) {
return
}
if (elem.caret) {
try {
var pos = field.getCaret(elem)
field.pos = pos
} catch (e) {
}
}
if (field.debounceTime > 4) {
var timestamp = new Date()
var left = timestamp - field.time || 0
field.time = timestamp
if (left >= field.debounceTime) {
updateModelMethods[field.type].call(field)
} else {
clearTimeout(field.debounceID)
field.debounceID = setTimeout(function () {
updateModelMethods[field.type].call(field)
}, left)
}
} else {
updateModelMethods[field.type].call(field)
}
}
var msie = avalon.msie
function updateModelByEvent(node, vnode) {
var events = {}
var data = vnode['ms-duplex']
data.update = updateModelHandle
switch (data.type) {
case 'radio':
case 'checkbox':
events.click = updateModelHandle
break
case 'select':
events.change = updateModelHandle
break
case 'contenteditable':
if (data.isChanged) {
events.blur = updateModelHandle
} else {
if (avalon.modern) {
if (win.webkitURL) {
events.webkitEditableContentChanged = updateModelHandle
} else if (win.MutationEvent) {
events.DOMCharacterDataModified = updateModelHandle
}
events.input = updateModelHandle
} else {
events.keydown = updateModelKeyDown
events.paste = updateModelDelay
events.cut = updateModelDelay
events.focus = closeComposition
events.blur = openComposition
}
}
break
case 'input':
if (data.isChanged) {
events.change = updateModelHandle
} else {
if (msie) {
events.keyup = updateModelKeyDown
}
if (msie < 9) {
events.propertychange = updateModelHack
events.paste = updateModelDelay
events.cut = updateModelDelay
} else {
events.input = updateModelHandle
}
if (!msie || msie > 9) {
events.compositionstart = openComposition
events.compositionend = closeComposition
}
if (!msie) {
if (!/\[native code\]/.test(win.Int8Array)) {
events.keydown = updateModelKeyDown
events.paste = updateModelDelay
events.cut = updateModelDelay
if (win.netscape) {
events.DOMAutoComplete = updateModelHandle
}
}
}
}
break
}
if (/password|text/.test(vnode.props.type)) {
events.focus = openCaret
events.blur = closeCaret
data.getCaret = getCaret
data.setCaret = setCaret
}
for (var name in events) {
avalon.bind(node, name, events[name])
}
}
function updateModelHack(e) {
if (e.propertyName === 'value') {
updateModelHandle.call(this, e)
}
}
function updateModelDelay(e) {
var elem = this
setTimeout(function () {
updateModelHandle.call(elem, e)
}, 0)
}
function openCaret() {
this.caret = true
}
function closeCaret() {
this.caret = false
}
function openComposition() {
this.composing = true
}
function closeComposition(e) {
this.composing = false
updateModelDelay.call(this, e)
}
function updateModelKeyDown(e) {
var key = e.keyCode
if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40))
return
updateModelHandle.call(this, e)
}
markID$1(openCaret)
markID$1(closeCaret)
markID$1(openComposition)
markID$1(closeComposition)
markID$1(updateModelHandle)
markID$1(updateModelHack)
markID$1(updateModelDelay)
markID$1(updateModelKeyDown)
var mayBeAsync = function (fn) {
setTimeout(fn, 0)
}
var setCaret = function (target, cursorPosition) {
var range
if (target.createTextRange) {
mayBeAsync(function () {
target.focus()
range = target.createTextRange()
range.collapse(true)
range.moveEnd('character', cursorPosition)
range.moveStart('character', cursorPosition)
range.select()
})
} else {
target.focus()
if (target.selectionStart !== undefined) {
target.setSelectionRange(cursorPosition, cursorPosition)
}
}
}
var getCaret = function (target) {
var start = 0
var normalizedValue
var range
var textInputRange
var len
var endRange
if (typeof target.selectionStart == 'number' && typeof target.selectionEnd == 'number') {
start = target.selectionStart
} else {
range = doc$1.selection.createRange()
if (range && range.parentElement() == target) {
len = target.value.length
normalizedValue = target.value.replace(/\r\n/g, '\n')
textInputRange = target.createTextRange()
textInputRange.moveToBookmark(range.getBookmark())
endRange = target.createTextRange()
endRange.collapse(false)
if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
start = len
} else {
start = -textInputRange.moveStart('character', -len)
start += normalizedValue.slice(0, start).split('\n').length - 1
}
}
}
return start
}
var valueHijack = false
try {
var setters = {}
var aproto = HTMLInputElement.prototype
var bproto = HTMLTextAreaElement.prototype
var newSetter = function (value) {
setters[this.tagName].call(this, value)
var data = this.__ms_duplex__
if (!this.caret && data && data.isString) {
data.update.call(this, { type: 'setter' })
}
}
var inputProto = HTMLInputElement.prototype
Object.getOwnPropertyNames(inputProto)
setters['INPUT'] = Object.getOwnPropertyDescriptor(aproto, 'value').set
Object.defineProperty(aproto, 'value', {
set: newSetter
})
setters['TEXTAREA'] = Object.getOwnPropertyDescriptor(bproto, 'value').set
Object.defineProperty(bproto, 'value', {
set: newSetter
})
valueHijack = true
} catch (e) {
}
var updateView = {
input: function () {
this.dom.value = this.value
},
radio: function () {
var checked
if (this.isChecked) {
checked = !!this.value
} else {
checked = this.value + '' === this.dom.value
}
var dom = this.dom
if (avalon.msie === 6) {
setTimeout(function () {
dom.defaultChecked = checked
dom.checked = checked
}, 31)
} else {
dom.checked = checked
}
},
checkbox: function () {
var checked = false
var dom = this.dom
var value = dom.value
for (var i = 0; i < this.value.length; i++) {
var el = this.value[i]
if (el + '' === value) {
checked = true
}
}
dom.checked = checked
},
select: function () {
var a = Array.isArray(this.value) ?
this.value.map(String) : this.value + ''
avalon(this.dom).val(a)
},
contenteditable: function () {
this.dom.innerHTML = this.value
this.update.call(this.dom)
}
}
function addField(node, vnode) {
var field = node.__ms_duplex__
var rules = vnode['ms-rules']
if (rules && !field.validator) {
while (node && node.nodeType === 1) {
var validator = node._ms_validator_
if (validator) {
field.rules = rules
field.validator = validator
if (avalon.Array.ensure(validator.fields, field)) {
validator.addField(field)
}
break
}
node = node.parentNode
}
}
}
var rchangeFilter = /\|\s*change\b/
var rcheckedType$1 = /^(?:checkbox|radio)$/
var rdebounceFilter = /\|\s*debounce(?:\(([^)]+)\))?/
var duplexDir = 'ms-duplex'
avalon.directive('duplex', {
priority: 2000,
parse: function (copy, src, binding) {
var expr = binding.expr
var etype = src.props.type
var parsers = binding.param, dtype
var isChecked = false
parsers = parsers ? parsers.split('-').map(function (a) {
if (a === 'checked') {
isChecked = true
}
return a
}) : []
if (rcheckedType$1.test(etype) && isChecked) {
parsers = []
dtype = 'radio'
}
if (!/input|textarea|select/.test(src.nodeName)) {
if ('contenteditable' in src.props) {
dtype = 'contenteditable'
}
} else if (!dtype) {
dtype = src.nodeName === 'select' ? 'select' :
etype === 'checkbox' ? 'checkbox' :
etype === 'radio' ? 'radio' :
'input'
}
var isChanged = false, debounceTime = 0
if (dtype === 'input' || dtype === 'contenteditable') {
var isString = true
if (rchangeFilter.test(expr)) {
isChanged = true
}
if (!isChanged) {
var match = expr.match(rdebounceFilter)
if (match) {
debounceTime = parseInt(match[1], 10) || 300
}
}
}
var changed = copy.props['data-duplex-changed']
var get = avalon.parseExpr(binding)
var quoted = parsers.map(function (a) {
return avalon.quote(a)
})
copy[duplexDir] = stringify({
type: dtype,
vmodel: '__vmodel__',
local: '__local__',
debug: avalon.quote(binding.name + '=' + binding.expr),
isChecked: isChecked,
parsers: '[' + quoted + ']',
isString: !!isString,
isChanged: isChanged,
debounceTime: debounceTime,
get: get,
set: avalon.evaluatorPool.get('duplex:set:' + expr),
callback: changed ? avalon.parseExpr({ expr: changed, type: 'on' }) : 'avalon.noop'
})
},
diff: function (copy, src) {
if (!src.dynamic[duplexDir]) {
var data = src[duplexDir] = copy[duplexDir]
data.parse = parseValue
} else {
data = src[duplexDir]
}
if (copy !== src) {
copy[duplexDir] = null
}
var curValue = data.get(data.vmodel)
var preValue = data.value
if (data.isString) {
curValue = data.parse(curValue)
curValue += ''
if (curValue === preValue) {
return
}
} else if (Array.isArray(curValue)) {
var hack = true
if (curValue + '' === data.arrayHack) {
return
}
}
data.value = curValue
if (hack) {
data.arayHack = curValue + ''
}
update(src, this.update, 'afterChange')
},
update: function (dom, vdom) {
if (dom && dom.nodeType === 1) {
vdom.dynamic[duplexDir] = 1
if (!dom.__ms_duplex__) {
dom.__ms_duplex__ = avalon.mix(vdom[duplexDir], { dom: dom })
updateModelByEvent(dom, vdom)
addField(dom, vdom)
}
var data = dom.__ms_duplex__
data.dom = dom
if (data.isString
&& !avalon.msie
&& valueHijack === false
&& !dom.valueHijack) {
dom.valueHijack = updateModelHandle
var intervalID = setInterval(function () {
if (!avalon.contains(avalon.root, dom)) {
clearInterval(intervalID)
} else {
dom.valueHijack({ type: 'poll' })
}
}, 30)
}
updateView[data.type].call(data)
}
}
})
function parseValue(val) {
for (var i = 0, k; k = this.parsers[i++];) {
var fn = avalon.parsers[k]
if (fn) {
val = fn.call(this, val)
}
}
return val
}
var valiDir = avalon.directive('validate', {
diff: function (copy, src, name) {
var validator = copy[name]
var p = src[name]
if (p && p.onError && p.addField) {
return
} else if (Object(validator) === validator) {
src.vmValidator = validator
if (validator.$id) {
validator = validator.$model
}
src[name] = validator
for (var name in valiDir.defaults) {
if (!validator.hasOwnProperty(name)) {
validator[name] = valiDir.defaults[name]
}
}
validator.fields = validator.fields || []
update(src, this.update)
}
},
update: function (dom, vdom) {
var validator = vdom['ms-validate']
dom._ms_validator_ = validator
validator.dom = dom
var v = vdom.vmValidator
try {
v.onManual = onManual
} catch (e) {
}
delete vdom.vmValidator
dom.setAttribute('novalidate', 'novalidate')
function onManual() {
valiDir.validateAll.call(validator, validator.onValidateAll)
}
if (validator.validateAllInSubmit) {
avalon.bind(dom, 'submit', function (e) {
e.preventDefault()
onManual()
})
}
if (typeof validator.onInit === 'function') {
validator.onInit.call(dom, {
type: 'init',
target: dom,
validator: validator
})
}
},
validateAll: function (callback) {
var validator = this
var fn = typeof callback === 'function' ? callback : validator.onValidateAll
var promise = validator.fields.filter(function (field) {
var el = field.dom
return el && !el.disabled && validator.dom.contains(el)
}).map(function (field) {
return valiDir.validate(field, true)
})
return Promise.all(promise).then(function (array) {
var reasons = array.concat.apply([], array)
if (validator.deduplicateInValidateAll) {
var uniq = {}
reasons = reasons.filter(function (reason) {
var el = reason.element
var uuid = el.uniqueID || (el.uniqueID = setTimeout('1'))
if (uniq[uuid]) {
return false
} else {
return uniq[uuid] = true
}
})
}
fn.call(validator.dom, reasons)
})
},
addField: function (field) {
var validator = this
var node = field.dom
if (validator.validateInKeyup && (!field.isChanged && !field.debounceTime)) {
avalon.bind(node, 'keyup', function (e) {
validator.validate(field, 0, e)
})
}
if (validator.validateInBlur) {
avalon.bind(node, 'blur', function (e) {
validator.validate(field, 0, e)
})
}
if (validator.resetInFocus) {
avalon.bind(node, 'focus', function (e) {
validator.onReset.call(node, e, field)
})
}
},
validate: function (field, isValidateAll, event) {
var promises = []
var value = field.value
var elem = field.dom
var validator = field.validator
if (typeof Promise !== 'function') {
avalon.error('please npm install avalon-promise or bluebird')
}
if (elem.disabled)
return
var rules = field.rules
if (!(rules.norequired && value === '')) {
for (var ruleName in rules) {
var ruleValue = rules[ruleName]
if (ruleValue === false)
continue
var hook = avalon.validators[ruleName]
var resolve, reject
promises.push(new Promise(function (a, b) {
resolve = a
reject = b
}))
var next = function (a) {
if (a) {
resolve(true)
} else {
var reason = {
element: elem,
data: field.data,
message: elem.getAttribute('data-' + ruleName + '-message') || elem.getAttribute('data-message') || hook.message,
validateRule: ruleName,
getMessage: getMessage
}
resolve(reason)
}
}
field.data = {}
field.data[ruleName] = ruleValue
hook.get(value, field, next)
}
}
return Promise.all(promises).then(function (array) {
var reasons = array.filter(function (el) {
return typeof el === 'object'
})
if (!isValidateAll) {
if (reasons.length) {
validator.onError.call(elem, reasons, event)
} else {
validator.onSuccess.call(elem, reasons, event)
}
validator.onComplete.call(elem, reasons, event)
}
return reasons
})
}
})
var rformat = /\\?{{([^{}]+)\}}/gm
function getMessage() {
var data = this.data || {}
return this.message.replace(rformat, function (_, name) {
return data[name] == null ? '' : data[name]
})
}
valiDir.defaults = {
addField: valiDir.addField,
onError: avalon.noop,
onSuccess: avalon.noop,
onComplete: avalon.noop,
onManual: avalon.noop,
onReset: avalon.noop,
onValidateAll: avalon.noop,
validateInBlur: true,
validateInKeyup: true,
validateAllInSubmit: true,
resetInFocus: true,
deduplicateInValidateAll: false
}
avalon.directive('rules', {
diff: function (copy, src, name) {
var neo = copy[name]
if (neo && Object.prototype.toString.call(neo) === '[object Object]') {
src[name] = neo.$model || neo
var field = src.dom && src.dom.__ms_duplex__
if (field) {
field.rules = copy[name]
}
}
}
})
function isRegExp(value) {
return avalon.type(value) === 'regexp'
}
var rmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i
var rurl = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
function isCorrectDate(value) {
if (typeof value === "string" && value) {
var arr = value.split("-")
if (arr.length === 3 && arr[0].length === 4) {
var year = ~~arr[0]
var month = ~~arr[1] - 1
var date = ~~arr[2]
var d = new Date(year, month, date)
return d.getFullYear() === year && d.getMonth() === month && d.getDate() === date
}
}
return false
}
avalon.shadowCopy(avalon.validators, {
pattern: {
message: '必须匹配{{pattern}}这样的格式',
get: function (value, field, next) {
var elem = field.dom
var data = field.data
if (!isRegExp(data.pattern)) {
var h5pattern = elem.getAttribute("pattern")
data.pattern = new RegExp('^(?:' + h5pattern + ')$')
}
next(data.pattern.test(value))
return value
}
},
digits: {
message: '必须整数',
get: function (value, field, next) {
next(/^\-?\d+$/.test(value))
return value
}
},
number: {
message: '必须数字',
get: function (value, field, next) {
next(!!value && isFinite(value))
return value
}
},
norequired: {
message: '',
get: function (value, field, next) {
next(true)
return value
}
},
required: {
message: '必须填写',
get: function (value, field, next) {
next(value !== '')
return value
}
},
equalto: {
message: '密码输入不一致',
get: function (value, field, next) {
var id = String(field.data.equalto)
var other = avalon(document.getElementById(id)).val() || ""
next(value === other)
return value
}
},
date: {
message: '日期格式不正确',
get: function (value, field, next) {
var data = field.data
if (isRegExp(data.date)) {
next(data.date.test(value))
} else {
next(isCorrectDate(value))
}
return value
}
},
url: {
message: 'URL格式不正确',
get: function (value, field, next) {
next(rurl.test(value))
return value
}
},
email: {
message: 'email格式不正确',
get: function (value, field, next) {
next(rmail.test(value))
return value
}
},
minlength: {
message: '最少输入{{minlength}}个字',
get: function (value, field, next) {
var num = parseInt(field.data.minlength, 10)
next(value.length >= num)
return value
}
},
maxlength: {
message: '最多输入{{maxlength}}个字',
get: function (value, field, next) {
var num = parseInt(field.data.maxlength, 10)
next(value.length <= num)
return value
}
},
min: {
message: '输入值不能小于{{min}}',
get: function (value, field, next) {
var num = parseInt(field.data.min, 10)
next(parseFloat(value) >= num)
return value
}
},
max: {
message: '输入值不能大于{{max}}',
get: function (value, field, next) {
var num = parseInt(field.data.max, 10)
next(parseFloat(value) <= num)
return value
}
},
chs: {
message: '必须是中文字符',
get: function (value, field, next) {
next(/^[\u4e00-\u9fa5]+$/.test(value))
return value
}
}
})
avalon.directive('if', {
priority: 6,
diff: function (copy, src, name, copys, sources, index) {
var cur = !!copy[name]
src[name] = cur
update(src, this.update)
},
update: function (dom, vdom, parent) {
var show = vdom['ms-if']
if (vdom.dynamic['ms-if']) {
vdom.dynamic['ms-if'] = vdom.nodeName
}
if (show) {
if (vdom.nodeName === '#comment') {
vdom.nodeName = vdom.dynamic['ms-if']
delete vdom.nodeValue
var comment = vdom.comment
if (!comment) {
return
}
parent = comment.parentNode
if (parent)
parent.replaceChild(dom, comment)
delete vdom.comment
avalon.applyEffect(dom, vdom, {
hook: 'onEnterDone'
})
}
} else {
if (!vdom.comment) {
vdom.comment = document.createComment('if')
}
vdom.nodeName = '#comment'
vdom.nodeValue = 'if'
avalon.applyEffect(dom, vdom, {
hook: 'onLeaveDone',
cb: function () {
if (!parent || parent.nodeType === 11) {
parent = dom.parentNode
if (!parent || parent.nodeType === 11) {
return
}
}
parent.replaceChild(vdom.comment, dom)
}
})
}
}
})
var rforAs = /\s+as\s+([$\w]+)/
var rident = /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
var rinvalid = /^(null|undefined|NaN|window|this|\$index|\$id)$/
var rargs = /[$\w_]+/g
function getTraceKey(item) {
var type = typeof item
return item && type === 'object' ? item.$hashcode : type + ':' + item
}
avalon._each = function (obj, fn, local, vnodes) {
var repeat = []
vnodes.push(repeat)
var arr = (fn + '').slice(0, 40).match(rargs)
arr.shift()
if (Array.isArray(obj)) {
for (var i = 0; i < obj.length; i++) {
iterator$1(i, obj[i], local, fn, arr[0], arr[1], repeat, true)
}
} else {
for (var i in obj) {
if (obj.hasOwnProperty(i)) {
iterator$1(i, obj[i], local, fn, arr[0], arr[1], repeat)
}
}
}
}
function iterator$1(index, item, vars, fn, k1, k2, repeat, isArray) {
var key = isArray ? getTraceKey(item) : index
var local = {}
local[k1] = index
local[k2] = item
for (var k in vars) {
if (!(k in local)) {
local[k] = vars[k]
}
}
fn(index, item, key, local, repeat)
}
avalon.directive('for', {
priority: 3,
parse: function (copy, src) {
var str = src.forExpr, aliasAs
str = str.replace(rforAs, function (a, b) {
if (!rident.test(b) || rinvalid.test(b)) {
avalon.error('alias ' + b + ' is invalid --- must be a valid JS identifier which is not a reserved name.')
} else {
aliasAs = b
}
return ''
})
var arr = str.split(' in ')
var binding = {
expr: arr[1].trim(),
type: 'for'
}
var getLoop = avalon.parseExpr(binding)
var kv = (arr[0] + ' traceKey __local__ vnodes').match(rargs)
if (kv.length === 4) {
kv.unshift('$key')
}
src.$append = Array('var loop = ' + getLoop + ';',
'avalon._each(loop, function(' + kv + '){',
'__local__[' + quote(aliasAs || 'valueOf') + '] = loop',
'vnodes.push({',
'\tnodeName: "#document-fragment",',
'\tindex   : arguments[0],',
'\tkey     : traceKey,',
'\tchildren: new function(){\nvar vnodes = []\n').join('\n')
},
diff: function (copy, src, cpList, spList, index) {
if (avalon.callArray) {
if (src.list && src.forExpr.indexOf(avalon.callArray) === -1) {
return
}
}
var srcRepeat = spList[index + 1]
var curRepeat = cpList[index + 1]
var end = cpList[index + 2]
var cache = src.cache || {}
var i, c, p
var removes = []
if (!srcRepeat.length) {
src.action = 'init'
spList[index + 1] = curRepeat
curRepeat.forEach(function (c, i) {
srcRepeat[i] = c
saveInCache(cache, c)
})
src.cache = cache
} else if (srcRepeat === curRepeat) {
curRepeat.forEach(function (c) {
c.action = 'move'
saveInCache(cache, c)
})
src.cache = cache
var noUpdate = true
} else {
src.action = 'update'
var newCache = {}
var fuzzy = []
for (i = 0; c = curRepeat[i]; i++) {
var p = isInCache(cache, c.key)
if (p) {
p.oldIndex = p.index
p.index = c.index
saveInCache(newCache, p)
} else {
fuzzy.push(c)
}
}
for (var i = 0, c; c = fuzzy[i]; i++) {
p = fuzzyMatchCache(cache, c.key)
if (p) {
p.oldIndex = p.index
p.index = c.index
p.key = c.key
} else {
p = c
srcRepeat.push(p)
}
saveInCache(newCache, p)
}
srcRepeat.sort(function (a, b) {
return a.index - b.index
})
src.cache = newCache
for (var i in cache) {
p = cache[i]
p.action = 'leave'
avalon.Array.remove(srcRepeat, p)
removes.push(p)
if (p.arr) {
p.arr.forEach(function (m) {
m.action = 'leave'
removes.push(m)
})
delete p.arr
}
}
}
if (removes.length > 1) {
removes.sort(function (a, b) {
return a.index - b.index
})
}
src.removes = removes
var cb = avalon.caches[src.wid]
var vm = copy.vmodel
if (end && cb) {
end.afterChange = [function (dom) {
cb.call(vm, {
type: 'rendered',
target: dom,
signature: src.signature
})
}]
}
if (!noUpdate) {
src.list = srcRepeat
update(src, this.update)
}
return true
},
update: function (dom, vdom, parent) {
if (vdom.action === 'init') {
var b = parent
parent = document.createDocumentFragment()
}
var before = dom
var signature = vdom.signature
for (var i = 0, item; item = vdom.removes[i++];) {
if (item.dom) {
delete item.split
if (vdom.hasEffect) {
!function (obj) {
var nodes = moveItem(obj)
var children = obj.children.concat()
obj.children.length = 0
applyEffects(nodes, children, {
hook: 'onLeaveDone',
staggerKey: signature + 'leave',
cb: function (node) {
if (node.parentNode) {
node.parentNode.removeChild(node)
}
}
})
} (item)
} else {
moveItem(item, 'add')
}
}
}
vdom.list.forEach(function (el, i) {
if (el.action === 'leave')
return
if (!el.dom) {
el.dom = avalon.domize(el)
}
var f = el.dom
if (el.oldIndex === void 0) {
if (vdom.hasEffect)
var nodes = avalon.slice(f.childNodes)
if (i === 0 && vdom.action === 'init') {
parent.appendChild(f)
} else {
parent.insertBefore(f, before.nextSibling)
}
if (vdom.hasEffect) {
applyEffects(nodes, el.children, {
hook: 'onEnterDone',
staggerKey: signature + 'enter'
})
}
} else if (el.index !== el.oldIndex) {
var nodes = moveItem(el, 'add')
parent.insertBefore(el.dom, before.nextSibling)
vdom.hasEffect && applyEffects(nodes, el.children, {
hook: 'onMoveDone',
staggerKey: signature + 'move'
})
}
before = el.split
})
if (vdom.action === 'init') {
b.insertBefore(parent, dom.nextSibling)
}
}
})
function moveItem(item, addToFragment) {
var nodes = item.children.map(function (el) {
return el['ms-if'] ? el.comment : el.dom
})
if (addToFragment) {
nodes.forEach(function (el) {
item.dom.appendChild(el)
})
}
return nodes
}
function fuzzyMatchCache(cache) {
var key
for (var id in cache) {
var key = id
break
}
if (key) {
return isInCache(cache, key)
}
}
function isInCache(cache, id) {
var c = cache[id]
if (c) {
var arr = c.arr
if (arr) {
var r = arr.pop()
if (!arr.length) {
c.arr = 0
}
return r
}
delete cache[id]
return c
}
}
function saveInCache(cache, component) {
var trackId = component.key
if (!cache[trackId]) {
cache[trackId] = component
} else {
var c = cache[trackId]
var arr = c.arr || (c.arr = [])
arr.push(component)
}
}
var applyEffects = function (nodes, vnodes, opts) {
vnodes.forEach(function (vdom, i) {
avalon.applyEffect(nodes[i], vdom, opts)
})
}
function effectDetect(transitionDuration, animationDuration, window) {
var checker = {
TransitionEvent: 'transitionend',
WebKitTransitionEvent: 'webkitTransitionEnd',
OTransitionEvent: 'oTransitionEnd',
otransitionEvent: 'otransitionEnd'
}
var tran
for (var name in checker) {
if (window[name]) {
tran = checker[name]
break
}
try {
var a = document.createEvent(name)
tran = checker[name]
break
} catch (e) {
}
}
if (typeof tran === 'string') {
var transition = true
var css = true
var transitionEndEvent = tran
}
checker = {
'AnimationEvent': 'animationend',
'WebKitAnimationEvent': 'webkitAnimationEnd'
}
var ani
for (name in checker) {
if (window[name]) {
ani = checker[name]
break
}
}
if (typeof ani === 'string') {
var animation = true
css = true
var animationEndEvent = ani
}
return {
css: css,
animation: animation,
transition: transition,
animationEndEvent: animationEndEvent,
transitionEndEvent: transitionEndEvent,
transitionDuration: transitionDuration,
animationDuration: animationDuration
}
}
var support = effectDetect(
avalon.cssName('transition-duration'),
avalon.cssName('animation-duration'),
avalon.window
)
avalon.directive('effect', {
priority: 5,
diff: function (copy, src, name) {
var is = copy[name]
if (typeof is === 'string') {
copy[name] = {
is: is
}
avalon.warn('ms-effect的指令值不再支持字符串,必须是一个对象')
}
cssDiff.call(this, copy, src, name, 'afterChange')
},
update: function (dom, vdom, parent, opts) {
if (dom && dom.nodeType === 1) {
var name = 'ms-effect'
var option = vdom[name] || opts || {}
vdom.dynamic[name] = 1
var type = option.is
if (!type) {
return avalon.warn('need is option')
}
var effects = avalon.effects
if (support.css && !effects[type]) {
avalon.effect(type)
}
var globalOption = effects[type]
if (!globalOption) {
return avalon.warn(type + ' effect is undefined')
}
var finalOption = {}
var action = option.action
if (typeof action === 'boolean') {
finalOption.action = action ? 'enter' : 'leave'
}
var Effect = avalon.Effect
var effect = new Effect(dom)
avalon.mix(finalOption, globalOption, option)
dom.animating = finalOption.action
if (finalOption.queue) {
animationQueue.push(function () {
effect[action](finalOption)
})
callNextAnimation()
} else {
setTimeout(function () {
effect[action](finalOption)
}, 4)
}
}
}
})
var animationQueue = []
function callNextAnimation() {
var fn = animationQueue[0]
if (fn) {
fn()
}
}
avalon.effect = function (name, opts) {
var definition = avalon.effects[name] = (opts || {})
if (support.css && definition.css !== false) {
patchObject(definition, 'enterClass', name + '-enter')
patchObject(definition, 'enterActiveClass', definition.enterClass + '-active')
patchObject(definition, 'leaveClass', name + '-leave')
patchObject(definition, 'leaveActiveClass', definition.leaveClass + '-active')
}
patchObject(definition, 'action', 'enter')
}
function patchObject(obj, name, value) {
if (!obj[name]) {
obj[name] = value
}
}
var Effect = function (el) {
this.el = el
}
avalon.Effect = Effect
Effect.prototype = {
enter: createAction('Enter'),
leave: createAction('Leave'),
move: createAction('Move')
}
var rsecond = /\d+s$/
function toMillisecond(str) {
var ratio = rsecond.test(str) ? 1000 : 1
return parseFloat(str) * ratio
}
function execHooks(options, name, el) {
var list = options[name]
list = Array.isArray(list) ? list : typeof list === 'function' ? [list] : []
list.forEach(function (fn) {
fn && fn(el)
})
}
var staggerCache = new Cache(128)
function createAction(action) {
var lower = action.toLowerCase()
return function (option) {
var elem = this.el
var $el = avalon(elem)
var isAnimateDone
var staggerTime = isFinite(option.stagger) ? option.stagger * 1000 : 0
if (staggerTime) {
if (option.staggerKey) {
var stagger = staggerCache.get(option.staggerKey) ||
staggerCache.put(option.staggerKey, {
count: 0,
items: 0
})
stagger.count++
stagger.items++
}
}
var staggerIndex = stagger && stagger.count || 0
var animationDone = function (e) {
var isOk = e !== false
if (--elem.__ms_effect_ === 0) {
avalon.unbind(elem, support.transitionEndEvent)
avalon.unbind(elem, support.animationEndEvent)
}
elem.animating = void 0
isAnimateDone = true
var dirWord = isOk ? 'Done' : 'Abort'
execHooks(option, 'on' + action + dirWord, elem)
if (stagger) {
if (--stagger.items === 0) {
stagger.count = 0
}
}
if (option.queue) {
animationQueue.shift()
callNextAnimation()
}
}
execHooks(option, 'onBefore' + action, elem)
if (option[lower]) {
option[lower](elem, function (ok) {
animationDone(ok !== false)
})
} else if (support.css) {
$el.addClass(option[lower + 'Class'])
if (lower === 'leave') {
$el.removeClass(option.enterClass + ' ' + option.enterActiveClass)
} else if (lower === 'enter') {
$el.removeClass(option.leaveClass + ' ' + option.leaveActiveClass)
}
if (!elem.__ms_effect_) {
$el.bind(support.transitionEndEvent, animationDone)
$el.bind(support.animationEndEvent, animationDone)
elem.__ms_effect_ = 1
} else {
elem.__ms_effect_++
}
setTimeout(function () {
isAnimateDone = avalon.root.offsetWidth === NaN
$el.addClass(option[lower + 'ActiveClass'])
var computedStyles = window.getComputedStyle(elem)
var tranDuration = computedStyles[support.transitionDuration]
var animDuration = computedStyles[support.animationDuration]
var time = toMillisecond(tranDuration) || toMillisecond(animDuration)
if (!time === 0) {
animationDone(false)
} else if (!staggerTime) {
setTimeout(function () {
if (!isAnimateDone) {
animationDone(false)
}
}, time + 32)
}
}, 17 + staggerTime * staggerIndex)
}
}
}
avalon.applyEffect = function (node, vnode, opts) {
var cb = opts.cb
var curEffect = vnode['ms-effect']
if (curEffect && node && node.nodeType === 1) {
var hook = opts.hook
var old = curEffect[hook]
if (cb) {
if (Array.isArray(old)) {
old.push(cb)
} else if (old) {
curEffect[hook] = [old, cb]
} else {
curEffect[hook] = [cb]
}
}
getAction(opts)
avalon.directives.effect.update(node, vnode, 0, avalon.shadowCopy({}, opts))
} else if (cb) {
cb(node)
}
}
function getAction(opts) {
if (!opts.acton) {
opts.action = opts.hook.replace(/^on/, '').replace(/Done$/, '').toLowerCase()
}
}
var stringNum = 0
var stringPool = {
map: {}
}
var rfill = /\?\?\d+/g
function dig(a) {
var key = '??' + stringNum++
stringPool.map[key] = a
return key + ' '
}
function fill(a) {
var val = stringPool.map[a]
return val
}
function clearString(str) {
var array = readString(str)
for (var i = 0, n = array.length; i < n; i++) {
str = str.replace(array[i], dig)
}
return str
}
function readString(str) {
var end, s = 0
var ret = []
for (var i = 0, n = str.length; i < n; i++) {
var c = str.charAt(i)
if (!end) {
if (c === "'") {
end = "'"
s = i
} else if (c === '"') {
end = '"'
s = i
}
} else {
if (c === '\\') {
i += 1
continue
}
if (c === end) {
ret.push(str.slice(s, i + 1))
end = false
}
}
}
return ret
}
function addTbody(nodes) {
var tbody, needAddTbody = false, count = 0, start = 0, n = nodes.length
for (var i = 0; i < n; i++) {
var node = nodes[i]
if (!tbody) {
if ((node.type || node.nodeName) === 'tr') {
tbody = {
nodeName: 'tbody',
children: []
}
tbody.children.push(node)
if (node.type) {
delete node.type
}
needAddTbody = true
if (start === 0)
start = i
nodes[i] = tbody
}
} else {
if (node.nodeName !== 'tr' && node.children) {
tbody = false
} else {
tbody.children.push(node)
count++
nodes[i] = 0
}
}
}
if (needAddTbody) {
for (i = start; i < n; i++) {
if (nodes[i] === 0) {
nodes.splice(i, 1)
i--
count--
if (count === 0) {
break
}
}
}
}
}
function variantSpecial(node, nodeName, innerHTML) {
switch (nodeName) {
case 'style':
case 'script':
case 'noscript':
case 'template':
case 'xmp':
node.children = [{
nodeName: '#text',
skipContent: true,
nodeValue: innerHTML
}]
break
case 'textarea':
var props = node.props
props.type = nodeName
props.value = innerHTML
node.children = [{
nodeName: '#text',
nodeValue: innerHTML
}]
break
case 'option':
node.children = [{
nodeName: '#text',
nodeValue: trimHTML(innerHTML)
}]
break
}
}
var rtrimHTML = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi
function trimHTML(v) {
return String(v).replace(rtrimHTML, '').trim()
}
var specialTag = avalon.oneObject('script,style,textarea,xmp,noscript,option,template')
var ropenTag = /^<([-A-Za-z0-9_]+)\s*([^>]*?)(\/?)>/
var rendTag = /^<\/([^>]+)>/
var rcontent = /\S/
function makeNode(str) {
stringPool.map = {}
str = clearString(str)
var stack = []
stack.last = function () {
return stack[stack.length - 1]
}
var ret = []
var breakIndex = 100000
do {
var node = false
if (str.charAt(0) !== '<') {
var i = str.indexOf('<')
i = i === -1 ? str.length : i
var nodeValue = str.slice(0, i).replace(rfill, fill)
str = str.slice(i)
node = {
nodeName: '#text',
nodeValue: nodeValue
}
if (rcontent.test(nodeValue)) {
makeChildren(node, stack, ret)
}
}
if (!node) {
var i = str.indexOf('<!--')
if (i === 0) {
var l = str.indexOf('-->')
if (l === -1) {
avalon.error('注释节点没有闭合' + str)
}
var nodeValue = str.slice(4, l).replace(rfill, fill)
str = str.slice(l + 3)
node = {
nodeName: '#comment',
nodeValue: nodeValue
}
makeChildren(node, stack, ret)
}
}
if (!node) {
var match = str.match(ropenTag)
if (match) {
var nodeName = match[1].toLowerCase()
var isVoidTag = voidTag[nodeName] || match[3] === '\/'
node = {
nodeName: nodeName,
props: {},
children: [],
isVoidTag: isVoidTag
}
var attrs = match[2]
if (attrs) {
makeProps(attrs, node.props)
}
makeChildren(node, stack, ret)
str = str.slice(match[0].length)
if (isVoidTag) {
node.end = true
} else {
stack.push(node)
if (specialTag[nodeName]) {
var index = str.indexOf('</' + nodeName + '>')
var innerHTML = str.slice(0, index).trim()
str = str.slice(index)
variantSpecial(node, nodeName, nomalString(innerHTML))
}
}
}
}
if (!node) {
var match = str.match(rendTag)
if (match) {
var nodeName = match[1].toLowerCase()
var last = stack.last()
if (!last) {
avalon.error(match[0] + '前面缺少<' + nodeName + '>')
} else if (last.nodeName !== nodeName) {
avalon.error(last.nodeName + '没有闭合')
}
node = stack.pop()
node.end = true
str = str.slice(match[0].length)
}
}
if (!node || --breakIndex === 0) {
break
}
if (node.end) {
makeTbody(node, stack, ret)
delete node.end
}
} while (str.length);
return ret
}
function makeTbody(node, stack, ret) {
var nodeName = node.nodeName
var props = node.props
if (nodeName === 'table') {
addTbody(node.children)
}
var forExpr = props['ms-for']
if (forExpr) {
delete props['ms-for']
var p = stack.last()
var arr = p ? p.children : ret
arr.splice(arr.length - 1, 1, {
nodeName: '#comment',
nodeValue: 'ms-for:' + forExpr,
type: nodeName
}, node, {
nodeName: '#comment',
nodeValue: 'ms-for-end:',
type: nodeName
})
}
}
function makeChildren(node, stack, ret) {
var p = stack.last()
if (p) {
p.children.push(node)
} else {
ret.push(node)
}
}
var rlineSp = /[\n\r]s*/g
var rattrs = /([^=\s]+)(?:\s*=\s*(\S+))?/
function makeProps(attrs, props) {
while (attrs) {
var arr = rattrs.exec(attrs)
if (arr) {
var name = arr[1]
var value = arr[2] || ''
attrs = attrs.replace(arr[0], '')
if (name.charAt(0) === ':') {
name = 'ms-' + name.slice(1)
}
if (value) {
if (value.indexOf('??') === 0) {
value = nomalString(value).
replace(rlineSp, '').
slice(1, -1)
}
}
if (!(name in props)) {
props[name] = value
}
} else {
break
}
}
}
function nomalString(str) {
return avalon.unescapeHTML(str.replace(rfill, fill))
}
var emptyObj = function () {
return {
children: [], props: {}
}
}
var rbinding = /^ms-(\w+)-?(.*)/
function diff(copys, sources) {
for (var i = 0; i < copys.length; i++) {
var copy = copys[i]
var src = sources[i] || copys[i]
switch (copy.nodeName) {
case '#text':
if (copy.dynamic) {
var curValue = copy.nodeValue + ''
if (curValue !== src.nodeValue) {
src.nodeValue = curValue
if (src.dom) {
src.dom.nodeValue = curValue
}
}
}
break
case '#comment':
if (copy.forExpr) {
directives['for'].diff(copy, src, copys, sources, i)
} else if (copy.afterChange) {
execHooks$1(src, copy.afterChange)
}
break
case void (0):
diff(copy, src)
break
case '#document-fragment':
diff(copy.children, src.children)
break
default:
if (copy.dynamic) {
var index = i
if (copy['ms-widget']) {
directives['widget'].diff(copy, src, 'ms-widget', copys, sources, index)
copy = copys[i]
src = sources[i] || emptyObj()
delete copy['ms-widget']
}
if ('ms-if' in copy) {
directives['if'].diff(copy, src, 'ms-if', copys, sources, index)
copy = copys[i]
src = sources[i] || emptyObj()
delete copy['ms-if']
}
diffProps(copy, src)
}
if (/^\w/.test(copy.nodeName) && !copy.skipContent && !copy.isVoidTag) {
diff(copy.children, src.children || [])
}
if (src.afterChange) {
execHooks$1(src, src.afterChange)
}
break
}
}
}
function execHooks$1(el, hooks) {
if (hooks.length) {
for (var hook, i = 0; hook = hooks[i++];) {
hook(el.dom, el)
}
}
delete el.afterChange
}
function diffProps(copy, source) {
try {
for (var name in copy) {
var match = name.match(rbinding)
var type = match && match[1]
if (directives[type]) {
directives[type].diff(copy, source, name)
}
}
} catch (e) {
avalon.warn(type, e, e.stack || e.message, 'diffProps error')
}
}
var needRenderIds = []
var renderingID = false
avalon.suspendUpdate = 0
function batchUpdate(id) {
if (renderingID) {
return avalon.Array.ensure(needRenderIds, id)
} else {
renderingID = id
}
var scope = avalon.scopes[id]
if (!scope || !document.nodeName || avalon.suspendUpdate) {
return renderingID = null
}
var vm = scope.vmodel
var dom = vm.$element
var source = dom.vtree || []
var renderFn = vm.$render
var copy = renderFn(scope.vmodel, scope.local)
if (scope.isTemp) {
delete avalon.scopes[id]
}
avalon.diff(copy, source)
var index = needRenderIds.indexOf(renderingID)
renderingID = 0
if (index > -1) {
var removed = needRenderIds.splice(index, 1)
return batchUpdate(removed[0])
}
var more = needRenderIds.shift()
if (more) {
batchUpdate(more)
}
}
var rbinding$1 = /^(\:|ms\-)\w+/
var eventMap = avalon.oneObject('animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit')
function extractBindings(cur, props) {
var bindings = []
var attrs = {}
var skip = 'ms-skip' in props
var uniq = {}
for (var i in props) {
var value = props[i], match
attrs[i] = props[i]
if ((match = i.match(rbinding$1))) {
if (skip)
continue
var arr = i.replace(match[1], '').split('-')
if (eventMap[arr[0]]) {
arr.unshift('on')
}
if (arr[0] === 'on') {
arr[2] = parseFloat(arr[2]) || 0
}
arr.unshift('ms')
var type = arr[1]
if (directives[type]) {
var binding = {
type: type,
param: arr[2],
name: arr.join('-'),
expr: value,
priority: directives[type].priority || type.charCodeAt(0) * 100
}
if (type === 'on') {
binding.priority += arr[3]
}
if (!uniq[binding.name]) {
uniq[binding.name] = value
bindings.push(binding)
}
}
}
}
cur.props = attrs
bindings.sort(byPriority)
return bindings
}
function byPriority(a, b) {
return a.priority - b.priority
}
var config$1 = avalon.config
var quote$1 = avalon.quote
var rident$1 = /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
var rstatement = /^\s*var\s+([$\w]+)\s*\=\s*\S+/
var skips = { __local__: 1, vmode: 1, dom: 1 }
function parseNodes(source, inner) {
var buffer = inner ? [] : ['\nvar vnodes = [];']
for (var i = 0, el; el = source[i++];) {
var vnode = parseNode(el)
if (el.$prepend) {
buffer.push(el.$prepend)
}
var append = el.$append
delete el.$append
delete el.$prepend
if (vnode) {
buffer.push(vnode + '\n')
}
if (append) {
buffer.push(append)
}
}
if (!inner) {
buffer.push('return vnodes\n')
}
return buffer.join('\n')
}
function parseNode(vdom) {
if (!vdom.nodeName)
return false
switch (vdom.nodeName) {
case '#text':
if (vdom.dynamic) {
return add(parseText(vdom))
} else {
return addTag(vdom)
}
case '#comment':
var nodeValue = vdom.nodeValue
if (vdom.forExpr) {
var copy = {
dynamic: true,
vmodel: '__vmodel__'
}
for (var i in vdom) {
if (vdom.hasOwnProperty(i) && !skips[i]) {
copy[i] = vdom[i]
}
}
avalon.directives['for'].parse(copy, vdom, vdom)
vdom.$append += avalon.caches[vdom.signature]
return addTag(copy)
} else if (nodeValue === 'ms-for-end:') {
vdom.$append = addTag({
nodeName: '#comment',
nodeValue: vdom.signature
}) +
' return vnodes}\n })\n},__local__,vnodes)\n' +
addTag({
nodeName: "#comment",
signature: vdom.signature,
nodeValue: "ms-for-end:"
}) + '\n'
return ''
} else if (nodeValue.indexOf('ms-js:') === 0) {
var statement = avalon.parseExpr({
type: 'js',
expr: nodeValue.replace('ms-js:', '')
}) + '\n'
var ret = addTag(vdom)
var match = statement.match(rstatement)
if (match && match[1]) {
vdom.$append = (vdom.$append || '') + statement +
"\n__local__." + match[1] + ' = ' + match[1] + '\n'
} else {
avalon.warn(nodeValue + ' parse fail!')
}
return ret
} else {
return addTag(vdom)
}
default:
if (!vdom.dynamic && vdom.skipContent) {
return addTag(vdom)
}
var copy = {
nodeName: vdom.nodeName
}
var props = vdom.props
if (vdom.dynamic) {
copy.dynamic = '{}'
var bindings = extractBindings(copy, props)
bindings.map(function (b) {
avalon.directives[b.type].parse(copy, vdom, b)
return b.name
})
} else if (props) {
copy.props = {}
for (var i in props) {
copy.props[i] = props[i]
}
}
if (vdom.isVoidTag) {
copy.isVoidTag = true
} else {
if (!('children' in copy)) {
var c = vdom.children
if (c) {
if (vdom.skipContent) {
copy.children = '[' + c.map(function (a) {
return stringify(a)
}) + ']'
} else if (c.length === 1 && c[0].nodeName === '#text') {
if (c[0].dynamic) {
copy.children = '[' + parseText(c[0]) + ']'
} else {
copy.children = '[' + stringify(c[0]) + ']'
}
} else {
copy.children = '(function(){' + parseNodes(c) + '})()'
}
}
}
}
if (vdom.template)
copy.template = vdom.template
if (vdom.skipContent)
copy.skipContent = true
return addTag(copy)
}
}
function wrapDelimiter(expr) {
return rident$1.test(expr) ? expr : avalon.parseExpr({
expr: expr,
type: 'text'
})
}
function add(a) {
return 'vnodes.push(' + a + ');'
}
function addTag(obj) {
return add(stringify(obj))
}
function parseText(el) {
var array = extractExpr(el.nodeValue)
var nodeValue = ''
if (array.length === 1) {
nodeValue = wrapDelimiter(array[0].expr)
} else {
var token = array.map(function (el) {
return el.type ? wrapDelimiter(el.expr) : quote$1(el.expr)
}).join(' + ')
nodeValue = 'String(' + token + ')'
}
return '{\nnodeName: "#text",\ndynamic:true,\nnodeValue: ' + nodeValue + '\n}'
}
var rlineSp$1 = /\n\s*/g
function extractExpr(str) {
var ret = []
do {
var index = str.indexOf(config$1.openTag)
index = index === -1 ? str.length : index
var value = str.slice(0, index)
if (/\S/.test(value)) {
ret.push({ expr: avalon._decode(value) })
}
str = str.slice(index + config$1.openTag.length)
if (str) {
index = str.indexOf(config$1.closeTag)
var value = str.slice(0, index)
ret.push({
expr: avalon.unescapeHTML(value.replace(rlineSp$1, '')),
type: 'text'
})
str = str.slice(index + config$1.closeTag.length)
}
} while (str.length)
return ret
}
var rmsForStart = /^\s*ms\-for\:\s*/
var rmsForEnd = /^\s*ms\-for\-end/
function variantCommon(array) {
hasDirectives(array)
return array
}
var hasDirectives = function (arr) {
var nodes = [], hasDir = false
for (var i = 0; i < arr.length; i++) {
var el = arr[i]
var isComment = el.nodeName === '#comment'
if (isComment && rmsForStart.test(el.nodeValue)) {
hasDir = true
nodes.push(el)
var old = nodes
nodes = []
nodes.list = old
nodes.start = el
} else if (isComment && rmsForEnd.test(el.nodeValue)) {
var old = nodes
nodes = old.list
var start = old.start
delete old.list
delete old.start
nodes.push(old, el)
el.dynamic = true
var uuid = start.signature || (start.signature = avalon.makeHashCode('for'))
el.signature = uuid
start.forExpr = start.nodeValue.replace(rmsForStart, '')
if (old.length === 1) {
var element = old[0]
if (element.props) {
if (element.props.slot) {
start.props = '{slot: "' + element.props.slot + '"}'
}
var cb = element.props['data-for-rendered']
if (cb) {
delete element.props['data-for-rendered']
var wid = cb + ':cb'
if (!avalon.caches[wid]) {
avalon.caches[wid] = Function('return ' + avalon.parseExpr({
type: 'on',
expr: cb
}))()
}
start.wid = wid
}
}
}
for (var j = 0; j < old.length; j++) {
var el = old[j]
var elem = el.dom
if (elem && elem.parentNode) {
elem.parentNode.removeChild(elem)
}
}
start.hasEffect = hasEffect(old)
hasDirectives(old)
if (!avalon.caches[uuid]) {
avalon.caches[uuid] = parseNodes(old, true)
}
old.length = 0
} else {
if (hasDirective(el)) {
hasDir = true
}
nodes.push(el)
}
}
arr.length = 0
arr.push.apply(arr, nodes)
return hasDir
}
function hasDirective(node) {
var nodeName = node.nodeName
switch (nodeName) {
case '#text':
if (avalon.config.rexpr.test(node.nodeValue)) {
return node.dynamic = true
} else {
return false
}
case '#comment':
if (node.dynamic) {
return true
}
return false
case void 0:
return true
default:
var props = node.props || {}
if ('ms-skip' in props) {
node.skipContent = true
return false
}
var flag = false
if (nodeName === 'input') {
if (!props.type) {
props.type = 'text'
}
} else if (/xmp|wbr|template/.test(nodeName)) {
if (!props['ms-widget'] && props.is) {
props['ms-widget'] = '{is:"' + props.is + '"}'
}
} else if (nodeName === 'select') {
var postfix = props.hasOwnProperty('multiple') ? 'multiple' : 'one'
props.type = nodeName + '-' + postfix
} else if (nodeName.indexOf('ms-') === 0) {
if (!props['ms-widget']) {
props.is = nodeName
props['ms-widget'] = '{is:"' + nodeName + '"}'
}
}
var childDir = false
if (props['ms-widget']) {
childDir = true
delDir(props, 'html', 'widget')
delDir(props, 'text', 'widget')
var clone = avalon.mix({}, node)
var cprops = avalon.mix({}, node.props)
delete cprops['ms-widget']
delete clone.isVoidTag
clone.nodeName = "cheng"
clone.props = cprops
node.template = avalon.vdom(clone, 'toHTML')
if (!node.isVoidTag)
node.children = []
}
if (props['ms-text']) {
childDir = true
delDir(props, 'html', 'text')
if (!node.isVoidTag) {
node.children = []
}
}
if (props['ms-html']) {
childDir = true
if (!node.isVoidTag) {
node.children = []
}
}
var hasProps = false
for (var i in props) {
hasProps = true
if (i.indexOf('ms-') === 0) {
flag = true
node.dynamic = {}
break
}
}
if (hasProps) {
node.props = props
}
if (node.children) {
var r = hasDirectives(node.children)
if (r) {
delete node.skipContent
return true
}
if (!childDir) {
node.skipContent = true
} else {
delete node.skipContent
}
}
return flag
}
}
function delDir(props, a, b) {
if (props['ms-' + a]) {
avalon.warn(a, '指令不能与', b, '指令共存于同一个元素')
delete props['ms-' + a]
}
}
function hasEffect(arr) {
for (var i = 0, el; el = arr[i++];) {
if (el.props && el.props['ms-effect']) {
return true
}
}
return false
}
var pool = avalon.evaluatorPool
var brackets = /\(([^)]*)\)/
var rshortCircuit = /\|\|/g
var rpipeline = /\|(?=\?\?)/
var ruselessSp = /\s*(\.|\|)\s*/g
var rhandleName = /^__vmodel__\.[$\w\.]+$/i
var rguide = /(^|[^\w\u00c0-\uFFFF_])(@|##)(?=[$\w])/g
var robjectProperty = /\.[\w\.\$]+/g
var rvar = /[$a-zA-Z_][$a-zA-Z0-9_]*/g
var rregexp = /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/g
function parseExpr(binding) {
var str = binding.expr
var category = binding.type
var cache = pool.get(category + ':' + str)
if (cache) {
avalon.shadowCopy(binding, cache)
return cache.text
}
stringPool.map = {}
var paths = {}
var locals = {}
var input = str.replace(rregexp, dig)
input = clearString(input)
input = input.replace(rshortCircuit, dig).
replace(ruselessSp, '$1').
replace(rguide, '$1__vmodel__.').
replace(/(\b[\$\w]+\s*):/g, dig).
replace(/\|(\w+)/g, function (a, b) {
return '|' + dig(b)
}).
replace(/__vmodel__\.([\$\w\.]+)/g, function (_, b) {
paths[b] = 1
return _
})
collectLocal(input, locals)
var filters = input.split(rpipeline)
var _body = filters.shift()
var body = _body.replace(rfill, fill)
if (category === 'js') {
return cacheData(binding, body, paths, locals)
}
if (filters.length) {
filters = filters.map(function (filter) {
var bracketArgs = '(__value__'
filter = filter.replace(brackets, function (a, b) {
if (/\S/.test(b)) {
bracketArgs += ',' + b
}
return ''
}).replace(rfill, fill)
return (filter.replace(/^(\w+)/, '__value__ =  avalon.__format__("$1")') +
bracketArgs + ')')
})
}
var ret = []
if (category === 'on') {
if (rhandleName.test(body)) {
body = body + '($event)'
}
filters = filters.map(function (el) {
return el.replace(/__value__/g, '$event')
})
if (filters.length) {
filters.push('if($event.$return){\n\treturn;\n}')
}
if (!avalon.modern) {
body = body.replace(/__vmodel__\.([^(]+)\(([^)]*)\)/, function (a, b, c) {
return '__vmodel__.' + b + ".call(__vmodel__" + (/\S/.test(c) ? ',' + c : "") + ")"
})
}
ret = ['function ($event, __local__){',
'try{',
extLocal(locals).join('\n'),
'\tvar __vmodel__ = this;',
'\t' + body,
'}catch(e){',
quoteError(str, category),
'}',
'}']
filters.unshift(2, 0)
} else if (category === 'duplex') {
var setterBody = [
'function (__vmodel__,__value__){',
'try{',
'\t' + body + ' = __value__',
'}catch(e){',
quoteError(str, category).replace('parse', 'set'),
'}',
'}']
pool.put('duplex:set:' + binding.expr, setterBody.join('\n').replace(rfill, fill))
var getterBody = [
'function (__vmodel__){',
'try{',
'var __value__ = ' + body,
filters.join('\n'),
'return __value__',
'}catch(e){',
quoteError(str, category).replace('parse', 'get'),
'}',
'}'].join('\n')
return cacheData(binding, getterBody, locals, paths)
} else {
ret = [
'(function (){',
'try{',
'var __value__ = ' + body.replace(rfill, fill),
(category === 'text' ?
'return avalon.parsers.string(__value__)' :
'return __value__'),
'}catch(e){',
quoteError(str, category),
'\treturn ""',
'}',
'})()'
]
filters.unshift(3, 0)
}
ret.splice.apply(ret, filters)
return cacheData(binding, ret.join('\n'), locals, paths)
}
function cacheData(binding, text, locals, paths) {
text = text.replace(rfill, fill)
var obj = {
text: text,
locals: Object.keys(locals).join(','),
paths: Object.keys(paths).join(',')
}
var key = binding.type + ":" + binding.expr
binding.locals = obj.locals
binding.paths = obj.paths
pool.put(key, obj)
return text
}
function collectLocal(str, local) {
str.replace(/__vmodel__/, ' ').
replace(robjectProperty, ' ').
replace(rvar, function (el) {
if (el !== '$event' && !avalon.keyMap[el]) {
local[el] = 1
}
})
}
function extLocal(ret) {
var arr = []
for (var i in ret) {
arr.push('var ' + i + ' = __local__[' + avalon.quote(i) + ']')
}
return arr
}
function quoteError(str, type) {
return '\tavalon.warn(e, ' +
avalon.quote('parse ' + type + ' binding【 ' + str + ' 】fail')
+ ')'
}
avalon.lexer = makeNode
avalon.diff = diff
avalon.batch = batchUpdate
avalon.speedUp = variantCommon
avalon.parseExpr = parseExpr
var rquoteEscapes = /\\\\(['"])/g
function render(vtree, local) {
var _body = Array.isArray(vtree) ? parseNodes(vtree) : vtree
var _local = []
if (local) {
for (var i in local) {
_local.push('var ' + i + ' = __local__[' + quote(i) + ']')
}
}
_body = _body.replace(rquoteEscapes, "$1")
var body = '__local__ = __local__ || {};\n' +
_local.join(';\n') + '\n' + _body
try {
var fn = Function('__vmodel__', '__local__', body)
} catch (e) {
avalon.warn(_body, 'render parse error')
}
return fn
}
avalon.render = render
var legalTags = { wbr: 1, xmp: 1, template: 1 }
var events = 'onInit,onReady,onViewChange,onDispose'
var componentEvents = avalon.oneObject(events)
var immunity = events.split(',').concat('is', 'define')
var onceWarn$1 = true
function initComponent(src, rawOption, local, template) {
var tag = src.nodeName
var is = src.props.is
if (!legalTags[tag] && !isCustomTag(tag)) {
avalon.warn(tag + '不合适做组件的标签')
return
}
var hooks = {}
if (!rawOption) {
options = []
} else {
var options = [].concat(rawOption)
options.forEach(function (a) {
if (a && typeof a === 'object') {
mixinHooks(hooks, (a.$model || a), true)
}
})
}
var definition = avalon.components[is]
if (!definition) {
return
}
var id = hooks.id || hooks.$id
if (!id && onceWarn$1) {
avalon.warn('warning!', is, '组件最好在ms-widget配置对象中指定全局不重复的$id以提高性能!\n',
'若在ms-for循环中可以利用 ($index,el) in @array 中的$index拼写你的$id\n',
'如 ms-widget="{is:\'ms-button\',id:\'btn\'+$index}"'
)
onceWarn$1 = false
}
if (hooks.define) {
delete hooks.define
avalon.warn('warning! 组件的define配置项已经被废掉')
}
var define = avalon.directives.widget.define
var $id = id || src.props.id || 'w' + (new Date - 0)
var defaults = avalon.mix(true, {}, definition.defaults)
mixinHooks(hooks, defaults, false)
var skipProps = immunity.concat()
function sweeper(a, b) {
skipProps.forEach(function (k) {
delete a[k]
delete b[k]
})
}
sweeper.isWidget = true
var vmodel = define.apply(sweeper, [src.vmodel, defaults].concat(options))
if (!avalon.modern) {
for (var i in vmodel) {
if (!$$skipArray$1[i] && typeof vmodel[i] === 'function') {
vmodel[i] = vmodel[i].bind(vmodel)
}
}
}
vmodel.$id = $id
avalon.vmodels[$id] = vmodel
for (var e in componentEvents) {
if (hooks[e]) {
hooks[e].forEach(function (fn) {
vmodel.$watch(e, fn)
})
}
}
var shell = avalon.lexer(template)
var shellRoot = shell[0]
shellRoot.children = shellRoot.children || []
shellRoot.props.is = is
shellRoot.props.wid = $id
avalon.speedUp(shell)
var render = avalon.render(shell, local)
var finalTemplate = definition.template.trim()
if (typeof definition.getTemplate === 'function') {
finalTemplate = definition.getTemplate(vmodel, finalTemplate)
}
var vtree = avalon.lexer(finalTemplate)
if (vtree.length > 1) {
avalon.error('组件必须用一个元素包起来')
}
var soleSlot = definition.soleSlot
replaceSlot(vtree, soleSlot)
avalon.speedUp(vtree)
var render2 = avalon.render(vtree)
var str = fnTemplate + ''
var zzzzz = soleSlot ? avalon.quote(soleSlot) : "null"
str = str.
replace('XXXXX', stringifyAnonymous(render)).
replace('YYYYY', stringifyAnonymous(render2)).
replace('ZZZZZ', zzzzz)
var begin = str.indexOf('{') + 1
var end = str.lastIndexOf("}")
var lastFn = Function('vm', 'local', str.slice(begin, end))
vmodel.$render = lastFn
src['component-vm:' + is] = vmodel
return vmodel.$render = lastFn
}
function stringifyAnonymous(fn) {
return fn.toString().replace('anonymous', '')
.replace(/\s*\/\*\*\//g, '')
}
function fnTemplate() {
var shell = (XXXXX)(vm, local);
var shellRoot = shell[0]
var vtree = (YYYYY)(vm, local);
var component = vtree[0]
for (var i in shellRoot) {
if (i !== 'children' && i !== 'nodeName') {
if (i === 'props') {
avalon.mix(component.props, shellRoot.props)
} else {
component[i] = shellRoot[i]
}
}
}
var soleSlot = ZZZZZ
var slots = avalon.collectSlots(shellRoot, soleSlot)
if (soleSlot && (!slots[soleSlot] || !slots[soleSlot].length)) {
slots[soleSlot] = [{
nodeName: '#text',
nodeValue: vm[soleSlot],
dynamic: true
}]
}
avalon.insertSlots(vtree, slots)
delete component.skipAttrs
delete component.skipContent
return vtree
}
function replaceSlot(vtree, slotName) {
for (var i = 0, el; el = vtree[i]; i++) {
if (el.nodeName === 'slot') {
var name = el.props.name || slotName
vtree.splice(i, 1, {
nodeName: '#comment',
nodeValue: 'slot:' + name,
dynamic: true,
type: name
}, {
nodeName: '#comment',
nodeValue: 'slot-end:'
})
i++
} else if (el.children) {
replaceSlot(el.children, slotName)
}
}
}
avalon.insertSlots = function (vtree, slots) {
for (var i = 0, el; el = vtree[i]; i++) {
if (el.nodeName === '#comment' && slots[el.type]) {
var args = [i + 1, 0].concat(slots[el.type])
vtree.splice.apply(vtree, args)
i += slots[el.type].length
} else if (el.children) {
avalon.insertSlots(el.children, slots)
}
}
}
avalon.collectSlots = function (node, soleSlot) {
var slots = {}
if (soleSlot) {
slots[soleSlot] = node.children
slots.__sole__ = soleSlot
} else {
node.children.forEach(function (el, i) {
var name = el.props && el.props.slot
if (!name)
return
if (el.forExpr) {
slots[name] = node.children.slice(i, i + 2)
} else {
if (Array.isArray(slots[name])) {
slots[name].push(el)
} else {
slots[name] = [el]
}
}
})
}
return slots
}
var rcustomTag = /^[a-z]([a-z\d]+\-)+[a-z\d]+$/
function isCustomTag(type) {
return rcustomTag.test(type) || avalon.components[type]
}
function mixinHooks(target, option, overwrite) {
for (var k in option) {
var v = option[k]
if (componentEvents[k]) {
if (k in target) {
target[k].push(v)
} else {
target[k] = [option[k]]
}
} else {
if (overwrite) {
target[k] = v
}
}
}
}
function inDomTree(el) {
while (el) {
if (el.nodeType === 9) {
return true
}
el = el.parentNode
}
return false
}
function fireDisposeHook(el) {
if (el.nodeType === 1 && el.getAttribute('wid') && !inDomTree(el)) {
var wid = el.getAttribute('wid')
var docker = avalon.scopes[wid]
if (!docker)
return
var elemID = el.getAttribute('ms-controller') || el.getAttribute('ms-important')
var vm = elemID && avalon.vmodels[elemID] || docker.vmodel
vm.$fire("onDispose", {
type: 'dispose',
target: el,
vmodel: vm
})
if (elemID) {
return
}
if (!el.getAttribute('cached')) {
delete docker.vmodel
delete avalon.scopes[wid]
var v = el.vtree
detachEvents(v)
var is = el.getAttribute('is')
if (v) {
v[0][is + '-mount'] = false
v[0]['component-ready:' + is] = false
}
}
return false
}
}
var rtag = /^\w/
function detachEvents(arr) {
for (var i in arr) {
var el = arr[i]
if (rtag.test(el.nodeName)) {
for (var i in el) {
if (i.indexOf('ms-on') === 0) {
delete el[i]
}
}
if (el.children) {
detachEvents(el.children)
}
}
}
}
function fireDisposeHookDelay(a) {
setTimeout(function () {
fireDisposeHook(a)
}, 4)
}
function fireDisposeHooks(nodes) {
for (var i = 0, el; el = nodes[i++];) {
fireDisposeHook(el)
}
}
function byMutationEvent(dom) {
dom.addEventListener("DOMNodeRemovedFromDocument", function () {
fireDisposeHookDelay(dom)
})
}
function byRewritePrototype() {
if (byRewritePrototype.execute) {
return
}
byRewritePrototype.execute = true
var p = Node.prototype
function rewite(name, fn) {
var cb = p[name]
p[name] = function (a, b) {
return fn.call(this, cb, a, b)
}
}
rewite('removeChild', function (fn, a, b) {
fn.call(this, a, b)
if (a.nodeType === 1) {
fireDisposeHookDelay(a)
}
return a
})
rewite('replaceChild', function (fn, a, b) {
fn.call(this, a, b)
if (b.nodeType === 1) {
fireDisposeHookDelay(b)
}
return a
})
var ep = Element.prototype, oldSetter
function newSetter(html) {
var all = avalon.slice(this.getElementsByTagName('*'))
oldSetter.call(this, html)
fireDisposeHooks(all)
}
try {
var obj = Object.getOwnPropertyDescriptor(ep, 'innerHTML')
var oldSetter = obj.set
obj.set = newSetter
Object.defineProperty(ep, 'innerHTML', obj)
} catch (e) {
if (ep && ep.__lookupSetter__) {
oldSetter = ep.__lookupSetter__('innerHTML')
ep.__defineSetter__('innerHTML', newSetter)
} else {
throw e
}
}
rewite('appendChild', function (fn, a) {
fn.call(this, a)
if (a.nodeType === 1 && this.nodeType === 11) {
fireDisposeHookDelay(a)
}
return a
})
rewite('insertBefore', function (fn, a, b) {
fn.call(this, a, b)
if (a.nodeType === 1 && this.nodeType === 11) {
fireDisposeHookDelay(a)
}
return a
})
}
var checkDisposeNodes = []
var checkID = 0
function byPolling(dom) {
avalon.Array.ensure(checkDisposeNodes, dom)
if (!checkID) {
checkID = setInterval(function () {
for (var i = 0, el; el = checkDisposeNodes[i];) {
if (false === fireDisposeHook(el)) {
avalon.Array.removeAt(checkDisposeNodes, i)
} else {
i++
}
}
if (checkDisposeNodes.length == 0) {
clearInterval(checkID)
checkID = 0
}
}, 700)
}
}
function disposeComponent(dom) {
if (window.chrome && window.MutationEvent) {
byMutationEvent(dom)
} else {
try {
byRewritePrototype(dom)
} catch (e) {
byPolling(dom)
}
}
}
disposeComponent.byMutationEvent = byMutationEvent
disposeComponent.byRewritePrototype = byRewritePrototype
disposeComponent.byPolling = byPolling
avalon._disposeComponent = disposeComponent
avalon.component = function (name, definition) {
if (!avalon.components[name]) {
avalon.components[name] = definition
}
}
avalon.directive('widget', {
priority: 4,
parse: function (copy, src, binding) {
src.props.wid = src.props.wid || avalon.makeHashCode('w')
copy[binding.name] = avalon.parseExpr(binding)
copy.template = src.template
copy.vmodel = '__vmodel__'
copy.local = '__local__'
},
define: function () {
return avalon.mediatorFactory.apply(this, arguments)
},
diff: function (copy, src, name, copyList, srcList, index) {
var a = copy[name]
if (Object(a) === a) {
var is = src.props.is || (/^ms\-/.test(src.nodeName) ? src.nodeName : 0)
if (!is) {
a = a.$model || a
if (Array.isArray(a)) {
a.unshift({})
avalon.mix.apply(0, a)
a = a.shift()
}
is = a.is
}
var vmName = 'component-vm:' + is
src.props.is = is
src.vmodel = copy.vmodel
if (!src[vmName]) {
if (!initComponent(src, copy[name], copy.local, copy.template)) {
src.nodeValue = 'unresolved component placeholder'
copyList[index] = src
update(src, this.mountComment)
return
}
}
var comVm = src[vmName]
var scope = avalon.scopes[comVm.$id]
if (scope && scope.vmodel) {
var com = scope.vmodel.$element
if (src.dom !== com) {
var component = com.vtree[0]
srcList[index] = copyList[index] = component
src.com = com
if (!component.skipContent) {
component.skipContent = 'optimize'
}
update(src, this.replaceCachedComponent)
update(component, function () {
if (component.skipContent === 'optimize') {
component.skipContent = true
}
}, 'afterChange')
return
}
}
var render = comVm.$render
var tree = render(comVm, copy.local)
var component = tree[0]
if (component && isComponentReady(component)) {
component.local = copy.local
Array(
vmName,
'component-html:' + is,
'component-ready:' + is,
'dom', 'dynamic'
).forEach(function (name) {
component[name] = src[name]
})
component.vmodel = comVm
copyList[index] = component
if (src.comment && src.nodeValue) {
component.dom = src.comment
}
if (src.nodeName !== component.nodeName) {
srcList[index] = component
update(component, this.mountComponent)
} else {
update(src, this.updateComponent)
}
} else {
src.nodeValue = 'unresolved component placeholder'
copyList[index] = {
nodeValue: 'unresolved component placeholder',
nodeName: '#comment'
}
update(src, this.mountComment)
}
} else {
if (src.props.is === copy.props.is) {
update(src, this.updateComponent)
}
}
},
replaceCachedComponent: function (dom, vdom, parent) {
var com = vdom.com
parent.replaceChild(com, dom)
vdom.dom = com
delete vdom.com
},
mountComment: function (dom, vdom, parent) {
var comment = document.createComment(vdom.nodeValue)
vdom.dom = comment
parent.replaceChild(comment, dom)
},
updateComponent: function (dom, vdom) {
var vm = vdom["component-vm:" + vdom.props.is]
var viewChangeObservers = vm.$events.onViewChange
if (viewChangeObservers && viewChangeObservers.length) {
update(vdom, viewChangeHandle, 'afterChange')
}
},
mountComponent: function (dom, vdom, parent) {
delete vdom.dom
var com = avalon.vdom(vdom, 'toDOM')
var is = vdom.props.is
var vm = vdom['component-vm:' + is]
vm.$fire('onInit', {
type: 'init',
vmodel: vm,
is: is
})
parent.replaceChild(com, dom)
vdom.dom = vm.$element = com
com.vtree = [vdom]
avalon._disposeComponent(com)
vdom['component-ready:' + is] = true
avalon.scopes[vm.$id] = {
vmodel: vm,
top: vdom.vmodel,
local: vdom.local
}
update(vdom, function () {
vm.$fire('onReady', {
type: 'ready',
target: com,
vmodel: vm,
is: is
})
}, 'afterChange')
update(vdom, function () {
vdom['component-html:' + is] = avalon.vdom(vdom, 'toHTML')
}, 'afterChange')
}
})
function viewChangeHandle(dom, vdom) {
var is = vdom.props.is
var vm = vdom['component-vm:' + is]
var html = 'component-html:' + is
var preHTML = vdom[html]
var curHTML = avalon.vdom(vdom, 'toHTML')
if (preHTML !== curHTML) {
vdom[html] = curHTML
vm.$fire('onViewChange', {
type: 'viewchange',
target: dom,
vmodel: vm,
is: is
})
}
}
function isComponentReady(vnode) {
var isReady = true
try {
hasUnresolvedComponent(vnode)
} catch (e) {
isReady = false
}
return isReady
}
function hasUnresolvedComponent(vnode) {
vnode.children.forEach(function (el) {
if (el.nodeName === '#comment') {
if (el.nodeValue === 'unresolved component placeholder') {
throw 'unresolved'
}
} else if (el.children) {
hasUnresolvedComponent(el)
}
})
}
return avalon;
}));
/*!
 * clipboard.js v1.5.16
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
;!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.Clipboard=e()}}(function(){var e,t,n;return function e(t,n,i){function o(a,c){if(!n[a]){if(!t[a]){var l="function"==typeof require&&require;if(!c&&l)return l(a,!0);if(r)return r(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return o(n?n:e)},u,u.exports,e,t,n,i)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<i.length;a++)o(i[a]);return o}({1:[function(e,t,n){function i(e,t){for(;e&&e.nodeType!==o;){if(e.matches(t))return e;e=e.parentNode}}var o=9;if(Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}t.exports=i},{}],2:[function(e,t,n){function i(e,t,n,i,r){var a=o.apply(this,arguments);return e.addEventListener(n,a,r),{destroy:function(){e.removeEventListener(n,a,r)}}}function o(e,t,n,i){return function(n){n.delegateTarget=r(n.target,t),n.delegateTarget&&i.call(e,n)}}var r=e("./closest");t.exports=i},{"./closest":1}],3:[function(e,t,n){n.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},n.nodeList=function(e){var t=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===t||"[object HTMLCollection]"===t)&&"length"in e&&(0===e.length||n.node(e[0]))},n.string=function(e){return"string"==typeof e||e instanceof String},n.fn=function(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t}},{}],4:[function(e,t,n){function i(e,t,n){if(!e&&!t&&!n)throw new Error("Missing required arguments");if(!c.string(t))throw new TypeError("Second argument must be a String");if(!c.fn(n))throw new TypeError("Third argument must be a Function");if(c.node(e))return o(e,t,n);if(c.nodeList(e))return r(e,t,n);if(c.string(e))return a(e,t,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function o(e,t,n){return e.addEventListener(t,n),{destroy:function(){e.removeEventListener(t,n)}}}function r(e,t,n){return Array.prototype.forEach.call(e,function(e){e.addEventListener(t,n)}),{destroy:function(){Array.prototype.forEach.call(e,function(e){e.removeEventListener(t,n)})}}}function a(e,t,n){return l(document.body,e,t,n)}var c=e("./is"),l=e("delegate");t.exports=i},{"./is":3,delegate:2}],5:[function(e,t,n){function i(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName)e.focus(),e.setSelectionRange(0,e.value.length),t=e.value;else{e.hasAttribute("contenteditable")&&e.focus();var n=window.getSelection(),i=document.createRange();i.selectNodeContents(e),n.removeAllRanges(),n.addRange(i),t=n.toString()}return t}t.exports=i},{}],6:[function(e,t,n){function i(){}i.prototype={on:function(e,t,n){var i=this.e||(this.e={});return(i[e]||(i[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){function i(){o.off(e,i),t.apply(n,arguments)}var o=this;return i._=t,this.on(e,i,n)},emit:function(e){var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),i=0,o=n.length;for(i;i<o;i++)n[i].fn.apply(n[i].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),i=n[e],o=[];if(i&&t)for(var r=0,a=i.length;r<a;r++)i[r].fn!==t&&i[r].fn._!==t&&o.push(i[r]);return o.length?n[e]=o:delete n[e],this}},t.exports=i},{}],7:[function(t,n,i){!function(o,r){if("function"==typeof e&&e.amd)e(["module","select"],r);else if("undefined"!=typeof i)r(n,t("select"));else{var a={exports:{}};r(a,o.select),o.clipboardAction=a.exports}}(this,function(e,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=n(t),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),c=function(){function e(t){i(this,e),this.resolveOptions(t),this.initSelection()}return a(e,[{key:"resolveOptions",value:function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function e(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function e(){var t=this,n="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[n?"right":"left"]="-9999px";var i=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.addEventListener("focus",window.scrollTo(0,i)),this.fakeElem.style.top=i+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,o.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function e(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function e(){this.selectedText=(0,o.default)(this.target),this.copyText()}},{key:"copyText",value:function e(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function e(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function e(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function e(){this.removeFake()}},{key:"action",set:function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function e(){return this._action}},{key:"target",set:function e(t){if(void 0!==t){if(!t||"object"!==("undefined"==typeof t?"undefined":r(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function e(){return this._target}}]),e}();e.exports=c})},{select:5}],8:[function(t,n,i){!function(o,r){if("function"==typeof e&&e.amd)e(["module","./clipboard-action","tiny-emitter","good-listener"],r);else if("undefined"!=typeof i)r(n,t("./clipboard-action"),t("tiny-emitter"),t("good-listener"));else{var a={exports:{}};r(a,o.clipboardAction,o.tinyEmitter,o.goodListener),o.clipboard=a.exports}}(this,function(e,t,n,i){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e,t){var n="data-clipboard-"+e;if(t.hasAttribute(n))return t.getAttribute(n)}var s=o(t),u=o(n),f=o(i),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),h=function(e){function t(e,n){r(this,t);var i=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.resolveOptions(n),i.listenClick(e),i}return c(t,e),d(t,[{key:"resolveOptions",value:function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText}},{key:"listenClick",value:function e(t){var n=this;this.listener=(0,f.default)(t,"click",function(e){return n.onClick(e)})}},{key:"onClick",value:function e(t){var n=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})}},{key:"defaultAction",value:function e(t){return l("action",t)}},{key:"defaultTarget",value:function e(t){var n=l("target",t);if(n)return document.querySelector(n)}},{key:"defaultText",value:function e(t){return l("text",t)}},{key:"destroy",value:function e(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}]),t}(u.default);e.exports=h})},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)});
/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/;(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);
!function t(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.Raphael=r():e.Raphael=r()}(this,function(){return function(t){function e(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){var i,n;i=[r(1),r(3),r(4)],n=function(t){return t}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(2)],n=function(t){function e(r){if(e.is(r,"function"))return w?r():t.on("raphael.DOMload",r);if(e.is(r,Q))return e._engine.create[z](e,r.splice(0,3+e.is(r[0],$))).add(r);var i=Array.prototype.slice.call(arguments,0);if(e.is(i[i.length-1],"function")){var n=i.pop();return w?n.call(e._engine.create[z](e,i)):t.on("raphael.DOMload",function(){n.call(e._engine.create[z](e,i))})}return e._engine.create[z](e,arguments)}function r(t){if("function"==typeof t||Object(t)!==t)return t;var e=new t.constructor;for(var i in t)t[T](i)&&(e[i]=r(t[i]));return e}function i(t,e){for(var r=0,i=t.length;i>r;r++)if(t[r]===e)return t.push(t.splice(r,1)[0])}function n(t,e,r){function n(){var a=Array.prototype.slice.call(arguments,0),s=a.join("␀"),o=n.cache=n.cache||{},l=n.count=n.count||[];return o[T](s)?(i(l,s),r?r(o[s]):o[s]):(l.length>=1e3&&delete o[l.shift()],l.push(s),o[s]=t[z](e,a),r?r(o[s]):o[s])}return n}function a(){return this.hex}function s(t,e){for(var r=[],i=0,n=t.length;n-2*!e>i;i+=2){var a=[{x:+t[i-2],y:+t[i-1]},{x:+t[i],y:+t[i+1]},{x:+t[i+2],y:+t[i+3]},{x:+t[i+4],y:+t[i+5]}];e?i?n-4==i?a[3]={x:+t[0],y:+t[1]}:n-2==i&&(a[2]={x:+t[0],y:+t[1]},a[3]={x:+t[2],y:+t[3]}):a[0]={x:+t[n-2],y:+t[n-1]}:n-4==i?a[3]=a[2]:i||(a[0]={x:+t[i],y:+t[i+1]}),r.push(["C",(-a[0].x+6*a[1].x+a[2].x)/6,(-a[0].y+6*a[1].y+a[2].y)/6,(a[1].x+6*a[2].x-a[3].x)/6,(a[1].y+6*a[2].y-a[3].y)/6,a[2].x,a[2].y])}return r}function o(t,e,r,i,n){var a=-3*e+9*r-9*i+3*n,s=t*a+6*e-12*r+6*i;return t*s-3*e+3*r}function l(t,e,r,i,n,a,s,l,h){null==h&&(h=1),h=h>1?1:0>h?0:h;for(var u=h/2,c=12,f=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],p=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0,g=0;c>g;g++){var x=u*f[g]+u,v=o(x,t,r,n,s),y=o(x,e,i,a,l),m=v*v+y*y;d+=p[g]*Y.sqrt(m)}return u*d}function h(t,e,r,i,n,a,s,o,h){if(!(0>h||l(t,e,r,i,n,a,s,o)<h)){var u=1,c=u/2,f=u-c,p,d=.01;for(p=l(t,e,r,i,n,a,s,o,f);H(p-h)>d;)c/=2,f+=(h>p?1:-1)*c,p=l(t,e,r,i,n,a,s,o,f);return f}}function u(t,e,r,i,n,a,s,o){if(!(W(t,r)<G(n,s)||G(t,r)>W(n,s)||W(e,i)<G(a,o)||G(e,i)>W(a,o))){var l=(t*i-e*r)*(n-s)-(t-r)*(n*o-a*s),h=(t*i-e*r)*(a-o)-(e-i)*(n*o-a*s),u=(t-r)*(a-o)-(e-i)*(n-s);if(u){var c=l/u,f=h/u,p=+c.toFixed(2),d=+f.toFixed(2);if(!(p<+G(t,r).toFixed(2)||p>+W(t,r).toFixed(2)||p<+G(n,s).toFixed(2)||p>+W(n,s).toFixed(2)||d<+G(e,i).toFixed(2)||d>+W(e,i).toFixed(2)||d<+G(a,o).toFixed(2)||d>+W(a,o).toFixed(2)))return{x:c,y:f}}}}function c(t,e){return p(t,e)}function f(t,e){return p(t,e,1)}function p(t,r,i){var n=e.bezierBBox(t),a=e.bezierBBox(r);if(!e.isBBoxIntersect(n,a))return i?0:[];for(var s=l.apply(0,t),o=l.apply(0,r),h=W(~~(s/5),1),c=W(~~(o/5),1),f=[],p=[],d={},g=i?0:[],x=0;h+1>x;x++){var v=e.findDotsAtSegment.apply(e,t.concat(x/h));f.push({x:v.x,y:v.y,t:x/h})}for(x=0;c+1>x;x++)v=e.findDotsAtSegment.apply(e,r.concat(x/c)),p.push({x:v.x,y:v.y,t:x/c});for(x=0;h>x;x++)for(var y=0;c>y;y++){var m=f[x],b=f[x+1],_=p[y],w=p[y+1],k=H(b.x-m.x)<.001?"y":"x",B=H(w.x-_.x)<.001?"y":"x",C=u(m.x,m.y,b.x,b.y,_.x,_.y,w.x,w.y);if(C){if(d[C.x.toFixed(4)]==C.y.toFixed(4))continue;d[C.x.toFixed(4)]=C.y.toFixed(4);var S=m.t+H((C[k]-m[k])/(b[k]-m[k]))*(b.t-m.t),T=_.t+H((C[B]-_[B])/(w[B]-_[B]))*(w.t-_.t);S>=0&&1.001>=S&&T>=0&&1.001>=T&&(i?g++:g.push({x:C.x,y:C.y,t1:G(S,1),t2:G(T,1)}))}}return g}function d(t,r,i){t=e._path2curve(t),r=e._path2curve(r);for(var n,a,s,o,l,h,u,c,f,d,g=i?0:[],x=0,v=t.length;v>x;x++){var y=t[x];if("M"==y[0])n=l=y[1],a=h=y[2];else{"C"==y[0]?(f=[n,a].concat(y.slice(1)),n=f[6],a=f[7]):(f=[n,a,n,a,l,h,l,h],n=l,a=h);for(var m=0,b=r.length;b>m;m++){var _=r[m];if("M"==_[0])s=u=_[1],o=c=_[2];else{"C"==_[0]?(d=[s,o].concat(_.slice(1)),s=d[6],o=d[7]):(d=[s,o,s,o,u,c,u,c],s=u,o=c);var w=p(f,d,i);if(i)g+=w;else{for(var k=0,B=w.length;B>k;k++)w[k].segment1=x,w[k].segment2=m,w[k].bez1=f,w[k].bez2=d;g=g.concat(w)}}}}}return g}function g(t,e,r,i,n,a){null!=t?(this.a=+t,this.b=+e,this.c=+r,this.d=+i,this.e=+n,this.f=+a):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function x(){return this.x+I+this.y}function v(){return this.x+I+this.y+I+this.width+" × "+this.height}function y(t,e,r,i,n,a){function s(t){return((c*t+u)*t+h)*t}function o(t,e){var r=l(t,e);return((d*r+p)*r+f)*r}function l(t,e){var r,i,n,a,o,l;for(n=t,l=0;8>l;l++){if(a=s(n)-t,H(a)<e)return n;if(o=(3*c*n+2*u)*n+h,H(o)<1e-6)break;n-=a/o}if(r=0,i=1,n=t,r>n)return r;if(n>i)return i;for(;i>r;){if(a=s(n),H(a-t)<e)return n;t>a?r=n:i=n,n=(i-r)/2+r}return n}var h=3*e,u=3*(i-e)-h,c=1-h-u,f=3*r,p=3*(n-r)-f,d=1-f-p;return o(t,1/(200*a))}function m(t,e){var r=[],i={};if(this.ms=e,this.times=1,t){for(var n in t)t[T](n)&&(i[ht(n)]=t[n],r.push(ht(n)));r.sort(Bt)}this.anim=i,this.top=r[r.length-1],this.percents=r}function b(r,i,n,a,s,o){n=ht(n);var l,h,u,c=[],f,p,d,x=r.ms,v={},m={},b={};if(a)for(w=0,B=Ee.length;B>w;w++){var _=Ee[w];if(_.el.id==i.id&&_.anim==r){_.percent!=n?(Ee.splice(w,1),u=1):h=_,i.attr(_.totalOrigin);break}}else a=+m;for(var w=0,B=r.percents.length;B>w;w++){if(r.percents[w]==n||r.percents[w]>a*r.top){n=r.percents[w],p=r.percents[w-1]||0,x=x/r.top*(n-p),f=r.percents[w+1],l=r.anim[n];break}a&&i.attr(r.anim[r.percents[w]])}if(l){if(h)h.initstatus=a,h.start=new Date-h.ms*a;else{for(var C in l)if(l[T](C)&&(pt[T](C)||i.paper.customAttributes[T](C)))switch(v[C]=i.attr(C),null==v[C]&&(v[C]=ft[C]),m[C]=l[C],pt[C]){case $:b[C]=(m[C]-v[C])/x;break;case"colour":v[C]=e.getRGB(v[C]);var S=e.getRGB(m[C]);b[C]={r:(S.r-v[C].r)/x,g:(S.g-v[C].g)/x,b:(S.b-v[C].b)/x};break;case"path":var A=Qt(v[C],m[C]),E=A[1];for(v[C]=A[0],b[C]=[],w=0,B=v[C].length;B>w;w++){b[C][w]=[0];for(var M=1,N=v[C][w].length;N>M;M++)b[C][w][M]=(E[w][M]-v[C][w][M])/x}break;case"transform":var L=i._,z=le(L[C],m[C]);if(z)for(v[C]=z.from,m[C]=z.to,b[C]=[],b[C].real=!0,w=0,B=v[C].length;B>w;w++)for(b[C][w]=[v[C][w][0]],M=1,N=v[C][w].length;N>M;M++)b[C][w][M]=(m[C][w][M]-v[C][w][M])/x;else{var F=i.matrix||new g,R={_:{transform:L.transform},getBBox:function(){return i.getBBox(1)}};v[C]=[F.a,F.b,F.c,F.d,F.e,F.f],se(R,m[C]),m[C]=R._.transform,b[C]=[(R.matrix.a-F.a)/x,(R.matrix.b-F.b)/x,(R.matrix.c-F.c)/x,(R.matrix.d-F.d)/x,(R.matrix.e-F.e)/x,(R.matrix.f-F.f)/x]}break;case"csv":var I=j(l[C])[q](k),D=j(v[C])[q](k);if("clip-rect"==C)for(v[C]=D,b[C]=[],w=D.length;w--;)b[C][w]=(I[w]-v[C][w])/x;m[C]=I;break;default:for(I=[][P](l[C]),D=[][P](v[C]),b[C]=[],w=i.paper.customAttributes[C].length;w--;)b[C][w]=((I[w]||0)-(D[w]||0))/x}var V=l.easing,O=e.easing_formulas[V];if(!O)if(O=j(V).match(st),O&&5==O.length){var Y=O;O=function(t){return y(t,+Y[1],+Y[2],+Y[3],+Y[4],x)}}else O=St;if(d=l.start||r.start||+new Date,_={anim:r,percent:n,timestamp:d,start:d+(r.del||0),status:0,initstatus:a||0,stop:!1,ms:x,easing:O,from:v,diff:b,to:m,el:i,callback:l.callback,prev:p,next:f,repeat:o||r.times,origin:i.attr(),totalOrigin:s},Ee.push(_),a&&!h&&!u&&(_.stop=!0,_.start=new Date-x*a,1==Ee.length))return Ne();u&&(_.start=new Date-_.ms*a),1==Ee.length&&Me(Ne)}t("raphael.anim.start."+i.id,i,r)}}function _(t){for(var e=0;e<Ee.length;e++)Ee[e].el.paper==t&&Ee.splice(e--,1)}e.version="2.2.0",e.eve=t;var w,k=/[, ]+/,B={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},C=/\{(\d+)\}/g,S="prototype",T="hasOwnProperty",A={doc:document,win:window},E={was:Object.prototype[T].call(A.win,"Raphael"),is:A.win.Raphael},M=function(){this.ca=this.customAttributes={}},N,L="appendChild",z="apply",P="concat",F="ontouchstart"in A.win||A.win.DocumentTouch&&A.doc instanceof DocumentTouch,R="",I=" ",j=String,q="split",D="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[q](I),V={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},O=j.prototype.toLowerCase,Y=Math,W=Y.max,G=Y.min,H=Y.abs,X=Y.pow,U=Y.PI,$="number",Z="string",Q="array",J="toString",K="fill",tt=Object.prototype.toString,et={},rt="push",it=e._ISURL=/^url\(['"]?(.+?)['"]?\)$/i,nt=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,at={NaN:1,Infinity:1,"-Infinity":1},st=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,ot=Y.round,lt="setAttribute",ht=parseFloat,ut=parseInt,ct=j.prototype.toUpperCase,ft=e._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0,"class":""},pt=e._availableAnimAttrs={blur:$,"clip-rect":"csv",cx:$,cy:$,fill:"colour","fill-opacity":$,"font-size":$,height:$,opacity:$,path:"path",r:$,rx:$,ry:$,stroke:"colour","stroke-opacity":$,"stroke-width":$,transform:"transform",width:$,x:$,y:$},dt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,gt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,xt={hs:1,rg:1},vt=/,?([achlmqrstvxz]),?/gi,yt=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,mt=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,bt=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,_t=e._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,wt={},kt=function(t,e){return t.key-e.key},Bt=function(t,e){return ht(t)-ht(e)},Ct=function(){},St=function(t){return t},Tt=e._rectPath=function(t,e,r,i,n){return n?[["M",t+n,e],["l",r-2*n,0],["a",n,n,0,0,1,n,n],["l",0,i-2*n],["a",n,n,0,0,1,-n,n],["l",2*n-r,0],["a",n,n,0,0,1,-n,-n],["l",0,2*n-i],["a",n,n,0,0,1,n,-n],["z"]]:[["M",t,e],["l",r,0],["l",0,i],["l",-r,0],["z"]]},At=function(t,e,r,i){return null==i&&(i=r),[["M",t,e],["m",0,-i],["a",r,i,0,1,1,0,2*i],["a",r,i,0,1,1,0,-2*i],["z"]]},Et=e._getPath={path:function(t){return t.attr("path")},circle:function(t){var e=t.attrs;return At(e.cx,e.cy,e.r)},ellipse:function(t){var e=t.attrs;return At(e.cx,e.cy,e.rx,e.ry)},rect:function(t){var e=t.attrs;return Tt(e.x,e.y,e.width,e.height,e.r)},image:function(t){var e=t.attrs;return Tt(e.x,e.y,e.width,e.height)},text:function(t){var e=t._getBBox();return Tt(e.x,e.y,e.width,e.height)},set:function(t){var e=t._getBBox();return Tt(e.x,e.y,e.width,e.height)}},Mt=e.mapPath=function(t,e){if(!e)return t;var r,i,n,a,s,o,l;for(t=Qt(t),n=0,s=t.length;s>n;n++)for(l=t[n],a=1,o=l.length;o>a;a+=2)r=e.x(l[a],l[a+1]),i=e.y(l[a],l[a+1]),l[a]=r,l[a+1]=i;return t};if(e._g=A,e.type=A.win.SVGAngle||A.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML","VML"==e.type){var Nt=A.doc.createElement("div"),Lt;if(Nt.innerHTML='<v:shape adj="1"/>',Lt=Nt.firstChild,Lt.style.behavior="url(#default#VML)",!Lt||"object"!=typeof Lt.adj)return e.type=R;Nt=null}e.svg=!(e.vml="VML"==e.type),e._Paper=M,e.fn=N=M.prototype=e.prototype,e._id=0,e.is=function(t,e){return e=O.call(e),"finite"==e?!at[T](+t):"array"==e?t instanceof Array:"null"==e&&null===t||e==typeof t&&null!==t||"object"==e&&t===Object(t)||"array"==e&&Array.isArray&&Array.isArray(t)||tt.call(t).slice(8,-1).toLowerCase()==e},e.angle=function(t,r,i,n,a,s){if(null==a){var o=t-i,l=r-n;return o||l?(180+180*Y.atan2(-l,-o)/U+360)%360:0}return e.angle(t,r,a,s)-e.angle(i,n,a,s)},e.rad=function(t){return t%360*U/180},e.deg=function(t){return Math.round(180*t/U%360*1e3)/1e3},e.snapTo=function(t,r,i){if(i=e.is(i,"finite")?i:10,e.is(t,Q)){for(var n=t.length;n--;)if(H(t[n]-r)<=i)return t[n]}else{t=+t;var a=r%t;if(i>a)return r-a;if(a>t-i)return r-a+t}return r};var zt=e.createUUID=function(t,e){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t,e).toUpperCase()}}(/[xy]/g,function(t){var e=16*Y.random()|0,r="x"==t?e:3&e|8;return r.toString(16)});e.setWindow=function(r){t("raphael.setWindow",e,A.win,r),A.win=r,A.doc=A.win.document,e._engine.initWin&&e._engine.initWin(A.win)};var Pt=function(t){if(e.vml){var r=/^\s+|\s+$/g,i;try{var a=new ActiveXObject("htmlfile");a.write("<body>"),a.close(),i=a.body}catch(s){i=createPopup().document.body}var o=i.createTextRange();Pt=n(function(t){try{i.style.color=j(t).replace(r,R);var e=o.queryCommandValue("ForeColor");return e=(255&e)<<16|65280&e|(16711680&e)>>>16,"#"+("000000"+e.toString(16)).slice(-6)}catch(n){return"none"}})}else{var l=A.doc.createElement("i");l.title="Raphaël Colour Picker",l.style.display="none",A.doc.body.appendChild(l),Pt=n(function(t){return l.style.color=t,A.doc.defaultView.getComputedStyle(l,R).getPropertyValue("color")})}return Pt(t)},Ft=function(){return"hsb("+[this.h,this.s,this.b]+")"},Rt=function(){return"hsl("+[this.h,this.s,this.l]+")"},It=function(){return this.hex},jt=function(t,r,i){if(null==r&&e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t&&(i=t.b,r=t.g,t=t.r),null==r&&e.is(t,Z)){var n=e.getRGB(t);t=n.r,r=n.g,i=n.b}return(t>1||r>1||i>1)&&(t/=255,r/=255,i/=255),[t,r,i]},qt=function(t,r,i,n){t*=255,r*=255,i*=255;var a={r:t,g:r,b:i,hex:e.rgb(t,r,i),toString:It};return e.is(n,"finite")&&(a.opacity=n),a};e.color=function(t){var r;return e.is(t,"object")&&"h"in t&&"s"in t&&"b"in t?(r=e.hsb2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):e.is(t,"object")&&"h"in t&&"s"in t&&"l"in t?(r=e.hsl2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):(e.is(t,"string")&&(t=e.getRGB(t)),e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t?(r=e.rgb2hsl(t),t.h=r.h,t.s=r.s,t.l=r.l,r=e.rgb2hsb(t),t.v=r.b):(t={hex:"none"},t.r=t.g=t.b=t.h=t.s=t.v=t.l=-1)),t.toString=It,t},e.hsb2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"b"in t&&(r=t.b,e=t.s,i=t.o,t=t.h),t*=360;var n,a,s,o,l;return t=t%360/60,l=r*e,o=l*(1-H(t%2-1)),n=a=s=r-l,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.hsl2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"l"in t&&(r=t.l,e=t.s,t=t.h),(t>1||e>1||r>1)&&(t/=360,e/=100,r/=100),t*=360;var n,a,s,o,l;return t=t%360/60,l=2*e*(.5>r?r:1-r),o=l*(1-H(t%2-1)),n=a=s=r-l/2,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.rgb2hsb=function(t,e,r){r=jt(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s;return a=W(t,e,r),s=a-G(t,e,r),i=0==s?null:a==t?(e-r)/s:a==e?(r-t)/s+2:(t-e)/s+4,i=(i+360)%6*60/360,n=0==s?0:s/a,{h:i,s:n,b:a,toString:Ft}},e.rgb2hsl=function(t,e,r){r=jt(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s,o,l;return s=W(t,e,r),o=G(t,e,r),l=s-o,i=0==l?null:s==t?(e-r)/l:s==e?(r-t)/l+2:(t-e)/l+4,i=(i+360)%6*60/360,a=(s+o)/2,n=0==l?0:.5>a?l/(2*a):l/(2-2*a),{h:i,s:n,l:a,toString:Rt}},e._path2string=function(){return this.join(",").replace(vt,"$1")};var Dt=e._preload=function(t,e){var r=A.doc.createElement("img");r.style.cssText="position:absolute;left:-9999em;top:-9999em",r.onload=function(){e.call(this),this.onload=null,A.doc.body.removeChild(this)},r.onerror=function(){A.doc.body.removeChild(this)},A.doc.body.appendChild(r),r.src=t};e.getRGB=n(function(t){if(!t||(t=j(t)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a};if("none"==t)return{r:-1,g:-1,b:-1,hex:"none",toString:a};!(xt[T](t.toLowerCase().substring(0,2))||"#"==t.charAt())&&(t=Pt(t));var r,i,n,s,o,l,h,u=t.match(nt);return u?(u[2]&&(s=ut(u[2].substring(5),16),n=ut(u[2].substring(3,5),16),i=ut(u[2].substring(1,3),16)),u[3]&&(s=ut((l=u[3].charAt(3))+l,16),n=ut((l=u[3].charAt(2))+l,16),i=ut((l=u[3].charAt(1))+l,16)),u[4]&&(h=u[4][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),"rgba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100)),u[5]?(h=u[5][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsb2rgb(i,n,s,o)):u[6]?(h=u[6][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsla"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsl2rgb(i,n,s,o)):(u={r:i,g:n,b:s,toString:a},u.hex="#"+(16777216|s|n<<8|i<<16).toString(16).slice(1),e.is(o,"finite")&&(u.opacity=o),u)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a}},e),e.hsb=n(function(t,r,i){return e.hsb2rgb(t,r,i).hex}),e.hsl=n(function(t,r,i){return e.hsl2rgb(t,r,i).hex}),e.rgb=n(function(t,e,r){function i(t){return t+.5|0}return"#"+(16777216|i(r)|i(e)<<8|i(t)<<16).toString(16).slice(1)}),e.getColor=function(t){var e=this.getColor.start=this.getColor.start||{h:0,s:1,b:t||.75},r=this.hsb2rgb(e.h,e.s,e.b);return e.h+=.075,e.h>1&&(e.h=0,e.s-=.2,e.s<=0&&(this.getColor.start={h:0,s:1,b:e.b})),r.hex},e.getColor.reset=function(){delete this.start},e.parsePathString=function(t){if(!t)return null;var r=Vt(t);if(r.arr)return Yt(r.arr);var i={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},n=[];return e.is(t,Q)&&e.is(t[0],Q)&&(n=Yt(t)),n.length||j(t).replace(yt,function(t,e,r){var a=[],s=e.toLowerCase();if(r.replace(bt,function(t,e){e&&a.push(+e)}),"m"==s&&a.length>2&&(n.push([e][P](a.splice(0,2))),s="l",e="m"==e?"l":"L"),"r"==s)n.push([e][P](a));else for(;a.length>=i[s]&&(n.push([e][P](a.splice(0,i[s]))),i[s]););}),n.toString=e._path2string,r.arr=Yt(n),n},e.parseTransformString=n(function(t){if(!t)return null;var r={r:3,s:4,t:2,m:6},i=[];return e.is(t,Q)&&e.is(t[0],Q)&&(i=Yt(t)),i.length||j(t).replace(mt,function(t,e,r){var n=[],a=O.call(e);r.replace(bt,function(t,e){e&&n.push(+e)}),i.push([e][P](n))}),i.toString=e._path2string,i});var Vt=function(t){var e=Vt.ps=Vt.ps||{};return e[t]?e[t].sleep=100:e[t]={sleep:100},setTimeout(function(){for(var r in e)e[T](r)&&r!=t&&(e[r].sleep--,!e[r].sleep&&delete e[r])}),e[t]};e.findDotsAtSegment=function(t,e,r,i,n,a,s,o,l){var h=1-l,u=X(h,3),c=X(h,2),f=l*l,p=f*l,d=u*t+3*c*l*r+3*h*l*l*n+p*s,g=u*e+3*c*l*i+3*h*l*l*a+p*o,x=t+2*l*(r-t)+f*(n-2*r+t),v=e+2*l*(i-e)+f*(a-2*i+e),y=r+2*l*(n-r)+f*(s-2*n+r),m=i+2*l*(a-i)+f*(o-2*a+i),b=h*t+l*r,_=h*e+l*i,w=h*n+l*s,k=h*a+l*o,B=90-180*Y.atan2(x-y,v-m)/U;return(x>y||m>v)&&(B+=180),{x:d,y:g,m:{x:x,y:v},n:{x:y,y:m},start:{x:b,y:_},end:{x:w,y:k},alpha:B}},e.bezierBBox=function(t,r,i,n,a,s,o,l){e.is(t,"array")||(t=[t,r,i,n,a,s,o,l]);var h=Zt.apply(null,t);return{x:h.min.x,y:h.min.y,x2:h.max.x,y2:h.max.y,width:h.max.x-h.min.x,height:h.max.y-h.min.y}},e.isPointInsideBBox=function(t,e,r){return e>=t.x&&e<=t.x2&&r>=t.y&&r<=t.y2},e.isBBoxIntersect=function(t,r){var i=e.isPointInsideBBox;return i(r,t.x,t.y)||i(r,t.x2,t.y)||i(r,t.x,t.y2)||i(r,t.x2,t.y2)||i(t,r.x,r.y)||i(t,r.x2,r.y)||i(t,r.x,r.y2)||i(t,r.x2,r.y2)||(t.x<r.x2&&t.x>r.x||r.x<t.x2&&r.x>t.x)&&(t.y<r.y2&&t.y>r.y||r.y<t.y2&&r.y>t.y)},e.pathIntersection=function(t,e){return d(t,e)},e.pathIntersectionNumber=function(t,e){return d(t,e,1)},e.isPointInsidePath=function(t,r,i){var n=e.pathBBox(t);return e.isPointInsideBBox(n,r,i)&&d(t,[["M",r,i],["H",n.x2+10]],1)%2==1},e._removedFactory=function(e){return function(){t("raphael.log",null,"Raphaël: you are calling to method “"+e+"” of removed object",e)}};var Ot=e.pathBBox=function(t){var e=Vt(t);if(e.bbox)return r(e.bbox);if(!t)return{x:0,y:0,width:0,height:0,x2:0,y2:0};t=Qt(t);for(var i=0,n=0,a=[],s=[],o,l=0,h=t.length;h>l;l++)if(o=t[l],"M"==o[0])i=o[1],n=o[2],a.push(i),s.push(n);else{var u=Zt(i,n,o[1],o[2],o[3],o[4],o[5],o[6]);a=a[P](u.min.x,u.max.x),s=s[P](u.min.y,u.max.y),i=o[5],n=o[6]}var c=G[z](0,a),f=G[z](0,s),p=W[z](0,a),d=W[z](0,s),g=p-c,x=d-f,v={x:c,y:f,x2:p,y2:d,width:g,height:x,cx:c+g/2,cy:f+x/2};return e.bbox=r(v),v},Yt=function(t){var i=r(t);return i.toString=e._path2string,i},Wt=e._pathToRelative=function(t){var r=Vt(t);if(r.rel)return Yt(r.rel);e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t));var i=[],n=0,a=0,s=0,o=0,l=0;"M"==t[0][0]&&(n=t[0][1],a=t[0][2],s=n,o=a,l++,i.push(["M",n,a]));for(var h=l,u=t.length;u>h;h++){var c=i[h]=[],f=t[h];if(f[0]!=O.call(f[0]))switch(c[0]=O.call(f[0]),c[0]){case"a":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]-n).toFixed(3),c[7]=+(f[7]-a).toFixed(3);break;case"v":c[1]=+(f[1]-a).toFixed(3);break;case"m":s=f[1],o=f[2];default:for(var p=1,d=f.length;d>p;p++)c[p]=+(f[p]-(p%2?n:a)).toFixed(3)}else{c=i[h]=[],"m"==f[0]&&(s=f[1]+n,o=f[2]+a);for(var g=0,x=f.length;x>g;g++)i[h][g]=f[g]}var v=i[h].length;switch(i[h][0]){case"z":n=s,a=o;break;case"h":n+=+i[h][v-1];break;case"v":a+=+i[h][v-1];break;default:n+=+i[h][v-2],a+=+i[h][v-1]}}return i.toString=e._path2string,r.rel=Yt(i),i},Gt=e._pathToAbsolute=function(t){var r=Vt(t);if(r.abs)return Yt(r.abs);if(e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t)),!t||!t.length)return[["M",0,0]];var i=[],n=0,a=0,o=0,l=0,h=0;"M"==t[0][0]&&(n=+t[0][1],a=+t[0][2],o=n,l=a,h++,i[0]=["M",n,a]);for(var u=3==t.length&&"M"==t[0][0]&&"R"==t[1][0].toUpperCase()&&"Z"==t[2][0].toUpperCase(),c,f,p=h,d=t.length;d>p;p++){if(i.push(c=[]),f=t[p],f[0]!=ct.call(f[0]))switch(c[0]=ct.call(f[0]),c[0]){case"A":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]+n),c[7]=+(f[7]+a);break;case"V":c[1]=+f[1]+a;break;case"H":c[1]=+f[1]+n;break;case"R":for(var g=[n,a][P](f.slice(1)),x=2,v=g.length;v>x;x++)g[x]=+g[x]+n,g[++x]=+g[x]+a;i.pop(),i=i[P](s(g,u));break;case"M":o=+f[1]+n,l=+f[2]+a;default:for(x=1,v=f.length;v>x;x++)c[x]=+f[x]+(x%2?n:a)}else if("R"==f[0])g=[n,a][P](f.slice(1)),i.pop(),i=i[P](s(g,u)),c=["R"][P](f.slice(-2));else for(var y=0,m=f.length;m>y;y++)c[y]=f[y];switch(c[0]){case"Z":n=o,a=l;break;case"H":n=c[1];break;case"V":a=c[1];break;case"M":o=c[c.length-2],l=c[c.length-1];default:n=c[c.length-2],a=c[c.length-1]}}return i.toString=e._path2string,r.abs=Yt(i),i},Ht=function(t,e,r,i){return[t,e,r,i,r,i]},Xt=function(t,e,r,i,n,a){var s=1/3,o=2/3;return[s*t+o*r,s*e+o*i,s*n+o*r,s*a+o*i,n,a]},Ut=function(t,e,r,i,a,s,o,l,h,u){var c=120*U/180,f=U/180*(+a||0),p=[],d,g=n(function(t,e,r){var i=t*Y.cos(r)-e*Y.sin(r),n=t*Y.sin(r)+e*Y.cos(r);return{x:i,y:n}});if(u)S=u[0],T=u[1],B=u[2],C=u[3];else{d=g(t,e,-f),t=d.x,e=d.y,d=g(l,h,-f),l=d.x,h=d.y;var x=Y.cos(U/180*a),v=Y.sin(U/180*a),y=(t-l)/2,m=(e-h)/2,b=y*y/(r*r)+m*m/(i*i);b>1&&(b=Y.sqrt(b),r=b*r,i=b*i);var _=r*r,w=i*i,k=(s==o?-1:1)*Y.sqrt(H((_*w-_*m*m-w*y*y)/(_*m*m+w*y*y))),B=k*r*m/i+(t+l)/2,C=k*-i*y/r+(e+h)/2,S=Y.asin(((e-C)/i).toFixed(9)),T=Y.asin(((h-C)/i).toFixed(9));S=B>t?U-S:S,T=B>l?U-T:T,0>S&&(S=2*U+S),0>T&&(T=2*U+T),o&&S>T&&(S-=2*U),!o&&T>S&&(T-=2*U)}var A=T-S;if(H(A)>c){var E=T,M=l,N=h;T=S+c*(o&&T>S?1:-1),l=B+r*Y.cos(T),h=C+i*Y.sin(T),p=Ut(l,h,r,i,a,0,o,M,N,[T,E,B,C])}A=T-S;var L=Y.cos(S),z=Y.sin(S),F=Y.cos(T),R=Y.sin(T),I=Y.tan(A/4),j=4/3*r*I,D=4/3*i*I,V=[t,e],O=[t+j*z,e-D*L],W=[l+j*R,h-D*F],G=[l,h];if(O[0]=2*V[0]-O[0],O[1]=2*V[1]-O[1],u)return[O,W,G][P](p);p=[O,W,G][P](p).join()[q](",");for(var X=[],$=0,Z=p.length;Z>$;$++)X[$]=$%2?g(p[$-1],p[$],f).y:g(p[$],p[$+1],f).x;return X},$t=function(t,e,r,i,n,a,s,o,l){var h=1-l;return{x:X(h,3)*t+3*X(h,2)*l*r+3*h*l*l*n+X(l,3)*s,y:X(h,3)*e+3*X(h,2)*l*i+3*h*l*l*a+X(l,3)*o}},Zt=n(function(t,e,r,i,n,a,s,o){var l=n-2*r+t-(s-2*n+r),h=2*(r-t)-2*(n-r),u=t-r,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,p=[e,o],d=[t,s],g;return H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&1>c&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&1>f&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),l=a-2*i+e-(o-2*a+i),h=2*(i-e)-2*(a-i),u=e-i,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&1>c&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&1>f&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),{min:{x:G[z](0,d),y:G[z](0,p)},max:{x:W[z](0,d),y:W[z](0,p)}}}),Qt=e._path2curve=n(function(t,e){var r=!e&&Vt(t);if(!e&&r.curve)return Yt(r.curve);for(var i=Gt(t),n=e&&Gt(e),a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},s={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},o=(function(t,e,r){var i,n,a={T:1,Q:1};if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y];switch(!(t[0]in a)&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2];break;case"A":t=["C"][P](Ut[z](0,[e.x,e.y][P](t.slice(1))));break;case"S":"C"==r||"S"==r?(i=2*e.x-e.bx,n=2*e.y-e.by):(i=e.x,n=e.y),t=["C",i,n][P](t.slice(1));break;case"T":"Q"==r||"T"==r?(e.qx=2*e.x-e.qx,e.qy=2*e.y-e.qy):(e.qx=e.x,e.qy=e.y),t=["C"][P](Xt(e.x,e.y,e.qx,e.qy,t[1],t[2]));break;case"Q":e.qx=t[1],e.qy=t[2],t=["C"][P](Xt(e.x,e.y,t[1],t[2],t[3],t[4]));break;case"L":t=["C"][P](Ht(e.x,e.y,t[1],t[2]));break;case"H":t=["C"][P](Ht(e.x,e.y,t[1],e.y));break;case"V":t=["C"][P](Ht(e.x,e.y,e.x,t[1]));break;case"Z":t=["C"][P](Ht(e.x,e.y,e.X,e.Y))}return t}),l=function(t,e){if(t[e].length>7){t[e].shift();for(var r=t[e];r.length;)u[e]="A",n&&(c[e]="A"),t.splice(e++,0,["C"][P](r.splice(0,6)));t.splice(e,1),g=W(i.length,n&&n.length||0)}},h=function(t,e,r,a,s){t&&e&&"M"==t[s][0]&&"M"!=e[s][0]&&(e.splice(s,0,["M",a.x,a.y]),r.bx=0,r.by=0,r.x=t[s][1],r.y=t[s][2],g=W(i.length,n&&n.length||0))},u=[],c=[],f="",p="",d=0,g=W(i.length,n&&n.length||0);g>d;d++){i[d]&&(f=i[d][0]),"C"!=f&&(u[d]=f,d&&(p=u[d-1])),i[d]=o(i[d],a,p),"A"!=u[d]&&"C"==f&&(u[d]="C"),l(i,d),n&&(n[d]&&(f=n[d][0]),"C"!=f&&(c[d]=f,d&&(p=c[d-1])),n[d]=o(n[d],s,p),"A"!=c[d]&&"C"==f&&(c[d]="C"),l(n,d)),h(i,n,a,s,d),h(n,i,s,a,d);var x=i[d],v=n&&n[d],y=x.length,m=n&&v.length;a.x=x[y-2],a.y=x[y-1],a.bx=ht(x[y-4])||a.x,a.by=ht(x[y-3])||a.y,s.bx=n&&(ht(v[m-4])||s.x),s.by=n&&(ht(v[m-3])||s.y),s.x=n&&v[m-2],s.y=n&&v[m-1]}return n||(r.curve=Yt(i)),n?[i,n]:i},null,Yt),Jt=e._parseDots=n(function(t){for(var r=[],i=0,n=t.length;n>i;i++){var a={},s=t[i].match(/^([^:]*):?([\d\.]*)/);if(a.color=e.getRGB(s[1]),a.color.error)return null;a.opacity=a.color.opacity,a.color=a.color.hex,s[2]&&(a.offset=s[2]+"%"),r.push(a)}for(i=1,n=r.length-1;n>i;i++)if(!r[i].offset){for(var o=ht(r[i-1].offset||0),l=0,h=i+1;n>h;h++)if(r[h].offset){l=r[h].offset;break}l||(l=100,h=n),l=ht(l);for(var u=(l-o)/(h-i+1);h>i;i++)o+=u,r[i].offset=o+"%"}return r}),Kt=e._tear=function(t,e){t==e.top&&(e.top=t.prev),t==e.bottom&&(e.bottom=t.next),t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next)},te=e._tofront=function(t,e){e.top!==t&&(Kt(t,e),t.next=null,t.prev=e.top,e.top.next=t,e.top=t)},ee=e._toback=function(t,e){e.bottom!==t&&(Kt(t,e),t.next=e.bottom,t.prev=null,e.bottom.prev=t,e.bottom=t)},re=e._insertafter=function(t,e,r){Kt(t,r),e==r.top&&(r.top=t),e.next&&(e.next.prev=t),t.next=e.next,t.prev=e,e.next=t},ie=e._insertbefore=function(t,e,r){Kt(t,r),e==r.bottom&&(r.bottom=t),e.prev&&(e.prev.next=t),t.prev=e.prev,e.prev=t,t.next=e},ne=e.toMatrix=function(t,e){var r=Ot(t),i={_:{transform:R},getBBox:function(){return r}};return se(i,e),i.matrix},ae=e.transformPath=function(t,e){return Mt(t,ne(t,e))},se=e._extractTransform=function(t,r){if(null==r)return t._.transform;r=j(r).replace(/\.{3}|\u2026/g,t._.transform||R);var i=e.parseTransformString(r),n=0,a=0,s=0,o=1,l=1,h=t._,u=new g;if(h.transform=i||[],i)for(var c=0,f=i.length;f>c;c++){var p=i[c],d=p.length,x=j(p[0]).toLowerCase(),v=p[0]!=x,y=v?u.invert():0,m,b,_,w,k;"t"==x&&3==d?v?(m=y.x(0,0),b=y.y(0,0),_=y.x(p[1],p[2]),w=y.y(p[1],p[2]),u.translate(_-m,w-b)):u.translate(p[1],p[2]):"r"==x?2==d?(k=k||t.getBBox(1),u.rotate(p[1],k.x+k.width/2,k.y+k.height/2),n+=p[1]):4==d&&(v?(_=y.x(p[2],p[3]),w=y.y(p[2],p[3]),u.rotate(p[1],_,w)):u.rotate(p[1],p[2],p[3]),n+=p[1]):"s"==x?2==d||3==d?(k=k||t.getBBox(1),u.scale(p[1],p[d-1],k.x+k.width/2,k.y+k.height/2),o*=p[1],l*=p[d-1]):5==d&&(v?(_=y.x(p[3],p[4]),w=y.y(p[3],p[4]),u.scale(p[1],p[2],_,w)):u.scale(p[1],p[2],p[3],p[4]),o*=p[1],l*=p[2]):"m"==x&&7==d&&u.add(p[1],p[2],p[3],p[4],p[5],p[6]),h.dirtyT=1,t.matrix=u}t.matrix=u,h.sx=o,h.sy=l,h.deg=n,h.dx=a=u.e,h.dy=s=u.f,1==o&&1==l&&!n&&h.bbox?(h.bbox.x+=+a,h.bbox.y+=+s):h.dirtyT=1},oe=function(t){var e=t[0];switch(e.toLowerCase()){case"t":return[e,0,0];case"m":return[e,1,0,0,1,0,0];case"r":return 4==t.length?[e,0,t[2],t[3]]:[e,0];case"s":return 5==t.length?[e,1,1,t[3],t[4]]:3==t.length?[e,1,1]:[e,1]}},le=e._equaliseTransform=function(t,r){r=j(r).replace(/\.{3}|\u2026/g,t),t=e.parseTransformString(t)||[],r=e.parseTransformString(r)||[];for(var i=W(t.length,r.length),n=[],a=[],s=0,o,l,h,u;i>s;s++){if(h=t[s]||oe(r[s]),u=r[s]||oe(h),h[0]!=u[0]||"r"==h[0].toLowerCase()&&(h[2]!=u[2]||h[3]!=u[3])||"s"==h[0].toLowerCase()&&(h[3]!=u[3]||h[4]!=u[4]))return;for(n[s]=[],a[s]=[],o=0,l=W(h.length,u.length);l>o;o++)o in h&&(n[s][o]=h[o]),o in u&&(a[s][o]=u[o])}return{from:n,to:a}};e._getContainer=function(t,r,i,n){var a;return a=null!=n||e.is(t,"object")?t:A.doc.getElementById(t),null!=a?a.tagName?null==r?{container:a,width:a.style.pixelWidth||a.offsetWidth,height:a.style.pixelHeight||a.offsetHeight}:{container:a,width:r,height:i}:{container:1,x:t,y:r,width:i,height:n}:void 0},e.pathToRelative=Wt,e._engine={},e.path2curve=Qt,e.matrix=function(t,e,r,i,n,a){return new g(t,e,r,i,n,a)},function(t){function r(t){return t[0]*t[0]+t[1]*t[1]}function i(t){var e=Y.sqrt(r(t));t[0]&&(t[0]/=e),t[1]&&(t[1]/=e)}t.add=function(t,e,r,i,n,a){var s=[[],[],[]],o=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],l=[[t,r,n],[e,i,a],[0,0,1]],h,u,c,f;for(t&&t instanceof g&&(l=[[t.a,t.c,t.e],[t.b,t.d,t.f],[0,0,1]]),h=0;3>h;h++)for(u=0;3>u;u++){for(f=0,c=0;3>c;c++)f+=o[h][c]*l[c][u];s[h][u]=f}this.a=s[0][0],this.b=s[1][0],this.c=s[0][1],this.d=s[1][1],this.e=s[0][2],this.f=s[1][2]},t.invert=function(){var t=this,e=t.a*t.d-t.b*t.c;return new g(t.d/e,-t.b/e,-t.c/e,t.a/e,(t.c*t.f-t.d*t.e)/e,(t.b*t.e-t.a*t.f)/e)},t.clone=function(){return new g(this.a,this.b,this.c,this.d,this.e,this.f)},t.translate=function(t,e){
this.add(1,0,0,1,t,e)},t.scale=function(t,e,r,i){null==e&&(e=t),(r||i)&&this.add(1,0,0,1,r,i),this.add(t,0,0,e,0,0),(r||i)&&this.add(1,0,0,1,-r,-i)},t.rotate=function(t,r,i){t=e.rad(t),r=r||0,i=i||0;var n=+Y.cos(t).toFixed(9),a=+Y.sin(t).toFixed(9);this.add(n,a,-a,n,r,i),this.add(1,0,0,1,-r,-i)},t.x=function(t,e){return t*this.a+e*this.c+this.e},t.y=function(t,e){return t*this.b+e*this.d+this.f},t.get=function(t){return+this[j.fromCharCode(97+t)].toFixed(4)},t.toString=function(){return e.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},t.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},t.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},t.split=function(){var t={};t.dx=this.e,t.dy=this.f;var n=[[this.a,this.c],[this.b,this.d]];t.scalex=Y.sqrt(r(n[0])),i(n[0]),t.shear=n[0][0]*n[1][0]+n[0][1]*n[1][1],n[1]=[n[1][0]-n[0][0]*t.shear,n[1][1]-n[0][1]*t.shear],t.scaley=Y.sqrt(r(n[1])),i(n[1]),t.shear/=t.scaley;var a=-n[0][1],s=n[1][1];return 0>s?(t.rotate=e.deg(Y.acos(s)),0>a&&(t.rotate=360-t.rotate)):t.rotate=e.deg(Y.asin(a)),t.isSimple=!(+t.shear.toFixed(9)||t.scalex.toFixed(9)!=t.scaley.toFixed(9)&&t.rotate),t.isSuperSimple=!+t.shear.toFixed(9)&&t.scalex.toFixed(9)==t.scaley.toFixed(9)&&!t.rotate,t.noRotation=!+t.shear.toFixed(9)&&!t.rotate,t},t.toTransformString=function(t){var e=t||this[q]();return e.isSimple?(e.scalex=+e.scalex.toFixed(4),e.scaley=+e.scaley.toFixed(4),e.rotate=+e.rotate.toFixed(4),(e.dx||e.dy?"t"+[e.dx,e.dy]:R)+(1!=e.scalex||1!=e.scaley?"s"+[e.scalex,e.scaley,0,0]:R)+(e.rotate?"r"+[e.rotate,0,0]:R)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(g.prototype);for(var he=function(){this.returnValue=!1},ue=function(){return this.originalEvent.preventDefault()},ce=function(){this.cancelBubble=!0},fe=function(){return this.originalEvent.stopPropagation()},pe=function(t){var e=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,r=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft;return{x:t.clientX+r,y:t.clientY+e}},de=function(){return A.doc.addEventListener?function(t,e,r,i){var n=function(t){var e=pe(t);return r.call(i,t,e.x,e.y)};if(t.addEventListener(e,n,!1),F&&V[e]){var a=function(e){for(var n=pe(e),a=e,s=0,o=e.targetTouches&&e.targetTouches.length;o>s;s++)if(e.targetTouches[s].target==t){e=e.targetTouches[s],e.originalEvent=a,e.preventDefault=ue,e.stopPropagation=fe;break}return r.call(i,e,n.x,n.y)};t.addEventListener(V[e],a,!1)}return function(){return t.removeEventListener(e,n,!1),F&&V[e]&&t.removeEventListener(V[e],a,!1),!0}}:A.doc.attachEvent?function(t,e,r,i){var n=function(t){t=t||A.win.event;var e=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,n=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft,a=t.clientX+n,s=t.clientY+e;return t.preventDefault=t.preventDefault||he,t.stopPropagation=t.stopPropagation||ce,r.call(i,t,a,s)};t.attachEvent("on"+e,n);var a=function(){return t.detachEvent("on"+e,n),!0};return a}:void 0}(),ge=[],xe=function(e){for(var r=e.clientX,i=e.clientY,n=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,a=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft,s,o=ge.length;o--;){if(s=ge[o],F&&e.touches){for(var l=e.touches.length,h;l--;)if(h=e.touches[l],h.identifier==s.el._drag.id){r=h.clientX,i=h.clientY,(e.originalEvent?e.originalEvent:e).preventDefault();break}}else e.preventDefault();var u=s.el.node,c,f=u.nextSibling,p=u.parentNode,d=u.style.display;A.win.opera&&p.removeChild(u),u.style.display="none",c=s.el.paper.getElementByPoint(r,i),u.style.display=d,A.win.opera&&(f?p.insertBefore(u,f):p.appendChild(u)),c&&t("raphael.drag.over."+s.el.id,s.el,c),r+=a,i+=n,t("raphael.drag.move."+s.el.id,s.move_scope||s.el,r-s.el._drag.x,i-s.el._drag.y,r,i,e)}},ve=function(r){e.unmousemove(xe).unmouseup(ve);for(var i=ge.length,n;i--;)n=ge[i],n.el._drag={},t("raphael.drag.end."+n.el.id,n.end_scope||n.start_scope||n.move_scope||n.el,r);ge=[]},ye=e.el={},me=D.length;me--;)!function(t){e[t]=ye[t]=function(r,i){return e.is(r,"function")&&(this.events=this.events||[],this.events.push({name:t,f:r,unbind:de(this.shape||this.node||A.doc,t,r,i||this)})),this},e["un"+t]=ye["un"+t]=function(r){for(var i=this.events||[],n=i.length;n--;)i[n].name!=t||!e.is(r,"undefined")&&i[n].f!=r||(i[n].unbind(),i.splice(n,1),!i.length&&delete this.events);return this}}(D[me]);ye.data=function(r,i){var n=wt[this.id]=wt[this.id]||{};if(0==arguments.length)return n;if(1==arguments.length){if(e.is(r,"object")){for(var a in r)r[T](a)&&this.data(a,r[a]);return this}return t("raphael.data.get."+this.id,this,n[r],r),n[r]}return n[r]=i,t("raphael.data.set."+this.id,this,i,r),this},ye.removeData=function(t){return null==t?wt[this.id]={}:wt[this.id]&&delete wt[this.id][t],this},ye.getData=function(){return r(wt[this.id]||{})},ye.hover=function(t,e,r,i){return this.mouseover(t,r).mouseout(e,i||r)},ye.unhover=function(t,e){return this.unmouseover(t).unmouseout(e)};var be=[];ye.drag=function(r,i,n,a,s,o){function l(l){(l.originalEvent||l).preventDefault();var h=l.clientX,u=l.clientY,c=A.doc.documentElement.scrollTop||A.doc.body.scrollTop,f=A.doc.documentElement.scrollLeft||A.doc.body.scrollLeft;if(this._drag.id=l.identifier,F&&l.touches)for(var p=l.touches.length,d;p--;)if(d=l.touches[p],this._drag.id=d.identifier,d.identifier==this._drag.id){h=d.clientX,u=d.clientY;break}this._drag.x=h+f,this._drag.y=u+c,!ge.length&&e.mousemove(xe).mouseup(ve),ge.push({el:this,move_scope:a,start_scope:s,end_scope:o}),i&&t.on("raphael.drag.start."+this.id,i),r&&t.on("raphael.drag.move."+this.id,r),n&&t.on("raphael.drag.end."+this.id,n),t("raphael.drag.start."+this.id,s||a||this,l.clientX+f,l.clientY+c,l)}return this._drag={},be.push({el:this,start:l}),this.mousedown(l),this},ye.onDragOver=function(e){e?t.on("raphael.drag.over."+this.id,e):t.unbind("raphael.drag.over."+this.id)},ye.undrag=function(){for(var r=be.length;r--;)be[r].el==this&&(this.unmousedown(be[r].start),be.splice(r,1),t.unbind("raphael.drag.*."+this.id));!be.length&&e.unmousemove(xe).unmouseup(ve),ge=[]},N.circle=function(t,r,i){var n=e._engine.circle(this,t||0,r||0,i||0);return this.__set__&&this.__set__.push(n),n},N.rect=function(t,r,i,n,a){var s=e._engine.rect(this,t||0,r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},N.ellipse=function(t,r,i,n){var a=e._engine.ellipse(this,t||0,r||0,i||0,n||0);return this.__set__&&this.__set__.push(a),a},N.path=function(t){t&&!e.is(t,Z)&&!e.is(t[0],Q)&&(t+=R);var r=e._engine.path(e.format[z](e,arguments),this);return this.__set__&&this.__set__.push(r),r},N.image=function(t,r,i,n,a){var s=e._engine.image(this,t||"about:blank",r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},N.text=function(t,r,i){var n=e._engine.text(this,t||0,r||0,j(i));return this.__set__&&this.__set__.push(n),n},N.set=function(t){!e.is(t,"array")&&(t=Array.prototype.splice.call(arguments,0,arguments.length));var r=new ze(t);return this.__set__&&this.__set__.push(r),r.paper=this,r.type="set",r},N.setStart=function(t){this.__set__=t||this.set()},N.setFinish=function(t){var e=this.__set__;return delete this.__set__,e},N.getSize=function(){var t=this.canvas.parentNode;return{width:t.offsetWidth,height:t.offsetHeight}},N.setSize=function(t,r){return e._engine.setSize.call(this,t,r)},N.setViewBox=function(t,r,i,n,a){return e._engine.setViewBox.call(this,t,r,i,n,a)},N.top=N.bottom=null,N.raphael=e;var _e=function(t){var e=t.getBoundingClientRect(),r=t.ownerDocument,i=r.body,n=r.documentElement,a=n.clientTop||i.clientTop||0,s=n.clientLeft||i.clientLeft||0,o=e.top+(A.win.pageYOffset||n.scrollTop||i.scrollTop)-a,l=e.left+(A.win.pageXOffset||n.scrollLeft||i.scrollLeft)-s;return{y:o,x:l}};N.getElementByPoint=function(t,e){var r=this,i=r.canvas,n=A.doc.elementFromPoint(t,e);if(A.win.opera&&"svg"==n.tagName){var a=_e(i),s=i.createSVGRect();s.x=t-a.x,s.y=e-a.y,s.width=s.height=1;var o=i.getIntersectionList(s,null);o.length&&(n=o[o.length-1])}if(!n)return null;for(;n.parentNode&&n!=i.parentNode&&!n.raphael;)n=n.parentNode;return n==r.canvas.parentNode&&(n=i),n=n&&n.raphael?r.getById(n.raphaelid):null},N.getElementsByBBox=function(t){var r=this.set();return this.forEach(function(i){e.isBBoxIntersect(i.getBBox(),t)&&r.push(i)}),r},N.getById=function(t){for(var e=this.bottom;e;){if(e.id==t)return e;e=e.next}return null},N.forEach=function(t,e){for(var r=this.bottom;r;){if(t.call(e,r)===!1)return this;r=r.next}return this},N.getElementsByPoint=function(t,e){var r=this.set();return this.forEach(function(i){i.isPointInside(t,e)&&r.push(i)}),r},ye.isPointInside=function(t,r){var i=this.realPath=Et[this.type](this);return this.attr("transform")&&this.attr("transform").length&&(i=e.transformPath(i,this.attr("transform"))),e.isPointInsidePath(i,t,r)},ye.getBBox=function(t){if(this.removed)return{};var e=this._;return t?(!e.dirty&&e.bboxwt||(this.realPath=Et[this.type](this),e.bboxwt=Ot(this.realPath),e.bboxwt.toString=v,e.dirty=0),e.bboxwt):((e.dirty||e.dirtyT||!e.bbox)&&(!e.dirty&&this.realPath||(e.bboxwt=0,this.realPath=Et[this.type](this)),e.bbox=Ot(Mt(this.realPath,this.matrix)),e.bbox.toString=v,e.dirty=e.dirtyT=0),e.bbox)},ye.clone=function(){if(this.removed)return null;var t=this.paper[this.type]().attr(this.attr());return this.__set__&&this.__set__.push(t),t},ye.glow=function(t){if("text"==this.type)return null;t=t||{};var e={width:(t.width||10)+(+this.attr("stroke-width")||1),fill:t.fill||!1,opacity:null==t.opacity?.5:t.opacity,offsetx:t.offsetx||0,offsety:t.offsety||0,color:t.color||"#000"},r=e.width/2,i=this.paper,n=i.set(),a=this.realPath||Et[this.type](this);a=this.matrix?Mt(a,this.matrix):a;for(var s=1;r+1>s;s++)n.push(i.path(a).attr({stroke:e.color,fill:e.fill?e.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(e.width/r*s).toFixed(3),opacity:+(e.opacity/r).toFixed(3)}));return n.insertBefore(this).translate(e.offsetx,e.offsety)};var we={},ke=function(t,r,i,n,a,s,o,u,c){return null==c?l(t,r,i,n,a,s,o,u):e.findDotsAtSegment(t,r,i,n,a,s,o,u,h(t,r,i,n,a,s,o,u,c))},Be=function(t,r){return function(i,n,a){i=Qt(i);for(var s,o,l,h,u="",c={},f,p=0,d=0,g=i.length;g>d;d++){if(l=i[d],"M"==l[0])s=+l[1],o=+l[2];else{if(h=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6]),p+h>n){if(r&&!c.start){if(f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),u+=["C"+f.start.x,f.start.y,f.m.x,f.m.y,f.x,f.y],a)return u;c.start=u,u=["M"+f.x,f.y+"C"+f.n.x,f.n.y,f.end.x,f.end.y,l[5],l[6]].join(),p+=h,s=+l[5],o=+l[6];continue}if(!t&&!r)return f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),{x:f.x,y:f.y,alpha:f.alpha}}p+=h,s=+l[5],o=+l[6]}u+=l.shift()+l}return c.end=u,f=t?p:r?c:e.findDotsAtSegment(s,o,l[0],l[1],l[2],l[3],l[4],l[5],1),f.alpha&&(f={x:f.x,y:f.y,alpha:f.alpha}),f}},Ce=Be(1),Se=Be(),Te=Be(0,1);e.getTotalLength=Ce,e.getPointAtLength=Se,e.getSubpath=function(t,e,r){if(this.getTotalLength(t)-r<1e-6)return Te(t,e).end;var i=Te(t,r,1);return e?Te(i,e).end:i},ye.getTotalLength=function(){var t=this.getPath();if(t)return this.node.getTotalLength?this.node.getTotalLength():Ce(t)},ye.getPointAtLength=function(t){var e=this.getPath();if(e)return Se(e,t)},ye.getPath=function(){var t,r=e._getPath[this.type];if("text"!=this.type&&"set"!=this.type)return r&&(t=r(this)),t},ye.getSubpath=function(t,r){var i=this.getPath();if(i)return e.getSubpath(i,t,r)};var Ae=e.easing_formulas={linear:function(t){return t},"<":function(t){return X(t,1.7)},">":function(t){return X(t,.48)},"<>":function(t){var e=.48-t/1.04,r=Y.sqrt(.1734+e*e),i=r-e,n=X(H(i),1/3)*(0>i?-1:1),a=-r-e,s=X(H(a),1/3)*(0>a?-1:1),o=n+s+.5;return 3*(1-o)*o*o+o*o*o},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},elastic:function(t){return t==!!t?t:X(2,-10*t)*Y.sin((t-.075)*(2*U)/.3)+1},bounce:function(t){var e=7.5625,r=2.75,i;return 1/r>t?i=e*t*t:2/r>t?(t-=1.5/r,i=e*t*t+.75):2.5/r>t?(t-=2.25/r,i=e*t*t+.9375):(t-=2.625/r,i=e*t*t+.984375),i}};Ae.easeIn=Ae["ease-in"]=Ae["<"],Ae.easeOut=Ae["ease-out"]=Ae[">"],Ae.easeInOut=Ae["ease-in-out"]=Ae["<>"],Ae["back-in"]=Ae.backIn,Ae["back-out"]=Ae.backOut;var Ee=[],Me=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){setTimeout(t,16)},Ne=function(){for(var r=+new Date,i=0;i<Ee.length;i++){var n=Ee[i];if(!n.el.removed&&!n.paused){var a=r-n.start,s=n.ms,o=n.easing,l=n.from,h=n.diff,u=n.to,c=n.t,f=n.el,p={},d,g={},x;if(n.initstatus?(a=(n.initstatus*n.anim.top-n.prev)/(n.percent-n.prev)*s,n.status=n.initstatus,delete n.initstatus,n.stop&&Ee.splice(i--,1)):n.status=(n.prev+(n.percent-n.prev)*(a/s))/n.anim.top,!(0>a))if(s>a){var v=o(a/s);for(var y in l)if(l[T](y)){switch(pt[y]){case $:d=+l[y]+v*s*h[y];break;case"colour":d="rgb("+[Le(ot(l[y].r+v*s*h[y].r)),Le(ot(l[y].g+v*s*h[y].g)),Le(ot(l[y].b+v*s*h[y].b))].join(",")+")";break;case"path":d=[];for(var m=0,_=l[y].length;_>m;m++){d[m]=[l[y][m][0]];for(var w=1,k=l[y][m].length;k>w;w++)d[m][w]=+l[y][m][w]+v*s*h[y][m][w];d[m]=d[m].join(I)}d=d.join(I);break;case"transform":if(h[y].real)for(d=[],m=0,_=l[y].length;_>m;m++)for(d[m]=[l[y][m][0]],w=1,k=l[y][m].length;k>w;w++)d[m][w]=l[y][m][w]+v*s*h[y][m][w];else{var B=function(t){return+l[y][t]+v*s*h[y][t]};d=[["m",B(0),B(1),B(2),B(3),B(4),B(5)]]}break;case"csv":if("clip-rect"==y)for(d=[],m=4;m--;)d[m]=+l[y][m]+v*s*h[y][m];break;default:var C=[][P](l[y]);for(d=[],m=f.paper.customAttributes[y].length;m--;)d[m]=+C[m]+v*s*h[y][m]}p[y]=d}f.attr(p),function(e,r,i){setTimeout(function(){t("raphael.anim.frame."+e,r,i)})}(f.id,f,n.anim)}else{if(function(r,i,n){setTimeout(function(){t("raphael.anim.frame."+i.id,i,n),t("raphael.anim.finish."+i.id,i,n),e.is(r,"function")&&r.call(i)})}(n.callback,f,n.anim),f.attr(u),Ee.splice(i--,1),n.repeat>1&&!n.next){for(x in u)u[T](x)&&(g[x]=n.totalOrigin[x]);n.el.attr(g),b(n.anim,n.el,n.anim.percents[0],null,n.totalOrigin,n.repeat-1)}n.next&&!n.stop&&b(n.anim,n.el,n.next,null,n.totalOrigin,n.repeat)}}}Ee.length&&Me(Ne)},Le=function(t){return t>255?255:0>t?0:t};ye.animateWith=function(t,r,i,n,a,s){var o=this;if(o.removed)return s&&s.call(o),o;var l=i instanceof m?i:e.animation(i,n,a,s),h,u;b(l,o,l.percents[0],null,o.attr());for(var c=0,f=Ee.length;f>c;c++)if(Ee[c].anim==r&&Ee[c].el==t){Ee[f-1].start=Ee[c].start;break}return o},ye.onAnimation=function(e){return e?t.on("raphael.anim.frame."+this.id,e):t.unbind("raphael.anim.frame."+this.id),this},m.prototype.delay=function(t){var e=new m(this.anim,this.ms);return e.times=this.times,e.del=+t||0,e},m.prototype.repeat=function(t){var e=new m(this.anim,this.ms);return e.del=this.del,e.times=Y.floor(W(t,0))||1,e},e.animation=function(t,r,i,n){if(t instanceof m)return t;!e.is(i,"function")&&i||(n=n||i||null,i=null),t=Object(t),r=+r||0;var a={},s,o;for(o in t)t[T](o)&&ht(o)!=o&&ht(o)+"%"!=o&&(s=!0,a[o]=t[o]);if(s)return i&&(a.easing=i),n&&(a.callback=n),new m({100:a},r);if(n){var l=0;for(var h in t){var u=ut(h);t[T](h)&&u>l&&(l=u)}l+="%",!t[l].callback&&(t[l].callback=n)}return new m(t,r)},ye.animate=function(t,r,i,n){var a=this;if(a.removed)return n&&n.call(a),a;var s=t instanceof m?t:e.animation(t,r,i,n);return b(s,a,s.percents[0],null,a.attr()),a},ye.setTime=function(t,e){return t&&null!=e&&this.status(t,G(e,t.ms)/t.ms),this},ye.status=function(t,e){var r=[],i=0,n,a;if(null!=e)return b(t,this,-1,G(e,1)),this;for(n=Ee.length;n>i;i++)if(a=Ee[i],a.el.id==this.id&&(!t||a.anim==t)){if(t)return a.status;r.push({anim:a.anim,status:a.status})}return t?0:r},ye.pause=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.pause."+this.id,this,Ee[r].anim)!==!1&&(Ee[r].paused=!0);return this},ye.resume=function(e){for(var r=0;r<Ee.length;r++)if(Ee[r].el.id==this.id&&(!e||Ee[r].anim==e)){var i=Ee[r];t("raphael.anim.resume."+this.id,this,i.anim)!==!1&&(delete i.paused,this.status(i.anim,i.status))}return this},ye.stop=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.stop."+this.id,this,Ee[r].anim)!==!1&&Ee.splice(r--,1);return this},t.on("raphael.remove",_),t.on("raphael.clear",_),ye.toString=function(){return"Raphaël’s object"};var ze=function(t){if(this.items=[],this.length=0,this.type="set",t)for(var e=0,r=t.length;r>e;e++)!t[e]||t[e].constructor!=ye.constructor&&t[e].constructor!=ze||(this[this.items.length]=this.items[this.items.length]=t[e],this.length++)},Pe=ze.prototype;Pe.push=function(){for(var t,e,r=0,i=arguments.length;i>r;r++)t=arguments[r],!t||t.constructor!=ye.constructor&&t.constructor!=ze||(e=this.items.length,this[e]=this.items[e]=t,this.length++);return this},Pe.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},Pe.forEach=function(t,e){for(var r=0,i=this.items.length;i>r;r++)if(t.call(e,this.items[r],r)===!1)return this;return this};for(var Fe in ye)ye[T](Fe)&&(Pe[Fe]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t][z](r,e)})}}(Fe));return Pe.attr=function(t,r){if(t&&e.is(t,Q)&&e.is(t[0],"object"))for(var i=0,n=t.length;n>i;i++)this.items[i].attr(t[i]);else for(var a=0,s=this.items.length;s>a;a++)this.items[a].attr(t,r);return this},Pe.clear=function(){for(;this.length;)this.pop()},Pe.splice=function(t,e,r){t=0>t?W(this.length+t,0):t,e=W(0,G(this.length-t,e));var i=[],n=[],a=[],s;for(s=2;s<arguments.length;s++)a.push(arguments[s]);for(s=0;e>s;s++)n.push(this[t+s]);for(;s<this.length-t;s++)i.push(this[t+s]);var o=a.length;for(s=0;s<o+i.length;s++)this.items[t+s]=this[t+s]=o>s?a[s]:i[s-o];for(s=this.items.length=this.length-=e-o;this[s];)delete this[s++];return new ze(n)},Pe.exclude=function(t){for(var e=0,r=this.length;r>e;e++)if(this[e]==t)return this.splice(e,1),!0},Pe.animate=function(t,r,i,n){(e.is(i,"function")||!i)&&(n=i||null);var a=this.items.length,s=a,o,l=this,h;if(!a)return this;n&&(h=function(){!--a&&n.call(l)}),i=e.is(i,Z)?i:h;var u=e.animation(t,r,i,h);for(o=this.items[--s].animate(u);s--;)this.items[s]&&!this.items[s].removed&&this.items[s].animateWith(o,u,u),this.items[s]&&!this.items[s].removed||a--;return this},Pe.insertAfter=function(t){for(var e=this.items.length;e--;)this.items[e].insertAfter(t);return this},Pe.getBBox=function(){for(var t=[],e=[],r=[],i=[],n=this.items.length;n--;)if(!this.items[n].removed){var a=this.items[n].getBBox();t.push(a.x),e.push(a.y),r.push(a.x+a.width),i.push(a.y+a.height)}return t=G[z](0,t),e=G[z](0,e),r=W[z](0,r),i=W[z](0,i),{x:t,y:e,x2:r,y2:i,width:r-t,height:i-e}},Pe.clone=function(t){t=this.paper.set();for(var e=0,r=this.items.length;r>e;e++)t.push(this.items[e].clone());return t},Pe.toString=function(){return"Raphaël‘s set"},Pe.glow=function(t){var e=this.paper.set();return this.forEach(function(r,i){var n=r.glow(t);null!=n&&n.forEach(function(t,r){e.push(t)})}),e},Pe.isPointInside=function(t,e){var r=!1;return this.forEach(function(i){return i.isPointInside(t,e)?(r=!0,!1):void 0}),r},e.registerFont=function(t){if(!t.face)return t;this.fonts=this.fonts||{};var e={w:t.w,face:{},glyphs:{}},r=t.face["font-family"];for(var i in t.face)t.face[T](i)&&(e.face[i]=t.face[i]);if(this.fonts[r]?this.fonts[r].push(e):this.fonts[r]=[e],!t.svg){e.face["units-per-em"]=ut(t.face["units-per-em"],10);for(var n in t.glyphs)if(t.glyphs[T](n)){var a=t.glyphs[n];if(e.glyphs[n]={w:a.w,k:{},d:a.d&&"M"+a.d.replace(/[mlcxtrv]/g,function(t){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[t]||"M"})+"z"},a.k)for(var s in a.k)a[T](s)&&(e.glyphs[n].k[s]=a.k[s])}}return t},N.getFont=function(t,r,i,n){if(n=n||"normal",i=i||"normal",r=+r||{normal:400,bold:700,lighter:300,bolder:800}[r]||400,e.fonts){var a=e.fonts[t];if(!a){var s=new RegExp("(^|\\s)"+t.replace(/[^\w\d\s+!~.:_-]/g,R)+"(\\s|$)","i");for(var o in e.fonts)if(e.fonts[T](o)&&s.test(o)){a=e.fonts[o];break}}var l;if(a)for(var h=0,u=a.length;u>h&&(l=a[h],l.face["font-weight"]!=r||l.face["font-style"]!=i&&l.face["font-style"]||l.face["font-stretch"]!=n);h++);return l}},N.print=function(t,r,i,n,a,s,o,l){s=s||"middle",o=W(G(o||0,1),-1),l=W(G(l||1,3),1);var h=j(i)[q](R),u=0,c=0,f=R,p;if(e.is(n,"string")&&(n=this.getFont(n)),n){p=(a||16)/n.face["units-per-em"];for(var d=n.face.bbox[q](k),g=+d[0],x=d[3]-d[1],v=0,y=+d[1]+("baseline"==s?x+ +n.face.descent:x/2),m=0,b=h.length;b>m;m++){if("\n"==h[m])u=0,w=0,c=0,v+=x*l;else{var _=c&&n.glyphs[h[m-1]]||{},w=n.glyphs[h[m]];u+=c?(_.w||n.w)+(_.k&&_.k[h[m]]||0)+n.w*o:0,c=1}w&&w.d&&(f+=e.transformPath(w.d,["t",u*p,v*p,"s",p,p,g,y,"t",(t-g)/p,(r-y)/p]))}}return this.path(f).attr({fill:"#000",stroke:"none"})},N.add=function(t){if(e.is(t,"array"))for(var r=this.set(),i=0,n=t.length,a;n>i;i++)a=t[i]||{},B[T](a.type)&&r.push(this[a.type]().attr(a));return r},e.format=function(t,r){var i=e.is(r,Q)?[0][P](r):arguments;return t&&e.is(t,Z)&&i.length-1&&(t=t.replace(C,function(t,e){return null==i[++e]?R:i[e]})),t||R},e.fullfill=function(){var t=/\{([^\}]+)\}/g,e=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,r=function(t,r,i){var n=i;return r.replace(e,function(t,e,r,i,a){e=e||i,n&&(e in n&&(n=n[e]),"function"==typeof n&&a&&(n=n()))}),n=(null==n||n==i?t:n)+""};return function(e,i){return String(e).replace(t,function(t,e){return r(t,e,i)})}}(),e.ninja=function(){if(E.was)A.win.Raphael=E.is;else{window.Raphael=void 0;try{delete window.Raphael}catch(t){}}return e},e.st=Pe,t.on("raphael.DOMload",function(){w=!0}),function(t,r,i){function n(){/in/.test(t.readyState)?setTimeout(n,9):e.eve("raphael.DOMload")}null==t.readyState&&t.addEventListener&&(t.addEventListener(r,i=function(){t.removeEventListener(r,i,!1),t.readyState="complete"},!1),t.readyState="loading"),n()}(document,"DOMContentLoaded"),e}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;!function(r){var a="0.4.2",s="hasOwnProperty",o=/[\.\/]/,l="*",h=function(){},u=function(t,e){return t-e},c,f,p={n:{}},d=function(t,e){t=String(t);var r=p,i=f,n=Array.prototype.slice.call(arguments,2),a=d.listeners(t),s=0,o=!1,l,h=[],g={},x=[],v=c,y=[];c=t,f=0;for(var m=0,b=a.length;b>m;m++)"zIndex"in a[m]&&(h.push(a[m].zIndex),a[m].zIndex<0&&(g[a[m].zIndex]=a[m]));for(h.sort(u);h[s]<0;)if(l=g[h[s++]],x.push(l.apply(e,n)),f)return f=i,x;for(m=0;b>m;m++)if(l=a[m],"zIndex"in l)if(l.zIndex==h[s]){if(x.push(l.apply(e,n)),f)break;do if(s++,l=g[h[s]],l&&x.push(l.apply(e,n)),f)break;while(l)}else g[l.zIndex]=l;else if(x.push(l.apply(e,n)),f)break;return f=i,c=v,x.length?x:null};d._events=p,d.listeners=function(t){var e=t.split(o),r=p,i,n,a,s,h,u,c,f,d=[r],g=[];for(s=0,h=e.length;h>s;s++){for(f=[],u=0,c=d.length;c>u;u++)for(r=d[u].n,n=[r[e[s]],r[l]],a=2;a--;)i=n[a],i&&(f.push(i),g=g.concat(i.f||[]));d=f}return g},d.on=function(t,e){if(t=String(t),"function"!=typeof e)return function(){};for(var r=t.split(o),i=p,n=0,a=r.length;a>n;n++)i=i.n,i=i.hasOwnProperty(r[n])&&i[r[n]]||(i[r[n]]={n:{}});for(i.f=i.f||[],n=0,a=i.f.length;a>n;n++)if(i.f[n]==e)return h;return i.f.push(e),function(t){+t==+t&&(e.zIndex=+t)}},d.f=function(t){var e=[].slice.call(arguments,1);return function(){d.apply(null,[t,null].concat(e).concat([].slice.call(arguments,0)))}},d.stop=function(){f=1},d.nt=function(t){return t?new RegExp("(?:\\.|\\/|^)"+t+"(?:\\.|\\/|$)").test(c):c},d.nts=function(){return c.split(o)},d.off=d.unbind=function(t,e){if(!t)return void(d._events=p={n:{}});var r=t.split(o),i,n,a,h,u,c,f,g=[p];for(h=0,u=r.length;u>h;h++)for(c=0;c<g.length;c+=a.length-2){if(a=[c,1],i=g[c].n,r[h]!=l)i[r[h]]&&a.push(i[r[h]]);else for(n in i)i[s](n)&&a.push(i[n]);g.splice.apply(g,a)}for(h=0,u=g.length;u>h;h++)for(i=g[h];i.n;){if(e){if(i.f){for(c=0,f=i.f.length;f>c;c++)if(i.f[c]==e){i.f.splice(c,1);break}!i.f.length&&delete i.f}for(n in i.n)if(i.n[s](n)&&i.n[n].f){var x=i.n[n].f;for(c=0,f=x.length;f>c;c++)if(x[c]==e){x.splice(c,1);break}!x.length&&delete i.n[n].f}}else{delete i.f;for(n in i.n)i.n[s](n)&&i.n[n].f&&delete i.n[n].f}i=i.n}},d.once=function(t,e){var r=function(){return d.unbind(t,r),e.apply(this,arguments)};return d.on(t,r)},d.version=a,d.toString=function(){return"You are running Eve "+a},"undefined"!=typeof t&&t.exports?t.exports=d:(i=[],n=function(){return d}.apply(e,i),!(void 0!==n&&(t.exports=n)))}(this)},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.svg){var e="hasOwnProperty",r=String,i=parseFloat,n=parseInt,a=Math,s=a.max,o=a.abs,l=a.pow,h=/[, ]+/,u=t.eve,c="",f=" ",p="http://www.w3.org/1999/xlink",d={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},g={};t.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var x=function(i,n){if(n){"string"==typeof i&&(i=x(i));for(var a in n)n[e](a)&&("xlink:"==a.substring(0,6)?i.setAttributeNS(p,a.substring(6),r(n[a])):i.setAttribute(a,r(n[a])))}else i=t._g.doc.createElementNS("http://www.w3.org/2000/svg",i),i.style&&(i.style.webkitTapHighlightColor="rgba(0,0,0,0)");return i},v=function(e,n){var h="linear",u=e.id+n,f=.5,p=.5,d=e.node,g=e.paper,v=d.style,y=t._g.doc.getElementById(u);if(!y){if(n=r(n).replace(t._radial_gradient,function(t,e,r){if(h="radial",e&&r){f=i(e),p=i(r);var n=2*(p>.5)-1;l(f-.5,2)+l(p-.5,2)>.25&&(p=a.sqrt(.25-l(f-.5,2))*n+.5)&&.5!=p&&(p=p.toFixed(5)-1e-5*n)}return c}),n=n.split(/\s*\-\s*/),"linear"==h){var b=n.shift();if(b=-i(b),isNaN(b))return null;var _=[0,0,a.cos(t.rad(b)),a.sin(t.rad(b))],w=1/(s(o(_[2]),o(_[3]))||1);_[2]*=w,_[3]*=w,_[2]<0&&(_[0]=-_[2],_[2]=0),_[3]<0&&(_[1]=-_[3],_[3]=0)}var k=t._parseDots(n);if(!k)return null;if(u=u.replace(/[\(\)\s,\xb0#]/g,"_"),e.gradient&&u!=e.gradient.id&&(g.defs.removeChild(e.gradient),delete e.gradient),!e.gradient){y=x(h+"Gradient",{id:u}),e.gradient=y,x(y,"radial"==h?{fx:f,fy:p}:{x1:_[0],y1:_[1],x2:_[2],y2:_[3],gradientTransform:e.matrix.invert()}),g.defs.appendChild(y);for(var B=0,C=k.length;C>B;B++)y.appendChild(x("stop",{offset:k[B].offset?k[B].offset:B?"100%":"0%","stop-color":k[B].color||"#fff","stop-opacity":isFinite(k[B].opacity)?k[B].opacity:1}))}}return x(d,{fill:m(u),opacity:1,"fill-opacity":1}),v.fill=c,v.opacity=1,v.fillOpacity=1,1},y=function(){var t=document.documentMode;return t&&(9===t||10===t)},m=function(t){if(y())return"url('#"+t+"')";var e=document.location,r=e.protocol+"//"+e.host+e.pathname+e.search;return"url('"+r+"#"+t+"')"},b=function(t){var e=t.getBBox(1);x(t.pattern,{patternTransform:t.matrix.invert()+" translate("+e.x+","+e.y+")"})},_=function(i,n,a){if("path"==i.type){for(var s=r(n).toLowerCase().split("-"),o=i.paper,l=a?"end":"start",h=i.node,u=i.attrs,f=u["stroke-width"],p=s.length,v="classic",y,m,b,_,w,k=3,B=3,C=5;p--;)switch(s[p]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":v=s[p];break;case"wide":B=5;break;case"narrow":B=2;break;case"long":k=5;break;case"short":k=2}if("open"==v?(k+=2,B+=2,C+=2,b=1,_=a?4:1,w={fill:"none",stroke:u.stroke}):(_=b=k/2,w={fill:u.stroke,stroke:"none"}),i._.arrows?a?(i._.arrows.endPath&&g[i._.arrows.endPath]--,i._.arrows.endMarker&&g[i._.arrows.endMarker]--):(i._.arrows.startPath&&g[i._.arrows.startPath]--,i._.arrows.startMarker&&g[i._.arrows.startMarker]--):i._.arrows={},"none"!=v){var S="raphael-marker-"+v,T="raphael-marker-"+l+v+k+B+"-obj"+i.id;t._g.doc.getElementById(S)?g[S]++:(o.defs.appendChild(x(x("path"),{"stroke-linecap":"round",d:d[v],id:S})),g[S]=1);var A=t._g.doc.getElementById(T),E;A?(g[T]++,E=A.getElementsByTagName("use")[0]):(A=x(x("marker"),{id:T,markerHeight:B,markerWidth:k,orient:"auto",refX:_,refY:B/2}),E=x(x("use"),{"xlink:href":"#"+S,transform:(a?"rotate(180 "+k/2+" "+B/2+") ":c)+"scale("+k/C+","+B/C+")","stroke-width":(1/((k/C+B/C)/2)).toFixed(4)}),A.appendChild(E),o.defs.appendChild(A),g[T]=1),x(E,w);var M=b*("diamond"!=v&&"oval"!=v);a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-M*f):(y=M*f,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),w={},w["marker-"+l]="url(#"+T+")",(m||y)&&(w.d=t.getSubpath(u.path,y,m)),x(h,w),i._.arrows[l+"Path"]=S,i._.arrows[l+"Marker"]=T,i._.arrows[l+"dx"]=M,i._.arrows[l+"Type"]=v,i._.arrows[l+"String"]=n}else a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-y):(y=0,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),i._.arrows[l+"Path"]&&x(h,{d:t.getSubpath(u.path,y,m)}),delete i._.arrows[l+"Path"],delete i._.arrows[l+"Marker"],delete i._.arrows[l+"dx"],delete i._.arrows[l+"Type"],delete i._.arrows[l+"String"];for(w in g)if(g[e](w)&&!g[w]){var N=t._g.doc.getElementById(w);N&&N.parentNode.removeChild(N)}}},w={"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},k=function(t,e,i){if(e=w[r(e).toLowerCase()]){for(var n=t.attrs["stroke-width"]||"1",a={round:n,square:n,butt:0}[t.attrs["stroke-linecap"]||i["stroke-linecap"]]||0,s=[],o=e.length;o--;)s[o]=e[o]*n+(o%2?1:-1)*a;x(t.node,{"stroke-dasharray":s.join(",")})}else x(t.node,{"stroke-dasharray":"none"})},B=function(i,a){var l=i.node,u=i.attrs,f=l.style.visibility;l.style.visibility="hidden";for(var d in a)if(a[e](d)){if(!t._availableAttrs[e](d))continue;var g=a[d];switch(u[d]=g,d){case"blur":i.blur(g);break;case"title":var y=l.getElementsByTagName("title");if(y.length&&(y=y[0]))y.firstChild.nodeValue=g;else{y=x("title");var m=t._g.doc.createTextNode(g);y.appendChild(m),l.appendChild(y)}break;case"href":case"target":var w=l.parentNode;if("a"!=w.tagName.toLowerCase()){var B=x("a");w.insertBefore(B,l),B.appendChild(l),w=B}"target"==d?w.setAttributeNS(p,"show","blank"==g?"new":g):w.setAttributeNS(p,d,g);break;case"cursor":l.style.cursor=g;break;case"transform":i.transform(g);break;case"arrow-start":_(i,g);break;case"arrow-end":_(i,g,1);break;case"clip-rect":var C=r(g).split(h);if(4==C.length){i.clip&&i.clip.parentNode.parentNode.removeChild(i.clip.parentNode);var T=x("clipPath"),A=x("rect");T.id=t.createUUID(),x(A,{x:C[0],y:C[1],width:C[2],height:C[3]}),T.appendChild(A),i.paper.defs.appendChild(T),x(l,{"clip-path":"url(#"+T.id+")"}),i.clip=A}if(!g){var E=l.getAttribute("clip-path");if(E){var M=t._g.doc.getElementById(E.replace(/(^url\(#|\)$)/g,c));M&&M.parentNode.removeChild(M),x(l,{"clip-path":c}),delete i.clip}}break;case"path":"path"==i.type&&(x(l,{d:g?u.path=t._pathToAbsolute(g):"M0,0"}),i._.dirty=1,i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1)));break;case"width":if(l.setAttribute(d,g),i._.dirty=1,!u.fx)break;d="x",g=u.x;case"x":u.fx&&(g=-u.x-(u.width||0));case"rx":if("rx"==d&&"rect"==i.type)break;case"cx":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"height":if(l.setAttribute(d,g),i._.dirty=1,!u.fy)break;d="y",g=u.y;case"y":u.fy&&(g=-u.y-(u.height||0));case"ry":if("ry"==d&&"rect"==i.type)break;case"cy":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"r":"rect"==i.type?x(l,{rx:g,ry:g}):l.setAttribute(d,g),i._.dirty=1;break;case"src":"image"==i.type&&l.setAttributeNS(p,"href",g);break;case"stroke-width":1==i._.sx&&1==i._.sy||(g/=s(o(i._.sx),o(i._.sy))||1),l.setAttribute(d,g),u["stroke-dasharray"]&&k(i,u["stroke-dasharray"],a),i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"stroke-dasharray":k(i,g,a);break;case"fill":var N=r(g).match(t._ISURL);if(N){T=x("pattern");var L=x("image");T.id=t.createUUID(),x(T,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),x(L,{x:0,y:0,"xlink:href":N[1]}),T.appendChild(L),function(e){t._preload(N[1],function(){var t=this.offsetWidth,r=this.offsetHeight;x(e,{width:t,height:r}),x(L,{width:t,height:r})})}(T),i.paper.defs.appendChild(T),x(l,{fill:"url(#"+T.id+")"}),i.pattern=T,i.pattern&&b(i);break}var z=t.getRGB(g);if(z.error){if(("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&v(i,g)){
if("opacity"in u||"fill-opacity"in u){var P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c));if(P){var F=P.getElementsByTagName("stop");x(F[F.length-1],{"stop-opacity":("opacity"in u?u.opacity:1)*("fill-opacity"in u?u["fill-opacity"]:1)})}}u.gradient=g,u.fill="none";break}}else delete a.gradient,delete u.gradient,!t.is(u.opacity,"undefined")&&t.is(a.opacity,"undefined")&&x(l,{opacity:u.opacity}),!t.is(u["fill-opacity"],"undefined")&&t.is(a["fill-opacity"],"undefined")&&x(l,{"fill-opacity":u["fill-opacity"]});z[e]("opacity")&&x(l,{"fill-opacity":z.opacity>1?z.opacity/100:z.opacity});case"stroke":z=t.getRGB(g),l.setAttribute(d,z.hex),"stroke"==d&&z[e]("opacity")&&x(l,{"stroke-opacity":z.opacity>1?z.opacity/100:z.opacity}),"stroke"==d&&i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"gradient":("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&v(i,g);break;case"opacity":u.gradient&&!u[e]("stroke-opacity")&&x(l,{"stroke-opacity":g>1?g/100:g});case"fill-opacity":if(u.gradient){P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c)),P&&(F=P.getElementsByTagName("stop"),x(F[F.length-1],{"stop-opacity":g}));break}default:"font-size"==d&&(g=n(g,10)+"px");var R=d.replace(/(\-.)/g,function(t){return t.substring(1).toUpperCase()});l.style[R]=g,i._.dirty=1,l.setAttribute(d,g)}}S(i,a),l.style.visibility=f},C=1.2,S=function(i,a){if("text"==i.type&&(a[e]("text")||a[e]("font")||a[e]("font-size")||a[e]("x")||a[e]("y"))){var s=i.attrs,o=i.node,l=o.firstChild?n(t._g.doc.defaultView.getComputedStyle(o.firstChild,c).getPropertyValue("font-size"),10):10;if(a[e]("text")){for(s.text=a.text;o.firstChild;)o.removeChild(o.firstChild);for(var h=r(a.text).split("\n"),u=[],f,p=0,d=h.length;d>p;p++)f=x("tspan"),p&&x(f,{dy:l*C,x:s.x}),f.appendChild(t._g.doc.createTextNode(h[p])),o.appendChild(f),u[p]=f}else for(u=o.getElementsByTagName("tspan"),p=0,d=u.length;d>p;p++)p?x(u[p],{dy:l*C,x:s.x}):x(u[0],{dy:0});x(o,{x:s.x,y:s.y}),i._.dirty=1;var g=i._getBBox(),v=s.y-(g.y+g.height/2);v&&t.is(v,"finite")&&x(u[0],{dy:v})}},T=function(t){return t.parentNode&&"a"===t.parentNode.tagName.toLowerCase()?t.parentNode:t},A=function(e,r){function i(){return("0000"+(Math.random()*Math.pow(36,5)<<0).toString(36)).slice(-5)}var n=0,a=0;this[0]=this.node=e,e.raphael=!0,this.id=i(),e.raphaelid=this.id,this.matrix=t.matrix(),this.realPath=null,this.paper=r,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},E=t.el;A.prototype=E,E.constructor=A,t._engine.path=function(t,e){var r=x("path");e.canvas&&e.canvas.appendChild(r);var i=new A(r,e);return i.type="path",B(i,{fill:"none",stroke:"#000",path:t}),i},E.rotate=function(t,e,n){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this.transform(this._.transform.concat([["r",t,e,n]])),this},E.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3])),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this},E.translate=function(t,e){return this.removed?this:(t=r(t).split(h),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this.transform(this._.transform.concat([["t",t,e]])),this)},E.transform=function(r){var i=this._;if(null==r)return i.transform;if(t._extractTransform(this,r),this.clip&&x(this.clip,{transform:this.matrix.invert()}),this.pattern&&b(this),this.node&&x(this.node,{transform:this.matrix}),1!=i.sx||1!=i.sy){var n=this.attrs[e]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":n})}return this},E.hide=function(){return this.removed||(this.node.style.display="none"),this},E.show=function(){return this.removed||(this.node.style.display=""),this},E.remove=function(){var e=T(this.node);if(!this.removed&&e.parentNode){var r=this.paper;r.__set__&&r.__set__.exclude(this),u.unbind("raphael.*.*."+this.id),this.gradient&&r.defs.removeChild(this.gradient),t._tear(this,r),e.parentNode.removeChild(e),this.removeData();for(var i in this)this[i]="function"==typeof this[i]?t._removedFactory(i):null;this.removed=!0}},E._getBBox=function(){if("none"==this.node.style.display){this.show();var t=!0}var e=!1,r;this.paper.canvas.parentElement?r=this.paper.canvas.parentElement.style:this.paper.canvas.parentNode&&(r=this.paper.canvas.parentNode.style),r&&"none"==r.display&&(e=!0,r.display="");var i={};try{i=this.node.getBBox()}catch(n){i={x:this.node.clientLeft,y:this.node.clientTop,width:this.node.clientWidth,height:this.node.clientHeight}}finally{i=i||{},e&&(r.display="none")}return t&&this.hide(),i},E.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if("fill"==r&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;if("transform"==r)return this._.transform;for(var s=r.split(h),o={},l=0,c=s.length;c>l;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return c-1?o:o[s[0]]}if(null==i&&t.is(r,"array")){for(o={},l=0,c=r.length;c>l;l++)o[r[l]]=this.attr(r[l]);return o}if(null!=i){var f={};f[r]=i}else null!=r&&t.is(r,"object")&&(f=r);for(var p in f)u("raphael.attr."+p+"."+this.id,this,f[p]);for(p in this.paper.customAttributes)if(this.paper.customAttributes[e](p)&&f[e](p)&&t.is(this.paper.customAttributes[p],"function")){var d=this.paper.customAttributes[p].apply(this,[].concat(f[p]));this.attrs[p]=f[p];for(var g in d)d[e](g)&&(f[g]=d[g])}return B(this,f),this},E.toFront=function(){if(this.removed)return this;var e=T(this.node);e.parentNode.appendChild(e);var r=this.paper;return r.top!=this&&t._tofront(this,r),this},E.toBack=function(){if(this.removed)return this;var e=T(this.node),r=e.parentNode;r.insertBefore(e,r.firstChild),t._toback(this,this.paper);var i=this.paper;return this},E.insertAfter=function(e){if(this.removed||!e)return this;var r=T(this.node),i=T(e.node||e[e.length-1].node);return i.nextSibling?i.parentNode.insertBefore(r,i.nextSibling):i.parentNode.appendChild(r),t._insertafter(this,e,this.paper),this},E.insertBefore=function(e){if(this.removed||!e)return this;var r=T(this.node),i=T(e.node||e[0].node);return i.parentNode.insertBefore(r,i),t._insertbefore(this,e,this.paper),this},E.blur=function(e){var r=this;if(0!==+e){var i=x("filter"),n=x("feGaussianBlur");r.attrs.blur=e,i.id=t.createUUID(),x(n,{stdDeviation:+e||1.5}),i.appendChild(n),r.paper.defs.appendChild(i),r._blur=i,x(r.node,{filter:"url(#"+i.id+")"})}else r._blur&&(r._blur.parentNode.removeChild(r._blur),delete r._blur,delete r.attrs.blur),r.node.removeAttribute("filter");return r},t._engine.circle=function(t,e,r,i){var n=x("circle");t.canvas&&t.canvas.appendChild(n);var a=new A(n,t);return a.attrs={cx:e,cy:r,r:i,fill:"none",stroke:"#000"},a.type="circle",x(n,a.attrs),a},t._engine.rect=function(t,e,r,i,n,a){var s=x("rect");t.canvas&&t.canvas.appendChild(s);var o=new A(s,t);return o.attrs={x:e,y:r,width:i,height:n,rx:a||0,ry:a||0,fill:"none",stroke:"#000"},o.type="rect",x(s,o.attrs),o},t._engine.ellipse=function(t,e,r,i,n){var a=x("ellipse");t.canvas&&t.canvas.appendChild(a);var s=new A(a,t);return s.attrs={cx:e,cy:r,rx:i,ry:n,fill:"none",stroke:"#000"},s.type="ellipse",x(a,s.attrs),s},t._engine.image=function(t,e,r,i,n,a){var s=x("image");x(s,{x:r,y:i,width:n,height:a,preserveAspectRatio:"none"}),s.setAttributeNS(p,"href",e),t.canvas&&t.canvas.appendChild(s);var o=new A(s,t);return o.attrs={x:r,y:i,width:n,height:a,src:e},o.type="image",o},t._engine.text=function(e,r,i,n){var a=x("text");e.canvas&&e.canvas.appendChild(a);var s=new A(a,e);return s.attrs={x:r,y:i,"text-anchor":"middle",text:n,"font-family":t._availableAttrs["font-family"],"font-size":t._availableAttrs["font-size"],stroke:"none",fill:"#000"},s.type="text",B(s,s.attrs),s},t._engine.setSize=function(t,e){return this.width=t||this.width,this.height=e||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox),this},t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e&&e.container,i=e.x,n=e.y,a=e.width,s=e.height;if(!r)throw new Error("SVG container not found.");var o=x("svg"),l="overflow:hidden;",h;return i=i||0,n=n||0,a=a||512,s=s||342,x(o,{height:s,version:1.1,width:a,xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),1==r?(o.style.cssText=l+"position:absolute;left:"+i+"px;top:"+n+"px",t._g.doc.body.appendChild(o),h=1):(o.style.cssText=l+"position:relative",r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o)),r=new t._Paper,r.width=a,r.height=s,r.canvas=o,r.clear(),r._left=r._top=0,h&&(r.renderfix=function(){}),r.renderfix(),r},t._engine.setViewBox=function(t,e,r,i,n){u("raphael.setViewBox",this,this._viewBox,[t,e,r,i,n]);var a=this.getSize(),o=s(r/a.width,i/a.height),l=this.top,h=n?"xMidYMid meet":"xMinYMin",c,p;for(null==t?(this._vbSize&&(o=1),delete this._vbSize,c="0 0 "+this.width+f+this.height):(this._vbSize=o,c=t+f+e+f+r+f+i),x(this.canvas,{viewBox:c,preserveAspectRatio:h});o&&l;)p="stroke-width"in l.attrs?l.attrs["stroke-width"]:1,l.attr({"stroke-width":p}),l._.dirty=1,l._.dirtyT=1,l=l.prev;return this._viewBox=[t,e,r,i,!!n],this},t.prototype.renderfix=function(){var t=this.canvas,e=t.style,r;try{r=t.getScreenCTM()||t.createSVGMatrix()}catch(i){r=t.createSVGMatrix()}var n=-r.e%1,a=-r.f%1;(n||a)&&(n&&(this._left=(this._left+n)%1,e.left=this._left+"px"),a&&(this._top=(this._top+a)%1,e.top=this._top+"px"))},t.prototype.clear=function(){t.eve("raphael.clear",this);for(var e=this.canvas;e.firstChild;)e.removeChild(e.firstChild);this.bottom=this.top=null,(this.desc=x("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël "+t.version)),e.appendChild(this.desc),e.appendChild(this.defs=x("defs"))},t.prototype.remove=function(){u("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null};var M=t.st;for(var N in E)E[e](N)&&!M[e](N)&&(M[N]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(N))}}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.vml){var e="hasOwnProperty",r=String,i=parseFloat,n=Math,a=n.round,s=n.max,o=n.min,l=n.abs,h="fill",u=/[, ]+/,c=t.eve,f=" progid:DXImageTransform.Microsoft",p=" ",d="",g={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},x=/([clmz]),?([^clmz]*)/gi,v=/ progid:\S+Blur\([^\)]+\)/g,y=/-?[^,\s-]+/g,m="position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",b=21600,_={path:1,rect:1,image:1},w={circle:1,ellipse:1},k=function(e){var i=/[ahqstv]/gi,n=t._pathToAbsolute;if(r(e).match(i)&&(n=t._path2curve),i=/[clmz]/g,n==t._pathToAbsolute&&!r(e).match(i)){var s=r(e).replace(x,function(t,e,r){var i=[],n="m"==e.toLowerCase(),s=g[e];return r.replace(y,function(t){n&&2==i.length&&(s+=i+g["m"==e?"l":"L"],i=[]),i.push(a(t*b))}),s+i});return s}var o=n(e),l,h;s=[];for(var u=0,c=o.length;c>u;u++){l=o[u],h=o[u][0].toLowerCase(),"z"==h&&(h="x");for(var f=1,v=l.length;v>f;f++)h+=a(l[f]*b)+(f!=v-1?",":d);s.push(h)}return s.join(p)},B=function(e,r,i){var n=t.matrix();return n.rotate(-e,.5,.5),{dx:n.x(r,i),dy:n.y(r,i)}},C=function(t,e,r,i,n,a){var s=t._,o=t.matrix,u=s.fillpos,c=t.node,f=c.style,d=1,g="",x,v=b/e,y=b/r;if(f.visibility="hidden",e&&r){if(c.coordsize=l(v)+p+l(y),f.rotation=a*(0>e*r?-1:1),a){var m=B(a,i,n);i=m.dx,n=m.dy}if(0>e&&(g+="x"),0>r&&(g+=" y")&&(d=-1),f.flip=g,c.coordorigin=i*-v+p+n*-y,u||s.fillsize){var _=c.getElementsByTagName(h);_=_&&_[0],c.removeChild(_),u&&(m=B(a,o.x(u[0],u[1]),o.y(u[0],u[1])),_.position=m.dx*d+p+m.dy*d),s.fillsize&&(_.size=s.fillsize[0]*l(e)+p+s.fillsize[1]*l(r)),c.appendChild(_)}f.visibility="visible"}};t.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var S=function(t,e,i){for(var n=r(e).toLowerCase().split("-"),a=i?"end":"start",s=n.length,o="classic",l="medium",h="medium";s--;)switch(n[s]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":o=n[s];break;case"wide":case"narrow":h=n[s];break;case"long":case"short":l=n[s]}var u=t.node.getElementsByTagName("stroke")[0];u[a+"arrow"]=o,u[a+"arrowlength"]=l,u[a+"arrowwidth"]=h},T=function(n,l){n.attrs=n.attrs||{};var c=n.node,f=n.attrs,g=c.style,x,v=_[n.type]&&(l.x!=f.x||l.y!=f.y||l.width!=f.width||l.height!=f.height||l.cx!=f.cx||l.cy!=f.cy||l.rx!=f.rx||l.ry!=f.ry||l.r!=f.r),y=w[n.type]&&(f.cx!=l.cx||f.cy!=l.cy||f.r!=l.r||f.rx!=l.rx||f.ry!=l.ry),m=n;for(var B in l)l[e](B)&&(f[B]=l[B]);if(v&&(f.path=t._getPath[n.type](n),n._.dirty=1),l.href&&(c.href=l.href),l.title&&(c.title=l.title),l.target&&(c.target=l.target),l.cursor&&(g.cursor=l.cursor),"blur"in l&&n.blur(l.blur),(l.path&&"path"==n.type||v)&&(c.path=k(~r(f.path).toLowerCase().indexOf("r")?t._pathToAbsolute(f.path):f.path),n._.dirty=1,"image"==n.type&&(n._.fillpos=[f.x,f.y],n._.fillsize=[f.width,f.height],C(n,1,1,0,0,0))),"transform"in l&&n.transform(l.transform),y){var T=+f.cx,E=+f.cy,M=+f.rx||+f.r||0,L=+f.ry||+f.r||0;c.path=t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",a((T-M)*b),a((E-L)*b),a((T+M)*b),a((E+L)*b),a(T*b)),n._.dirty=1}if("clip-rect"in l){var z=r(l["clip-rect"]).split(u);if(4==z.length){z[2]=+z[2]+ +z[0],z[3]=+z[3]+ +z[1];var P=c.clipRect||t._g.doc.createElement("div"),F=P.style;F.clip=t.format("rect({1}px {2}px {3}px {0}px)",z),c.clipRect||(F.position="absolute",F.top=0,F.left=0,F.width=n.paper.width+"px",F.height=n.paper.height+"px",c.parentNode.insertBefore(P,c),P.appendChild(c),c.clipRect=P)}l["clip-rect"]||c.clipRect&&(c.clipRect.style.clip="auto")}if(n.textpath){var R=n.textpath.style;l.font&&(R.font=l.font),l["font-family"]&&(R.fontFamily='"'+l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,d)+'"'),l["font-size"]&&(R.fontSize=l["font-size"]),l["font-weight"]&&(R.fontWeight=l["font-weight"]),l["font-style"]&&(R.fontStyle=l["font-style"])}if("arrow-start"in l&&S(m,l["arrow-start"]),"arrow-end"in l&&S(m,l["arrow-end"],1),null!=l.opacity||null!=l.fill||null!=l.src||null!=l.stroke||null!=l["stroke-width"]||null!=l["stroke-opacity"]||null!=l["fill-opacity"]||null!=l["stroke-dasharray"]||null!=l["stroke-miterlimit"]||null!=l["stroke-linejoin"]||null!=l["stroke-linecap"]){var I=c.getElementsByTagName(h),j=!1;if(I=I&&I[0],!I&&(j=I=N(h)),"image"==n.type&&l.src&&(I.src=l.src),l.fill&&(I.on=!0),null!=I.on&&"none"!=l.fill&&null!==l.fill||(I.on=!1),I.on&&l.fill){var q=r(l.fill).match(t._ISURL);if(q){I.parentNode==c&&c.removeChild(I),I.rotate=!0,I.src=q[1],I.type="tile";var D=n.getBBox(1);I.position=D.x+p+D.y,n._.fillpos=[D.x,D.y],t._preload(q[1],function(){n._.fillsize=[this.offsetWidth,this.offsetHeight]})}else I.color=t.getRGB(l.fill).hex,I.src=d,I.type="solid",t.getRGB(l.fill).error&&(m.type in{circle:1,ellipse:1}||"r"!=r(l.fill).charAt())&&A(m,l.fill,I)&&(f.fill="none",f.gradient=l.fill,I.rotate=!1)}if("fill-opacity"in l||"opacity"in l){var V=((+f["fill-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+t.getRGB(l.fill).o+1||2)-1);V=o(s(V,0),1),I.opacity=V,I.src&&(I.color="none")}c.appendChild(I);var O=c.getElementsByTagName("stroke")&&c.getElementsByTagName("stroke")[0],Y=!1;!O&&(Y=O=N("stroke")),(l.stroke&&"none"!=l.stroke||l["stroke-width"]||null!=l["stroke-opacity"]||l["stroke-dasharray"]||l["stroke-miterlimit"]||l["stroke-linejoin"]||l["stroke-linecap"])&&(O.on=!0),("none"==l.stroke||null===l.stroke||null==O.on||0==l.stroke||0==l["stroke-width"])&&(O.on=!1);var W=t.getRGB(l.stroke);O.on&&l.stroke&&(O.color=W.hex),V=((+f["stroke-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+W.o+1||2)-1);var G=.75*(i(l["stroke-width"])||1);if(V=o(s(V,0),1),null==l["stroke-width"]&&(G=f["stroke-width"]),l["stroke-width"]&&(O.weight=G),G&&1>G&&(V*=G)&&(O.weight=1),O.opacity=V,l["stroke-linejoin"]&&(O.joinstyle=l["stroke-linejoin"]||"miter"),O.miterlimit=l["stroke-miterlimit"]||8,l["stroke-linecap"]&&(O.endcap="butt"==l["stroke-linecap"]?"flat":"square"==l["stroke-linecap"]?"square":"round"),"stroke-dasharray"in l){var H={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};O.dashstyle=H[e](l["stroke-dasharray"])?H[l["stroke-dasharray"]]:d}Y&&c.appendChild(O)}if("text"==m.type){m.paper.canvas.style.display=d;var X=m.paper.span,U=100,$=f.font&&f.font.match(/\d+(?:\.\d*)?(?=px)/);g=X.style,f.font&&(g.font=f.font),f["font-family"]&&(g.fontFamily=f["font-family"]),f["font-weight"]&&(g.fontWeight=f["font-weight"]),f["font-style"]&&(g.fontStyle=f["font-style"]),$=i(f["font-size"]||$&&$[0])||10,g.fontSize=$*U+"px",m.textpath.string&&(X.innerHTML=r(m.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var Z=X.getBoundingClientRect();m.W=f.w=(Z.right-Z.left)/U,m.H=f.h=(Z.bottom-Z.top)/U,m.X=f.x,m.Y=f.y+m.H/2,("x"in l||"y"in l)&&(m.path.v=t.format("m{0},{1}l{2},{1}",a(f.x*b),a(f.y*b),a(f.x*b)+1));for(var Q=["x","y","text","font","font-family","font-weight","font-style","font-size"],J=0,K=Q.length;K>J;J++)if(Q[J]in l){m._.dirty=1;break}switch(f["text-anchor"]){case"start":m.textpath.style["v-text-align"]="left",m.bbx=m.W/2;break;case"end":m.textpath.style["v-text-align"]="right",m.bbx=-m.W/2;break;default:m.textpath.style["v-text-align"]="center",m.bbx=0}m.textpath.style["v-text-kern"]=!0}},A=function(e,a,s){e.attrs=e.attrs||{};var o=e.attrs,l=Math.pow,h,u,c="linear",f=".5 .5";if(e.attrs.gradient=a,a=r(a).replace(t._radial_gradient,function(t,e,r){return c="radial",e&&r&&(e=i(e),r=i(r),l(e-.5,2)+l(r-.5,2)>.25&&(r=n.sqrt(.25-l(e-.5,2))*(2*(r>.5)-1)+.5),f=e+p+r),d}),a=a.split(/\s*\-\s*/),"linear"==c){var g=a.shift();if(g=-i(g),isNaN(g))return null}var x=t._parseDots(a);if(!x)return null;if(e=e.shape||e.node,x.length){e.removeChild(s),s.on=!0,s.method="none",s.color=x[0].color,s.color2=x[x.length-1].color;for(var v=[],y=0,m=x.length;m>y;y++)x[y].offset&&v.push(x[y].offset+p+x[y].color);s.colors=v.length?v.join():"0% "+s.color,"radial"==c?(s.type="gradientTitle",s.focus="100%",s.focussize="0 0",s.focusposition=f,s.angle=0):(s.type="gradient",s.angle=(270-g)%360),e.appendChild(s)}return 1},E=function(e,r){this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=r,this.matrix=t.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},M=t.el;E.prototype=M,M.constructor=E,M.transform=function(e){if(null==e)return this._.transform;var i=this.paper._viewBoxShift,n=i?"s"+[i.scale,i.scale]+"-1-1t"+[i.dx,i.dy]:d,a;i&&(a=e=r(e).replace(/\.{3}|\u2026/g,this._.transform||d)),t._extractTransform(this,n+e);var s=this.matrix.clone(),o=this.skew,l=this.node,h,u=~r(this.attrs.fill).indexOf("-"),c=!r(this.attrs.fill).indexOf("url(");if(s.translate(1,1),c||u||"image"==this.type)if(o.matrix="1 0 0 1",o.offset="0 0",h=s.split(),u&&h.noRotation||!h.isSimple){l.style.filter=s.toFilter();var f=this.getBBox(),g=this.getBBox(1),x=f.x-g.x,v=f.y-g.y;l.coordorigin=x*-b+p+v*-b,C(this,1,1,x,v,0)}else l.style.filter=d,C(this,h.scalex,h.scaley,h.dx,h.dy,h.rotate);else l.style.filter=d,o.matrix=r(s),o.offset=s.offset();return null!==a&&(this._.transform=a,t._extractTransform(this,a)),this},M.rotate=function(t,e,n){if(this.removed)return this;if(null!=t){if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this._.dirtyT=1,this.transform(this._.transform.concat([["r",t,e,n]])),this}},M.translate=function(t,e){return this.removed?this:(t=r(t).split(u),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this._.bbox&&(this._.bbox.x+=t,this._.bbox.y+=e),this.transform(this._.transform.concat([["t",t,e]])),this)},M.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3]),isNaN(n)&&(n=null),isNaN(a)&&(a=null)),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this._.dirtyT=1,this},M.hide=function(){return!this.removed&&(this.node.style.display="none"),this},M.show=function(){return!this.removed&&(this.node.style.display=d),this},M.auxGetBBox=t.el.getBBox,M.getBBox=function(){var t=this.auxGetBBox();if(this.paper&&this.paper._viewBoxShift){var e={},r=1/this.paper._viewBoxShift.scale;return e.x=t.x-this.paper._viewBoxShift.dx,e.x*=r,e.y=t.y-this.paper._viewBoxShift.dy,e.y*=r,e.width=t.width*r,e.height=t.height*r,e.x2=e.x+e.width,e.y2=e.y+e.height,e}return t},M._getBBox=function(){return this.removed?{}:{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},M.remove=function(){if(!this.removed&&this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),t.eve.unbind("raphael.*.*."+this.id),t._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;this.removed=!0}},M.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if(r==h&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;for(var s=r.split(u),o={},l=0,f=s.length;f>l;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return f-1?o:o[s[0]]}if(this.attrs&&null==i&&t.is(r,"array")){for(o={},l=0,f=r.length;f>l;l++)o[r[l]]=this.attr(r[l]);return o}var p;null!=i&&(p={},p[r]=i),null==i&&t.is(r,"object")&&(p=r);for(var d in p)c("raphael.attr."+d+"."+this.id,this,p[d]);if(p){for(d in this.paper.customAttributes)if(this.paper.customAttributes[e](d)&&p[e](d)&&t.is(this.paper.customAttributes[d],"function")){var g=this.paper.customAttributes[d].apply(this,[].concat(p[d]));this.attrs[d]=p[d];for(var x in g)g[e](x)&&(p[x]=g[x])}p.text&&"text"==this.type&&(this.textpath.string=p.text),T(this,p)}return this},M.toFront=function(){return!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&t._tofront(this,this.paper),this},M.toBack=function(){return this.removed?this:(this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),t._toback(this,this.paper)),this)},M.insertAfter=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[e.length-1]),e.node.nextSibling?e.node.parentNode.insertBefore(this.node,e.node.nextSibling):e.node.parentNode.appendChild(this.node),t._insertafter(this,e,this.paper),this)},M.insertBefore=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[0]),e.node.parentNode.insertBefore(this.node,e.node),t._insertbefore(this,e,this.paper),this)},M.blur=function(e){var r=this.node.runtimeStyle,i=r.filter;return i=i.replace(v,d),0!==+e?(this.attrs.blur=e,r.filter=i+p+f+".Blur(pixelradius="+(+e||1.5)+")",r.margin=t.format("-{0}px 0 0 -{0}px",a(+e||1.5))):(r.filter=i,r.margin=0,delete this.attrs.blur),this},t._engine.path=function(t,e){var r=N("shape");r.style.cssText=m,r.coordsize=b+p+b,r.coordorigin=e.coordorigin;var i=new E(r,e),n={fill:"none",stroke:"#000"};t&&(n.path=t),i.type="path",i.path=[],i.Path=d,T(i,n),e.canvas&&e.canvas.appendChild(r);var a=N("skew");return a.on=!0,r.appendChild(a),i.skew=a,i.transform(d),i},t._engine.rect=function(e,r,i,n,a,s){var o=t._rectPath(r,i,n,a,s),l=e.path(o),h=l.attrs;return l.X=h.x=r,l.Y=h.y=i,l.W=h.width=n,l.H=h.height=a,h.r=s,h.path=o,l.type="rect",l},t._engine.ellipse=function(t,e,r,i,n){var a=t.path(),s=a.attrs;return a.X=e-i,a.Y=r-n,a.W=2*i,a.H=2*n,a.type="ellipse",T(a,{cx:e,cy:r,rx:i,ry:n}),a},t._engine.circle=function(t,e,r,i){var n=t.path(),a=n.attrs;return n.X=e-i,n.Y=r-i,n.W=n.H=2*i,n.type="circle",T(n,{cx:e,cy:r,r:i}),n},t._engine.image=function(e,r,i,n,a,s){var o=t._rectPath(i,n,a,s),l=e.path(o).attr({stroke:"none"}),u=l.attrs,c=l.node,f=c.getElementsByTagName(h)[0];return u.src=r,l.X=u.x=i,l.Y=u.y=n,l.W=u.width=a,l.H=u.height=s,u.path=o,l.type="image",f.parentNode==c&&c.removeChild(f),f.rotate=!0,f.src=r,f.type="tile",l._.fillpos=[i,n],l._.fillsize=[a,s],c.appendChild(f),C(l,1,1,0,0,0),l},t._engine.text=function(e,i,n,s){var o=N("shape"),l=N("path"),h=N("textpath");i=i||0,n=n||0,s=s||"",l.v=t.format("m{0},{1}l{2},{1}",a(i*b),a(n*b),a(i*b)+1),l.textpathok=!0,h.string=r(s),h.on=!0,o.style.cssText=m,o.coordsize=b+p+b,o.coordorigin="0 0";var u=new E(o,e),c={fill:"#000",stroke:"none",font:t._availableAttrs.font,text:s};u.shape=o,u.path=l,u.textpath=h,u.type="text",u.attrs.text=r(s),u.attrs.x=i,u.attrs.y=n,u.attrs.w=1,u.attrs.h=1,T(u,c),o.appendChild(h),o.appendChild(l),e.canvas.appendChild(o);var f=N("skew");return f.on=!0,o.appendChild(f),u.skew=f,u.transform(d),u},t._engine.setSize=function(e,r){var i=this.canvas.style;return this.width=e,this.height=r,e==+e&&(e+="px"),r==+r&&(r+="px"),i.width=e,i.height=r,i.clip="rect(0 "+e+" "+r+" 0)",this._viewBox&&t._engine.setViewBox.apply(this,this._viewBox),this},t._engine.setViewBox=function(e,r,i,n,a){t.eve("raphael.setViewBox",this,this._viewBox,[e,r,i,n,a]);var s=this.getSize(),o=s.width,l=s.height,h,u;return a&&(h=l/n,u=o/i,o>i*h&&(e-=(o-i*h)/2/h),l>n*u&&(r-=(l-n*u)/2/u)),this._viewBox=[e,r,i,n,!!a],this._viewBoxShift={dx:-e,dy:-r,scale:s},this.forEach(function(t){t.transform("...")}),this};var N;t._engine.initWin=function(t){var e=t.document;e.styleSheets.length<31?e.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)"):e.styleSheets[0].addRule(".rvml","behavior:url(#default#VML)");try{!e.namespaces.rvml&&e.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),N=function(t){return e.createElement("<rvml:"+t+' class="rvml">')}}catch(r){N=function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},t._engine.initWin(t._g.win),t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e.container,i=e.height,n,a=e.width,s=e.x,o=e.y;if(!r)throw new Error("VML container not found.");var l=new t._Paper,h=l.canvas=t._g.doc.createElement("div"),u=h.style;return s=s||0,o=o||0,a=a||512,i=i||342,l.width=a,l.height=i,a==+a&&(a+="px"),i==+i&&(i+="px"),l.coordsize=1e3*b+p+1e3*b,l.coordorigin="0 0",l.span=t._g.doc.createElement("span"),l.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",h.appendChild(l.span),u.cssText=t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",a,i),1==r?(t._g.doc.body.appendChild(h),u.left=s+"px",u.top=o+"px",u.position="absolute"):r.firstChild?r.insertBefore(h,r.firstChild):r.appendChild(h),l.renderfix=function(){},l},t.prototype.clear=function(){t.eve("raphael.clear",this),this.canvas.innerHTML=d,this.span=t._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},t.prototype.remove=function(){t.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;return!0};var L=t.st;for(var z in M)M[e](z)&&!L[e](z)&&(L[z]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(z))}}.apply(e,i),!(void 0!==n&&(t.exports=n))}])});