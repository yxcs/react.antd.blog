import React from 'react';
import { Link } from 'dva/router';
import { Layout, Menu } from 'antd';
const { Header } = Layout;
import styles from '../less/styles.less';
import logo from '../assets/logo.png';

class MyHeader extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      hash: ['main']
    }
  }
  componentWillMount() {
    let hash = location.hash || '#admin/article?_k=';
    if(hash.indexOf('js') > 0)  {
      hash = 'js';
    }else if(hash.indexOf('node') > 0) {
      hash = 'node';
    }else if(hash.indexOf('php') > 0) {
      hash = 'php';
    }else if(hash.indexOf('essay') > 0) {
      hash = 'essay';
    }else if(hash.indexOf('admin') > 0) {
      hash = 'admin';
    }else {
      hash = 'main';
    }
    this.setState({
      hash: [hash]
    })
  }

    render() {
        
        return (
            <Header style={{ position: 'fixed',zIndex: 999, width: '100%' }}>
                <div className={styles.logo}><img src={logo} style={{width: '50px',height: '50px'}} /></div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={this.state.hash} style={{ lineHeight: '64px' }}>
                    <Menu.Item key="main"><Link to='main' style={{ textDecoration:'none' }}> Home </Link></Menu.Item>
                    <Menu.Item key="js"><Link to='main/js' style={{ textDecoration:'none' }}>JavaScript</Link></Menu.Item>
                    <Menu.Item key="node"><Link to='main/node' style={{ textDecoration:'none' }}>Node</Link></Menu.Item>
                    <Menu.Item key="php"><Link to='main/php' style={{ textDecoration:'none' }}>Php</Link></Menu.Item>
                    <Menu.Item key="essay"><Link to='main/essay' style={{ textDecoration:'none' }}>Essay</Link></Menu.Item>
                    <Menu.Item key="admin"><Link to='admin/article' style={{ textDecoration:'none' }}>Admin</Link></Menu.Item>
                </Menu>
            </Header>
        )
    }
}

MyHeader.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MyHeader;
