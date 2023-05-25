import { menuArray } from "./data.js"

const option = document.getElementById("categories")
const sortBy = document.getElementById("sort-by")
const paymentForm = document.getElementById("payment-form")
const paymentMessage = document.getElementById("payment-message")

let order = {}
let totalPrice = 0

render()

option.addEventListener("change", render)
sortBy.addEventListener("change", render)
paymentForm.addEventListener("submit", e => handleSubmit(e))

document.addEventListener("click", function(e){

    if(e.target.dataset.add){
        paymentMessage.classList.add("hidden")
        const dish = menuArray.filter((dish) => dish.id === e.target.dataset.add)[0]
        if(order[dish.id]){
            order[dish.id].quantity += 1
        }else {
            order[dish.id] = {id:dish.id, name:dish.name, price:dish.price, quantity:1}
        }
        totalPrice += dish.price
        orderSummary()
    }

    else if(e.target.dataset.remove){
        const dish = menuArray.filter((dish) => dish.id === e.target.dataset.remove)[0]
        const dishId = dish.id
        if (order[dishId].quantity > 1) {
            order[dishId].quantity--
            totalPrice -= order[dishId].price
        }else {
            totalPrice -= order[dishId].price
            delete order[dishId]
        }
        orderSummary()
        
    }else if(e.target.id === "complete-order-btn"){
        document.getElementById("purchase-modal").classList.remove("hidden")

    }else if(e.target.id === "cancel-btn"){
        document.getElementById("purchase-modal").classList.add("hidden")}
})

function handleSubmit(event){
    event.preventDefault()
    const paymentData = new FormData(paymentForm)
    const userName = paymentData.get("user-name")
    paymentMessage.classList.remove("hidden")
    paymentMessage.textContent = `Thanks ${userName}! Your order is on its way!`
    document.getElementById("purchase-modal").classList.add("hidden")
    order = {}
    totalPrice = 0
    orderSummary()
}

function chooseCategory(list){
    let newList
    if (option.value === "all"){
        newList = list
    }else if (option.value === "main") {
        newList = list.filter(element => element.category === "main")
    }else if (option.value === "desert") {
        newList = list.filter(element => element.category === "desert")
    }else if (option.value === "beverage") {
        newList = list.filter(element => element.category === "beverage")
    }
    return newList
}

function sort(list) {
    let newList = [...list]
    if (sortBy.value === "descending") {
        newList.sort((a,b) => (a.price < b.price) ? 1 : -1)
    } else if (sortBy.value === "increasing") {
        newList.sort((a,b) => (a.price > b.price) ? 1 : -1)
    }
    return newList
}

function orderSummary() {
    document.getElementById("order").style.display = (Object.keys(order).length === 0) ? "none" :"block"
    let orderHtml = ''
    for (let key in order){
        orderHtml += `
        <div class="dish" id="dish">
        <div class="dish-name" id="dish-name">
        <h3>${order[key].name} x ${order[key].quantity}</h3>
                <p data-remove=${order[key].id}>remove</p>
            </div>
            <h3>$${order[key].price*order[key].quantity}</h3>
            </div>
    `
    }
    document.getElementById("order-list").innerHTML = orderHtml
    document.getElementById("total-price").textContent = `$${totalPrice}`
}
        
function render() {
    let menu = ''
    let newList = chooseCategory(menuArray)
    let sortedList = sort(newList)

    sortedList.forEach(function(dish){
        menu += `
            <div class="card">
                <h2 class="dish-emoji">${dish.image}</h2> 
                <div class="details">
                    <h2 class="dish-name">${dish.name}</h2>
                    <p class="dish-ingredients">${dish.ingredients}</p>
                    <p class="dish-price">$${dish.price}</p>
                </div>
                <button class="add-btn" data-add=${dish.id}> + </button>
            </div>
        `
    })

    document.getElementById("menu-list").innerHTML = menu
}