(function(){
	var autoclose = ['area','base','br','col','embed','hr','img','input','keygen','link','menuitem','meta','param','source','track','wbr'];
	function render(fn){
		var $ = {
			_tabs: 0,
			_value: "",
			_indent: function(){
				if(this._value != ""){
					this._value += "\n";
					for(var i = 0; i < this._tabs; i++){
						this._value += "\t";
					}
				}
			},
			_camel2Kebab: function(txt){
				return txt.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
			},
			_processFunction: function(fn){
				fn = fn.toString();
				var nofunc = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
				while(/\n\t* {4}/g.test(nofunc)){
					nofunc = nofunc.replace(/(\n\t*) {4}/g, "$1\t");
				}
				var moved = null;
				nofunc.split(/\n/g).forEach(function(item){
					if(!/^\s*$/.test(item)){
						var exec = /^\t+/.exec(item);
						var distance = exec ? exec.toString().match(/\t/g).length : 0;
						if(moved == null || distance < moved){
							moved = distance;
						}
					}
				});
				var regMoved = new RegExp("\n\t{"+moved+"}", "g");
				var tabs = "\n";
				for(var i = 0; i < this._tabs; i++){
					tabs += "\t";
				}
				var regTabs = new RegExp("^\n\t{"+this._tabs+"}");
				nofunc = nofunc
				.replace(regMoved, tabs)
				.replace(regTabs, "")
				.replace(/\n\t*$/, "");
				return nofunc;
			},
			tag: function(name, attrs, fn){
				if(name === undefined) throw new Error("Expected tag name argument");
				if(typeof name != "string") throw new Error("Tag name argument must be a string");
				name = name.toLowerCase();
				if(typeof attrs == 'function'){
					fn = attrs;
					attrs = null;
				}
				if(attrs && typeof attrs != "object") throw new Error("Tag attributes argument must be an object");
				if(fn && typeof fn != "function") throw new Error("Tag callback argument must be a function");
				this._indent();
				this._tabs++;
				this._value += '<'+name;
				if(attrs){
					for(var i in attrs){
						this._value += ' '+this._camel2Kebab(i);
						if(attrs[i] != null){
							this._value += '="'+attrs[i]+'"';
						}
					}
				}
				this._value += '>';
				if(autoclose.indexOf(name) == -1){
					if(fn){
						fn(this);
					}
					this._tabs--;
					this._indent();
					this._value += "</"+name+">";
				}
				else{
					this._tabs--;
				}
			},
			doctype: function(txt){
				if(txt === undefined) throw new Error("Expected doctype argument");
				this._indent();
				this._value += "<!DOCTYPE "+txt+">";
			},
			text: function(txt){
				if(txt === undefined) throw new Error("Expected text argument");
				this._indent();
				this._value += txt;
			},
			comment: function(txt){
				if(txt === undefined) throw new Error("Expected comment argument");
				this._indent();
				this._value += "<!-- "+txt+" -->";
			},
			style: function(obj){
				if(obj === undefined) throw new Error("Expected style argument");
				if(typeof obj != "object") throw new Error("Style argument must be an object");
				this._indent();
				this._value += '<style type="text/css">';
				this._tabs++;
				for(var i in obj){
					this._indent();
					this._value += i+"{";
					this._tabs++;
					for(var j in obj[i]){
						this._indent();
						this._value += this._camel2Kebab(j)+": "+obj[i][j]+";";
					}
					this._tabs--;
					this._indent();
					this._value += "}";
				}
				this._tabs--;
				this._indent();
				this._value += "</style>";
			},
			script: function(fn){
				if(fn === undefined) throw new Error("Expected script argument");
				if(typeof fn != "function") throw new Error("Script argument must be a function");
				this._indent();
				this._value += '<script type="text/javascript">';
				if(this._processFunction(fn) != ""){
					this._tabs++;
					this._indent();
					this._value += this._processFunction(fn);
					this._tabs--;
				}
				this._indent();
				this._value += '</script>';
			}
		};
		fn($);
		return $._value;
	}
	if(typeof module !== 'undefined' && module.exports){
		module.exports = render;
	}
	else{
		this.render = render;
	}
}).call(this);