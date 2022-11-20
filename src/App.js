import SortingVisulalizer from './SortingVisualizer/SortingVisualizer.js'
import {getMergeSortAnimations} from './SortingAlgorithms/MergeSort.js'
import './App.css';
import { Component } from 'react';

const PRIMARY_COLOR = "rgb(66, 127, 180)";
const SECONDARY_COLOR = "rgb(224, 145, 220)";
const ANIMATION_SPEED_MS = 1;

class App extends Component {
  constructor(){
    super();
    this.state ={
      array: [],
      value: 100
    }
    //this.getMergeSortAnimations = getMergeSortAnimations.bind(this)
  }
  componentDidMount(){
    this.resetArray();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.value !== this.state.value){
      this.resetArray();
      
    }
  }

    
  resetArray(){
      const array = [];
      for(let i = 0; i<this.state.value; i++){
        array.push(Math.floor(this.getRandomArbitrary(5,1000)))  
      }
      this.setState({array})
  }

  getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight/12}vh`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  /* updateArrayLength(value){
    this.setState({arrayLength : value})
  } */

  render(){
  return (
    <div className="App">
      <div className='header'>
        <p>Number of <b>Columns</b> : {this.state.value} </p>
        <input type="range" id="array-length" name="arrayLength" min={10} max={500} step={5} onChange={(event) => {this.setState({value: event.target.valueAsNumber})}} ></input>
        <button onClick={() => this.resetArray()}><b>Generate new Array</b></button>
        
        <button onClick={ () => this.mergeSort() }><b>Merge Sort</b></button>
      </div>

      <SortingVisulalizer array={this.state.array}></SortingVisulalizer>
    </div>
  )};
}

export default App;
