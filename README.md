# renderplus

Advanced renderer for Express

[![NPM](https://nodei.co/npm/renderplus.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/renderplus/)

# Install

```bash
npm install renderplus
```

# Full example

```javascript
const express = require('express')
const renderplus = require('renderplus')
const app = express()
app.use(renderplus)

let button1 = false

let options = [
	{ text: 'Zero', value: 0 },
	{ text: 'One', value: 1 },
	{ text: 'Two', value: 2 },
	{ text: 'Three', value: 3 },
	{ text: 'Four', value: 4 }
]

app.get('/', (req, res) => {
	res.render(
		['html', [
			['head', [
				['title', 'Test'],
				['meta', { charset: 'utf-8' }]
			]],
			['body', [
				//Text
				'SELECT A NUMBER:',
				['br'],
				['select', { id: 'choice', onchange: 'test()' }, [
					//List rendering
					['for', options, i => ['option', { value: i.value }, i.text]]
				]],
				//Conditional rendering
				['if', button1,
					['button', 'Button 1'],
					['button', 'Button 2']
				]
			]]
		]]
	)
})

app.listen(8080)
```

**It renders**

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Test</title>
		<meta charset="utf-8">
	</head>
	<body>
		SELECT A NUMBER:
		<br>
		<select id="choice" onchange="test()">
			<option value="0">zero</option>
			<option value="1">one</option>
			<option value="2">two</option>
			<option value="3">three</option>
			<option value="4">four</option>
		</select>
		<button>Button 1</button>
	</body>
</html>
```

# Render method syntax

```javascript
res.render(htmlTag)
```

- `htmlTag`: array

# Tag syntax

```javascript
[tagName, attributes, content]
```

- `tagName`: string
- `attributes`: object
- `content`: array (children) or string (text)

> `attributes` and `content` are optional

### Example
```javascript
['br']
```
```javascript
['h1', 'Hello World']
```
```javascript
['meta', {charset: 'utf-8'}]
```
```javascript
['div', {id: 'test'}, 'Hello World']
```
```javascript
['div', {id: 'test'}, [
	//children here
]]
```
```javascript
['body', [
	//children here
]]
```

# Text

### Example
```javascript
['body', [
	'It is a text inside BODY',
	['br'],
	['h1', 'It is a text inside H1'],
	'Here is another text inside BODY'
]]
```

# Conditional rendering

```javascript
['if', condition, thenContent, elseContent]
```

- `condition`: boolean
- `thenContent`: array (tag)
- `elseContent`: array (tag)

> `elseContent` is optional

# List rendering

```javascript
['for', list, callback]
```
- `list`: array
- `callback`: function

### Callback syntax
```javascript
(item, index) => content
```

- `content`: array (tag)

# Creating layouts and components Example

```javascript
const express = require('express')
const renderplus = require("renderplus")
const app = express()
app.use(renderplus)

let layout(children) => (
	['html', [
		['head', [
			['title', 'Test'],
			['meta', {charset: 'utf-8'}]
		]],
		['body', children]
	]]
)

let customButton(label) => (
	['button', {class: 'my-custom-button'}, label]
)

app.get('/', (req, res) => {
	res.render(
		layout([
			['div', [
				customButton('Button 1'),
				customButton('Button 2'),
				['hr']
			]]
		])
	)
})

app.listen(8080)
```
