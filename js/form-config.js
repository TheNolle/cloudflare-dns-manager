/**
 * @typedef {Object} FieldConfig
 * @property {string} name - The name of the field.
 * @property {string} label - The label for the field.
 * @property {'text'|'number'|'select'|'checkbox'|'textarea'} type - The type of the field.
 * @property {boolean} [required] - Whether the field is required.
 * @property {string} [placeholder] - Placeholder text for the field.
 * @property {Array<string>} [options] - Options for select fields.
 * @property {number} [min] - Minimum value for number fields.
 * @property {number} [max] - Maximum value for number fields.
 * @property {any} [default] - Default value for the field.
 */

/**
 * @typedef {Object} DNSRecordConfig
 * @property {string} description - Description of the DNS record type.
 * @property {Array<FieldConfig>} fields - Array of field configurations.
 */

/**
 * @type {Object<string, DNSRecordConfig>}
 */
export default {
	A: {
		description: 'A records are used to map a domain name to an IPv4 address. They are the most common type of DNS record and are essential for directing traffic to your website.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ipv4Address', label: 'IPv4 address', type: 'text', required: true },
			{ name: 'proxied', label: 'Proxy status', type: 'checkbox' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto'] },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	AAAA: {
		description: 'AAAA records are used to map a domain name to an IPv6 address. They are similar to A records, but specifically for IPv6 addresses.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ipv6Address', label: 'IPv6 address', type: 'text', required: true },
			{ name: 'proxied', label: 'Proxy status', type: 'checkbox' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto'] },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	CAA: {
		description: 'Certificate Authority Authorization (CAA) records are used to specify which certificate authorities (CAs) are allowed to issue certificates for a domain. This helps prevent unauthorized issuance of SSL/TLS certificates.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'flags', label: 'Flags', type: 'number', required: true, default: 0 },
			{ name: 'tag', label: 'Tag', type: 'select', required: true, options: ['Only allow specific hostnames', 'Only allow wildcards', 'Send violation reports to URL (http:, https:, or mailto:)'] },
			{ name: 'caDomainName', label: 'CA domain name', type: 'text', required: true },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	CERT: {
		description: 'CERT records are used to store a public key certificate in DNS. They are used for various purposes, including email encryption and authentication.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'certType', label: 'Cert. type', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'keyTag', label: 'Key tag', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'algorithm', label: 'Algorithm', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'certificate', label: 'Certificate (Base64)', type: 'textarea', required: true, placeholder: 'E.g. TEpBNFYyTGtWUVpsTHpaa0htQXVPd0...wxREdCM3BRTTNWbUwyVlRNNERKWg==' },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	CNAME: {
		description: 'CNAME records are used to create an alias for a domain name. They point one domain name to another, allowing you to use multiple domain names for the same website or service.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'target', label: 'Target', type: 'text', required: true, placeholder: 'E.g. www.example.com' },
			{ name: 'proxied', label: 'Proxy status', type: 'checkbox' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto'] },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	DNSKEY: {
		description: 'DNSKEY records are used to store public keys for DNSSEC (Domain Name System Security Extensions). They are used to verify the authenticity of DNS data and prevent DNS spoofing.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'flags', label: 'Flags', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'protocol', label: 'Protocol', type: 'select', required: true, options: ['3 - DNSSEC'] },
			{ name: 'algorithm', label: 'Algorithm', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'publicKey', label: 'Public Key (Base64)', type: 'textarea', required: true, placeholder: 'E.g. TEpBNFYyTGtWUVpsTHpaa0htQXVPd0...wxREdCM3BRTTNWbUwyVlRNNERKWg==' },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	DS: {
		description: 'DS records are used to store delegation signer (DS) records for DNSSEC. They are used to establish a chain of trust between the parent and child zones in DNSSEC.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'User @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'keyTag', label: 'Key Tag', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'algorithm', label: 'Algorithm', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'digestType', label: 'Digest Type', type: 'select', required: true, options: ['1 - SHA-1', '2 - SHA-256', '3 - GOST R 34,11-94', '4 - SHA-384'] },
			{ name: 'digest', label: 'Digest (hexadecimal)', type: 'textarea', required: true, placeholder: 'E.g. 436c6f7564666c...61726520444e53' },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	HTTPS: {
		description: 'HTTPS records are used to store information about HTTPS services associated with a domain. They can be used to provide information about the services available at a specific domain.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'User @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'priority', label: 'Priority', type: 'number', min: 0, max: 65535 },
			{ name: 'target', label: 'Target', type: 'text', required: true },
			{ name: 'value', label: 'Value', type: 'textarea', placeholder: 'E.g. alpn="h3,h2" ipv4hint="127.0.0.1" ipv6hint="::1"' },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	LOC: {
		description: 'LOC records are used to store geographic location information for a domain. They can be used to provide information about the physical location of a server or service associated with a domain.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'User @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'latitude_degrees', label: '[Latitude] Degrees', type: 'number', required: true },
			{ name: 'latitude_minutes', label: '[Latitude] Minutes', type: 'number', required: true },
			{ name: 'latitude_seconds', label: '[Latitude] Seconds', type: 'number', required: true },
			{ name: 'latitude_direction', label: '[Latitude] Direction', type: 'select', required: true, options: ['North', 'South'] },
			{ name: 'longitude_degrees', label: '[Longitude] Degrees', type: 'number', required: true },
			{ name: 'longitude_minutes', label: '[Longitude] Minutes', type: 'number', required: true },
			{ name: 'longitude_seconds', label: '[Longitude] Seconds', type: 'number', required: true },
			{ name: 'longitude_direction', label: '[Longitude] Direction', type: 'select', required: true, options: ['East', 'West'] },
			{ name: 'horizontal', label: 'Horizontal', type: 'number', required: true },
			{ name: 'vertical', label: 'Vertical', type: 'number', required: true },
			{ name: 'altitude', label: 'Altitude', type: 'number', required: true },
			{ name: 'size', label: 'Size', type: 'number', required: true },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	MX: {
		description: 'MX records are used to specify the mail servers responsible for receiving email for a domain. They are essential for email delivery and routing.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'mailServer', label: 'Mail server', type: 'text', required: true, placeholder: 'E.g. mx1.example.com' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'priority', label: 'Priority', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	NAPTR: {
		description: 'NAPTR records are used to specify the rules for how to resolve a domain name into a service. They are often used in conjunction with SRV records to provide more detailed information about the services available at a domain.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'order', label: 'Order', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'preference', label: 'Preference', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'flags', label: 'Flags', type: 'text', required: true, placeholder: 'S, A, U, P' },
			{ name: 'service', label: 'Service', type: 'text', required: true, placeholder: 'E.g. protocol=...' },
			{ name: 'regexp', label: 'RegExp', type: 'text', placeholder: 'E.g. delim-char=...' },
			{ name: 'replacement', label: 'Replacement', type: 'text' },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	NS: {
		description: 'NS records are used to specify the authoritative name servers for a domain. They are essential for DNS resolution and help direct traffic to the correct name servers.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'nameServer', label: 'Name server', type: 'text', required: true, placeholder: 'E.g. ns1.example.com' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	PTR: {
		description: 'PTR records are used to map an IP address to a domain name. They are often used for reverse DNS lookups, allowing you to find the domain name associated with a specific IP address.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'domainName', label: 'Domain name', type: 'text', required: true, placeholder: 'E.g. www.example.com' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	SMIMEA: {
		description: 'SMIMEA records are used to store S/MIME certificates in DNS. They are used for email encryption and signing, allowing you to verify the authenticity of email messages.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'usage', label: 'Usage', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'selector', label: 'Selector', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'matchingType', label: 'Matching type', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'certificate', label: 'Certificate (hexadecimal)', type: 'textarea', required: true, placeholder: 'E.g. 436c6f7564666c...61726520444e53' },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	SRV: {
		description: 'SRV records are used to specify the location of services within a domain. They provide information about the hostname and port number of a service, allowing clients to discover and connect to the service.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'priority', label: 'Priority', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'weight', label: 'Weight', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'port', label: 'Port', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'target', label: 'Target', type: 'text', required: true, placeholder: 'E.g. www.example.com' },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	SSHFP: {
		description: 'SSHFP records are used to store SSH public key fingerprints in DNS. They are used to verify the authenticity of SSH servers and prevent man-in-the-middle attacks.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'algorithm', label: 'Algorithm', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'type', label: 'Type', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'fingerprint', label: 'Fingerprint (hexadecimal)', type: 'textarea', required: true, placeholder: 'E.g. 436c6f7564666c...61726520444e53' },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	SVCB: {
		description: 'SVCB records are used to specify the location of services within a domain. They provide information about the hostname and port number of a service, allowing clients to discover and connect to the service.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'priority', label: 'Priority', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'target', label: 'Target', type: 'text', required: true },
			{ name: 'value', label: 'Value', type: 'textarea', placeholder: 'E.g. alpn="h3,h2" ipv4hint="127.0.0.1" ipv6hint="::1"' },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	TLSA: {
		description: 'TLSA records are used to store TLS certificates in DNS. They are used for DANE (DNS-based Authentication of Named Entities), allowing you to specify which TLS certificates are valid for a domain.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'usage', label: 'Usage', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'selector', label: 'Selector', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'matchingType', label: 'Matching type', type: 'number', required: true, min: 0, max: 255 },
			{ name: 'certificate', label: 'Certificate (hexadecimal)', type: 'textarea', required: true, placeholder: 'E.g. 436c6f7564666c...61726520444e53' },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	TXT: {
		description: 'TXT records are used to store arbitrary text data in DNS. They are often used for various purposes, including SPF (Sender Policy Framework) records for email authentication, domain verification, and other custom data.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'content', label: 'Content', type: 'textarea', required: true },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	},

	URI: {
		description: 'URI records are used to specify a URI (Uniform Resource Identifier) associated with a domain. They can be used for various purposes, including service discovery and linking to resources.',
		fields: [
			{ name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Use @ for root' },
			{ name: 'ttl', label: 'TTL', type: 'select', options: ['Auto', '1min', '2min', '5min', '10min', '30min', '1h', '2h', '5h', '12h', '1d'] },
			{ name: 'priority', label: 'Priority', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'weight', label: 'Weight', type: 'number', required: true, min: 0, max: 65535 },
			{ name: 'target', label: 'Target', type: 'text', required: true },
			{ name: 'comment', label: 'Comment', type: 'text', placeholder: 'Enter your comment here (up to 100 characters).' }
		]
	}
}
