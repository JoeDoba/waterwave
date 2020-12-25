import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import {handleToken} from '../actions';

export class Payment extends Component {
    render() {
        return (
            <StripeCheckout
                name="WaterWave"
                description="" 
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}>
            Add Credits
            </StripeCheckout>
        )
    }
}

export default connect(null, {handleToken})(Payment);