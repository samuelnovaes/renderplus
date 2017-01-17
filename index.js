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
		}
	};
	fn($);
	return $._value;
}