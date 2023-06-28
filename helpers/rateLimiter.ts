import { get, set } from 'lodash';
import { NextRequest } from 'next/server';

const rateLimiterState = {};

const rateLimiter = (request: NextRequest) => {
  const rateLimit = 60, seconds = 60;
  const headersList = request.headers;
  const splitForwardedFor = headersList.get('x-forwarded-for')?.split(",");
  const ip = splitForwardedFor![0];

  const now = Date.now();
  const windowStart = now - seconds * 1000;

  const requestTimestamps: (string | number)[] = get(rateLimiterState, ip, []).filter((timestamp) => timestamp > windowStart);
  requestTimestamps.push(now);

  set(rateLimiterState, ip, requestTimestamps);

  return requestTimestamps.length <= rateLimit;
};

export default rateLimiter;