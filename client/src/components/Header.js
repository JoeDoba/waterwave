import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import PopWindow from './Login_window';

const L = styled(Link)`margin-left: 10px;`; 

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popshow: false,
        }
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return
            case false:
                return <li onClick={() => this.setState({popshow: true})}><a>Login</a></li>
            default: 
                return <li><a href="/api/logout">Logout</a></li>;
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
                            {this.renderContent()}
                        </ul>         
                    </div>
                </nav>
                <PopWindow show={this.state.popshow} Close={this.Close} Open={this.Open} />  
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {auth: state.auth}
}

export default connect(mapStateToProps)(Header);