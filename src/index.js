'use strict';

const TYPING_TIME_OUT = 500;

class Input extends React.Component {
    constructor (props) {
        super(props);
        this.isTyping = props.isTyping;
        this.state = {value:"##MD EDITOR. Type here "};
        this.sentData = false;
        this.stoppedTypingFor = 0; // milliseconds
        setInterval ( 
            () => {
                if ( this.stoppedTypingFor >= 2000 ) {
                    // Idle for 2 seconds
                    this.isTyping (false);
                    this.sendInputToServer ();
                }
                else
                    this.stoppedTypingFor += TYPING_TIME_OUT;
            }, TYPING_TIME_OUT);

        this.handleTyping = this.handleTyping.bind (this);
        this.onMdSourceFromServer = this.onMdSourceFromServer.bind (this);
    }

    handleTyping (event) {
        // Update state with textbox input
        this.setState ({ value: (event && event.target.value)? event.target.value : "" } );
        // Reset timeout timer 
        this.stoppedTypingFor = 0;
        this.isTyping(true);
        this.sentData = false;
    }

    sendInputToServer () {
        // If new data hasn't been sent to server
        if ( !this.sentData ) {
            console.log('sending raw input to server: ' + this.state.value);
            $.post('/parse/', 
                {
                    data: this.state.value
                },
                this.onMdSourceFromServer);
        }
        // else do nothing
        this.sentData = true;
    }

    onMdSourceFromServer (data) {
        console.log ('Response data from server: ' + data );
        // Injecet MD source to MD renderer
    }

    render () {
        // USE ARROW FUNCTIONS to bind this
        return (
            <textarea className="col-sm-6 well" defaultValue={this.state.value} id="pad" 
            onChange={ this.handleTyping } >
            </textarea>
        );
    }
}

class Output extends React.Component {
    render () {
        return (<input className="col-sm-6 well" defaultValue="markdown" readOnly />);
    }
}

class Container extends React.Component {
    constructor () {
        super();
        this.state = {typing: false};

        this.isTyping = this.isTyping.bind (this);
    }

    isTyping(isTyping) {
        this.setState ({typing: isTyping});
    }

    render() {
        return (
            <div className="row">
            <Input isTyping={this.isTyping} />
            <Output />
            <div id="status">{((this.state.typing)? "" : "Not ")} typing</div>
            </div>
        );
    }
}

ReactDOM.render ( <Container />, document.getElementById ("container"));

/*
window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');   

    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    pad.addEventListener('input', convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();
};
*/
