export const url = 'http://localhost';
export const serverPort = 4500;
export const graphqlPort = 4300;

export const neo4jRMDemoDataName = 'RM-Demo';
export const neo4jProductionRootModelName = 'productionRootModelId';

export class Neo4jGlobals {
  static rmDemoDataName = 'RM-Demo';
  static productionRootModelName = 'productionRootModelId';
  static requiredBranchNodeName = 'BranchAddedEvent';
}

export enum RmEventType {
  RootModelAddedEvent,
  RootModelModifiedEvent,
  RootModelRemovedEvent,
  TransponderAddedEvent,
  TransponderModifiedEvent,
  TransponderRemovedEvent,
  CustomerAddedEvent,
  CustomerModifiedEvent,
  CustomerRemovedEvent,
  OriginatorAddedEvent,
  OriginatorModifiedEvent,
  OriginatorRemovedEvent,
  AllocationAddedEvent,
  AllocationModifiedEvent,
  AllocationRemovedEvent
}

export class DsGlobals {
  static serverURI = 'localhost:6020';
}

