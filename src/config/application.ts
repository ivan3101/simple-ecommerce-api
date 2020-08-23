const { PORT, NODE_ENV } = process.env;

export default {
  environment: NODE_ENV || 'development',
  port: PORT || 3000,
};
