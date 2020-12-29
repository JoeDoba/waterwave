import React, {Component}  from 'react';
import {reduxForm, Field} from 'redux-form';
import Button from 'react-bootstrap/esm/Button';
import SurveyField, {SurveyWindowArea} from './Survey_field';
import validateEmails from '../../utilis/validateEmails';


class SurveyWindow extends Component {
    renderFields() {
        return (
            <div>
                <Field type="text" name="title" component={SurveyField}  label="Survey Title" />
                <Field type="text" name="subject" component={SurveyField}  label="Subject" />
                <Field type="text" name="recipients" component={SurveyField} disabled={true} label="Recipients" />
                <Field type="text" name="body" component={SurveyWindowArea} label=""/>       
            </div>
        );
    }

    Cancel = () => {
        this.props.reset();
        this.props.Close();
    }

    render() {
        if (this.props.show !== 1) return null;
        return (
            <div style={OVERLAY_STYLE}>
                <div style={MAIN_STYLE}>
                    <nav className="nav-wrapper" style={{padding: '10px', borderRadius: '15px 15px 0px 0px'}}>
                        <h5>New Survey</h5>
                    </nav>
                    <div style={{height: '10px', backgroundColor: '#007ac1'}}></div>
                    <form style={NEW_SURVEY} onSubmit = {this.props.handleSubmit}>
                        {this.renderFields()}
                        <div style={{textAlign: 'center'}}>
                            <Button onClick={this.Cancel} style={BUTTON} className="blue">Cancel</Button>
                            <Button type="submit" style={BUTTON} className="green ">Next</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }   
}

function validate(values) {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');
    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
})(SurveyWindow)

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