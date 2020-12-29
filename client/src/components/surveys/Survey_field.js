import React, {Component}  from 'react';

export default class SurveyWindow extends Component {
    render() {
        return (       
            <div className="new_survey_terms">
                <input type="text" className="survey_input1" {...this.props.input} autoComplete="off" required/>
                <span className="bar"></span>
                <label>{this.props.label}</label>
                <div style={ERROR}> 
                    {this.props.meta.error}
                </div>
                
            </div>
        );
    }
}

export class SurveyWindowArea extends Component {
    render() {
        return (
            <div className="new_survey_terms">
                <textarea  type="text" className="survey_input2" {...this.props.input} style={SURVEY_AREA} placeholder = {this.props.label}required/>
            </div>
        );
    }
}

const SURVEY_AREA = {
    minWidth: '300px',
    minHeight: '180px',
    padding: '10px',
    margin: '10px auto',
    resize: 'none'
}

const ERROR = {
    wordWrap: 'break-word',
    color: 'red',
    textAlign: 'left',
}