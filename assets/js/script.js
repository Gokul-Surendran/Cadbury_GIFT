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

const hambergicon = document.querySelector(".cd-mobmenu__menuicon");
const menu1 = document.querySelector(".cd-mobmenu__menu1");
const menuclose = document.querySelector(".cd-mobmenu__close");
const menulistbtn1 = document.querySelectorAll(".cd-mobmenu__item1");
const menulist2 = document.querySelectorAll(".cd-mobmenu__item1-menu");
let back1;

// home menu
hambergicon.addEventListener("click", () => {
  menu1.classList.add("active");
});

// close menu
menuclose.addEventListener("click", () => {
  menu1.classList.remove("active");
});

// 1st list show
menulistbtn1.forEach((item2) => {
  item2.addEventListener("click", () => {
    menulist2.forEach((mlist2) => {
      mlist2.classList.add("active");
    });
  });
  back1 = document.querySelectorAll(".cd-mobmenu__back1");
});

// Remove 'active' class from all menus when 'back1' is clicked
// back1.forEach((back) => {
//   back.addEventListener("click", () => {
//     menulist2.forEach((mlist2) => {
//         console.log("menu list :",m);

//       mlist2.classList.remove("active");
//     });
//   });
// });

back1?.forEach((back) => {
  console.log("back list :");

  back.addEventListener("click", () => {
    const parent = back.parentElement;
    console.log("back :", back);
    console.log("parent :", parent);
    console.log("grand :", parent.parentElement);

    parent.parentElement.classList.remove("active");
  });
});
