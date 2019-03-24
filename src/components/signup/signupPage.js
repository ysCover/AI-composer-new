import React, {Component} from 'react';
import SignupForm from './signupForm'


class SignupPage extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <SignupForm></SignupForm>
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}

export default SignupPage;