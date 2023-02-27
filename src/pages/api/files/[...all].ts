import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  timeout: 3000,
  target: `https://api.telegram.org/file/bot${String(process.env.TOKEN)}`,
  changeOrigin: true,
  pathRewrite: {
    '/api/files': '',
  },
});
