import React, {Component} from 'react';
import {connect} from 'react-redux';
import SurveyWindow from './surveys/Survey_window';
import SurveyReview from './surveys/Survey_review';
import SurveyList from './surveys/Survey_list';
import './css/Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWindowNum: 0,
        }
    }

    nextPage = () => {this.setState({showWindowNum: this.state.showWindowNum + 1})};
    previousPage = () => {this.setState({showWindowNum: this.state.showWindowNum - 1})};
    closePage = () => {this.setState({showWindowNum: 0})};

    render() {
        if (this.props.auth == null || false) {
            return null;
        }
        return (
            <div id="Landing">
                <div style={DASHBOARD}>
                    <header id="dashboard_header">Dashboard</header>
                    <div style={{height: '2px', backgroundColor: '#007ac1'}}></div>
                    <div style={SURVEYS}><SurveyList /></div>
                    <div style={{height: '100px'}}>
                        <button onClick={() => this.nextPage()} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></button>
                    </div>                   
                </div>
                <div style={PROFILE}>
                    <header id="profile_header">Profile</header>
                    <div style={{height: '2px', backgroundColor: '#007ac1'}}></div>
                    <ul>
                        <li className="profile_terms">User Name: {this.props.auth.name}</li>
                        <li className="profile_terms">Credit Available: <span id="credit">${this.props.auth.credits}</span></li>
                    </ul>
                </div>
                
                <SurveyWindow show={this.state.showWindowNum} Close={this.closePage} Next={this.nextPage} onSubmit={this.nextPage} />
                <SurveyReview show={this.state.showWindowNum} Close={this.closePage} Next={this.nextPage} Prev={this.previousPage} />  
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
    // height: '500px',
    margin: '20px auto',
    backgroundColor: '#b3e5fc',
    boxShadow: '1px 2px 2px #607d8b',
    display: 'inline-block',
    position: 'absolute',
    left: '25%',
}

const PROFILE = {
    height: '200px',
    minWidth: '200px',
    margin: '20px',
    backgroundColor: '#b3e5fc',
    boxShadow: '1px 2px 2px #607d8b',
    display: 'inline-block',
    float: 'right',
}

const SURVEYS = {
    margin: '0px auto',
    overFlow: 'auto'
}
