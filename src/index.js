'use strict';

const TYPING_TIME_OUT = 500;

class Input extends React.Component {
    constructor (props) {
        super(props);
        this.toggleTyping = props.toggleTyping;
        this.state = {value:"##MD EDITOR. Type here "};
        this.stoppedTypingFor = 0; // milliseconds
        setInterval ( 
            () => {
                if ( this.stoppedTypingFor >= 3000 ) {
                    this.toggleTyping (false);
                    this.sendInputToServer ();
                }
                else
                    this.stoppedTypingFor += TYPING_TIME_OUT;
                console.log(this.stoppedTypingFor);
            }, TYPING_TIME_OUT);
    }

    handleTyping () {
        // Reset timeout timer 
        this.stoppedTypingFor = 0;
        this.toggleTyping(true);
    }

    sendInputToServer () {
        // AJAX?
        alert("sending text to server");
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

    toggleTyping(isTyping) {
        if ( isTyping )
            console.log("is typing");
        else
            console.log("not typing");
        this.setState ({typing: isTyping});

    }

    render() {
        return (
            <div className="row">
            <Input toggleTyping={this.toggleTyping} />
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
