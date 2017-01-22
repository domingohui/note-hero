'use strict';

// BIND THIS TO FUNCTIONS

const React = require('react');
const ReactDOM = require('react-dom');
const Markdown = require('react-markdown');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Style from '../assets/css/styles.css';
const $ = require('jquery');

const TYPING_TIME_OUT = 500;

class Input extends React.Component {
    constructor (props) {
        super(props);
        this.updateRawInput = props.updateRawInput;
        this.state = {value:"##MD EDITOR. Type here "};
        this.sentData = false;
        this.stoppedTypingFor = 0; // milliseconds
        setInterval ( 
            () => {
                if ( this.stoppedTypingFor >= 2000 ) {
                    // Idle for 2 seconds - stopped typing
                    this.sendInputToServer ();
                }
                else
                    this.stoppedTypingFor += TYPING_TIME_OUT;
            }, TYPING_TIME_OUT);

        this.handleTyping = this.handleTyping.bind (this);
    }

    handleTyping (event) {
        // Update state with textbox input
        this.setState ({ value: (event && event.target.value!=null)? event.target.value : "" } );
        // Reset timeout timer 
        this.stoppedTypingFor = 0;
        this.sentData = false;
    }

    sendInputToServer () {
        // If new data hasn't been sent to server
        if ( !this.sentData ) {
            this.updateRawInput ( this.state.value );
            this.sentData = true;
        }
        // else do nothing: either data's been sent OR still waiting for typing to stop
    }

    render () {
        return (
            <textarea className="col-sm-6 well" defaultValue={this.state.value} id="pad" 
            onChange={ this.handleTyping } >
            </textarea>
        );
    }
}

class Source extends React.Component {
    render () {
        return (
            <textarea value={this.props.source}></textarea>
        );
    }
}

class Container extends React.Component {
    constructor () {
        super();
        // Bind this to fn's
        this.renderMarkDown = this.renderMarkDown.bind(this);
        this.rawInputDidUpdate = this.rawInputDidUpdate.bind(this);
        this.state = {
            markdownSource: ""
        };
    }

    renderMarkDown (jsonData) {
        // Pass data to child MD component to render text
        if (jsonData && jsonData.data != null)
            this.setState ({markdownSource: jsonData.data});
        else
            console.error("JSON data passed to Container from Input is null. Markdown source unchanged.");
    }

    rawInputDidUpdate (fromInput) {
        // Callback from Input after user stops typing

        // Send raw input to server
        // console.log('sending raw input to server: ' + fromInput);
        $.post('/parse/', 
            {
                data: fromInput
            },
            this.renderMarkDown);
        // Then call renderMarkDown on success
    }

    render() {
        return (
            <div className="row">
            <Input updateRawInput={this.rawInputDidUpdate} />
            <Markdown source={this.state.markdownSource} />
            <Source source={this.state.markdownSource} />
            </div>
        );
    }
}

ReactDOM.render ( <Container />, document.getElementById ("container"));
