using { cuid, managed } from '@sap/cds/common';

namespace sap.cap.spacefarer;

entity Spacefarer : managed {
  key ID                       : UUID;
      name                     : String(100) not null;
      email                    : String(255) not null @assert.format: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
      stardustCollection       : Integer not null;
      wormholeNavigationSkill  : Integer not null;
      originPlanet             : String(50) not null;
      spacesuitColor           : String(20) not null;
      department               : Association to Departments not null;
      position                 : Association to Positions not null;
}

entity Departments : cuid {
      name         : String(100) not null;
      description  : String(500) not null;
      spacefarers  : Association to many Spacefarer on spacefarers.department = $self;
}

entity Positions : cuid {
      title       : String(100) not null;
      rank        : Integer not null @assert.range: [1, 10];
      spacefarers : Association to many Spacefarer on spacefarers.position = $self;
}
