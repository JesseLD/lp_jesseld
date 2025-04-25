const mobileBtn = document.querySelector('#mobile-btn');
const menu = document.querySelector('#mobile-menu'); // Assumindo que o menu tem o id "mobile-menu"

let isOpen = false;

mobileBtn.addEventListener('click', function () {
  // Pega o nome atual do ícone
  let iconName = mobileBtn.getAttribute('name');

  // Animação para o ícone (transição suave)
  mobileBtn.classList.add('icon-transition');

  if (isOpen) {
    mobileBtn.setAttribute('name', 'menu-outline'); // Ícone do menu
    menu.classList.remove('open'); // Fecha o menu com animação
  } else {
    mobileBtn.setAttribute('name', 'close-outline'); // Ícone de fechar
    menu.classList.add('open'); // Abre o menu com animação
  }

  // Log para verificar o nome do ícone
  console.log(iconName);

  isOpen = !isOpen;
});
