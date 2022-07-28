var bc, backgroundImage
var nave, naveImage
var naveMala, naveMalaImage1,naveMalaImage2,naveMalaImage3,naveMalaImage4
var naveMalaGroup=[]
var rayos=[]
var rayo, rayoImage
var score=0
var edges=[]

function preload() {
backgroundImage=loadImage("espacio.jpg")
naveImage=loadImage("Nave1.png")
naveMalaImage1=loadImage("Nave Mala1.png")
naveMalaImage2=loadImage("Nave Mala2.png")
naveMalaImage3=loadImage("Mounstro.png")
naveMalaImage4=loadImage("Nave Mala4.png")
rayoImage=loadImage("Rayo3.png")
}

function setup(){
createCanvas(windowWidth, windowHeight)
bc=createSprite(width/2,height/2,width,height)
bc.addImage(backgroundImage)
bc.scale=2.5

nave=createSprite(width/2,height/2+500)
nave.addImage(naveImage)
nave.scale=0.6

naveMalaGroup=new Group();

edges=createEdgeSprites();
}


function draw(){
background("green");
if (keyDown(LEFT_ARROW)) {
 nave.x=nave.x-14
}

if (keyDown(RIGHT_ARROW)) {
    nave.x=nave.x+12 
   }

if (keyDown("space")) {
      rayos1 ();
   }

enemigos()
for (let index = 0; index < rayos.length; index++) {
colision(index)
}

for (var index = 0; index < naveMalaGroup.length; index++) {
  colision(index);
  if (naveMalaGroup.collide(edges[3])) {
    gameOver()
  }
}



if (score>=5) {
  win()
}

drawSprites();
textSize(50)
fill("red")
text("Naves destruidas: "+score,width/2+700,height/2-650)
}

function enemigos(){
if (frameCount%60===0) {
  naveMala=createSprite(width/2,height/2-700)
  naveMala.x=Math.round(random(200,2000))
  naveMala.velocityY=5
  naveMala.debug=true

  var imagenes=Math.round(random(1,4))
  
  switch (imagenes) {
    case 1:naveMala.addImage(naveMalaImage3)
      break;
    case 2:naveMala.addImage(naveMalaImage2)
      break;
    case 3:naveMala.addImage(naveMalaImage1)
      break;
    case 4:naveMala.addImage(naveMalaImage4)
      break;
    default:
      break;
  }
  naveMala.scale=0.7
  naveMala.lifetime=280
  naveMalaGroup.push(naveMala)
}
}

function rayos1 (){
  rayo=createSprite(nave.x, nave.y)
  rayo.addImage(rayoImage)
  rayo.scale=0.2
  rayo.velocityY=-15
  rayos.push(rayo)
}

function colision(index){
  for (var i = 0; i < naveMalaGroup.length; i++){
    if (rayos[index]!== undefined && naveMalaGroup[i]!== undefined) {
    if (rayos[index].collide(naveMalaGroup[i]) ) {
      score+=1
      naveMalaGroup[i].remove(i);
      rayos[index].remove(index);
      delete rayos[index];
    }
    }
  }
}

function gameOver() {
  swal(
    {
      title: `¡Fin del juego!`,
      text: "¡Gracias por jugar!",
      imageUrl:
      "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55962/sports-medal-emoji-clipart-md.png",
      imageSize: "150x150",
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  )
}

function win(){
  swal(
    {
      title: `¡Felicidades!`,
      text: "¡Lo hiciste incleible!",
      imageUrl:
      "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/55962/sports-medal-emoji-clipart-md.png",
      imageSize: "150x150",
      confirmButtonText: "Jugar de nuevo"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  )
}
