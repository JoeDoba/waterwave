import React, {Component} from 'react';
import {connect} from 'react-redux';
import './css/Dashboard.css';

class Dashboard extends Component {
    render() {
        // console.log(this.props);
        if (this.props.auth == null || false) {
            return null;
        }
        return (
            <div id="Landing">
                <div style={DASHBOARD}>
                    <header id="dashboard_header">Dashboard</header>
                    <div style={{height: '2px', backgroundColor: '#007ac1'}}></div>
                </div>
                <div style={PROFILE}>
                    <header id="profile_header">Profile</header>
                    <div style={{height: '2px', backgroundColor: '#007ac1'}}></div>
                    <ul>
                        <li className="profile_terms">User Name: {this.props.auth.name}</li>
                        <li className="profile_terms">Credit Available: <span id="credit">${this.props.auth.credits}</span></li>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {auth: state.auth}
}

export default connect(mapStateToProps)(Dashboard);

const DASHBOARD = {
    width: '50%',
    height: '500px',
    margin: '20px auto',
    backgroundColor: '#b3e5fc',
    boxShadow: '1px 2px 2px #607d8b',
    display: 'inline-block',
    position: 'absolute',
    left: '25%',
}

const PROFILE = {
    // width: '12%',
    height: '200px',
    minWidth: '200px',
    margin: '20px',
    backgroundColor: '#b3e5fc',
    boxShadow: '1px 2px 2px #607d8b',
    display: 'inline-block',
    float: 'right',
}
