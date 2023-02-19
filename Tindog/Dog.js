// Create the Dog class here
class Dog {
    constructor(dog) {
        this.name = dog.name
        this.avatar = dog.avatar
        this.age = dog.age
        this.bio = dog.bio
        this.hasBeenSwiped = dog.hasBeenSwiped
        this.hasBeenLiked = dog.hasBeenLiked 
    }

    displayDog() {
        document.getElementById("dog").innerHTML =
            `<div class="dog-card">
              <img src="${this.avatar}"/>
                <h3 class="dog-details">${this.name}, ${this.age}</h3>
                <p class="dog-bio">${this.bio}</p>
            
                <div id="dog-badge" class="hidden">
                </div>
            </div>`
    }
    
    getLiked() {
        const dogBadge = document.getElementById("dog-badge")
        dogBadge.innerHTML =
            `<img src="/images/badge-like.png"/>`
        dogBadge.classList.remove("hidden")
        this.hasBeenLiked = true
        this.hasBeenSwiped = true
    }

    getNoped() {
        const dogBadge = document.getElementById("dog-badge")
        dogBadge.innerHTML =
            `<img src="/images/badge-nope.png"/>`
        dogBadge.classList.remove("hidden")
        this.hasBeenSwiped = true
    } 
}

export default Dog