var informacoes = [];

// Recupera informações do localStorage, se disponível
if (localStorage.getItem("informacoes")) {
  informacoes = JSON.parse(localStorage.getItem("informacoes"));
  exibirInformacoes();
}

function abrirMenu() {
  var menu = document.getElementById("menu");
  menu.style.height = "20rem";
  document.addEventListener("click", fecharMenuForaDoMenu);
}

function fecharMenu() {
  var menu = document.getElementById("menu");
  menu.style.height = "2rem";
  document.removeEventListener("click", fecharMenuForaDoMenu);
}

function fecharMenuForaDoMenu(event) {
  var menu = document.getElementById("menu");
  if (event.target !== menu && !menu.contains(event.target)) {
    fecharMenu();
  }
}

function abrirModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "flex";
}

function fecharModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

function adicionarInformacao() {
  var titulo = document.getElementById("titulo").value;
  var data = document.getElementById("data").value;
  var texto = document.getElementById("texto").value;

  if (titulo && data && texto) {
    var novaInformacao = {
      titulo: titulo,
      data: data,
      texto: texto,
    };

    informacoes.push(novaInformacao);

    // Salva informações no localStorage
    localStorage.setItem("informacoes", JSON.stringify(informacoes));

    exibirInformacoes();

    document.getElementById("titulo").value = "";
    document.getElementById("data").value = "";
    document.getElementById("texto").value = "";

    fecharModal("modal-add");
  }
}

function pesquisarInformacoes() {
  var termoPesquisa = document
    .getElementById("termo-pesquisa")
    .value.toLowerCase();
  var posts = document.querySelectorAll(".post");

  posts.forEach(function (post) {
    var titulo = post.getAttribute("data-titulo").toLowerCase();
    var data = post.getAttribute("data-data").toLowerCase();

    if (titulo.includes(termoPesquisa) || data.includes(termoPesquisa)) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

function removerPost() {
  var lixeiraIcons = document.querySelectorAll(".removePostIcon");
  lixeiraIcons.forEach(function (lixeiraIcon) {
    lixeiraIcon.style.display = "inline";
    lixeiraIcon.style.cursor = "pointer";
  });
}

function exibirInformacoes() {
  var body = document.querySelector(".body");
  body.innerHTML = "";

  informacoes.forEach(function (info, index) {
    var post = document.createElement("div");
    post.className = "post";
    post.setAttribute("data-titulo", info.titulo);
    post.setAttribute("data-data", info.data);

    var tituloElement = document.createElement("h3");
    tituloElement.className = "titlePost";
    tituloElement.innerText = info.titulo;

    var dataElement = document.createElement("p");
    dataElement.className = "dataPost";
    dataElement.innerText = info.data;

    var textoElement = document.createElement("p");
    textoElement.innerText = info.texto;

    var lixeiraIcon = document.createElement("img");
    lixeiraIcon.src = "../assets/icons/bin-svgrepo-com.svg";
    lixeiraIcon.className = "removePostIcon";
    lixeiraIcon.alt = "Remover";

    lixeiraIcon.addEventListener("click", function () {
      informacoes.splice(index, 1);
      localStorage.setItem("informacoes", JSON.stringify(informacoes));
      exibirInformacoes();
    });

    post.appendChild(tituloElement);
    post.appendChild(dataElement);
    post.appendChild(textoElement);
    post.appendChild(lixeiraIcon);

    body.appendChild(post);
  });
}
