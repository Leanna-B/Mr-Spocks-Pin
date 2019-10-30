//This code builds on the poseNet examples from ML5.org and The Ccoding Train, and integrates a sound example from P5.js
//https://ml5js.org/reference/api-PoseNet/
//Hour of Code with p5.js and PoseNet https://www.youtube.com/watch?v=EA3-k9mnLHs
//https://github.com/tensorflow/tfjs-models/tree/master/posenet
//https://p5js.org/examples/sound-mic-threshold.html
//https://p5js.org/examples/sound-frequency-modulation.html
//https://p5js.org/examples/sound-mic-input.html


let video;
let poseNet;
let poses = [];
let analyzer;
var img;
var r, g, b;
var mic;
//let angle = 0;

function preload(img) {
}

function preload(video) {
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  // Hide the video element and just show the canvas
  video.hide();

  //initial RGB values
  r = 20;
  g = 20;
  b = 155;

  //setting the stroke weight
  strokeWeight(2.5);

  //assign the mic variable to the AudioIn method and starting it
  mic = new p5.AudioIn();
  mic.start();

  //posenet set up from coding train tutorials
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });

  //the "jewel" image used for keypoints
  img = createImg("assets/geometric.png")
  // hide the image element and just show the canvas
  img.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
  poseNet.multiPose(img)
  }

function draw() {

  //a trick to flip/mirror the canvas so the poseNet figure appears to mirror body movement
  //video on canvas, position, dimensions
  image(video, 0, 0, width / 2, height);
  // move to far corner
  translate(width, 0);
  // flip x-axis backwards
  scale(-1.0, 1.0);
  //video on canvas, position, dimensions
  image(video, 0, 0, width / 2, height);

  //update the background
  //background(r, g, b);
  //fill(0);

  //mousePressed function to assign random color values
function mousePressed() {
  r = random(256);
  g = random(256);
  b = random(256);
}

  //at the start of each loop, update the micLevel variable
  var micLevel = mic.getLevel();
  // Get the overall volume (between 0 and 1.0)
  let volume = mic.getLevel();

  //assign random fill color for ellipse and triangle shapes and draw them
  fill(random(255), random(255), random(255));
  ellipse(280, 130, micLevel * 5000 + 200);
  //pyramid right side
  fill(random(255), random(255), random(255));
  noStroke();
  triangle(width / 5 - micLevel * 1000, 3 * height / 5, width / 2, height / 4 - micLevel * 3000, width / 2, 3 * height / 4 + micLevel * 1000);
  //pyramid left side shadow effect
  fill(100);
  triangle(width / 2, 3 * height / 4 + micLevel * 1000, width / 2, height / 4 - micLevel * 3000, 4 * width / 5 + micLevel * 1000, 3 * height / 5 + micLevel * 1000);
  //ellipse at bottom
  fill(random(255), random(255), random(255));
  ellipse(600, 580, 100 + micLevel * 2000);
  //center of ellipse at bottom
  fill(255);
  stroke(5)
  ellipse(580, 575, 20 + micLevel * 2000);
  //center of ellipse at top, layers over pyramid
  fill(255);
  stroke(5)
  ellipse(215, 120, micLevel * 1500 + 30);


  // If the volume > 0.05,  an ellipse is drawn at a random location.
  // The louder the volume, the larger the rectangle.
  let threshold = 0.05;
  if (volume > threshold) {
    stroke(0);
    fill(random(255), random(255), random(255));
    ellipse(random(width), random(height), volume * 500, volume * 500);
    // Graph the overall potential volume, w/ a line at the threshold
   // let y = map(volume, 0, 1, height, 0);
   // let ythreshold = map(threshold, 0, 1, height, 0);
  }

  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(0);
        noStroke();
        image(img, keypoint.position.x, keypoint.position.y, 250, 200);
        //rotate(PI/32);
        //angle += 0.5;
      }
    }
  }
}

//mousePressed function to assign random color values
function mousePressed() {
  r = random(256);
  g = random(256);
  b = random(256);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
