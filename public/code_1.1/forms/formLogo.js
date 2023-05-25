class formLogo {
    static initialize() {
        Controller.setBackground(51);
        Controller.disablePointer();

        this.imageWidth = map(width, 0, 2000, 0, 500);
        this.imageHeight = this.imageWidth * 9 / 16;

        this.logoAlpha = 0;
        this.logoAlphaIncrement = 10;
        this.logoDuration = 60;
    }

    static update() {
        this.logoAlpha += this.logoAlphaIncrement;
        if (this.logoAlpha > 255) this.logoAlpha = 255;

        if (frameCount == this.logoDuration) this.logoAlphaIncrement *= -1;

        if (this.logoAlpha < -255) {
            noTint();
            if (localStorage.plinKnown) Controller.setForm(formTitle); // starting form
            else Controller.setForm(formNewAccount);
        }
    }

    static render() {
        imageMode(CENTER);
        tint(255, 255, 255, this.logoAlpha);
        image(textureNclLogo, width / 2, height / 2, this.imageWidth, this.imageHeight);
    }
}