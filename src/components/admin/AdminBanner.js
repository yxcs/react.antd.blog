import React from 'react';
import { Icon, Pagination, Button, Table, Row, Col, Tag } from 'antd';
import admin from '../../less/admin.less';
import AdminEditBanner from './AdminEditBanner';
import AdminDelete from './AdminDelete';
import AdminShowImg from './AdminShowImg';

import { getBannerList } from '../../apis/api';

class AdminBanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {pageSize:10},
            dataSource:[],
            columns: [
                {
                    title: '#',
                    dataIndex: 'id',
                    key: 'id'
                },
                {
                    title: 'Banner',
                    dataIndex: 'img_src',
                    key: 'img_src',
                    render: v => {
                        return <AdminShowImg src={v}/>
                    }
                },
                {
                    title: '消息',
                    dataIndex: 'msg',
                    key: 'msg'
                },
                {
                    title: '文章ID',
                    dataIndex: 'article_id',
                    key: 'article_id'
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    key: 'set_id',
                    render: (v,record) => {
                        return (
                            <Row>
                                <Col span={12}><AdminEditBanner id={v} /></Col>
                                <Col span={12}><AdminDelete id={v} type='banner' /></Col>
                            </Row>
                        )
                    }
                }
            ]
        }
    }

    componentWillMount() {
        let params = {
            size: this.state.pagination.pageSize,
            page: 1
        }
        getBannerList(params).then(data => {
            let pagination = this.state.pagination;
            pagination.total = data.data.pagination.total;
            this.setState({
                dataSource: data.data.data,
                pagination
            })
        })
    }

    handleTableChange = (pagination) => {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        let params = {
            page: pagination.current,
            size: this.state.pagination.pageSize
        };
        getBannerList(params).then(data => {
             let pagination = this.state.pagination;
             pagination.total = data.data.pagination.total;
             this.setState({
                 loading: false,
                 dataSource: data.data.data,
                 pagination
             });
         });
    }

    render() {
        return (
            <div>
                <AdminEditBanner />
                <Table pagination={this.state.pagination}
                       style={{marginTop: '20px'}} 
                       rowKey="id" 
                       columns={this.state.columns} 
                       dataSource={this.state.dataSource}
                       onChange={this.handleTableChange} />
            </div>
        )
    }
}

export default AdminBanner;