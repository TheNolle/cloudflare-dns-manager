/**
 * Shorthand for querySelector
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element|null}
 */
export const $ = (selector, scope = document) => scope.querySelector(selector)

/**
 * Shorthand to create element with optional class
 * @param {string} tag
 * @param {string} [className]
 * @returns {HTMLElement}
 */
export const create = (tag, className = '') => {
	const element = document.createElement(tag)
	if (className) element.className = className
	return element
}

/**
 * Clears the innerHTML of an element
 * @param {Element} element
 */
export const clear = (element) => {
	if (element) element.innerHTML = ''
}
