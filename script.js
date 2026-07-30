const viewer = document.getElementById("viewer");
const reveal = document.getElementById("reveal");
const handle = document.getElementById("handle");
const divider = document.getElementById("divider");
const markersLayer = document.getElementById("markers");

const card = document.getElementById("infoCard");
const closeCard = document.getElementById("closeCard");


let dragging = false;
let currentPosition = 0;



// --------------------------
// движение слайдера
// --------------------------

function moveSlider(clientX) {

    const rect = viewer.getBoundingClientRect();

    let x = clientX - rect.left;


    if (x < 0) x = 0;

    if (x > rect.width) x = rect.width;


    currentPosition = (x / rect.width) * 100;


    // открываем заполненный документ

    reveal.style.clipPath =
        `inset(0 ${100 - currentPosition}% 0 0)`;


    // линия

    divider.style.left =
        currentPosition + "%";


    // ручка

    handle.style.left =
        currentPosition + "%";


    updateMarkers();

}



// --------------------------
// старт движения
// --------------------------

handle.addEventListener(
"mousedown",
function(e){

    dragging = true;

    e.preventDefault();

});


handle.addEventListener(
"touchstart",
function(e){

    dragging = true;

    e.preventDefault();

},
{passive:false}
);




// --------------------------
// движение мышью
// --------------------------

window.addEventListener(
"mousemove",
function(e){

    if(!dragging) return;

    moveSlider(e.clientX);

});




// --------------------------
// движение пальцем
// --------------------------

window.addEventListener(
"touchmove",
function(e){

    if(!dragging) return;

    moveSlider(
        e.touches[0].clientX
    );

},
{passive:false}
);




// --------------------------
// отпускание
// --------------------------

window.addEventListener(
"mouseup",
function(){

    dragging=false;

});


window.addEventListener(
"touchend",
function(){

    dragging=false;

});





// --------------------------
// подсветки
// --------------------------

function updateMarkers(){

    fields.forEach(field=>{


        let marker =
        document.getElementById(
            "marker-" + field.id
        );


        if(currentPosition >= field.showAt){


            if(!marker){

                createMarker(field);

            }


        }
        else{


            if(marker){

                marker.remove();

            }


        }


    });

}




function createMarker(field){


    const marker =
    document.createElement("div");


    marker.className="marker";


    marker.id =
    "marker-" + field.id;



    marker.style.left =
    field.x + "%";


    marker.style.top =
    field.y + "%";


    marker.style.width =
    field.w + "%";


    marker.style.height =
    field.h + "%";



    marker.addEventListener(
    "click",
    function(e){

        // чтобы клик не двигал слайдер

        e.stopPropagation();


        showCard(field);

    });



    markersLayer.appendChild(marker);

}





// --------------------------
// карточка
// --------------------------

function showCard(field){


    card.style.display="block";


    card.querySelector("h2").textContent =
    field.title;


    card.querySelector("p").textContent =
    field.description;


}



closeCard.addEventListener(
"click",
function(){

    card.style.display="none";

});




// --------------------------
// старт
// --------------------------

window.addEventListener(
"load",
function(){


    currentPosition = 0;


    reveal.style.clipPath =
        "inset(0 100% 0 0)";


    divider.style.left = "0%";


    handle.style.left = "0%";


    updateMarkers();


});
