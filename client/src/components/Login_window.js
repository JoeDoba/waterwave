import React, {Component}  from 'react'
import google_logo from './pictures/google_logo.png';
import github_logo from './pictures/github_logo.png';
import Button from 'react-bootstrap/esm/Button';
import './css/Login_pop.css';

export default class PopWindow extends Component {
    constructor(props) {
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.Close();
        }
    }

    render() {
        if (!this.props.show) return null;
        return (
            <div style={OVERLAY_STYLE}>
                <div style={MAIN_STYLE} ref={this.setWrapperRef}>
                    <nav className="nav-wrapper" style={{padding: '10px', borderRadius: '15px 15px 0px 0px'}}><h5>Login</h5></nav>
                    <div style={{height: '10px', backgroundColor: '#007ac1'}}></div>
                    <div>
                        <button type="submit" >
                            <a href="/auth/google">
                                <img src={google_logo} style={{height: '25px', width: '25px'}} alt="google_logo"/>
                                <p>Sign In with Google</p>
                            </a>
                        </button>
                        <button type="submit" >
                            <a href="/auth/github">
                                <img src={github_logo} style={{height: '25px', width: '25px'}} alt="github_logo"/>
                                <p>Sign In with GitHub</p>
                            </a>
                        </button>
                    </div>
                    <Button onClick={this.props.Close} style={BUTTON}>Close</Button>
                </div>
            </div>
        );
    }   
}



const MAIN_STYLE = {
    width: '20%',
    minWidth: '300px',
    minHeight: '180px',
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
    margin: '0px 15px 15px 0px',
    display: 'block',
    float: 'right'
}