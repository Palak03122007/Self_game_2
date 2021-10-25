var kid,kidImg;
var bg,bgImg;
var covid,covid2,covid3,covid4,covid5,covid6,obstaclesGroup;
var pandemic,obstaclesGroup;
var invisibleGround;
var mask,maskImg,masksGroup;
var sanitizer,sanitizerImg,sanitizersGroup;
var score = 1;
var gameState="START";

function preload(){
    bgImg = loadImage("bg.jpg");
    kidImg = loadImage("kid.gif");
    covid = loadImage("covid1.png");
    covid3 = loadImage("covid3.png");
    covid4 = loadImage("covid4.png");
    covid5 = loadImage("covid5.png");
    covid6 = loadImage("covid6.png");
    maskImg = loadImage("mask.png");
    sanitizerImg = loadImage("sanitizer.png");
}

function setup(){
    createCanvas(displayWidth/2,displayHeight/1.6);

    bg = createSprite(displayWidth/2.8,310.5,1,1);
    bg.addImage(bgImg);
    bg.velocityX = -4;
    bg.scale = 1.6;

    invisibleGround = createSprite(460,600,920,1);
    invisibleGround.visible = false;

    kid = createSprite(90,280,1,1);
    kid.addImage(kidImg);
    kid.scale = 0.2;

    obstaclesGroup = createGroup();
    masksGroup = createGroup();
    sanitizersGroup = createGroup();
}

function draw(){
  background("black");


  if(gameState==="START"){
    fill("white");
    textSize(20);
    text("Be safe from the Coronavirus and grab the masks & sanitizers",displayWidth/10,displayHeight/3.2);
    text("Press ENTER to start",displayWidth/5,displayHeight/2.8);    
  }

  if(keyDown(13)){
    gameState="PLAY";
  }

  if(gameState==="PLAY"){
    if(keyDown("space")&&kid.y>100){
        kid.velocityY = -12;
    }

    if(bg.x<displayWidth/7){
      bg.x = displayWidth/2.8;
  }

    kid.velocityY = kid.velocityY + 0.8;

    spawnCovid();
    spawnMasks();
    spawnSanitizers();

    kid.collide(invisibleGround);

    if(kid.isTouching(masksGroup)){
      score = score+1;
      masksGroup.destroyEach();
    }

    if(kid.isTouching(sanitizersGroup)){
      score = score+1;
      sanitizersGroup.destroyEach();
    }

    if(kid.isTouching(obstaclesGroup)){
      score = score-3;
      obstaclesGroup.destroyEach();
    }

    if(score<=0){
      fill("white");
      textSize(20);
      text("Game Over",displayWidth/4.5,displayHeight/3);
      bg.visible=false;
      masksGroup.setVisibilityEach(false);
      sanitizersGroup.setVisibilityEach(false);
      obstaclesGroup.setVisibilityEach(false);
      masksGroup.setLifetimeEach(-1);
      sanitizersGroup.setLifetimeEach(-1)
      obstaclesGroup.setLifetimeEach(-1)
    }

    drawSprites();

    fill("black");
    textSize(20);
    text("Score: "+score,displayWidth/60,displayHeight/20);
  }
}

function spawnCovid(){
    if (frameCount % 100 === 0){
      var obstacle = createSprite(displayWidth/1.5,displayHeight/4,1,1);
      obstacle.velocityX = -5
      
       //generate random obstacles
       var rand = Math.round(random(1,5));
       switch(rand) {
         case 1: obstacle.addImage(covid);
         obstacle.y = 310;
         obstacle.scale = 0.3;
                 break;
        case 2: obstacle.addImage(covid3);
         obstacle.scale = 0.1;
                 break;
        case 3: obstacle.addImage(covid4);
         obstacle.scale = 0.2;
                 break;
        case 4: obstacle.addImage(covid5);
         obstacle.scale = 0.14;
                 break;
        case 5: obstacle.addImage(covid6);
         obstacle.scale = 0.2;
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }

   function spawnMasks(){
    if (frameCount % 160 === 0){
      var mask = createSprite(displayWidth/1.5,displayHeight/3.5,1,1);
      mask.velocityX = Math.round(random(-10,-6));
      mask.addImage(maskImg);
      mask.scale = 0.5;
      
       //assign scale and lifetime to the obstacle           
       
       mask.lifetime = 300;
      
      //add each obstacle to the group
       masksGroup.add(mask);
    }
   }

   function spawnSanitizers(){
    if (frameCount % 100 === 0){
      var sanitizer = createSprite(displayWidth/1.5,random(displayHeight/20,displayHeight/10),1,1);
      sanitizer.velocityX = -5
      sanitizer.addImage(sanitizerImg)
      sanitizer.scale = 0.2;
      
       //assign scale and lifetime to the obstacle           
       
       sanitizer.lifetime = 300;
      
      //add each obstacle to the group
       sanitizersGroup.add(sanitizer);
    }
   }