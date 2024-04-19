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
const KEY_a = 65;
const KEY_d = 68;
const KEY_j = 74;
const KEY_l = 76;
var spelStatus = SPELEN;

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var health = 100;  // health van speler
var snelheid = 3; // snelheid speler

var VijandX = 700; // x-positie van speler
var VijandY = 600; // y-positie van speler
var healthVijand = 100;  // health van speler
var snelheidVijand = 3; // snelheid speler

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
  // vijand
  if (keyIsDown(KEY_j)) {
    VijandX = VijandX - snelheidVijand;
  }
   if (keyIsDown(KEY_l)) {
    VijandX = VijandX + snelheidVijand;
  }
  // kogel
};
/**
 * Checkt botsingen
 */
var vijandRaaktSpeler = function() {
  // botsing speler tegen vijand

  if (spelerX - VijandX < 50 &&
    spelerX - VijandX > -50 &&
    spelerY - VijandY < 50 &&
    spelerY - VijandY > -50) {
    return true;
  } else {
    return false;
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

  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // punten en health

};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

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
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
  }
}
