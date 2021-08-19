export const getAssertionTemplate =
  (): string => `<saml:Assertion xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" Version="2.0" ID="" IssueInstant="">
  <saml:Issuer></saml:Issuer>
  <saml:Subject>
    <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified" />
    <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
      <saml:SubjectConfirmationData />
    </saml:SubjectConfirmation>
  </saml:Subject>
  <saml:Conditions />
  <saml:AuthnStatement AuthnInstant="">
    <saml:AuthnContext>
      <saml:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified</saml:AuthnContextClassRef>
    </saml:AuthnContext>
  </saml:AuthnStatement>
</saml:Assertion>`;

export const getResponseTemplate =
  (): string => `<samlp:Response xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" ID="" Version="2.0" IssueInstant="" Destination="">
    <saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"></saml:Issuer>
    <samlp:Status>
        <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success" />
    </samlp:Status>
    <ASSERTION_PLACEHOLDER/>
</samlp:Response>`;
