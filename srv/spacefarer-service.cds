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
    @restrict: [
        { grant: '*', to: 'admin' },
        { grant: '*', where: 'originPlanet = $user.originPlanet' }
    ]
    entity Spacefarers as projection on my.Spacefarer;

    @readonly
    entity Departments as projection on my.Departments;

    @readonly
    entity Positions as projection on my.Positions;
}
annotate SpacefarerService.Spacefarers with {
    name                    @title: 'Name';
    email                   @title: 'Email';
    stardustCollection      @title: 'Stardust Collection';
    wormholeNavigationSkill @title: 'Wormhole Navigation Skill';
    originPlanet            @title: 'Origin Planet' @Common.DefaultValue: 'Earth';
    spacesuitColor          @title: 'Spacesuit Color';
    department              @title: 'Department';
    position                @title: 'Position';
};

annotate SpacefarerService.Departments with {
    name        @title: 'Department Name';
    description @title: 'Description';
};

annotate SpacefarerService.Positions with {
    title       @title: 'Position Title';
    rank        @title: 'Rank';
};
