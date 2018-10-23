var song;
var amp;
var button;

var volHistory = [];

function toggleSong(){
    if (song.isPlaying()){
        song.pause();
    } else {
        song.play();
    }
}

function preload(){
    soundFormats('mp3');
    song = loadSound('backgroundsong.mp3');
}

function setup(){
    var canvas = createCanvas(window.innerWidth, 200);  
    canvas.parent('visualizer');
    //var canvasLeft = createCanvas(window.innerWidth/2, 100);
    //canvasLeft.position(windowWidth/2, (windowHeight - height) / 2)
    //createCanvas(window.innerWidth, window.innerHeight);
    masterVolume(0.002,0,0);
    button = createButton('Toggle Music');
    button.mousePressed(toggleSong);
    song.loop();
    
    amp = new p5.Amplitude();
}

function draw(){
    background(0);
    var volume = amp.getLevel();
    volHistory.push(volume * 900);
    //console.log(volume);
    beginShape();
    stroke(0, 255, 0);
    strokeWeight(3);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    noFill();
    for (var i = 0; i < volHistory.length; i++) {
        var y = map(volHistory[i], 0, 1, height, 0);
        vertex(i*1.5, y);
        if (i*1.5 > width) {
            volHistory.splice(0, 1);
        }
    }
    endShape();

    


    //ellipse(400, 400, volume * 800, volume * 800);
}