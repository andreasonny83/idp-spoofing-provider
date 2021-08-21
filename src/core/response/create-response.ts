import { DOMParser } from 'xmldom';
import { SamlOptions } from '../../types';
import { createAssertion } from '../assertion/create-assertion';
import { trimCert, validateCert } from '../helpers/cert';
import { appendResponseOptions } from '../helpers/dom';
import { signXML } from '../helpers/xml';
import { getResponseTemplate } from '../helpers/xmlTemplate';

export const createResponse = (samlOptions: SamlOptions): string => {
  validateCert(samlOptions.cert);

  const date = new Date();
  const options: Required<SamlOptions> = {
    digestAlgorithm: samlOptions.digestAlgorithm || 'sha512',
    signatureAlgorithm: samlOptions.signatureAlgorithm || 'rsa-sha512',
    issuer: samlOptions.issuer || 'urn:example:idp',
    ...samlOptions,
  };

  const headerlessCert = trimCert(samlOptions.cert);
  const assertion = createAssertion({ ...options, ...{ headerlessCert } }, date);
  const responseTemplate = getResponseTemplate();
  const document = new DOMParser().parseFromString(responseTemplate, 'text/xml');
  const responseDocument = appendResponseOptions(document, assertion, options, date);

  return signXML(responseDocument, {
    ...options,
    ...{
      headerlessCert,
      signatureOpts: {
        signatureLocationPath:
          "//*[local-name(.)='Response' and namespace-uri(.)='urn:oasis:names:tc:SAML:2.0:protocol']",
      },
    },
  });
};
