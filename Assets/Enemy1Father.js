#pragma strict

var Enemy1Maker : Transform;
var enemy1Count : int;
function Start () {
	enemy1Count = 0;
}

function Update () {
	if( enemy1Count < 4 ) {
		spawn();
		enemy1Count += 1;
	}
}
function spawn(){
	Instantiate(Enemy1Maker,Vector3(this.transform.position.x,this.transform.position.y,0),Quaternion.identity);
}