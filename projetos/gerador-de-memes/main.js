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