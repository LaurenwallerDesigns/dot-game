import React from 'react';
import Dot from './Dot';

class DotList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hitBoundary: false
		}
		this.handleDotChange = this.handleDotChange.bind(this);
		this.moveDot = this.moveDot.bind(this);
	}

	componentDidMount() {
		window.addEventListener('keydown', this.moveDot);
		this.getDotPosition();
	}

//CHANGES MADE AS THEY HAPPEN
	componentDidUpdate() {
		this.handleDotChange();
		this.updatePosition();
 		this.d = document.getElementById(this.props.currentDot);
 		this.props.triggerPositioning();
	}

	componentWillUnmount() {
		return;
	}


//CHANGES FROM THE PARENT COMPONENT FOR CURRENT DOT    
	handleDotChange(){
		//STYLE CHANGES FOR DOT
		this.d.style.color = this.props.color;
		this.d.style.fontSize = this.props.size + 'px';
		this.d.innerHTML = this.props.text;
		this.prevSize = parseFloat(this.prevNode.style.fontSize);
		this.fontSize = parseFloat(this.d.style.fontSize);
		this.dotSpace = this.props.space;
		this.prevDotSpace = this.props.prevSpace;

		//DETERMINING THE MOVE DISTANCE
		this.dotWidth = parseFloat(this.d.offsetWidth);
		this.moveSpaceing = this.dotWidth + this.dotSpace;

		//CURVE FOR EACH DIFF SHAPE AND SIZE 
		this.dWidth = this.d.getBoundingClientRect().width;
		this.prevWidth = this.prevNode.getBoundingClientRect().width;
 		this.newCurve = (this.dWidth - this.prevWidth) / 2;

 		this.updateSpace();

 		
	}

	updateSpace = () => {
		//IF THE DOT SPACE INCREASES
		if(this.dotSpace > this.prevDotSpace){
			if(this.state.dotDirection === "left"){
				this.d.style.left = parseFloat(this.d.style.left) + (this.dotSpace - this.prevDotSpace) + 'px';

			}else if(this.state.dotDirection === "up"){
	
				this.d.style.top = parseFloat(this.d.style.top) + (this.dotSpace - this.prevDotSpace) + 'px';

			}else if(this.state.dotDirection === "right"){
				this.d.style.left = parseFloat(this.d.style.left) + (this.dotSpace - this.prevDotSpace) + 'px';

			}else if(this.state.dotDirection === "down"){
				this.d.style.top = parseFloat(this.d.style.top) + (this.dotSpace - this.prevDotSpace) + 'px';
			}
		}

		//IF DOT SPACE DECREASES
		if(this.dotSpace < this.prevDotSpace){
			if(this.state.dotDirection === "left"){
				this.d.style.left = parseFloat(this.d.style.left) + (this.dotSpace - this.prevDotSpace) + 'px';

			}else if(this.state.dotDirection === "up"){
	
				this.d.style.top = parseFloat(this.d.style.top) + (this.dotSpace - this.prevDotSpace) + 'px';

			}else if(this.state.dotDirection === "right"){
				this.d.style.left = parseFloat(this.d.style.left) + (this.dotSpace - this.prevDotSpace) + 'px';

			}else if(this.state.dotDirection === "down"){
	//MOVES DOT SPACING WHEN MINUS BUTTON IS CLICKED BY 1
				const spaceBetweenTop = parseFloat(this.d.style.top) - 1 + 'px';
				this.d.style.top = spaceBetweenTop;
			}	
		}
	}

//CONSTANT UPDATE OF POSITION
	updatePosition = () => {
		this.screenHeight = window.innerHeight;
		this.screenWidth = window.innerWidth;
		this.leftPosition = parseFloat(this.d.style.left);
		this.topPosition = parseFloat(this.d.style.top);
	}


//GETTING THE CURRENT DOT POSITIONING AND SETTING TO REUSABLE VARIABLES	
 	getDotPosition = () => {
 		this.d = document.getElementById(this.props.currentDot);
 		this.prevNode = this.d.previousSibling === null ? this.d : this.d.previousSibling;
 		this.dotHeight = this.d.offsetHeight;
 		this.widthDoubled = this.dotWidth * 2;
 		this.changeDirection();
 		console.log(this.fontSize);
 		console.log(this.prevSize);
 		this.fontChanges();
 		this.props.triggerReset();
 	}

 	fontChanges = () => {
 // Curving DOT WHEN FONT SIZE INCREASES
		if(this.fontSize > this.prevSize){
			if(this.props.dotDirection === "up"){
			//MOVES DOT DOWN WHEN MOVING UP
				this.curveLeft();
				this.curveUp();
			}else if(this.props.dotDirection === "left"){
			//MOVES DOT IN WHEN MOVING LEFT
				this.curveUp();
				this.curveLeft();
			}else if(this.props.dotDirection === "right"){
			//MOVES DOT UP WHEN MOVING RIGHT 
				this.curveUp();
				this.curveLeft();
			}else if(this.props.dotDirection === "down"){
			//MOVES DOT OVER WHEN MOVING DOWN
				console.log('ran font changes');
				this.curveLeft();
				this.curveUp();
			}			
		}


		//CURVING THE DOT WHEN FONT SIZE DECREASES
		if(this.fontSize < this.prevSize){
			if(this.props.dotDirection === "left"){
			//MOVES DOT IN WHEN MOVING LEFT
				this.curveRight();
				this.curveDown();
			}else if(this.props.dotDirection === "up"){
			//MOVES DOT IN WHEN MOVING
				this.curveDown();
				this.curveRight();
			}else if(this.props.dotDirection === "right"){
			//MOVES DOT UP WHEN MOVING RIGHT 
				this.curveDown();
				this.curveRight();
			}else if(this.props.dotDirection === "down"){
			//MOVES DOT UP WHEN MOVING DOWN
				this.curveRight();
				this.curveDown();
			}
		}
 	}
 	
 	curveLeft = () => {
 		this.prevNode.style.left = parseFloat(this.prevNode.style.left) - this.newCurve + 'px';
 	}

 	curveUp = () => {
 		this.prevNode.style.top = (parseFloat(this.prevNode.style.top) - this.newCurve) + this.dotSpace + 'px';
 	}

 	curveRight = () => {
 		this.prevNode.style.left = parseFloat(this.prevNode.style.left) - this.newCurve + 'px';
 		
 	}

 	curveDown = () => {
 		this.prevNode.style.top = (parseFloat(this.prevNode.style.top) - this.newCurve) - this.dotSpace + 'px';
 	}


//CHANGING STATE DEPENDANT ON UNDOCOUNT
	changeDirection = () => {
		if(this.props.undoCount > 0){
			this.handleDotChange();
			this.props.triggerReset();
		}
	}
 	
//MOVING THE DOT RIGHT
 	movingRight = () =>{
 		this.d.style.top = this.prevNode.style.top;
		this.d.style.left = parseFloat(this.prevNode.style.left) + this.moveSpaceing + 'px';
		this.props.changeDirectionRight();
		this.setState({hitBoundary: false});
		if(this.leftPosition >= this.rightBounds ){
			this.props.changeDirectionUp();
			this.setState({hitBoundary: true});
		}
 	}

//MOVING THE DOT DOWN THE SCREEN 	
 	movingDown = () => {
 		this.d.style.top = parseFloat(this.prevNode.style.top) + this.moveSpaceing + 'px';
		this.d.style.left = this.prevNode.style.left;
		this.props.changeDirectionDown();
			this.setState({hitBoundary: false});
		if(this.topPosition >= this.bottomBounds ){
			this.props.changeDirectionRight();
			this.setState({hitBoundary: true});
		}
 	}

//MOVING THE DOT UP THE SCREEN
 	movingUp = () => {
 		this.d.style.left = this.prevNode.style.left;
		this.d.style.top = parseFloat(this.prevNode.style.top) - this.moveSpaceing + 'px';
		this.negativeSpaceing = this.moveSpaceing * (-1);
		this.props.changeDirectionUp();
		this.setState({hitBoundary: false});
		if(this.topPosition <= this.topBounds ){
			this.props.changeDirectionLeft();
			this.setState({hitBoundary: true});
		}
 	}
//MOVING THE DOT LEFT ON THE SCREEN
 	movingLeft = () => {
		this.d.style.top = this.prevNode.style.top;
		this.d.style.left = parseFloat(this.prevNode.style.left) - this.moveSpaceing + 'px';
		this.props.changeDirectionLeft();
		this.setState({hitBoundary: false});
		if(this.leftPosition <= this.leftBounds ){
			this.props.changeDirectionDown();
			this.setState({hitBoundary: true});
		}
 	}


//THE BOUNDARIES FUNCTION FOR THE SCREEN SIZE
	boundaries = () => {
		//Bottom boundary
		if(this.props.dotDirection === "right" && this.state.hitBoundary){
			this.movingRight();
		//Right Boundary
		}else if (this.props.dotDirection === "up" && this.state.hitBoundary){
			this.movingUp();
		//top Boundary
		}else if (this.props.dotDirection === "left" && this.state.hitBoundary){
			this.movingLeft();
		//Left Boundary
		}else if (this.props.dotDirection === "down" && this.state.hitBoundary){
			this.movingDown();
		}
	}
//AFTER AN ARROW IS PRESSED, ENTER WILL CONT THE DOT IN ARROW DIRECTION
	contDirection = () => {
		if(this.props.dotDirection === "left"){
			this.movingLeft();
		}else if(this.props.dotDirection === "right"){
			this.movingRight();
		}else if(this.props.dotDirection === "up"){
			this.movingUp();
		}else if(this.props.dotDirection === "down"){
			this.movingDown();
		}else{
			this.boundaries();
		}
	}



//MOVEMENT FOR LEFT KEY PRESS
	leftArrowPressed = () => {
		this.moveLeft = parseFloat(this.d.style.left) - this.moveSpaceing + 'px';
		this.d.style.left = this.moveLeft;
		this.props.changeDirectionLeft();
		if(this.leftPosition < this.leftBounds ){
			this.d.style.left = this.leftBounds + 'px';
		}
	}

//MOVEMENT FOR RIGHT KEY PRESS
	rightArrowPressed = () => {
		this.moveRight = parseFloat(this.d.style.left) + this.moveSpaceing + 'px';
		this.d.style.left = this.moveRight;
		this.props.changeDirectionRight();
		if(this.leftPosition > this.rightBounds ){
			this.d.style.left = this.rightBounds + 'px';
		}
	}

//MOVEMENT FOR UP KEY PRESS
	upArrowPressed = () => {
		this.moveUp = parseFloat(this.d.style.top) - this.moveSpaceing + 'px';
		this.d.style.top = this.moveUp;
		this.props.changeDirectionUp();
		if(this.topPosition < this.topBounds ){
			this.d.style.top = this.topBounds + 'px';
		}
	}

//MOVEMENT FOR DOWN KEY PRESS
	downArrowPressed = () => {
		this.moveDown = parseFloat(this.d.style.top) + this.moveSpaceing + 'px';
		this.d.style.top = this.moveDown;
		this.props.changeDirectionDown();
		if(this.topPosition > this.bottomBounds ){
			this.d.style.top = this.bottomBounds + 'px';
		}
	}


//THE MOVING DOT EVENT LISTENER
	moveDot(evt) {
		switch (evt.keyCode) {
			case 37:
			this.leftArrowPressed();
			break;

			case 39:
			this.rightArrowPressed();
			break;

			case 38:
			this.upArrowPressed();
			break;

			case 40:
			this.downArrowPressed();
			break;

			case 13:
			//this.changeDirection();
			this.getDotPosition();
			this.contDirection();
			//this.handleSlice();		
		}
	}


	render() {
	//BOUNDARIES FOR THE SCREENSIZE
		this.topBounds = window.innerHeight * 0.2;

		this.bottomBounds = window.innerHeight * 0.9;

		this.leftBounds = window.innerWidth * 0.05;

		this.rightBounds = window.innerWidth * 0.9;

	//map function for creating a new element
		
		var dots = this.props.dots;
		var allDots = dots.map((dot, index) => 
			<Dot 
				key={index}
				id={index}
				className={dot.animation}
				left={dot.left}
				top={dot.top}
				color={dot.color}
				font={dot.size}
				shape={dot.text}
			/>
		);
		return (
			<div id={"dotList"}>
				{allDots}
			</div>
		 );

	}
}



export default DotList;