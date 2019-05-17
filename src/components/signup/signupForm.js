/* eslint-disable */
import React, {Component} from 'react';

class SignupForm extends Component {
    // 绑定数据
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    // uername 改变事件
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    //提交事件, 实现前后端交互接口(注册)
    onSubmit (e) {
        // alert('姓名: ' + this.state.username + '\n' + '邮箱: ' + this.state.email + '\n' + '密码: ' +
        //     this.state.password + '\n' + '密码确认: ' + this.state.passwordConfirmation);
        e.preventDefault();
        console.log(this.state);

        let url = 'http://127.0.0.1:5000/registered';
        fetch(url,{
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                 'content-type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        })
        .then((response) => {
            alert(JSON.stringify(response));
            console.log('Success:', JSON.stringify(response))   // 拿到数据进行页面渲染
        })
        .catch((error) => {
            alert(error);
            console.error('Error:', error);    //出错信息
        });
    };

    render() {
        return (
            <form onSubmit={ this.onSubmit } autocomplete="off">
                <h3>用户注册</h3>

                <div className="form-group">
                    <label className="control-label">用户名</label>
                    <input
                        value={ this.state.username }
                        onChange={ this.onChange }
                        type="text"
                        name="username"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">邮箱</label>
                    <input
                        value={ this.state.email }
                        onChange={ this.onChange }
                        type="email"
                        name="email"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">密码</label>
                    <input
                        value={ this.state.password }
                        onChange={ this.onChange }
                        type="password"
                        name="password"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">密码确认</label>
                    <input
                        value={ this.state.passwordConfirmation }
                        onChange={ this.onChange }
                        type="password"
                        name="passwordConfirmation"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg " onClick={this.onSubmit}>
                        注册
                    </button>
                </div>
            </form>
        );
    }
}

export default SignupForm