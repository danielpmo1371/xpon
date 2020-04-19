//import { Shortcut } from './shortcut.js';


$(document).ready(function () {

	chrome.storage.sync.get({userName: ""}, function(data) {
		$(".userName").text(data.userName.toUpperCase());
	});
	
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
			divIcon.style.backgroundImage = this.icon ? `url(${this.icon})` : `url(chrome://favicon/${this.link})`;

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
			connectedCallback() {
				let template = document.getElementById('my-paragraph');
				let templateContent = template.content;

				let templateClone = templateContent.cloneNode(true);

				this.appendChild(templateClone);
			}
		}
	);

	chrome.storage.sync.get({shortcuts: []}, function(data) {
		var appShortcuts = []; 
		appShortcuts = data.shortcuts;
		appShortcuts.forEach(element => {
			const tempshortcut = document.createElement('my-paragraph');
			tempshortcut.setAttribute('name', element.title);
			tempshortcut.setAttribute('link', element.url);
			tempshortcut.setAttribute('icon', element.icon);

			let grid = document.getElementById('grid');
			grid.appendChild(tempshortcut);
			
			setShortcutTemplateValues(tempshortcut, element.title, element.url, element.icon);
		});

		$(".deleteBtn").click(function (event) {
			event.preventDefault();
	
			var name = this.getAttribute('name');
			var link = this.getAttribute('link');
			var icon = this.getAttribute('icon');
	
			chrome.storage.sync.get({ shortcuts: [] }, function (data) {
	
				var result = data.shortcuts.filter(x => x.url != link);
	
				chrome.storage.sync.set({ shortcuts: result }, function () {
					console.log('Value is set to ' + result);
				});
			});
		});
	});

	function setShortcutTemplateValues(template, title, url, icon){
		let nameElement = template.querySelector(".shortcut-name>a");
		let iconElement = template.querySelector(".shortcut-icon");
		let linkElement = template.querySelector(".shortcut");
		let deleteElement = template.querySelector(".deleteBtn");

		linkElement.href = url;
		nameElement.innerText = title;
		iconElement.style.backgroundImage = icon ? `url(${icon})` : `url(chrome://favicon/${url})`;

		deleteElement.setAttribute('name', title);
		deleteElement.setAttribute('link', url);
		deleteElement.setAttribute('icon', icon);
	}

	// chrome.storage.local.get("data", function(data) {

	// });

});

