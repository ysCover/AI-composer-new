/* eslint-disable */
import React, { Component } from 'react';
import { Form, Select, Button } from 'semantic-ui-react';
import MovieList from './movie-list';
import Player from './AI-Composer/player'
import Root from './AI-Composer/root';
import imgLogo from '../static_files/images/ComposerLogo.JPG'

const StyleOptions = [
    { value: 'Jazz', text: '爵士乐（Jazz）' },
    { value: 'Classic', text: '古典乐（Classic）' },
    { value: 'Rock', text: '摇滚乐（Rock）' },
];
const TimeOptions = [
    { value: '20s', text: '20s' },
    { value: '40s', text: '40s' },
    { value: '60s', text: '60s' },
];
const InstrumentOptions = [
    { value: 'Piano', text: '钢琴（Piano）' },
    { value: 'Guitar', text: '吉他（Guitar）' },
    { value: 'Saxophone', text: '萨克斯（Saxophone）' },
    { value: 'Violin', text: '小提琴(Violin)'},
    { value: 'Flute', text: '长笛(Flute)'}
];

function handleChange(value) {
  console.log(`selected ${value}`);
}
 /* eslint-disable */

class SearchMovieList extends Component {
    handleSubmit (e) {
        e.preventDefault();
        const keyword = e.target.keyword.value;

        // 只有当搜索关键字发生改变时才触发
        if ( keyword !== this.props.keyword ) {
            this.props.onKeywordChange(keyword);
        }
    }

    // 前后端交互接口(编曲)
    composing= (request) => {
        request = new XMLHttpRequest();
        request.open("GET", 'http://127.0.0.1:5000/test', true)
        request.setRequestHeader('content-type', 'application/json')
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                // alert(request.responseText)
                // let register  = '请选择业务模式为'+'<span xss=removed>+name+</span>'+'的记录!';
                // alert(register);
                alert("已生成新的编曲!")
            }
        };
        request.send()
    }


    render () {
        const { keyword } = this.props;
        const NewRoot = require('./AI-Composer/root').default;
        return (
            <div className='composer-div' >
                 {/*<Form className='search-form' onSubmit={this.handleSubmit.bind(this)}>*/}
                     {/*<Form.Input*/}
                         {/*fluid*/}
                         {/*name='keyword'*/}
                         {/*size="large"*/}
                         {/*icon='search'*/}
                         {/*placeholder='搜索音乐'*/}
                         {/*defaultValue={keyword}*/}
                        {/*/>*/}
                 {/*</Form>*/}
                {/*<img src='../static_files/images/ComposerLogo.png' />*/}
                <div className='logo-image-1' >
                    <div className='logo-image-2'>
                        <div className='logo-image-3'>
                            {/*<img src={imgLogo} alt="ComposerLogo" style={{ width: 800, height: 200, margin_left: 40}}/>*/}
                            <img className='logo-image' src={imgLogo} alt="ComposerLogo" />
                        </div>
                    </div>
                </div>
                <div className='composer-music-select' >
                    <div className="ui vertical header"> 选择编曲风格</div>
                    <Select placeholder='Select your style' options={StyleOptions} defaultValue="Jazz" style={{ width: 250 }} onChange={handleChange}/>
                    <div className="ui vertical header"> 选择编曲时长</div>
                    <Select placeholder='Select your country' options={TimeOptions} defaultValue="20s" style={{ width: 250 }} onChange={handleChange}/>
                    <div className="ui vertical header"> 选择编曲乐器</div>
                    <Select placeholder='Select your country' options={InstrumentOptions} defaultValue="Piano" style={{ width: 250 }} onChange={handleChange}/>
                    <div className="ui vertical header"> </div>
                    <Button id='arranging-start' className='composer-button1'
                            onClick={this.composing}
                    >开始编曲</Button>
                </div>

                <div className='composer-music-player'>
                    <div className='composer-root'>
                        <Root {...this.props}/>
                    </div>
                </div>
                {keyword && (<MovieList {...this.props} />)}
            </div>
        );
    };
}

export default SearchMovieList;