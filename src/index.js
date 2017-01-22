'use strict';

//import styles from 'styles.css';
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
        console.log ('Response data from server: ');
        console.log (data.data );
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
        return (
             
            
            <input className="col-sm-6 well" defaultValue="markdown" readnly />
        
           
        
        );
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
            <div className="entireWindow">
            
            <div className="row">
            <Input isTyping={this.isTyping} />
            <Output />
            <div id="status">{((this.state.typing)? "" : "Not ")} typing</div>
            </div>
        
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




//var React = require('react');
//var Parser = require('commonmark').Parser;
//var ReactRenderer = require('commonmark-react-renderer');
//
//var parser = new Parser();
//var propTypes = React.PropTypes;
//
//var ReactMarkdown = React.createClass({
//    displayName: 'ReactMarkdown',
//
//    propTypes: {
//        className: propTypes.string,
//        containerProps: propTypes.object,
//        source: propTypes.string.isRequired,
//        containerTagName: propTypes.string,
//        childBefore: propTypes.object,
//        childAfter: propTypes.object,
//        sourcePos: propTypes.bool,
//        escapeHtml: propTypes.bool,
//        skipHtml: propTypes.bool,
//        softBreak: propTypes.string,
//        allowNode: propTypes.func,
//        allowedTypes: propTypes.array,
//        disallowedTypes: propTypes.array,
//        transformLinkUri: propTypes.func,
//        transformImageUri: propTypes.func,
//        unwrapDisallowed: propTypes.bool,
//        renderers: propTypes.object,
//        walker: propTypes.func
//    },
//
//    getDefaultProps: function() {
//        return {
//            containerTagName: 'div'
//        };
//    },
//
//    render: function() {
//        var containerProps = this.props.containerProps || {};
//        var renderer = new ReactRenderer(this.props);
//        var ast = parser.parse(this.props.source || '');
//
//        if (this.props.walker) {
//            var walker = ast.walker();
//            var event;
//
//            while ((event = walker.next())) {
//                this.props.walker.call(this, event, walker);
//            }
//        }
//
//        if (this.props.className) {
//            containerProps.className = this.props.className;
//        }
//
//        return React.createElement.apply(React,
//            [this.props.containerTagName, containerProps, this.props.childBefore]
//                .concat(renderer.render(ast).concat(
//                    [this.props.childAfter]
//                ))
//        );
//    }
//});
//
//ReactMarkdown.types = ReactRenderer.types;
//ReactMarkdown.renderers = ReactRenderer.renderers;
//ReactMarkdown.uriTransformer = ReactRenderer.uriTransformer;
//
//module.exports = ReactMarkdown;
