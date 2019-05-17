/* eslint-disable */
import React, {Component} from 'react';

class LoginForm extends Component {
    // 绑定数据
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    // uername 改变事件
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    //提交事件
    // onSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(this.state)
    // };

    //提交事件, 实现前后端交互接口(登陆)
    onSubmit (e) {
        // alert('姓名: ' + this.state.username + '\n' + '密码: ' + this.state.password );
        e.preventDefault();
        console.log(this.state);

        let url = 'http://127.0.0.1:5000/login';
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
            // autocomplete="off"实现Chrome浏览器取消INPUT自动记忆下拉框
            <form onSubmit={ this.onSubmit } autocomplete="off">
                <h3>用户登陆</h3>

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
                    <button className="btn btn-primary btn-lg " onClick={this.onSubmit}>
                        登陆
                    </button>
                </div>
            </form>
        );
    }
}

export default LoginForm