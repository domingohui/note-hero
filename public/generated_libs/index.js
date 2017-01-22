'use strict';

// BIND THIS TO FUNCTIONS

const React = require('react');
const ReactDOM = require('react-dom');
const Markdown = require('react-markdown');
const $ = require('jquery');

const TYPING_TIME_OUT = 500;

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.updateRawInput = props.updateRawInput;
        this.state = { value: "##MD EDITOR. Type here " };
        this.sentData = false;
        this.stoppedTypingFor = 0; // milliseconds
        setInterval(() => {
            if (this.stoppedTypingFor >= 2000) {
                // Idle for 2 seconds - stopped typing
                this.sendInputToServer();
            } else this.stoppedTypingFor += TYPING_TIME_OUT;
        }, TYPING_TIME_OUT);

        this.handleTyping = this.handleTyping.bind(this);
    }

    handleTyping(event) {
        // Update state with textbox input
        this.setState({ value: event && event.target.value != null ? event.target.value : "" });
        // Reset timeout timer 
        this.stoppedTypingFor = 0;
        this.sentData = false;
    }

    sendInputToServer() {
        // If new data hasn't been sent to server
        if (!this.sentData) {
            this.updateRawInput(this.state.value);
            this.sentData = true;
        }
        // else do nothing: either data's been sent OR still waiting for typing to stop
    }

    render() {
        return React.createElement('textarea', { className: 'col-sm-6 well', defaultValue: this.state.value, id: 'pad',
            onChange: this.handleTyping });
    }
}

class Source extends React.Component {
    constructor(props) {
        super(props);
        console.log("Source code: ");
        console.log(props.source);
        this.state = {
            source: props.source
        };
    }

    render() {
        return React.createElement('textarea', { value: this.state.source });
    }
}

class Container extends React.Component {
    constructor() {
        super();
        // Bind this to fn's
        this.renderMarkDown = this.renderMarkDown.bind(this);
        this.rawInputDidUpdate = this.rawInputDidUpdate.bind(this);
        this.state = {
            markdownSource: ""
        };
    }

    renderMarkDown(jsonData) {
        // Pass data to child MD component to render text
        if (jsonData && jsonData.data != null) this.setState({ markdownSource: jsonData.data });else console.error("JSON data passed to Container from Input is null. Markdown source unchanged.");
    }

    rawInputDidUpdate(fromInput) {
        // Callback from Input after user stops typing

        // Send raw input to server
        // console.log('sending raw input to server: ' + fromInput);
        $.post('/parse/', {
            data: fromInput
        }, this.renderMarkDown);
        // Then call renderMarkDown on success
    }

    render() {
        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(Input, { updateRawInput: this.rawInputDidUpdate }),
            React.createElement(Markdown, { source: this.state.markdownSource }),
            React.createElement(Source, { source: this.state.markdownSource })
        );
    }
}

ReactDOM.render(React.createElement(Container, null), document.getElementById("container"));

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