class progressbar {
    constructor(scene, x, y, color) {
        // Initialize count
        this.count = 1

        //draw the bar
        this.bar = scene.add.graphics();

        //color the bar
        this.bar.fillStyle(color, 1);
        
        //position the bar
        this.bar.x = x;
        this.bar.y = y;

    }

    destroy() {
        this.bar.destroy();
    }

    setValue() {
        // Calculate position of next bar based on health
        let pos = this.count * 30

        // Increment how many bars are on screen
        this.count += 1;

        // Calculate height of bars based on border padding
        let height = borderUISize / 2
        
        // Add another bar to the progress meter
        console.log('Filled bar')
        this.bar.fillRect(pos, 0, 20, height);
    }
}