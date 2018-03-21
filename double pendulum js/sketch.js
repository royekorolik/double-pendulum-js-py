p = new Pendulum();

function setup(){
    createCanvas(1600, 900);
    buffer = createGraphics(width, height);
    buffer.translate(width/2, 100);
    p.Pendulum(createVector(0,0), 400, 350, buffer);

}

function draw(){
    background(0);
    p.update();
    p.display();

}
