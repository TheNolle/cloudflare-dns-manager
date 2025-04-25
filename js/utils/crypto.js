const encoder = new TextEncoder()
const decoder = new TextDecoder()

const generateKey = async () => {
	return await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt'])
}

const importKey = async (raw) => {
	const keyData = encoder.encode(raw.padEnd(32, '_'))
	return await crypto.subtle.importKey('raw', keyData, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt'])
}

export const encrypt = async (text, rawKey) => {
	const key = await importKey(rawKey)
	const iv = crypto.getRandomValues(new Uint8Array(12))
	const data = encoder.encode(text)
	const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data)
	return btoa(JSON.stringify({ iv: Array.from(iv), data: Array.from(new Uint8Array(encrypted)) }))
}

export const decrypt = async (base64, rawKey) => {
	const key = await importKey(rawKey)
	const { iv, data } = JSON.parse(atob(base64))
	const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, new Uint8Array(data))
	return decoder.decode(decrypted)
}
