  function setupProjectileMotion() {
    buttons = []
    sliders = []
    particles = []
    fields = []
    spacing = 100
    boxw = 250
    boxh = 100
    sliderw = 65
    sliderh = 425
    particlex = width/4
    particley = height - 200
    boxleft = width/8 - boxw/2
    boxmiddle = width/2 - boxw/2
    boxright = width - width/8 - boxw/2
    boxtop = height/8 - boxh/2
    sliderleft = width/8 - boxw/2
    slidermiddle = sliderleft + spacing
    sliderright = slidermiddle + spacing
    slidertop = height/2 - sliderh/2
    buttons.push(new Button(boxleft, boxtop, boxw, boxh, showVectors, 'Toggle Vectors'))
    buttons.push(new Button(boxmiddle, boxtop, boxw, boxh, function() {particles[0].frozen = !particles[0].frozen;}, 'Pause/Play'))
    buttons.push(new Button(boxright, boxtop, boxw, boxh, resetProjectile, 'Reset'))
    sliders.push(new Slider(sliderleft, slidertop, sliderw, sliderh, 0, 90, SL_ANG))
    sliders.push(new Slider(slidermiddle, slidertop, sliderw, sliderh, 0.5, 15, SL_VEL))
    sliders.push(new Slider(sliderright, slidertop, sliderw, sliderh, 0.25, 5, SL_ACC))
    particles.push(new Particle(particlex, particley, 0, 0, FCE))
    fields.push(new Field(sliders[2].state, 0, 270))
    particles[0].frozen = true
    context = ProjectileMotion
  }

  function ProjectileMotion() {
    let toRadians = function(a) {return -a*(PI/180);}
    fields[0].a = p5.Vector.fromAngle(toRadians(270), sliders[2].state)
    particles[0].v = p5.Vector.fromAngle(toRadians(sliders[0].state), sliders[1].state)
  }

  function resetProjectile() {
    particles[0].x = width/4
    particles[0].y = height - 200
    particles[0].v = p5.Vector.fromAngle(toRadians(sliders[0].state), sliders[1].state)
  }