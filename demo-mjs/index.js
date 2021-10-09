import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';

import { createResponse, sendResponse } from 'idp-spoofing-provider';

const toBase64 = (str) => Buffer.from(str).toString('base64');

const url = 'https://test-123.com/v1/saml2';
const redirectUrl = `https://test.com`;

const payload = createResponse({
  key: readFileSync(resolve(dirname('.'), 'key.pem')).toString(),
  cert: readFileSync(resolve(dirname('.'), 'cert.pem')).toString(),
  url,
  attributes: {
    test_user: 'test-user',
  },
  username: 'test-user',
});

console.warn(payload);

const data = new URLSearchParams();
data.append('SAMLResponse', toBase64(payload));
data.append('RelayState', toBase64(redirectUrl));

sendResponse(
  url,
  data.toString(),
  {
    maxRetry: 1,
    validateStatus: (status) => {
      console.log(`Response status: ${status}`);
      return status === 301;
    },
  },
  (response) => {
    console.log(`Response status: ${response}`);
  },
)
  .then((res) => {
    console.log(`Response: ${res.data}`);
  })
  .catch((err) => {
    console.warn('ERROR');
  });
