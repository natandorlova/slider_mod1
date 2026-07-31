const viewer = document.getElementById("viewer");
const overlay = document.getElementById("overlay");
const handle = document.getElementById("handle");
const markers = document.getElementById("markers");

const content = document.getElementById("content");

let dragging = false;

let progress = 0;

let activeCard = null;


// --------------------------
// создаем все подсветки сразу
// --------------------------

function createMarkers(){

    fields.forEach(field=>{

        const marker = document.createElement("div");

        marker.className = "marker";

        marker.id = "marker-" + field.id;


        marker.style.left = field.x + "%";
        marker.style.top = field.y + "%";
        marker.style.width = field.w + "%";
        marker.style.height = field.h + "%";


        marker.addEventListener("click", function(e){

            e.stopPropagation();

            showCard(field);

        });


        markers.appendChild(marker);

    });

}



// --------------------------
// движение ползунка
// --------------------------

function setProgress(value){


    progress = Math.max(0,Math.min(100,value));


    // открываем заполненный документ снизу вверх

    overlay.style.clipPath =
        `inset(${100-progress}% 0 0 0)`;


    // положение ручки

    handle.style.bottom =
        progress + "%";



    updateFields();

}




function getProgress(clientY){

    const rect =
        viewer.getBoundingClientRect();


    let value =
        ((rect.bottom - clientY) / rect.height) * 100;


    return value;

}




// --------------------------
// мышь
// --------------------------

handle.addEventListener(
"mousedown",
(e)=>{

    dragging=true;

    e.preventDefault();

});



window.addEventListener(
"mousemove",
(e)=>{

    if(!dragging) return;


    setProgress(
        getProgress(e.clientY)
    );

});



window.addEventListener(
"mouseup",
()=>{

    dragging=false;

});





// --------------------------
// телефон
// --------------------------

handle.addEventListener(
"touchstart",
(e)=>{

    dragging=true;

    e.preventDefault();

},
{passive:false}

);



window.addEventListener(
"touchmove",
(e)=>{

    if(!dragging) return;


    setProgress(
        getProgress(
            e.touches[0].clientY
        )
    );


},
{passive:false}

);



window.addEventListener(
"touchend",
()=>{

    dragging=false;

});




// --------------------------
// поля
// --------------------------

function updateFields(){


    fields.forEach(field=>{


        const marker =
            document.getElementById(
                "marker-" + field.id
            );


        if(progress >= field.showAt){


            marker.classList.add("visible");


            // автоматическое открытие

            if(activeCard !== field.id){

                showCard(field);

            }


        }
        else{


            marker.classList.remove("visible");


            if(activeCard === field.id){

                closeCard();

            }


        }


    });

}





// --------------------------
// карточка
// --------------------------

function showCard(field){


    activeCard = field.id;


    content.innerHTML = `

        <h3>${field.title}</h3>

        <p>${field.description}</p>

        <button id="closeBtn">
            Закрыть
        </button>

    `;


    document
    .getElementById("closeBtn")
    .onclick = function(e){

        e.stopPropagation();

        closeCard();

    };

}



function closeCard(){

    activeCard=null;


    content.innerHTML =
    "Продолжайте двигать ползунок, чтобы изучать документ.";

}





// --------------------------
// запуск
// --------------------------

window.onload=function(){

    createMarkers();

    setProgress(0);

};
