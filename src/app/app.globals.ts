export const serverPort = 4500;
export const graphqlPort = 4300;

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

export class GeneralGlobals {
  static serverHostname = 'rm';
  static serverPort = 4500;
  static graphQLPort = 4300;
}

export class DsGlobals {
  static serverURI = 'rm:6020';
}

export class KafkaGlobals {
  static topicName = Neo4jGlobals.rmDemoDataName.toLowerCase();
  static topicPartition = '0';
}
