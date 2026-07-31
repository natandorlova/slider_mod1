const documentBox = document.getElementById("document");
const completedLayer = document.getElementById("completedLayer");
const sliderHandle = document.getElementById("sliderHandle");
const markersBox = document.getElementById("markers");
const infoPanel = document.getElementById("infoPanel");
const infoContent = document.getElementById("infoContent");


let dragging = false;

let progress = 0;


// какие карточки пользователь закрыл вручную
let closedCards = [];


// ----------------------------
// создаём зоны подсветки
// ----------------------------

function createMarkers(){

    fields.forEach(field=>{


        const marker = document.createElement("div");

        marker.className = "marker";

        marker.id = "marker-" + field.id;


        marker.style.left = field.x + "%";
        marker.style.top = field.y + "%";

        marker.style.width = field.w + "%";
        marker.style.height = field.h + "%";



        marker.onclick = function(e){

            e.stopPropagation();

            showCard(field);

        };


        markersBox.appendChild(marker);


    });

}



// ----------------------------
// движение слайдера
// ----------------------------

function setProgress(value){


    progress = Math.max(
        0,
        Math.min(100,value)
    );



    // открываем заполненный слой сверху вниз

    completedLayer.style.clipPath =
    `inset(0 0 ${100-progress}% 0)`;



    // двигаем ручку

    sliderHandle.style.top =
    progress + "%";



    updateFields();

}




function getProgress(y){


    const rect =
    documentBox.getBoundingClientRect();


    return (
        (y - rect.top)
        /
        rect.height
        *
        100
    );

}



// ----------------------------
// мышь
// ----------------------------

sliderHandle.addEventListener(
"mousedown",
function(e){

    dragging=true;

    e.preventDefault();

});


window.addEventListener(
"mousemove",
function(e){

    if(!dragging) return;


    setProgress(
        getProgress(e.clientY)
    );

});


window.addEventListener(
"mouseup",
function(){

    dragging=false;

});




// ----------------------------
// телефон
// ----------------------------

sliderHandle.addEventListener(
"touchstart",
function(e){

    dragging=true;

    e.preventDefault();

},
{passive:false}

);



window.addEventListener(
"touchmove",
function(e){

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
function(){

    dragging=false;

});




// ----------------------------
// проверяем поля
// ----------------------------

function updateFields(){


    fields.forEach(field=>{


        const marker =
        document.getElementById(
            "marker-" + field.id
        );



        if(progress >= field.showAt){


            marker.classList.add("active");



            // автоматическое окно,
            // если пользователь его еще не закрывал

            if(!closedCards.includes(field.id)){


                showCard(field);


            }


        }

        else{


            marker.classList.remove("active");


            removeCard(field.id);


            // если вернулись назад,
            // разрешаем появиться снова

            closedCards =
            closedCards.filter(
                id=>id!==field.id
            );


        }


    });


}





// ----------------------------
// карточки
// ----------------------------

function showCard(field){


    if(
        document.getElementById(
            "card-" + field.id
        )
    ){
        return;
    }



    const card =
    document.createElement("div");


    card.className="info-card";

    card.id="card-" + field.id;



    card.innerHTML = `

        <h3>${field.title}</h3>

        <p>${field.description}</p>

        <button class="close-button">
            Закрыть
        </button>

    `;



    card.querySelector("button")
    .onclick=function(){

        closedCards.push(field.id);

        removeCard(field.id);

    };



    infoContent.appendChild(card);


}





function removeCard(id){


    const card =
    document.getElementById(
        "card-" + id
    );


    if(card){

        card.remove();

    }

}



// ----------------------------
// запуск
// ----------------------------

window.onload=function(){

    createMarkers();

    setProgress(0);

};
