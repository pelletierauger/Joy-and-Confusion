var canvas;
var ctx;
var x, y, t, w;
var drawCount = 0;
var looping = false;
var showInterface = true;
var showPanel = true;
var userControl = false;
var songPlay = false;
var exporting = false;
var fileName = "joy-and-confusion-0003";
var shape;
var showYellow = false;
var norma = false;
var globalValues = {};
var song;
var repositionSong = false;
var sumSheet;

var valleyArray;
var currentValley = 0;

function setup() {
    if (songPlay) {
        song = loadSound("mindonfire.mp3", playSong);
    }
    loadJSON("palettes.json", gotPalettes);
    // canvas = createCanvas(windowWidth, windowWidth * 9 / 16);
    canvas = createCanvas(min(windowHeight * 16 / 9, min(1440, windowWidth)), min(windowHeight, min(1440, windowWidth) * 9 / 16));
    ctx = canvas.drawingContext;
    frameRate(20);
    sumSheet = sumXSheet(xSheet);
    createInterface(0, sumSheet, drawCount);
    configureInterface();
    if (!looping) {
        noLoop();
    }
    noStroke();
    valleyArray = [autumnSpiral9, autumnSpiral6c, autumnSpiral2, autumnSpiral6];
    noiseSeed(99);
}

function configureInterface() {
    folders.documentation = new Folder("Documentation", true);
    var docsString = "<span class='hl'><i>Joy and Confusion</i></span> is a short animation film programmed with p5.js.";
    docsString += "<br /><br />Push the space bar to play or pause the film.";
    docsString += "<br /><br />Click on the large slider below (which acts as a timeline) to jump anywhere in the film.";
    docsString += "<br /><br />If you unfold the panels below by clicking on their titles, you'll see various sliders used while developing this film. They're unusable in this demo state.";
    docsString += "<br /><br />Press 'V' to toggle the visibility of the whole interface. Press 'B' to toggle only the visibility of the foldable panels.";

    docsString += "<br /><br />The film was originally synchronized with a copyrighted song that I'm currently trying to license for use.";
    // docsString += "You can watch the <a href='https://www.youtube.com/watch?v=FAQV680acEU'>film with music here</a> (an unlisted YouTube link allowed by the rights holder).";
    docsString += "<br /><br /> The code for this project <a href='https://github.com/pelletierauger/Joy-and-Confusion'>is on GitHub</a>.";
    docsString += "<br /><br />Press the letters Q, W, E, R, T, Y, U, I, O, P, A, or S to jump to various moments in the film. Press the left arrow to go back to the beginning.";

    var docs = createP(docsString);
    docs.parent(folders.documentation.div);

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

    folders.cols = new Folder("Color adjustments, foreground", false);
    sliders.dark = new Slider("Dark", -100, 100, 0, 1, folders.cols.div);
    sliders.mid = new Slider("Mid", -100, 100, 0, 1, folders.cols.div);
    sliders.light = new Slider("Light", -100, 100, 0, 1, folders.cols.div);
    sliders.hue = new Slider("Hue", -360, 360, 0, 1, folders.cols.div);
    sliders.sat = new Slider("Saturation", -100, 100, 0, 1, folders.cols.div);
    sliders.brightness = new Slider("Brightness", -100, 100, 0, 1, folders.cols.div);

    folders.colsBg = new Folder("Color adjustments, background", false);
    sliders.darkBg = new Slider("Dark", -100, 100, 0, 1, folders.colsBg.div);
    sliders.midBg = new Slider("Mid", -100, 100, 0, 1, folders.colsBg.div);
    sliders.lightBg = new Slider("Light", -100, 100, 0, 1, folders.colsBg.div);
    sliders.hueBg = new Slider("Hue", -360, 360, 0, 1, folders.colsBg.div);
    sliders.satBg = new Slider("Saturation", -100, 100, 0, 1, folders.colsBg.div);
    sliders.brightnessBg = new Slider("Brightness", -100, 100, 0, 1, folders.colsBg.div);

    sliders.timeline.slider.input(function() {
        for (var p = 0; p < valleyArray.length; p++) {
            valleyArray[p].privateValues.paletteSubgroupIndex = 0;
        }
        fastSpiral2.privateValues.paletteIndex = 0;
        fastSpiral2.privateValues.paletteIndex2 = 58;
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
    scale(width / 1280, width / 1280);
    scale(globalValues.zoom, globalValues.zoom);
    // rotate(globalValues.rotation);
    rotate(drawCount * globalValues.rotation);
    printDots();
    if (showYellow) {
        showYellowDots();
    };

    if (exporting && drawCount < 1580) {
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
    var wobScalar = map(drawCount, 0, 1050, 0.8, 0.5);
    wobScalar = constrain(wobScalar, 0.5, 0.8);
    // wobScalar = 0.8;
    var wob = noise(drawCount / 10) * 2.5 * wobScalar;
    var wob2 = noise(100 + drawCount / 10) * 2.5 * wobScalar;
    for (var i = 0; i < globalValues.graph.length; i++) {
        var wob3 = noise(i * 100 + drawCount / 10) * 2 * wobScalar;
        var wob4 = noise(100 + i * 100 + drawCount / 10) * 2 * wobScalar;
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
    // if (key == 'm' || key == 'M') {
    //     showYellow = (showYellow) ? false : true;
    // }
    // if (key == 'a' || key == 'A') {
    //     // userControlledSpiral.privateValues.paletteIndex += 2;
    //     // userControlledParticle.privateValues.paletteIndex += 2;
    //     // superellipseSpiral.privateValues.paletteIndex += 2;
    //     // autumnSpiral6.privateValues.palettesSubgroup[4]++;
    //     currentValley++;
    //     if (currentValley > 3) {
    //         currentValley = 0;
    //     }
    //     console.log("currentValley : " + currentValley);
    // }
    // if (key == 'e' || key == 'E') {
    //     // userControlledSpiral.privateValues.paletteIndex += 2;
    //     // userControlledParticle.privateValues.paletteIndex += 2;
    //     // userControlledSpiral.privateValues.paletteIndex += 2;
    // }
    // if (key == 's' || key == 'S') {
    //     // change_erase_color();
    //     // superellipseSpiral.privateValues.paletteIndex2 += 2;
    //     valleyArray[currentValley].privateValues.palettesSubgroup[0] += 2;
    //     console.log(valleyArray[currentValley].constructor.name + " pal " + valleyArray[currentValley].privateValues.palettesSubgroup[0]);
    // }
    // if (key == 'd' || key == 'D') {
    //     valleyArray[currentValley].privateValues.palettesSubgroup[1] += 2;
    // }
    // if (key == 'e' || key == 'E') {
    //     valleyArray[currentValley].privateValues.palettesSubgroup[2] += 2;
    // }
    // if (key == 'f' || key == 'F') {
    //     valleyArray[currentValley].privateValues.palettesSubgroup[3] += 2;
    // }
    // if (key == 'g' || key == 'G') {
    //     valleyArray[currentValley].privateValues.palettesSubgroup[4] += 2;
    // }
    // if (key == 'h' || key == 'H') {
    //     valleyArray[currentValley].privateValues.palettesSubgroup[5] += 2;;
    // }

    // if (key == 'n' || key == 'N') {
    //     nb = (nb) ? false : true;
    // }

    if (key == 'v' || key == 'V') {
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
    if (key == 'b' || key == 'B') {
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
    if (key == 'a' || key == 'A') {
        repositionXSheet(4580);
    }
    if (key == 's' || key == 'S') {
        repositionXSheet(5300);
    }
}

function repositionXSheet(t) {
    for (var p = 0; p < valleyArray.length; p++) {
        valleyArray[p].privateValues.paletteSubgroupIndex = 0;
    }
    fastSpiral2.privateValues.paletteIndex = 0;
    fastSpiral2.privateValues.paletteIndex2 = 58;
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
