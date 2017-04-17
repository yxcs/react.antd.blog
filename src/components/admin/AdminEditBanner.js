import React from 'react';
import { Form, Upload, Modal, Icon, Button, Table, Input, message } from 'antd';

import { addBanner, updateBanner, getBannerById, config } from '../../apis/api';

class AdminEditBanner extends React.Component {

    constructor(props) {
        super(props);
        const id = this.props.id;
        this.state = {
            id: id || -1,
            visible: false,
            img_src: '',
            msg: '',
            article_id: 1,
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
            getBannerById(params).then(data => {
                const myData = data.data;
                this.setState({
                    img_src: myData.img_src,
                    msg: myData.msg,
                    article_id: myData.article_id,
                    file:[{
                        uid: 'xxxxx',
                        name: 'avatr',
                        status: 'done',
                        url: `${config.baseUrl}:${config.port}/${config.uploads}/${myData.img_src}`
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
             img_src: this.state.img_src,
             msg: this.state.msg,
             article_id: this.state.article_id
        }

        console.log(params)
        
        if(this.state.id > 0) {
            params.id = this.state.id;
            updateBanner(params).then(data => {
                message.success('更新成功');
                setTimeout(_ => {
                    location.reload(true);
                }, 800);
            })

            return 0;
        }

        addBanner(params).then(data => {
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
                img_src: fileList[0].name
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
                <Modal title="添加Banner"
                    visible={this.state.visible}
                    onOk={this.onHandleSubmit}
                    onCancel={this.onShowModal}>
                    <Form>
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
                             label='信息'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='text'
                                defaultValue={this.state.msg}
                                name='msg'
                                onChange={this.onFormChange}
                                id='msg'/>
                        </Form.Item>
                        <Form.Item
                             label='文章ID'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='text'
                                defaultValue={this.state.article_id}
                                name='article_id'
                                onChange={this.onFormChange}
                                id='article_id'/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

AdminEditBanner.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AdminEditBanner;