import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

import logo from '../../assets/logo.png';

class AdminContainer extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      hash: ['article']
    }
  }
  componentWillMount() {
    let hash = location.hash || '#admin/article?_k=';
    if(hash.indexOf('article') > 0)  {
      hash = 'article';
    }else if(hash.indexOf('label') > 0) {
      hash = 'label';
    }else if(hash.indexOf('users') > 0) {
      hash = 'users';
    }else if(hash.indexOf('banner') > 0) {
      hash = 'banner';
    }
    this.setState({
      hash: [hash]
    })
  }
  render() {
    console.log(this.state.hash)
    return (
      <Layout style={{height: '100%'}}>
    <Header className="header">
      <div className="logo"><img src={logo} width='50' height='50' style={{marginTop: '7px'}}/></div>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu mode="inline" defaultSelectedKeys={this.state.hash} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
          <SubMenu key="sub1" title={<span><Icon type="exception" />内容编辑</span>}>
            <Menu.Item key="article"><Link to="admin/article" style={{ textDecoration:'none' }}>文章内容</Link></Menu.Item>
            <Menu.Item key="label"><Link to="admin/label" style={{ textDecoration:'none' }}>标签设置</Link></Menu.Item>
            <Menu.Item key="users"><Link to="admin/users" style={{ textDecoration:'none' }}>用户设置</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="layout" />其他编辑</span>}>
            <Menu.Item key="banner"><Link to="admin/banner" style={{ textDecoration:'none' }}>banner编辑</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <div style={{marginTop: '20px'}}></div>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
    )
  }
}

AdminContainer.propTypes = {
};

export default connect()(AdminContainer);
