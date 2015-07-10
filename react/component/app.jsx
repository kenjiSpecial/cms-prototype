var React = require('react');
var Sample = require('./sample.jsx');

class App extends React.Component {
    constructor(props){
        super(props);

    }

    componentWillMount(){

    }


    render() {
        return <div>Hello, Kenji Saito, <Sample/></div>;
    }
}

module.exports = App;
