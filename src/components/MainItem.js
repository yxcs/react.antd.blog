import React from 'react';
import { Link } from 'react-router';
import { Layout, Breadcrumb, Carousel, Icon } from 'antd';
import { config } from '../apis/api';
import marked from 'marked';
import moment from 'moment';
const { Content } = Layout;
import styles from '../less/styles.less';
import main_img from '../assets/2.jpg';

class MainItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        let {id, title, close_at, comments, created_at, img_src, label, like_number, see_number, update_at, user, body } = this.props;
        return (
            <div className={styles.main_list}>
                <div className={styles.main_title}><p><span>{label}</span><Link style={{color:'#000'}} to={`article/${id}`}>{title}</Link></p></div>

                <div className={styles.main_content}>
                    <div className={styles.main_img}><img src={`${config.baseUrl}:${config.port}/${config.uploads}/${img_src}`} /></div>
                    <div className={styles.main_text}><p dangerouslySetInnerHTML={{__html: marked(body.substr(0,220))}}></p></div>
                </div>

                <div className={styles.main_footer}>
                     <p>
                         <span className={styles.span_icon}><Icon type="user" />  {user}</span>
                         <span><Icon type="clock-circle-o" />  {moment(created_at).format('YYYY-MM-DD')}</span>
                         <span><Icon type="eye-o" />  {see_number}</span>
                         <span><Icon type="message" />  {comments}评论</span>
                         <span style={{color:'#f00'}}><Icon type="heart-o" />   {like_number}喜欢</span>
                    </p>
                </div>
            </div>
        )
    }
}

export default MainItem;
