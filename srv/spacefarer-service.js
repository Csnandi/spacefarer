const cds = require('@sap/cds');

module.exports = class SpacefarerService extends cds.ApplicationService {
    init() {
        const { Spacefarers } = this.entities;

        /**
         * Task 3 - @Before event: Validate and enhance stardust collection and wormhole navigation skills.
         */
        this.before('CREATE', Spacefarers, async (req) => {
            const { stardustCollection, wormholeNavigationSkill } = req.data;

            // Validation: Ensure wormhole navigation skill is between 1 and 10
            if (wormholeNavigationSkill < 1 || wormholeNavigationSkill > 10) {
                return req.error(400, `Wormhole navigation skill must be between 1 and 10. Received: ${wormholeNavigationSkill}`);
            }

            // Enhancement: If stardust collection is missing, give them a starting boost of 100
            if (stardustCollection === undefined || stardustCollection === null) {
                req.data.stardustCollection = 100;
                console.log('✨ Cosmic Enhancement: Initial stardust collection set to 100.');
            } else if (stardustCollection < 50) {
                // Boost low stardust collection to minimum 50
                req.data.stardustCollection += 50;
                console.log('✨ Cosmic Enhancement: Stardust collection boosted by 50 units.');
            }
        });

        /**
         * Task 3 - @After event: Send a cosmic notification email to the newly created spacefarer.
         */
        this.after('CREATE', Spacefarers, async (spacefarer, req) => {
            const { name, originPlanet } = spacefarer;

            console.log(`🚀 Cosmic Launch Successful!`);
            console.log(`📧 SENDING EMAIL TO: ${name} from ${originPlanet}`);
            console.log(`Message: "Congratulations ${name}! Your adventurous journey among the stars has officially begun. May your fuel cells be forever full!"`);
        });

        return super.init();
    }
}
