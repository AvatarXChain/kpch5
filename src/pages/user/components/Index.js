import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
// import { PullToRefresh, Button, Modal } from 'antd-mobile';
import Wechat from '../../../components/Wechat';
import Header from './Header';
import Footer from './Footer';
// import InviteList from './InviteList';

import styles from './less/Index.less';

// const alert = Modal.alert;

const Index = ({ dispatch, userInfo, uploadToken, inviteList, inviteImage, tokenCountAll }) => {

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

  // const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJhZG1pbiIsImlkIjoyMn0sImV4cCI6MTUzMDk3MjM4MiwiaWF0IjoxNTI4MzgwMzgyfQ.A1PpmVwMxl3cjbtpTMloU_HvHRhWyICgtT1UKBibH7w';
  // localStorage.setItem('kpc_access_token', accessToken);

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
    <DocumentTitle title="拍照挖矿-人工智能网络生态">
      <div className={styles['index-container']}>
        <Wechat
          timeline={shareTimelineData}
          message={shareMessageData}
        />
        <Header tokenCountAll={tokenCountAll} userInfo={userInfo} />
        <Footer uploadToken={uploadToken} inviteImage={inviteImage} />
      </div>
    </DocumentTitle>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.user;
  const { inviteList, inviteImage } = state.invite;
  const { tokenCountAll } = state.token;
  const { uploadToken } = state.oss;

  return {
    userInfo,
    uploadToken,
    inviteList,
    inviteImage,
    tokenCountAll,
  };
}

export default connect(mapStateToProps)(Index);
