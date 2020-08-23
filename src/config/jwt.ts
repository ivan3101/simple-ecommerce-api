import { JwtModuleOptions } from '@nestjs/jwt';

const { JWT_SECRET } = process.env;

export default {
  secret: JWT_SECRET,
  signOptions: {
    expiresIn: '1d',
  },
} as JwtModuleOptions;
