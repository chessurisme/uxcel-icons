class HeroFooter {
	constructor() {
		this.container = document.createElement('footer');

		this.init();
		return this.container;
	}

	init() {
		this.container.appendChild(this.createFigmaLink());
		this.container.appendChild(this.createSourceCodeLink());
	}

	createNewTabIcon() {
		const newTabIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		newTabIcon.setAttribute('width', '36');
		newTabIcon.setAttribute('height', '36');
		newTabIcon.setAttribute('viewBox', '0 0 36 36');
		newTabIcon.setAttribute('fill', 'none');
		newTabIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		const newTabPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		newTabPath.setAttribute('fill-rule', 'evenodd');
		newTabPath.setAttribute('clip-rule', 'evenodd');
		newTabPath.setAttribute(
			'd',
			'M13.4724 10.5C12.644 10.5 11.9724 9.82843 11.9724 9C11.9724 8.17157 12.644 7.5 13.4724 7.5H27.079C27.9075 7.5 28.579 8.17157 28.579 9L28.579 22.6066C28.579 23.435 27.9075 24.1066 27.079 24.1066C26.2506 24.1066 25.579 23.435 25.579 22.6066L25.579 12.5147L9.98156 28.2408C9.39577 28.8266 8.44602 28.8266 7.86024 28.2408C7.27445 27.655 7.27445 26.7052 7.86024 26.1195L23.3511 10.5H13.4724Z'
		);
		newTabIcon.appendChild(newTabPath);

		return newTabIcon;
	}

	createSourceCodeLink() {
		const container = document.createElement('div');

		const sourceCodeLink = document.createElement('a');
		sourceCodeLink.setAttribute('href', 'https://github.com/chessurisme/uxcel-icons');
		sourceCodeLink.setAttribute('target', '_blank');
		sourceCodeLink.setAttribute('rel', 'noopener noreferrer');

		const newTabIcon = this.createNewTabIcon();

		container.appendChild(sourceCodeLink);
		container.appendChild(newTabIcon);

		return container;
	}

	createFigmaLink() {
		const container = document.createElement('div');

		const figmaLink = document.createElement('a');
		figmaLink.setAttribute('href', 'https://www.figma.com/community/file/1242748013102755522/500-free-icon-set-by-uxcel');
		figmaLink.setAttribute('target', '_blank');
		figmaLink.setAttribute('rel', 'noopener noreferrer');

		const newTabIcon = this.createNewTabIcon();

		container.appendChild(figmaLink);
		container.appendChild(newTabIcon);

		return container;
	}
}
