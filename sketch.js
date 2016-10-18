var canvas;
var ctx;
var x, y, t, w;
var drawCount = 0;
var looping = false;
var showPanel = true;
var userControl = true;
var exporting = false;
var fileName = "joy-and-confusion-0003";
var shape;
var showYellow = false;
var norma = false;
var globalValues = {};
var song;
var repositionSong = false;

function setup() {
    song = loadSound("mindonfire.mp3", playSong);
    loadJSON("https://dl.dropboxusercontent.com/u/1484440/art_numerique/palettes.json", gotPalettes);
    canvas = createCanvas(windowWidth, windowWidth * 9 / 16);
    ctx = canvas.drawingContext;
    frameRate(20);
    createInfoDiv();
    setupInfoDiv();
    if (!looping) {
        noLoop();
    }
    noStroke();
}

function playSong() {
    // song.play();
    song.rate(20 / 24)
}

function draw() {
    if (drawCount > 5500) {
        noLoop();
    };
    translate(width / 2, height / 2);
    drawCount = sliders.sheetSlider.value;

    if (userControl) {
        // userControlled.run();
        autumnSpiral2.mix(0, userControlledParticle, 0, sliders.lerpy.value);
    } else {
        runXSheet(xSheet);
    }

    printBackgroundGradient();
    scale(globalValues.zoom, globalValues.zoom);
    // rotate(globalValues.rotation);
    rotate(drawCount * globalValues.rotation);
    printDots();
    if (showYellow) {
        showYellowDots();
    };

    if (exporting) {
        frameExport();
    }
    // if (drawCount % 10 === 0) {
    //     console.log("frameRate : " + frameRate());
    //     // console.log("drawCount : " + drawCount);
    //     // console.log("songTime : " + (song.currentTime() * 24));
    // }
    drawCount++;
    if (repositionSong) {
        // song.jump(drawCount / 24);
        repositionSong = false;
    }
    sliders.sheetSlider.set(drawCount);
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

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
            // song.pause();
        } else {
            loop();
            looping = true;
            // song.play();
        }
    }
    if (key == 'y' || key == 'Y') {
        showYellow = (showYellow) ? false : true;
    }
    if (key == 'r' || key == 'R') {
        // userControlledSpiral.privateValues.paletteIndex += 2;
        // userControlledParticle.privateValues.paletteIndex += 2;
        autumnSpiral2.privateValues.paletteIndex += 2;
    }
    if (key == 'e' || key == 'E') {
        // userControlledSpiral.privateValues.paletteIndex += 2;
        // userControlledParticle.privateValues.paletteIndex += 2;
        // userControlledSpiral.privateValues.paletteIndex += 2;
    }
    if (key == 't' || key == 'T') {
        change_erase_color();
    }
    if (key == 'n' || key == 'N') {
        nb = (nb) ? false : true;
    }

    if (key == 'g' || key == 'G') {
        if (showPanel) {
            showPanel = false;
            infoDiv.style("display", "none");
        } else {
            showPanel = true;
            infoDiv.style("display", "block");
        }
    }
}

function frameExport() {
    var formattedFrameCount = "" + drawCount;
    while (formattedFrameCount.length < 5) {
        formattedFrameCount = "0" + formattedFrameCount;
    }
    save(fileName + "_" + formattedFrameCount + ".png");
}
