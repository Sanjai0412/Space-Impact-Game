let gameInterface=document.getElementById('game-interface');
let spaceShip=document.getElementById('space-ship');
let bulletInterface=document.getElementById('bullet-interface');
let alienHipPoints=document.getElementById('alien-hippoints');
let userHipPoints=document.getElementById('user-hippoints');


let alien=document.getElementById('alien');
let alienImage=document.getElementById('alien-img');
let alienPoints=20;  // hip points for alien
let userPoints=10;  // hip points for user space ship

let topp=0;
let topReached=false;
let bottomReached=false;
let speed=0;
let alienBulletSpeed=0;
let isGameOver=false;

// check the button click is(Arrow up / Arrow down)
function control(e){
   if(!isGameOver){
    if(e.code=='ArrowUp' && !topReached){
        up(spaceShip);  // if it is Arrow up , then call the 'Up' Function
    }
    else if(e.code=='ArrowDown' && !bottomReached){
        down(spaceShip);  // if it is Arrow down , then call the 'Down' Function 
    }
   }
}

// Minus the top 'px' to move the object position to top
function up(object){
       bottomReached=false;
       topp-=4;
       object.style.top=topp+'px';

       if(topp==8){  // if the object reached the maximum height of the game interface
          topReached=true;   // setting topReached as 'true'
       }
}

// Adding the top 'px' to move the object position to the bottom
function down(object){
    topReached=false;
    topp+=4;
    object.style.top=topp+'px';

    if(parseInt(object.style.top)==276){  // if the object reached the bottom of the game interface
      bottomReached=true;  // setting bottomReached as 'true'
    }
}

// Creating bullets from the space ship
function Ufobullets(object){

    if(!isGameOver){    // Generate bullet, if game is not over
        speed=15
        let ufoHeight=parseInt(object.style.top)+20;  // adding 20px for top to center the bullet on ufo

        // creating div for bullets
        let bullet=document.createElement('div');
        bullet.className='bullet';
      
        let bulletInterval=setInterval(() => {
          
            speed+=10;  // increasing speed o fthe bullet 
    
             let touch= isTouchingAlien(bullet,alien);

             // if bullet reach the right end of the bullet interface 
                if(parseInt(bullet.style.left)>900 || touch){
                    clearInterval(bulletInterval); // clear the interval
                    bullet.remove()   // remove the bullet
                    Ufobullets(object) // call the function to regenerate the anothor bullet
                }
                else{
                    bullet.style.top=ufoHeight+'px';   // height of the bullet is same as the space ship height
                    bullet.style.left=speed+'px';  // set the left position as speed
                    bulletInterface.append(bullet)   // append to the bullet interface
                }
        }, 10)
    }
}

Ufobullets(spaceShip)    // cal the function to generate the bullet

// generating bullets for alien same as ufo Bullets
function alienBullets(alien){
    if(!isGameOver){
        alienBulletSpeed=370;
        let alienBullet=document.createElement('div');
        alienBullet.className='alien-bullet';
    
        let a=parseInt(alien.style.top);

        let bulletInterval=setInterval(()=>{
            alienBulletSpeed+=10;
            let touch=isTouchingUser(alienBullet,spaceShip);
            if(parseInt(alienBullet.style.right) >1253 || touch){
                clearInterval(bulletInterval);
                alienBullet.remove()
                alienBullets(alien);
            }
            else{
                alienBullet.style.top=a+50+'px';
                alienBullet.style.right=alienBulletSpeed+'px';
                bulletInterface.append(alienBullet);
            }
        },30)
    }
}

 alienBullets(alien);

function isTouchingUser(abullet,user){

    
    let touch=false ;
    let u=user.getBoundingClientRect();
    let b=abullet.getBoundingClientRect();


    // checking the bullet is touching the ufo or not
    if(b.right >800 && b.right<830 && b.top > u.top && b.bottom < u.bottom){
        userPoints-=1;
        touch=true;
        userHipPoints.textContent='User : '+userPoints;
        console.log(userPoints+'sanjai');
        if(userPoints + alienPoints == 0){
            let gameOver=document.getElementById('game-over');
            gameOver.textContent='Game Over :( ';
            spaceShip.id='';
            isGameOver=true
           }
         else if(userPoints==0){
            let gameOver=document.getElementById('game-over');
            gameOver.textContent='Game Over :( ';
            spaceShip.id='';
            isGameOver=true
       }
    }
    return touch;

}

// checking the alien and the bullets are touching are not
function isTouchingAlien(obj1,obj2){
    let touch =false;

    let a=obj2.getBoundingClientRect();

    let b=obj1.getBoundingClientRect();
        
    if( b.left > 870  && b.top > a.top  && b.bottom < a.bottom){
        
         alienPoints-=1;
         alienHipPoints.textContent='Alien : '+alienPoints;
         touch=true;
         if(userPoints + alienPoints == 0){
            let gameOver=document.getElementById('game-over');
            gameOver.textContent='Game Over :( ';
            spaceShip.id='';
            isGameOver=true
           }
          else if(alienPoints==0){  // if the hip points of the alien is 0 

              let gameOver=document.getElementById('game-over');

              gameOver.textContent='You Won :) ';    // Game over Message for h1 tag

              alien.id='';  // clear the id name of the alien to stop the animation of the alien

              alienImage.remove();
              isGameOver=true  // Setting game over as 'true'
         }
    }
    return touch;   // return the boolien , is touching or not
}


let a=0;
// Adding animation to the alien for up and down
function alienAnimation(alien){

        let alienUp=setInterval(()=>{
            a+=1;
            alien.style.top=a+'px';
            if(a==100){
              clearInterval(alienUp);
              
              let alienDown=setInterval(()=>{
                  a-=1;
                  alien.style.top=a+'px';
                  if(a==9){
                      clearInterval(alienDown)
                      alienAnimation(alien)
                  }
              },15)
    
            }
       },15) 
}
alienAnimation(alien);  // call the function to add animation to the alien


// listen the each press of all key, and pass it to the control function
document.addEventListener('keydown',control);


