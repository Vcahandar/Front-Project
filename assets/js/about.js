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


let cardBtns =document.querySelectorAll("#cards .slider .slider__item .card-body a")

let products=[];

if(localStorage.getItem("basket")!=null){
  products=JSON.parse(localStorage.getItem("basket"))
}



cardBtns.forEach(btn => {
  btn.addEventListener("click",function(e){
    e.preventDefault();

    let productImg = this.parentNode.previousElementSibling.lastElementChild.firstElementChild.getAttribute("src")
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
    localStorage.setItem("basket",JSON.stringify(products))

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

