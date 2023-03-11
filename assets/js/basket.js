"use strict"





let tableBody = document.querySelector("tbody")

let products = JSON.parse(localStorage.getItem("basket"))


getBasketDatas();



function getBasketDatas() {
    if (products != null) {
        for (const product of products) {
            tableBody.innerHTML += `<tr data-id = "${product.id}">
            <td class="td-img">
            <div class="prdct-img">
            <img src="${product.img}" alt=""></td>
            <td class="td-name">${product.name}</td>
            <td class="td-price">${product.price} $</td>
            <td class="td-count">
            <div class="number">
            <span class="minus">-</span>
            <input type="text" value="${product.count}" disabled/>
            <span class="plus">+</span>
        </div></td>
            <td class="td-total">${product.price * product.count} $</td>
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

    })
});




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
        this.previousElementSibling.value++;
        let thisProduct = products.find(m => m.id == this.parentNode.parentNode.parentNode.getAttribute("data-id"))
        thisProduct.count = parseInt(this.previousElementSibling.value)

        localStorage.setItem("basket", JSON.stringify(products));

        this.parentNode.parentNode.nextElementSibling.innerText = thisProduct.count * thisProduct.price;
    })
}


let minus = document.querySelectorAll("tr td .minus")

for (const item of minus) {

    item.addEventListener("click", function () {
        if (this.nextElementSibling.value > 1) {
            this.nextElementSibling.value--;

            let thisProduct = products.find(m => m.id == this.parentNode.parentNode.parentNode.getAttribute("data-id"))
            thisProduct.count = parseInt(this.nextElementSibling.value)

            localStorage.setItem("basket", JSON.stringify(products));

            this.parentNode.parentNode.nextElementSibling.innerText = thisProduct.count * thisProduct.price;
        }
    })
}




