import { connect } from 'dva';
import router from 'umi/router';
import { Component } from 'react';
import {
  InputItem,
  Button,
  Toast,
  WhiteSpace
} from 'antd-mobile';
import { fetch } from '../../../services/sms';
import { validate } from '../../../utils/validate.js';
import styles from './UserLogin.less';
import defaultGravatar from '../../../assets/images/gravatar.png';

const mapStateToProps = state => {
  const { loginLoading } = state.auth;
  const { authUser } = state.wechat;
  const { smsCode, smsStatus } = state.sms;
  return {
    loginLoading,
    authUser,
    smsCode,
    smsStatus,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showLoading: () => {
      dispatch({
        type: 'index/updateLoginLoading',
        payload: true,
      })
    },
    loginWechat: values => {
      dispatch({
        type: 'auth/loginWechat',
        payload: values,
      });
    },
  };
}

class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      verifyCode: '',
      inviteCode: '',
      mobileInputDisabled: false,
      btnVerifyDisabled: true,
      btnLoginDisabled: true,
      verifyCodeText: '获取验证码',
      checkInterval: null,
    };
  }

  componentDidMount() {
  }

  submitHandler = () => {
    const { query } = router.location;
    const { mobile, verifyCode } = this.state;
    const inviteId = query && query.invite_id;
    const { code, data: wechatUser } = this.props.authUser;

    if (code === 1) {
      const { nickname, headimgurl, unionid } = wechatUser;

      this.props.loginWechat({
        mobile,
        verify_code: verifyCode,
        invite_code: inviteId,
        gravatar: headimgurl,
        unionid,
        nickname,
      });
    } else {
      Toast.fail();
      // Toast.fail('请在微信中打开页面');
    }
  };

  verifyHandler = async () => {
    const { mobile } = this.state;
    const { code } = await fetch({ mobile });
    if (code === 1) {
      this.setState({
        btnVerifyDisabled: true,
      })
      this._checkTiming(60);
    } else {
      Toast.fail('抱歉，获取验证码失败');
    }
  };

  updateBtnLoginStatus = () => {
    const { mobile, verifyCode } = this.state;
    if (validate.isMobileNumber(mobile) && validate.isRandCode(verifyCode)) {
      this.setState({
        btnLoginDisabled: false,
      });
    } else {
      this.setState({
        btnLoginDisabled: true,
      });
    }
  };

  render() {
    return (
      <div className={styles.formfiled}>
        { this._renderUserInfo() }

        <div className={styles['form-item']}>
          <InputItem
            placeholder="请输入手机号"
            clear
            type="phone"
            disabled={this.state.mobileInputDisabled}
            onChange={(mobile) => {
              const mobileFormat = mobile.replace(/(\s+)/g, '');
              this.setState({
                mobile: mobileFormat,
              });
              if (validate.isMobileNumber(mobileFormat)) {
                this.setState({
                  btnVerifyDisabled: false,
                });
              } else {
                this.setState({
                  btnVerifyDisabled: true,
                });
              }
              setTimeout(() => this.updateBtnLoginStatus(), 0);
            }}
          ></InputItem>
        </div>
        <div className={`${styles['form-item']} ${styles['item-verify']}`}>
          <InputItem
            placeholder="短信验证码"
            clear
            type="number"
            maxLength={6}
            onChange={(verifyCode) => {
              this.setState({
                verifyCode,
              });
              setTimeout(() => this.updateBtnLoginStatus(), 0);
            }}
          ></InputItem>
          <Button
            className={styles['btn-verify']}
            disabled={this.state.btnVerifyDisabled}
            onClick={this.verifyHandler}>{this.state.verifyCodeText}
          </Button>
        </div>
        <WhiteSpace size="xl"/>
        <Button
          loading={this.props.loginLoading}
          disabled={this.state.btnLoginDisabled}
          onClick={this.submitHandler}>立即加入
        </Button>
      </div>
    );
  }

  componentWillUnmount() {
    this._clearTiming();
  }

  _renderUserInfo() {
    const { code, data } = this.props.authUser;

    if (code === 1) {
      return (
        <div className={styles['user-info']}>
          <div className={styles['gravatar-wrapper']}>
            <div className={styles['gravatar-inner']}>
              <img className={styles.img} src={data.headimgurl} alt={data.nickname}/>
            </div>
          </div>
          <div className={styles['info-wrapper']}>{data.nickname}</div>
        </div>
      );
    }

    return (
      <div className={styles['user-info']}>
        <div className={styles['gravatar-wrapper']}>
          <div className={styles['gravatar-inner']}>
            <img className={styles.img} src={defaultGravatar} alt=""/>
          </div>
        </div>
      </div>
    );
  }

  _checkTiming = (checkSeconds = 60) => {
    const checkInterval = setInterval(_ => {
      let btnText = `${checkSeconds}s`;
      this.setState({
        btnVerifyDisabled: true,
      });

      checkSeconds -= 1;

      if (checkSeconds === 0) {
        btnText = '重新获取';
        this.setState({
          btnVerifyDisabled: false
        });
        // TODO 手机输入框disabled
        clearInterval(checkInterval);
      }
      this.setState({
        verifyCodeText: btnText
      });
    }, 1000, checkSeconds);

    this.setState({
      checkInterval,
    });
  }

  _clearTiming = () => {
    clearInterval(this.state.checkInterval);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
