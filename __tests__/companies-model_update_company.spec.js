const db = require('../data/dbConfig');
const Reviews = require('../helpers/reviews-model');
const Company = require('../helpers/companies-model');

describe('Companies Model', () => {
  beforeEach(async () => {
    await db.raw('truncate table reviews restart identity cascade');
    await db.raw('truncate table companies restart identity cascade');
    await db.raw('truncate table users restart identity cascade');
  });
  describe('updateCompany()', () => {
    it('can add a an existing company', async () => {
      // POST new company
      const new_company = {
        company_name: 'Ignacio Test Company',
        state_id: 5,
        hq_city: 'San Francisco'
      };
      const new_company_2 = {
        company_name: 'Spencer Test Company',
        state_id: 5,
        hq_city: 'San Francisco'
      };
      const new_company_3 = {
        company_name: 'Matt Test Company',
        state_id: 5,
        hq_city: 'San Francisco'
      };
      const update_company = {
        company_name: 'Aaron Test Company',
        state_id: 5,
        hq_city: 'San Francisco'
      };

      // add the companies to the database
      await Company.addCompany(new_company);
      await Company.addCompany(new_company_2);
      await Company.addCompany(new_company_3);

      //update the company
      await Company.updateCompany(2, update_company);

      //access db
      const companies = await db('companies');
      // tests
      expect(companies).toHaveLength(3);
      expect(companies[2].company_name).toBe(update_company.company_name);
    });
  });
});
