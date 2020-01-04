import React, { Component } from 'react';

class LocalTime extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let time = this.props.current.currentDateTime;
        let day = this.props.current.dayOfTheWeek;
        let hour;
        let minutes;

        if(this.props.current.currentDateTime != undefined){
        hour = time.substring(11, 13);
        minutes = time.substring(13,16);
        
        if (hour > 12){
            hour = hour - 12;
            minutes = minutes + " PM"
        }else{
            minutes = minutes + " AM"
        }

        }
        
        return (
            <div>
                <h4>Local San Diego</h4>
                <p>Day: {day}</p><p>Time: {hour + minutes}</p>
            </div>
        )
    }
}

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quotes: [],
            local: [],
            start: false,
        }


        this.handleQuoteButton = this.handleQuoteButton.bind(this);
    }

    componentDidMount() {
        fetch('/time')
            .then((response) => response.json())
            .then((result) => this.setState({
                local: result,
                start: true,
            }));
        this.intervalID = setInterval(
            () => this.tick(),
            1000
          );
          
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick(){
        fetch('/time')
            .then((response) => response.json())
            .then((result) => this.setState({
                local: result,
            }));
    }

    handleQuoteButton() {
        fetch('/api')
            .then((response) => response.json())
            .then((result) => this.setState({
                quotes: result.quotes[0],
            }));
    }

    render() {
        return (
            <div>
                <button className="btn-quote" onClick={this.handleQuoteButton}>Generate Quote</button>
                <p>{this.state.quotes.quote}</p>
                <p>{this.state.quotes.author}</p>
                <div className={this.state.start ? '' : 'hide'}><LocalTime
                    current={this.state.local} /></div>
            </div>
        );
    }
}

export default App;