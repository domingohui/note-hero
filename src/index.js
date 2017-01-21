'use strict';

function Welcome (props) {
    return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="DOMINGO" />;

alert("HII");

ReactDOM.render ( element, document.getElementById ("container"));
