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
const GAMEOVERspeler = 2;
const UITLEG = 3;
const GAMEOVERvijand = 4;
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
const KEY_i = 73;
const KEY_S = 83;
const KEY_k = 75;
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

var VijandX = 850; // x-positie van speler
var VijandY = 600; // y-positie van speler
var healthVijand = 100;  // health van speler
var snelheidVijand = 3; // snelheid speler

var VijandSpringt = false;
var spelerSpringt = false;
var springSnelheid = 0;
var springSnelheidStart = 8;
var zwaartekracht = 0.4;

var kogelX = -10;
var kogelY = 300;
var kogelVliegt = false;
var KogelVliegTijd = 1;

var VijandkogelX = -10;
var VijandkogelY = 300;
var VijandkogelVliegt = false;
var VijandKogelVliegTijd = 1;

var Max_health = 100
var templeImg;
var JungleImg;
var pixelspeler;
var pixelvijand;

var FightBoxX = 300;
var FightBoxY = 45;
var fightboxonderX = 335;
var fightboxonderY = 100;
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

  if (spelerSpringt === false && keyIsDown(KEY_w)) {
    spelerSpringt = true;
    springSnelheid = springSnelheidStart;
  }
  if (spelerSpringt === true) {
    spelerY = spelerY - springSnelheid;
    springSnelheid = springSnelheid - zwaartekracht;
  }
  if (spelerY > 595) {
    spelerSpringt = false;
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

  if (VijandSpringt === false && keyIsDown(KEY_i)) {
    VijandSpringt = true;
    springSnelheid = springSnelheidStart;
  }
  if (VijandSpringt === true) {
    VijandY = VijandY - springSnelheid;
    springSnelheid = springSnelheid - zwaartekracht;
  }
  if (VijandY > 595) {
    VijandSpringt = false;
  }
  // kogel

  if (kogelVliegt === false &&
    keyIsDown(KEY_S)) {
    kogelVliegt = true;
    kogelX = spelerX + 70;
    kogelY = spelerY;
  }
  if (kogelVliegt === true) {
    kogelX = kogelX + 20;
  }
  if (kogelVliegt === true &&
    kogelX > 1300) {
    kogelVliegt = false;
  }

  if (VijandkogelVliegt === false &&
    keyIsDown(KEY_k)) {
    VijandkogelVliegt = true;
    VijandkogelX = VijandX + 70;
    VijandkogelY = VijandY;
  }
  if (VijandkogelVliegt === true) {
    VijandkogelX = VijandkogelX - 20;
  }
  if (VijandkogelVliegt === true &&
    VijandkogelX < -10) {
    VijandkogelVliegt = false;
  }


};


/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  if (spelerX - VijandkogelX < 50 &&
    spelerX - VijandkogelX > -50 &&
    spelerY - VijandkogelY < 50 &&
    spelerY - VijandkogelY > -50) {
    console.log("Botsing");
    health = health - 5;
  }

  if (VijandX - kogelX < 50 &&
    VijandX - kogelX > -50 &&
    VijandY - kogelY < 50 &&
    VijandY - kogelY > -50) {
    console.log("Botsing");
    healthVijand = healthVijand - 5;
  }
  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  image(templeImg, 0, 0, width, height);
  // vijand

  // kogeel
  fill("red");
  ellipse(kogelX, kogelY, 20, 20);
  // VijandKogel
  fill("red");
  ellipse(VijandkogelX, VijandkogelY, 20, 20);
  // speler

  //FIGHT box onder
  fill("lightgreen");
  rect(fightboxonderX, fightboxonderY, 600, 50, 45);
  //FIGHT box
  fill("darkgreen");
  rect(FightBoxX, FightBoxY, 675, 75, 45);
  // punten en health
  drawHealthBars(30, 50, health, Max_health);
  drawHealthBarsVijand(1050, 50, healthVijand, Max_health);
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
  fill("white");
  rect(x, y, getHealthbarwidth(health, Max_health), 30);
  noStroke();
  strokeWeight(1);
}
function drawHealthBarsVijand(x, y, healthVijand, Max_health) {
  stroke("black");
  strokeWeight(5);
  fill("red");
  rect(x, y, getHealthbarwidth(healthVijand, Max_health), 30);
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
  templeImg = loadImage("Teemple.jpeg");
  createCanvas(1280, 720);
  JungleImg = loadImage("Jungle.png");

  pixelspeler = loadImage("pixelspeler.png");
  pixelvijand = loadImage("pixelvijand.png")
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
    textSize(60)
    image(JungleImg, 0, 0, width, height);
    fill("white");
    text("START", 550, 250);
    strokeWeight(6);
    stroke("black");
    textSize(50);
    fill("yellow");
    text("druk op enter om te beginnen", 325, 350)
    textSize(30);
    fill("yellow");
    text("controls", 550, 450)
    text("player 1", 400, 500)
    text("player 2", 700, 500)
    textSize(20);
    text("- a & d links en rechts movement", 400, 530)
    text("- q & e links en rechtsdashen", 400, 560)
    text("- w springen", 400, 590)
    text("- s schieten", 400, 620)
    text("- j & l links en rechts movement", 700, 530)
    text("- u & o links en rechtsdashen", 700, 560)
    text("- i springen", 700, 590)
    text("- k schieten", 700, 620)









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
      spelStatus = GAMEOVERspeler;
    }
    if (healthVijand <= 0) {
      spelStatus = GAMEOVERvijand;
    }
    image(pixelspeler, spelerX - 25, spelerY - 100, 200, 200);
    // tekent de zelfgemaakte speler character
    image(pixelvijand, VijandX - 25, VijandY - 100, 200, 200);
    textSize(50);
    fill("orange");
    strokeWeight(5);
    stroke("black");
    text("-=- -=- FIGHT -=- -=-", 400, 100);
    textSize(40)
    text("speler 1", 55, 35);
    text("speler 2", 1075, 35);


    console.log("spelen");
  }
  if (spelStatus === GAMEOVERspeler) {
    // teken game-over scherm
    console.log("game over");
    textSize(50);
    fill("orange");
    text("GAME OVER SPELER 2 WINT, druk spatie voor start", 50, 250);
    strokeWeight(5);
    stroke("black");
    if (keyIsDown(32)) {
      health = health = 100;
      healthVijand = healthVijand = 100;
      spelerX = 600
      spelerY = 600
      VijandX = 850
      VijandY = 600
      spelStatus = UITLEG;
    }
  }
  if (spelStatus === GAMEOVERvijand) {
    // teken game-over scherm
    console.log("game over");
    textSize(50);
    fill("orange");
    text("GAME OVER SPELER 1 WINT, druk spatie voor start", 50, 250);
    strokeWeight(5);
    stroke("black");
    if (keyIsDown(32)) {
      health = health = 100;
      healthVijand = healthVijand = 100;
      spelerX = 600
      spelerY = 600
      VijandX = 850
      VijandY = 600
      spelStatus = UITLEG;
    }
  }
}