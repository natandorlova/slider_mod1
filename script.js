const viewer = document.getElementById("viewer");

const reveal = document.getElementById("reveal");

const handle = document.getElementById("handle");

const divider = document.getElementById("divider");

const markersLayer = document.getElementById("markers");

const card = document.getElementById("infoCard");

const closeCard = document.getElementById("closeCard");


let isDragging = false;

let currentPosition = 50;



function setPosition(x){


    const rect = viewer.getBoundingClientRect();


    let position = x - rect.left;


    if(position < 0){
        position = 0;
    }


    if(position > rect.width){
        position = rect.width;
    }


    currentPosition = (position / rect.width) * 100;


    // открываем заполненный слой

    reveal.style.clipPath =
        `inset(0 ${100-currentPosition}% 0 0)`;


    // двигаем линию

    divider.style.left =
        currentPosition + "%";


    // двигаем ручку

    handle.style.left =
        currentPosition + "%";


    checkMarkers();

}




// начало движения

handle.addEventListener(
"mousedown",
()=>{

    isDragging = true;

});


handle.addEventListener(
"touchstart",
(e)=>{

    isDragging = true;

    e.preventDefault();

},
{passive:false}

);




// движение мыши

window.addEventListener(
"mousemove",
(e)=>{

    if(!isDragging) return;

    setPosition(e.clientX);

});




// движение пальца

window.addEventListener(
"touchmove",
(e)=>{

    if(!isDragging) return;


    setPosition(
        e.touches[0].clientX
    );


},
{passive:false}

);




// конец движения

window.addEventListener(
"mouseup",
()=>{

    isDragging=false;

});


window.addEventListener(
"touchend",
()=>{

    isDragging=false;

});





// ------------------------------
// МАРКЕРЫ
// ------------------------------


function checkMarkers(){


    fields.forEach(field=>{


        const existing =
        document.getElementById(
            "marker-"+field.id
        );


        if(currentPosition >= field.showAt){


            if(!existing){

                createMarker(field);

            }


        }else{


            if(existing){

                existing.remove();

            }


        }


    });


}




function createMarker(field){


    const marker =
    document.createElement("div");


    marker.className="marker";


    marker.id =
    "marker-"+field.id;



    marker.style.left =
    field.x+"%";


    marker.style.top =
    field.y+"%";


    marker.style.width =
    field.w+"%";


    marker.style.height =
    field.h+"%";



    marker.addEventListener(
    "click",
    (event)=>{

        // важно:
        // клик не передает управление слайдеру

        event.stopPropagation();


        showCard(field);

    });



    markersLayer.appendChild(marker);


}




function showCard(field){


    card.style.display="block";


    card.querySelector("h2").textContent =
    field.title;


    card.querySelector("p").textContent =
    field.description;


}




closeCard.addEventListener(
"click",
()=>{

    card.style.display="none";

});





// стартовое положение

setPosition(
viewer.getBoundingClientRect().left +
viewer.getBoundingClientRect().width/2
);
