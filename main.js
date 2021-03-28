let cards = document.getElementById('viewport')




const randomFromRange = (min, max) => {
  return Math.floor((Math.random() * (max - min)) + min)
}

let cardNumber = randomFromRange(5,15)

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
  cardWrapper.className = 'card-wrapper'
  cardWrapper.className = 'card-wrapper'
  cardWrapper.setAttribute('id', `${i}`)
	
  let card = document.createElement('div')
  
  card.className='card'
	card.style.background = `rgb(${randomFromRange(0,255)},${randomFromRange(0,255)},${randomFromRange(0,255)})`
  card.textContent = `Slide:${i + 1}`
	
	cardWrapper.appendChild(card)
	cards.appendChild(cardWrapper)
}










const buildSlider = (id) => {

  
  const slider = document.getElementById(String(id))

  const sliderParent = slider.parentNode
  
  
  const sliderChildren = slider.children

//add svg images below viewport
  const indicatorWrapper = document.createElement('div')
  indicatorWrapper.className = 'indicator-wrapper'
for(let i = 0; i < sliderChildren.length; i++){
    let pageIndicator = document.createElement('img')
     pageIndicator.src = 'images/icons/pageIndicator.svg'
     if(i === 0){
      pageIndicator.className = 'page-indicator inview'
      pageIndicator.setAttribute('id', `${i + 1}pi`)
     }
     else{
      pageIndicator.className = 'page-indicator'
      pageIndicator.setAttribute('id', `${i + 1}pi`)
     }
    
     pageIndicator.onclick = () => {
        const index = i + 1
        slideInView = index
        highlightIndicator()
        resetPosition(posX)
     }

     indicatorWrapper.appendChild(pageIndicator)
     
}
  sliderParent.appendChild(indicatorWrapper)

  const indicatorChildren = indicatorWrapper.children


  //stores the intial value of a touch event or mouse click
  let startX;

  //the slide that is in view, the first index is one, the math was easier that way.
  let slideInView = 1;

  //Is the slider begin clicked or touched
  let heldDown = false

  //previous x position, establishes if the user is swiping right or left
  let previous = null;

  //the x postition of the slides at the center of the slidewindow in relation to the translation of the x position
  let posX = 0
  //
  let cardWidth = sliderChildren[0].offsetWidth




  const mouseDownListener = (event) => {  
    //record inital X position of the mouse
	 startX = event.clientX ? event.clientX : event.touches[0].clientX

    //mouse is being clicked	
	  heldDown = true	
  }




  slider.addEventListener('mousedown', mouseDownListener)
  
  
  const mouseUpListener = (event) => {
    
    //no longer clicking
	  heldDown = false 
    highlightIndicator()
    //resets slide to it's center at the center of the slide window    
	  resetPosition(posX)
    previous = null
  }

document.addEventListener('mouseup', mouseUpListener)
slider.addEventListener('touchend', handleTouchEnd)


const mouseMoveListener = (event) => {
  event.preventDefault()
  //the distance traveled since last mouseMove event trigger
  let current = event.clientX ? event.clientX : event.touches[0].clientX
  previous = previous === null ?  startX: previous;

  let distance = current - previous 

  if(heldDown) {
    window.requestAnimationFrame(() => moveSlide(distance))
  }	
	previous = current
}

let xDown = null;
let yDown = null;
let direction = null
let dirEnd = false

function handleTouchEnd(event){
  xDown = null
  yDown = null
  direction = null
  dirEnd = false
  heldDown = false 
  highlightIndicator()
  //resets slide to it's center at the center of the slide window    
  resetPosition(posX)
  previous = null
}

function getTouches(event) {
  return event.touches;
}

function handleTouchStart(event) {
  const firstTouch = getTouches(event)[0];
  heldDown = true
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
  startX = xDown
}

function handleTouchMove(event) {

    if (!xDown || !yDown) {
      return;
    }
  
    let xUp = event.touches[0].clientX;
    let yUp = event.touches[0].clientY;
  
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;
  
    if(!dirEnd){
      direction = Math.abs(xDiff) > Math.abs(yDiff) ? 'horizontal' : 'vertical'
    }
    console.log(direction)
    if(direction === 'horizontal'){
      if (event.cancelable) {
        event.preventDefault();
     }
      
      //the distance traveled since last mouseMove event trigger
      let current = event.touches[0].clientX
      previous = previous === null ?  startX: previous;
      xDown = xUp
    
      let distance = current - previous 
    
      if(heldDown) {
        window.requestAnimationFrame(() => moveSlide(distance))
      }	
      previous = current
      dirEnd = true
    } 
  
  // reset values //
  //xDown = xUp;
  //yDown = yDiff;
}



slider.addEventListener('mousemove', mouseMoveListener)
//slider.addEventListener('touchmove', mouseMoveListener)

for(let child of sliderChildren){
    child.firstChild.addEventListener('touchmove', handleTouchMove)
    child.firstChild.addEventListener('touchstart', handleTouchStart)    
}

const highlightIndicator = () => {
  for(let i = 0; i < indicatorChildren.length; i++){
    if(i+1 === slideInView){
      indicatorChildren[i].className ='page-indicator inview'
    }
    else{
      indicatorChildren[i].className ='page-indicator'
    }
  }
}

const moveSlide = (distance) => {
  
    //direction the mouse was moved
    let direction = distance > 0 ? 'right': 'left'
    
    //change posX by the distance mouse/touch has moved
		posX = Math.floor(posX + (distance))
  
		if(direction === 'left'){		
    //if the slide has moved 25% of its width, then change the index of the slide that is inview to the next slide
			if(posX < (-cardWidth * slideInView) + (cardWidth * 0.90)){
				slideInView++
        //prevent moving to a slide that doesn't exist
				if(slideInView > sliderChildren.length){
					slideInView--
					posX = (-cardWidth * slideInView) + (cardWidth * 0.90)
				}
				
			}			
		}
		else if (direction === 'right'){
      //same as above but opposite
			if(posX > (-cardWidth * (slideInView - 1)) + ( cardWidth * 0.10)){
        slideInView--
        //prevent moving to a slide that doesn't exist
				if(slideInView < 1){
					slideInView++
					posX = (-cardWidth * (slideInView - 1)) + ( cardWidth * 0.10)
				}				
			}			
		}				
		
    //moves all the slides based on the distance the mouse/touch has moved
		for(let i = 0; i < sliderChildren.length; i++){
			let card = sliderChildren[i]	
			card.style.transform = `translateX(${posX}px)`				
		}		
	}

const resetPosition = (currentPosition) => {
  //posX
  let endPos = currentPosition
  /* Hooke's law: The force needed to compress or expand a spring
    F = kx

    where F is force generate
    k is the spring constant (positive real number)
    x is the distance from the springs point of equilibrium
    
  */
  
  //spring constant
	const k = 0.2
  //equilbrium point
	const resetPos = (slideInView - 1) * sliderChildren[0].offsetWidth
  //velocity generated
	let dX = k  * (resetPos + posX)
	
  //var is used in order to recursively call request animation frame
	var moveToEquilibrium = function() {
		if(heldDown) return
    //move the slide towards the equilibrium by the velocity generated
		endPos -= dX
    
    //recalculate velocity based on the slides new position
		dX = k * (resetPos + endPos)
    //visually move the slides
		for(let i = 0; i < sliderChildren.length; i++){
			let card = sliderChildren[i]
		card.style.transform = `translateX(${endPos}px)`
    posX = endPos
		//if the spring has reached the equilibrium point stop
		if(endPos < -resetPos + 2 && endPos >  -resetPos - 2){
			for(let i = 0; i < sliderChildren.length; i++){
				let card = sliderChildren[i]
			card.style.transform = `translateX(${-resetPos}px)`
			}
			posX = -resetPos
			return 
		}
		}		
		window.requestAnimationFrame(moveToEquilibrium)
}
	window.requestAnimationFrame(moveToEquilibrium)	
}

//move the slides to the center of the viewport on window resize

//this needs to be extracted at some point
const centerViewport = () => {
  cardWidth = sliderChildren[0].offsetWidth
  posX = -cardWidth * (slideInView - 1
)
  for(let i = 0; i < sliderChildren.length; i++){
    let card = sliderChildren[i]    
    card.style.transform = `translateX(${posX}px)`      
  }
}
window.addEventListener('window:resize', centerViewport)  
}




buildSlider('viewport')




