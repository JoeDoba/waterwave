import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        const surveys = this.props.surveys.reverse();
        return surveys.slice(0,3).map((survey) => {
            return (
                <div className="card" style = {MAIN_STYLE} key={survey._id}>
                    <div className="cardTop">
                        <h4 className="cardTitle">{survey.title}</h4>                       
                        <p>{survey.body}</p>
                        <p style={{textAlign:'right'}}>Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
                    </div>
                    <div className="cardBot">
                        <p>Yes: {survey.yes}</p>
                        <p>No: {survey.no}</p>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        surveys: state.surveys
    }
}

export default connect(mapStateToProps, {fetchSurveys})(SurveyList)

const MAIN_STYLE = {
    width: '80%',
    margin: '10px auto'
}