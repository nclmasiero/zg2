class objectButton {
    constructor(x, y, w, h, text = "", textSize = 16, locked) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.textSize = textSize;
        this.image = textureButton;
        this.hovered = false;
        this.locked = locked;
    }

    update() {
        // checking if hovered
        var conditionMouseX = mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2
        var conditionMouseY = mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
        if (!this.locked) {
            if (conditionMouseX && conditionMouseY) {
                this.hovered = true;
                this.image = textureButtonHovered;
            } else {
                this.hovered = false;
                this.image = textureButton;
            }
        } else {
            this.image = textureButtonLocked;
            this.hovered = false;
        }
    }

    render() {
        // rendering the button
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.w, this.h);

        // rendering text
        textSize(this.textSize);
        textAlign(CENTER);
        noStroke();
        fill(255);
        if (this.locked) fill(120);
        text(this.text, this.x, this.y - this.h / 11);
    }
}