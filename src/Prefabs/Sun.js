// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);

      //some parameters
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update(){
        //movement
        if(keyLEFT.isDown && this.x >= borderUISize + this.width){
            this.x -=this.moveSpeed;
        }
        if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
            this.x +=this.moveSpeed;
        }
        if(keyUP.isDown && this.y >= borderUISize + this.height){
            this.y -=this.moveSpeed;
        }
        if(keyDOWN.isDown && this.y <= game.config.height - borderUISize - this.height){
            this.y +=this.moveSpeed;
        }
    }

    //reset sun
    reset(){
        this.y = game.config.height/2;
        this.x = game.config.width/2;
    }
}