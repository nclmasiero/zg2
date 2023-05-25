class Controller {
    static initialize() {
        this.form = null;
        this.background = null;
    }

    static setForm(form) {
        pointer.toRender = true;
        this.form = form;
        this.form.initialize();
    }

    static setBackground(background) {
        this.background = background;
    }

    static disablePointer() {
        pointer.toRender = false;
    }

    static enablePointer() {
        pointer.toRender = true;
    }

    static update() {
        // updating volume
        for (var audio of audiosArray) {
            audio.setVolume(int(localStorage.settingVolume) / 10);
        }

        // updating form
        if (this.form != null) this.form.update();
    }

    static render() {
        background(this.background);
        if (this.form != null) this.form.render();
    }

    static windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        if (this.form != formPlay && this.form != formLogo) this.setForm(this.form);
    }

    static keyPressed() {
        try {
            this.form.keyPressed();
        } catch {
            //
        }
    }

    static mousePressed() {
        try {
            this.form.mousePressed();
        } catch {
            //
        }
    }

    static keyTyped() {
        try {
            this.form.keyTyped();
        } catch {
            //
        }
    }
}