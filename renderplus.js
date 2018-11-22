module.exports = (req, res, next) => {
	res.render = elem => {
		const m = arr => {
			if (!Array.isArray(arr)) return (arr || '')

			const tag = arr[0]

			if (tag == 'for') return arr[1].map(elem => m(arr[2](elem))).join('')

			if (tag == 'if') {
				if (arr[2]) {
					if (arr[1]) return m(arr[2].then)
					return m(arr[2].else)
				}
				return ''
			}

			const autoclose = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr']
			const noProps = typeof arr[1] != 'object' || Array.isArray(arr[1])
			const props = noProps ? {} : arr[1]
			const children = (noProps ? arr[1] : arr[2]) || []
			const childrenArray = Array.isArray(children) ? children : [children]
			const strChildren = childrenArray.map(c => m(c)).join('')
			const camel2Kebab = txt => txt.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
			const strProps = Object.entries(props).map(e => ` ${camel2Kebab(e[0])}${e[1] === '' ? '' : `="${e[1]}"`}`).join('')

			if (tag) return `<${tag}${strProps}>${!autoclose.includes(tag) ? `${strChildren}</${tag}>` : ''}`

			return ''
		}
		res.send(`<!DOCTYPE html>${m(elem)}`)
	}
	next()
}