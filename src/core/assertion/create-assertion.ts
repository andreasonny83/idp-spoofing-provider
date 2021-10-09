import { DOMParser } from 'xmldom';
import { SamlOptions } from '../../types.js';
import { appendAssertionOptions } from '../helpers/dom.js';
import { signXML } from '../helpers/xml.js';
import { getAssertionTemplate } from '../helpers/xmlTemplate.js';

export const createAssertion = (options: Required<SamlOptions> & { headerlessCert: string }, date: Date): string => {
  const assertionTemplate = getAssertionTemplate();
  const document = new DOMParser().parseFromString(assertionTemplate, 'text/xml');
  const assertionDocument = appendAssertionOptions(document, options, date);

  return signXML(assertionDocument, {
    ...options,
    signatureOpts: { signatureLocationPath: "//*[local-name(.)='Assertion']", idAttribute: 'ID' },
    headerlessCert: options.headerlessCert,
  });
};
