function camel2Kebab(txt) {
	return txt.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

module.exports = (req, res, next) => {
	res.render = (elem) => {
		function convert(arr) {
			if (!Array.isArray(arr)) return arr

			let autoclose = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr']
			let tag = arr[0]
			let props = arr[1]
			let children = arr[2]
			let els = arr[3]

			if (tag == 'for') {
				return props.map(children).map(elem => convert(elem)).join('')
			}

			if (tag == 'if') {
				if (props) {
					return convert(children)
				}
				if (els) {
					return convert(els)
				}
				return ''
			}

			if (Array.isArray(props)) {
				children = props
				props = {}
			}
			props = props || {}
			children = children || []

			let strChildren = children.map(c => convert(c)).join('')
			let strProps = ''
			for (let i in props) {
				strProps += ` ${camel2Kebab(i)}="${props[i]}"`
			}

			if (tag) return `<${tag}${strProps}>${autoclose.indexOf(tag) == -1 ? `${strChildren}</${tag}>` : ''}`
			return ''
		}
		res.send(`<!DOCTYPE html>${convert(elem)}`)
	}
	next()
}