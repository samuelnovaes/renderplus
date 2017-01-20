# renderplus

Render advanced HTML pages with JavaScript

[![NPM](https://nodei.co/npm/renderplus.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/renderplus/)

See [JXServer](https://github.com/samuelnovaes/jxserver). A Renderplus web server

- [Install](#install);
- [Full example](#full-example);
- [render](#rendercallbackfunction)
- [$.doctype](#doctypetypestring)
- [$.tag](#tagtagnamestring-attrsobject-callbackfunction)
- [$.text](#texttextstring)
- [$.comment](#commenttextstring)
- [$.style](#stylestylesobject)
- [$.script](#scriptcallbackfunction)
- [Using with Express](#using-with-express)
- [Using in browser](#using-in-browser)
- [Using as Vue.js template](#using-as-vuejs-template-for-components)


# Install

```bash
npm install renderplus
```

or download [renderplus.js](https://raw.githubusercontent.com/samuelnovaes/renderplus/master/renderplus.js) to use in browser

# Full example

```javascript
const render = require("renderplus");

let html = render($=>{
	$.doctype("html");
	$.tag("html", ()=>{
		$.tag("head", ()=>{
			$.tag("title", ()=>$.text("Test"));
			$.tag("meta", {charset: "utf-8"});
			$.style({
				"*": {
					fontFamily: "arial, sans-serif"
				},
				"body": {
					backgroundColor: "#000",
					color: "#fff"
				},
				"#choice": {
					padding: "5px",
					backgroundColor: "teal",
					color: "#fff",
					border: "1px solid #fff",
					outline: "none"
				}
			});
			$.script(()=>{
				function test(){
					let val = document.getElementById("choice").value;
					alert(val);
				}
			});
		});
		$.tag("body", ()=>{
			$.comment("THIS IS THE TAG SELECT");
			$.text("SELECT A NUMBER:");
			$.tag("br");
			$.tag("select", {id: "choice", onchange: "test()"}, ()=>{
				$.tag("option", {value: "0"}, ()=>$.text("zero"));
				$.tag("option", {value: "1"}, ()=>$.text("one"));
				$.tag("option", {value: "2", selected: null}, ()=>$.text("two"));
				$.tag("option", {value: "3"}, ()=>$.text("three"));
				$.tag("option", {value: "4"}, ()=>$.text("four"));
			});
		});
	});
});

console.log(html);
```

**Output**

```html
<!DOCTYPE html>
<html>
	<head>
		<title>
			Test
		</title>
		<meta charset="utf-8">
		<style type="text/css">
			*{
				font-family: arial, sans-serif;
			}
			body{
				background-color: #000;
				color: #fff;
			}
			#choice{
				padding: 5px;
				background-color: teal;
				color: #fff;
				border: 1px solid #fff;
				outline: none;
			}
		</style>
		<script type="text/javascript">
			function test(){
				let val = document.getElementById("choice").value;
				alert(val);
			}
		</script>
	</head>
	<body>
		<!-- THIS IS THE TAG SELECT -->
		SELECT A NUMBER:
		<br>
		<select id="choice" onchange="test()">
			<option value="0">
				zero
			</option>
			<option value="1">
				one
			</option>
			<option value="2" selected>
				two
			</option>
			<option value="3">
				three
			</option>
			<option value="4">
				four
			</option>
		</select>
	</body>
</html>
```

## render(callback:function)

Render the HTML page

```javascript
render($=>{
	//You can create tags, text and comments here
});
```
## $.doctype(type:string)

Add doctype

```javascript
render($=>{
	$.doctype("html");
});
```

**Output**

```html
<!DOCTYPE html>
```

## $.tag(tagName:string, attrs:object*, callback:function*)

Add tag

```javascript
render($=>{
	$.tag("br");
	$.tag("img", {src: "pic.png"});
	$.tag("div", ()=>{
	    //You can create child elements here
	});
	$.tag("div", {id: "my-div"}, ()=>{
    	//You can create child elements here
	});
});
```
**Output**

```html
<br>
<img src="pic.png">
<div>
</div>
<div id="my-div">
</div>
```
## $.text(text:string)

Add text

```javascript
render($=>{
	$.text("Hello World");
	$.tag("p", ()=>$.text("I am a paragraph"));
	$.tag("div", ()=>{
		$.text("Click on the button:");
		$.tag("br");
		$.tag("button", ()=>$.text("I am a button"));
	});
});
```
**Output**

```html
Hello World
<p>
	I am a paragraph
</p>
<div>
	Click on the button:
	<br>
	<button>
		I am a button
	</button>
</div>
```

## $.comment(text:string)

Add html comment tag

```javascript
render($=>{
	$.comment("I am a comment");
});
```

**Output**

```html
<!-- I am a comment -->
```

## $.style(styles:object)

Add style tag

```javascript
/*
	$.style({
		selector: {
			camelCaseAttribute: value
		}
	});
*/
render($=>{
	$.style({
		"*": {
			fontFamily: "arial, sans-serif"
		},
		"body": {
			backgroundColor: "#000",
			color: "#fff"
		},
		"#choice": {
			padding: "5px",
			backgroundColor: "teal",
			color: "#fff",
			border: "1px solid #fff",
			outline: "none"
		}
	});
});
```

**Output**

```html
<style type="text/css">
	*{
		font-family: arial, sans-serif;
	}
	body{
		background-color: #000;
		color: #fff;
	}
	#choice{
		padding: 5px;
		background-color: teal;
		color: #fff;
		border: 1px solid #fff;
		outline: none;
	}
</style>
```

## $.script(callback:function)

Add script tag with code

```javascript
render($=>{
	$.script(()=>{
		function test(){
			let val = document.getElementById("choice").value;
			alert(val);
		}
	});
});
```

**Output**

```html
<script type="text/javascript">
	function test(){
		let val = document.getElementById("choice").value;
		alert(val);
	}
</script>
```

# Using with [Express](https://www.npmjs.com/package/express)

```javascript
const app = require("express")();
const render = require("renderplus");

app.get("/", (req, res)=>{
	res.send(render($=>{
		$.doctype("html");
		$.tag("html", ()=>{
			$.tag("head", ()=>{
				$.tag("title", ()=>$.text("Hello World"));
				$.tag("meta", {charset: "utf-8"});
			});
			$.tag("body", ()=>{
				$.tag("h1", ()=>$.text("Hello World!"));
			});
		});
	}));
});

app.listen(8080, ()=>console.log("Server running"));
```

# Using in browser

Download renderplus.js library [here](https://raw.githubusercontent.com/samuelnovaes/renderplus/master/renderplus.js)

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Renderplus demo</title>
		<meta charset="utf-8">
	</head>
	<body>

		<!-- Import renderplus.js -->
		<script type="text/javascript" src="renderplus.js"></script>

		<!-- Call render function -->
		<script type="text/javascript">
			document.write(render($=>{
				$.tag("button", ()=>$.text("I am a button"));
				$.tag("br");
				$.tag("img", {src: "demo.png"});
			}));
		</script>

	</body>
</html>
```

# Using as [Vue.js](https://vuejs.org) template

```javascript
Vue.component('my-component', {
	template: render($=>{
		$.tag("div", ()=>{
			$.tag("button", ()=>$.text("I am a button"));
			$.tag("br");
			$.tag("img", {src: "demo.png"});
		});
	});
});
```