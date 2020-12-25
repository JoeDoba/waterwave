import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PopWindow from './Login_window';
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

    renderProfile() {
        switch (this.props.auth) {
            case null:
                return null;
            case false:
                return null;
            default: return (
                <div style={UserBoard}>
                    <header>Profile</header>
                </div>
            );
        }
    }

    Close = () => {this.setState({popshow: false})};
    Open = () => {this.setState({popshow: true})};

    render() {
        // console.log(this.state)
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
                {this.renderProfile()}
                <PopWindow show={this.state.popshow} Close={this.Close} Open={this.Open} />  
            </div>
        );
    }
}

const UserBoard = {
    width: '200px',
    height: '300px',
    float: 'right',
    margin: '20px',
    borderRadius: '15px',
    backgroundColor: '#80deea',
    boxShadow: '2px 2px 1px #607d8b'
}

function mapStateToProps(state) {
    return {auth: state.auth}
}

export default connect(mapStateToProps)(Header);