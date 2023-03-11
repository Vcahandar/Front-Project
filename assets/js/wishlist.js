"use strict"


let tableBody = document.querySelector("tbody")

let wishlists = JSON.parse(localStorage.getItem("wishlist"))

if (wishlists != null) {
    for (const product of wishlists) {
        tableBody.innerHTML += `<tr data-id = "${product.id}">
        <td class="td-img">
        <div class="prdct-img">
        <img src="${product.img}" alt=""></td>
        <td class="td-name">${product.name}</td>
        <td class="td-price">${product.price}.00</td>
        <td><i class="fa-solid fa-xmark delete"></i></td>
        </tr>`
    }

    // getBasketCount(products)


}
else {
    document.querySelector("table").classList.add("d-none")
    document.querySelector(".empty-contunie").classList.remove("d-none")
}


let dltn = document.querySelector("table .btn")

dltn.addEventListener("click", function () {
    localStorage.removeItem("wishlist");
    document.querySelector("table").classList.add("d-none")
    document.querySelector(".empty-contunie").classList.remove("d-none")
})



function deleteWishlist(id) {
    let wshlstProduct = wishlists.filter(m => m.id != id);
    wishlists = wshlstProduct
    localStorage.setItem("wishlist", JSON.stringify(wishlists));
}

let deleteIcons = document.querySelectorAll(".delete");

deleteIcons.forEach(icon => {
    icon.addEventListener("click", function () {
        let id = parseInt(this.parentNode.parentNode.getAttribute("data-id"))
        deleteWishlist(id)
        this.parentNode.parentNode.remove();
        if (wishlists.length == 0) {
            localStorage.removeItem("wishlist");
            document.querySelector("table").classList.add("d-none")
            document.querySelector(".empty-contunie").classList.remove("d-none")
        }


    })
});




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



















