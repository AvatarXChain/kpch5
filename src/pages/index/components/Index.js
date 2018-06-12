import { connect } from 'dva';
import Wechat from '../../../components/Wechat';
import LoginBefore from './LoginBefore';
import styles from './Index.less';

const Index = ({ authURL }) => {

  const shareTimelineData = {
    title: '我正在快拍链挖矿，已经赚了...',
    link: 'https://kpc.markartisan.com',
    imgUrl: 'https://kpc.markartisan.com/apps/logo.png',
    success: res => {
      console.log(res)
    },
    cancel: () => {}
  }

  const shareMessageData = {
    title: '我正在快拍链挖矿，已经赚了...',
    desc: '我在快拍链挖矿已经赚了好多币了，你也快来一起挖矿吧！',
    link: 'https://kpc.markartisan.com',
    imgUrl: 'https://kpc.markartisan.com/apps/logo.png',
    success: res => {
    },
    cancel: () => {}
  }


  // 获取微信信息
  if (authURL && authURL.code === 1) {
    window.location.href = authURL.data;
  }

  return (
    <div className={styles['index-container']}>
      <Wechat timeline={shareTimelineData} message={shareMessageData}/>
      <LoginBefore/>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { authURL } = state.wechat;

  return {
    authURL,
  };
}

export default connect(mapStateToProps)(Index);
