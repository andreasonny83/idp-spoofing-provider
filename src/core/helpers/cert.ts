const startPlaceholder = '-----BEGIN CERTIFICATE-----';
const endPlaceholder = '-----END CERTIFICATE-----';

const _toString = (cert: string | Buffer): string => {
  if (Buffer.isBuffer(cert)) {
    return cert.toString();
  }
  return cert;
};

export const validateCert = (cert: string | Buffer): void => {
  const certificate = _toString(cert);

  if (!certificate.trim().startsWith(startPlaceholder)) {
    throw new Error(`Certificate must start with ${startPlaceholder}`);
  }

  if (!certificate.trim().endsWith(endPlaceholder)) {
    throw new Error(`Certificate must end with ${endPlaceholder}`);
  }
};

export const trimCert = (cert: string | Buffer): string => {
  const certificate = _toString(cert);

  return certificate
    .replace(/[\n\r]/g, '')
    .replace(startPlaceholder, '')
    .replace(endPlaceholder, '');
};
