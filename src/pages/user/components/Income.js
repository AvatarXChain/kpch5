import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
import router from 'umi/router';
import { Button, Modal } from 'antd-mobile';
import Wechat from '../../../components/Wechat';
import IncomeList from './IncomeList';

import styles from './less/Index.less';

// const alert = Modal.alert;

const Income = ({ dispatch, userCollectDaysList }) => {

  // inviteImage = {
  //   code: 1,
  //   data: {
  //     url: 'http://ma-kpc-resource.oss-cn-beijing.aliyuncs.com/invite/invite-22.jpg'
  //   },
  //   message: 'success'
  // }


  console.log(userCollectDaysList)

  return (
    <DocumentTitle title="拍照挖矿-人工智能网络生态">
      <div className={styles['index-container']}>
        <IncomeList incomeList={userCollectDaysList} />
      </div>
    </DocumentTitle>
  );
}

const mapStateToProps = (state) => {
  const { userCollectDaysList } = state.user;

  return {
    userCollectDaysList,
  };
}

export default connect(mapStateToProps)(Income);
