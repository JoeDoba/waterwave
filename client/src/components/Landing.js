import React, {Component}from 'react';
import './css/Landing.css';
import {connect} from 'react-redux';

class Landing extends Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <link rel="stylesheet" href="https://use.typekit.net/mod3sjr.css" />
                    <h1 style={STYLE}>
                    Spread as you can see.
                </h1>
            </div>
        );
    };
};
// export default Landing;

const STYLE = {
    color: '#26a69a',
    fontFamily: 'acumin-pro',
    fontWeight: 700,
    fontStyle: 'normal'
}

function mapStateToProps(state) {
    return {auth: state.auth}
}

export default connect(mapStateToProps)(Landing);