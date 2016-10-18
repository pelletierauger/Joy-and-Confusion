var xSheet = {
    scene1: {
        d: 450,
        f: function() {
            // var rN = getSum(xSheet, xSheet.grotte);
            firstSpiral.run();
        }
    },
    scene2: {
        d: 300,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.scene2);
            var coFade = cosineFade(sum, 50);
            secondSpiral.mix(0, firstSpiral, 0, coFade);
        }
    },
    // scene3: {
    //     d: 50,
    //     f: function(sum) {
    //         //The getSum function is used to get the sum another scene within the sheet.
    //         //Calling the getSum on the first scene of the x-sheet should be pointless.
    //         var rN = getSum(xSheet, xSheet.scene2);
    //         var coFade = cosineFade(sum, 50);
    //         thirdSpiral.mix(0, secondSpiral, 0, coFade);
    //     }
    // },
    scene5: {
        d: 690,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.scene2);
            var coFade = cosineFade(sum, 400);
            octoSpiral.mix(0, secondSpiral, 0, coFade);
        }
    },

    //Chorus 1.
    scene6: {
        d: 130,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.scene2);
            var coFade = cosineFade(sum, 10);
            triangularSpiral2.mix(sum, octoSpiral, 0, coFade);
        }
    },
    superellipse1: {
        d: 160,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.scene6);
            var coFade = cosineFade(sum, 10);
            superellipseSpiral.mix(sum, triangularSpiral2, rN, coFade);
        }
    },
    superellipse2: {
        d: 280,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.superellipse1);
            var coFade = cosineFade(sum, 10);
            superellipseSpiral2.mix(sum - 25, superellipseSpiral, rN, coFade);
        }
    },


    spider1: {
        d: 585,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.superellipse2);
            var coFade = cosineFade(sum, 15);
            spiderSpiral.mix(sum, superellipseSpiral2, rN - 25, coFade);
        }
    },
    star1: {
        d: 575,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.spider1);
            var coFade = cosineFade(sum, 15);
            starSpiral2.mix(sum, spiderSpiral, rN, coFade);
        }
    },
    //La meilleure fucking shit au monde.
    spider2: {
        d: 280,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.star1);
            var coFade = cosineFade(sum, 15);
            spiderSpiral2.mix(sum, starSpiral2, rN, coFade);
        }
    },
    spider3: {
        d: 280,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.spider2);
            var coFade = cosineFade(sum, 15);
            spiderSpiral3.mix(sum, spiderSpiral2, rN, coFade);
        }
    },
    octo2: {
        d: 290,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.spider2);
            var coFade = cosineFade(sum, 15);
            octoSpiral2.mix(sum + 1000, spiderSpiral2, rN, coFade);
        }
    },
    fast: {
        d: 150,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.octo2);
            var coFade = cosineFade(sum, 3);
            fastSpiral.mix(sum, octoSpiral2, rN + 1000, coFade);
        }
    },
    fast2: {
        d: 440,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.fast);
            var coFade = cosineFade(sum, 1);
            fastSpiral2.mix(rN, fastSpiral, rN, coFade);
        }
    },
    exit: {
        d: 200,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.fast2);
            var coFade = cosineFade(sum, 15);
            exitSpiral.mix(sum, fastSpiral2, rN, coFade);
        }
    },
    exit2: {
        d: 700,
        f: function(sum) {
            //The getSum function is used to get the sum another scene within the sheet.
            //Calling the getSum on the first scene of the x-sheet should be pointless.
            var rN = getSum(xSheet, xSheet.exit);
            var coFade = cosineFade(sum, 600);
            exitSpiral2.mix(rN, exitSpiral, rN, coFade);
        }
    },
    // scene5: {
    //     d: 6000,
    //     f: function(sum) {
    //         //The getSum function is used to get the sum another scene within the sheet.
    //         //Calling the getSum on the first scene of the x-sheet should be pointless.
    //         var rN = getSum(xSheet, xSheet.scene2);
    //         var coFade = cosineFade(sum, 15);
    //         firstParticle.mix(0, fourthSpiral, 0, coFade);
    //     }
    // },
    key: function(n) {
        return this[Object.keys(this)[n]];
    }
};

Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function cosineFade(sum, dur) {
    var fade = map(drawCount, sum, sum + dur, 1, 0);
    var fadeCons = constrain(fade, 0, 1);
    var fadeSmooth = fadeCons * PI;
    var coFade = map(cos(fadeSmooth), 1, -1, 0, 1);
    return coFade;
}

function cosineFade2(t, dur) {
    var fade = map(t, sum, sum + dur, 1, 0);
    var fadeCons = constrain(fade, 0, 1);
    var fadeSmooth = fadeCons * PI;
    var coFade = map(cos(fadeSmooth), 1, -1, 0, 1);
    return coFade;
}

function runXSheet(sheet) {
    var tL = Object.size(sheet);

    //If the drawCount is lower than the duration of the first scene within the x-sheet, run that scene.
    if (drawCount < sheet.key(0).d) {
        sheet.key(0).f();

        //Else...for each scene of the sheet...calculate the total keyframes in the PREVIOUS scenes...
        //This is the sum. The number of frames preceding a scene.
        //Now... if the drawCount is higher or equal to that sum, and if it is lower than
        //the sum + the current scene's duration.. it means we are within the right scene. So run it.
        //Now, why do I pass this sum to the function inside the sheet ?
        //I do it because, this way, every single scene within the x-sheet can be launched as if it
        //was launched on drawCount 0. I just need to the pass the sum property to the run function.
        //This way, run()  gets "the current DrawCount minus all the previous scenes in the sheet".
    } else {
        for (var i = 1; i < tL; i++) {
            var sum = 0;
            for (var ii = 0; ii < i; ii++) {
                sum += sheet.key(ii).d;
            }

            if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
                sheet.key(i).f(sum);
            }
        }
    }
}

function getSum(sheet, prop) {
    var tL = Object.size(sheet);
    var propLocation = 0;
    var sum = 0;
    for (var i = 0; i <  tL; i++) {
        if (sheet.key(i) === prop) {
            propLocation = i;
        }
    }
    for (var ii = 0; ii < propLocation; ii++) {
        sum += sheet.key(ii).d;
    }
    return sum;
}

function queryXSheet(sheet) {
    var tL = Object.size(sheet);

    for (var i = 0; i < tL; i++) {
        var sum = 0;
        for (var ii = 0; ii < i; ii++) {
            sum += sheet.key(ii).d;
        }
        if (drawCount >= sum && drawCount < sum + sheet.key(i).d) {
            var name = Object.getOwnPropertyNames(sheet);
            return ("Scene #" + i + ", " + name[i]);
        }
    }
}

function sumXSheet(sheet) {
    var tL = Object.size(sheet);
    var sum = 0;
    for (var i = 0; i < tL - 1; i++) {
        sum += sheet.key(i).d;
    }
    return sum;
}