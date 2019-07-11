const questions = [
  {
    pergunta: 'qual a capital do rio de janeiro?',
    resposta: 'rio de janeiro',
    alternativas: [
      'natal',
      'rio de janeiro',
      'tocantins',
      'recife',
      'manaus'
    ]
  },
  {
    pergunta: 'qual a capital do rio grande do norte?',
    resposta: 'natal',
    alternativas: [
      'natal',
      'aracajú',
      'tocantins',
      'recife',
      'manaus'
    ]
  },
  {
    pergunta: 'qual a capital da paraíba?',
    resposta: 'joão pessoa',
    alternativas: [
      'natal',
      'niteroi',
      'joão pessoa',
      'maceió',
      'aracajú',
    ]
  },
  {
    pergunta: 'qual a capital de pernambuco?',
    resposta: 'recife',
    alternativas: [
      'natal',
      'maranhão',
      'niteroi',
      'manaus',
      'recife'
    ]
  }
];

let current_question = 0;

let score = 0;

function renderQuestions() {
  // seleciona a pergunta atual pelo index
  const question = questions[current_question];

  // cria o form
  let form = document.createElement('form')

  // monta o h2
  let perguntaEl = document.createElement('h2');
  let perguntaTxt = document.createTextNode(question.pergunta);
  perguntaEl.appendChild(perguntaTxt);

  // adiciona o h2 ao form
  form.appendChild(perguntaEl);

  // monta as alternativas
  question.alternativas.map(alternativa => {

    // monta o input e labels
    let perguntaEl = document.createElement('input');
    let labelEl = document.createElement('label');
    let labelTxt = document.createTextNode(alternativa);

    perguntaEl.setAttribute('type', 'radio');
    perguntaEl.setAttribute('value', alternativa);
    perguntaEl.setAttribute('name', question.pergunta);
    perguntaEl.setAttribute('required', 'true');

    labelEl.appendChild(labelTxt);
    labelEl.setAttribute('for', alternativa);

    // adicionar ao form
    form.appendChild(perguntaEl);
    form.appendChild(labelEl);
  })

  // montar o submit button
  let button = document.createElement('button');
  let buttonTxt = document.createTextNode('submit');
  button.appendChild(buttonTxt);

  // adicionar o botão ao form
  form.appendChild(button);
  document.body.appendChild(form);

  form.addEventListener("submit", event => {
    event.preventDefault();

    let answer = form.elements[question.pergunta].value;

    // modifica um score
    if (answer == question.resposta) {
      score = score + 1;
    }

    // limpa a tela
    document.body.innerHTML = '';

    // renderiza uma nova pergunta
    if (current_question !== questions.length -1) {
      current_question = current_question + 1;
      renderQuestions();
    }

    // renderiza o score
    else {
      if (score <= 2) {
        document.body.style.backgroundColor = '#ff5722';
      }

      else {
        document.body.style.backgroundColor = '#CDDC39';
      }

      document.body.style.color = '#FFF';
      document.body.style.fontSize = '2rem';
      document.body.innerHTML = 'Seu scoreee é: ' + score;
    }
  });
}

window.onload = renderQuestions();