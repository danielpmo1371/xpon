//import { Shortcut } from './shortcut.js';


$(document).ready(function () {

	class MyShortcut extends HTMLElement {
		connectedCallback() {
			this.name = this.getAttribute('name');
			this.link = this.getAttribute('link');
			this.icon = this.getAttribute('icon');
			this.render();
		}
		render() {
			const linkwraper = document.createElement('a');
			linkwraper.href = this.link;

			const div = document.createElement('div');
			div.classList.add('shortcut');

			const divIcon = document.createElement('div');
			divIcon.classList.add('shortcut-icon');
			divIcon.style.backgroundImage = this.icon ? `url(${this.icon})` : `url(${this.link}/favicon.ico)`;

			linkwraper.appendChild(divIcon);

			const divName = document.createElement('div');
			divName.classList.add('shortcut-name');

			const title = document.createElement('a');
			title.innerText = this.name;
			title.href = this.link;


			divName.appendChild(title);
			linkwraper.appendChild(divName);
			div.appendChild(linkwraper);

			this.appendChild(div);
		}
	}
	try {
		customElements.define('my-shortcut', MyShortcut);
	} catch (err) {
		const h3 = document.createElement('h3');
		h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!";
		document.body.appendChild(h3);
	}
	
	customElements.define('my-paragraph',
		class extends HTMLElement {
			constructor() {
				super();
				let template = document.getElementById('my-paragraph');
				let templateContent = template.content;

				let contentAtt = this.getAttribute('content');

				let templateClone = templateContent.cloneNode(true);

				let child = templateClone.querySelector("#content");

				child.innerText = "Success";

				console.log(child);

				const shadowRoot = this.attachShadow({ mode: 'open' })
					.appendChild(templateClone);
			}
		}
	);

	// chrome.storage.sync.get({}, function(data) {

	// });

	// chrome.storage.local.get("data", function(data) {

	// });

});

