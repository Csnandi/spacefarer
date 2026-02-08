using { cuid, managed } from '@sap/cds/common';

namespace sap.cap.spacefarer;

entity Spacefarer : managed {
  key ID                       : UUID;
      name                     : String;
      email                    : String;
      stardustCollection       : Integer;
      wormholeNavigationSkill  : Integer;
      originPlanet             : String;
      spacesuitColor           : String;
      department               : Association to Departments;
      position                 : Association to Positions;
}

entity Departments : cuid {
      name         : String;
      description  : String;
      spacefarers  : Association to many Spacefarer on spacefarers.department = $self;
}

entity Positions : cuid {
      title       : String;
      rank        : Integer;
      spacefarers : Association to many Spacefarer on spacefarers.position = $self;
}
