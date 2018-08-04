/*
   Author: Behnam Azizi
   Date: Sept. 19, 2014

*/
var onSt=false;
document.getElementsByTagName('head')[0].innerHTML += "<img src=\"image/button1.png\" id=\"bttnImage\"></img>\n";
document.getElementsByTagName('head')[0].innerHTML += "<img src=\"image/button4.png\" id=\"bttnImage2\"></img>\n";
document.getElementsByTagName('head')[0].innerHTML += "<img src=\"image/topbutton1.png\" id=\"topbutton1\"></img>\n";
document.getElementsByTagName('head')[0].innerHTML += "<img src=\"image/topbutton2.png\" id=\"topbutton2\"></img>\n";
document.getElementsByTagName('head')[0].innerHTML += "<img src=\"image/button_over.png\" id=\"bttnImageOver\"></img>\n";
document.getElementsByTagName('head')[0].innerHTML += "<img src=\"image/button_pushed.png\" id=\"bttnImagePushed\"></img>\n";
function Button(buttonName,canvas, x, y, w, height){
	setTextColor = function(tColor){
		this.textColor = tColor;
		this.draw();
	};

	setColor = function(color){
		this.color = color;
		this.draw();
	};

	this.setText = function(txt){
		this.text = txt;
		this.width = w;
		this.draw();
	};

	this.clear = function(){

	};

	this.draw = function(){
	if(!onSt){
		this.clear();
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

  }
	};


	this.addMouseDownAction = function  (trigger) {
		var _self = this;
		function clickFunction(evt){
			if(!onSt&&(evt.clientX >= x && evt.clientX <= x + _self.width && evt.clientY >= y+50 && evt.clientY <= y +50+ _self.height)){
				if(trigger != null){
					 trigger();
				 }
				_self.image = _self.pushedImage;
				_self.draw();
				_self.clickDown = true;
			}

		};

		_self.canvas.addEventListener("mousedown", clickFunction, false);
	};


	this.addMouseUpAction = function(trigger){
		var _self = this;
		canvas.addEventListener("mouseup", function (evt) {

			if(_self.clickDown && evt.clientX >= x && evt.clientX <= x + _self.width && evt.clientY >= y+50 && evt.clientY <= y+50 + _self.height){
				if(trigger != null) trigger();
				//console.log("clicked")
			}
			_self.clickDown = false;
			_self.image = _self.defaultImage;
			_self.draw();

		}, false);

	};

	this.addClickAction = function(trigger){
		this.addMouseUpAction(trigger);
		this.addMouseDownAction(null);

	}

	this.addMouseOverAction = function (trigger){
		document.body.style.cursor = "";
		var _self = this;
		function mouseOverFunction(evt){
			//console.log("- Mouse moved");
			if(evt.clientX >= x && evt.clientX <= x + _self.width && evt.clientY >= y && evt.clientY <= y+ _self.height){
				document.body.style.cursor = "pointer";
				//console.log("- Mouse over");
				if(trigger != null) trigger();
				_self.image = _self.overImage;

			}else{
				//console.log("- Mouse away");
				_self.image = _self.defaultImage;
			}

			if(_self.clickDown) _self.image = _self.pushedImage;
			_self.draw();

		};
		_self.canvas.addEventListener("mousemove", mouseOverFunction, false);
	};


	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");

	this.x  = x;
	this.y = y;
	this.width = w;
	this.height = height;


	this.textColor = "Black";
	this.color = "Black";

	this.overImage = document.getElementById("bttnImageOver");
	this.pushedImage = document.getElementById("bttnImagePushed");
	this.defaultImage = document.getElementById(buttonName);

	this.image = this.defaultImage;
	this.clickDown = false;

	this.draw();
	//this.addMouseDownAction(null);
	//this.addMouseOverAction(null);
	//this.addMouseUpAction(null);
}
