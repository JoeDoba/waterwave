import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import LoginWindow from './Login_window';
import Payment from './Payment';
import './css/Header.css';
const L = styled(Link)`margin-left: 10px;`; 

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popshow: false,
        }
    }

    renderHeader() {
        switch (this.props.auth) {
            case null:
                return <li className="col">Loading</li>
            case false:
                return <li onClick={() => this.setState({popshow: true})} className="col">Login</li>
            default: 
                return [
                    <li key="1" className="col"><Payment /></li>,
                    <a href="/api/logout" key="2" style={{all: 'unset'}}><li className="col">Logout</li></a>
                ];
        }
    }

    Close = () => {this.setState({popshow: false})};
    Open = () => {this.setState({popshow: true})};

    render() {
        // console.log(this.props)
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <L to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">WaterWave</L>
                        <ul id="nav-mobile" className="right">
                            <li className="col">About Us</li>  
                            {this.renderHeader()}
                        </ul>         
                    </div>
                </nav>
                <LoginWindow show={this.state.popshow} Close={this.Close} Open={this.Open} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {auth: state.auth}
}

export default connect(mapStateToProps)(Header);