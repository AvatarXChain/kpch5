import { connect } from 'dva';
import { TabBar, Button, Modal } from 'antd-mobile';
import router from 'umi/router';
import Wechat from '../../../components/Wechat';
import InviteList from './InviteList';
import InviteModal from './InviteModal';
import styles from './less/Index.less';

const alert = Modal.alert;

const Invite = ({ dispatch, userInfo, inviteList, inviteImage }) => {

  const { code: userCode, data: userProfile } = userInfo;
  const { code: inviteListCode, pagination: invitePagination } = inviteList;

  let tokenTotal = '1032.323';
  let inviteCode = null;
  let inviteCount = 0;

  if (userCode === 1) {
    tokenTotal = userProfile.c_token_total;
    inviteCode = userProfile.invite_code;
  }

  if (inviteListCode === 1) {
    inviteCount = invitePagination.total_count;
  }

  // inviteImage = {
  //   code: 1,
  //   data: {
  //     url: 'http://ma-kpc-resource.oss-cn-beijing.aliyuncs.com/invite/invite-22.jpg'
  //   },
  //   message: 'success'
  // }

  const shareTimelineData = {
    title: `我在快拍链挖矿已经赚了${tokenTotal}个币了，你也快来一起挖矿吧！`,
    link: `https://kpc.markartisan.com?invite_id=${inviteCode}`,
    imgUrl: 'https://kpc.markartisan.com/apps/logo-v3.png',
    success: res => {
    },
    cancel: () => {}
  }

  const shareMessageData = {
    title: '我在快拍链挖矿已经赚了...',
    desc: `我在快拍链挖矿已经赚了${tokenTotal}个币了，你也快来一起挖矿吧！`,
    link: `https://kpc.markartisan.com?invite_id=${inviteCode}`,
    imgUrl: 'https://kpc.markartisan.com/apps/logo-v3.png',
    success: res => {
    },
    cancel: () => {}
  }

  return (
    <div className={styles['index-container']}>
      <Wechat timeline={shareTimelineData} message={shareMessageData}/>

      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title="挖矿"
          key="Life"
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
          />
          }
          onPress={() => {
          }}
          data-seed="logId"
        >
          <div>tab1</div>
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
            />
          }
          title="钱包"
          key="Koubei"
          onPress={() => {
          }}
          data-seed="logId1"
        >
          <div>tab2</div>
        </TabBar.Item>
      </TabBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.user;
  const { inviteList, inviteImage } = state.invite;

  return {
    userInfo,
    inviteList,
    inviteImage,
  };
}

export default connect(mapStateToProps)(Invite);
