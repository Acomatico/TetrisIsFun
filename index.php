<?php
if(isset($_POST['puntuacion'])){
	
}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="author" content="ARodriguez">
	<meta name="description" content="Tetris game">
	<title>Tetris</title>
	<script type="text/Javascript" src="index2.js"></script>
	<style type="text/css">
		*{
			box-sizing:border-box;
		}
		body{
			margin:0;			
		}
		section{
			position:absolute;
			top:10px;
			left:300px;
			margin: 0;
			border:2px inset black;
			background-color:rgba(230,230,230,0.5);
			overflow:hidden;
		}
		#next{
			position:absolute;
			top:10px;
			left:800px;
			border:2px inset black;
			background-color:rgba(230,230,230,0.5);
			width:204px;
			height:150px;
			margin:20px;
		}
		div{
			font-family:Papyrus;
		}
		#overlay{
			width:100%;
			height:100%;
			display:none;
			position:fixed;
			top:0;
			left:0;
			z-index:2;
			background-color:rgba(0,0,0,0.5);
		}
		#end{
			width:50%;
			display:none;
			position:fixed;
			top:250px;
			left:25%;
			z-index:3;
			background-color:white;
			border:4px outset lightblue;
		}
	</style>
</head>
<body onkeypress="Javascript:checkButton(event);">
	<section id="juego" style="width:500px; height:600px; box-sizing:content-box;">
	</section>
	<div id="next">
	</div>
	<div style="margin:5px; border:2px outset black; width:175px;">
		<h2>Puntuacion</h2>
		<div id="puntuacion">
	
		</div>
	</div>
	<div id="overlay"></div>
	<div id="end">
		<p>Good job ladie</p>
		<form action="#" method="POST">
			<input type="number" value="0" name="puntuacion" id="punt2" disabled autocomplete="off"/>
			<input type="submit" value="Submit Highscore"/>
		</form>
	</div>
	<input type="button" value="Start" onclick="Javascript:autorun(this)"/>
</body>
</html>