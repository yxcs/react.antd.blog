import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import styles from './IndexPage.css';
import MyHeader from '../components/MyHeader';
import MyFooter from '../components/MyFooter';

class IndexPage extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <MyHeader />
        <Content style={{ padding: '64px 50px 0 50px', width: '1000px', margin:'auto' }}>
          {this.props.children}
        </Content>
        <MyFooter />
      </Layout>
    )
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
