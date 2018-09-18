var arrayPosiciones;
var arrayCuadros;
var filas;
var columnas;
var caida;
var arrayTransf;
var cuadrosNext;
var puntuacion = 0;
function autorun(boton){
	boton.style.display = "none";
	var fondo = window.document.getElementById("juego");
	filas = ((parseInt(fondo.style.height))/50)+1;
	columnas = (parseInt(fondo.style.width)/50);
	arrayCuadros = new Array(filas)
	arrayTransf = new Array(filas);
	arrayPosiciones = new Array(filas);
	for(var i = 0; i < filas;i++){
		arrayTransf[i] = new Array(columnas)
		arrayCuadros[i] = new Array(columnas)
		arrayPosiciones[i] = new Array(columnas)
		var fila = window.document.createElement("div");
		fondo.appendChild(fila)
		for(var j = 0; j < columnas; j++){
			arrayTransf[i][j] = 0;
			arrayPosiciones[i][j] = 0;
			var cuadro = window.document.createElement("div");
			arrayCuadros[i][j] = cuadro;
			cuadro.id = i+","+j;
			cuadro.style.width = "50px";
			cuadro.style.height = "50px";
			cuadro.style.position = "absolute";
			cuadro.style.bottom = (i*50)+"px";
			cuadro.style.left = j*50+"px";
			//cuadro.style.backgroundColor = "darkblue";
			cuadro.style.border = "2px outset black"
			cuadro.style.display = "none";
			
			fila.appendChild(cuadro);
			
		}
		
	}
	var next = window.document.getElementById("next");
	cuadrosNext = new Array(4);
	for(var i = 0; i < 4; i++){
		cuadrosNext[i] = new Array(4);
		var fila = window.document.createElement("div");
		next.appendChild(fila);
		for(var j = 0; j < 4; j++){
			var cuadro = window.document.createElement("div");
			cuadrosNext[i][j] = cuadro;
			cuadro.style.width = "50px";
			cuadro.style.height = "50px";
			cuadro.style.position = "absolute";
			cuadro.style.display = "none";
			cuadro.style.top = i*50+"px";
			cuadro.style.left = j*50+"px";
			cuadro.style.border = "2px outset black";
			
			fila.appendChild(cuadro);
		}
	}
	empezar()
	
}	

class figura{
	
	
	constructor(tipo){
		
		this.color;
		if(tipo == "cuadrado"){
			arrayPosiciones[12][4] = 1
			arrayPosiciones[12][5] = 1
			arrayPosiciones[11][4] = 1
			arrayPosiciones[11][5] = 1
			figura.color = "blue";
		}
		if( tipo == "linea"){
			arrayPosiciones[12][3] = 1
			arrayPosiciones[12][4] = 1
			arrayPosiciones[12][5] = 1
			arrayPosiciones[12][6] = 1
			figura.color  = "purple";
		}
		if(tipo == "triangulo"){
			arrayPosiciones[12][4] = 1
			arrayPosiciones[12][5] = 1
			arrayPosiciones[12][6] = 1
			arrayPosiciones[11][5] = 1
			figura.color = "orange"
		}
		if(tipo == "ele"){
			arrayPosiciones[12][4] = 1
			arrayPosiciones[12][5] = 1
			arrayPosiciones[12][6] = 1
			arrayPosiciones[11][6] = 1
			figura.color = "lime";
		}
		if(tipo == "ele2"){
			arrayPosiciones[12][4] = 1
			arrayPosiciones[12][5] = 1
			arrayPosiciones[12][6] = 1
			arrayPosiciones[11][4] = 1
			figura.color = "yellow";
		}
		if(tipo == "silla"){
			arrayPosiciones[12][4] = 1
			arrayPosiciones[12][5] = 1
			arrayPosiciones[11][5] = 1
			arrayPosiciones[11][6] = 1
			figura.color = "cyan";
		}
		if(tipo == "silla2"){
			arrayPosiciones[12][5] = 1
			arrayPosiciones[12][6] = 1
			arrayPosiciones[11][5] = 1
			arrayPosiciones[11][4] = 1
			figura.color = "red";
			
		}
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				
				if(arrayPosiciones[i][j] == 1){
					arrayCuadros[i][j].style.display = "block";
					arrayCuadros[i][j].style.backgroundColor = figura.color;
				}
			}
		}
		
	}
	
	recalcular(){
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				if(arrayPosiciones[i][j] == 2){
					arrayCuadros[i][j].style.display = "block";
					arrayCuadros[i][j].style.backgroundColor = "grey"
					arrayTransf[i][j] = 0;
					continue;
				}
				if(arrayTransf[i][j] == 1){
					arrayPosiciones[i][j] = 1;
					arrayCuadros[i][j].style.display = "block";
					arrayCuadros[i][j].style.backgroundColor = figura.color
				}
				if(arrayTransf[i][j] == 0 || arrayPosiciones[i][j] == 0){
					arrayCuadros[i][j].style.display = "none";
				}
				arrayTransf[i][j] = 0;
				if(arrayPosiciones[i][j] == 3){
					arrayPosiciones[i][j] = 0
				}
			}
			
		}
	}
	deshacer(){
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				if(arrayPosiciones[i][j] == 3){
					arrayTransf[i][j] = 1;
				}
				else{
					arrayTransf[i][j] = 0;
				}
				
			}
			
		}
		this.recalcular();
	}
	
	
	parar(){
		
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				if(arrayPosiciones[i][j] == 1){
					arrayPosiciones[i][j] = 2;

				}
			}
			
			
		}
		this.comprobar()
	}
	comprobar(){
		for(var k = 0; k < columnas;k++){
			if(arrayPosiciones[11][k] == 2){
				clearInterval(caida);
				alert("Game Over");
				return;
			}
		}
		var contador = 0;
		for(var i = 0; i < filas; i++){
			if(arrayPosiciones[i][0] == 2 && arrayPosiciones[i][1] == 2 && arrayPosiciones[i][2] == 2 && arrayPosiciones[i][3] == 2 && arrayPosiciones[i][4] == 2 && arrayPosiciones[i][5] == 2 && arrayPosiciones[i][6] == 2 && arrayPosiciones[i][7] == 2 && arrayPosiciones[i][8] == 2 &&arrayPosiciones[i][9] == 2){
				for(var j = 0; j < columnas;j++){
					arrayPosiciones[i][j] = 0
					puntuacion = puntuacion + 10
					var scoreBoard = window.document.getElementById("puntuacion");
					scoreBoard.innerHTML = puntuacion
				}
				this.recalcular();
				this.limpiar(i);
				contador++
			}
			
		}
		if(contador == 0){
			empezar()
		}
		
	}
	limpiar(distancia){
		
		console.log(distancia)
		for(var i = distancia; i < filas; i++){
			for(var j = 0; j < columnas;j++){
				if(arrayPosiciones[i][j] == 2){
					arrayPosiciones[i][j] = 1;					
				}
			}
		}
		console.log(arrayPosiciones)
		this.limpiar2()
	}
	limpiar2(){
		for(var i = 0; i < filas ;i++){
			for(var j = 0; j < columnas;j++){
				if(arrayPosiciones[i][j] == 1){
					
					caer()
					return
				}
			}
		}
		
		empezar()
		
	}
	moverAbajo(){
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				
				if(arrayPosiciones[i][j] == 1 && i > 0){
					arrayTransf[i-1][j] = 1
					arrayPosiciones[i][j] = 0;
					
				}
			}
		}
		this.recalcular()
	}
	moverDerecha(horizontal){
		
		
		for(var i = 0; i < filas; i++){
			for(var j = columnas-1; j >= 0; j--){
				
				
				if(arrayPosiciones[i][j] == 1){
					if(arrayPosiciones[i][j+horizontal] == 2 || j == columnas-1){
						this.deshacer()
						return
					}
					arrayTransf[i][j+horizontal] = 3;
					
				}
			}
		}
		for(var i = 0; i < filas; i++){
			for(var j = columnas-1; j >= 0; j--){
				if(arrayPosiciones[i][j] == 1){
					arrayPosiciones[i][j] = 0;
				}
				
				if(arrayTransf[i][j] == 3){
					arrayTransf[i][j] = 1;
				}
			}
		}
		this.recalcular()
	}
	moverIzq(horizontal){
		
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				
				if(arrayPosiciones[i][j] == 1){
					if(arrayPosiciones[i][j+horizontal] == 2 || j == 0){
						this.deshacer()
						return
					}
					arrayTransf[i][j+horizontal] = 3;
					
				}
			}
		}
		for(var i = 0; i < filas; i++){
			for(var j = columnas-1; j >= 0; j--){
				if(arrayPosiciones[i][j] == 1){
					arrayPosiciones[i][j] = 0;
				}
				
				if(arrayTransf[i][j] == 3){
					arrayTransf[i][j] = 1;
				}
			}
		}
		this.recalcular()
	}
	rotar(){
		
		var X = 0;
		var Y = 0;
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				
				if(arrayPosiciones[i][j] == 1){
					var X = j;
					var Y = i;
					this.rotar2(X,Y)
					
					return;
				}
			}
		}
		
	}
	rotar2(X,Y){
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				if(arrayPosiciones[i][j] == 1){
					var X2 = j-X;
					var Y2 = i-Y;
					//console.log(X2+","+Y2)
					var Xfinal = Y2;
					var Yfinal = -X2;
					var Ifinal = Yfinal+Y;
					var Jfinal = Xfinal+X;
					//console.log("inicial "+i+","+j+"final "+Ifinal+","+Jfinal)
					if(Jfinal >= columnas || Jfinal < 0 || Ifinal >= filas || Ifinal < 0 ){
						this.deshacer()
						return;
					}
					if(arrayPosiciones[Ifinal][Jfinal] == 2){
						this.deshacer();
						return;
					}
					arrayPosiciones[i][j] = 3;
					arrayTransf[Ifinal][Jfinal] = 1
					
				}
			}
		}
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				if(arrayPosiciones[i][j] == 1){
					arrayPosiciones[i][j] = 0;
				}
			}
		}
		this.recalcular()
	}
}
var nextFigura;
var aleatorio = 0;
var figuraNueva;
var caida;
var counter = 0;
function empezar(){
	var arrayFiguras = ["cuadrado", "linea", "silla", "silla2", "ele", "ele2", "triangulo"];
	
	if(aleatorio == 0){
		var random = Math.trunc(arrayFiguras.length*Math.random())
		var figuraElegida = arrayFiguras[random];
		aleatorio++
	}
	else{
		var figuraElegida = nextFigura
	}
	var random2 =  Math.trunc(arrayFiguras.length*Math.random())
	nextFigura = arrayFiguras[random2];
	
	window.figuraNueva = new figura(figuraElegida);
	caida = setInterval(caer,500);
	siguienteCuadro(nextFigura);
	//console.log(arrayPosiciones)
	
}

function siguienteCuadro(tipo){
	var color;
	if(tipo == "cuadrado"){
		color = "blue";
	}
	if(tipo == "linea"){
		color = "purple";
	}
	if(tipo == "triangulo"){
		color = "orange";
	}
	if(tipo == "ele"){
		color = "lime";
	}
	if(tipo == "ele2"){
		color = "yellow";
	}
	if(tipo == "silla"){
		color = "cyan";
	}
	if(tipo == "silla2"){
		color = "red";
	}
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4;j++){
			cuadrosNext[i][j].style.display = "none";
			cuadrosNext[i][j].style.backgroundColor = color;
		}
	}
	
	console.log(cuadrosNext)
		if(tipo == "cuadrado"){
			cuadrosNext[0][2].style.display = "block";
			cuadrosNext[0][1].style.display = "block";
			cuadrosNext[1][2].style.display = "block";
			cuadrosNext[1][1].style.display = "block";
			
		}
		if( tipo == "linea"){
			cuadrosNext[0][0].style.display = "block"
			cuadrosNext[0][1].style.display = "block"
			cuadrosNext[0][2].style.display = "block"
			cuadrosNext[0][3].style.display = "block";
			
		}
		if(tipo == "triangulo"){
			cuadrosNext[0][1].style.display = "block";
			cuadrosNext[0][2].style.display = "block";
			cuadrosNext[0][3].style.display = "block";
			cuadrosNext[1][2].style.display = "block";
			
		}
		if(tipo == "ele"){
			cuadrosNext[0][0].style.display = "block";
			cuadrosNext[0][1].style.display = "block";
			cuadrosNext[0][2].style.display = "block";
			cuadrosNext[1][2].style.display = "block";
			
		}
		if(tipo == "ele2"){
			cuadrosNext[0][0].style.display = "block";
			cuadrosNext[0][1].style.display = "block";
			cuadrosNext[0][2].style.display = "block";
			cuadrosNext[1][0].style.display = "block";
			
		}
		if(tipo == "silla"){
			cuadrosNext[0][0].style.display = "block";
			cuadrosNext[0][1].style.display = "block";
			cuadrosNext[1][1].style.display = "block";
			cuadrosNext[1][2].style.display = "block";
			
		}
		if(tipo == "silla2"){
			cuadrosNext[0][1].style.display = "block";
			cuadrosNext[0][2].style.display = "block";
			cuadrosNext[1][1].style.display = "block";
			cuadrosNext[1][0].style.display = "block";
			
			
		}
}

function caer(){
	
	counter = 0;
	window.figuraNueva.moverAbajo();
	for(var i = 0; i < filas; i++){
		for(var j = 0; j < columnas; j++){
			if(arrayPosiciones[i][j] == 1){
				if(i > 0){
					if(arrayPosiciones[i-1][j] == 2){
						clearInterval(caida);
						
						setTimeout(esperar,450)
						
					}
				}
				if(i == 0){
					clearInterval(caida);
					
					setTimeout(esperar,450);
				}
			}
		}
	}
}

function esperar(){
	if(counter > 0){
		return;
	}
	counter++
	for(var i = 0; i < filas; i++){
		for(var j = 0; j < columnas; j++){
			if(arrayPosiciones[i][j] == 1){
				if(i > 0){
					if(arrayPosiciones[i-1][j] == 2){
						window.figuraNueva.parar();
						return
					}
				}
				if(i == 0){
					window.figuraNueva.parar();
					return
				}
			}
		}
	}
	window.figuraNueva.moverAbajo()
	caida = setInterval(caer,500);
	
}


function checkButton(e){
	var codigo = e.keyCode;
	if(codigo == 39){
		window.figuraNueva.moverDerecha(1)
	}
	if(codigo == 37){
		window.figuraNueva.moverIzq(-1)
	}
	if(codigo == 38){
		window.figuraNueva.rotar();
	}
	if(codigo == 40){
		clearInterval(caida);
		console.log(arrayPosiciones);
		console.log(arrayTransf);
	}
}
