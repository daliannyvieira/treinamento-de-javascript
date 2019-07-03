let form = document.querySelector("form");
let cards = document.createElement("ul");
let notes = []
let isEditing = undefined

form.addEventListener("submit", event => {
	event.preventDefault();

	if (typeof(isEditing) == 'number') {
		handleEdit()
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

function handleEdit () {
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
		card.style.backgroundColor = note.color;

		let title = renderItem("h2", note.title);
		let description = renderItem("p", note.description);
		let category = renderItem("p", note.category);
		let color = renderItem("p", note.color);

		let buttons = document.createElement("div");
		let buttonEdit = renderItem("button", "edit");
		let buttonDelete = renderItem("button", "delete");

		handleEditButton(buttonEdit, note, index)
		handleDeleteButton(buttonDelete, note)

		buttons.appendChild(buttonDelete);
		buttons.appendChild(buttonEdit);

		card.appendChild(title);
		card.appendChild(description);
		card.appendChild(category);
		card.appendChild(color);
		card.appendChild(buttons);

		cards.appendChild(card);
	});
};

function renderItem (el, txt) {
	let elementEl = document.createElement(el);
	let textNode = document.createTextNode(txt);

	elementEl.appendChild(textNode)

	return elementEl;
}

function handleDeleteButton(buttonDelete, note, index) {
	buttonDelete.addEventListener("click", function(){
		notes = arrayRemove(notes, note);
		render()
	});
}

function arrayRemove(notes, note) {
	return notes.filter(function(el){
		return el != note;
	});
}

function handleEditButton(buttonEdit, note, index) {
	buttonEdit.addEventListener("click", function(){
		form.elements.description.value = note.description
		form.elements.category.value = note.category
		form.elements.title.value = note.title
		form.elements.color.value = note.color
		isEditing = index
	});
}

function cleanValues () {
	form.elements.description.value = ''
	form.elements.category.value = ''
	form.elements.title.value = ''
	form.elements.color.value = "#fab71f"
}

document.body.appendChild(cards);