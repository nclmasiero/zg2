class formTitle {
    static initialize() {
        Controller.setBackground(color(51));
        Controller.disablePointer();

        this.titleImage = textureTitleTitle;
        this.subtitleImage = textureTitleSubtitle;

        this.titleY = -100;
        this.titleReady = false;
        this.titleReadyFrame = null;

        this.subtitleReady = false;

        this.instructionAlpha = 0;
        this.instructionAlphaSign = 1;
        this.instructionTimeRender = 90; // time the line renders after the title is ready

        this.ready = false;
    }

    static update() {
        // calculating title Y
        if (this.titleY < height / 2) this.titleY += 8;
        else {
            this.titleReady = true;
            if (this.titleReadyFrame == null) this.titleReadyFrame = frameCount;
        }

        // calculating the instruction alpha
        if (this.subtitleReady && frameCount > this.titleReadyFrame + this.instructionTimeRender) {
            if (this.instructionAlpha >= 255 || this.instructionAlpha <= -100) this.instructionAlphaSign *= -1;
            this.instructionAlpha += 3 * this.instructionAlphaSign;
        }
    }

    static render() {
        imageMode(CENTER);

        // drawing the title
        this.titleWidth = map(width, 0, 2000, 0, 1000);
        this.titleHeight = map(width, 0, 2000, 0, 100);
        image(this.titleImage, width / 2, this.titleY, this.titleWidth, this.titleHeight);

        // drawing the subtitle
        this.subtitleWidth = map(width, 0, 2000, 0, 80);
        this.subtitleHeight = map(width, 0, 2000, 0, 50);
        var subtitleX = width / 2 + this.titleWidth / 2 + this.subtitleWidth / 2;
        var subtitleY = height / 2 + this.subtitleHeight / 2
        if (this.titleReady && frameCount > this.titleReadyFrame + 60) {

            image(this.subtitleImage, subtitleX, subtitleY, this.subtitleWidth, this.subtitleHeight);
            this.subtitleReady = true;
        }

        // drawing the instruction
        if (this.subtitleReady && frameCount > this.titleReadyFrame + this.instructionTimeRender) {
            this.ready = true;
            var instructionWidth = map(width, 0, 2000, 0, 32);
            textSize(instructionWidth);
            textAlign(CENTER, CENTER);
            noStroke();
            fill(255, this.instructionAlpha);
            text("Press any key to continue...", width / 2, height / 2 + height / 4);
        }
    }

    static keyPressed() {
        if (this.ready) {
            Controller.setForm(formMenu);
            audioSubtitle.play();
        }
        else {
            this.titleY = height / 2;
            this.titleReadyFrame = -this.instructionTimeRender;
        }
    }

    static mousePressed() {
        if (this.ready) {
            Controller.setForm(formMenu);
            audioSubtitle.play();
        }
        else {
            this.titleY = height / 2;
            this.titleReadyFrame = -this.instructionTimeRender;
        }
    }
}