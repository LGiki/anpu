interface Pathname {
  pathname: string;
  traverseSubPathnames?: boolean;
}

interface LinksData {
  pathnames: Pathname[];
  locales: string[];
}

const baseUrl = Cypress.config().baseUrl || ''

describe('Broken Link', () => {
  it('Find broken links', () => {
    cy.fixture('links').then((linksData) => {
      const { pathnames, locales } = linksData;

      const checkBrokenLink = (url: string) => {
        if (url.startsWith(baseUrl)) {
          cy.request({ url, failOnStatusCode: false })
            .its('status')
            .should('eq', 200);
        }
      };

      const checkPageBrokenLinks = (targetPathname: string, traverseSubPathnames?: boolean) => {
        cy.get('main').first().find('a').each(($a) => {
          const url = $a.prop('href');
          checkBrokenLink(url);

          if (traverseSubPathnames && url.startsWith(targetPathname)) {
            cy.visit(url);
            cy.get('main').first().find('a').each(($subA) => {
              checkBrokenLink($subA.prop('href'));
            });
          }
        });
      };

      locales.forEach((locale: string) => {
        pathnames.forEach((pathname: Pathname) => {
          const targetPathname = `${locale}${pathname.pathname}`;
          cy.visit(targetPathname);
          checkPageBrokenLinks(targetPathname, pathname.traverseSubPathnames);
        });
      });
    });
  });
});