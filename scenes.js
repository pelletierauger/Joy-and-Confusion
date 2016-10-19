//---------------------- Declaration of the scenes-----------------------------------------------//

var userControlledParticle = new Scene();

userControlledParticle.runBackground = function(t) {
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: 50,
        b: 255
    }, {
        offset: step,
        r: 255,
        g: 120,
        b: 0
    }, {
        offset: 0.8,
        r: 55,
        g: 0,
        b: 255
    }];
};

userControlledParticle.runLayout = function(t) {
    this.localValues.zoom = sliders.zoom.value;
    this.localValues.rotation = 0;
};

userControlledParticle.runPositions = function(t) {
    this.privateValues.scalar = sliders.particleScalar.value;
    this.speed = sliders.speed.value;
    this.accMult = sliders.accMult.value;
    this.velMult = sliders.velMult.value;
    this.sc = sliders.sc.value;
    this.scPow = sliders.scPow.value;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: sliders.n2.value,
        n3: 1,
        a: 1,
        b: 1,
        m: sliders.m.value
    };

    this.privateValues.graphs = this.particle.run(this, t);
    this.privateValues.posGraph = this.privateValues.graphs.g;
    this.localValues.yellowGraph = this.privateValues.graphs.yellowGraph;
};

//--------------------------------------------------------------------------------------------//

var userControlledSpiral = new Scene();

userControlledSpiral.runBackground = function(t) {
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: 255,
        b: 0
    }, {
        offset: step,
        r: 55,
        g: 120,
        b: 0
    }, {
        offset: 0.8,
        r: 255,
        g: 50,
        b: 0
    }];
};

userControlledSpiral.runLayout = function(t) {
    this.localValues.zoom = sliders.zoom.value;
    this.localValues.rotation = 0;
};

userControlledSpiral.runPositions = function(t) {
    this.privateValues.scalar = sliders.spiralScalar.value;

    this.accMult = sliders.accMult.value;
    this.velMult = sliders.velMult.value;
    this.sc = sliders.sc.value;
    this.scPow = sliders.scPow.value;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: sliders.n2.value,
        n3: 1,
        a: 1,
        b: 1,
        m: sliders.m.value
    };

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 0,
            angle: 0,
            speed: 0.05 / 360 * Math.PI * 2
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = spiral(this, t);
};

//--------------------------------------------------------------------------------------------//

var spiderSpiral = new Scene();

// spiderSpiral.runBackground = userControlledSpiral.runBackground;
spiderSpiral.runBackground = function(t) {
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: 255,
        b: 0
    }, {
        offset: step,
        r: 255,
        g: 120,
        b: 0
    }, {
        offset: 0.8,
        r: 155,
        g: 55,
        b: 250
    }];
};
spiderSpiral.privateValues.paletteIndex = 236;
spiderSpiral.runLayout = function(t) {
    this.localValues.zoom = 2;
    this.localValues.rotation = 0.01;
};

spiderSpiral.runPositions = function(t) {
    this.privateValues.scalar = 30;
    this.accMult = sliders.accMult.value;
    this.velMult = sliders.velMult.value;
    this.sc = sliders.sc.value;
    this.scPow = sliders.scPow.value;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: sliders.n2.value,
        n3: 1,
        a: 1,
        b: 1,
        m: sliders.m.value
    };

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 2,
            angle: 2,
            speed: 0.05 / 360 * Math.PI * 2 /  50,
            hyp: 0.1
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = spiderWebSpiral(this, t);
};

spiderSpiral.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        var s = 10 + map(currentPos, 0, 1000, 0, 300);
        this.localValues.sizes.push(s);
    }
};

//--------------------------------------------------------------------------------------------//


spiderSpiral2 = new Scene();

spiderSpiral2.runBackground = function(t) {
    var col = floor(map(abs(sin(t / 20)), 0, 1, 0, 255));
    var col2 = floor(map(abs(sin(t / 40)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 2)), 0, 1, 0.1, 0.3);

    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: col2,
        b: 0
    }, {
        offset: step,
        r: col,
        g: 120,
        b: 0
    }, {
        offset: 0.8,
        r: 155,
        g: 55,
        b: col2
    }];
};
spiderSpiral2.privateValues.paletteIndex = 236;
spiderSpiral2.runLayout = function(t) {
    this.localValues.zoom = 2;
    this.localValues.rotation = 0.01;
};

spiderSpiral2.runPositions = function(t) {
    this.privateValues.scalar = 30;
    this.accMult = sliders.accMult.value;
    this.velMult = sliders.velMult.value;
    this.sc = sliders.sc.value;
    this.scPow = sliders.scPow.value;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: sliders.n2.value,
        n3: 1,
        a: 1,
        b: 1,
        m: sliders.m.value
    };

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 2,
            angle: 2,
            speed: 0.05 / 360 * Math.PI * 2 /  2,
            hyp: 0.1
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = spiderWebSpiral(this, t);
};

spiderSpiral2.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        var s = 10 + map(currentPos, 0, 1000, 0, 300);
        this.localValues.sizes.push(s);
    }
};

spiderSpiral2.runColors = function(t) {
    if (!this.privateValues.paletteIndex) {
        this.privateValues.paletteIndex = 236;
    }
    if (!this.privateValues.paletteIndex2) {
        this.privateValues.paletteIndex2 = 238;
        //Très beau aussi.
        //this.privateValues.paletteIndex2 = 3014;
    }

    if (allPalettes) {
        this.privateValues.palette = allPalettes[this.privateValues.paletteIndex];
        this.privateValues.palette2 = allPalettes[this.privateValues.paletteIndex2];
    } else {
        this.privateValues.palette = palette;
        this.privateValues.palette2 = palette;
    }

    this.privateValues.colorGraph = [];
    var currentColor = 0;
    for (var i = 0; i < 1000; i++) {
        var colorValues1 = hexToRgb(this.privateValues.palette[currentColor]);
        var colorValues2 = hexToRgb(this.privateValues.palette2[currentColor]);
        var lerpy = map(sin(t / 10), -1, 1, 0, 1);
        var colorValues = {
            r: lerp(colorValues1.r, colorValues2.r, lerpy),
            g: lerp(colorValues1.g, colorValues2.g, lerpy),
            b: lerp(colorValues1.b, colorValues2.b, lerpy)
        };
        currentColor++;
        if (currentColor > 4) {
            currentColor = 0;
        }
        this.privateValues.colorGraph.push(colorValues);
    }
};


//--------------------------------------------------------------------------------------------//


spiderSpiral3 = new Scene();

spiderSpiral3.runBackground = function(t) {
    var col = floor(map(abs(sin(t / 20)), 0, 1, 0, 255));
    var col2 = floor(map(abs(sin(t / 40)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 0,
        g: 255,
        b: col
    }, {
        offset: step,
        r: col,
        g: 255,
        b: 0
    }, {
        offset: 0.7,
        r: 255,
        g: 0,
        b: col2
    }];
};

spiderSpiral3.runLayout = function(t) {
    this.localValues.zoom = 2;
    this.localValues.rotation = 0.01;
};

spiderSpiral3.runPositions = function(t) {
    this.privateValues.scalar = 30;
    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 2,
            angle: 2,
            speed: 0.05 / 360 * Math.PI * 2 /  8,
            hyp: 0.1
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = nonCrossingStarSpiral(this, t);
};

spiderSpiral3.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        var s = 10 + map(currentPos, 0, 1000, 0, 300);
        this.localValues.sizes.push(s);
    }
};

spiderSpiral3.runColors = function(t) {
    if (!this.privateValues.paletteIndex) {
        this.privateValues.paletteIndex = 274;
    }
    if (!this.privateValues.paletteIndex2) {
        this.privateValues.paletteIndex2 = 1258;
        //Très beau aussi.
        //this.privateValues.paletteIndex2 = 3014;
    }

    if (allPalettes) {
        this.privateValues.palette = allPalettes[this.privateValues.paletteIndex];
        this.privateValues.palette2 = allPalettes[this.privateValues.paletteIndex2];
    } else {
        this.privateValues.palette = palette;
        this.privateValues.palette2 = palette;
    }

    this.privateValues.colorGraph = [];
    var currentColor = 0;
    for (var i = 0; i < 1000; i++) {
        var colorValues1 = hexToRgb(this.privateValues.palette[currentColor]);
        var colorValues2 = hexToRgb(this.privateValues.palette2[currentColor]);
        var lerpy = map(sin(t / 10), -1, 1, 0, 1);
        var colorValues = {
            r: lerp(colorValues1.r, colorValues2.r, lerpy),
            g: lerp(colorValues1.g, colorValues2.g, lerpy),
            b: lerp(colorValues1.b, colorValues2.b, lerpy)
        };
        currentColor++;
        if (currentColor > 4) {
            currentColor = 0;
        }
        this.privateValues.colorGraph.push(colorValues);
    }
};

//--------------------------------------------------------------------------------------------//
var firstSpiral = new Scene();
firstSpiral.privateValues.paletteIndex = 3;

firstSpiral.runBackground = function(t) {
    var step = map(abs(sin(t / 100)), 0, 1, 0.15, 0.2);
    this.localValues.gradient = [{
        offset: 0,
        r: 155,
        g: 150,
        b: 55
    }, {
        offset: step,
        r: 155,
        g: 0,
        b: 0
    }, {
        offset: 0.8,
        r: 0,
        g: 0,
        b: 0
    }];
};

firstSpiral.runLayout = function(t) {
    var z = map(t, 0, 1000, 1, 0.8);
    z = constrain(z, 0.1, 1);
    this.localValues.zoom = z;
    this.localValues.rotation = 0.01;
};

firstSpiral.runPositions = function(t) {
    this.privateValues.scalar = 20;

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 0,
            angle: 0,
            speed: 0.05 / 360 * Math.PI * 2 / 5,
            hyp: 8
        };
    }
    var coFade = cosineFade(0, 500);
    this.privateValues.spiral.hyp = map(coFade, 0, 1, 0.1, 8);
    // console.log(this.privateValues.spiral.hyp);
    this.privateValues.spiral.hyp = constrain(this.privateValues.spiral.hyp, 0.1, 8);
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = spiral(this, t);
};

firstSpiral.runSizes = function(t) {
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var s = 200;
        this.localValues.sizes.push(s);
    }
};

var secondSpiral = new Scene();
secondSpiral.privateValues.paletteIndex = 11;
secondSpiral.runBackground = firstSpiral.runBackground;
secondSpiral.runLayout = firstSpiral.runLayout;
secondSpiral.runPositions = firstSpiral.runPositions;
secondSpiral.runSizes = firstSpiral.runSizes;
secondSpiral.runColors = function(t) {
    if (!this.privateValues.paletteIndex) {
        this.privateValues.paletteIndex = 1000;
    }
    if (!this.privateValues.paletteIndex2) {
        this.privateValues.paletteIndex2 = 3008;
        //Très beau aussi.
        //this.privateValues.paletteIndex2 = 3014;
    }

    if (allPalettes) {
        this.privateValues.palette = allPalettes[this.privateValues.paletteIndex];
        this.privateValues.palette2 = allPalettes[this.privateValues.paletteIndex2];
    } else {
        this.privateValues.palette = palette;
        this.privateValues.palette2 = palette;
    }

    this.privateValues.colorGraph = [];
    var currentColor = 0;
    for (var i = 0; i < 1000; i++) {
        var colorValues1 = hexToRgb(this.privateValues.palette[currentColor]);
        var colorValues2 = hexToRgb(this.privateValues.palette2[currentColor]);
        var lerpy = map(sin(t / 10), -1, 1, 0, 1);
        var colorValues = {
            r: lerp(colorValues1.r, colorValues2.r, lerpy),
            g: lerp(colorValues1.g, colorValues2.g, lerpy),
            b: lerp(colorValues1.b, colorValues2.b, lerpy)
        };
        currentColor++;
        if (currentColor > 4) {
            currentColor = 0;
        }
        this.privateValues.colorGraph.push(colorValues);
    }
};

var thirdSpiral = new Scene();
thirdSpiral.privateValues.paletteIndex = 15;
thirdSpiral.runBackground = firstSpiral.runBackground;
thirdSpiral.runLayout = firstSpiral.runLayout;
thirdSpiral.runPositions = firstSpiral.runPositions;
thirdSpiral.runSizes = firstSpiral.runSizes;
thirdSpiral.runColors = function(t) {
    if (!this.privateValues.paletteIndex) {
        this.privateValues.paletteIndex = 1000;
    }
    if (!this.privateValues.paletteIndex2) {
        this.privateValues.paletteIndex2 = 3008;
        //Très beau aussi.
        //this.privateValues.paletteIndex2 = 3014;
    }

    if (allPalettes) {
        this.privateValues.palette = allPalettes[this.privateValues.paletteIndex];
        this.privateValues.palette2 = allPalettes[this.privateValues.paletteIndex2];
    } else {
        this.privateValues.palette = palette;
        this.privateValues.palette2 = palette;
    }

    this.privateValues.colorGraph = [];
    var currentColor = 0;
    for (var i = 0; i < 1000; i++) {
        var colorValues1 = hexToRgb(this.privateValues.palette[currentColor]);
        var colorValues2 = hexToRgb(this.privateValues.palette2[currentColor]);
        var lerpy = map(sin(t / 10), -1, 1, 0, 1);
        var colorValues = {
            r: lerp(colorValues1.r, colorValues2.r, lerpy),
            g: lerp(colorValues1.g, colorValues2.g, lerpy),
            b: lerp(colorValues1.b, colorValues2.b, lerpy)
        };
        currentColor++;
        if (currentColor > 4) {
            currentColor = 0;
        }
        this.privateValues.colorGraph.push(colorValues);
    }
};

var fourthSpiral = new Scene();
fourthSpiral.privateValues.paletteIndex = 17;
fourthSpiral.runBackground = firstSpiral.runBackground;
fourthSpiral.runLayout = firstSpiral.runLayout;
fourthSpiral.runPositions = firstSpiral.runPositions;
fourthSpiral.runSizes = firstSpiral.runSizes;



//--------------------------------------------------------------------------------------------//


var firstParticle = new Scene();
firstParticle.privateValues.paletteIndex = 18;

firstParticle.runBackground = function(t) {
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 155,
        g: 150,
        b: 55
    }, {
        offset: step,
        r: 155,
        g: 100,
        b: 50
    }, {
        offset: 0.8,
        r: 0,
        g: 0,
        b: 150
    }];
};

firstParticle.runLayout = function(t) {
    this.localValues.zoom = 1.58;
    this.localValues.rotation = 0;
};

firstParticle.runPositions = function(t) {
    this.privateValues.scalar = 3.158;
    this.speed = 0.58;
    this.accMult = 0.756;
    this.velMult = 0.999;
    this.sc = 20;
    this.scPow = 7;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: 0,
        n3: 1,
        a: 1,
        b: 1,
        m: 26
    };

    this.privateValues.graphs = this.particle.run(this, t);
    this.privateValues.posGraph = this.privateValues.graphs.g;
    this.localValues.yellowGraph = this.privateValues.graphs.yellowGraph;
};

firstParticle.runSizes = function(t) {
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var s = 2.5;
        this.localValues.sizes.push(s);
    }
};

//--------------------------------------------------------------------------------------------//

var octoSpiral = new Scene();
octoSpiral.runBackground = userControlledSpiral.runBackground;

// L'originale
octoSpiral.privateValues.paletteIndex = 40;

//La nouvelle
octoSpiral.privateValues.paletteIndex = 96;

// octoSpiral.runLayout = firstSpiral.runLayout;

octoSpiral.runLayout = function(t) {
    this.localValues.zoom = 2;
    this.localValues.rotation = 0.01;
};

octoSpiral.runPositions = function(t) {
    this.privateValues.scalar = 10;

    this.speed = sliders.speed.value;
    this.accMult = sliders.accMult.value;
    this.velMult = sliders.velMult.value;
    this.sc = sliders.sc.value;
    this.scPow = sliders.scPow.value;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: sliders.n2.value,
        n3: 1,
        a: 1,
        b: 1,
        m: sliders.m.value
    };
    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 0,
            angle: 0,
            speed: 0.05 / 360 * Math.PI * 2 / 10
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.spiGraph = octogonalSpiral(this, t);

    this.privateValues.parGraph = this.particle.run(this, t);

    this.privateValues.posGraph = [];

    var lerpTiming = map(drawCount, 1200, 1440, 0, 0.005);
    lerpTiming = constrain(lerpTiming, 0, 1);
    for (var i = 0; i < 1000; i++) {
        var x = this.privateValues.spiGraph[i].x;
        var y = this.privateValues.spiGraph[i].y;
        var xx = this.privateValues.parGraph.g[i].x;
        var yy = this.privateValues.parGraph.g[i].y;
        var lerpX = lerp(x, xx, lerpTiming);
        var lerpY = lerp(y, yy, lerpTiming);
        var v = createVector(lerpX, lerpY);
        this.privateValues.posGraph.push(v);
    }
};

octoSpiral.runSizes = function(t) {
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var s = 40;
        this.localValues.sizes.push(s);
    }
};

//--------------------------------------------------------------------------------------------//

var triangularSpiral = new Scene();
triangularSpiral.runBackground = function(t) {
    var step = map(abs(sin(t / 100)), 0, 1, 0.15, 0.2);
    this.localValues.gradient = [{
        offset: 0,
        r: 155,
        g: 150,
        b: 55
    }, {
        offset: step,
        r: 155,
        g: 0,
        b: 0
    }, {
        offset: 0.8,
        r: 0,
        g: 0,
        b: 0
    }];
};



// gradient.addColorStop(0, "rgba(0,255," + col + ",255)");
// gradient.addColorStop(step, "rgba(" + col + ",255,0,255)");
// gradient.addColorStop(0.7, "rgba(255,0," + col2 + ",255)");


triangularSpiral.privateValues.paletteIndex = 50;
// octoSpiral.runLayout = firstSpiral.runLayout;

triangularSpiral.runLayout = function(t) {
    this.localValues.zoom = 2;
    this.localValues.rotation = 0.01;
};

triangularSpiral.runPositions = function(t) {
    if (!this.privateValues.scalar) {
        this.privateValues.scalar = 55;
    }

    this.accMult = sliders.accMult.value;
    this.velMult = sliders.velMult.value;
    this.sc = sliders.sc.value;
    this.scPow = sliders.scPow.value;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: sliders.n2.value,
        n3: 1,
        a: 1,
        b: 1,
        m: sliders.m.value
    };

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 0.5,
            angle: 2,
            speed: 0.05 / 360 * Math.PI * 2 /  20
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = triSpiral(this, t);
};

triangularSpiral.runSizes = function(t) {
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var s = 5 + i / 20;
        this.localValues.sizes.push(s);
    }
};
//--------------------------------------------------------------------------------------------//



var triangularSpiral2 = new Scene();

triangularSpiral2.privateValues.scalar = 25;

triangularSpiral2.runBackground = function(t) {
    var col = floor(map(abs(sin(t / 20)), 0, 1, 0, 255));
    var col2 = floor(map(abs(sin(t / 40)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 0,
        g: 255,
        b: col
    }, {
        offset: step,
        r: col,
        g: 255,
        b: 0
    }, {
        offset: 0.7,
        r: 255,
        g: 0,
        b: col2
    }];
};

triangularSpiral2.privateValues.paletteIndex = 76;
triangularSpiral2.runLayout = triangularSpiral.runLayout;
triangularSpiral2.runPositions = triangularSpiral.runPositions;
triangularSpiral2.runSizes = function(t) {
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var s = 5 + i / 20;
        this.localValues.sizes.push(s);
    }
};
triangularSpiral2.runColors = function(t) {
    if (!this.privateValues.paletteIndex) {
        this.privateValues.paletteIndex = 76;
    }
    if (!this.privateValues.paletteIndex2) {
        //3056, 3012
        this.privateValues.paletteIndex2 = 3056;
        //Très beau aussi.
        //this.privateValues.paletteIndex2 = 3014;
    }

    if (allPalettes) {
        this.privateValues.palette = allPalettes[this.privateValues.paletteIndex];
        this.privateValues.palette2 = allPalettes[this.privateValues.paletteIndex2];
    } else {
        this.privateValues.palette = palette;
        this.privateValues.palette2 = palette;
    }

    this.privateValues.colorGraph = [];
    var currentColor = 0;
    for (var i = 0; i < 1000; i++) {
        var colorValues1 = hexToRgb(this.privateValues.palette[currentColor]);
        var colorValues2 = hexToRgb(this.privateValues.palette2[currentColor]);
        var lerpy = map(sin(t / 10), -1, 1, 0, 1);
        var colorValues = {
            r: lerp(colorValues1.r, colorValues2.r, lerpy),
            g: lerp(colorValues1.g, colorValues2.g, lerpy),
            b: lerp(colorValues1.b, colorValues2.b, lerpy)
        };
        currentColor++;
        if (currentColor > 4) {
            currentColor = 0;
        }
        this.privateValues.colorGraph.push(colorValues);
    }
};

//--------------------------------------------------------------------------------------------//


var starSpiral = new Scene();

starSpiral.runBackground = function(t) {
    var col = floor(map(abs(sin(t / 20)), 0, 1, 0, 255));
    var col2 = floor(map(abs(sin(t / 40)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 0,
        g: 55,
        b: col
    }, {
        offset: step,
        r: col,
        g: 55,
        b: 0
    }, {
        offset: 0.7,
        r: 55,
        g: 0,
        b: col2
    }];
};

starSpiral.privateValues.paletteIndex = 96;
starSpiral.runLayout = function(t) {
    this.localValues.zoom = 1;
    this.localValues.rotation = 0.01;
};
starSpiral.runPositions = function(t) {
    if (!this.privateValues.scalar) {
        this.privateValues.scalar = 25;
    }

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 0.1,
            angle: 2,
            speed: 0.05 / 360 * Math.PI * 2 /  40
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = starrySpiral(this, t);
};
starSpiral.runSizes = function(t) {
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var s = map(i, 0, 1000, 50, 0);
        this.localValues.sizes.push(s);
    }
};


//--------------------------------------------------------------------------------------------//

var starSpiral2 = new Scene();
starSpiral2.runBackground = function(t) {
    var col = floor(map(abs(sin(t / 20)), 0, 1, 0, 255));
    var col2 = floor(map(abs(cos(t / 40)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: 255,
        b: 0
    }, {
        offset: step,
        r: 255,
        g: col2,
        b: 55
    }, {
        offset: 0.7,
        r: 5,
        g: 120,
        b: col2
    }];
};
// starSpiral2.privateValues.scalar = 10;
starSpiral2.privateValues.paletteIndex = 116;
starSpiral2.privateValues.paletteIndex2 = 3052;
starSpiral2.runLayout = function(t) {
    this.localValues.zoom = 1.25;
    this.localValues.rotation = 0.01;
};
starSpiral2.runPositions = function(t) {
    if (!this.privateValues.scalar) {
        this.privateValues.scalar = 55;
    }

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 0.25,
            angle: 2,
            speed: 0.05 / 360 * Math.PI * 2 / 5,
            hyp: 0.02
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = starrySpiral2(this, t);
};
// starSpiral2.runSizes = starSpiral.runSizes;

starSpiral2.runSizes = function(t) {
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var s = 10 + map(i, 0, 1000, 0, 200);
        this.localValues.sizes.push(s);
    }
};

// starSpiral2.runSizes = function(t) {
//     var pos = this.privateValues.posGraph;
//     this.localValues.sizes = [];
//     for (var i = 0; i < 1000; i++) {
//         var currentPos = dist(0, 0, pos[i].x, pos[i].y);
//         var s = 10 + map(currentPos, 0, 1000, 0, 350);
//         this.localValues.sizes.push(s);
//     }
// };
starSpiral2.runColors = function(t) {
    if (!this.privateValues.paletteIndex) {
        this.privateValues.paletteIndex = 1000;
    }
    if (!this.privateValues.paletteIndex2) {
        this.privateValues.paletteIndex2 = 3008;
        //Très beau aussi.
        //this.privateValues.paletteIndex2 = 3014;
    }

    if (allPalettes) {
        this.privateValues.palette = allPalettes[this.privateValues.paletteIndex];
        this.privateValues.palette2 = allPalettes[this.privateValues.paletteIndex2];
    } else {
        this.privateValues.palette = palette;
        this.privateValues.palette2 = palette;
    }

    this.privateValues.colorGraph = [];
    var currentColor = 0;
    for (var i = 0; i < 1000; i++) {
        var colorValues1 = hexToRgb(this.privateValues.palette[currentColor]);
        var colorValues2 = hexToRgb(this.privateValues.palette2[currentColor]);
        var lerpy = map(sin(t / 10), -1, 1, 0, 1);
        var colorValues = {
            r: lerp(colorValues1.r, colorValues2.r, lerpy),
            g: lerp(colorValues1.g, colorValues2.g, lerpy),
            b: lerp(colorValues1.b, colorValues2.b, lerpy)
        };
        currentColor++;
        if (currentColor > 4) {
            currentColor = 0;
        }
        this.privateValues.colorGraph.push(colorValues);
    }
};

//--------------------------------------------------------------------------------------------//

var superellipseSpiral = new Scene();
superellipseSpiral.runBackground = function(t) {
    var col = floor(map(abs(sin(t / 20)), 0, 1, 0, 255));
    var col2 = floor(map(abs(cos(t / 40)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: 155,
        b: col
    }, {
        offset: step,
        r: col,
        g: col2,
        b: 255
    }, {
        offset: 0.7,
        r: 55,
        g: 0,
        b: col2
    }];
};
superellipseSpiral.privateValues.scalar = 10;
superellipseSpiral.privateValues.paletteIndex = 96;
superellipseSpiral.runLayout = starSpiral.runLayout;
superellipseSpiral.runPositions = function(t) {
    if (!this.privateValues.scalar) {
        this.privateValues.scalar = 25;
    }

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 0.135,
            angle: 2,
            speed: 0.05 / 360 * Math.PI * 2 /  10
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = pseudoSuperellipseSpiral(this, t);
};
superellipseSpiral.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        var s = 10 + map(currentPos, 0, 1000, 0, 150);
        this.localValues.sizes.push(s);
    }
};
superellipseSpiral.runColors = function(t) {
    if (!this.privateValues.paletteIndex) {
        this.privateValues.paletteIndex = 1000;
    }
    if (!this.privateValues.paletteIndex2) {
        this.privateValues.paletteIndex2 = 3008;
        //Très beau aussi.
        //this.privateValues.paletteIndex2 = 3014;
    }

    if (allPalettes) {
        this.privateValues.palette = allPalettes[this.privateValues.paletteIndex];
        this.privateValues.palette2 = allPalettes[this.privateValues.paletteIndex2];
    } else {
        this.privateValues.palette = palette;
        this.privateValues.palette2 = palette;
    }

    this.privateValues.colorGraph = [];
    var currentColor = 0;
    for (var i = 0; i < 1000; i++) {
        var colorValues1 = hexToRgb(this.privateValues.palette[currentColor]);
        var colorValues2 = hexToRgb(this.privateValues.palette2[currentColor]);
        var lerpy = map(sin(t / 10), -1, 1, 0, 1);
        var colorValues = {
            r: lerp(colorValues1.r, colorValues2.r, lerpy),
            g: lerp(colorValues1.g, colorValues2.g, lerpy),
            b: lerp(colorValues1.b, colorValues2.b, lerpy)
        };
        currentColor++;
        if (currentColor > 4) {
            currentColor = 0;
        }
        this.privateValues.colorGraph.push(colorValues);
    }
};

//--------------------------------------------------------------------------------------------//

superellipseSpiral2 = new Scene();

superellipseSpiral2.runBackground = function(t) {
    var col = floor(map(abs(sin(t / 20)), 0, 1, 0, 255));
    var col2 = floor(map(abs(cos(t / 40)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: 255,
        b: col
    }, {
        offset: step,
        r: 255,
        g: col2,
        b: col
    }, {
        offset: 0.7,
        r: 255,
        g: col,
        b: col2
    }];
};
superellipseSpiral2.privateValues.scalar = 6;
superellipseSpiral2.privateValues.paletteIndex = 100;
superellipseSpiral2.privateValues.paletteIndex2 = 3012;
superellipseSpiral2.runLayout = function(t) {
    this.localValues.zoom = 1;
    this.localValues.rotation = 0.01;
};
superellipseSpiral2.runPositions = function(t) {
    if (!this.privateValues.scalar) {
        this.privateValues.scalar = 25;
    }

    this.speed = sliders.speed.value;
    this.accMult = sliders.accMult.value;
    this.velMult = sliders.velMult.value;
    this.sc = sliders.sc.value;
    this.scPow = sliders.scPow.value;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: sliders.n2.value,
        n3: 1,
        a: 1,
        b: 1,
        m: sliders.m.value
    };

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: -0.103,
            angle: 2,
            speed: 0.05 / 360 * Math.PI * 2 /  2
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.spiGraph = pseudoSuperellipseSpiral2(this, t);
    this.privateValues.parGraph = this.particle.run(this, t);

    this.privateValues.posGraph = [];
    for (var i = 0; i < 1000; i++) {
        var x = this.privateValues.spiGraph[i].x;
        var y = this.privateValues.spiGraph[i].y;
        var xx = this.privateValues.parGraph.g[i].x;
        var yy = this.privateValues.parGraph.g[i].y;
        var lerpX = lerp(x, xx, 0.01);
        var lerpY = lerp(y, yy, 0.01);
        var v = createVector(lerpX, lerpY);
        this.privateValues.posGraph.push(v);
    }
};
superellipseSpiral2.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        // var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        // var s = 10 + map(currentPos, 0, 1000, 0, 150);
        var s = 40 + i / 8;
        this.localValues.sizes.push(s);
    }
};
superellipseSpiral2.runColors = superellipseSpiral.runColors;


//--------------------------------------------------------------------------------------------//

var octoSpiral2 = new Scene();
octoSpiral2.privateValues.paletteIndex = 1150;
octoSpiral2.privateValues.paletteIndex2 = 3028;
octoSpiral2.runBackground = function(t) {
    var col = floor(map(abs(cos(t / 20)), 0, 1, 0, 255));
    var col2 = floor(map(abs(cos(t / 40)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: col,
        b: 150
    }, {
        offset: step,
        r: 255,
        g: col2,
        b: 50
    }, {
        offset: 0.7,
        r: col2,
        g: 255,
        b: 150
    }];
};
// octoSpiral2.privateValues.paletteIndex = 40;
// octoSpiral.runLayout = firstSpiral.runLayout;
octoSpiral2.runColors = superellipseSpiral.runColors;

octoSpiral2.runLayout = function(t) {
    this.localValues.zoom = 1;
    this.localValues.rotation = 0.1;
};

octoSpiral2.runPositions = function(t) {
    this.privateValues.scalar = 20;

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 0,
            angle: 0,
            speed: 0.05 / 360 * Math.PI * 2 /  2.5
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = octogonalSpiral(this, t);
};

// octoSpiral2.runSizes = function(t) {
//     this.localValues.sizes = [];
//     for (var i = 0; i < 1000; i++) {
//         var s = 20;
//         this.localValues.sizes.push(s);
//     }
// };
octoSpiral2.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        var s = 10 + map(currentPos, 0, 1000, 0, 200);
        this.localValues.sizes.push(s);
    }
};

//--------------------------------------------------------------------------------------------//

var fastSpiral = new Scene();
fastSpiral.privateValues.paletteIndex = 1150;
fastSpiral.privateValues.paletteIndex2 = 3028;
fastSpiral.runBackground = function(t) {
    var col = floor(map(abs(cos(t / 5)), 0, 1, 0, 255));
    var col2 = floor(map(abs(cos(t / 10)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 5)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: col,
        b: 150
    }, {
        offset: step,
        r: 255,
        g: col2,
        b: 50
    }, {
        offset: 0.7,
        r: col2,
        g: 255,
        b: 150
    }];
};
// octoSpiral2.privateValues.paletteIndex = 40;
// octoSpiral.runLayout = firstSpiral.runLayout;
fastSpiral.runColors = superellipseSpiral.runColors;

fastSpiral.runLayout = function(t) {
    this.localValues.zoom = 1;
    this.localValues.rotation = 0.1;
};

fastSpiral.runPositions = function(t) {
    var sc = map(sin(t / 7), -1, 1, 5, 175);
    this.privateValues.scalar = sc;

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: -3.6,
            angle: 0,
            speed: 0.05 / 360 * Math.PI * 5
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t / 1000 + t * spiralVal.speed * -1;
    this.privateValues.posGraph = spiral(this, t);
};

// octoSpiral2.runSizes = function(t) {
//     this.localValues.sizes = [];
//     for (var i = 0; i < 1000; i++) {
//         var s = 20;
//         this.localValues.sizes.push(s);
//     }
// };
fastSpiral.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        var s = 10 + map(currentPos, 0, 1000, 0, 400);
        this.localValues.sizes.push(s);
    }
};

//--------------------------------------------------------------------------------------------//

var fastSpiral2 = new Scene();
fastSpiral2.privateValues.paletteIndex = 0;
fastSpiral2.privateValues.paletteIndex2 = 58;
fastSpiral2.runBackground = function(t) {
    var col = floor(map(abs(cos(t / 5)), 0, 1, 0, 255));
    var col2 = floor(map(abs(cos(t / 10)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 5)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: col,
        b: 150
    }, {
        offset: step,
        r: 255,
        g: col2,
        b: 50
    }, {
        offset: 0.7,
        r: col2,
        g: 255,
        b: 150
    }];
};
// octoSpiral2.privateValues.paletteIndex = 40;
// octoSpiral.runLayout = firstSpiral.runLayout;
fastSpiral2.runColors = superellipseSpiral.runColors;

fastSpiral2.runLayout = function(t) {
    this.localValues.zoom = 1;
    this.localValues.rotation = 0.1;
};

fastSpiral2.runPositions = function(t) {
    this.privateValues.paletteIndex += 2;
    this.privateValues.paletteIndex2 += 2;
    var sc = map(sin(t / 4), -1, 1, 5, 175);
    this.privateValues.scalar = sc;

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: -3.6,
            angle: 0,
            speed: 0.05 / 360 * Math.PI * 50
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t / 1000 + t * spiralVal.speed * -1;
    this.privateValues.posGraph = spiral(this, t);
};

// octoSpiral2.runSizes = function(t) {
//     this.localValues.sizes = [];
//     for (var i = 0; i < 1000; i++) {
//         var s = 20;
//         this.localValues.sizes.push(s);
//     }
// };
fastSpiral2.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        var s = 10 + map(currentPos, 0, 1000, 0, 400);
        this.localValues.sizes.push(s);
    }
};

//--------------------------------------------------------------------------------------------//
var exitSpiral = new Scene();
exitSpiral.privateValues.paletteIndex = 3500;

exitSpiral.runBackground = function(t) {
    var col = floor(map(abs(cos(t / 20)), 0, 1, 0, 255));
    var col2 = floor(map(abs(cos(t / 40)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: col,
        b: 150
    }, {
        offset: step,
        r: 255,
        g: col2,
        b: 50
    }, {
        offset: 0.7,
        r: col2,
        g: 255,
        b: 150
    }];
};

exitSpiral.runLayout = function(t) {
    // var z = map(t, 0, 1000, 1, 0.8);
    // z = constrain(z, 0.1, 1);
    this.localValues.zoom = 0.5;
    this.localValues.rotation = 0.1;
};

exitSpiral.runPositions = function(t) {
    this.privateValues.scalar = 20;

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: -0.09,
            angle: 0,
            speed: 0.05 / 360 * Math.PI * 0.5,
            hyp: 8
        };
    }
    // var coFade = cosineFade(-4600, 500);
    // this.privateValues.spiral.hyp = map(coFade, 0, 1, 0.1, 8);
    // // console.log(this.privateValues.spiral.hyp);
    // this.privateValues.spiral.hyp = constrain(this.privateValues.spiral.hyp, 0.1, 8);
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = spiral(this, t);
};

exitSpiral.runColors = function(t) {
    if (!this.privateValues.paletteIndex) {
        this.privateValues.paletteIndex = 1000;
    }
    if (!this.privateValues.paletteIndex2) {
        this.privateValues.paletteIndex2 = 3008;
        //Très beau aussi.
        //this.privateValues.paletteIndex2 = 3014;
    }

    if (allPalettes) {
        this.privateValues.palette = allPalettes[this.privateValues.paletteIndex];
        this.privateValues.palette2 = allPalettes[this.privateValues.paletteIndex2];
    } else {
        this.privateValues.palette = palette;
        this.privateValues.palette2 = palette;
    }

    this.privateValues.colorGraph = [];
    var currentColor = 0;
    for (var i = 0; i < 1000; i++) {
        var colorValues1 = hexToRgb(this.privateValues.palette[currentColor]);
        var colorValues2 = hexToRgb(this.privateValues.palette2[currentColor]);
        var lerpy = map(sin(t / 10), -1, 1, 0, 1);
        var colorValues = {
            r: lerp(colorValues1.r, colorValues2.r, lerpy),
            g: lerp(colorValues1.g, colorValues2.g, lerpy),
            b: lerp(colorValues1.b, colorValues2.b, lerpy)
        };
        currentColor++;
        if (currentColor > 4) {
            currentColor = 0;
        }
        this.privateValues.colorGraph.push(colorValues);
    }
};


exitSpiral.runSizes = function(t) {
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var s = 200;
        this.localValues.sizes.push(s);
    }
};


//--------------------------------------------------------------------------------------------//
var exitSpiral2 = new Scene();
exitSpiral2.privateValues.paletteIndex = 3522;

exitSpiral2.runBackground = function(t) {
    var col = floor(map(abs(cos(t / 20)), 0, 1, 0, 255));
    var col2 = floor(map(abs(cos(t / 40)), 0, 1, 0, 255));
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: col / 2,
        b: 150
    }, {
        offset: step,
        r: 255,
        g: col2 / 2,
        b: 50
    }, {
        offset: 0.7,
        r: col2,
        g: 55,
        b: 150
    }];
};

exitSpiral2.runLayout = function(t) {
    // var z = map(t, 0, 1000, 1, 0.8);
    // z = constrain(z, 0.1, 1);
    this.localValues.zoom = 0.01;
    this.localValues.rotation = 0.1;
};
exitSpiral2.runPositions = exitSpiral.runPositions;

exitSpiral2.runColors = function(t) {
    if (!this.privateValues.paletteIndex) {
        this.privateValues.paletteIndex = 1000;
    }
    if (!this.privateValues.paletteIndex2) {
        this.privateValues.paletteIndex2 = 3044;
        //Très beau aussi.
        //this.privateValues.paletteIndex2 = 3014;
    }

    if (allPalettes) {
        this.privateValues.palette = allPalettes[this.privateValues.paletteIndex];
        this.privateValues.palette2 = allPalettes[this.privateValues.paletteIndex2];
    } else {
        this.privateValues.palette = palette;
        this.privateValues.palette2 = palette;
    }

    this.privateValues.colorGraph = [];
    var currentColor = 0;
    for (var i = 0; i < 1000; i++) {
        var colorValues1 = hexToRgb(this.privateValues.palette[currentColor]);
        var colorValues2 = hexToRgb(this.privateValues.palette2[currentColor]);
        var lerpy = map(sin(t / 10), -1, 1, 0, 1);
        var colorValues = {
            r: lerp(colorValues1.r, colorValues2.r, lerpy),
            g: lerp(colorValues1.g, colorValues2.g, lerpy),
            b: lerp(colorValues1.b, colorValues2.b, lerpy)
        };
        currentColor++;
        if (currentColor > 4) {
            currentColor = 0;
        }
        this.privateValues.colorGraph.push(colorValues);
    }
};

exitSpiral2.runSizes = exitSpiral.runSizes;

//-----------------------------------------Version 0.05---------------------------------------------//
var autumnSpiral = new Scene();

// spiderSpiral.runBackground = userControlledSpiral.runBackground;
autumnSpiral.runBackground = function(t) {
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: 255,
        b: 0
    }, {
        offset: step,
        r: 255,
        g: 120,
        b: 0
    }, {
        offset: 0.8,
        r: 155,
        g: 55,
        b: 250
    }];
};
// autumnSpiral.privateValues.paletteIndex = 1244;
autumnSpiral.privateValues.paletteIndex = 1300;
autumnSpiral.runLayout = function(t) {
    this.localValues.zoom = 1;
    this.localValues.rotation = 0.01;
};

autumnSpiral.runPositions = function(t) {
    this.privateValues.scalar = 30;
    this.accMult = sliders.accMult.value;
    this.velMult = sliders.velMult.value;
    this.sc = sliders.sc.value;
    this.scPow = sliders.scPow.value;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: sliders.n2.value,
        n3: 1,
        a: 1,
        b: 1,
        m: sliders.m.value
    };

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 20,
            angle: 3,
            speed: 0.05 / 360 * Math.PI * 2 /  10,
            hyp: 0.1
        };
    }
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = starrySpiralOctober(this, t);
};

autumnSpiral.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        var s = 10 + map(currentPos, 0, 1000, 0, 300);
        this.localValues.sizes.push(s);
    }
};


//-----------------------------------------Version 0.05---------------------------------------------//
var autumnSpiral2 = new Scene();

// spiderSpiral.runBackground = userControlledSpiral.runBackground;
autumnSpiral2.runBackground = function(t) {
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: 255,
        b: 0
    }, {
        offset: step,
        r: 255,
        g: 120,
        b: 0
    }, {
        offset: 0.8,
        r: 155,
        g: 55,
        b: 250
    }];
};
// autumnSpiral.privateValues.paletteIndex = 1244;
// autumnSpiral2.privateValues.paletteIndex = 1304;
// autumnSpiral2.privateValues.paletteIndex = 1398;
autumnSpiral2.privateValues.paletteIndex = 1472;
autumnSpiral2.runLayout = function(t) {
    this.localValues.zoom = 1;
    this.localValues.rotation = 0.01;
};

autumnSpiral2.runPositions = function(t) {
    this.privateValues.scalar = 30;
    this.accMult = sliders.accMult.value;
    this.velMult = sliders.velMult.value;
    this.sc = sliders.sc.value;
    this.scPow = sliders.scPow.value;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: sliders.n2.value,
        n3: 1,
        a: 1,
        b: 1,
        m: sliders.m.value
    };

    //Taken from spiderSpiral
    // if (!this.privateValues.spiral) {
    //     this.privateValues.spiral = {
    //         startingAngle: 2,
    //         angle: 2,
    //         speed: 0.05 / 360 * Math.PI * 2 /  50,
    //         hyp: 0.1
    //     };
    // }

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 0.9786,
            angle: 0.9786,
            speed: 0.05 / 360 * Math.PI * 2 /  12,
            hyp: 0.1
        };
    }
    // console.log(this.privateValues.spiral.angle);
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = pseudoSuperellipseSpiral3(this, t);
};

autumnSpiral2.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        var s = 10 + map(currentPos, 0, 1000, 0, 200);
        this.localValues.sizes.push(s);
    }
};

//-----------------------------------------Version 0.05---------------------------------------------//
var autumnSpiral3 = new Scene();

// spiderSpiral.runBackground = userControlledSpiral.runBackground;
autumnSpiral3.runBackground = function(t) {
    var step = map(abs(sin(t / 20)), 0, 1, 0.1, 0.3);
    this.localValues.gradient = [{
        offset: 0,
        r: 255,
        g: 255,
        b: 155
    }, {
        offset: step,
        r: 155,
        g: 120,
        b: 205
    }, {
        offset: 0.8,
        r: 35,
        g: 35,
        b: 130
    }];
};
// autumnSpiral.privateValues.paletteIndex = 1244;
// autumnSpiral2.privateValues.paletteIndex = 1304;
// autumnSpiral2.privateValues.paletteIndex = 1398;
// autumnSpiral3.privateValues.paletteIndex = 1472;
// autumnSpiral3.privateValues.paletteIndex = 2586;


autumnSpiral3.runColors = function(t) {
    if (!this.privateValues.paletteIndex) {
        this.privateValues.paletteIndex = 2586;
    }

    if (allPalettes) {
        this.privateValues.palette = allPalettes[this.privateValues.paletteIndex];
    } else {
        this.privateValues.palette = palette;
    }

    this.privateValues.colorGraph = [];
    var currentColor = 0;
    for (var i = 0; i < 1000; i++) {
        var colorValues = hexToRgb(this.privateValues.palette[currentColor]);
        var lev = sliders.levels.value;
        colorValues.r = constrain(map(colorValues.r, 0, 255, lev, 255), 0, 255);
        colorValues.g = constrain(map(colorValues.g, 0, 255, lev, 255), 0, 255);
        colorValues.b = constrain(map(colorValues.b, 0, 255, lev, 255), 0, 255);
        currentColor++;
        if (currentColor > 4) {
            currentColor = 0;
        }
        this.privateValues.colorGraph.push(colorValues);
    }
};


autumnSpiral3.runLayout = function(t) {
    this.localValues.zoom = 0.12;
    this.localValues.rotation = 0.01;
};

autumnSpiral3.runPositions = function(t) {
    this.privateValues.scalar = 30;
    this.accMult = sliders.accMult.value;
    this.velMult = sliders.velMult.value;
    this.sc = sliders.sc.value;
    this.scPow = sliders.scPow.value;
    this.privateValues.shape = shape;

    this.superformula = {
        n1: map(abs(sin(t / (sliders.sc.value * pow(10, sliders.scPow.value)))), 0, 1, 0.15, 2),
        n2: sliders.n2.value,
        n3: 1,
        a: 1,
        b: 1,
        m: sliders.m.value
    };

    //Taken from spiderSpiral
    // if (!this.privateValues.spiral) {
    //     this.privateValues.spiral = {
    //         startingAngle: 2,
    //         angle: 2,
    //         speed: 0.05 / 360 * Math.PI * 2 /  50,
    //         hyp: 0.1
    //     };
    // }

    if (!this.privateValues.spiral) {
        this.privateValues.spiral = {
            startingAngle: 0.786,
            angle: 0,
            speed: 0.05 / 360 * Math.PI * 2,
            hyp: 0.1
        };
    }
    // console.log(this.privateValues.spiral.angle);
    var spiralVal = this.privateValues.spiral;
    this.privateValues.spiral.angle = spiralVal.startingAngle + t * spiralVal.speed * -1;

    this.privateValues.posGraph = starrySpiralOctober2(this, t);
};

autumnSpiral3.runSizes = function(t) {
    var pos = this.privateValues.posGraph;
    this.localValues.sizes = [];
    for (var i = 0; i < 1000; i++) {
        var currentPos = dist(0, 0, pos[i].x, pos[i].y);
        var s = 20 + map(currentPos, 0, 1000, 0, 200);
        this.localValues.sizes.push(s);
    }
};
