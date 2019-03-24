import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    render () {
        return (
            <Menu fixed="bottom" icon='labeled' inverted widths={3}>
                <Menu.Item exact as={NavLink} to='/' name='theaters' color='blue' link>
                    <Icon name='history' />
                    历史编曲
                </Menu.Item>

                {/*<Menu.Item as={NavLink} to='/top250' name='top250' color='blue' link>*/}
                    {/*<Icon name='list' />*/}
                    {/*编曲推荐*/}
                {/*</Menu.Item>*/}

                <Menu.Item as={NavLink} to='/search' name='search' color='blue' link>
                    <Icon name='music' />
                    AI作曲家
                </Menu.Item>

                <Menu.Item as={NavLink} to='/favorites' name='favorites' color='blue' link>
                    <Icon name='star' />
                    我的收藏
                </Menu.Item>
            </Menu>
        );
    };
}

export default Navbar;