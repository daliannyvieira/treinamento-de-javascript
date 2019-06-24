/*let cursos = [
  {
    title: 'javascript',
    duracao: 3, 
    autor: 'camila'
  },
  {
    title: 'html',
    duracao: 3,
    autor: 'cicero'
  },
  {
    title: 'python',
    duracao: 2, 
    autor: 'cassio'
  }
]

let listaEl = document.createElement("ul")

cursos.map(curso => {
  let palestrante = document.createElement("li");
  palestrante.innerHTML = curso.autor + ' - ' + curso.title 
  listaEl.appendChild(palestrante)
})

document.body.appendChild(listaEl);*/

let memes = [
  'http://www.museudememes.com.br/wp-content/uploads/2018/10/Sem-t%C3%ADtulo-2.jpg',
  'http://www.museudememes.com.br/wp-content/uploads/2018/09/bilete-dieta.png',
  'http://www.museudememes.com.br/wp-content/uploads/2018/09/bilete-amor-plat%C3%B4nico.jpg',
  'http://www.museudememes.com.br/wp-content/uploads/2018/09/bilete-catiorineo-2.png',
  'http://www.museudememes.com.br/wp-content/uploads/2018/09/bilete-vida-saud%C3%A1vel.png',
  'http://www.museudememes.com.br/wp-content/uploads/2018/09/bilete-webamigo.png'
]

function sortear (){
  let imagem = document.querySelector("img");
  let link = document.querySelector("a");

  let meme = memes[Math.floor(Math.random() * memes.length)]

  imagem.src = meme
  document.body.appendChild(imagem);
  link.href="whatsapp://send?text=" + meme
}

sortear()