import React from 'react';
import { Icon, Pagination, Button, Table, Row, Col, Tag } from 'antd';
import admin from '../../less/admin.less';
import AddLabelModal from './AddLabelModal';
import AdminDelete from './AdminDelete';

import { getAllLabels, deleteLabelById } from '../../apis/api';

class AdminLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {},
            dataSource:[],
            columns: [
                {
                    title: '#',
                    dataIndex: 'id',
                    key: 'id'
                },
                {
                    title: '文章数量',
                    dataIndex: 'labels_number',
                    key: 'labels_number'
                },
                {
                    title: '颜色',
                    dataIndex: 'color',
                    key: 'color',
                    render: v => {
                        return <Tag color={v}>{v}</Tag>
                    }
                },
                {
                    title: '标签',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    key: 'set_id',
                    render: (v,record) => {
                        return (
                            <Row>
                                <Col span={12}><AddLabelModal id={v} /></Col>
                                <Col span={12}><AdminDelete id={v} type='labels' /></Col>
                            </Row>
                        )
                    }
                }
            ]
        }
    }

    componentWillMount() {
        getAllLabels().then(data => {
            this.setState({
                dataSource:data.data
            })
        })
    }

    render() {
        return (
            <div>
                <AddLabelModal />
                <Table style={{marginTop: '20px'}} rowKey="id" columns={this.state.columns} dataSource={this.state.dataSource} pagination={false} />
            </div>
        )
    }
}

export default AdminLabel;