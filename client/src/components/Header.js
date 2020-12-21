import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
const A = styled.a`
margin-left: 10px;
`; 

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>
            default: 
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    render() {
        console.log(this.props)
        return (
            
            <nav>
                <div className="nav-wrapper">
                    <A href="#" className="left brand-logo">WaterWave</A>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>
                
            </nav>
            
        );
    }
}

function mapStateToProps(state) {
    return {auth: state.auth}
}

export default connect(mapStateToProps)(Header);