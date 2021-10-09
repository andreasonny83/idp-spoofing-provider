import { toString } from './string.js';

const CRYPT_TYPES = {
  certificate: /-----BEGIN CERTIFICATE-----[^-]*-----END CERTIFICATE-----/,
  'RSA private key': /-----BEGIN RSA PRIVATE KEY-----\n[^-]*\n-----END RSA PRIVATE KEY-----/,
  'public key': /-----BEGIN PUBLIC KEY-----\n[^-]*\n-----END PUBLIC KEY-----/,
};

export const validateCert = (value: string | Buffer, type: keyof typeof CRYPT_TYPES = 'certificate'): void => {
  const certificate = toString(value);
  const result = CRYPT_TYPES[type] && CRYPT_TYPES[type].test(certificate);

  if (!result) {
    throw new Error(`Certificate must be provided in the following format ${CRYPT_TYPES[type]}`);
  }
};

export const trimCert = (cert: string | Buffer): string => {
  const certificate = toString(cert);

  return certificate
    .replace(/\r\n/g, '')
    .replace(/\n/g, '')
    .replace(/-----.+?-----|\n/g, '')
    .trim();
};
