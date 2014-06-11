#pragma strict

var animator : Animator;
var speed : float;
var isJump : boolean = false;
var isStarted : boolean;

static var px : float;
static var py : float;

var gyroInitialRotation : Quaternion;


var state : String;
var STATES : String[] = ["default", "delay", "explode", "freeze"];


function Start () {
	InitializeNeeded();
	InitializeGyro();
}

function InitializeNeeded() {
	animator = this.GetComponent(Animator);
	speed = 0.5f;
	isStarted = false;
	state = "default";
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
		if ( Mathf.Abs(Input.gyro.rotationRate.y) >= 7 ) {
			transform.position.x += speed * Mathf.Abs(offsetAttitude.y) + (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));			
		} else {
			transform.position.x += speed * Mathf.Abs(offsetAttitude.y); //+ (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
		}
	}
	
	if ( offsetAttitude.y > 0 && Input.gyro.rotationRate.y != 0) {
		if ( Mathf.Abs(Input.gyro.rotationRate.y) >= 7 ) {
			transform.position.x -= speed * Mathf.Abs(offsetAttitude.y) + (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
		} else {
			transform.position.x -= speed * Mathf.Abs(offsetAttitude.y); //+ (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
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

function checkAttack() {

}

function checkIsHit() {

}

function dead() {

}

function defaultMode() {
	walk();
}

function delayMode() {

}

function explodeMode() {

}

function freezeMode() {

}

function Update () {
	if( !isStarted ) {
		return;
	}
	
	if (state == "default") {
		defaultMode();
	}
	
	if ( transform.position.x > 18 ) {
		transform.position.x = 17;
	}
	if ( transform.position.x < -18 ) {
		transform.position.x = -17;
	} 
	
	px = transform.position.x;
	py = transform.position.y;
}

function OnCollisionEnter2D( colInfo : Collision2D ) {
	if( colInfo.gameObject.tag == "Ground" ) {
		isJump = false;
		Debug.Log("jump false");
	}
}