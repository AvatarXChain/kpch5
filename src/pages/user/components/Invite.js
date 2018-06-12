import { connect } from 'dva';
import { Button, Modal } from 'antd-mobile';
import router from 'umi/router';
import Wechat from '../../../components/Wechat';
import InviteList from './InviteList';
import InviteModal from './InviteModal';
import styles from './less/Invite.less';

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
    <div className={styles['invite-container']}>
      <Wechat timeline={shareTimelineData} message={shareMessageData}/>
      <div className={styles.header}>
        <div className={styles.count}>
          <div className={styles.item}>
            <p className={styles.info}>您已成功邀请 (人)</p>
            <h3 className={styles.number}>
              { inviteCount }
            </h3>
          </div>
          <div className={styles.item}>
            <p className={styles.info}>已赚奖励 (POC)</p>
            <h3 className={styles.number}>
              { inviteCount * 50 }
            </h3>
          </div>
        </div>
        <InviteList inviteList={inviteList}/>

        <div className={styles['list-item']}>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.photo}>
          <div className={styles.signout}>
            <Button
              onClick={() =>
                alert('退出账号', '确定要退出吗?', [
                  { text: '取消' },
                  { text: '确定', onPress: () => {
                    dispatch({ type: 'auth/signout' });
                  } },
                ])
              }>
              <i className={`iconfont icon-signout ${styles['icon-signout']}`}></i>
            </Button>
          </div>
          <div className={styles['photo-wrapper']}>
            <div className={styles['photo-inner']}>
              <Button
                className={styles['photo-btn']}
                activeClassName={styles['photo-btn-active']}
                onClick={() => {
                  router.push('/download');
                }}>
                <i className={`iconfont icon-paizhao ${styles.icon}`}></i>
                开始挖矿
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.action}>
          <InviteModal record={{}} inviteImage={inviteImage}>
            <Button>
              <i className={`iconfont icon-share ${styles['icon-action']}`}></i>
              邀请好友一起挖
            </Button>
          </InviteModal>
        </div>
      </div>
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
