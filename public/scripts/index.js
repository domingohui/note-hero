'use strict';

// BIND THIS TO FUNCTIONS

const React = require('react');
const ReactDOM = require('react-dom');
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
const Markdown = require('react-markdown');
import Style from '../assets/css/styles.css';
import { Button, Card, Row, Col } from 'react-materialize';

const $ = require('jquery');

const TYPING_TIME_OUT = 500;

class Input extends React.Component {
    constructor (props) {
        super(props);
        this.updateRawInput = props.updateRawInput;
        this.state = {value:"MD EDITOR. Type here "};
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
        const divStyle = {
            height: "500px"
        };
        return (           
            <div className="row">
            <form className="col s12">
                <div className="row">
            <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea"></textarea>
            </div>
            </div>
            </form>
            </div>
            //            <textarea 
            //            className="col-sm-6 well" style={divStyle} defaultValue={this.state.value} id="pad"  
            //            onChange={ this.handleTyping } >
            //            </textarea>
        );
    }
}

class Source extends React.Component {
    constructor (props) {
        super(props);
        this.didEditSource = props.didEditSource;
    }

    render () {
        return (
            <div >
            <textarea value={this.props.source} onChange={this.didEditSource.bind(this)} />
            </div>
        );
    }
}

class Container extends React.Component {
    constructor () {
        super();
        // Bind this to fn's
        this.renderMarkDown = this.renderMarkDown.bind(this);
        this.rawInputDidUpdate = this.rawInputDidUpdate.bind(this);
        this.didSourceChange = this.didSourceChange.bind(this);
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

    didSourceChange ( eventFromSource ) {
        // Callback from Source when edited to update state
        if ( eventFromSource && eventFromSource.target.value != null )
            this.setState ( {markdownSource: eventFromSource.target.value} );
        else
            console.error("MD sourc data passed to Container from Source is null. Markdown source unchanged.");
    }

    render() {
        const styleTrials = {
            marginTop:"100px"
        }
        return (
            <div className="row" style={styleTrials}>
            //            {this.props.children}
            <Input updateRawInput={this.rawInputDidUpdate} />
            <Markdown source={this.state.markdownSource} />
            <Source source={this.state.markdownSource} didEditSource={this.didSourceChange} />
            </div>
        );
    }
}

ReactDOM.render ( <Container />, document.getElementById ("container"));
