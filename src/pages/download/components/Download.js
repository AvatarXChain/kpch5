import { Component } from 'react';
import { Button } from 'antd-mobile';
import styles from './Download.less';

import help1 from '../../../assets/images/help-1.png';
import help2 from '../../../assets/images/help-2.png';
import help3 from '../../../assets/images/help-3.png';
import help4 from '../../../assets/images/help-4.png';

class Download extends Component {

  constructor(props) {
    super(props);
    this.state = {
      btnIOSText: '下载苹果版快拍',
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.download}>
        <div className={styles.page1}>
          <header className={styles.header}>
            <div className={styles.logo}></div>
            <h1 className={styles.title}>人工智能数据网络生态</h1>
          </header>
          <div className={styles.main}>
            <h1 className={styles['slogan-main']}>
              拍照就能<span className={styles.light}>赚钱</span>
            </h1>
            <p className={styles['slogan-sub']}>下载APP马上开始挖矿</p>
            <div className={styles.action}>
              <Button
                className={styles.btn}
                onClick={() => {
                  const downUrl = 'itms-services://?action=download-manifest&url=https://kpc.markartisan.com/apps/mainfest.plist';
                  window.location.href = downUrl;
                }}>
                <i className={`iconfont icon-ios ${styles['icon-action']}`}></i>
                {this.state.btnIOSText}
              </Button>
              <Button
                className={styles.btn}
                onClick={() => {
                  const downUrl = 'http://ma-kpc-resource.oss-cn-beijing.aliyuncs.com/apps/v3/kpc_v3.apk';
                  window.location.href = downUrl;
                }}>
                <i className={`iconfont icon-android ${styles['icon-action']}`}></i>
                下载安卓版快拍
              </Button>
              <p className={styles['ios-guide-info']}>
                苹果手机<span className={styles.light}>“未受信任的企业级开发者”</span>解决办法</p>
              <p className={styles['ios-guide-icon']}><i className={`iconfont icon-bottom ${styles['icon-action']}`}></i></p>
            </div>
          </div>
        </div>

        <div id="help" className={styles.help}>
          <ul className={styles['help-list-item']}>
            <li className={styles.item}>
              <em className={styles.number}>1</em>
              <p className={styles.info}>因苹果公司的政策调整，在iOS安装企业版应用时会出现以下提示：</p>
              <img className={styles.img} src={help1} alt=""/>
            </li>
            <li className={styles.item}>
              <em className={styles.number}>2</em>
              <p className={styles.info}>首次安装的用户，请前往<br/>
              <span className={styles.important}>[设置 > 通用 > 设备管理]</span></p>
              <img className={styles.img} src={help2} alt=""/>
            </li>
            <li className={styles.item}>
              <em className={styles.number}>3</em>
              <p className={styles.info}>
                选择<span className={styles.important}>KAPITAL, OOO</span><br/>
                点击<span className={styles.important}>信任</span>，然后回到桌面<br/>
                打开<span className={styles.important}>快拍，</span>开心挖矿😊
              </p>
              <img className={styles.img} src={help3} alt=""/>
              <img className={styles.img} src={help4} alt=""/>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Download;
