function Particle() {
    this.pos = new p5.Vector(0, 0);
    this.vel = new p5.Vector(0, 0);

    this.reset = function() {
        this.pos = new p5.Vector(0, 0);
        this.vel = new p5.Vector(0, 0);
    }

    this.update = function(controller, vec, offset) {
        this.acc = p5.Vector.sub(vec, this.pos);
        if (norma) {
            this.acc.normalize();
        }
        this.acc.mult(controller.accMult);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.mult(controller.velMult);
    }
}

Particle.prototype.run = function(controller, t) {
    var scalar = controller.privateValues.scalar;
    var g = [];
    var yellowGraph = [];
    for (var i = 0; i < 1000; i++) {
        var tt = (1000 * t + i) * controller.speed;
        var v = controller.privateValues.shape.runEquation(controller, tt);
        yellowGraph.push(v);
        this.update(controller, v, t);
        var vec = createVector(this.pos.x * scalar, this.pos.y * scalar);
        g.push(vec);

    }
    return {
        g: g,
        yellowGraph: yellowGraph
    }
};

function spiral(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;
    for (var j = 0; j < 1000; j++) {
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);
        x += cos(angleTrig + angleTrig * j) * (hyp + (j / 50));
        y += sin(angleTrig + angleTrig * j) * (hyp + (j / 50));
    }
    return graph;
}

function octogonalSpiral(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;
    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);
        x += cos(t) * cos(t * 4) * cos(t * 4) * (hyp + (j / 50));
        y += sin(t) * cos(t * 4) * cos(t * 4) * (hyp + (j / 50));
    }
    return graph;
}

function spiderWebSpiral(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t) * cos(t * 1) * cos(t * 0.5) * (hyp + (j / 50));
        y += sin(t) * cos(t * 1) * cos(t * 0.5) * (hyp + (j / 50));

    }
    return graph;
}

function triSpiral(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t) * pow(cos(t * 3), 1) * (hyp + (j / 50));
        y += sin(t) * pow(cos(t * 3), 1) * (hyp + (j / 50));
    }
    return graph;
}

function starrySpiral(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t) * pow(cos(t * 4), 1) * (hyp + (j / 50));
        y += sin(t) * pow(cos(t * 4), 1) * (hyp + (j / 50));

    }
    return graph;
}

function nonCrossingStarSpiral(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t) * cos(t * 2) * cos(t * 2) * sin(t * 2) * (hyp + (j / 50));
        y += sin(t) * cos(t * 2) * cos(t * 2) * sin(t * 2) * (hyp + (j / 50));


    }
    return graph;
}

function pseudoSuperellipseSpiral(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t) * cos(t * 2) * cos(t * 2) * (hyp + (j / 50));
        y += sin(t) * cos(t * 2) * cos(t * 2) * (hyp + (j / 50));


    }
    return graph;
}

function pseudoSuperellipseSpiral2(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t) * sin(t * 0.5) * (hyp + (j / 50));
        y += sin(t) * sin(t * 0.5) * (hyp + (j / 50));


    }
    return graph;
}


function pseudoSuperellipseSpiral3(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t / 2) * cos(t * 2) * cos(t * 2) * (hyp + (j / 50));
        y += sin(t / 2) * cos(t * 2) * cos(t * 2) * (hyp + (j / 50));


    }
    return graph;
}



function tiltedSquareSpiral(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t) * cos(t * 7.5) * cos(t * 7.5) * (hyp + (j / 50));
        y += sin(t) * cos(t * 7.5) * cos(t * 7.5) * (hyp + (j / 50));



    }
    return graph;
}

function starrySpiral2(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t) * cos(t * 2) * sin(t * 4) * (hyp + (j / 50));
        y += sin(t) * cos(t * 2) * sin(t * 4) * (hyp + (j / 50));


    }
    return graph;
}

function starrySpiralOctober(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t) * pow(cos(t * 2), 1) * (hyp + (j / 50));
        y += sin(t) * pow(cos(t * 4), 1) * (hyp + (j / 50));

    }
    return graph;
}

function starrySpiralOctober2(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;
    var x = 0;
    var y = 0;
    var xx = 0;
    var yy = 0;
    var n = map(sin(t / 10), -1, 1, 0, 0.4);
    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var lerpX = lerp(x, xx, 0.95);
        var lerpY = lerp(y, yy, 0.95);
        // ellipse(lerpX, lerpY, s, s);
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);


        xx += cos(t) * pow(cos(t * 5), 1) * (hyp + (j / 50));
        yy += sin(t) * pow(cos(t * 5), 1) * (hyp + (j / 50));

        x += pow(cos(t), 1) * pow(cos(t * 0.5) * 10, 1) * (hyp + (j / 50));
        y += pow(sin(t), 1) * pow(cos(t * 0.5) * 10, 1) * (hyp + (j / 50));

    }
    return graph;
}



function spiderWebSpiralNight(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t * 0.5) * (hyp + (j / 50));
        y += sin(t * 0.5) * cos(t * 1) * (hyp + (j / 50));

    }
    return graph;
}

function spiderWebSpiralNight2(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t * 3) * cos(t * 1) * (hyp + (j / 50));
        y += sin(t * 3) * cos(t * 1) * (hyp + (j / 50));

    }
    return graph;
}

function spiderWebSpiralNight3(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t * 3) * cos(sin(t * 1)) * (hyp + (j / 50));
        y += sin(t * 3) * cos(sin(t * 1)) * (hyp + (j / 50));

    }
    return graph;
}

function spiderWebSpiralNight4(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += cos(t * 0.5) * cos(sin(t * 10)) * (hyp + (j / 50));
        y += sin(t * 0.5) * cos(sin(t * 10)) * (hyp + (j / 50));

    }
    return graph;
}

function spiderWebSpiralNight5(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += sin(cos(t * 0.5)) * cos(sin(t * 5)) * (hyp + (j / 50));
        y += sin(sin(t * 0.5)) * cos(sin(t * 5)) * (hyp + (j / 50));

    }
    return graph;
}

function spiderWebSpiralNight6(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += sin(pow(sin(t), 3)) * (hyp + (j / 50));
        y += sin(cos(t)) * (hyp + (j / 50));

    }
    return graph;
}

function spiderWebSpiralNight6b(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += sin(t * 1.5) * sin(t * 0.5) * (hyp + (j / 50));
        y += cos(t * 1.5) * cos(t * 0.5) * (hyp + (j / 50));

    }
    return graph;
}

//with autumnSpiral8
function spiderWebSpiralNight7(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += sin(pow(sin(t), 3)) * (hyp + (j / 50));
        y += sin(pow(cos(t), 3)) * (hyp + (j / 50));

    }
    return graph;
}

function spiderWebSpiralNight8(controller, t) {
    var graph = [];
    var scalar = controller.privateValues.scalar;
    var vals = controller.privateValues.spiral;
    var angleTrig = vals.angle;
    var hyp = controller.privateValues.spiral.hyp || 0.2;;
    var x = 0;
    var y = 0;

    for (var j = 0; j < 1000; j++) {
        var t = angleTrig + angleTrig * j;
        var vec = createVector(x * scalar, y * scalar);
        graph.push(vec);

        x += sin(pow(sin(t), 3)) * (hyp + (j / 30));
        y += sin(pow(cos(t), 9)) * (hyp + (j / 30));

    }
    return graph;
}
