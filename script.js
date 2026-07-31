const viewer = document.getElementById("viewer");
const overlay = document.getElementById("overlay");
const divider = document.getElementById("divider");
const handle = document.getElementById("handle");
const markers = document.getElementById("markers");
const panel = document.getElementById("content");

let dragging = false;
let percent = 0;

// ---------------------
// установка положения
// ---------------------

function setSlider(p){

    percent = Math.max(0,Math.min(100,p));

    overlay.style.clipPath =
        `inset(0 ${100-percent}% 0 0)`;

    divider.style.left = percent+"%";

    handle.style.left = percent+"%";

    updateMarkers();

}


// ---------------------
// перевод координаты
// ---------------------

function clientToPercent(clientX){

    const r = viewer.getBoundingClientRect();

    return ((clientX-r.left)/r.width)*100;

}



// ---------------------
// мышь
// ---------------------

handle.addEventListener("mousedown",(e)=>{

    dragging=true;

    e.preventDefault();

});

window.addEventListener("mouseup",()=>{

    dragging=false;

});

window.addEventListener("mousemove",(e)=>{

    if(!dragging) return;

    setSlider(
        clientToPercent(e.clientX)
    );

});



// ---------------------
// touch
// ---------------------

handle.addEventListener("touchstart",(e)=>{

    dragging=true;

    e.preventDefault();

},{passive:false});

window.addEventListener("touchend",()=>{

    dragging=false;

});

window.addEventListener("touchmove",(e)=>{

    if(!dragging) return;

    setSlider(

        clientToPercent(

            e.touches[0].clientX

        )

    );

},{passive:false});



// ---------------------
// подсветки
// ---------------------

function updateMarkers(){

    markers.innerHTML="";

    fields.forEach(field=>{

        if(percent>=field.showAt){

            const m=document.createElement("div");

            m.className="marker";

            m.style.left=field.x+"%";

            m.style.top=field.y+"%";

            m.style.width=field.w+"%";

            m.style.height=field.h+"%";

            m.onclick=(e)=>{

                e.stopPropagation();

                panel.innerHTML=
                    "<h3>"+field.title+"</h3><p>"+field.description+"</p>";

            };

            markers.appendChild(m);

        }

    });

}



// ---------------------
// старт
// ---------------------

window.onload=()=>{

    setSlider(0);

};
