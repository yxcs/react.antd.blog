import React from 'react';
import { Layout, Breadcrumb, Carousel, Icon, Pagination } from 'antd';
const { Content } = Layout;
import styles from '../../less/styles.less';
import main_img from '../../assets/2.jpg';
import MainItem from '../MainItem';

import { getArticleByType, config  } from '../../apis/api';

class JsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {}
        }
    }

    componentWillMount() {
        let params = {
            type: 'js',
            page:1,
            size: 10
        };
        getArticleByType(params).then(data => {
           this.setState({
               data: data.data.data,
               pagination: data.data.pagination
            });
       })
    }

    onPageChange = (page, pageSize) => {
        let params = {
            size: pageSize,
            page: page
        }
        getArticleByType(params).then(data => {
           this.setState({
               data: data.data.data,
               pagination: data.data.pagination
            });
       })

    }

    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>JavaScript</Breadcrumb.Item>
                    <Breadcrumb.Item>Lists</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#ececec', padding: 24, minHeight: 800 }}>

                    {
                        this.state.data.map(v => {
                            return <MainItem key={v.id} {...v}/>
                        })
                    }
                    <div style={{marginTop: '20px'}}></div>
                    <Pagination
                    current={this.state.pagination.page}
                    total={this.state.pagination.total}
                    showTotal={total => `Total ${total} items`}
                    pageSize={this.state.pagination.size}
                    onChange={this.onPageChange}
                />
                </div>
            </div>
        )
    }
}

export default JsPage;