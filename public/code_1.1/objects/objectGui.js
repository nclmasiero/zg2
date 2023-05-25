class objectGui {
    static renderPlayerHpBar() {
        // outline
        var outlineLength = width / 4;
        stroke(255);
        strokeWeight(4);
        noFill();
        rectMode(CORNER);
        rect(20, 20, outlineLength, 30);

        // inline
        var inlineLength = map(formPlay.player.hp, 0, formPlay.player.maxHp, 0, outlineLength);
        noStroke();
        fill(200, 0, 0);
        rectMode(CORNER);
        rect(20, 20, inlineLength, 30);
    }

    static renderPlayerReloadingBar() {
        // outline
        var outlineLength = formPlay.player.w * 1.5;
        stroke(255);
        strokeWeight(2);
        noFill();
        rectMode(CORNER);
        rect(formPlay.player.x - outlineLength / 2, formPlay.player.y - formPlay.player.h, outlineLength, 10);

        // inline
        var inlineLength = map(formPlay.player.reloadingDelay, 0, formPlay.player.maxReloadingDelay, 0, outlineLength);
        noStroke();
        fill(200);
        rectMode(CORNER);
        rect(formPlay.player.x - outlineLength / 2, formPlay.player.y - formPlay.player.h, inlineLength, 10);

        // text
        noStroke();
        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        text("Reloading...", formPlay.player.x, formPlay.player.y - formPlay.player.h - 20);
    }

    static renderPlayerAmmo() {
        noStroke();
        fill(255);
        if (formPlay.player.mag <= 0) fill(200, 0, 0);
        textSize(32);
        textAlign(LEFT);
        var ammo = formPlay.player.ammo;
        var mag = formPlay.player.mag;
        text("Ammo: " + mag + "/" + ammo, 30, 80);
    }

    static renderScore() {
        noStroke();
        fill(255);
        textSize(32);
        textAlign(RIGHT);
        text("Score: " + formPlay.score, width - 30, 30);
    }

    static renderPlayerUltimateBar() {
        // outline
        var outlineLength = width / 4;
        stroke(255);
        strokeWeight(4);
        noFill();
        rectMode(CORNER);
        rect(20, height - 50, outlineLength, 30);

        // inline
        var inlineLength = map(formPlay.player.ultimateDelay, 0, formPlay.player.maxUltimateDelay, outlineLength, 0);
        noStroke();
        fill(150, 0, 200);
        rectMode(CORNER);
        rect(20, height - 50, inlineLength, 30);
    }

    static renderPause() {
        // window
        stroke(255);
        strokeWeight(3);
        fill(51);
        rectMode(CENTER);
        rect(width / 2, height / 2, width / 2, height / 2);

        // title
        var titleSize = map(width, 0, 2000, 0, 100);
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(titleSize);
        text("Pause", width / 2, height / 2 - height / 5);

        // subtitle
        var subtitleSize = map(width, 0, 2000, 0, 50);
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(subtitleSize);
        text("Press 'm' to go to menu or\n'q' to quit the pause.", width / 2, height / 2);
    }

    static renderUserName() {
        var nameSize = map(width, 0, 2000, 0, 100);
        noStroke();
        fill(255);
        textAlign(RIGHT);
        textSize(nameSize);
        text(localStorage.plinName, width - 30, 30);
    }

    static renderUserLevel() {
        var levelSize = map(width, 0, 2000, 0, 50);
        noStroke();
        fill(255);
        textAlign(RIGHT);
        textSize(levelSize);
        text("lv. " + localStorage.plinLevel, width - 30, 100);
    }

    static renderUserExperience() {
        var barOutlineLength = map(width, 0, 2000, 0, 150);
        var barInlineLength = map(localStorage.plinExperience, 0, 100, 0, barOutlineLength);
        var expSize = map(width, 0, 2000, 0, 30);
        rectMode(CORNER);
        // outline
        stroke(255);
        strokeWeight(2);
        noFill();
        rect(width - width / 12, 140, barOutlineLength, 15);
        // inline
        noStroke();
        fill(0, 0, 200);
        rect(width - width / 12, 140, barInlineLength, 15);
        // text
        noStroke();
        fill(255);
        textAlign(RIGHT);
        textSize(expSize);
        text("EXP.", width - width / 12 - 10, 145);
    }

    static renderUserMaxScore() {
        var scoreSize = map(width, 0, 2000, 0, 50);
        noStroke();
        fill(255);
        textAlign(LEFT);
        textSize(scoreSize);
        text("Record: " + localStorage.plinMaxScore, 30, 30);
    }

    static renderUserMoney() {
        var moneySize = map(width, 0, 2000, 0, 100);
        noStroke();
        fill(255);
        textAlign(RIGHT);
        textSize(moneySize);
        text("$" + localStorage.plinMoney, width - 30, 50);
    }

    static renderVersion() {
        noStroke();
        fill(255);
        textAlign(LEFT);
        textSize(30);
        text("v" + VERSION, 30, height - 30);
    }

    static renderPlayerReloadButton() {
        // text
        noStroke();
        fill(200, 0, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Reload!", formPlay.player.x, formPlay.player.y - formPlay.player.h);

        // image
        imageMode(CENTER);
        image(textureButtonKeyR, formPlay.player.x - formPlay.player.w, formPlay.player.y - formPlay.player.h, 30, 30);
    }

    static renderPlayerLowHp() {
        let redInAlpha = map(formPlay.player.hp, 0, formPlay.player.maxHp, 30, 0);

        noStroke();
        fill(200, 0, 0, redInAlpha);
        rectMode(CORNER);
        rect(0, 0, width, height);
    }
}