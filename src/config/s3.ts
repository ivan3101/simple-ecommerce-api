const { AWS_KEY, AWS_SECRET, AWS_BUCKET_NAME, AWS_REGION } = process.env;

export default {
  clientOptions: {
    region: AWS_REGION,
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
  },
  serviceOptions: {
    defaultBucket: AWS_BUCKET_NAME,
  },
};
