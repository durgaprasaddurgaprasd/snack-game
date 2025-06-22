const board=document.getElementById('board');
let res=document.getElementById('score');
let aud=document.getElementById('audio');
let snake=[42];
let head=snake[0];
let direction=1;
let score=0;
let cells=[];
let food=45;
for(let i=0;i<100;i++)
{
   let cell1=document.createElement('div');
   cell1.classList.add('cell');
   board.appendChild(cell1);
   cells.push(cell1);
}
makeFood();
draw();
timer=setInterval(move,600);
function move()
{
    let head=snake[0];
    let next=head+direction;
       if(next<0||next>=100||(direction==1&&head%10==9)||(direction==-1&&head%10==0))
       {
        clearInterval(timer);
        alert("score:"+score);
        return;
       }
       if (snake.includes(next)) {
    clearInterval(timer);
    alert("Game Over! You hit yourself.");
    return;
       }

       if(next==food)
       {
        score+=1;
        res.innerText="Score:"+score;
        snake.unshift(next);
        aud.play();
        makeFood();
       }
       else{
        snake.unshift(next);
        snake.pop();
       }

       draw();
}/*
function makeFood()
{
    for(let i=0;i<100;i++)
    { 
        let isOnSnake = false;
        for(let j=0;j<snake.length;j++)
        {
         if(i==snake[j])
         {
            isOnSnake = true;
            break;
         }
        }
        if(!isOnSnake)
        {
            food=i;
            break;
        }
    }
}*/
function makeFood() {
  for (let i = 0; i < 100; i++) {
    let randomPos = Math.floor(Math.random() * 100);
    if (!snake.includes(randomPos)) {
      food = randomPos;
      break; // found a good spot, exit loop
    }
  }
}
function draw()
{
    for(let i=0;i<100;i++)
    {
       cells[i].className='cell';
    }
    for(let i=0;i<100;i++)
    {
        for(let j=0;j<snake.length;j++)
        {
            if(i==snake[j])
            {
                cells[i].classList.add('snake');
            }
        }
    }
    cells[food].classList.add('food');
}
 function keys(val)
 {
    if(val==='up') direction=-10;
    else if(val=='bottom') direction=10;
    else if(val=='left') direction=-1;
    else if(val=='right') direction=1;
 }
document.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight') direction=1;
    if(e.key==='ArrowLeft') direction=-1;
    if(e.key==='ArrowUp') direction=-10;
    if(e.key==='ArrowDown') direction=10;
}
);