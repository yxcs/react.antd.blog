import React from 'react';
import { Icon, Table, Row, Col } from 'antd';
import { Link } from 'dva/router';
import moment from 'moment';
import AdminEditUsers from './AdminEditUsers';
import AdminDelete from './AdminDelete';

import { getArticleList } from '../../apis/api';

class AdminArticle extends React.Component {

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
                    title: '标题',
                    dataIndex: 'title',
                    key: 'title'
                },
                {
                    title: '作者',
                    dataIndex: 'user',
                    key: 'user'
                },
                {
                    title: '标签',
                    dataIndex: 'label',
                    key: 'label'
                },
                {
                    title: '类型',
                    dataIndex: 'type',
                    key: 'type'
                },
                {
                    title: '创建时间',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    render: (v) => {
                        return moment(v).format('YYYY-MM-DD')
                    }
                },
                {
                    title: '更新时间',
                    dataIndex: 'update_at',
                    key: 'update_at',
                    render: (v) => {
                        return moment(v).format('YYYY-MM-DD')
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    key: 'set_id',
                    render: (v,record) => {
                        return (
                            <Row>
                                <Col span={12}><Link to={`admin/editart/${v}`}>编辑</Link></Col>
                                <Col span={12}><AdminDelete id={v} type='article' /></Col>
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
        getArticleList(params).then(data => {
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
        getArticleList(params).then(data => {
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
                <p><Link to='admin/editart'>添加</Link></p>
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

export default AdminArticle;