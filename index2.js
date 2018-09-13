var arrayPosiciones;
var arrayCuadros;
var filas;
var columnas;
var caida;
var arrayTransf;
function autorun(){
	var fondo = window.document.getElementById("juego");
	filas = ((parseInt(fondo.style.height))/50);
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
			cuadro.style.backgroundColor = "darkblue";
			cuadro.style.border = "2px outset lightblue"
			cuadro.style.display = "none";
			
			fila.appendChild(cuadro);
			
		}
		
	}
	empezar()
	
}	

class figura{
	constructor(tipo){
		
		if(tipo == "cuadrado"){
			arrayPosiciones[11][4] = 1
			arrayPosiciones[11][5] = 1
			arrayPosiciones[10][4] = 1
			arrayPosiciones[10][5] = 1
		}
		if( tipo == "linea"){
			arrayPosiciones[11][3] = 1
			arrayPosiciones[11][4] = 1
			arrayPosiciones[11][5] = 1
			arrayPosiciones[11][6] = 1
		}
		if(tipo == "triangulo"){
			arrayPosiciones[11][4] = 1
			arrayPosiciones[11][5] = 1
			arrayPosiciones[11][6] = 1
			arrayPosiciones[10][5] = 1
		}
		if(tipo == "ele"){
			arrayPosiciones[11][4] = 1
			arrayPosiciones[11][5] = 1
			arrayPosiciones[11][6] = 1
			arrayPosiciones[10][6] = 1
		}
		if(tipo == "ele2"){
			arrayPosiciones[11][4] = 1
			arrayPosiciones[11][5] = 1
			arrayPosiciones[11][6] = 1
			arrayPosiciones[10][4] = 1
		}
		if(tipo == "silla"){
			arrayPosiciones[11][4] = 1
			arrayPosiciones[11][5] = 1
			arrayPosiciones[10][5] = 1
			arrayPosiciones[10][6] = 1
		}
		if(tipo == "silla2"){
			arrayPosiciones[11][5] = 1
			arrayPosiciones[11][6] = 1
			arrayPosiciones[10][5] = 1
			arrayPosiciones[10][4] = 1
		}
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				
				if(arrayPosiciones[i][j] == 1){
					arrayCuadros[i][j].style.display = "block";
				}
			}
		}
		
	}
	
	recalcular(){
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				if(arrayPosiciones[i][j] == 2){
					arrayCuadros[i][j].style.display = "block";
					arrayCuadros[i][j].style.backgroundColor = "red"
					continue
				}
				if(arrayTransf[i][j] == 1){
					arrayPosiciones[i][j] = 1;
					arrayCuadros[i][j].style.display = "block";
				}
				if(arrayTransf[i][j] == 0 || arrayPosiciones[i][j] == 0){
					arrayCuadros[i][j].style.display = "none";
				}
				arrayTransf[i][j] = 0;
			}
			
		}
	}
	deshacer(){
		for(var i = 0; i < filas; i++){
			for(var j = 0; j < columnas; j++){
				if(arrayPosiciones[i][j] == 3){
					arrayTransf[i][j] = 1;
				}
				arrayTransf[i][j] = 0;
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
		for(var i = 0; i < filas; i++){
			if(arrayPosiciones[i][0] == 2 && arrayPosiciones[i][1] == 2 && arrayPosiciones[i][2] == 2 && arrayPosiciones[i][3] == 2 && arrayPosiciones[i][4] == 2 && arrayPosiciones[i][5] == 2 && arrayPosiciones[i][6] == 2 && arrayPosiciones[i][7] == 2 && arrayPosiciones[i][8] == 2 &&arrayPosiciones	[i][9] == 2){
				for(var j = 0; j < columnas;j++){
					//arrayPosiciones[i][j] = 0
				}
				//this.recalcular()
				//this.limpiar(i)
			}
			else{
				empezar()
				return
			}
		}
		
	}
	limpiar(distancia){
		for(var i = 0; i < distancia+1;i++){
			for(var j = 0; j < columnas;j++){
				if(arrayPosiciones[i][j] == 2){
					arrayPosiciones[i][j] = 1;
				}
			}
		}
		console.log(caida)
		caida = setInterval(caer,500);
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

var figuraNueva;
var caida;
var counter = 0;
function empezar(){
	var arrayFiguras = ["cuadrado", "linea", "silla", "silla2", "ele", "ele2", "triangulo"];
	var random = Math.trunc(arrayFiguras.length*Math.random())
	var figuraElegida = arrayFiguras[random];
	window.figuraNueva = new figura(figuraElegida);
	caida = setInterval(caer,500);
	//console.log(arrayPosiciones)
	
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
	window.figuraNueva.parar();
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