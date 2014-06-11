#pragma strict

var PlayerT : GameObject;
var speed : float;

var mainCam : Camera;

var timer : float = 0;

function Start () {
	PlayerT = GameObject.FindGameObjectWithTag("Player");
	speed = 0.4f;
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
	
	if ( Input.touchCount > 0 ) {
		if (PlayerController.state == "default") {
			
			if (GaugeController.playerEnergy >= 1) {
				PlayerT.gameObject.SendMessage("Skills", 1);
			} else {
				PlayerController.announcement = "Not Enough Energy";
				timer = 2;

			}
		}
	}
	
	if (timer > 0) {
		timer -= Time.deltaTime;
	}
	if (timer <= 0) {
		PlayerController.announcement = "";
	}
}

//function OnGUI() {
//	GUI.Button( new Rect( mainCam.ScreenToWorldPoint( new Vector3 (Screen.width ,0f ,0f )).x * 3/4, mainCam.ScreenToWorldPoint( new Vector3 (0f, Screen.height, 0f )).y * 3/ 4, 50, 50 ), "D" );
//}