let cards = document.getElementById('viewport')







let cardNumber = 50

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
  card.textContent = `Slide:${i + 1}`
	
	cardWrapper.appendChild(card)
	cards.appendChild(cardWrapper)
}


const buildSlider = (id) => {
  
  const slider = document.getElementById(String(id))

  const sliderChildren = slider.children

  //stores the intial value of a touch event or mouse click
  let startX;

  //the slider that is in view, the first index is one, the math was easier that way.
  let childIndexInView = 1;

  //Is the slider begin clicked or touched
  let heldDown = false

  //previous x position, establishes if the user is swiping right or left
  let previous = 0;

  //the x postition of the slides at the center of the slidewindow in relation to the translation of the x position
  let posX = 0



  const mouseDownListener = (event) => {
	  event.preventDefault();
    //record inital X position of the mouse
	  startX = event.clientX
    //mouse is being clicked	
	  heldDown = true	
  }

  cards.addEventListener('mousedown', mouseDownListener)

  
  
  const mouseUpListener = (event) => {
	  event.preventDefault();
    //no longer clicking
	  heldDown = false 
    //resets slide to it's center at the center of the slide window
	  resetPosition(posX)
  }

document.addEventListener('mouseup', mouseUpListener)


const mouseMoveListener = (event) => {
	event.preventDefault();
  //the distance traveled since last mouseMove event trigger
	let distance = event.clientX - previous

  //direction the mouse was moved

  if(heldDown) {
    moveSlide(distance)
  }



	
	previous = event.clientX;
}

cards.addEventListener('mousemove', mouseMoveListener)

const moveSlide = (distance) => {

  

    let direction = distance > 0 ? 'right': 'left'
    //needs to be own function
		posX = posX + (distance)
		
		let cardWidth = sliderChildren[0].offsetWidth

		if(direction === 'left'){
			
			if(posX < (-cardWidth * childIndexInView) + (cardWidth * 0.75)){
				childIndexInView++

				
				if(childIndexInView > sliderChildren.length){
					childIndexInView--
					posX = (-cardWidth * childIndexInView) + (cardWidth * 0.75)
				}
				
			}			
		}
		else if (direction === 'right'){
	
			if(posX > (-cardWidth * (childIndexInView - 1)) + ( cardWidth * 0.25)){
  
				childIndexInView--

				if(childIndexInView < 1){
					childIndexInView++
					posX = (-cardWidth * (childIndexInView - 1)) + ( cardWidth * 0.25)
				}
				
			}			
		}
		
			
		
		for(let i = 0; i < sliderChildren.length; i++){
			let card = sliderChildren[i]			
		
			
			
			card.style.transform = `translateX(${posX}px)`
		
				
		}
		
		
		
	}








const resetPosition = (currentPosition) => {

  let endPos = currentPosition
	const k = 0.1
	const resetPos = (childIndexInView - 1) * sliderChildren[0].offsetWidth
	let dX = k  * (resetPos + posX)
	
	var direction = function() {
		
		endPos -= dX
		dX = k * (resetPos + endPos)
		for(let i = 0; i < sliderChildren.length; i++){
			let card = sliderChildren[i]
		card.style.transform = `translateX(${endPos}px)`
		
		if(endPos < -resetPos + 2 && endPos >  -resetPos - 2){
			for(let i = 0; i < sliderChildren.length; i++){
				let card = sliderChildren[i]
			card.style.transform = `translateX(${-resetPos}px)`
			}
			posX = -resetPos
			return 
		}
		}
		
		
		window.requestAnimationFrame(direction)
}
	window.requestAnimationFrame(direction)
	
}

const centerViewport = () => {
  posX = -sliderChildren[0].offsetWidth * (childIndexInView - 1
)
  for(let i = 0; i < sliderChildren.length; i++){
    let card = sliderChildren[i] 
    
    
    card.style.transform = `translateX(${posX}px)`
  
      
  }
}


window.onresize = centerViewport

  
}


buildSlider('viewport')




