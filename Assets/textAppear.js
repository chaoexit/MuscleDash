#pragma strict
 
var color : Color;
 
function Start(){
 
    color = Color.white;
}
 
function Update(){
 
    Fade();
}
 
function Fade(){
 
    while (guiText.material.color.a > 0){
       guiText.material.color.a -= 0.1 * Time.deltaTime * 0.05;
    yield;
    }
}