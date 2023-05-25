const VERSION = "1.1";

var gravity, defaultTitleY, gameFont, pointer, audiosArray;

function preload() {
    // FONTS
    fontMainFont = loadFont("source" + "_" + VERSION + "/fonts/font.otf")

    // AUDIOS
    audioClick = loadSound("source" + "_" + VERSION + "/audio/click.wav");
    audioSubtitle = loadSound("source" + "_" + VERSION + "/audio/subtitle.wav");
    audioRifleShot = loadSound("source" + "_" + VERSION + "/audio/rifleShot.wav");
    audioShotgunShot = loadSound("source" + "_" + VERSION + "/audio/shotgunShot.wav");
    audioZombieDead = loadSound("source" + "_" + VERSION + "/audio/zombieDead.wav");
    audioEnemyHit = loadSound("source" + "_" + VERSION + "/audio/enemyHit.wav");
    audioDimoDead = loadSound("source" + "_" + VERSION + "/audio/dimoDead.wav");
    audioReload = loadSound("source" + "_" + VERSION + "/audio/reload.wav");
    audioFireShot = loadSound("source" + "_" + VERSION + "/audio/fireShot.wav");
    audioBoostTaken = loadSound("source" + "_" + VERSION + "/audio/boostTaken.wav");
    audioMilesPassive = loadSound("source" + "_" + VERSION + "/audio/milesPassive.wav");
    audioTankPassive = loadSound("source" + "_" + VERSION + "/audio/tankPassive.wav");
    audioTankUltimate = loadSound("source" + "_" + VERSION + "/audio/tankUltimate.wav");
    audioTankHurt = loadSound("source" + "_" + VERSION + "/audio/tankHurt.wav");
    audioMilesHurt = loadSound("source" + "_" + VERSION + "/audio/milesHurt.wav");
    audioGenericHurt = loadSound("source" + "_" + VERSION + "/audio/genericHurt.wav");
    audioCharacterUnlocked = loadSound("source" + "_" + VERSION + "/audio/characterUnlocked.wav");
    audioAstroHurt = loadSound("source" + "_" + VERSION + "/audio/astroHurt.wav");
    audioAstroStar = loadSound("source" + "_" + VERSION + "/audio/astroStar.wav");
    audioAstroUltimate = loadSound("source" + "_" + VERSION + "/audio/astroUltimate.wav");
    audioUltimateReady = loadSound("source" + "_" + VERSION + "/audio/ultimateReady.wav");

    // audio array
    audiosArray = new Array(audioClick, audioSubtitle, audioRifleShot, audioShotgunShot, audioZombieDead, audioEnemyHit, audioDimoDead, audioReload, audioFireShot, audioBoostTaken);
    audiosArray.push(audioMilesPassive, audioTankPassive, audioTankUltimate, audioGenericHurt, audioMilesHurt, audioTankHurt, audioCharacterUnlocked, audioAstroHurt);
    audiosArray.push(audioAstroStar, audioAstroUltimate, audioUltimateReady);

    // TEXTURES
    // system
    textureTitleTitle = loadImage("source" + "_" + VERSION + "/textures/title_title.png");
    textureTitleSubtitle = loadImage("source" + "_" + VERSION + "/textures/title_subtitle.png");
    textureButton = loadImage("source" + "_" + VERSION + "/textures/button.png");
    textureButtonHovered = loadImage("source" + "_" + VERSION + "/textures/button_hovered.png");
    textureButtonLocked = loadImage("source" + "_" + VERSION + "/textures/button_locked.png");
    textureButtonBack = loadImage("source" + "_" + VERSION + "/textures/button_back.png");
    textureButtonBackHovered = loadImage("source" + "_" + VERSION + "/textures/button_back_hovered.png");
    texturePointer = loadImage("source" + "_" + VERSION + "/textures/pointer.png");
    textureNclLogo = loadImage("source" + "_" + VERSION + "/textures/logo_ncl.png");
    textureButtonKeyR = loadImage("source" + "_" + VERSION + "/textures/button_key_r.png");

    // objects
    textureBullet = loadImage("source" + "_" + VERSION + "/textures/bullet.png");
    textureBoostAmmo = loadImage("source" + "_" + VERSION + "/textures/boost_ammo.png");
    textureBoostHealth = loadImage("source" + "_" + VERSION + "/textures/boost_health.png");
    textureBoostUltimate = loadImage("source" + "_" + VERSION + "/textures/boost_ultimate.png");
    textureStar = loadImage("source" + "_" + VERSION + "/textures/star.png");
    textureUltimateAura = loadImage("source" + "_" + VERSION + "/textures/ultimate_aura.png");

    // characters
    textureMilesRight = loadImage("source" + "_" + VERSION + "/textures/miles_right.png");
    textureMilesLeft = loadImage("source" + "_" + VERSION + "/textures/miles_left.png");
    textureTankRight = loadImage("source" + "_" + VERSION + "/textures/tank_right.png");
    textureTankLeft = loadImage("source" + "_" + VERSION + "/textures/tank_left.png");
    textureAstroRight = loadImage("source" + "_" + VERSION + "/textures/astro_right.png");
    textureAstroLeft = loadImage("source" + "_" + VERSION + "/textures/astro_left.png");

    // enemies
    textureZombieRight = loadImage("source" + "_" + VERSION + "/textures/zombie_right.png");
    textureZombieLeft = loadImage("source" + "_" + VERSION + "/textures/zombie_left.png");
    textureDimoRight = loadImage("source" + "_" + VERSION + "/textures/dimo_right.png");
    textureDimoLeft = loadImage("source" + "_" + VERSION + "/textures/dimo_left.png");
}

function setup() {
    // setting up technical
    createCanvas(windowWidth, windowHeight);
    textFont(fontMainFont);
    frameRate(60);
    noCursor();

    // setting up globals
    gravity = 0.4;
    defaultTitleY = height / 12
    pointer = new objectPointer(mouseX, mouseY, 25, 25);

    // setting up settings
    if (localStorage.settingVolume == undefined) localStorage.settingVolume = 5;

    // setting up controller
    Controller.initialize();
    Controller.setForm(formLogo); // starting form <----------------------
}

function draw() {
    Controller.update();
    Controller.render();
    pointer.update();
    pointer.render();
}

function windowResized() {
    Controller.windowResized();
}

function mousePressed() {
    Controller.mousePressed();
}

function keyPressed() {
    Controller.keyPressed();
}

function keyTyped() {
    Controller.keyTyped();
}