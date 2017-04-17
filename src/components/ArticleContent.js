import React from 'react';
import { connect } from 'dva';
import marked from 'marked';
import hljs from 'highlight.js';
import moment from 'moment';
import { Layout, Menu, Breadcrumb, Icon, Card,message } from 'antd';
const { Header, Content, Footer } = Layout;
import styles from '../less/styles.less';
import 'highlight.js/styles/monokai-sublime.css';

import { getArticleById, config } from '../apis/api';

import img from '../assets/2.jpg';


class ArticleContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                content:'',
                title:'',
                user:'',
                label:'',
                comments: 0,
                see_number: 0,
                like_number: 0,
                created_at: '',
                update_at: '',
                img_src: '',
                type: ''
            }
    }

    componentWillMount() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: code => {
                return hljs.highlightAuto(code).value;
            }
        });

        let id = this.props.params.id;
        let params = {
           id
        }


       getArticleById(params).then(data => {
           if(data.status == 200) {

                this.setState({
                    content: data.data.body,
                    title: data.data.title,
                    user: data.data.user,
                    label: data.data.label,
                    comments: data.data.comments,
                    see_number: data.data.see_number,
                    like_number: data.data.like_number,
                    created_at: data.data.created_at,
                    update_at: data.data.update_at,
                    img_src: data.data.img_src,
                    type: data.data.type
                })
                
            }else {
                message.error('获取数据失败');
            }
        })

    }
  
    render() {

        return (
            <Card title={<h3 style={{textAlign: 'center'}}>{this.state.title}</h3>} style={{ width: 900,marginTop: 20 }}>
                <div className={styles.article_content}>
                    <p className={styles.details}>
                        <span><Icon type="user" />  {this.state.user}</span>
                        <span><Icon type="clock-circle-o" />  {moment(this.state.created_at).format('YYYY-MM-DD')}</span>
                        <span><Icon type="eye-o" />  {this.state.see_number}浏览</span>
                        <span><Icon type="message" />  {this.state.comments}评论</span>
                        <span><Icon type="heart-o" />  {this.state.like_number}喜欢</span>
                    </p>
                    <div style={{textAlign: 'center',paddingBottom:'20px'}}><img style={{width: '80%',height:'auto'}} src={`${config.baseUrl}:${config.port}/${config.uploads}/${this.state.img_src}`} /></div>
                    <div dangerouslySetInnerHTML={{__html: marked(this.state.content)}}></div>
                </div>
        </Card>
        )
    }
}

ArticleContent.propTypes = {
};

export default connect()(ArticleContent);