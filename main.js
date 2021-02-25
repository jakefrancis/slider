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


const buildSlider = (id) => {
  const slider = document.getElementById(String(id))

  const sliderChildren = slider.children;

  
}





let mainIndex = 1;


let allElements = cards.children


let heldDown = false
let startX;
let prev
let currentX;
let previous = 0;
let posX = 0

let timeDown;
let timeUp;
let difTime;

let card = document.getElementById(mainIndex)


const mouseDownListener = (event) => {
	event.preventDefault();
	startX = event.clientX
	
	heldDown = true

	
	
}

cards.addEventListener('mousedown', mouseDownListener)

const mouseUpListener = (event) => {
	event.preventDefault();
	currentX = event.clientX
	heldDown = false
  


	resetPosition(posX)
}

document.addEventListener('mouseup', mouseUpListener)

const changeViewIndex = (direction, indexInView ,slideWidth,) => {

}

const moveSlides = (direction,distance,viewPosition) => {

 let changeX = viewDistance + distance

 if(direction === 'right'){
  if (move === 'right'){
	
    if(posX > (-cardWidth * (mainIndex)) + ( cardWidth * 0.25)){
      mainIndex--

      if(mainIndex < 0){
        mainIndex++
        posX = (-cardWidth * (mainIndex)) + ( cardWidth * 0.25)
      }
      
    }			
  }
 }
  
}


const mouseMoveListener = (event) => {
	event.preventDefault();
	previous = previous ? previous : startX 
	let distance = event.clientX - previous
	let move = distance > 0 ? 'right': 'left'


	if(heldDown) {
		posX = posX + (distance)
		
		let cardWidth = allElements[0].offsetWidth

		if(move === 'left'){
			
			if(posX < (-cardWidth * mainIndex) + (cardWidth * 0.75)){
				mainIndex++

				
				if(mainIndex > allElements.length){
					mainIndex--
					posX = (-cardWidth * mainIndex) + (cardWidth * 0.75)
				}
				
			}			
		}
		else if (move === 'right'){
	
			if(posX > (-cardWidth * (mainIndex -1)) + ( cardWidth * 0.25)){
				mainIndex--

				if(mainIndex < 1){
					mainIndex++
					posX = (-cardWidth * (mainIndex -1)) + ( cardWidth * 0.25)
				}
				
			}			
		}
		
			
		
		for(let i = 0; i < allElements.length; i++){
			let card = allElements[i]			
		
			
			
			card.style.transform = `translateX(${posX}px)`
		
				
		}
		
		
		
	}
	
	previous = event.clientX;
}

cards.addEventListener('mousemove', mouseMoveListener)






const resetPosition = (currentPosition) => {

  let endPos = currentPosition
	const k = 0.1
	const resetPos = (mainIndex - 1) * allElements[0].offsetWidth
	let dX = k  * (resetPos + posX)
	
	var move = function() {
		
		endPos -= dX
		dX = k * (resetPos + endPos)
		for(let i = 0; i < allElements.length; i++){
			let card = allElements[i]
		card.style.transform = `translateX(${endPos}px)`
		
		if(endPos < -resetPos + 2 && endPos >  -resetPos - 2){
			for(let i = 0; i < allElements.length; i++){
				let card = allElements[i]
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

const centerViewport = () => {
  posX = -allElements[0].offsetWidth * (mainIndex - 1
)
  for(let i = 0; i < allElements.length; i++){
    let card = allElements[i] 
    
    
    card.style.transform = `translateX(${posX}px)`
  
      
  }
}


window.onresize = centerViewport