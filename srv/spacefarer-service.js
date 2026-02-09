const cds = require('@sap/cds');
const nodemailer = require('nodemailer');

module.exports = class SpacefarerService extends cds.ApplicationService {
    init() {
        const { Spacefarers } = this.entities;


        //Validate and enhance stardust collection and wormhole navigation skills.
        this.before('CREATE', Spacefarers, async (req) => {
            const { name, email, stardustCollection, wormholeNavigationSkill, originPlanet, spacesuitColor, department_ID, position_ID } = req.data;

            // Ensure all fields are provided
            const requiredFields = { name, email, stardustCollection, wormholeNavigationSkill, originPlanet, spacesuitColor, department_ID, position_ID };
            for (const [key, value] of Object.entries(requiredFields)) {
                if (value === undefined || value === null || value === '') {
                    return req.error(400, `${key.replace('_ID', '')} is required`, key);
                }
            }

            const { Departments, Positions } = this.entities;
            
            // Validate that department and position exist
            const [dept, pos] = await Promise.all([
                SELECT.one.from(Departments).where({ ID: department_ID }),
                SELECT.one.from(Positions).where({ ID: position_ID })
            ]);

            if (!dept) return req.error(404, `Department with ID ${department_ID} does not exist`);
            if (!pos) return req.error(404, `Position with ID ${position_ID} does not exist`);

            // Validation: Ensure wormhole navigation skill is between 1 and 10
            if (wormholeNavigationSkill < 1 || wormholeNavigationSkill > 10) {
                return req.error(400, `Wormhole navigation skill must be between 1 and 10. Received: ${wormholeNavigationSkill}`);
            }

            // Enhancement: Boost low stardust collection to minimum 50
            if (stardustCollection < 50) {
                req.data.stardustCollection += 50;
                console.log('Cosmic Enhancement: Stardust collection boosted by 50 units.');
            }
        });

        //Send notification email to the newly created spacefarer using Nodemailer.
        this.after('CREATE', Spacefarers, async (spacefarer, req) => {
            const { name, originPlanet, email } = spacefarer;
            const recipient = email || 'spacefarer@galaxy.com';

            try {
                // Create a test account for development and testing purposes
                let testAccount = await nodemailer.createTestAccount();

                // Create a transporter using the test account
                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: testAccount.user,
                        pass: testAccount.pass,
                    },
                });

                // Send the email
                let info = await transporter.sendMail({
                    from: '"Galactic Headquarters 🌌" <admin@spacefarer.com>',
                    to: recipient,
                    subject: "Welcome to the Stars, Spacefarer! ✨",
                    text: `Congratulations ${name}! Your adventurous journey from ${originPlanet} has officially begun. May your fuel cells be forever full!`,
                    html: `<b>Congratulations ${name}!</b><br>Your adventurous journey from <i>${originPlanet}</i> has officially begun. <br><br>🚀 <i>May your fuel cells be forever full!</i>`,
                });

                console.log("Message sent: ", info.messageId);
                // Preview URL only available when sending through an Ethereal account
                console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
            } catch (error) {
                console.error("Failed to send cosmic email:", error);
            }
        });

        return super.init();
    }
}
