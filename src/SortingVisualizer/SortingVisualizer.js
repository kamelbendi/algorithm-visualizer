import { Component } from "react";
import './SortingVisualizer.css';


class SortingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = { 
            array: props.array
        }; 
    }
    componentDidUpdate(prevProps){
        if (prevProps.array !== this.props.array) {
           this.setState({ array: this.props.array })
        }
    }
    
    render() { 
        const array = this.state.array;
        return (
            <div className="array-container">
                {array.map((value, index) => { if(index !== array.length-1){
                  return <div className="array-bar" key={index} style={{height: `${value/12}vh`, width: `${80/(array.length)*0.7}%`, marginRight: `${80/(array.length-1)*0.3}%`}}></div>
                 }else{
                  return <div className="array-bar" key={index} style={{height: `${value/12}vh`, width: `${80/(array.length)*0.7}%` }}></div>
                }})}
            </div>
        );
    }
}
 
export default SortingVisualizer;