let prevMinute = null;
let prevSecond = null;

// setup() is called once at page-load
function setup() {
    createCanvas(800,600); // make an HTML canvas element width x height pixels
    angleMode(RADIANS);
    noFill();
    strokeCap(SQUARE);
}

// draw() is called 60 times per second
function draw() {
    let hr = hour();
    let min = minute();
    let sec = second();
    background(225);

    if (prevMinute === null) prevMinute = min;
    if (min !== prevMinute) {
    console.log(min);
    prevMinute = min;
    }

    translate(width / 2, height / 2);
    rotate(radians(160));

    const R = Math.min(width, height) * 0.36;
    const thick = Math.max(14, R * 0.10);

    noFill();
    strokeWeight(thick);

    //sizes
    const secLen = TWO_PI * 0.16;
    const hmLen = (TWO_PI - secLen) / 2;
    const gap = 0.004;//gap
    const bottom = HALF_PI;
    //chain layout
    const secStart = bottom + secLen / 2; //left-bottom boundary
    const secEnd = bottom - secLen / 2;   //right-bottom boundary
    const minStart = secEnd;
    const minEnd = minStart - hmLen;
    const hourStart = minEnd;
    const hourEnd = hourStart - hmLen;
    // inset gaps
    const secA0 = secStart - gap;
    const secA1 = secEnd + gap;
    const minA0 = minStart - gap;
    const minA1 = minEnd + gap;
    const hourA0 = hourStart - gap;
    const hourA1 = hourEnd + gap;
    //proportions
    const secP = sec / 60;
    const minP = min / 60;
    const hourP = (hr % 12) / 12;


    //draw full segment
    function drawSegmentWithProgress(aStart, aEnd, p, r, w, brightHex, brightAlpha, darkHex, darkAlpha) {
        // dark base
        strokeCap(SQUARE);
        stroke(darkHex);
        strokeWeight(w);
        drawingContext.globalAlpha = darkAlpha / 255;
        arc(0, 0, r * 2, r * 2, aEnd, aStart, OPEN);
        drawingContext.globalAlpha = 1;

        // bright progress
        const len = aStart - aEnd;
        const aCur = aStart - len * p;

        strokeCap(SQUARE);
        stroke(brightHex);
        strokeWeight(w);
        drawingContext.globalAlpha = 1;
        arc(0, 0, r * 2, r * 2, aCur, aStart, OPEN);

        // cap
        const x = Math.cos(aCur) * r;
        const y = Math.sin(aCur) * r;
        noStroke();
        fill(brightHex);
        drawingContext.globalAlpha = 1;

        const headArcLen = Math.abs(aStart - aCur) * r;
        if (headArcLen < w * 0.5) {
        const dir = aCur - HALF_PI;
        arc(x, y, w, w, dir - HALF_PI, dir + HALF_PI, PIE);
        } else {
        circle(x, y, w);
        }

        // restore
        drawingContext.globalAlpha = 1;
        noFill();
    }


    const SEC_DARK = "#A4EFDA";
    const MIN_DARK = "#A4DFEF";
    const HOUR_DARK = "#A4B9EF";
    // seconds
    drawSegmentWithProgress(secA0, secA1, secP, R, thick, "#26D9A6", 235, SEC_DARK, 100);
    // minutes
    drawSegmentWithProgress(minA0, minA1, minP, R, thick, "#26B2D9", 230, MIN_DARK, 100);
    // hours
    drawSegmentWithProgress(hourA0, hourA1, hourP, R, thick, "#2659D9", 225, HOUR_DARK, 100);
}