using SpacefarerService as service from '../../srv/spacefarer-service';
annotate service.Spacefarers with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Email',
                Value : email,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Stardust Collection',
                Value : stardustCollection,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Wormhole Navigation Skill',
                Value : wormholeNavigationSkill,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Origin Planet',
                Value : originPlanet,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Spacesuit Color',
                Value : spacesuitColor,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department',
                Value : department_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Position',
                Value : position_ID,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Value : email,
        },
        {
            $Type : 'UI.DataField',
            Value : stardustCollection,
        },
        {
            $Type : 'UI.DataField',
            Value : spacesuitColor,
        },
    ],
    UI.HeaderInfo : {
        TypeName : 'Cosmic Object Page',
        TypeNamePlural : '',
    },
);

annotate service.Spacefarers with {
    department @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Departments',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : department_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'description',
            },
        ],
    } @Common.ValueListWithFixedValues : true
      @Common.Text : department.name
      @Common.TextArrangement : #TextOnly;
};

annotate service.Spacefarers with {
    position @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Positions',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : position_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'title',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'rank',
            },
        ],
    } @Common.ValueListWithFixedValues : true
      @Common.Text : position.title
      @Common.TextArrangement : #TextOnly;
};

annotate service.Departments with {
    ID @UI.Hidden;
};

annotate service.Positions with {
    ID @UI.Hidden;
};

