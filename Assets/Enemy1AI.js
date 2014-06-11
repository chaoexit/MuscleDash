#pragma strict

var animator : Animator;
var speed : float;
var max : float;
var ispeed : float; 
var isRunning : boolean;
var isDead : boolean;

function Start () {
	//GameManager.nPoring +=1;
	animator = this.GetComponent(Animator);
	speed = 0.4f;
	max = 10f;
	ispeed = 0.4f;
	isRunning = false;
	isDead = false;
	this.gameObject.tag = "Enemy";
}

function Update () {
	if ( isDead ) {
		return;
	}
	if((PlayerController.py-this.transform.position.y)<=1.5)
	{
		/*if(rigidbody2D.velocity.x < ispeed && rigidbody2D.velocity.x >0)
		{
			rigidbody2D.velocity.x = ispeed;
		}	
		else if(rigidbody2D.velocity.x > -ispeed && rigidbody2D.velocity.x <0)
		{
			rigidbody2D.velocity.x = -ispeed;
		}	*/
		isRunning = true;
		if(this.transform.position.x<PlayerController.px)
		{
			//if(rigidbody2D.velocity.x>=0 && rigidbody2D.velocity.x < max)
			//{
			if(rigidbody2D.velocity.x < max)
				rigidbody2D.velocity.x += speed;
			//}
		}
		else if(this.transform.position.x>PlayerController.px)
		{
			//if(rigidbody2D.velocity.x<=0 && rigidbody2D.velocity.x > -max)
			//{
			if(rigidbody2D.velocity.x > -max)
				rigidbody2D.velocity.x -= speed;
			//}
		}
	}
	else if((PlayerController.py-this.transform.position.y) <= -2) {
		isRunning = true;
		if(this.transform.position.x<PlayerController.px)
		{
			//if(rigidbody2D.velocity.x>=0 && rigidbody2D.velocity.x < max)
			//{
			if(rigidbody2D.velocity.x < max)
				rigidbody2D.velocity.x += speed;
			//}
		}
		else if(this.transform.position.x>PlayerController.px)
		{
			//if(rigidbody2D.velocity.x<=0 && rigidbody2D.velocity.x > -max)
			//{
			if(rigidbody2D.velocity.x > -max)
				rigidbody2D.velocity.x -= speed;
			//}
		}	
	}
	else
	{
		//Debug.Log(rigidbody2D.velocity.x);
		if(!isRunning)
		{

			randomwalk();

		}
		/*var random : float;
		random = Random.Range(0f,1f);
		if(random<0.5f)
		{
			if(rigidbody2D.velocity.x<=0 && rigidbody2D.velocity.x > -max)
			{
				rigidbody2D.velocity.x -= speed;
			}
			yield WaitForSeconds(.25);
		}
		else if(random>=0.5f)
		{
			if(rigidbody2D.velocity.x>=0 && rigidbody2D.velocity.x < max)
			{
				rigidbody2D.velocity.x += speed;
			}
			yield WaitForSeconds(.25);
		}
		*/
	}
}
function randomwalk(){
	var random : float;
		random = Random.Range(0f,1f);
		isRunning = true;
		animator.SetInteger("Direction", 1);
		if(random<0.5f)
		{
			//if(rigidbody2D.velocity.x > -max)
			//{
			//	rigidbody2D.velocity.x -= speed;
			//}
			rigidbody2D.gravityScale = 1;
			rigidbody2D.velocity.x =-5f;
			transform.localScale.x = 1;
			Debug.Log(rigidbody2D.velocity.x);
			yield WaitForSeconds(1);
			rigidbody2D.gravityScale = 1;
			Debug.Log(rigidbody2D.velocity.x);
			//rigidbody2D.velocity.x = 0;
			//yield WaitForSeconds(300f);
			isRunning = false;
		}
		else if(random>=0.5f)
		{
			//if(rigidbody2D.velocity.x < max)
			//{
			//	rigidbody2D.velocity.x += speed;
			//}
			rigidbody2D.gravityScale = 1;
			rigidbody2D.velocity.x =5f;
			transform.localScale.x = -1;
			yield WaitForSeconds(1.5);
			rigidbody2D.gravityScale = 1;
			//rigidbody2D.velocity.x = 0;
			//yield WaitForSeconds(300f);
			isRunning = false;
		}
		animator.SetInteger("Direction", 0);
}

function OnCollisionEnter2D( colInfo : Collision2D ) {

		if( colInfo.gameObject.tag == "Player" ) {
			isDead = true;
			yield WaitForSeconds(3);
			Destroy(this.gameObject);
			//Enemy1Father.enemy1Count -= 1;
		}	
}

function OnTriggerEnter2D(col: Collider2D) {
	if(col.gameObject.tag == "Block"){
		Debug.Log("collide");
		rigidbody2D.velocity.x -= 5f;
		transform.localScale.x = 1;
	}
}

function OnTriggerStay2D(col : Collider2D) {
	if ( isRunning ) {
		return;
	}
	if(col.gameObject.tag == "Block"){
		Debug.Log("collide");
		rigidbody2D.velocity.x -= 3f;
		transform.localScale.x = 1;
	}
	else if(col.gameObject.tag == "Block2"){
		Debug.Log("collide");
		rigidbody2D.velocity.x += 3f;
		transform.localScale.x = -1;
	}
}



