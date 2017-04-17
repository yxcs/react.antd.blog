import React from 'react';
import { Layout, Breadcrumb, Carousel, Icon, Pagination } from 'antd';
const { Content } = Layout;
import styles from '../less/styles.less';
import main_img from '../assets/2.jpg';
import MainItem from './MainItem';

import { getArticleList, getBannerByLimit, config } from '../apis/api';

class MyContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            banners:['http://pic.qiantucdn.com/58pic/26/37/41/88J58PICQAM_1024.jpg',
                     'http://pic.qiantucdn.com/58pic/26/37/33/58PIC0X58PICtmw_1024.jpg',
                     'http://pic.qiantucdn.com/58pic/26/37/34/16v58PICEGp_1024.jpg',
                     'http://pic.qiantucdn.com/58pic/26/37/34/49U58PICE5M_1024.jpg'],
            pagination: {}
        }
    }

    componentWillMount() {
        let params = {
            size: 10,
            page: 1
        }
        getArticleList(params).then(data => {
           this.setState({
               data: data.data.data,
               pagination: data.data.pagination
            });
       })

       params = {
        start:0,
        end:5
       }
       getBannerByLimit(params).then(data => {
           this.setState({
               banners: data.data
           })
       })
    }

    onChange = (e) => {
        console.log(e);
    };

    onPageChange = (page, pageSize) => {
        let params = {
            size: pageSize,
            page: page
        }
        getArticleList(params).then(data => {
           this.setState({
               data: data.data.data,
               pagination: data.data.pagination
            });
       })

    }
    

    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Main</Breadcrumb.Item>
                    <Breadcrumb.Item>Lists</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#ececec', padding: 24, minHeight: 800 }}>
                     <Carousel afterChange={this.onChange} className={styles.slick_slide}>
                        {
                            this.state.banners.map((v,i) => {
                                return <div key={i}><img src={`${config.baseUrl}:${config.port}/${config.uploads}/${v.img_src}`} width="852" height="160"/></div>
                            })
                        }   
                     </Carousel>

                    {
                        this.state.data.map(v => {
                            return <MainItem key={v.id} {...v}/>
                        })
                    }
                    <div style={{marginTop: '20px'}}></div>
                    <Pagination
                        current={this.state.pagination.page}
                        total={this.state.pagination.total}
                        showTotal={total => `Total ${total} items`}
                        pageSize={this.state.pagination.size}
                        onChange={this.onPageChange}
                    />
                </div>
            </div>
        )
    }
}

export default MyContent;
