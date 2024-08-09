// Footer
const accordionButton = document.querySelectorAll(
  ".cg-footer__outer .accordion-button"
);
const accordionCnt = document.querySelectorAll(
  ".cg-footer__outer .accordion-collapse"
);
window.addEventListener("load", () => {
  if (window.innerWidth < 767) {
    accordionButton.forEach((e) => {
      e.classList.add("collapsed");
    });
    accordionCnt.forEach((e) => {
      e.classList.remove("show");
    });
  } else {
    accordionButton.forEach((e) => {
      e.classList.remove("collapsed");
    });
    accordionCnt.forEach((e) => {
      e.classList.add("show");
    });
  }
});

// =====================================MOBMENU========================================================
const menuIcon = document.getElementById('cg-HamburgerMenu');
const closeIcon = document.getElementById('cg-closeIcon');
const menu = document.getElementById('cg-mobMenu');
const submenus = document.querySelectorAll('.cg-menuList__mainItems');
const submenusLONE = document.querySelectorAll('.cg-menuList__submenu');
const submenuLinks = document.querySelectorAll('.cg-menuList__hasSubmenu');
const backLinks = document.querySelectorAll('.cg-menuList__bacLink');

// Stack to keep track of menus and submenus for back navigation
let menuStack = [];

// Open main menu
menuIcon.addEventListener('click', function () {
  menu.style.right = '0';
  menuIcon.style.display = 'none';
  closeIcon.style.display = 'block';
  // Clear the stack when opening the main menu
  menuStack = [];
});

// Close main menu
closeIcon.addEventListener('click', function () {
  menu.style.right = '-100%';
  closeIcon.style.display = 'none';
  menuIcon.style.display = 'block';
  // Hide all submenus
  submenusLONE.forEach(submenu => {
    submenu.classList.remove('active');
     submenu.style.right = '-100%';
  });
  // Clear the stack when closing the main menu
  menuStack = [];
});

// Open submenu
submenuLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = link.getAttribute('data-target');
    const target = document.getElementById(targetId);

    // Track the current menu and submenu
    if (menuStack.length > 0) {
      const currentMenu = menuStack[menuStack.length - 1];
      // currentMenu.style.right = '-250px'; // Hide the current menu
    }

    // Show the target submenu
    submenus.forEach(submenu => submenu.classList.remove('active'));
    target.classList.add('active');
    target.style.right = '0';

    // Push the current submenu to the stack
    menuStack.push(target);
  });
});

// Go back to the previous menu
backLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    // Hide the current submenu
    const currentSubmenu = menuStack.pop();
    if (currentSubmenu) {
      currentSubmenu.classList.remove('active');
      currentSubmenu.style.right = '-100%';
    }

    // Show the previous menu from the stack
    if (menuStack.length > 0) {
      const previousMenu = menuStack[menuStack.length - 1];
      previousMenu.classList.add('active');
      previousMenu.style.right = '0';
    } else {
      // If no more items in the stack, show the main menu
      menu.style.right = '0';
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    }
  });
});

// main banner slider
$(".main-banner").slick({
  dots: false,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  // autoplaySpeed: 2000,
  speed: 500,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});
