let menuBars = document.querySelector(".menu");
let nav = document.querySelector("nav");
let input = document.getElementById("input");
let shortenBtn = document.querySelector("#shorten-btn");
let div = "";
let link;
let pattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
let label = document.querySelector("#lab")

input.onkeyup = function(e){
if(e.key == "Enter"){
  shortenBtn.click()
}
}

shortenBtn.onclick = function (){
  let url = input.value
  if(url.match(pattern)){

    fetch(`https://api.shrtco.de/v2/shorten?url=${url}`).then((request)=>{
      let myData = request.json()
      return myData;
    }).then((data)=>{
        link = data.result.full_short_link
        showData(data.result.full_short_link);
    })

    label.style.display = "none"
    input.classList.remove("error")
  } else {
    label.style.display = "block"
    input.classList.add("error")
  }

}

function showData(shortenLink){

  div=`<div class="box">
  <p class="entered">${input.value}</p>
  <div class="done">
    <a href="${shortenLink}">${shortenLink}</a>
    <button data-text="${shortenLink}" onclick="copy(this)">Copy</button>
  </div>
</div>`+div
let divCont = document.querySelector(".shortened")
  divCont.innerHTML = div;
  input.value ="";

}



function copy(e) {
  console.log(e.dataset.text)
  navigator.clipboard.writeText(e.dataset.text)
  e.style.background = "hsl(257, 27%, 26%)"
  e.innerHTML = "Copied!"
  setTimeout(() => {
  e.style.background = "hsl(180, 66%, 49%)"
  e.innerHTML = "Copy"
  }, 750);
}

menuBars.addEventListener("click",()=>{
nav.classList.toggle("appear")
})

