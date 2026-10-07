//mevita mostrar a mensagem do formspree
const formContato = document.getElementById("meu-formulario");
const mensagemSucesso = document.getElementById("mensagem-sucesso");

if (formContato) {
  formContato.addEventListener("submit", async function(event) {
    // 1. Impede o redirecionamento automático para a página do Formspree
    event.preventDefault(); 
    
    // 2. Empacota os dados que o usuário preencheu
    const dadosFormulario = new FormData(formContato);

    try {
      // 3. Envia os dados (AJAX) para o Formspree usando a API Fetch
      const resposta = await fetch(formContato.action, {
        method: formContato.method,
        body: dadosFormulario,
        headers: {
          'Accept': 'application/json'
        }
      });

      // 4. Verifica se a requisição funcionou
      if (resposta.ok) {
        formContato.reset(); // Limpa os campos
        formContato.classList.add("escondido"); // Esconde a caixa do formulário
        mensagemSucesso.classList.remove("escondido"); // Revela a caixa de agradecimento
      } else {
        alert("Oops! Houve um problema ao enviar sua mensagem.");
      }
    } catch (erro) {
      alert("Oops! Não foi possível conectar ao servidor. Tente novamente.");
    }
  });
}

// Efeito Parallax com 10 símbolos
window.addEventListener('scroll', () => {
  const rolagem = window.scrollY;
  
  const s1 = document.querySelector('.simbolo-1');
  const s2 = document.querySelector('.simbolo-2');
  const s3 = document.querySelector('.simbolo-3');
  const s4 = document.querySelector('.simbolo-4');
  const s5 = document.querySelector('.simbolo-5');

  // Multiplicadores diferentes criam a ilusão de que alguns estão mais perto e outros mais longe (3D)
  if (s1) s1.style.transform = `translateY(${rolagem * -0.2}px)`;
  if (s2) s2.style.transform = `translateY(${rolagem * -0.4}px) rotate(${rolagem * 0.05}deg)`;
  if (s3) s3.style.transform = `translateY(${rolagem * -0.15}px)`;
  if (s4) s4.style.transform = `translateY(${rolagem * -0.3}px) rotate(${rolagem * -0.05}deg)`;
  if (s5) s5.style.transform = `translateY(${rolagem * -0.25}px)`;
});

// Carrossel de Skills Automático
const track = document.querySelector('.carrossel-track');
const slides = Array.from(track.children);
const btnNext = document.querySelector('.botao-carrossel.next');
const btnPrev = document.querySelector('.botao-carrossel.prev');

let indexAtual = 0;
let intervaloCarrossel; // Variável para guardar o relógio

// Função que move a esteira
function atualizarCarrossel() {
    const deslocamento = -indexAtual * 100;
    track.style.transform = `translateX(${deslocamento}%)`;
}

// Função para avançar o slide
function avancarSlide() {
    if (indexAtual < slides.length - 1) {
        indexAtual++;
    } else {
        indexAtual = 0;
    }
    atualizarCarrossel();
}

// Função que liga o motor automático (muda a cada 3000ms = 3 segundos)
function iniciarCarrosselAutomático() {
    intervaloCarrossel = setInterval(avancarSlide, 2000);
}

// Função que reinicia o relógio se o utilizador clicar nos botões
function resetarRelogio() {
    clearInterval(intervaloCarrossel);
    iniciarCarrosselAutomático();
}

// Evento de clique no botão Avançar
btnNext.addEventListener('click', () => {
    avancarSlide();
    resetarRelogio(); // Pausa e recomeça os 3 segundos
});

// Evento de clique no botão Voltar
btnPrev.addEventListener('click', () => {
    if (indexAtual > 0) {
        indexAtual--;
    } else {
        indexAtual = slides.length - 1;
    }
    atualizarCarrossel();
    resetarRelogio(); // Pausa e recomeça os 3 segundos
});

// Dá o arranque inicial quando a página carrega
iniciarCarrosselAutomático();


// --- ANIMAÇÃO GSAP + SPLITTYPE NAS REDES SOCIAIS ---
const linksRedes = document.querySelectorAll('#Redes .links a');

linksRedes.forEach((link) => {
  // 1. Divide a palavra em letras individuais (cria divs com a classe .char)
  const textoDividido = new SplitType(link, { types: 'chars' });

  // 2. Animação inicial quando a seção aparece na tela pela primeira vez
  gsap.from(textoDividido.chars, {
    y: 40,
    opacity: 0,
    stagger: 0.05,
    duration: 0.6,
    ease: 'back.out(1.7)'
  });

  // 3. Animação ao passar o mouse (efeito onda letra por letra)
  link.addEventListener('mouseenter', () => {
    gsap.fromTo(textoDividido.chars, 
      { y: 0, color: '#fff9f5' },
      {
        y: -15, // Sobe 15px
        color: '#ff5e01a8', // Brilha em laranja claro durante o pulo
        stagger: 0.04, // Atraso entre cada letra (efeito dominó)
        duration: 0.25,
        ease: 'power2.out',
        yoyo: true, // Faz a letra voltar para o lugar
        repeat: 1, // Repete 1 vez (sobe e desce)
        overwrite: 'auto' // Evita travar se passar o mouse rápido várias vezes
      }
    );
  });
});

// Salva o título original da página
let tituloOriginal = document.title;

// Quando o usuário sai da aba
window.addEventListener('blur', () => {
    document.title = 'Ei, volta aqui...';
});

// Quando o usuário volta para a aba
window.addEventListener('focus', () => {
    document.title = tituloOriginal; // Restaura o nome original
});

//animacao cursor
// Palavras que vão ficar alternando no h1
const palavrasGithub = ["GitHub!", "Repositório!", "Meu Perfil!"];

// Seleciona o span onde o texto vai aparecer
const textElementGithub = document.querySelector(".meio-github .typewriter");

let palavraIndex = 0; 
let charIndex = 0;      
let isDeleting = false; 

function typeGithub() {
  // Garantia de que a função só rode se o elemento existir na página
  if (!textElementGithub) return;

  const currentWord = palavrasGithub[palavraIndex];

  if (isDeleting) {
    textElementGithub.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    textElementGithub.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 2000; // Pausa quando termina de escrever
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    palavraIndex = (palavraIndex + 1) % palavrasGithub.length; 
    speed = 500; // Pausa antes de escrever a próxima
  }

  setTimeout(typeGithub, speed);
}
// Inicia a animação
typeGithub();

// --- ANIMAÇÃO DE DIGITAÇÃO DO RODAPÉ ---
const frasesRodape = [
  "Vamos trabalhar juntos?", 
  "Entre em contato comigo!", 
  "Transforme sua ideia em código!"
];

// Seleciona especificamente o typewriter de dentro do rodapé
const textElementRodape = document.querySelector(".rodape .typewriter");

let palavraIndexRodape = 0; 
let charIndexRodape = 0;      
let isDeletingRodape = false; 

function typeRodape() {
  if (!textElementRodape) return;

  const currentWord = frasesRodape[palavraIndexRodape];

  if (isDeletingRodape) {
    textElementRodape.textContent = currentWord.substring(0, charIndexRodape - 1);
    charIndexRodape--;
  } else {
    textElementRodape.textContent = currentWord.substring(0, charIndexRodape + 1);
    charIndexRodape++;
  }

  let speed = isDeletingRodape ? 50 : 100;

  if (!isDeletingRodape && charIndexRodape === currentWord.length) {
    speed = 2000; // Tempo que a frase completa fica parada na tela
    isDeletingRodape = true;
  } else if (isDeletingRodape && charIndexRodape === 0) {
    isDeletingRodape = false;
    palavraIndexRodape = (palavraIndexRodape + 1) % frasesRodape.length; 
    speed = 500; // Tempo com a tela vazia antes de começar a digitar de novo
  }

  setTimeout(typeRodape, speed);
}

// Inicia a animação do rodapé
typeRodape();

//MÁSCARA DE TELEFONE 
function mascara_telefone() {
    var telefone = document.getElementById("telefone").value;
    telefone = telefone.slice(0,20);

    var telefone_formatado = document.getElementById("telefone").value;
    
    if (telefone_formatado[0] != "+") {
        if (telefone_formatado[0] != undefined) {
            document.getElementById("telefone").value = "+" + telefone_formatado[0];
        }
    }

    if (telefone_formatado[3] != " ") {
        if (telefone_formatado[3] != undefined) {
            document.getElementById("telefone").value = telefone_formatado.slice(0,3) + " " + telefone_formatado[3];
        }
    }

    if (telefone_formatado[4] != "(") {
        if (telefone_formatado[4] != undefined) {
            document.getElementById("telefone").value = telefone_formatado.slice(0,4) + "(" + telefone_formatado[4];
        }
    }

    if (telefone_formatado[7] != ")") {
        if (telefone_formatado[7] != undefined) {
            document.getElementById("telefone").value = telefone_formatado.slice(0,7) + ")" + telefone_formatado[7];
        }
    }

    if (telefone_formatado[8] != " ") {
        if (telefone_formatado[8] != undefined) {
            document.getElementById("telefone").value = telefone_formatado.slice(0,8) + " " + telefone_formatado[8];
        }
    }

    if (telefone_formatado[10] != " ") {
        if (telefone_formatado[10] != undefined) {
            document.getElementById("telefone").value = telefone_formatado.slice(0,10) + " " + telefone_formatado[10];
        }
    }

    if (telefone_formatado[15] != "-") {
        if (telefone_formatado[15] != undefined) {
            document.getElementById("telefone").value = telefone_formatado.slice(0,15) + "-" + telefone_formatado[15];
        }
    }
}
