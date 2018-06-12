export default {
  "proxy": {
    "/api": {
      "target": "http://api.markartisan.com/matu/v3",
      // "target": "http://127.0.0.1:7001/v3",
      "changeOrigin": true,
      "pathRewrite": {
        "^/api" : ""
      },
    }
  },
}