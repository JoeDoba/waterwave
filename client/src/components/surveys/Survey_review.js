import React, {Component}  from 'react';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import {submitSurvey} from '../../actions';
import {withRouter} from 'react-router-dom';
class SurveyReview extends Component {
    renderFields() {
        return (
            <div>
                <ul id="review">
                    <li>Subject:</li>
                    <p>{this.props.formValues.subject}</p>
                    <li>Survey Title:</li>
                    <p>{this.props.formValues.title}</p>
                    <li>Recipients:</li>
                    <p>{this.props.formValues.recipients}</p>
                    <li>Main Body:</li>
                    <p>{this.props.formValues.body}</p>
                </ul>
            </div>
        );
    }

    Submit = () => {
        this.props.submitSurvey(this.props.formValues);
        this.props.Close();
    }

    render() {
        
        if (this.props.show !== 2) return null;
        return (
            <div style={OVERLAY_STYLE}>
                <div style={MAIN_STYLE}>
                    <nav className="nav-wrapper" style={{padding: '10px', borderRadius: '15px 15px 0px 0px'}}>
                        <h6>Please confirm the following informations</h6>
                    </nav>
                    <div style={{height: '10px', backgroundColor: '#007ac1'}}></div>
                    <div style={NEW_SURVEY} >
                        {this.renderFields()}
                        <div style={{textAlign: "center"}}>
                            <Button  onClick={this.props.Prev} className="blue"style={BUTTON}>Back</Button>
                            <Button onClick={this.Submit} className="green" style={BUTTON}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }   
}

function mapStateToProps(state) {
    if (!state.form.surveyForm) {
        return
    }
    return {formValues: state.form.surveyForm.values}
}

export default connect(mapStateToProps, {submitSurvey})(withRouter(SurveyReview));

const MAIN_STYLE = {
    width: '50%',
    minWidth: '300px',
    minHeight: '300px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '0px',
    borderRadius: '15px',
    zIndex: 1000
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000
}

const BUTTON = {
    margin: '15px',
    width: '20%',
}

const NEW_SURVEY = {
    minWidth: '300px',
    minHeight: '180px',
    margin: '20px'
}