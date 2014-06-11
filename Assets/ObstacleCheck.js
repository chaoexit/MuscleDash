#pragma strict

var audio : AudioSource;

function Start () {

}

function Update () {

}

function OnCollisionEnter2D( colInfo : Collision2D ) {
	if ( colInfo.gameObject.tag == "Player" && PlayerController.state == "explode") {	
		Debug.Log("bomb!!");
		//Audio Here
		colInfo.gameObject.rigidbody2D.mass = 100000000;
		rigidbody2D.isKinematic = false;
		this.GetComponent(BoxCollider2D).isTrigger = false;
		rigidbody2D.AddForce( new Vector2(this.transform.position.x - colInfo.transform.position.x, this.transform.position.y - colInfo.transform.position.y), ForceMode2D.Impulse );
		yield WaitForSeconds(5);
		Destroy(this.gameObject);
	}
}