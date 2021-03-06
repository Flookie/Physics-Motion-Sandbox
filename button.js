//Button module by Marcus Belcastro
//This object/class is an interfaceable button that executes functionality on-click

class Button {
  //constructor loads constants for the object
  constructor(posx, posy, width, height, on_click, text) {
    this.x = posx
    this.y = posy
    this.w = width
    this.h = height
    this.on_click = on_click
    this.state = false          //default for show vectors button
    this.lock = false
    this.hide = false
    this.label = text
  }

  //function that executes the stored event when the button is clicked
  do(arg) {
    if (!this.lock) {
      this.state = this.on_click(arg)
    }
  }

  //returns a boolean as to whether the mouse was inside the area of the button
  isClicked(x, y) {
    return (this.x < x && x < this.x + this.w) && (this.y < y && y < this.y + this.h)
  }

  //function that makes the button appear on screen
  show() {
    //if the button is hidden, it will not show
    if (!this.hide) {
      //if the button is locked, it will be greyed-out
      if (this.lock) {
        fill(LOCK_COL)
      //otherwise it will be its default colour
      } else {
        fill(BUT_COL)
      }

      stroke(BUT_STK)
      strokeWeight(1)
      rect(this.x, this.y, this.w, this.h, 10) //rectangle of the button

      textAlign(CENTER)
      textSize(T_SIZE)
      fill(TEXT_COL)
      text(this.label, this.x+this.w/2, this.y+this.h/1.6) //button label
    }
  }
}
