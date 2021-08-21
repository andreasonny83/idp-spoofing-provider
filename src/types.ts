export interface SamlOptions {
  cert: string | Buffer;
  key: string | Buffer;
  url: string;
  signatureAlgorithm?: 'rsa-sha512';
  digestAlgorithm?: 'sha512';
  issuer?: string;
  attributes: Record<string, unknown>;
  username: string;
}

export interface SamlResponse {
  url: string;
  jwt: string;
}
