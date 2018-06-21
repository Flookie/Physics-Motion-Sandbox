// Particle Module by Marcus Belcastro
// Object/class that manages individual particles and objects on the screen

class Particle {
  constructor(posx, posy, v0x, v0y, mass, vectType) {
    this.x = posx
    this.y = posy
    this.mass = mass
    this.v = createVector(v0x, v0y)   //velocity
    this.a = createVector(0, 0)			  //acceleration
    this.f = createVector(0, 0)			  //force
    this.frozen = false
    this.showVectors = false
    this.vectPointer = vectType
  }

  applyField(field) {
    this.a.add(field.a)
    this.f.add(field.f)
  }

  calcPos() {
    this.x += this.v.x
    this.y += this.v.y
  }

  calcVelocity() {
    this.v.add(this.a)
  }

  calcAcceleration() {
    this.a.add(createVector(this.f.x / this.mass, this.f.y / this.mass))
  }

  update() {
    if (!this.frozen) {
        this.calcAcceleration()
        this.calcVelocity()
        this.calcPos()
      }
      //Check whether the particle hits the left or right side of the viewport
      //The original pseudocode had to be split up into an if-else-if statement
      //to fix a bug where the particle left the viewport
      if (this.x < 0) {
        this.v.x *= -1
        this.x = 0
      } else if (this.x > width) {
        this.v.x *= -1
        this.x = width
      }

      //Check whether the particle hits the top or bottom of the viewport
      if (this.y < 0) {
        this.v.y *= -1
        this.y = 0
      } else if (this.y > height) {
        this.v.y *= -1
        this.y = height
      }

      //show the particle
      this.show()
      //erase vectors after showing them
      this.a = createVector(0, 0)
      this.f = createVector(0, 0)
  }

  getVector() {
    if (this.vectPointer == VEL) {
      return this.v
    } else if (this.vectPointer == ACC) {
      return this.a
    } else if (this.vectPointer == FCE) {
      return this.f
    }
  }

  show() {
    fill(P_COL)
    textSize(T_SIZE)
    noStroke()
    ellipse(this.x, this.y, P_RAD)
    if (this.showVectors) {
      let vect = this.getVector()
      let tempx = vect.x
      let tempy = vect.y
      let coeffx = tempx * V_SCALE
      let coeffy = tempy * V_SCALE
      fill(V_COL)
      let xcomp = (-0.001 < tempx && tempx < 0.001) ? 0 : tempx
      let ycomp = (-0.001 < tempy && tempy < 0.001) ? 0 : tempy
      text(nfc(xcomp, 2), this.x+coeffx+50*(tempx/abs(tempx)), this.y)
      text(nfc(-1*ycomp, 2), this.x, this.y+coeffy+50*(tempy/abs(tempy)))
      strokeWeight(V_STROKE)
      stroke(V_COL)
      line(this.x, this.y, this.x+coeffx, this.y)
      line(this.x, this.y, this.x, this.y+coeffy)
      if (tempx != 0 && tempy != 0) {
        stroke(HYP_COL)
        line(this.x, this.y, this.x+coeffx, this.y+coeffy)
        let theta = atan(abs(tempy/tempx))
        fill(HYP_COL)
        noStroke()
        text(round(theta) + '°', this.x-50*(tempx/abs(tempx)), this.y-50*(tempy/abs(tempy)))
        text(nfc(vect.mag(), 2), this.x+coeffx+50*(tempx/abs(tempx)), this.y+coeffy+50*(tempy/abs(tempy)))
      }
    }
  }
}
