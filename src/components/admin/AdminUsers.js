import React from 'react';
import { Icon, Table, Row, Col } from 'antd';
import AdminEditUsers from './AdminEditUsers';
import AdminDelete from './AdminDelete';
import AdminShowImg from './AdminShowImg';

import { getAllUsers } from '../../apis/api';

class AdminUsers extends React.Component {

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
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name'
                },
                {
                    title: '密码',
                    dataIndex: 'pwd',
                    key: 'pwd'
                },
                {
                    title: '头像',
                    dataIndex: 'avatr_url',
                    key: 'avatr_url',
                    render: v => {
                        return <AdminShowImg src={v}/>
                    }
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age'
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex'
                },
                {
                    title: '工作',
                    dataIndex: 'work',
                    key: 'work'
                },
                {
                    title: '微信',
                    dataIndex: 'wx',
                    key: 'wx'
                },
                {
                    title: '电话',
                    dataIndex: 'phone',
                    key: 'phone'
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    key: 'set_id',
                    render: (v,record) => {
                        return (
                            <Row>
                                <Col span={12}><AdminEditUsers id={v} /></Col>
                                <Col span={12}><AdminDelete id={v} type='users' /></Col>
                            </Row>
                        )
                    }
                }
            ]
        }
    }

    componentWillMount() {
        getAllUsers().then(data => {
            this.setState({
                dataSource:data.data
            })
        })
    }

    render() {
        return (
            <div>
                <AdminEditUsers />
                <Table style={{marginTop: '20px'}} rowKey="id" columns={this.state.columns} dataSource={this.state.dataSource} pagination={false} />
            </div>
        )
    }
}

export default AdminUsers;