# renderplus

Render advanced HTML pages with JavaScript

[![NPM](https://nodei.co/npm/renderplus.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/renderplus/)

# Install

```bash
npm install renderplus
```

# Full example

```javascript
const render = require("renderplus");

let html = render($=>{
	$.tag("html", $=>{
		$.tag("head", $=>{
			$.tag("title", $=>$.text("Test"));
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
		$.tag("body", $=>{
			$.comment("THIS IS THE TAG SELECT");
			$.text("SELECT A NUMBER:");
			$.tag("br");
			$.tag("select", {id: "choice", onchange: "test()"}, $=>{
				$.tag("option", {value: "0"}, $=>$.text("zero"));
				$.tag("option", {value: "1"}, $=>$.text("one"));
				$.tag("option", {value: "2", selected: null}, $=>$.text("two"));
				$.tag("option", {value: "3"}, $=>$.text("three"));
				$.tag("option", {value: "4"}, $=>$.text("four"));
			});
		});
	});
})

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

# render

Render the html page

- render(callback:function)

```javascript
render($=>{
	//Use $ to create tags, text and comments
});
```

# $.tag

Add tag

- $.tag(tagName:string, attrs:object*, callback:function*)

```javascript
render($=>{
	$.tag("br");
	$.tag("img", {src: "pic.png"});
	$.tag("div", $=>{
	    //Use $ to create child elements inside the div
	});
	$.tag("div", {id: "my-div"}, $=>{
    	//Use $ to create child elements inside the div
	});
});
```
**Output**

```html
<!DOCTYPE html>
<br>
<img src="pic.png">
<div>
</div>
<div id="my-div">
</div>
```
# $.text

Add text

- $.text(text:string)

```javascript
render($=>{
	$.text("Hello World");
	$.tag("p", $=>$.text("I am a paragraph"));
	$.tag("div", $=>{
		$.text("Click on the button:");
		$.tag("br");
		$.tag("button", $=>$.text("I am a button"));
	});
});
```
**Output**

```html
<!DOCTYPE html>
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

# $.comment

Add html comment tag

- $.comment(text:string)

```javascript
render($=>{
	$.comment("I am a comment");
});
```

**Output**

```html
<!DOCTYPE html>
<!-- I am a comment -->
```

# $.style

Add style tag

- $.style(styles:object)

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
<!DOCTYPE html>
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

# $.script

Add script tag with code

- $.script(callback:function)

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
<!DOCTYPE html>
<script type="text/javascript">
	function test(){
		let val = document.getElementById("choice").value;
		alert(val);
	}
</script>
```

# Use with [Express](https://www.npmjs.com/package/express)

```javascript
const app = require("express")();
const render = require("renderplus");

app.get("/", (req, res)=>{
	res.send(render($=>{
		//Your elements here
	}));
});

app.listen(8080, ()=>console.log("Server running"));
```