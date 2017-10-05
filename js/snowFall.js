window.onload = function(){
	//canvas init
	var canvas = document.getElementById("snow");
	var ctx = canvas.getContext("2d");

	//canvas dimension
	var w = window.innerWidth;
	var h = window.innerHeight;

	canvas.width = w;
	canvas.height = h;

	//snowflake particles
	var mp =  100; //maxium particles
	var particles = [];

	for(var i = 0; i < mp; i++){
		particles.push({
			x:Math.random()*w, //x-coordinate
			y:Math.random()*h, //y-coordinate
			r:Math.random()*4+1, //radius
			d:Math.random()*mp //density
		})
	}

	//draw snowflake
	function draw(){
		ctx.clearRect(0,0,w,h);
		ctx.fillStyle = "rgba(255,255,255,0.8)";
		ctx.beginPath();
				
		for(var i=0; i<mp; i++){
			var p = particles[i];
			ctx.moveTo(p.x,p.y);
			ctx.arc(p.x,p.y,p.r,0,2*Math.PI,true); 
		}
		ctx.fill();
		update();
	}

	//Function to move the snowflakes
	var angle = 0;
	function update(){
		angle += 0.01;
			for(var i = 0; i < mp; i++){
				var p = particles[i];
				p.y += Math.cos(angle+p.d) + 1 + p.r/2;
				p.x += Math.sin(angle) * 2;
			
	
				if(p.x > w+5 || p.x < -5 || p.y > h){
					if(i%3 > 0){ //66.67% of the flakes
						particles[i] = {x: Math.random()*w, y: -10, r: p.r, d: p.d};
					}else{
						//If the flake is exitting from the right
						if(Math.sin(angle) > 0){
							//Enter from the left
							particles[i] = {x: -5, y: Math.random()*h, r: p.r, d: p.d};
						}else{
							//Enter from the right
							particles[i] = {x: w+5, y: Math.random()*h, r: p.r, d: p.d};
						}
					}
				}
			}
		}

//animation loop
setInterval(draw, 33);
}