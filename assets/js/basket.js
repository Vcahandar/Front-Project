
"use strict"

// // -----usd-eur--------------
let usd = document.querySelector(".usd-frst")

let eur = document.querySelector(".eur")


usd.addEventListener("click", function () {
    document.querySelector(".usd").innerText = "USD"
})

eur.addEventListener("click", function () {
    document.querySelector(".usd").innerText = "EUR"
})

// --------------------

// ----language-------

let language = document.querySelectorAll(".language li a")
let basic = document.querySelector(".basic");

for (const item of language) {
    item.addEventListener("click", function () {
        let basicImg = this.firstElementChild.getAttribute("src")
        basic.firstElementChild.setAttribute("src", basicImg);
        basic.lastElementChild.innerText = this.lastElementChild.innerText
    })
}

// --------------------------------------



// --------------------basket----------------------


let tableBody = document.querySelector("tbody")

let products = JSON.parse(localStorage.getItem("basket"))


getBasketDatas();



function getBasketDatas() {
    if (products != null) {
        for (const product of products) {
            let nativePrice = product.price / product.count
            tableBody.innerHTML += `<tr data-id = "${product.id}">
            <td class="td-img">
            <div class="prdct-img">
            <img src="${product.img}" alt=""></td>
            <td class="td-name">${product.name}</td>
            <td class="td-price">${nativePrice}.00 $</td>
            <td class="td-count">
            <div class="number">
            <span class="minus">-</span>
            <input type="text" value="${product.count}" disabled/>
            <span class="plus">+</span>
        </div></td>
            <td class="td-total">${product.price + ".00 $"}</td>
            <td><i class="fa-solid fa-xmark delete"></i></td>
            </tr>`
        }

        getBasketCount(products)
    }
    else {
        showAlert();

    }
}

function showAlert() {
    document.querySelector("table").classList.add("d-none")
    document.querySelector(".empty-contunie").classList.remove("d-none")
}





function getBasketCount(arr) {
    document.querySelector(".count span").innerText = arr.length
}

function deleteProduct(id) {
    products = products.filter(m => m.id != id);
    localStorage.setItem("basket", JSON.stringify(products))
}


let deleteIcons = document.querySelectorAll(".delete")


deleteIcons.forEach(icon => {
    icon.addEventListener("click", function () {
        let id = parseInt(this.parentNode.parentNode.getAttribute("data-id"))
        deleteProduct(id);
        this.parentNode.parentNode.remove();
        if (products.length == 0) {
            localStorage.removeItem("basket");
            showAlert();
        }
        getBasketCount(products);
        showTotalPrice();

    })
});


function showTotalPrice() {
    if (products != null) {
        let title = document.querySelector(".total-continue")
        title.classList.remove("d-none")

        let sum = 0;
        for (const item of products) {
            sum += parseInt(item.price);
        }

        document.querySelector(".total-continue .num").innerText = `${sum}.00`;
        document.querySelector(".subtotal-bottom").innerText = `$${sum}.00`;
    }
}

showTotalPrice()







// --------------------modal-plus-minus--------------

// $(document).ready(function() {
//     $('.minus').click(function () {
//       var $input = $(this).parent().find('input');
//       var count = parseInt($input.val()) - 1;
//       count = count < 1 ? 1 : count;
//       $input.val(count);
//       $input.change();
//       return false;
//     });
//     $('.plus').click(function () {
//       var $input = $(this).parent().find('input');
//       $input.val(parseInt($input.val()) + 1);
//       $input.change();
//       return false;
//     });
//   });

let plus = document.querySelectorAll("tr td .plus")

for (const item of plus) {

    item.addEventListener("click", function () {
        let thisProduct = products.find(m => m.id == this.parentNode.parentNode.parentNode.getAttribute("data-id"))
        let nativePrice = thisProduct.price / thisProduct.count
        thisProduct.count++
        this.previousElementSibling.value++;
        let totalPrice = thisProduct.count * nativePrice
        this.parentNode.parentNode.nextElementSibling.innerText = totalPrice+ ".00 $";
        thisProduct.price = totalPrice

        localStorage.setItem("basket", JSON.stringify(products));
        showTotalPrice();
    })
}


let minus = document.querySelectorAll("tr td .minus")

for (const item of minus) {

    item.addEventListener("click", function () {
        if (this.nextElementSibling.value > 1) {
            let thisProduct = products.find(m => m.id == this.parentNode.parentNode.parentNode.getAttribute("data-id"))
            let nativePrice = thisProduct.price / thisProduct.count
            thisProduct.count--
            this.nextElementSibling.value--;
            let totalPrice = thisProduct.count * nativePrice
            this.parentNode.parentNode.nextElementSibling.innerText = totalPrice+ ".00 $";
            thisProduct.price = totalPrice
    

            localStorage.setItem("basket", JSON.stringify(products));
            showTotalPrice();
        }
    })
}




