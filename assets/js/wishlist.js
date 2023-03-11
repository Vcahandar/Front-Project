"use strict"





let tableBody = document.querySelector("tbody")

let products = JSON.parse(localStorage.getItem("basket"))

if (products != null) {
    for (const product of products) {
        tableBody.innerHTML += `<tr>
        <td><div class="prdct-img">
        <img src="${product.img}" alt=""></td>
        <td>${product.name}</td>
        <td>Priceeee</td>
        <td>@mdo</td>

        </tr>`
    }

    // getBasketCount(products)


}
else{
    document.querySelector("table").classList.add("d-none")
    document.querySelector(".empty-contunie").classList.remove("d-none")
}

