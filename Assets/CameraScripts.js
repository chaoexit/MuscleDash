#pragma strict

var PlayerT : GameObject;
var speed : float;

function Start () {
	PlayerT = GameObject.FindGameObjectWithTag("Player");
	speed = 0.2f;
	this.camera.orthographicSize = 8;
}

function Update () {
	if ( this.transform.position.x - PlayerT.transform.position.x > 2 ) {
		rigidbody2D.velocity.x -= speed;
	}
	else if ( this.transform.position.x - PlayerT.transform.position.x < -2 ) {
		rigidbody2D.velocity.x += speed;
	}
	else {
		rigidbody2D.velocity.x = 0;
	}
	
	if ( this.transform.position.y - PlayerT.transform.position.y > 2 ) {
		rigidbody2D.velocity.y -= speed;
	}
	else if ( this.transform.position.y - PlayerT.transform.position.y < -2 ) {
		rigidbody2D.velocity.y += speed;
	}
	else {
		rigidbody2D.velocity.y = 0;
	}
}