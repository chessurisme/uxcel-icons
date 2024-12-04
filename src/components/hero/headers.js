class HeroHeader {
	constructor() {
		this.container = document.createElement('div');

		this.init();

		return this.container;
	}

	init() {
		this.container.appendChild(this.createHeader());
		this.container.appendChild(this.createSubheader());
		this.container.appendChild(this.createSearchBar());
		this.container.appendChild(this.createChip('Outlined'));
		this.container.appendChild(this.createChip('Filled'));
		this.container.appendChild(this.createChip('Colored'));
		this.addAttributesToContainer();
	}

	addAttributesToContainer() {
		this.container.classList.add('hero-header');
	}

	createHeader() {
		const header = document.createElement('h1');
		header.classList.add('hero-header--title');
		header.textContent = 'Uxcel Icons';

		return header;
	}

	createSubheader() {
		const subheader = document.createElement('div');
		const by = document.createElement('p');
		const uxcel = document.createElement('img');
		const dotCom = document.createElement('p');

		subheader.classList.add('hero-header--subheader');
		uxcel.src = '../../../assets/images/brand.svg';

		by.textContent = 'by';
		dotCom.textContent = 'dot.com';

		subheader.appendChild(by);
		subheader.appendChild(dotCom);

		return subheader;
	}

	createChip(text) {
		const chip = document.createElement('span');
		chip.classList.add('chip');
		chip.id = `chip-${text}`;
		chip.textContent = text;

		return chip;
	}

	createSearchIcon() {
		const searchIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		searchIcon.setAttribute('width', '36');
		searchIcon.setAttribute('height', '36');
		searchIcon.setAttribute('viewBox', '0 0 36 36');
		searchIcon.setAttribute('fill', 'none');
		searchIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		const searchPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		searchPath.setAttribute('fill-rule', 'evenodd');
		searchPath.setAttribute('clip-rule', 'evenodd');
		searchPath.setAttribute(
			'd',
			'M14.3933 4.5C8.92939 4.5 4.5 8.92939 4.5 14.3933C4.5 19.8572 8.92939 24.2866 14.3933 24.2866C17.1271 24.2866 19.5996 23.1798 21.3918 21.3861C23.1821 19.5944 24.2866 17.1243 24.2866 14.3933C24.2866 8.92939 19.8572 4.5 14.3933 4.5ZM1.5 14.3933C1.5 7.27253 7.27253 1.5 14.3933 1.5C21.5141 1.5 27.2866 7.27253 27.2866 14.3933C27.2866 17.4109 26.2485 20.1881 24.5122 22.3843L32.5672 30.4393C33.153 31.0251 33.153 31.9749 32.5672 32.5607C31.9814 33.1464 31.0316 33.1464 30.4459 32.5607L22.3916 24.5064C20.1943 26.2462 17.4143 27.2866 14.3933 27.2866C7.27253 27.2866 1.5 21.5141 1.5 14.3933Z'
		);
		searchIcon.appendChild(searchPath);

		return searchIcon;
	}

	createSearchBar() {
		const searchInput = document.createElement('input');
		searchInput.type = 'text';
		searchInput.placeholder = 'Search icons...';
		searchInput.classList.add('search-input');
		searchInput.id = 'search-input';

		const searchIcon = this.createSearchIcon();
		searchInput.prepend(searchIcon);

		return searchInput;
	}
}

export { HeroHeader };
