var canvas = document.getElementById("myCanvas");
var wx = document.documentElement.clientWidth;
var wy = document.documentElement.clientHeight-50;

  canvas.width =wx;
  canvas.height=wy;

var ctx = canvas.getContext("2d");

function drawMain(){
ctx.drawImage(back0, 0, 0, wx, wy);
ctx.drawImage(button2, wx*0.93-wx*0.4, wy*0.87, wx*0.4, wy*0.1);
ctx.drawImage(startscore, wx*0.1, wy*0.6, wx*0.8, wy*0.25);

$(document).ready(function(){
var startBttn = new Button("bttnImage",canvas, wx*0.07, wy*0.87,  wx*0.4, wy*0.1);
startBttn.addClickAction(function(){	location.replace("index0.html"); }	);
});

$(document).ready(function(){
var startBttn = new Button("topbutton1",canvas, wx*0.01, wy*0.01,  wx*0.1,  wx*0.1);
startBttn.addClickAction(function(){	location.replace("index00.html"); }	);
});

requestAnimationFrame(drawMain);

}

drawMain();
