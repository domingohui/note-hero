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
                if ( this.stoppedTypingFor >= 3000 ) {
                    this.isTyping (false);
                    this.sendInputToServer ();
                }
                else
                    this.stoppedTypingFor += TYPING_TIME_OUT;
            }, TYPING_TIME_OUT);
    }

    handleTyping () {
        // Reset timeout timer 
        this.stoppedTypingFor = 0;
        this.isTyping(true);
        this.sentData = false;
    }

    sendInputToServer () {
        // AJAX?
        if ( !this.sentData )
            alert("sending text to server");
        this.sentData = true;
    }

    render () {
        // USE ARROW FUNCTIONS to bind this
        return (
            <input className="col-sm-6 well" defaultValue={this.state.value} id="pad" onChange={()=>{this.handleTyping()}} />
        );
    }
}

class Output extends React.Component {
    render () {
        return (<input className="col-sm-6 well" defaultValue="markdown" />);
    }
}

class Container extends React.Component {
    constructor () {
        super();
        this.state = {typing: false};
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
