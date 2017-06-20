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
  static serverHostname = process.env.RM_HOSTNAME || 'http://localhost';
  static commandRestPort = process.env.RM_CMD_REST_PORT || 4500;
  static queryRestPort = process.env.RM_QUERY_REST_PORT || 4600;
  static graphQLPort = process.env.RM_GRAPHQL_PORT || 4000;
  static commandRestUri = `${GeneralGlobals.serverHostname}:${GeneralGlobals.commandRestPort}`;
  static graphQlUri = `${GeneralGlobals.serverHostname}:${GeneralGlobals.graphQLPort}`;
}

export class DsGlobals {
  static serverURI = process.env.RM_DEEPSTREAM_URI || 'rm:6020';
  static rootModelRecordName = 'rm-demo/rootModel';
  static eventRecordName = 'rm-demo/event';
}

export class KafkaGlobals {
  static uri = process.env.RM_KAFKA_URI || 'rm:2181';
  static topicName = Neo4jGlobals.rmDemoDataName.toLowerCase();
  static topicPartition = '0';
}
