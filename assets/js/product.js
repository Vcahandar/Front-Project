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

// --------------------

// ----language-------

let language=document.querySelectorAll(".language li a")
let basic=document.querySelector(".basic");

for (const item of language) {
  item.addEventListener("click",function(){
    let basicImg=this.firstElementChild.getAttribute("src")
    basic.firstElementChild.setAttribute("src",basicImg);
    basic.lastElementChild.innerText=this.lastElementChild.innerText
  })
}

// ----------------------

// --------------basket-------------------------


let cardBtns =document.querySelectorAll("#carousel-prdct .slider .slider__item .card-body a")


let products=[];

if(localStorage.getItem("basket-product")!=null){
  products=JSON.parse(localStorage.getItem("basket-product"))
}



cardBtns.forEach(btn => {
  btn.addEventListener("click",function(e){
    e.preventDefault();

  

    let productImg = this.parentNode.previousElementSibling.lastElementChild.getAttribute("src")
    let productName = this.previousElementSibling.previousElementSibling.innerText;
    let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"))
    let productPrice = parseInt(this.previousElementSibling.lastElementChild.lastElementChild.innerText)

    let existProduct=products.find(m=>m.id==productId)

    if(existProduct!=undefined){
      existProduct.count+=1;
      existProduct.price = productPrice*existProduct.count;
    }
    else{
      products.push({
        id:productId,
        name:productName,
        img:productImg,
        price:productPrice,
        count:1,
      })

    }
    localStorage.setItem("basket-product",JSON.stringify(products))

    getBasketCount(products)
    showTotalPrice()
  })
  
});



function getBasketCount(arr){
  document.querySelector(".count span").innerText=arr.length
}

getBasketCount(products)


function showTotalPrice() {
  if (products != null) {

      let sum = 0;
      for (const item of products) {
          sum += parseInt(item.price);
      }

      document.querySelector(".subtotal-bottom").innerText = `$${sum}.00`;
  }
}

showTotalPrice()

function getBasketTotal(arr){
  document.querySelector(".price-class").lastElementChild.innerText;

}

// -----------------------------

// ----Carusel-mini-1-------

const sliders = [...document.querySelectorAll(".slider__container")];
const sliderControlPrev = [...document.querySelectorAll(".slider__control.prev")];
const sliderControlNext = [...document.querySelectorAll(".slider__control.next")];

sliders.forEach((slider, i) => {
  let isDragStart = false,
      isDragging = false,
      isSlide = false,
      prevPageX,
      prevScrollLeft,
      positionDiff;

  const sliderItem = slider.querySelector(".slider__item");
  var isMultislide = (slider.dataset.multislide === 'true');

  sliderControlPrev[i].addEventListener('click', () => {
    if (isSlide) return;
    isSlide = true;
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    slider.scrollLeft += -slideWidth;
    setTimeout(function(){ isSlide = false; }, 700);
  });

  sliderControlNext[i].addEventListener('click', () => {
    if (isSlide) return;
    isSlide = true;
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth ;
    slider.scrollLeft += slideWidth;
    setTimeout(function(){ isSlide = false; }, 700);
  });

  function autoSlide() {
    if(slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff);
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    let valDifference = slideWidth - positionDiff;
    if(slider.scrollLeft > prevScrollLeft) {
        return slider.scrollLeft += positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
    }
    slider.scrollLeft -= positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
  }

  function dragStart(e) {
    if (isSlide) return;
    isSlide = true;
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
    setTimeout(function(){ isSlide = false; }, 700);
  }

  function dragging(e) {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    slider.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
  }

  function dragStop() {
    isDragStart = false;
    slider.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
  }

  addEventListener("resize", autoSlide);
  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("touchstart", dragStart);
  slider.addEventListener("mousemove", dragging);
  slider.addEventListener("touchmove", dragging);
  slider.addEventListener("mouseup", dragStop);
  slider.addEventListener("touchend", dragStop);
  slider.addEventListener("mouseleave", dragStop);
});


// ------------------------------------------------

// ----count-plus-minis----
$(document).ready(function() {
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});


// -----------

// let imgs=document.querySelectorAll(".test");


// for (const item of imgs) {
//   item.addEventListener("click",function(){
//     console.log(item);
   
//   })
// }