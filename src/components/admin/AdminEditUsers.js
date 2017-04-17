import React from 'react';
import { Form, Upload, Modal, Icon, Button, Table, Input, message, Radio } from 'antd';

import { getUserById, addUser, updateUser, config } from '../../apis/api';

class AdminEditUsers extends React.Component {

    constructor(props) {
        super(props);
        const id = this.props.id;
        this.state = {
            id: id || -1,
            visible: false,
            avatr_url: '',
            age: null,
            sex: 'male',
            work: null,
            wx: null,
            phone: null,
            name: null,
            previewVisible: false,
            previewImage: '',
            file: []
        }
    }

    componentWillMount() {
        let params = {
            id: this.state.id
        }
        if(this.state.id > 0) {
            getUserById(params).then(data => {
                let myData = data.data;
                this.setState({
                    avatr_url: myData.avatr_url,
                    age: myData.age,
                    sex: myData.sex,
                    work: myData.work,
                    wx: myData.wx,
                    phone: myData.phone,
                    name: myData.name,
                    file:[{
                        uid: 'xxxxx',
                        name: 'avatr',
                        status: 'done',
                        url: `${config.baseUrl}:${config.port}/${config.uploads}/${myData.avatr_url}`
                    }]
                })
            })
        }
    }

    onShowModal = () => {
        this.setState({
           visible: !this.state.visible 
        })
    };

    onFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onHandleSubmit = () => {
        let params = {
            avatr_url: this.state.avatr_url,
            age: this.state.age,
            sex: this.state.sex,
            work: this.state.work,
            wx: this.state.wx,
            phone: this.state.phone,
            name: this.state.name
        }
        
        if(this.state.id > 0) {
            params.id = this.state.id;
            console.log(params);
            updateUser(params).then(data => {
                message.success('更新成功');
                setTimeout(_ => {
                    location.reload(true);
                }, 800);
            })

            return 0;
        }

        addUser(params).then(data => {
            message.success('添加成功');

            setTimeout(_ => {
                location.reload(true);
            }, 800);
        })

        //this.context.router.push('/admin/label');
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList}) => {
        if(fileList.length === 0) {
            this.setState({
                file: [],
                avatr_url: ''
            })
        }else {
            this.setState({
                file: [{
                    uid: fileList[0].uid,
                    name: fileList[0].name,
                    status: fileList[0].status,
                    url: `${config.baseUrl}:${config.port}/${config.uploads}/${fileList[0].name}`
                }],
                avatr_url: fileList[0].name
            });
        }
    };

    render() {
        const { previewVisible, previewImage, file } = this.state;
        return (
            <div>
                <p>
                    <Button style={{display: (this.state.id > 0 ? 'none' : 'inline-block')}} onClick={this.onShowModal} type='primary' size='large'><Icon type="plus" /></Button>
                    <Button style={{display: (this.state.id > 0 ? 'inline-block' : 'none')}} onClick={this.onShowModal} size='small'><Icon type="edit" /></Button>
                </p>
                <Modal title="添加用户"
                    visible={this.state.visible}
                    onOk={this.onHandleSubmit}
                    onCancel={this.onShowModal}>
                    <Form>
                         <Form.Item
                             label='名称'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='text'
                                defaultValue={this.state.name}
                                name='name'
                                onChange={this.onFormChange}
                                id='name'/>
                         </Form.Item>
                         <Form.Item
                             label='头像'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <div className="clearfix">
                                <Upload
                                    action={`${config.baseUrl}:${config.port}/uploads`}
                                    listType="picture-card"
                                    fileList={file}
                                    name='imageFile'
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}>
                                    { file.length > 0 ? null: (
                                        <div>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">Upload</div>
                                        </div>
                                    )}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="头像查看" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </div>
                        </Form.Item>
                        <Form.Item
                             label='年龄'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='text'
                                defaultValue={this.state.age}
                                name='age'
                                onChange={this.onFormChange}
                                id='age'/>
                        </Form.Item>
                        <Form.Item
                             label='工作'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='text'
                                defaultValue={this.state.work}
                                name='work'
                                onChange={this.onFormChange}
                                id='work'/>
                        </Form.Item>
                        <Form.Item
                             label='微信'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='text'
                                defaultValue={this.state.wx}
                                name='wx'
                                onChange={this.onFormChange}
                                id='wx'/>
                        </Form.Item>
                        <Form.Item
                             label='电话'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='text'
                                defaultValue={this.state.phone}
                                name='phone'
                                onChange={this.onFormChange}
                                id='phone'/>
                        </Form.Item>
                        <Form.Item
                             label='性别'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Radio.Group defaultValue={this.state.sex} name='sex' size="small" onChange={this.onFormChange}>
                                <Radio.Button name="sex" value="male">boy</Radio.Button>
                                <Radio.Button name="sex" value="female">girl</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

AdminEditUsers.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AdminEditUsers;