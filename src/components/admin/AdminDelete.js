import React from 'react';
import { Popconfirm, message, Icon, Button} from 'antd';

import { deleteLabelById, deleteUserById, deleteArticleById, deleteBannerById } from '../../apis/api';

class AdminDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            visible: false
        }
    }

    onClickDelete = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    onConfirmDelete = () => {
        const {id, type} = this.props;
        let params = {
            id
        }
        if(type === 'users') {
            deleteUserById(params).then(data => {
                message.success('删除成功');
                setTimeout(_ => {
                location.reload(true);
                }, 800);
             })
        }else if(type === 'labels') {
             deleteLabelById(params).then(data => {
                message.success('删除成功');
                setTimeout(_ => {
                location.reload(true);
                }, 800);
             })
        }else if(type === 'article') {
            deleteArticleById(params).then(data => {
                message.success('删除成功');
                setTimeout(_ => {
                location.reload(true);
                }, 800);
             })
        }else if(type === 'banner') {
            deleteBannerById(params).then(data => {
                message.success('删除成功');
                setTimeout(_ => {
                location.reload(true);
                }, 800);
             })
        }
    }
    
    render() {
        return (
            <Popconfirm visible={this.state.visible} 
                        placement="left" title='删除确认' 
                        onConfirm={this.onConfirmDelete} 
                        onCancel={this.onClickDelete}
                        okText="确定" 
                        cancelText="取消">
                <Button onClick={this.onClickDelete} type='danger' size='small'><Icon type="minus" /></Button>
            </Popconfirm>
        )
    }
}

export default AdminDelete;