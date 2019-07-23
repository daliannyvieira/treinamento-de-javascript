const form = document.createElement("form");
const ul = document.createElement('ul')
let shows = []

function render() {
  let formulario = [
    {
      tag: 'label',
      attributes: [
        {
          name: 'Título',
        }
      ],
      children: [
        {
          tag: 'input',
          attributes: [{
            name: 'Título',
            placeholder: 'Título',
            required: true
          }]
        }
      ]
    },
    {
      tag: 'label',
      attributes: [
        {
          name: 'Descrição',
        }
      ],
      children: [
        {
          tag: 'input',
          attributes: [{
            name: 'Descrição',
            placeholder: 'Descrição',
            required: true
          }]
        }
      ]
    },
    {
      tag: 'label',
      attributes: [
        {
          name: 'Categoria',
        }
      ],
      children: [
        {
          tag: 'input',
          attributes: [{
            name: 'Categoria',
            placeholder: 'Categoria',
            required: true
          }]
        }
      ]
    }
  ]

  let buttons = [
    {
      tag: 'div',
      attributes: [
        {
          className: 'containerBtnsForm'
        }
      ],
      children: [
        {
          tag: 'button',
          attributes: [{
            type: 'Submit',
            className: "btnSubmit btnsSeason"
          }],
          texto: 'Submit'
        }
      ]
    }
  ]

  buildForm(formulario);
  buildForm(buttons);

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    let tvShow = {}
    formulario.map(item => {
      item.attributes.map(el => {
        tvShow[el.name] = form.elements[el.name].value

        form.elements[el.name].value = ''
      })
    })
    shows.push(tvShow)
    renderList()
  })
  document.body.appendChild(form);
  document.body.appendChild(ul);
}

function renderList () {
  let atual = shows.map(((show, index) => {
    return {
      tag: 'li',
      attributes: [
        {
          className: 'containerCard',
          id: `add-season-${index}`
        }
      ],
      children: [
        {
          tag: 'h2',
          texto: show.Título
        },
        {
          tag: 'p',
          texto: show.Categoria
        },
        {
          tag: 'p',
          texto: show.Descrição
        },
        {
          tag: 'button',
          texto: 'add season'
        }
      ]
    }
  }))
  buildList(atual)
}

function buildList(elementos) {
  ul.innerHTML = ''
  elementos.map(tag => {
    ul.appendChild(createTag(tag)) 
  })

  buttons = ul.getElementsByTagName('button');

  for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(event) {
      let card = event.target.parentNode;
      let cardId = card.getAttribute('id');

      let addSeason = {
        tag: 'label',
        attributes: [
          {
            name: cardId
          }
        ],
        children: [
          {
            tag: 'input',
            attributes: [{
              name: cardId,
              placeholder: 'Season',
              required: true
            }]
          },
          {
            tag: 'button',
            texto: 'saveeee season',
            attributes: [{
              name: cardId
            }]
          }
        ]
      }

      event.target.parentNode.removeChild(event.target);
      card.appendChild(createTag(addSeason));
    })
  }
}

function buildForm(elementos) {
  elementos.map(tag => {
    form.appendChild(createTag(tag)) 
  })
}

function createTag(tag) {
  let el = document.createElement(tag.tag)

  if (tag.attributes) {
    tag.attributes.map(atributo => {
      createAttributes(atributo, el)
    })
  }

  if (tag.children) {
    tag.children.map(child => {
      const childEl = createTag(child)
      el.appendChild(childEl)
    })
  }

  if (tag.texto) {
    el.innerHTML = tag.texto
  }

  if (tag.styles) {
    let Styles = Object.keys(tag.styles)

    Styles.map(styl => {
      el.style[styl] = tag.styles[styl]
    })
  }

  return el;
}

function createAttributes(attr, el) {
  let keys = Object.keys(attr)

  keys.map(key => {
    el.setAttribute(key, attr[key])
  })
}

window.onload = render();