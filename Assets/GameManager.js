#pragma strict

//Constant here!
var expLimit : float[] = [10f, 100f, 300f, 1000f, 5000f, 150000f];
var maxLevel : int = expLimit.length;

var player : Transform;


var gauge : float;
var gaugeMax : float;
//Declare gauge bar here!
var hp : float;
//Declare hp bar here!

var kangGrang : float;
//Declare GUI.Label for kangGrang values!
var exp : float;
//Declare exp bar here!
var level : int;
//Declare GUI.Label for Level!

var playerStatus : String[] = ["alive", "dead"];
var gameStatus : String[] = ["defaultMode", "stopMode", "explodeMode", "freezeMode"];

var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;

function OnGUI() {
	GUI.DrawTexture(Rect(0, 0, 100, 10), progressBarEmpty);
	GUI.DrawTexture(Rect(0, 0, gauge/gaugeMax * 100, 10), progressBarFull);
}

function Start () {
	gauge = 10;
	gauge = 100;
	kangGrang = 0;
	level = 1;
}

function Update () {
	
}

function countDead() {
	//If any enemydead this method should be called!!
	//return dead monster;
	return 0;
}

function bonusKangGrang() {
	//Bonus point from level or some special items
	return 0;
}

function updateGauge() {
	gauge = countDead() + bonusKangGrang();
}

function updateHp(damage : float) {
	hp += damage;
}

function updateExp(receiveExp : float) {
	if (level >= maxLevel) {
		return;
	}
	
	if (receiveExp + exp >= expLimit[level]) {
		level++;
		exp = (receiveExp + exp) - expLimit[level - 1];
	} else {
		exp += receiveExp;
	}
}