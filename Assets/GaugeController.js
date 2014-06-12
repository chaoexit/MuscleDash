// healthBar.js by http://www.Gameobject.net
#pragma strict
var energyBar : GUIStyle ;
 
var bgImage : Texture2D; // background image that is 256 x 32
var fgImage : Texture2D; // foreground image that is 256 x 32
static var playerEnergy = 0.0; // a float between 0.0 and 1.0
 
function Start() {
}
 
function Update() {
	//Debug.Log(playerEnergy);
}
 
function OnGUI () {
// Create one Group to contain both images , the first two numbers define the on screen placement
GUI.BeginGroup (Rect (275,10,128,16));
 
// Draw the background image
GUI.Box (Rect (0,0,128,16), bgImage, energyBar);
 
// Create a second Group which will be clipped
// We want to clip the image and not scale it, which is why we need the second Group
GUI.BeginGroup (Rect (0,0,playerEnergy * 128, 16));
 
// Draw the foreground image
GUI.Box (Rect (0,0,128,16), fgImage, energyBar);
 
// End both Groups
GUI.EndGroup ();
GUI.EndGroup ();
}