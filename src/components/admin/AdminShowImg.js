import React from 'react';
import { Form, Modal, Icon, Button, Table, Input, message } from 'antd';

import { addLabel, updateLabel, getLabelById, config } from '../../apis/api';

class AdminShowImg extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    onShowImg = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    render() {
        let { src } = this.props;
        return (
            <div>
                <p><img onClick={this.onShowImg} alt="头像" src={`${config.baseUrl}:${config.port}/${config.uploads}/${src}`} width="30" height="30"/></p>
                <Modal title="查看头像"
                    visible={this.state.visible}
                    onOk={this.onShowImg}
                    onCancel={this.onShowImg}>
                    <div style={{textAlign: 'center'}}><img onClick={this.onShowImg} alt="头像" src={`${config.baseUrl}:${config.port}/${config.uploads}/${src}`} width="300" height="300"/></div>
                </Modal>
            </div>
        )
    }
}

AdminShowImg.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AdminShowImg;