import React, { Component } from "react";

// Meme generator component class
class MemeGenerator extends Component {
	// the construction function is invoked when the meme generator is instantiated
	constructor() {
		super();
		// Initializing state to save data
		this.state = {
			topText: "",
			bottomText: "",
			randomImg: "http://i.imgflip.com/1bij.jpg",
			allMemeImgs: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};
    
	// The componentDidMount() lifecycle method runs after 
  //	all the elements of the page are rendered
	componentDidMount() {
		// get memes from imgflip API
		fetch("https://api.imgflip.com/get_memes")
			.then(response => response.json())
			.then(response => {
				const { memes } = response.data;
				this.setState({ allMemeImgs: memes });
			});
	};
		
	// everytime the input box is used the state is updated
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
		
	handleSubmit(e) {
		e.preventDefault();
		// gets a random integer (index in the array)
		const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);

		// gets the meme from that index
		const randMemeImg = this.state.allMemeImgs[randNum].url;

		// sets randomImg to the .url of the random item I grabbed
		this.setState({ randomImg: randMemeImg });
	};
	
	render = () => (
		<div className="meme-container">
			<form className="meme-form" onSubmit={ this.handleSubmit }>
				<input 
					type="text"
					name="topText"
					placeholder="Top Text"
					value={ this.state.topText }
					onChange={ this.handleChange }
				/> 
				<input 
					type="text"
					name="bottomText"
					placeholder="Bottom Text"
					value={ this.state.bottomText }
					onChange={ this.handleChange }
				/> 
				<button>Generate</button>
			</form>
			<div className="meme">
				<img src={ this.state.randomImg } alt="" />
				<h2 className="top">{ this.state.topText }</h2>
				<h2 className="bottom">{ this.state.bottomText }</h2>
			</div>
		</div>
	);
};

export default MemeGenerator;
