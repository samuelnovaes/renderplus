let autoclose = ['area','base','br','col','embed','hr','img','input','keygen','link','menuitem','meta','param','source','track','wbr'];

module.exports = fn=>{
	let $ = {
		_tabs: 0,
		_value: '<!DOCTYPE html>',
		_indent: function(){
			this._value += "\n";
			for(let i = 0; i < this._tabs; i++){
				this._value += "\t";
			}
		},
		_camelCase2Trace: txt=>{
			return txt.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
		},
		_processFunction: fn=>{
			fn = fn.toString();
			return fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
		},
		tag: function(name, attrs, fn){
			name = name.toLowerCase();
			if(typeof attrs == 'function'){
				fn = attrs;
				attrs = null;
			}
			this._indent();
			this._tabs++;
			this._value += '<'+name;
			if(attrs){
				for(let i in attrs){
					this._value += ' '+i;
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
		text: function(txt){
			this._indent();
			this._value += txt;
		},
		comment: function(txt){
			this._indent();
			this._value += "<!-- "+txt+" -->";
		},
		style: function(obj){
			this._indent();
			this._value += '<style type="text/css">';
			this._tabs++;
			for(let i in obj){
				this._indent();
				this._value += i+"{";
				this._tabs++;
				for(let j in obj[i]){
					this._indent();
					this._value += this._camelCase2Trace(j)+": "+obj[i][j]+";";
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
			this._indent();
			this._value += '<script type="text/javascript">';
			this._value += this._processFunction(fn);
			this._indent();
			this._value += '</script>';
		}
	};
	fn($);
	return $._value;
}