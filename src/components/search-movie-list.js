import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import MovieList from './movie-list';

class SearchMovieList extends Component {
    handleSubmit (e) {
        e.preventDefault();
        const keyword = e.target.keyword.value;

        // 只有当搜索关键字发生改变时才触发
        if ( keyword !== this.props.keyword ) {
            this.props.onKeywordChange(keyword);
        }
    }

    render () {
        const { keyword } = this.props;
        return (
            <div>
                <Form className='search-form' onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Input
                        fluid
                        name='keyword'
                        size="large"
                        icon='search'
                        placeholder='搜索电影'
                        defaultValue={keyword}
                    />
                </Form>

                {keyword && (<MovieList {...this.props} />)}
            </div>
        );
    };
}

export default SearchMovieList;