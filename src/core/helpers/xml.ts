import { readFileSync } from 'fs';
import { SignedXml } from 'xml-crypto';
import { SamlOptions } from '../../types';
import { DigestAlgorithmLocation, SignatureAlgorithmLocation } from './algorithms';

interface SignatureOptions {
  signatureLocationPath: string;
  idAttribute?: string;
}

const addCustomKeyImplementation = (xml: SignedXml, headerlessCertificate: string) => {
  xml.keyInfoProvider = {
    getKeyInfo(key, prefix) {
      prefix = prefix ? `${prefix}:` : prefix;
      return `<${prefix}X509Data><${prefix}X509Certificate>${headerlessCertificate}</${prefix}X509Certificate></${prefix}X509Data>`;
    },
    file: 'key.pem',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getKey(keyInfo) {
      return readFileSync(this.file);
    },
  };
};

export const signXML = (
  document: string,
  options: Required<SamlOptions> & {
    headerlessCert: string;
    signatureOpts: SignatureOptions;
  },
): string => {
  // Create an XML document
  const xml = new SignedXml(null, {
    signatureAlgorithm: SignatureAlgorithmLocation[options.signatureAlgorithm],
    idAttribute: options.signatureOpts.idAttribute || '',
  });

  // Sign XML with additional algorithms. This is done to avoid issues with enveloping
  xml.addReference(
    options.signatureOpts.signatureLocationPath,
    ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/2001/10/xml-exc-c14n#'],
    DigestAlgorithmLocation[options.digestAlgorithm],
  );

  // Add private key to XML
  xml.signingKey = options.key;

  if (!options.headerlessCert) {
    throw new Error('Headerless cert does not exist in SAML Options');
  }
  // Define a custom function on XML object to properly add X.509 certificate
  addCustomKeyImplementation(xml, options.headerlessCert);

  xml.computeSignature(document, {
    location: {
      reference: "//*[local-name(.)='Issuer']",
      action: 'after',
    },
    prefix: '',
  });

  return xml.getSignedXml();
};
