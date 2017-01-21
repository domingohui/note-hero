'use strict';

class Input extends React.Component {
    render () {
        return (<input className="col-sm-6 well" value="INPUT" />);
    }
}

class Output extends React.Component {
    render () {
        return (<input className="col-sm-6 well" value="output" />);
    }
}

class Container extends React.Component {
    render() {
        return (
            <div className="row">
                <Input />
                <Output />
            </div>
        );
    }
}

ReactDOM.render ( <Container />, document.getElementById ("container"));
