import React from 'react';
import { Form, Upload, Modal, Icon, Button, Table, Input, message, Radio, Select, Switch } from 'antd';

import { addArticle, getArticleById, getAllLabels, getAllUsers, updateArticle, config } from '../../apis/api';

class AdminEditArticle extends React.Component {

    constructor(props) {
        super(props);
        const id = this.props.params.id;
        this.state = {
            id: id || -1,
            title: '',
            user_id: '',
            user: '',
            label_id: '',
            label: '',
            state: '',
            comments: '',
            see_number: '',
            like_number: '',
            img_src: '',
            body: '',
            type: '',
            labelData: [],
            userData: [],
            labelDefault: '',
            userDefault: '',
            previewVisible: false,
            previewImage: '',
            file: []
        }
    }

    componentWillMount() {

        if(this.state.id > 0) {
            getArticleById({id: this.state.id}).then(data => {
                let myData = data.data;
                let state = myData.state == 'OPEN' ? true : false;
                this.setState({
                    title: myData.title,
                    user_id: myData.user_id,
                    user: myData.user,
                    label_id: myData.label_id,
                    label: myData.label,
                    state,
                    comments: myData.comments,
                    see_number: myData.see_number,
                    like_number: myData.like_number,
                    img_src: myData.img_src,
                    body: myData.body,
                    type: myData.type,
                    labelDefault: myData.label_id+'_'+myData.label,
                    userDefault: myData.user_id+'_'+myData.user,
                    file:[{
                        uid: 'xxxxx',
                        name: 'avatr',
                        status: 'done',
                        url: `${config.baseUrl}:${config.port}/${config.uploads}/${myData.img_src}`
                    }]
                })
            })
        }


        getAllLabels().then(data => {
            this.setState({
                labelDefault: data.data[0].name+'_'+data.data[0].name,
                labelData: data.data
            })
        })

        getAllUsers().then(data => {
            this.setState({
                userDefault: data.data[0].name+'_'+data.data[0].name,
                userData: data.data
            })
        })
    }

    onFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSelectChange = (v, e) => {
        if(v === 'type') {
            this.setState({
                type: e
            })
            return 0;
        }
        let arr = e.split('_');
        this.setState({
            [v+'_id']: arr[0],
            [v]: arr[1]
        })
    }

    onSwitchChange = (e) => {
        let state = e ? 'OPEN' : 'CLOSE';
        this.setState({ state });
    }

    onHandleSubmit = () => {
        let params = {
            title: this.state.title,
            user_id: this.state.user_id,
            user: this.state.user,
            label_id: this.state.label_id,
            label: this.state.label,
            state: this.state.state,
            comments: this.state.comments,
            see_number: this.state.see_number,
            like_number: this.state.like_number,
            img_src: this.state.img_src,
            body: this.state.body,
            type: this.state.type
        }
        
        if(this.state.id > 0) {
            params.id = this.state.id;
            updateArticle(params).then(data => {
                message.success('更新成功');
                setTimeout(_ => {
                    this.context.router.push('admin/article');
                }, 800);
            })

            return 0;
        }

        addArticle(params).then(data => {
            message.success('添加成功');

            setTimeout(_ => {
                this.context.router.push('admin/article');
            }, 800);
        })

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
                img_src: ''
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
                <div>
                    <Form>
                         <Form.Item
                             label='标题'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='text'
                                defaultValue={this.state.title}
                                name='title'
                                onChange={this.onFormChange}
                                id='title'/>
                         </Form.Item>
                         <Form.Item
                             label='作者'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Select defaultValue={this.state.userDefault} name="user" onChange={this.onSelectChange.bind(this,'user')}>
                                 {
                                     this.state.userData.map(v => {
                                         return <Select.Option key={v.id} name="user" value={`${v.id}_${v.name}`}>{v.name}</Select.Option>
                                     })
                                 }
                             </Select>
                        </Form.Item>
                        <Form.Item
                             label='标签'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Select defaultValue={this.state.labelDefault} name="label" onChange={this.onSelectChange.bind(this,'label')}>
                                 {
                                     this.state.labelData.map(v => {
                                         return <Select.Option key={v.id} name="user" value={`${v.id}_${v.name}`}>{v.name}</Select.Option>
                                     })
                                 }
                             </Select>
                        </Form.Item>
                        <Form.Item
                             label='类型'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Select defaultValue="JavaScript" name="type" onChange={this.onSelectChange.bind(this,'type')}>
                                <Select.Option value="JavaScript">JavaScript</Select.Option>
                                <Select.Option value="Node">Node</Select.Option>
                                <Select.Option value="Php">Php</Select.Option>
                                <Select.Option value="Essay">Essay</Select.Option>
                             </Select>
                        </Form.Item>
                        <Form.Item
                             label='状态'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Switch onChange={this.onSwitchChange} defaultChecked={true} checkedChildren={'开'} unCheckedChildren={'关'} />
                        </Form.Item>
                        <Form.Item
                             label='评论'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='number'
                                defaultValue={this.state.comments}
                                name='comments'
                                onChange={this.onFormChange}
                                id='comments'/>
                        </Form.Item>
                        <Form.Item
                             label='浏览'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='number'
                                defaultValue={this.state.see_number}
                                name='see_number'
                                onChange={this.onFormChange}
                                id='see_number'/>
                        </Form.Item>
                        <Form.Item
                             label='喜欢'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                              <Input type='number'
                                defaultValue={this.state.like_number}
                                name='like_number'
                                 onChange={this.onFormChange}
                                id='like_number'/>
                        </Form.Item>
                        <Form.Item
                             label='图片'
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
                             label='内容(暂时markdown)'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='textarea'
                                defaultValue={this.state.body}
                                name='body'
                                autosize={{minRows: 8}}
                                onChange={this.onFormChange}
                                id='body'/>
                        </Form.Item>
                    </Form>
                </div>
                <div><Button size='small'>取消</Button><Button onClick={this.onHandleSubmit} type='primary' size='small'>确定</Button></div>
            </div>
        )
    }
}

AdminEditArticle.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AdminEditArticle;