// //  <div class="main-game">
// <img src ="img/game-logo.png" class= "main-game-logo">
// <h1 class ="main-game-title">Yukon 21</h1>
// <h1 class="main-game-descr">Spigo</h1>
// </div>   GAME TEMPLATE
class Request{
    constructor(parentElem,inputElem,button){
        this.parent = document.querySelector(parentElem);
        this.input = document.querySelector(inputElem);
        this.increaseButton = document.querySelector(button)
        this.nameArr = [];
        this.imageArr = [];
        this.count = 0;
        this.arrLength;
    }
    async sendReq(url){
        const res = await fetch(url);
        if(!res.ok){
            throw new Error("something went wrong");
        }
        let b = await res.json();
        for(let name in b){
            if(name == 'GameTemplates'){
                if(typeof(b[name]) == "object"){
                    this.arrLength = b[name].lenght
                    for(let name of b[name]){
                        this.nameArr.push(name);
                    }
                }
            }
        }
        console.log(this.nameArr)
    }
    async sendReqImg(url){
        const res = await fetch(url)
        if(!res.ok){
            throw new Error("Something went wrong");
        }
        let b = await res.json();
        for(let img in b){
            if(img == "GameTemplateImages "){
                for(let image in b[img]){
                    this.imageArr.push(image);
                }
            }
        }
    }

}

class PageInteraction extends Request{
    render(){
        this.count = 60;
        this.parent.innerHTML = ""
        for(let i = 0; i <= this.count; i++){
            this.parent.innerHTML += `
            <div class="main-game">
            <img src ="img/game-logo.png" class=${this.imageArr[i]}>
            <h1 class ="main-game-title">${this.nameArr[i]}</h1>
            <h1 class="main-game-descr">Spigo</h1>
            </div>`
        }
    }
    changeNum(){
        this.count += 60;
        this.render();
    }
    }

let b = new PageInteraction(".main-games-list",".main-games-search",".main-show-more");

b.sendReq("https://jsonplaceholder.typicode.com/todos/1")
b.sendReqImg("https://static.inpcdn.com/CdnUrl")

b.render()

b.button.addEventListener("click", () => {
    b.changeNum()
})
b.input.addEventListener("input",() => {
    let input = b.input.value.toLowerCase()
    b.nameArr = b.nameArr.filter(item => {
        if(item == input){
            return item
        }
    })
    b.render()
})
