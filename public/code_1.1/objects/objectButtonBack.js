class objectButtonBack {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.image = textureButton;
        this.hovered = false;
    }

    update() {
        // checking if hovered
        var conditionMouseX = mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2
        var conditionMouseY = mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
        if (conditionMouseX && conditionMouseY) {
            this.hovered = true;
            this.image = textureButtonBackHovered;
        } else {
            this.hovered = false;
            this.image = textureButtonBack;
        }
    }

    render() {
        // rendering the button
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.w, this.h);
    }
}