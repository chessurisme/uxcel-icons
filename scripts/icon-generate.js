const fs = require('fs');
const path = require('path');

function escapeJsString(input) {
	return input.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

const rootDir = '../uxcel-icons/icons';
const outputFile = '../uxcel-icons/dist/icon-structure.js';
const iconStructure = {};

const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(rootDir).forEach((category) => {
	const categoryPath = path.join(rootDir, category);

	if (fs.statSync(categoryPath).isDirectory()) {
		const escapedCategory = escapeJsString(category);
		iconStructure[escapedCategory] = {};

		fs.readdirSync(categoryPath).forEach((subcategory) => {
			const subcategoryPath = path.join(categoryPath, subcategory);

			if (fs.statSync(subcategoryPath).isDirectory()) {
				const escapedSubcategory = escapeJsString(subcategory);
				iconStructure[escapedCategory][escapedSubcategory] = [];

				fs.readdirSync(subcategoryPath).forEach((file) => {
					if (file.endsWith('.svg')) {
						const filePath = path.join(subcategoryPath, file);
						const svgContent = fs.readFileSync(filePath, 'utf8');
						const fileNameWithoutExt = path.basename(file, '.svg');
						iconStructure[escapedCategory][escapedSubcategory].push({
							name: escapeJsString(fileNameWithoutExt),
							svg: escapeJsString(svgContent)
						});
					}
				});
			}
		});
	}
});

const output = `export const iconStructure = ${JSON.stringify(iconStructure, null, 4)};`;
fs.writeFileSync(outputFile, output, 'utf8');

console.log(`Icon structure generated successfully at ${outputFile}`);
