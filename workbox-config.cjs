module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,css,html,svg,json}',

	],
	swDest: 'dist/sw.js',
	// ignoreURLParametersMatching: [
	// 	/^utm_/,
	// 	/^fbclid$/
	// ],
    swSrc: 'src/sw-template.js', // generateSW doesn't work with this prop use Inject instead
};