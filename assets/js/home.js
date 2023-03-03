"use strict"

// // -----usd-eur--------------
let usd=document.querySelector(".usd-frst")

let eur=document.querySelector(".eur")


usd.addEventListener("click",function(){
    document.querySelector(".usd").innerText="USD"
})

eur.addEventListener("click",function(){
    document.querySelector(".usd").innerText="EUR"
})

// ---language------------

// let lng=document.querySelector(".language")

// let grm=document.querySelector(".grm")

// grm.addEventListener("click",function(){
//     lng.classList.d-none
// })




var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });



  
