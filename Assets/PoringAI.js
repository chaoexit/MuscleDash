#pragma strict

var animator : Animator;
var speed : float;
var max : float;
var PlayerT : GameObject;
function Start () {
	PlayerT = GameObject.FindGameObjectWithTag("Player");
	animator = this.GetComponent(Animator);
	speed = 0.4f;
	max = 1.6f;
}

function Update () {
	
	if(Mathf.Abs(PlayerT.transform.position.y - this.transform.position.y)<1.5f){
		if(this.transform.position.x < PlayerT.transform.position.x)
		{
			if(rigidbody2D.velocity.x >=0 && rigidbody2D.velocity.x < max)
			{
				rigidbody2D.velocity.x += speed;
			}
		}
		else if(this.transform.position.x> PlayerT.transform.position.x)
		{
			if(rigidbody2D.velocity.x<=0 && rigidbody2D.velocity.x > -max)
			{
				rigidbody2D.velocity.x -= speed;
			}
		}
	}
	else
	{
		randomwalk();
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
		if(random<0.5f)
		{
			if(rigidbody2D.velocity.x<=0 && rigidbody2D.velocity.x > -max)
			{
				rigidbody2D.velocity.x -= speed;
			}
			yield WaitForSeconds(1.5f);
			rigidbody2D.velocity.x = 0;
			yield WaitForSeconds(1.5f);
		}
		else if(random>=0.5f)
		{
			if(rigidbody2D.velocity.x>=0 && rigidbody2D.velocity.x < max)
			{
				rigidbody2D.velocity.x += speed;
			}
			yield WaitForSeconds(1.5f);
			rigidbody2D.velocity.x = 0;
			yield WaitForSeconds(1.5f);
		}
}