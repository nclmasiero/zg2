class objectPointer {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.image = texturePointer;
        this.toRender = true;
    }

    update() {
        // moving the pointer
        this.x = mouseX;
        this.y = mouseY;
    }

    render() {
        if (this.toRender) image(this.image, this.x, this.y, this.w, this.h);
    }
}