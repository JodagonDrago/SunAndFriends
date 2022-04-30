//Asteroid prefab
class Asteroid extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store pointValue
        this.moveSpeed = game.settings.asteroidSpeed; //pixels per frame

        // Set randomized Y position
        this.y = this.randomY()
    }

    update(){
        //move asteroid left
        this.x -= this.moveSpeed; 

        //wrap around from left to right
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    //reset position
    reset(){
        this.moveSpeed = game.settings.asteroidSpeed; // Check for speed increase on reset
        this.x = game.config.width;
        this.y = this.randomY()
    }

    randomY() {
        return Phaser.Math.Between(borderPadding * 3, game.config.height - (borderPadding * 4));
    }
}