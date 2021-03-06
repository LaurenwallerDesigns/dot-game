import React from 'react';


function StyleBar(props){
	const palette = props.palette;
	const paletteDiv = palette.map((palette, index) =>
		<button key={index} 
			style={{backgroundColor: palette.color, width: "10px", height:"10px", borderRadius: "50px"}}
			onClick={props.triggerColorChange}
			value={palette.color} />
	)
	return(
		<header className={"ParentTb"} style={{width: 100 + '%'}}>
			<aside className={props.display ? "SBColorOpened" : ""} style={props.display ? {border: props.color + " 2px solid"} : {border: "none"}}>
			{props.width > 800 
					? 
			<h2 onClick={props.handleOnClick} style={{color: props.color}} className={props.default ? "style" : "SBBlackoutTitle"}> Style Bar </h2>
					:
			<h2 onClick={props.handleOnClick} style={{color: props.color}} className={props.default ? "style" : "SBBlackoutTitle"}> + </h2> }
				<form style={props.display ? {display: "block", width: "35%"} : {display: "none", width: "10%"}} onSubmit={props.handleSubmit} className="style-bar">
					<label>
					Color:
						<input type="text" value={props.color} onChange={props.triggerColorChange} /><br />
						<input name="Color Picker" type="color" defaultValue={props.color} onChange={props.triggerColorChange} /><br />
						<button className="randomColor" onClick={props.randomColor} style={{backgroundColor: props.color, color: props.backgroundColor}} value={props.color}> Random Color </button>
						<button className="save" onClick={props.triggerSaveColor} value={props.color}> Save </button>
						<br />{paletteDiv}
						<br />

					</label>
					<label className="sizeStyle">
					Size:
						<button name="sub" className="subtractBtn" onClick={props.triggerSizeChange}> - </button> {props.size} <button name="add" className="additionBtn" onClick={props.triggerSizeChange}>+</button>
					</label>
					<label className="spaceStyle">
					Spacing:
						<button name="subSpace" className="subtractBtn" onClick={props.triggerSpaceChange}> - </button> {props.space} <button name="addSpace" className="additionBtn" onClick={props.triggerSpaceChange}>+</button>
					</label>
					<label className="spaceStyle">
					Shapes:
						<select value={props.text} onChange={props.triggerShapeChange}>
							<option name="dot" value="&#8226;"> &#8226;</option>
							<option name="heart" value="&#9829;"> &#9829;</option>
							<option name="right arrow" value="&#8250;"> &#8250;</option>
							<option name="up arrow" value="&#8657;"> &#8657;</option>
							<option name="diamond" value="&#9830;"> &#9830;</option>
							<option name="club" value="&#9827;"> &#9827;</option>
							<option name="spade" value="&#9824;"> &#9824;</option>
							<option name="diamond outline" value="&#9674;"> &#9674;</option>
						</select>
						<input type="text" value={props.text} onChange={props.triggerShapeChange} />
					</label>
					<label>
					Background:
						<button onClick={props.randomBackgroundColor} style={{backgroundColor: props.backgroundColor, color: props.colorValue}} value={props.backgroundColor}> Random Color </button>
					{props.default ? (
						<button className="blackout" onClick={props.blackOut} style={{color: "#fff", backgroundColor: "#000"}}> 
							Blackout 
						</button>
						)
					: (
						<button className="default" onClick={props.blackOut} style={{color: "#000", backgroundColor: "#fff"}}> 
							Default 
						</button>
					)}
					</label>

				</form>

			</aside>

			<h1 className= "title" style={{color: props.color}}> Dot Game </h1>
				<div className={props.width > 800 ? "TbButtonsLarge" : "TbButtonsSmall"}>
					<button onClick={props.triggerUndo} disabled={props.disabledUndo}className={props.disabledUndo ? "undo button" : "btnAbled undo button"} style={{color: props.color, background: "none"}}>Undo</button>
					<button onClick={props.triggerRedo} disabled={props.disabledRedo} className={props.disabledRedo ? "redo button" : "btnAbled redo button"} style={{color: props.color, background: "none"}}> Redo </button>
					<button onClick={props.resetAsk} className="reset button btnAbled" style={{color: props.color, background: "none"}}> Reset </button>
					<button onClick={props.triggerColorUndo} disabled={!props.colorUndo} className={!props.colorUndo ? "undo button" : "btnAbled undo button"} style={{color: props.color, background: "none"}}>Undo Color</button>
					<button onClick={props.triggerColorRedo} disabled={!props.colorRedo} className={!props.colorRedo ? "undo button" : "btnAbled undo button"} style={{color: props.color, background: "none"}}>Redo Color</button>					
				</div>
				
		</header>
	);
}


export default StyleBar;