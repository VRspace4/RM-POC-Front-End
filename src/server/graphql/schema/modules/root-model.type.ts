export const typeDef = `
  type RootModel {
    name: String
    id: String
    eventId: Int
    transponders: [Transponder]
    customers: [Customer]
    originators: [Originator]
  }
`;

