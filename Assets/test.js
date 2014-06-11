#pragma strict

function Start () {
	this.renderer.material.color.a = 0.1;
}

function Update () {
	blink();
}

function blink(){

	yield WaitForSeconds(2);
	
	if(this.renderer.material.color.a == 0.0)
		this.renderer.material.color.a = 1.0;
	else
		this.renderer.material.color.a = 0.0;
}

