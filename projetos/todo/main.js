let form = document.querySelector("form");
let cards = document.createElement("ul");
let notes = []
let isEditing = undefined

form.addEventListener("submit", event => {
	event.preventDefault();

	if (typeof(isEditing) == 'number') {
		edit()
	}

	else {
		notes.push({
			title: form.elements.title.value,
			description: form.elements.description.value,
			category: form.elements.category.value,
			color: form.elements.color.value,
		})

		render()
		cleanValues()
	}
});

function edit () {
	notes[isEditing] = {
		title: form.elements.title.value,
		description: form.elements.description.value,
		category: form.elements.category.value,
		color: form.elements.color.value,
	};

	isEditing = undefined;
	cleanValues()
	render()
}

function render() {
	while (cards.firstChild) {
		cards.removeChild(cards.firstChild);
	}

	notes.map((note, index) => {
		let card = document.createElement("li");

		let title = renderItem("h2", note.title);
		let description = renderItem("p", note.description);
		let category = renderItem("p", note.category);
		let color = renderItem("p", note.color);

		let buttons = document.createElement("div");

		let buttonEdit = renderItem("button", "edit");
		let buttonDelete = renderItem("button", "delete");

		card.appendChild(title);
		card.appendChild(description);
		card.appendChild(category);
		card.appendChild(color);
		card.appendChild(buttons);

		buttons.appendChild(buttonDelete);
		buttons.appendChild(buttonEdit);

		card.style.backgroundColor = note.color;

		cards.appendChild(card);

		buttonDelete.addEventListener("click", function(){
			notes = arrayRemove(notes, note);
			render()
		});

		buttonEdit.addEventListener("click", function(){
			form.elements.description.value = note.description
			form.elements.category.value = note.category
			form.elements.title.value = note.title
			form.elements.color.value = note.color
			isEditing = index
		});

	});
};


function arrayRemove(notes, note) {
	return notes.filter(function(el){
		return el != note;
	});
}

function renderItem (el, txt) {
	let elementEl = document.createElement(el);
	let textNode = document.createTextNode(txt);

	elementEl.appendChild(textNode)

	return elementEl;
}

function cleanValues () {
	form.elements.description.value = ''
	form.elements.category.value = ''
	form.elements.title.value = ''
}

document.body.appendChild(cards);