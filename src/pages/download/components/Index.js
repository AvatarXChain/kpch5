import Wechat from '../../../components/Wechat';
import Download from './Download';
import styles from './Index.less';

const Index = () => {

  const shareTimelineData = {
    title: `我正在快拍链挖矿，你也快来一起挖矿吧！`,
    link: 'https://kpc.markartisan.com/download',
    imgUrl: 'https://kpc.markartisan.com/apps/logo-v3.png',
    success: res => {
    },
    cancel: () => {}
  }

  const shareMessageData = {
    title: '我在快拍链挖矿已经赚了...',
    desc: `我在快拍链挖矿已经赚了，你也快来一起挖矿吧！`,
    link: 'https://kpc.markartisan.com/download',
    imgUrl: 'https://kpc.markartisan.com/apps/logo-v3.png',
    success: res => {
    },
    cancel: () => {}
  }

  return (
    <div className={styles['download-container']}>
      <Wechat timeline={shareTimelineData} message={shareMessageData}/>
      <Download />
    </div>
  );
}


export default Index;
