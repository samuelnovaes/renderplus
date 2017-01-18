# renderplus
Render advanced HTML pages with JavaScript

# Install
```bash
npm install renderplus
```

# Example
```javascript
const render = require("renderplus");

let html = render($=>{
	$.tag("html", $=>{
		$.tag("head", $=>{
			$.tag("title", $=>$.text("Test"));
			$.tag("meta", {charset: "utf-8"});
		});
		$.tag("body", $=>{
			$.comment("THIS IS THE TAG SELECT");
			$.text("SELECT A NUMBER:");
			$.tag("br");
			$.tag("select", $=>{
				$.tag("option", {value: "0"}, $=>$.text("zero"));
				$.tag("option", {value: "1"}, $=>$.text("one"));
				$.tag("option", {value: "2", selected: null}, $=>$.text("two"));
				$.tag("option", {value: "3"}, $=>$.text("three"));
				$.tag("option", {value: "4"}, $=>$.text("four"));
			});
		});
	});
});

console.log(html);
```
### Output
```html
<!DOCTYPE html>
<html>
	<head>
		<title>
			Teste
		</title>
		<meta charset="utf-8">
	</head>
	<body>
		<!-- This is a SELECT tag -->
		Select a number:
		<select>
			<option value="0">
				0
			</option>
			<option value="1">
				1
			</option>
			<option value="2" selected>
				2
			</option>
			<option value="3">
				3
			</option>
			<option value="4">
				4
			</option>
		</select>
	</body>
</html>
```
# render

render the html page

- render(callback:function)

```javascript
render($=>{
	//Use $ to create tags, text and comments
});
```

# $.tag

add a tag

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
### Output

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

add text

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
### Output

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

Add a html comment tag

- $.comment(text:string)

```javascript
render($=>{
	$.comment("I am a comment");
});
```

### Output

```html
<!DOCTYPE html>
<!-- I am a comment -->
```
# Use with [Express](https://www.npmjs.com/package/express)

```javascript
const app = require("express")();
const render = require("./html.js");

app.get("/", (req, res)=>{
	res.send(render($=>{
		$.tag("html", $=>{
			$.tag("head", $=>{
				$.tag("title", $=>$.text("Test"));
				$.tag("meta", {charset: "utf-8"});
			});
			$.tag("body", $=>{
				$.comment("THIS IS A SELECT TAG");
				$.text("SELECT A NUMBER:");
				$.tag("br");
				$.tag("select", $=>{
					$.tag("option", {value: "0"}, $=>$.text("zero"));
					$.tag("option", {value: "1"}, $=>$.text("one"));
					$.tag("option", {value: "2", selected: null}, $=>$.text("two"));
					$.tag("option", {value: "3"}, $=>$.text("three"));
					$.tag("option", {value: "4"}, $=>$.text("four"));
				});
			});
		});
	}));
});

app.listen(8080, ()=>console.log("Server running"));
```

### Result in http://localhost:8080/
![Image of result](https://lh3.googleusercontent.com/u/0/d/0B4u0L5wy_IY8NEszYmE1bGhIdUE=s1600-k-iv1)
