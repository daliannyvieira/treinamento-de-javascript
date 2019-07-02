let form = document.querySelector("form");
let cards = document.createElement("ul");
let notes = []

form.addEventListener("submit", event => {
	event.preventDefault();

	notes.push({
		title: form.elements.title.value,
		description: form.elements.description.value,
		category: form.elements.category.value,
		color: form.elements.color.value,
	})

	form.elements.description.value = ''
	form.elements.category.value = ''
	form.elements.title.value = ''

	render()
});

function render() {
	while (cards.firstChild) {
		cards.removeChild(cards.firstChild);
	}

	notes.map((note) => {
		let card = document.createElement("li");

		let title = renderItem("h2", note.title);
		let description = renderItem("p", note.description);
		let category = renderItem("p", note.category);
		let color = renderItem("p", note.color);


		card.appendChild(title);
		card.appendChild(description);
		card.appendChild(category);
		card.appendChild(color);

		card.style.backgroundColor = note.color;

		cards.appendChild(card);
	});
};

function renderItem (element, text) {
	let elementEl = document.createElement(element);
	let textText = document.createTextNode(text);

	elementEl.appendChild(textText)

	return elementEl;
}

document.body.appendChild(cards);