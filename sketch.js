var canvas;
var ctx;
var x, y, t, w;
var drawCount = 0;
var looping = false;
var showInterface = true;
var showPanel = true;
var userControl = false;
var songPlay = true;
var exporting = false;
var fileName = "joy-and-confusion-0003";
var shape;
var showYellow = false;
var norma = false;
var globalValues = {};
var song;
var repositionSong = false;
var sumSheet;

function setup() {
    song = loadSound("mindonfire.mp3", playSong);
    loadJSON("https://dl.dropboxusercontent.com/u/1484440/art_numerique/palettes.json", gotPalettes);
    canvas = createCanvas(windowWidth, windowWidth * 9 / 16);
    ctx = canvas.drawingContext;
    frameRate(20);
    sumSheet = sumXSheet(xSheet);
    createInterface(0, sumSheet, drawCount);
    configureInterface();
    // createInfoDiv();
    // setupInfoDiv();
    if (!looping) {
        noLoop();
    }
    noStroke();
}

function configureInterface() {

    folders.particles = new Folder("Particles", false);
    buttons.resetW = new Button("Reset white dot position and velocity", folders.particles.div, function() {});
    // resetW = createButton('Reset white dot position and velocity');
    // resetW.parent(infoDiv);
    // resetA = createButton('Reset all');
    buttons.resetA = new Button("Reset all", folders.particles.div, function() {});
    buttons.resetA.button.style("float", "right");
    //-------- Curve selector------------------//
    menus.curves = new Menu("Path", folders.particles.div);
    for (var c = 0; c < curves.length; c++) {
        menus.curves.menu.option(curves[c].name);
    }
    menus.curves.menu.changed(function() {
        var item = menus.curves.menu.value();
        for (var i = 0; i <  curves.length; i++) {
            if (item === curves[i].name) {
                shape = curves[i];
            }
        }
    });
    menus.curves.menu.value(curves[2].name);
    shape = curves[2];
    sliders.accMult = new Slider("White dot Acceleration rate", 0, 1, 1, 0.001, folders.particles.div);
    sliders.velMult = new Slider("White dot Friction", 0.999, 1, 0.999, 0.00001, folders.particles.div);
    sliders.speed = new Slider("Yellow Dot Rotation rate", 0, 1, 0.29, 0.01, folders.particles.div);


    folders.spiral = new Folder("Spirals", false);
    sliders.zoom = new Slider("Canvas scale", 0, 20, 1, 0.01, folders.spiral.div);

    folders.superformula = new Folder("Superformula", false);
    sliders.n2 = new Slider("n2", 0, 10, 1, 0.1, folders.superformula.div);
    sliders.sc = new Slider("sc", 0, 100, 20, 1, folders.superformula.div);
    sliders.scPow = new Slider("scPow", -10, 10, 0, 1, folders.superformula.div);
    sliders.m = new Slider("m", 0, 30, 5, 1, folders.superformula.div);
    sliders.s = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.spiral.div);
    sliders.lerpy = new Slider("Lerp", 0, 1, 0, 0.01, folders.spiral.div);
    sliders.particleScalar = new Slider("Particle scalar", 0, 200, 1, 0.001, folders.spiral.div);
    sliders.spiralScalar = new Slider("Spiral scalar", 1, 200, 1, 0.01, folders.spiral.div);
    sliders.levels = new Slider("Levels", -200, 100, 0, 1, folders.spiral.div);

    folders.cols = new Folder("Color adjustments, foreground", true);
    sliders.dark = new Slider("Dark", -100, 100, 0, 1, folders.cols.div);
    sliders.mid = new Slider("Mid", -100, 100, 0, 1, folders.cols.div);
    sliders.light = new Slider("Light", -100, 100, 0, 1, folders.cols.div);
    sliders.hue = new Slider("Hue", -360, 360, 0, 1, folders.cols.div);
    sliders.sat = new Slider("Saturation", -100, 100, 0, 1, folders.cols.div);
    sliders.brightness = new Slider("Brightness", -100, 100, 0, 1, folders.cols.div);

    folders.colsBg = new Folder("Color adjustments, background", true);
    sliders.darkBg = new Slider("Dark", -100, 100, 0, 1, folders.colsBg.div);
    sliders.midBg = new Slider("Mid", -100, 100, 0, 1, folders.colsBg.div);
    sliders.lightBg = new Slider("Light", -100, 100, 0, 1, folders.colsBg.div);
    sliders.hueBg = new Slider("Hue", -360, 360, 0, 1, folders.colsBg.div);
    sliders.satBg = new Slider("Saturation", -100, 100, 0, 1, folders.colsBg.div);
    sliders.brightnessBg = new Slider("Brightness", -100, 100, 0, 1, folders.colsBg.div);

    sliders.timeline.slider.input(function() {
        if (!userControl) {
            repositionSong = true;
        }
    });
}

function playSong() {
    song.rate(20 / 24);
    // console.log("Song rate!");
    // song.play();
}

function draw() {
    if (drawCount > sumSheet) {
        noLoop();
    };
    translate(width / 2, height / 2);
    drawCount = sliders.timeline.value;

    if (userControl) {
        // userControlled.run();
        autumnSpiral13.mix(0, userControlledParticle, 0, sliders.lerpy.value);
    } else {
        runXSheet(xSheet);
    }

    printBackgroundGradient();
    scale(globalValues.zoom, globalValues.zoom);
    // rotate(globalValues.rotation);
    rotate(drawCount * globalValues.rotation);
    printDotsWobbly();
    if (showYellow) {
        showYellowDots();
    };

    if (exporting) {
        frameExport();
    }
    // if (drawCount > 1850 && drawCount < 2250) {
    //     frameExport();
    // }
    // if (drawCount % 10 === 0) {
    //     console.log("frameRate : " + frameRate());
    //     // console.log("drawCount : " + drawCount);
    //     // console.log("songTime : " + (song.currentTime() * 24));
    // }
    drawCount++;
    if (!userControl && repositionSong && songPlay) {
        song.jump(drawCount / 24);
        song.rate(20 / 24);
        repositionSong = false;
    }
    sliders.timeline.set(drawCount);
    sliders.timeline.paragraph.html(queryXSheet(xSheet) + ", drawCount : " + drawCount);
}

function printBackgroundGradient() {
    var gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, width);
    var cols = globalValues.gradient;
    for (var i = 0; i < cols.length; i++) {
        gradient.addColorStop(cols[i].offset, "rgba(" + cols[i].r + ", " + cols[i].g + ", " + cols[i].b + ",1)");
    }
    ctx.fillStyle = gradient;
    rect(-width * 0.5, -height * 0.5, width, height);
}

function printDots() {
    for (var i = 0; i < globalValues.graph.length; i++) {
        var dot = globalValues.graph[i];
        var size = globalValues.sizes[i];
        fill(dot.col.r, dot.col.g, dot.col.b);
        // ellipse(dot.pos.x, dot.pos.y, dot.size, dot.size);
        ellipse(dot.pos.x, dot.pos.y, size, size);
    }
}

function printDotsWobbly() {
    var wob = noise(drawCount / 10) * 5;
    var wob2 = noise(100 + drawCount / 10) * 5;
    for (var i = 0; i < globalValues.graph.length; i++) {
        var wob3 = noise(i * 100 + drawCount / 10) * 2;
        var wob4 = noise(100 + i * 100 + drawCount / 10) * 2;
        var dot = globalValues.graph[i];
        var size = globalValues.sizes[i];
        fill(dot.col.r, dot.col.g, dot.col.b);
        // ellipse(dot.pos.x, dot.pos.y, dot.size, dot.size);
        ellipse(dot.pos.x + wob + wob3, dot.pos.y + wob2 + wob4, size, size);
    }
}

showYellowDots = function() {
    fill(255, 255, 0);
    if (globalValues.yellowGraph) {
        for (var i = 0; i < globalValues.yellowGraph.length; i++) {
            var vec = globalValues.yellowGraph[i];
            ellipse(vec.x, vec.y, 2.5, 2.5);
        }
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
            if (!userControl && songPlay) {
                song.pause();
            }
        } else {
            loop();
            looping = true;
            if (!userControl && songPlay) {

                song.play();
                song.jump(drawCount / 24);
                song.rate(20 / 24);
            }
        }
    }
    if (key == 'm' || key == 'M') {
        showYellow = (showYellow) ? false : true;
    }
    if (key == 'a' || key == 'A') {
        // userControlledSpiral.privateValues.paletteIndex += 2;
        // userControlledParticle.privateValues.paletteIndex += 2;
        superellipseSpiral.privateValues.paletteIndex += 2;
    }
    // if (key == 'e' || key == 'E') {
    //     // userControlledSpiral.privateValues.paletteIndex += 2;
    //     // userControlledParticle.privateValues.paletteIndex += 2;
    //     // userControlledSpiral.privateValues.paletteIndex += 2;
    // }
    if (key == 's' || key == 'S') {
        // change_erase_color();
        superellipseSpiral.privateValues.paletteIndex2 += 2;
    }
    if (key == 'n' || key == 'N') {
        nb = (nb) ? false : true;
    }

    if (key == 'g' || key == 'G') {
        if (showInterface) {
            showInterface = false;
            interface.style("display", "none");
            timeline.style("display", "none");
        } else {
            showInterface = true;
            if (showPanel) {
                interface.style("display", "block");
            }
            timeline.style("display", "block");
        }
    }
    if (key == 'h' || key == 'H') {
        if (showPanel) {
            showPanel = false;
            interface.style("display", "none");
        } else {
            showPanel = true;
            interface.style("display", "block");
        }
    }
    if (keyCode == LEFT_ARROW) {
        repositionXSheet(0);
    }
    if (key == 'q' || key == 'Q') {
        repositionXSheet(430);
    }
    if (key == 'w' || key == 'W') {
        repositionXSheet(1550);
    }
    if (key == 'e' || key == 'E') {
        repositionXSheet(1700);
    }
    if (key == 'r' || key == 'R') {
        repositionXSheet(1950);
    }
    if (key == 't' || key == 'T') {
        repositionXSheet(2350);
    }
    if (key == 'y' || key == 'Y') {
        repositionXSheet(2580);
    }
    if (key == 'u' || key == 'U') {
        repositionXSheet(2833);
    }
    if (key == 'i' || key == 'I') {
        repositionXSheet(3990);
    }
    if (key == 'o' || key == 'O') {
        repositionXSheet(4150);
    }
    if (key == 'p' || key == 'P') {
        repositionXSheet(4300);
    }
    if (key == 'z' || key == 'Z') {
        repositionXSheet(4580);
    }
    if (key == 'x' || key == 'X') {
        repositionXSheet(5300);
    }
}

function repositionXSheet(t) {
    drawCount = t;
    if (songPlay) {
        repositionSong = true;
    }
    if (!userControl && repositionSong && songPlay) {
        song.jump(drawCount / 24);
        song.rate(20 / 24);
        repositionSong = false;
    }
    sliders.timeline.set(drawCount);
    sliders.timeline.paragraph.html(queryXSheet(xSheet) + ", drawCount : " + drawCount);
}

function frameExport() {
    var formattedFrameCount = "" + drawCount;
    while (formattedFrameCount.length < 5) {
        formattedFrameCount = "0" + formattedFrameCount;
    }
    save(fileName + "_" + formattedFrameCount + ".png");
}
