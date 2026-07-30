const invoice=document.querySelector("#invoice");

const filled=document.querySelector(".filled");

const slider=document.querySelector(".slider");

const markers=document.querySelector("#markers");

const popup=document.querySelector("#popup");


let dragging=false;



function moveSlider(x){

let rect=invoice.getBoundingClientRect();

let pos=x-rect.left;


if(pos<0) pos=0;

if(pos>rect.width) pos=rect.width;


let percent=(pos/rect.width)*100;


filled.style.width=percent+"%";

slider.style.left=pos+"px";


checkFields(percent);

}



function checkFields(percent){


fields.forEach((field,index)=>{


let trigger=(index+1)*(100/fields.length);


if(percent>trigger){

createMarker(field);

}


});


}



function createMarker(field){


if(document.getElementById("m"+field.id))
return;


let m=document.createElement("div");


m.className="marker";

m.id="m"+field.id;


m.style.left=field.x+"px";

m.style.top=field.y+"px";

m.style.width=field.w+"px";

m.style.height=field.h+"px";


m.onclick=()=>{

popup.style.display="block";

popup.querySelector("h3").innerHTML=field.title;

popup.querySelector(".main-text").innerHTML=field.text;

popup.querySelector(".mistake span").innerHTML=
field.mistake;

};


markers.appendChild(m);

}



invoice.addEventListener("mousedown",()=>dragging=true);


window.addEventListener("mouseup",()=>dragging=false);


window.addEventListener("mousemove",(e)=>{

if(dragging)
moveSlider(e.clientX);

});


invoice.addEventListener("click",(e)=>{

moveSlider(e.clientX);

});
