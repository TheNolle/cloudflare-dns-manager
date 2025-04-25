import { create } from '../../utils/dom.js'

export const renderDescription = (type, config, parent) => {
	const legend = create('legend')
	legend.textContent = `${type} Record`
	parent.appendChild(legend)

	const description = create('p')
	description.textContent = config.description
	parent.appendChild(description)
}
