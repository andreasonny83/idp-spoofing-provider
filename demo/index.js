const { readFileSync } = require('fs');
const path = require('path');

const { createResponse, sendResponse } = require('../lib');

const toBase64 = (str) => Buffer.from(str).toString('base64');

const url = 'https://test.com/v1/saml2';
const redirectUrl = `https://test.com`;

const payload = createResponse({
  key: readFileSync(path.resolve(__dirname, 'key.pem')).toString(),
  cert: readFileSync(path.resolve(__dirname, 'cert.pem')).toString(),
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
    maxRetry: 5,
    validateStatus: (status) => {
      console.log(`Response status: ${status}`);
      return status === 301;
    },
  },
  (response) => {
    console.log(`Response status: ${response}`);
  },
).then(res => {
  console.log(`Response: ${res.data}`);
})
