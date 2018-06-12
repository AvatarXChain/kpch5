import { connect } from 'dva';
const wx = require('weixin-js-sdk');

const Wechat = ({ jsConfig, timeline, message }) => {
  if (jsConfig.code === 1) {
    const { data: config } = jsConfig;

    wx.config({
      debug: false,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: config.jsApiList,
    });

    wx.ready(() => {
      wx.onMenuShareTimeline(timeline);
      wx.onMenuShareAppMessage(message);
    });
  }

  return null;
}

const mapStateToProps = (state) => {
  const { jsConfig } = state.wechat;

  return {
    jsConfig,
  };
}

export default connect(mapStateToProps)(Wechat);

