// A new class
//
// its new class called Procrastination which is like the original predator
// class but the player doesn't get to control it. It moves on its own.
// Its a competitor that that also eats the prey

class Procrastinator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, width, height) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = width;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.fillColor = fillColor;
    this.baseWidth = width;
    this.baseHeight = height;
    this.width = width;
    this.height = height;
    this.healthratio = this.health / this.maxHealth;
  }


  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    this.healthratio = this.health / this.maxHealth;
    this.width = this.baseWidth * this.healthratio;
    this.height = this.baseHeight * this.healthratio;
    // Handle wrapping
    this.handleWrapping();
  }
  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }
  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.width/2 + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);

      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;

      this.healthratio = this.health / this.maxHealth;
      this.width = this.baseWidth * this.healthratio;
      this.height = this.baseHeight * this.healthratio;

      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        prey.reset();
      }
    }
  }


  // display
  //
  // Draw the lion as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    rectMode(CENTER);
    fill(this.fillColor);
    this.radius = this.health;
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
