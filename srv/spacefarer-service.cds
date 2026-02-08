using { sap.cap.spacefarer as my } from '../db/schema';

@path: 'service/spacefarer'
service SpacefarerService @(requires: 'authenticated-user') {

    @odata.draft.enabled
    // Default sorting by stardustCollection
    @UI.PresentationVariant: {
        SortOrder: [
            {
                Property: 'stardustCollection',
                Descending: true
            }
        ],
        Visualizations: [
            '@UI.LineItem'
        ]
    }
    @restrict: [{
        grant: '*',
        where: 'originPlanet = $user.originPlanet'
    }]

    entity Spacefarers as projection on my.Spacefarer;

    @readonly
    entity Departments as projection on my.Departments;

    @readonly
    entity Positions as projection on my.Positions;
}