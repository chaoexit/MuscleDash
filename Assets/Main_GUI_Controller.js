#pragma strict

var FontGUI : GUISkin;
function Start () {

}

function Update () {
	if ( Input.touchCount >= 1 )
    {
    	Application.LoadLevel("Stage1");
    }
}
function OnGUI(){
	
	//GUI.Label (new Rect(Screen.width/2-50,Screen.height/2+80,1000,1000),"Start to");


//	if(GUI.Button(new Rect(Screen.width/2-50,Screen.height/2-50,100,100),"Start to")){
//		Application.LoadLevel("Stage1");
//		}
}
