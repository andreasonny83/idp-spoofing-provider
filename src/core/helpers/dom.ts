import { SamlOptions } from '../../types';
import { getExpirationDate } from './date';
import { generateRandomHexString, normalizeString } from './string';

export const appendAssertionOptions = (template: Document, options: Required<SamlOptions>, date: Date): string => {
  template.documentElement.setAttribute('ID', `_${generateRandomHexString()}`);

  const issuerElements = template.documentElement.getElementsByTagName('saml:Issuer');
  issuerElements[0].textContent = options.issuer;

  template.documentElement.setAttribute('IssueInstant', date.toJSON());

  const condition = template.documentElement.getElementsByTagName('saml:Conditions')[0];
  const confirmationData = template.documentElement.getElementsByTagName('saml:SubjectConfirmationData')[0];

  const expiredDate = getExpirationDate(date, 120000);
  const expiredDateString = expiredDate.toJSON();

  condition.setAttribute('NotBefore', date.toJSON());
  condition.setAttribute('NotOnOrAfter', expiredDateString);
  confirmationData.setAttribute('NotOnOrAfter', expiredDateString);

  const NAMESPACE = 'urn:oasis:names:tc:SAML:2.0:assertion';

  confirmationData.setAttribute('Recipient', options.url);

  const attributeStatement = template.createElementNS(NAMESPACE, 'saml:AttributeStatement');
  attributeStatement.setAttribute('xmlns:xs', 'http://www.w3.org/2001/XMLSchema');
  attributeStatement.setAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');

  template.documentElement.appendChild(attributeStatement);
  const attributeKeys = Object.keys(options.attributes);

  attributeKeys.forEach((key: string) => {
    const attributeElement = template.createElementNS(NAMESPACE, 'saml:Attribute');
    attributeElement.setAttribute('Name', key);

    const attributeValues = Array.isArray(options.attributes[key])
      ? (options.attributes[key] as Array<string>)
      : ([options.attributes[key]] as Array<string>);
    attributeValues.forEach((value: string) => {
      const valueElement = template.createElementNS(NAMESPACE, 'saml:AttributeValue');
      valueElement.textContent = value;
      attributeElement.appendChild(valueElement);
    });
    attributeStatement.appendChild(attributeElement);
  });

  const authnStatement = template.getElementsByTagName('saml:AuthnStatement')[0];
  authnStatement.setAttribute('AuthnInstant', date.toJSON());

  const nameID = template.getElementsByTagNameNS(NAMESPACE, 'NameID')[0];
  nameID.textContent = options.username;
  return normalizeString(template.toString());
};

export const appendResponseOptions = (
  template: Document,
  assertion: string,
  options: Required<SamlOptions>,
  date: Date,
): string => {
  template.documentElement.setAttribute('ID', `_${generateRandomHexString()}`);
  template.documentElement.setAttribute('Destination', options.url);
  template.documentElement.setAttribute('IssueInstant', date.toJSON());

  const parsedResponse = normalizeString(template.toString());

  return parsedResponse.replace('<ASSERTION_PLACEHOLDER/>', assertion);
};
