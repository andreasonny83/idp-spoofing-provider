import { DOMParser } from 'xmldom';
import { SamlOptions } from '../../types';
import { appendAssertionOptions } from '../helpers/dom';
import { signXML } from '../helpers/xml';
import { getAssertionTemplate } from '../helpers/xmlTemplate';

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
