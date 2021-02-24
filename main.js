let cards = document.getElementById('viewport')



let cardNumber = 4

let arrayOfNumbersFromNumber = (numberOfIndexes) =>{
	let arr = []
	for(let i = 0; i < numberOfIndexes; i++){
		arr.push(i)
	}
	
	return arr
}

let cardIndexArray = arrayOfNumbersFromNumber(cardNumber)

for(let i = 0; i < cardNumber; i++){
	
	let cardWrapper = document.createElement('div')
	if(i === 0){
		cardWrapper.className = 'card-wrapper'
		
	}
	else{
		cardWrapper.className = 'card-wrapper'
	}
	
	cardWrapper.setAttribute('id', `${i}`)
	let card = document.createElement('div')
	
	switch(i){
		case 1:
			card.className='card'
			card.style.background = 'pink'
			break;
		case 0:
			card.className='card'
			card.style.background = 'blue'
			break;
		case 2:
			card.className='card'
			card.style.background = 'grey'
			break;
		default:
			card.className='card'
	}

	
	cardWrapper.appendChild(card)
	cards.appendChild(cardWrapper)
}
let cardWrappers = document.querySelectorAll('.card-wrapper')


let totalCards = document.querySelectorAll('card-wrapper')





let mainIndex = 1;
let allElements = document.querySelectorAll('.card-wrapper')

let inView = shiftCardsLeft(mainIndex, cardIndexArray)

console.log(allElements[inView[1]])


let heldDown = false
let startX;
let prev
let currentX;
let previous;
let posX = 0

let timeDown;
let timeUp;
let difTime;

let card = document.getElementById(mainIndex)
console.log(card)

const mouseDownListener = (event) => {
	event.preventDefault();
	startX = event.clientX
	
	heldDown = true
	timeDown = new Date()
	
	
}

cards.addEventListener('mousedown', mouseDownListener)

const mouseUpListener = (event) => {
	event.preventDefault();
	currentX = event.clientX
	heldDown = false
	timeUp = new Date()
	difTime = timeDown.getTime()  - timeUp.getTime()
	console.log(difTime)
	resetPosition(difTime,startX, currentX)
}

document.addEventListener('mouseup', mouseUpListener)

const mouseMoveListener = (event) => {
	event.preventDefault();
	let move;
	previous = previous ? previous : startX 
	let current = event.clientX
	
	if(current - previous > 0){
		move = 'right'
	}
	else{
		move = 'left'
	}

	if(heldDown) {
		posX = posX + (current - previous)
		
		let cardWidth = allElements[0].offsetWidth
		console.log(posX)
		if(move === 'left'){
			
			if(posX < (-cardWidth * mainIndex) + cardWidth / 2){
				mainIndex++
				console.log(cardWidth)
				console.log('mainIndex',mainIndex)
				console.log('posX',posX)
				
				if(mainIndex > allElements.length){
					mainIndex--
					posX = (-cardWidth * mainIndex) + cardWidth /2
				}
				
			}			
		}
		else if (move === 'right'){
		console.log(posX)
			if(posX > (-cardWidth * (mainIndex -1)) + cardWidth / 2){
				mainIndex--
				console.log('mainIndex lefts',mainIndex)
				console.log('posX',posX)
				
				if(mainIndex < 1){
					mainIndex++
					posX = cardWidth / 2
				}
				
			}			
		}
		
			
		
		for(let i = 0; i < allElements.length; i++){
			let card = allElements[i]			
		
			
			
			card.style.transform = `translateX(${posX}px)`
		
				
		}
		
		
		
	}
	
	previous = current;
}

cards.addEventListener('mousemove', mouseMoveListener)



const resetPosition = (time, beginning, end) => {
	console.log((end - beginning)/time,'px/s')

	const k = 0.1
	let resetPos = (mainIndex - 1) * allElements[0].offsetWidth
	let dX = k  * (resetPos + posX)
	
	var move = function() {
		
		posX -= dX
		dX = k * (resetPos + posX)
		for(let i = 0; i < allElements.length; i++){
			let card = allElements[i]
			let cardWidth = card.offsetWidth
			let offsetX = (i - mainIndex) * cardWidth
		card.style.transform = `translateX(${posX}px)`
		
		if(posX < -resetPos + 11 && posX >  -resetPos -11){
			for(let i = 0; i < inView.length; i++){
				let card = allElements[inView[i]]
			card.style.transform = `translateX(${-resetPos}px)`
			}
			posX = -resetPos
			return 
		}
		}
		
		
		window.requestAnimationFrame(move)
}
	window.requestAnimationFrame(move)
	
}


