/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3;
var spelStatus = UITLEG;

const KEY_a = 65;
const KEY_d = 68;
const KEY_q = 81;
const KEY_e = 69;

const KEY_j = 74;
const KEY_l = 76;
const KEY_o = 79;
const KEY_u = 85;

const KEY_w = 87;
var toetsOIngedruktNu = false;
var toetsOIngedruktVorige = false;
var toetsUIngedruktNu = false;
var toetsUIngedruktVorige = false;

var toetsEIngedruktNu = false;
var toetsEIngedruktVorige = false;
var toetsQIngedruktNu = false;
var toetsQIngedruktVorige = false;

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var health = 100;  // health van speler
var snelheid = 3; // snelheid speler

var VijandX = 700; // x-positie van speler
var VijandY = 600; // y-positie van speler
var healthVijand = 100;  // health van speler
var snelheidVijand = 3; // snelheid speler

var kogelX = 400;
var kogelY = 300;
var kogelVliegt = false;
var KogelVliegTijd = 1;

var Max_health = 100
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {

  // speler
  if (keyIsDown(KEY_a)) {
    spelerX = spelerX - snelheid;
  }
  if (keyIsDown(KEY_d)) {
    spelerX = spelerX + snelheid;
  }

  toetsQIngedruktVorige = toetsQIngedruktNu
  toetsQIngedruktNu = keyIsDown(KEY_q)
  if (toetsQIngedruktVorige === false &&
    toetsQIngedruktNu === true) {
    spelerX = spelerX - 100;
  }

  toetsEIngedruktVorige = toetsEIngedruktNu
  toetsEIngedruktNu = keyIsDown(KEY_e)
  if (toetsEIngedruktVorige === false &&
    toetsEIngedruktNu === true) {
    spelerX = spelerX + 100;
  }

  // vijand
  if (keyIsDown(KEY_j)) {
    VijandX = VijandX - snelheidVijand;
  }
  if (keyIsDown(KEY_l)) {
    VijandX = VijandX + snelheidVijand;
  }

  toetsUIngedruktVorige = toetsUIngedruktNu
  toetsUIngedruktNu = keyIsDown(KEY_u)
  if (toetsUIngedruktVorige === false &&
    toetsUIngedruktNu === true) {
    VijandX = VijandX - 100;
  }

  toetsOIngedruktVorige = toetsOIngedruktNu
  toetsOIngedruktNu = keyIsDown(KEY_o)
  if (toetsOIngedruktVorige === false &&
    toetsOIngedruktNu === true) {
    VijandX = VijandX + 100;
  }

  // kogel

  if (kogelVliegt === false &&
    keyIsDown(KEY_w)) {
    KogelVliegTijd = 0;
    kogelVliegt = true;
    kogelX = spelerX;
    kogelY = spelerY;
  }
  if (kogelVliegt === true) {
    kogelX = kogelX + 3;
    KogelVliegTijd + 1;
  }
  if (kogelVliegt === true &&
    KogelVliegTijd === 1) {
    kogelVliegt = false;
  }
};


/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  if (spelerX - VijandX < 50 &&
    spelerX - VijandX > -50 &&
    spelerY - VijandY < 50 &&
    spelerY - VijandY > -50) {
    console.log("Botsing");
    health = health - 1;
  }

  if (VijandX - spelerX < 50 &&
    VijandX - spelerX > -50 &&
    VijandY - spelerY < 50 &&
    VijandY - spelerY > -50) {
    console.log("Botsing");
    healthVijand = healthVijand - 1;
  }
  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  fill("green")
  rect(0, 0, 1280, 720);
  // vijand
  fill("red");
  rect(VijandX - 25, VijandY - 25, 50, 50);
  fill("black");
  ellipse(VijandX, VijandY, 10, 10);
  // kogel
  fill("red");
  ellipse(kogelX, kogelY, 20, 20);
  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // punten en health
  drawHealthBars(30, 50, health, Max_health);
  drawHealthBars(1050, 50, healthVijand, Max_health);
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */
function getHealthbarwidth(currentHealth, Max_health) {
  return (currentHealth / Max_health) * 200;
}
function drawHealthBars(x, y, health, Max_health) {
  stroke("black");
  strokeWeight(5);
  fill("red");
  rect(x, y, getHealthbarwidth(health, Max_health), 30);
  noStroke();
  strokeWeight(1);
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === UITLEG) {
    console.log("uitleg");
    textSize(50)
    fill("green");
    rect(0, 0, 1280, 720);
    fill("white");
    text("uitleg: doe je ding, druk op enter", 250, 100);
    if (keyIsDown(13)) {
      spelerX = 400;
      spelStatus = SPELEN
    }
  }
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
    console.log("spelen");
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    console.log("game over");
    textSize(50);
    fill("orange");
    text("GAME OVER, druk spatie voor start", 200, 100);
    if (keyIsDown(32)) {
      health = health + 100;
      spelerX = 600
      spelerY = 600
      VijandX = 700
      VijandY = 600
      spelStatus = UITLEG;
    }
  }
}