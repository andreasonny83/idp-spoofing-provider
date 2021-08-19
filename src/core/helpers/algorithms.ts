// https://github.com/yaronn/xml-crypto#hashing-algorithms
export enum DigestAlgorithmLocation {
  'sha1' = 'http://www.w3.org/2001/04/xmlenc#sha1',
  'sha256' = 'http://www.w3.org/2001/04/xmlenc#sha256',
  'sha512' = 'http://www.w3.org/2001/04/xmlenc#sha512',
}

// https://github.com/yaronn/xml-crypto#signature-algorithms
export enum SignatureAlgorithmLocation {
  'rsa-sha1' = 'http://www.w3.org/2000/09/xmldsig#rsa-sha1',
  'rsa-sha256' = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
  'rsa-sha512' = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha512',
}

export type SignatureAlgorithm = keyof typeof SignatureAlgorithmLocation;
export type DigestAlgorithm = keyof typeof DigestAlgorithmLocation;

interface AlgorithmResponse {
  digest: DigestAlgorithm;
  signature: SignatureAlgorithm;
}

export const getAlgorithms = (name: DigestAlgorithm = 'sha512'): AlgorithmResponse => {
  switch (name) {
    case 'sha1':
      return {
        digest: name,
        signature: 'rsa-sha1',
      };
    case 'sha256':
      return {
        digest: name,
        signature: 'rsa-sha256',
      };
    case 'sha512':
    default:
      return {
        digest: name,
        signature: 'rsa-sha512',
      };
  }
};
