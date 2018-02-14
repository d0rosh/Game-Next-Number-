var wrapper = document.querySelector('.wrapper');
var startBtn = document.querySelector('#startGame');
var startFirstBtn = document.querySelector('#startGameFirst');
var time = document.querySelector('.time');
var numbers = [];
var sec = 50;
var step = 1;	

startBtn.addEventListener('click',function(){
	drawItem();
	id = setInterval(timeGame,1000);
})

function generateArray(){
	for (var i = 1; i <= 25; i++) {
		numbers.push(i);
	}
}

function timeGame(){
	time.innerText = 'Залишилось: ' + sec + ' секунд';
	sec--;

	if (sec==-1) {
		clearInterval(id);
		time.innerText = 'Ви проіграли!';
	}
	if (step == 26) {
		clearInterval(id);
		time.innerText = 'Ви виграли!';
	}
}

function randomNumber(){
	var length = numbers.length;
	var num = Math.floor(Math.random() * length);
	var x = numbers[num];
	var index = numbers.indexOf(x);
	numbers.splice(index,1);
	return x;
}

function randomSize(){
	var num = Math.floor(Math.random() * (40 - 15) + 15);
	return num + 'px';
}

function randomColor(){
	var r = Math.floor(Math.random() * 10);
	var g = Math.floor(Math.random() * 10);
	var b = Math.floor(Math.random() * 10);

	var color = '#' + r + g + b;

	return color;
}
		

function drawItem(){
	generateArray();
	startBtn.style.display = 'none';
	wrapper.innerHTML = '';
	var table = document.createElement('table');
	for (var i = 0; i < 5; i++) {
		var tr = document.createElement('tr');
		tr.className = 'column';
		for (var k = 0; k < 5; k++) {
			var td = document.createElement('td');
			td.className = 'row';
			td.innerText = randomNumber();
			td.style.fontSize = randomSize();
			td.style.color = randomColor();
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	table.addEventListener('click',nextNumber);
	wrapper.appendChild(table);
	timeGame();
	startFirstBtn.style.display = 'block';
	startFirstBtn.addEventListener('click',repeatGame);
}

function nextNumber(e){
	var target = e.target;
	if (target.tagName != 'TD') return;

	if (target.innerText == step && sec != -1) {
		step++;
		target.style.backgroundColor = '#c00';
	}
}

function repeatGame(){
	if (id) {
		clearInterval(id);
		sec = 50;
		step = 1;
		drawItem();
		id = setInterval(timeGame,1000);	
	}
}


