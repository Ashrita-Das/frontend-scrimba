// Remember to import the data and Dog class!
import dogs from "./data.js";
import Dog from "./Dog.js";

const arrayOfDogs = []
let currentDog = {}
let index = 0

for (let i = 0; i < dogs.length; i++) {
    arrayOfDogs.push(new Dog(dogs[i]))
}

currentDog = arrayOfDogs[index]

currentDog.displayDog()

const likeBtn = document.getElementById("yes-btn")
const crossBtn = document.getElementById("cross-btn")

let isClickable = true

likeBtn.addEventListener("click", () => {
    if (isClickable) {
        isClickable = false
        currentDog.getLiked()
        index === arrayOfDogs.length - 1 ? index = 0 : index++
        currentDog = arrayOfDogs[index]
        setTimeout(() => {
            currentDog.displayDog()
            isClickable = true
        }, 1000) 
    }
})

crossBtn.addEventListener("click", () => {
    if (isClickable) {
        isClickable = false
        currentDog.getNoped()
        index === arrayOfDogs.length - 1 ? index = 0 : index++
        currentDog = arrayOfDogs[index]
        setTimeout(() => {
            currentDog.displayDog()
            isClickable = true
        }, 1000)
    }
})