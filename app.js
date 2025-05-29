const dish = document.querySelector(".dish");
const btn = document.querySelector(".btn");
const result = document.querySelector(".res");
const body = document.querySelector("body");

btn.addEventListener("click",()=>{
    let d = dish.value;
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${d}&number=5&apiKey=abd82cf4e2b048c5a93a7388821bbdfa`)
        .then((res) => res.json())
        .then((res) => {
            addResult(res.results);
        })
});

// const recipes = `https://api.spoonacular.com/recipes/${}/analyzedInstructions?query=coffee&number=5&apiKey=abd82cf4e2b048c5a93a7388821bbdfa`;

let addResult = function (re) {
    let i = 0;
        for (const r of re) {
            let newdiv = document.createElement('div');
            let img = document.createElement('img');
            let p = document.createElement('p');
            let info = document.createElement('button');
            img.src = r.image;
            p.innerHTML= `<b>${r.title}</b>`;
            info.innerHTML = "<b>GET RECIPES</b>";
            info.classList.add(i);
            info.classList.add("res");
            newdiv.appendChild(img);
            newdiv.appendChild(p);
            newdiv.appendChild(info);
            body.append(newdiv);
            info.addEventListener("click",()=>{
                fetch(`https://api.spoonacular.com/recipes/${r.id}/analyzedInstructions?query=coffee&number=5&apiKey=abd82cf4e2b048c5a93a7388821bbdfa`)
                    .then((res) => res.json())
                    .then((res2) => {
                        let heading = document.createElement("h3");
                        let list = document.createElement("ol");
                        heading.innerText = `Instructions`;
                        newdiv.appendChild(heading);
                        newdiv.appendChild(list);
                        for (const step of res2[0].steps) {
                            console.log(step);
                            let li = document.createElement("li");
                            li.innerText = step.step;
                            newdiv.appendChild(li);
                        }
                    })
            });
            ++i;
        }
}
