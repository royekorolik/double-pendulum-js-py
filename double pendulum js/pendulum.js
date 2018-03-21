function Pendulum(){
    this.l1;
    this.l2;
    this.origin;
    this.bob1;
    this.bob2;
    this.v1;
    this.a1;
    this.ballr;
    this.damping;
    this.a1;
    this.a2;
    this.a1v = 0;
    this.a2v = 0;
    this.a1a = 0;
    this.a2a = 0;
    this.m1 = 10;
    this.m2 = 10;
    this.s;
    this.nothing = 100;
    this.d;
    this.x;
    this.y;
    this.something = 100;
    this.v;
    this.e;
    this.u;
    this.i;
    this.damping = 1;
    this.buffer;
    this.x1;
    this.x2;
    this.y1;
    this.y2;
    this.f = 100;


    this.Pendulum = function Pendulum(origin, l1, l2, buffer) {
        this.origin = origin;
        this.l1 = l1;
        this.l2 = l2;
        this.a1 = PI/2;
        this.a2 = PI/2;
        this.ballr = 20.0;
        this.buffer = buffer;
    }
    this.update = function update(){
      imageMode(CORNER);
      image(buffer, 0, 0, width, height);
      this.g = 1;

      this.n1 = -this.g*(2*this.m1 + this.m2)*Math.sin(this.a1);
      this.n2 = this.m2*this.g*Math.sin(this.a1 - 2*this.a2);
      this.n3 = (2*Math.sin(this.a1 -this.a2)*this.m2);
      this.n4 = this.a2v*this.a2v*this.l2 + this.a1v*this.a1v*this.l1*Math.cos(this.a1 - this.a2);
      this.n5 = this.l1*(2*this.m1 +this.m2 - this.m2*Math.cos(2*this.a1 - 2*this.a2));
      this.a1a = (this.n1 - this.n2 - this.n3*this.n4)/this.n5;


      this.u = 2*Math.sin(this.a1 - this.a2);
      this.y = (this.a1v*this.a1v*this.l1*(this.m1 + this.m2));
      this.t = this.g*(this.m1 + this.m2)*Math.cos(this.a1);
      this.e = this.a2v*this.a2v*this.l2*this.m2*Math.cos(this.a1 - this.a2);
      this.i = this.l2*(2*this.m1 + this.m2 - this.m2*Math.cos(2*this.a1 - 2*this.a2));
      this.a2a = (this.u*(this.y + this.t + this.e))/this.i;

      this.a1v += this.a1a;
      this.a2v += this.a2a;
      this.a1 += this.a1v;
      this.a2 += this.a2v;

      this.a1v *= this.damping;
      this.a2v *= this.damping;


    }


    this.display = function display(){
      translate(width/2, 100);
      this.x1 = this.l1*Math.sin(this.a1);
      this.y1 = this.l1*Math.cos(this.a1);

      this.x2 = this.x1 + this.l2*Math.sin(this.a2);
      this.y2 = this.y1 + this.l2*Math.cos(this.a2);

      this.bob1 = createVector(this.x1, this.y1);
      this.bob2 = createVector(this.x2, this.y2);

      stroke(255);
      strokeWeight(5);
      fill(175);
      ellipse(this.origin.x, this.origin.y, 15, 15)

      stroke(255);
      strokeWeight(5);
      line(this.origin.x, this.origin.y, this.bob1.x, this.bob1.y);
      line(this.bob2.x, this.bob2.y, this.bob1.x, this.bob1.y);

      ellipseMode(CENTER);
      fill(175);
      noStroke()
      ellipse(this.bob1.x, this.bob1.y, this.ballr, this.ballr);
      ellipse(this.bob2.x, this.bob2.y, this.ballr, this.ballr);

      if (frameCount > 1){
          this.buffer.stroke(this.bob2.x, this.bob1.y/2, this.bob2.y/2);
          this.buffer.strokeWeight(4);
          this.buffer.line(this.buffer.px2, this.buffer.py2, this.bob2.x, this.bob2.y);
      }
      this.buffer.px2 = this.bob2.x
      this.buffer.py2 = this.bob2.y

      this.bob1.add(this.origin);
      this.bob2.add(this.bob1);
    }
}
