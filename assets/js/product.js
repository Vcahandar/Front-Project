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
let test=document.querySelector(".test");

for (const item of language) {
  item.addEventListener("click",function(){
    let test2=this.firstElementChild.getAttribute("src")
    test.firstElementChild.setAttribute("src",test2);
    test.lastElementChild.innerText=this.lastElementChild.innerText
  })
}

// -----------------------------