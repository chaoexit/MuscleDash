#pragma strict
import System.Math;

var shakeTime = 10;


var animator : Animator;
var speed : float;
var isJump : boolean = false;
var isStarted : boolean;
static var lvl : int = 1;
var Bomb : GameObject;
var isInState = false;

var scx : float = 0;
var scy : float = 0;
var scz : float = 0;
var multix : float =0;
var multiy : float = 0;
var multiz : float =0;	

static var px : float;
static var py : float;

static var damageX : float;

var gyroInitialRotation : Quaternion;

static var state : String;
var STATES : String[] = ["default", "delay", "explode", "isExploding", "freeze"];

var timer : float;
var isCalculating : boolean;
var isExploding : boolean;
var isExploded : boolean;
var readyToExplode = false;

static var score : float = 0;


var style : GUISkin;
static var announcement : String = "";

//=========================================================================================

var hpbar : GameObject;
var player : GameObject;
static var hp : float =1f;
var hpy : float ;
var hpz : float ;

//=========================================================================================


function Start () {
	Input.gyro.enabled = true;
	InitializeNeeded();
	InitializeGyro();
	damageX = 0;
	hp = 1f;
	hpy =1f;
	hpz = 1f;
	timer = shakeTime;
	state = "default";
	isCalculating = false;
	isExploding = false;
	
	this.renderer.sortingOrder = 2;
}

function InitializeNeeded() {
	animator = this.GetComponent(Animator);
	speed = 0.5f;
	isStarted = false;
	state = "default";
	announcement = "";
}

function InitializeGyro() {
	Input.gyro.enabled = true;
	gyroInitialRotation = Input.gyro.attitude;
	yield WaitForSeconds(2);
	isStarted = true;
}

function walk() {
	Input.gyro.enabled = true;
	
	var instanceAttitude : Quaternion = Input.gyro.attitude;
	//var offsetAttitude : Quaternion = Quaternion.Inverse(instanceAttitude) * gyroInitialRotation;
	var offsetAttitude : Quaternion = new Quaternion(instanceAttitude.x - gyroInitialRotation.x, instanceAttitude.y - gyroInitialRotation.y, instanceAttitude.z - gyroInitialRotation.z, instanceAttitude.w - gyroInitialRotation.w);
	
	if ( offsetAttitude.y < 0  && Input.gyro.rotationRate.y != 0) {
		this.transform.localScale.x = -1;
		if ( Mathf.Abs(Input.gyro.rotationRate.y) >= 9 ) {
			transform.position.x += speed * Mathf.Abs(offsetAttitude.y) + (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
			damageX = speed * Mathf.Abs(offsetAttitude.y) + (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));		
		} else {
			transform.position.x += speed * Mathf.Abs(offsetAttitude.y); //+ (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
			damageX = speed * Mathf.Abs(offsetAttitude.y);
		}
	}
	
	if ( offsetAttitude.y > 0 && Input.gyro.rotationRate.y != 0) {
		this.transform.localScale.x = 1;
		if ( Mathf.Abs(Input.gyro.rotationRate.y) >= 9 ) {
			transform.position.x -= speed * Mathf.Abs(offsetAttitude.y) + (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
			damageX = speed * Mathf.Abs(offsetAttitude.y) + (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
		} else {
			transform.position.x -= speed * Mathf.Abs(offsetAttitude.y); //+ (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
			damageX = speed * Mathf.Abs(offsetAttitude.y);
		}
	}
	
//	if ( offsetAttitude.x > -0.1 && Input.gyro.rotationRate.x != 0) {
//		if ( !isJump ) {
//			rigidbody2D.velocity.y += 7f;
//			isJump = true;
//		}
//	} 
//	else {
//		if(rigidbody2D.velocity.x > 0 )
//			rigidbody2D.velocity.x -=speed;
//		else if(rigidbody2D.velocity.x <0 )
//			rigidbody2D.velocity.x +=speed;
//	}
}

function checkDead() {
	if(hp <= 0) {
 		Application.LoadLevel("MainMenu");
 	}
 	hpbar.transform.localScale = Vector3(hp, hpy, hpz);

}

function defaultMode() {
	walk();
}

function delayMode() {
	isInState = true;
	resetVelocity();
			
	setGUI("Ready to Shake!");
	yield WaitForSeconds(2);
	
	setGUI("3");
	yield WaitForSeconds(1);
	setGUI("2");
	yield WaitForSeconds(1);
	setGUI("1");
	yield WaitForSeconds(1);
	setGUI("Start!");
	
	state = "shake";
	isCalculating = true;
}

function setGUI( s : String ) {
	announcement = s;
}

function explodeMode() {
	isInState = false;
	readyToExplode = true;
	//Calculate Damage
	isExploded = false;
	state = "explode";
}

function calculateDamage() {

	Input.gyro.enabled = true;

  		if(scx>scy && scx>scz) {
			multix = 0.8f;
			if(scy>scz) {
				multiy =  1f;
				multiz = 1.2f; 
			} else if(scy<scz) {
				multiy = 1.2f;
				multiz = 1f;
			}			
		} else if(scy>scx && scy>scz) {
			multiy = 0.8f;
			if(scx>scz)	{
				multix =  1f;
				multiz = 1.2f; 
			} else if(scx<scz) {
				multix = 1.2f;
				multiz = 1f;
			}
		} else if(scz>scx && scz>scy) {
			multiz = 0.8f;
			if(scx>scy) {
				multix =  1f;
				multiy = 1.2f; 
			} else if(scx<scy) {
				multix = 1.2f;
				multiy = 1f;
			}		
		}
	
	
	scx += (Abs(Input.gyro.rotationRate.x)/20);
	scy += (Abs(Input.gyro.rotationRate.y)/20);
	scz += (Abs(Input.gyro.rotationRate.z)/20);
	
	score += scx*multix+scy*multiy+scz*multiz;
	
	announcement = "score: " + score;

}

function explode() {
	//state = "isExploding";
	readyToExplode = false;
	isExploding = true;
	//Audio
	yield WaitForSeconds(2);
	this.transform.localScale.x = 5;
	this.transform.localScale.y = 5;
	this.transform.localScale.z = 5;
	this.Bomb.renderer.sortingOrder = 0;
	yield WaitForSeconds(3);
	
	announcement = "";
	this.transform.localScale.x = 1;
	this.transform.localScale.y = 1;
	this.transform.localScale.z = 1;
	this.Bomb.renderer.sortingOrder = -2;
	isCalculating = false;
	
	isExploding = false;
	isExploded = true;
}

function freezeMode() {

}

function resetVelocity() {
	rigidbody2D.velocity.x = 0;
	rigidbody2D.velocity.y = 0;
}

function Skills( tempInt : int ) {
	state = "delay";
}

function resetScore() {
	var scx : float = 0;
	var scy : float = 0;
	var scz : float = 0;
	var multix : float =0;
	var multiy : float = 0;
	var multiz : float =0;
	
	score = 0;
}

function Update () {
	if( !isStarted ) {
		return;
	}
		
	if (state == "default") {
		defaultMode();
	} else if (state == "delay" && !isInState) {
		GaugeController.playerEnergy = 0;
		delayMode();
	} else if (state == "shake") {
		timer -= Time.deltaTime;
  		if (timer > 0) {
			calculateDamage();
		} else {
			explodeMode();
		}
  	} else if (state == "explode") {
  		if (readyToExplode) {
			explode();
		} else if (isExploded) {
		  	resetScore();
			state = "default";
    		timer = shakeTime;
    	}
    }
    
	if ( transform.position.x > 18 ) {
		transform.position.x = 17;
	}
	if ( transform.position.x < -18 ) {
		transform.position.x = -17;
	} 
	
	px = transform.position.x;
	py = transform.position.y;
	
	//===============================
	
	checkDead();
}

function OnCollisionEnter2D( colInfo : Collision2D ) {
	if( colInfo.gameObject.tag == "Ground" ) {
		//Debug.Log("jump false");
	}
	
	if(colInfo.gameObject.tag == "Enemy"){
		
		colInfo.gameObject.SendMessage("ApplyDamage", ((damageX) * (lvl)));
		player.rigidbody2D.velocity.x *=-0.5;
	}
}

function OnTriggerEnter2D(col : Collider2D) {
	if(col.gameObject.tag =="Enemy"){
		//Debug.Log("Hit!");
		col.gameObject.SendMessage("ApplyDamage", (damageX));
		player.rigidbody2D.velocity.x *=-0.5;
	}
}

function ApplyDamage(damage : float) {
	//Debug.Log("Test");
	hp -= damage;
}

function OnGUI() {
	GUI.skin = style;
	//GUI.Label (new Rect(Screen.width/2-50,Screen.height/2,1000,1000), announcement);
	GUI.Label (new Rect(-75, 75,1000,1000), announcement);
}