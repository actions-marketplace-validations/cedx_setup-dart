(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
class Any {
	static __promote($this) return $this;
	static __cast(value) return value;
	static toString($this) return Std.string($this);
}
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true;
Math.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class StringTools {
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static rtrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static replace(s,sub,by) {
		return s.split(sub).join(by);
	}
}
StringTools.__name__ = true;
class Sys {
	static systemName() {
		let _g = process.platform;
		switch(_g) {
		case "darwin":
			return "Mac";
		case "freebsd":
			return "BSD";
		case "linux":
			return "Linux";
		case "win32":
			return "Windows";
		default:
			return _g;
		}
	}
}
Sys.__name__ = true;
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:true,__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	get_native() {
		return this.__nativeException;
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
haxe_Exception.__name__ = true;
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
}
haxe_ValueException.__name__ = true;
class haxe_ds_TreeNode {
	constructor(l,k,v,r,h) {
		if(h == null) {
			h = -1;
		}
		this.left = l;
		this.key = k;
		this.value = v;
		this.right = r;
		if(h == -1) {
			let tmp;
			let _this = this.left;
			let _this1 = this.right;
			if((_this == null ? 0 : _this._height) > (_this1 == null ? 0 : _this1._height)) {
				let _this = this.left;
				tmp = _this == null ? 0 : _this._height;
			} else {
				let _this = this.right;
				tmp = _this == null ? 0 : _this._height;
			}
			this._height = tmp + 1;
		} else {
			this._height = h;
		}
	}
	get_height() return this == null ? 0 : this._height;
}
haxe_ds_TreeNode.__name__ = true;
class haxe_ds_Map {
}
class haxe_io_Path {
	static join(paths) {
		let _g = [];
		let _g1 = 0;
		while(_g1 < paths.length) {
			let v = paths[_g1];
			++_g1;
			if(v != null && v != "") {
				_g.push(v);
			}
		}
		if(_g.length == 0) {
			return "";
		}
		let path = _g[0];
		let _g2 = 1;
		let _g3 = _g.length;
		while(_g2 < _g3) {
			path = haxe_io_Path.addTrailingSlash(path);
			path += _g[_g2++];
		}
		return haxe_io_Path.normalize(path);
	}
	static normalize(path) {
		let slash = "/";
		path = path.split("\\").join(slash);
		if(path == slash) {
			return slash;
		}
		let target = [];
		let _g = 0;
		let _g1 = path.split(slash);
		while(_g < _g1.length) {
			let token = _g1[_g];
			++_g;
			if(token == ".." && target.length > 0 && target[target.length - 1] != "..") {
				target.pop();
			} else if(token == "") {
				if(target.length > 0 || HxOverrides.cca(path,0) == 47) {
					target.push(token);
				}
			} else if(token != ".") {
				target.push(token);
			}
		}
		let acc_b = "";
		let colon = false;
		let slashes = false;
		let _g2_offset = 0;
		let _g2_s = target.join(slash);
		while(_g2_offset < _g2_s.length) {
			let s = _g2_s;
			let index = _g2_offset++;
			let c = s.charCodeAt(index);
			if(c >= 55296 && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
			}
			let c1 = c;
			if(c1 >= 65536) {
				++_g2_offset;
			}
			let c2 = c1;
			switch(c2) {
			case 47:
				if(!colon) {
					slashes = true;
				} else {
					let i = c2;
					colon = false;
					if(slashes) {
						acc_b += "/";
						slashes = false;
					}
					acc_b += String.fromCodePoint(i);
				}
				break;
			case 58:
				acc_b += ":";
				colon = true;
				break;
			default:
				let i = c2;
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				acc_b += String.fromCodePoint(i);
			}
		}
		return acc_b;
	}
	static addTrailingSlash(path) {
		if(path.length == 0) {
			return "/";
		}
		let c1 = path.lastIndexOf("/");
		let c2 = path.lastIndexOf("\\");
		if(c1 < c2) {
			if(c2 != path.length - 1) {
				return path + "\\";
			} else {
				return path;
			}
		} else if(c1 != path.length - 1) {
			return path + "/";
		} else {
			return path;
		}
	}
}
haxe_io_Path.__name__ = true;
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__];
				let con = e.__constructs__[o._hx_index];
				let n = con._hx_name;
				if(con.__params__) {
					s = s + "\t";
					return n + "(" + ((function($this) {
						var $r;
						let _g = [];
						{
							let _g1 = 0;
							let _g2 = con.__params__;
							while(true) {
								if(!(_g1 < _g2.length)) {
									break;
								}
								let p = _g2[_g1];
								_g1 = _g1 + 1;
								_g.push(js_Boot.__string_rec(o[p],s));
							}
						}
						$r = _g;
						return $r;
					}(this))).join(",") + ")";
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true;
class js_Lib {
	static require($module) {
		return require($module);
	}
	static get_parseInt() {
		return parseInt;
	}
	static get_nativeThis() {
		return this;
	}
	static typeof(o) {
		return typeof(o);
	}
	static get_global() {
		return $global;
	}
}
js_Lib.__name__ = true;
var js_node_Fs = require("fs");
var js_npm_actions_core_Core = require("@actions/core");
var js_npm_actions_tool_$cache_ToolCache = require("@actions/tool-cache");
class setup_$dart_DartSdk {
	constructor(options) {
		this.version = "latest";
		this.releaseChannel = "stable";
		this.architecture = "x64";
		if(options != null) {
			if(options.architecture != null) {
				this.architecture = options.architecture;
			}
			if(options.releaseChannel != null) {
				this.releaseChannel = options.releaseChannel;
			}
			if(options.version != null) {
				this.version = options.version;
			}
		}
	}
	get_releaseUrl() {
		let sysName = Sys.systemName();
		return StringTools.replace(StringTools.replace(StringTools.replace(StringTools.replace(setup_$dart_DartSdk.downloadUrlPattern,"{architecture}",this.architecture),"{platform}",sysName == "Windows" ? "windows" : sysName == "Mac" ? "macos" : "linux"),"{releaseChannel}",this.releaseChannel == "edge" ? "be/raw" : "" + this.releaseChannel + "/release"),"{version}",this.version);
	}
	download() {
		return tink_core_Promise.next(tink_core_Promise.next(tink_core_Future.ofJsPromise(js_npm_actions_tool_$cache_ToolCache.downloadTool(this.get_releaseUrl())),function(file) {
			return tink_core_Future.ofJsPromise(js_npm_actions_tool_$cache_ToolCache.extractZip(file));
		}),function(path) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(setup_$dart_PathTools.normalizeSeparator(haxe_io_Path.join([path,"dart-sdk"])))));
		});
	}
	install() {
		let toolName = "dart-sdk";
		let cachedDir = this.version != "latest" ? js_npm_actions_tool_$cache_ToolCache.find(toolName,this.version,this.architecture) : "";
		let _gthis = this;
		return tink_core_Promise.next(cachedDir.length > 0 ? new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(cachedDir))) : tink_core_Promise.next(this.download(),function(path) {
			let promise = js_node_Fs.readFileSync(haxe_io_Path.join([path,"version"]),{ encoding : "utf8"});
			_gthis.version = StringTools.rtrim(promise);
			return tink_core_Future.ofJsPromise(js_npm_actions_tool_$cache_ToolCache.cacheDir(path,toolName,_gthis.version,_gthis.architecture));
		}),function(sdkDir) {
			js_npm_actions_core_Core.addPath(setup_$dart_PathTools.normalizeSeparator(haxe_io_Path.join([sdkDir,"bin"])));
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(sdkDir)));
		});
	}
}
setup_$dart_DartSdk.__name__ = true;
class setup_$dart_PathTools {
	static normalizeSeparator(path) {
		return StringTools.replace(path,"/",Sys.systemName() == "Windows" ? "\\" : "/");
	}
}
setup_$dart_PathTools.__name__ = true;
class setup_$dart_Program {
	static main() {
		let architecture = js_npm_actions_core_Core.getInput("architecture");
		if(architecture.length == 0) {
			architecture = process.arch;
		}
		let releaseChannel = js_npm_actions_core_Core.getInput("release-channel");
		if(releaseChannel.length == 0) {
			releaseChannel = "stable";
		}
		let version = js_npm_actions_core_Core.getInput("version");
		if(version.length == 0) {
			version = "latest";
		}
		new setup_$dart_DartSdk({ architecture : architecture, releaseChannel : releaseChannel, version : version}).install().handle(function(outcome) {
			switch(outcome._hx_index) {
			case 0:
				break;
			case 1:
				js_npm_actions_core_Core.setFailed(outcome.failure.message);
				break;
			}
		});
	}
}
setup_$dart_Program.__name__ = true;
class tink_core_Callback {
	static invoke(this1,data) {
		if(tink_core_Callback.depth < 500) {
			tink_core_Callback.depth++;
			this1(data);
			tink_core_Callback.depth--;
		} else {
			let _e = this1;
			let _g = function(data) {
				tink_core_Callback.invoke(_e,data);
			};
			let data1 = data;
			tink_core_Callback.defer(function() {
				_g(data1);
			});
		}
	}
	static defer(f) {
		process.nextTick(f);
	}
}
class tink_core_SimpleLink {
	constructor(f) {
		this.f = f;
	}
	cancel() {
		if(this.f != null) {
			this.f();
			this.f = null;
		}
	}
}
tink_core_SimpleLink.__name__ = true;
class tink_core__$Callback_LinkPair {
	constructor(a,b) {
		this.dissolved = false;
		this.a = a;
		this.b = b;
	}
	cancel() {
		if(!this.dissolved) {
			this.dissolved = true;
			let this1 = this.a;
			if(this1 != null) {
				this1.cancel();
			}
			let this2 = this.b;
			if(this2 != null) {
				this2.cancel();
			}
			this.a = null;
			this.b = null;
		}
	}
}
tink_core__$Callback_LinkPair.__name__ = true;
class tink_core__$Callback_ListCell {
	constructor(cb,list) {
		if(cb == null) {
			throw haxe_Exception.thrown("callback expected but null received");
		}
		this.cb = cb;
		this.list = list;
	}
	cancel() {
		if(this.list != null) {
			let list = this.list;
			this.cb = null;
			this.list = null;
			if(--list.used <= list.cells.length >> 1) {
				list.compact();
			}
		}
	}
}
tink_core__$Callback_ListCell.__name__ = true;
class tink_core_CallbackList {
	constructor() {
		this.busy = false;
		this.queue = [];
		this.used = 0;
		this.cells = [];
	}
	ondrain() {
	}
	onfill() {
	}
	invoke(data,destructive) {
		if(this.busy) {
			let _g = $bind(this,this.invoke);
			let data1 = data;
			let destructive1 = destructive;
			let tmp = function() {
				_g(data1,destructive1);
			};
			this.queue.push(tmp);
		} else {
			this.busy = true;
			let length = this.cells.length;
			let _g = 0;
			while(_g < length) {
				let _this = this.cells[_g++];
				if(_this.list != null) {
					tink_core_Callback.invoke(_this.cb,data);
				}
			}
			this.busy = false;
			if(destructive) {
				let added = this.cells.length - length;
				let _g = 0;
				while(_g < length) {
					let _this = this.cells[_g++];
					_this.cb = null;
					_this.list = null;
				}
				let _g1 = 0;
				while(_g1 < added) {
					let i = _g1++;
					this.cells[i] = this.cells[length + i];
				}
				this.resize(added);
			} else if(this.used < this.cells.length) {
				this.compact();
			}
			if(this.queue.length > 0) {
				(this.queue.shift())();
			}
		}
	}
	compact() {
		if(this.busy) {
			return;
		} else if(this.used == 0) {
			this.resize(0);
			this.ondrain();
		} else {
			let compacted = 0;
			let _g = 0;
			let _g1 = this.cells.length;
			while(_g < _g1) {
				let i = _g++;
				let _g1 = this.cells[i];
				if(_g1.cb != null) {
					if(compacted != i) {
						this.cells[compacted] = _g1;
					}
					if(++compacted == this.used) {
						break;
					}
				}
			}
			this.resize(this.used);
		}
	}
	resize(length) {
		this.cells.length = length;
	}
}
tink_core_CallbackList.__name__ = true;
class tink_core_TypedError {
	constructor(code,message,pos) {
		if(code == null) {
			code = 500;
		}
		this.code = code;
		this.message = message;
		this.pos = pos;
		this.exceptionStack = [];
		this.callStack = [];
	}
	static withData(code,message,data,pos) {
		return tink_core_TypedError.typed(code,message,data,pos);
	}
	static typed(code,message,data,pos) {
		let ret = new tink_core_TypedError(code,message,pos);
		ret.data = data;
		return ret;
	}
}
tink_core_TypedError.__name__ = true;
class tink_core__$Lazy_LazyConst {
	constructor(value) {
		this.value = value;
	}
	get() {
		return this.value;
	}
}
tink_core__$Lazy_LazyConst.__name__ = true;
class tink_core__$Future_SyncFuture {
	constructor(value) {
		this.value = value;
	}
	flatMap(f) {
		let _gthis = this;
		return new tink_core__$Future_SuspendableFuture(function($yield) {
			return f(_gthis.value.get()).handle($yield);
		});
	}
	handle(cb) {
		tink_core_Callback.invoke(cb,this.value.get());
		return null;
	}
	gather() {
		return this;
	}
}
tink_core__$Future_SyncFuture.__name__ = true;
class tink_core_Future {
	static flatten(f) {
		return new tink_core__$Future_SuspendableFuture(function($yield) {
			let inner = null;
			return new tink_core__$Callback_LinkPair(f.handle(function(second) {
				inner = second.handle($yield);
			}),new tink_core_SimpleLink(function() {
				if(inner != null) {
					inner.cancel();
				}
			}));
		});
	}
	static ofJsPromise(promise) {
		return tink_core_Future.async(function(cb) {
			promise.then(function(a) {
				cb(tink_core_Outcome.Success(a));
			}).catch(function(e) {
				cb(tink_core_Outcome.Failure(tink_core_TypedError.withData(null,e.message,e,{ fileName : "tink/core/Future.hx", lineNumber : 89, className : "tink.core._Future.Future_Impl_", methodName : "ofJsPromise"})));
			});
		});
	}
	static async(f,lazy) {
		if(lazy == null) {
			lazy = false;
		}
		if(lazy) {
			return new tink_core__$Future_SuspendableFuture(function($yield) {
				f($yield);
				return null;
			});
		} else {
			let op = new tink_core_FutureTrigger();
			tink_core_Callback.invoke(f,$bind(op,op.trigger));
			return op;
		}
	}
}
class tink_core_FutureTrigger {
	constructor() {
		this.list = new tink_core_CallbackList();
	}
	handle(callback) {
		let _g = this.list;
		if(_g == null) {
			tink_core_Callback.invoke(callback,this.result);
			return null;
		} else {
			let node = new tink_core__$Callback_ListCell(callback,_g);
			_g.cells.push(node);
			if(_g.used++ == 0) {
				_g.onfill();
			}
			return node;
		}
	}
	flatMap(f) {
		if(this.list == null) {
			return f(this.result);
		} else {
			let ret = new tink_core_FutureTrigger();
			let _this = this.list;
			let node = new tink_core__$Callback_ListCell(function(v) {
				f(v).handle($bind(ret,ret.trigger));
			},_this);
			_this.cells.push(node);
			if(_this.used++ == 0) {
				_this.onfill();
			}
			return ret;
		}
	}
	gather() {
		return this;
	}
	trigger(result) {
		if(this.list == null) {
			return false;
		} else {
			let list = this.list;
			this.list = null;
			this.result = result;
			list.invoke(result,true);
			return true;
		}
	}
}
tink_core_FutureTrigger.__name__ = true;
class tink_core__$Future_SuspendableFuture {
	constructor(wakeup) {
		this.suspended = true;
		this.wakeup = wakeup;
		this.callbacks = new tink_core_CallbackList();
		let _gthis = this;
		this.callbacks.ondrain = function() {
			if(_gthis.callbacks != null) {
				_gthis.suspended = true;
				let this1 = _gthis.link;
				if(this1 != null) {
					this1.cancel();
				}
				_gthis.link = null;
			}
		};
	}
	trigger(value) {
		let _g = this.callbacks;
		if(_g != null) {
			this.callbacks = null;
			this.suspended = false;
			this.result = value;
			this.link = null;
			this.wakeup = null;
			_g.invoke(value,true);
		}
	}
	handle(callback) {
		if(this.callbacks == null) {
			tink_core_Callback.invoke(callback,this.result);
			return null;
		} else {
			let _this = this.callbacks;
			let node = new tink_core__$Callback_ListCell(callback,_this);
			_this.cells.push(node);
			if(_this.used++ == 0) {
				_this.onfill();
			}
			if(this.suspended) {
				this.suspended = false;
				this.link = this.wakeup($bind(this,this.trigger));
			}
			return node;
		}
	}
	map(f) {
		let _gthis = this;
		return new tink_core__$Future_SuspendableFuture(function($yield) {
			return _gthis.handle(function(res) {
				$yield(f(res));
			});
		});
	}
	flatMap(f) {
		return tink_core_Future.flatten(this.map(f));
	}
	gather() {
		return this;
	}
}
tink_core__$Future_SuspendableFuture.__name__ = true;
var tink_core_Outcome = $hxEnums["tink.core.Outcome"] = { __ename__:true,__constructs__:null
	,Success: ($_=function(data) { return {_hx_index:0,data:data,__enum__:"tink.core.Outcome",toString:$estr}; },$_._hx_name="Success",$_.__params__ = ["data"],$_)
	,Failure: ($_=function(failure) { return {_hx_index:1,failure:failure,__enum__:"tink.core.Outcome",toString:$estr}; },$_._hx_name="Failure",$_.__params__ = ["failure"],$_)
};
tink_core_Outcome.__constructs__ = [tink_core_Outcome.Success,tink_core_Outcome.Failure];
class tink_core_Promise {
	static next(this1,f,gather) {
		if(gather == null) {
			gather = true;
		}
		let gather1 = gather;
		if(gather == null) {
			gather1 = true;
		}
		let ret = this1.flatMap(function(o) {
			switch(o._hx_index) {
			case 0:
				return f(o.data);
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(o.failure)));
			}
		});
		if(gather1) {
			return ret.gather();
		} else {
			return ret;
		}
	}
}
class tink_core_Next {
	static ofDynamic(f) return function(x) {
		let d = f(x);
		return (function($this) {
			var $r;
			let v = tink_core_Outcome.Success(d);
			$r = new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(v));
			return $r;
		}(this));
	}
}
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
{
	String.__name__ = true;
	Array.__name__ = true;
}
js_Boot.__toStr = ({ }).toString;
setup_$dart_DartSdk.downloadUrlPattern = "https://storage.googleapis.com/dart-archive/channels/{releaseChannel}/{version}/sdk/dartsdk-{platform}-{architecture}-release.zip";
tink_core_Callback.depth = 0;
setup_$dart_Program.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
