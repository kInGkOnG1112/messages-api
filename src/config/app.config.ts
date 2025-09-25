import { minutes, seconds } from "@nestjs/throttler";

export default () => ({
  app: {
    host: process.env.APP_HOST || 'localhost',
    port: process.env.APP_PORT || 5000,
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'jwtaccesstokensecretkey',
      expiry: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || 3600, /* default to 1 hour */
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'jwtrefreshtokensecretkey',
      expiry: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || 1209600, /* default to 14 days */
    },
    throttler: {
      default: {
        ttl: seconds(1),
        limit: process.env.RATE_LIMIT_DEFAULT || 3
      },
      merchant: {
        ttl: seconds(1),
        limit: process.env.RATE_LIMIT_MERCHANT || 15
      },
      internal: {
        ttl: seconds(1),
        limit: process.env.RATE_LIMIT_INTERNAL || 15
      }
    }
  },
  queue: {
    host: process.env.QUEUE_SERVICE_HOST || 'localhost',
    port: process.env.QUEUE_SERVICE_PORT || 5020,
  },
  person: {
    host: process.env.PERSON_SERVICE_HOST || 'localhost',
    port: process.env.PERSON_SERVICE_PORT || 5001,
  },
  otp: {
    host: process.env.OTP_SERVICE_HOST || 'localhost',
    port: process.env.OTP_SERVICE_PORT || 5002,
  },
  user: {
    host: process.env.USER_SERVICE_HOST || 'localhost',
    port: process.env.USER_SERVICE_PORT || 5003,
  },
  merchant: {
    host: process.env.MERCHANT_SERVICE_HOST || 'localhost',
    port: process.env.MERCHANT_SERVICE_PORT || 5004,
  },
  helper: {
    host: process.env.HELPER_SERVICE_HOST || 'localhost',
    port: process.env.HELPER_SERVICE_PORT || 5005,
  },
  transaction: {
    host: process.env.TRANSACTION_SERVICE_HOST || 'localhost',
    port: process.env.TRANSACTION_SERVICE_PORT || 5006,
  },
  backOffice: {
    host: process.env.BACK_OFFICE_SERVICE_HOST || 'localhost',
    port: process.env.BACK_OFFICE_SERVICE_PORT || 5007,
  },
});
