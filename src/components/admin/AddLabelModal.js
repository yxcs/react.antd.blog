import React from 'react';
import { Form, Modal, Icon, Button, Table, Input, message } from 'antd';

import { addLabel, updateLabel, getLabelById } from '../../apis/api';

class AddLabelModal extends React.Component {

    constructor(props) {
        super(props);
        const id = this.props.id;
        this.state = {
            id: id || -1,
            visible: false,
            name: '',
            color: '#fff000'
        }
    }

    componentWillMount() {
        let params = {
            id: this.state.id
        }
        if(this.state.id > 0) {
            getLabelById(params).then(data => {
                const myData = data.data;
                this.setState({
                    name: myData.name,
                    color: myData.color
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
            name: this.state.name,
            color: this.state.color
        }
        
        if(this.state.id > 0) {
            params.id = this.state.id;
            updateLabel(params).then(data => {
                message.success('更新成功');
                setTimeout(_ => {
                    location.reload(true);
                }, 800);
            })

            return 0;
        }

        addLabel(params).then(data => {
            message.success('添加成功');

            setTimeout(_ => {
                location.reload(true);
            }, 800);
        })

        //this.context.router.push('/admin/label');
    };

    render() {
        return (
            <div>
                <p>
                    <Button style={{display: (this.state.id > 0 ? 'none' : 'inline-block')}} onClick={this.onShowModal} type='primary' size='large'><Icon type="plus" /></Button>
                    <Button style={{display: (this.state.id > 0 ? 'inline-block' : 'none')}} onClick={this.onShowModal} size='small'><Icon type="edit" /></Button>
                </p>
                <Modal title="添加标签"
                    visible={this.state.visible}
                    onOk={this.onHandleSubmit}
                    onCancel={this.onShowModal}>
                    <Form>
                         <Form.Item
                             label='标签名称'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='text'
                                defaultValue={this.state.name}
                                name='name'
                                onChange={this.onFormChange}
                                id='name'/>
                         </Form.Item>
                         <Form.Item
                             label='标签颜色'
                             labelCol={{span: 5}}
                             wrapperCol={{span: 15}}>
                             <Input type='text'
                                defaultValue={this.state.color}
                                name='color'
                                onChange={this.onFormChange}
                                id='color'/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

AddLabelModal.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AddLabelModal;