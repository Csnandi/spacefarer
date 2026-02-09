const { describe, it, after } = require('node:test');
const cds = require('@sap/cds');

describe('Spacefarer Service Test', () => {
  // Initialize cds test environment
  const { GET, POST, expect, axios } = cds.test(__dirname + '/..');
  axios.defaults.auth = { username: 'Zorg', password: '123' };

  after(() => {
    cds.disconnect();
    process.exit(0);
  });

  it('serves Earth spacefarers', async () => {
    const { data } = await GET `/odata/v4/service/spacefarer/Spacefarers`;
    
    // Check we got results
    expect(data.value.length).to.be.greaterThan(0);
    
    // Check specific data
    expect(data.value).to.containSubset([
      { name: "Ellen Ripley", originPlanet: "Earth" }
    ]);
  });

  it('successfully creates a new spacefarer', async () => {
    const { status, data } = await POST(`/odata/v4/service/spacefarer/Spacefarers`, {
      name: "Han Solo",
      email: "han.solo@corellia.space",
      stardustCollection: 500,
      wormholeNavigationSkill: 9,
      originPlanet: "Earth",
      spacesuitColor: "Brown",
      department_ID: "b3d1f8a0-1234-4567-89ab-cdef01234567",
      position_ID: "a1b2c3d4-0004-4000-a000-000000000004"
    });
    // Check we got a successful response
    expect(status).to.equal(201);
    // Check the created spacefarer data
    expect(data.name).to.equal("Han Solo");
    expect(data.email).to.equal("han.solo@corellia.space");
    expect(data.department_ID).to.equal("b3d1f8a0-1234-4567-89ab-cdef01234567");
  });

});
