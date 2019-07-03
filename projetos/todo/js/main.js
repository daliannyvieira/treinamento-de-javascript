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

function render() {
	while (cards.firstChild) {
		cards.removeChild(cards.firstChild);
	}
	notes.map((note, index) => {
		renderItem(note, index)
	});
};

function renderItem(note, index) {
	let card = document.createElement("li");
	card.style.backgroundColor = note.check ? '#ddd' : note.color;

	let title = createTag("h2", note.title);
	let description = createTag("p", note.description);
	let category = createTag("p", note.category);
	let color = createTag("p", note.color);

	let buttons = document.createElement("div");
	let buttonEdit = createTag("button", "edit");
	let buttonDelete = createTag("button", "delete");
	let buttonCheck = createTag("button", note.check ? "concluído" : "a fazer");

	if (!note.check) {
		buttons.appendChild(buttonDelete);
		buttons.appendChild(buttonEdit);
		handleEditButton(buttonEdit, note, index);
		handleDeleteButton(buttonDelete, note);
	}

	buttons.appendChild(buttonCheck);
	handleCheckButton(buttonCheck, note);

	card.appendChild(title);
	card.appendChild(description);
	card.appendChild(category);
	card.appendChild(color);
	card.appendChild(buttons);

	cards.appendChild(card);
}

function createTag (el, txt) {
	let elementEl = document.createElement(el);
	let textNode = document.createTextNode(txt);

	elementEl.appendChild(textNode)

	return elementEl;
}

function handleEdit () {
	notes[isEditing] = {
		title: form.elements.title.value,
		description: form.elements.description.value,
		category: form.elements.category.value,
		color: form.elements.color.value,
		check: notes[isEditing].check ? notes[isEditing].check : undefined
	};

	isEditing = undefined;
	cleanValues()
	render()
}

function handleDeleteButton(buttonDelete, note, index) {
	buttonDelete.addEventListener("click", function(){
		notes = arrayRemove(notes, note);
		render()
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

function handleCheckButton (buttonCheck, note) {
	buttonCheck.addEventListener("click", function() {
		note.check = !note.check
		render()
	})
}

function arrayRemove(notes, note) {
	return notes.filter(function(el){
		return el != note;
	});
}

function cleanValues () {
	form.elements.description.value = ''
	form.elements.category.value = ''
	form.elements.title.value = ''
	form.elements.color.value = "#fab71f"
}

document.body.appendChild(cards);