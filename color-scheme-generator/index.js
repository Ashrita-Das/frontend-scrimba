const seedColor = document.getElementById('seed-color')
const form = document.getElementById('form')
const schemes = document.getElementById('schemes')
const colorsPallete = document.getElementById('colors')

/* Copy to clipboard */
colorsPallete.addEventListener('click',(e)=>{
      
    navigator.clipboard.writeText(e.target.innerText);

})


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    let requestUrl = `
        https://www.thecolorapi.com/scheme?hex=${seedColor.value.slice(1)}&mode=${schemes.value}&count=5
    `
    
    fetch(requestUrl)
        .then(res => res.json())
        .then(data => {
            
            let colors = Array.from({length: 5}, (v, i) => data.colors[i].hex.value)
            
            colors.forEach((color, i) => {
                updateColor(color, i)
                updateColorHtml(color, i)
            })
        })
})


function updateColorHtml(color, item){
    document.querySelectorAll(`.color`)[item].innerHTML = `
        <div class="hex">${color}</div>
    `
}

function updateColor(color, item){
    document.querySelectorAll(`.color`)[item].style.background = color
}