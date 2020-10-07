import React, {Component} from 'react';
import loginBanner from './login_banner.png';
import logo from './logo.png';
import circle from './circle.png';
import folder from './folder.png';
import folder_grey from './folder_grey.png';
import text from './text.png';
import info from './info.png';
import star from './star.png';
import bar from './bar.png';
import yzl_logo from '@/assets/images/yzl_logo.png';
import style from './style.less';

export default class Banner extends Component {
    render() {
        return (
            <div className={style.root}>
                <div className={style.logo}>
                    <img alt="logo" src={yzl_logo} width={120} />
                    <i>多方参与、共同维护的可靠房源信息链</i>
                </div>
                <div className={style.banner}>
                    <div className={style.banner_image_container}>
                        <img src={loginBanner} alt="宣传图" />
                        <div className={style.star}>
                            <img alt="star" src={star}/>
                        </div>
                        <div className={style.star2}>
                            <img alt="star" src={star}/>
                        </div>
                        <div className={style.text}>
                            <img alt="text" src={text}/>
                        </div>

                        <div className={style.folder_grey}>
                            <img alt="folder_grey" src={folder_grey}/>
                        </div>
                        <div className={style.folder2}>
                            <img alt="folder" src={folder}/>
                        </div>
                        <div className={style.folder}>
                            <img alt="folder" src={folder}/>
                        </div>
                        <div className={style.info}>
                            <img alt="info" src={info}/>
                        </div>
                        <div className={style.circle_b}>
                            <img alt="circle" src={circle}/>
                        </div>
                        <div className={style.circle2}>
                            <img alt="circle" src={circle}/>
                        </div>
                        <div className={style.circle}>
                            <img alt="circle" src={circle}/>
                        </div>
                        <div className={style.bar_z}>
                            <img alt="bar" src={bar}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
