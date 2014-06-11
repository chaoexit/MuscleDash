#pragma strict

var animator : Animator;
var speed : float;
var max : float;
var isJump : boolean = false;
var px : float;
var py : float;
var isStarted : boolean;

var gyroInitialRotation : Quaternion;

function Start () {
	animator = this.GetComponent(Animator);
	speed = 0.5f;
	max = 5f;
	isStarted = false;
	
	Input.gyro.enabled = true;
	gyroInitialRotation = Input.gyro.attitude;
	yield WaitForSeconds(2);
	isStarted = true;
}

function Update () {
	if( !isStarted ) {
		return;
	}
	Input.gyro.enabled = true;
	
	var instanceAttitude : Quaternion = Input.gyro.attitude;
	//var offsetAttitude : Quaternion = Quaternion.Inverse(instanceAttitude) * gyroInitialRotation;
	var offsetAttitude : Quaternion = new Quaternion(instanceAttitude.x - gyroInitialRotation.x, instanceAttitude.y - gyroInitialRotation.y, instanceAttitude.z - gyroInitialRotation.z, instanceAttitude.w - gyroInitialRotation.w);
	
//	if(Input.GetKey(KeyCode.W)){
//		//if(rigidbody2D.velocity.y < max)
//		//	{
//				rigidbody2D.velocity.y += speed * 3;
//		//	}
//	}
//	else if(Input.GetKey(KeyCode.D)){
//		//if(rigidbody2D.velocity.x < max)
//		//	{
//				rigidbody2D.position.x += speed;
//		//	}
//	}
//	else if(Input.GetKey(KeyCode.A)){
//		//if(rigidbody2D.velocity.x < -max)
//		//	{
//				rigidbody2D.position.x -= speed;
//		//	}
//	}
	
	if ( offsetAttitude.y < 0  && Input.gyro.rotationRate.y != 0) {
	//if ( Input.gyro.attitude.y < 0  && Input.gyro.rotationRate.y != 0) {
		//if(rigidbody2D.velocity.x < max)
		//{
			if ( Mathf.Abs(Input.gyro.rotationRate.y) >= 5 )
			{
				transform.position.x += speed * Mathf.Abs(offsetAttitude.y) + (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));			
				//transform.position.x += speed * Mathf.Abs(Input.gyro.attitude.y) + (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
			}
			else {
				transform.position.x += speed * Mathf.Abs(offsetAttitude.y); //+ (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
				//transform.position.x += speed * Mathf.Abs(Input.gyro.attitude.y); //+ (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
			}
		//}
	}
	if ( offsetAttitude.y > 0 && Input.gyro.rotationRate.y != 0) {
	//if ( Input.gyro.attitude.y > 0 && Input.gyro.rotationRate.y != 0) {
		//if(rigidbody2D.velocity.x > -max)
		//{
			if ( Mathf.Abs(Input.gyro.rotationRate.y) >= 5 )
			{
				transform.position.x -= speed * Mathf.Abs(offsetAttitude.y) + (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
				//transform.position.x -= speed * Mathf.Abs(Input.gyro.attitude.y) + (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
			}
			else {
				transform.position.x -= speed * Mathf.Abs(offsetAttitude.y); //+ (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
				//transform.position.x -= speed * Mathf.Abs(Input.gyro.attitude.y); //+ (0.1 * Mathf.Abs(Input.gyro.rotationRate.y));
			}
		//}
	}
	if ( offsetAttitude.x > -0.1 && Input.gyro.rotationRate.x != 0) {
	//if ( Input.gyro.attitude.x > -0.1 && Input.gyro.rotationRate.x != 0) {
		//if(rigidbody2D.velocity.y < max && !isJump)
		//{
		if ( !isJump ) {
			rigidbody2D.velocity.y += 7f;
			isJump = true;
		}
		//}
	}
	else{
//		if( rigidbody2D.velocity.y <= 3.0f ) {
//			isJump = false;
//		}
		if(rigidbody2D.velocity.x > 0 )
			rigidbody2D.velocity.x -=speed;
		else if(rigidbody2D.velocity.x <0 )
			rigidbody2D.velocity.x +=speed;
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