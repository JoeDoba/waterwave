import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchUser} from '../actions';

import './css/Landing.css'

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2 className="container">Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
        // console.log(this.props)
    }
    
    render() {
        return (
            <div className="block">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing}/> 
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, {fetchUser})(App);