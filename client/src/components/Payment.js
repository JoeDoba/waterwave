import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

export class Payment extends Component {
    render() {
        return (
            <StripeCheckout
                name="WaterWave"
                description="" 
                amount={500}
                token={token => {actions.handleToken(token)}}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}>
            Add Credits
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payment);