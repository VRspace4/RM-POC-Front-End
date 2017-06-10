import * as appGlobal from '../app/app.globals';
import * as server from './server';
import * as http from 'http';
import fetch from 'node-fetch';
import {Response} from 'node-fetch';
import {EventRepository} from "./event-repository";
import {CustomerAddedEvent} from "../app/es-demo/events/customer-added-event";
import {Transponder} from "../app/es-demo/models/transponder";
import {AllocationAddedEvent} from "../app/es-demo/events/allocation-added-event";
import {Originator} from "../app/es-demo/models/originator";
import {EsEvent} from "../app/es-demo/events/es-event.abstract";
import {TransponderAddedEvent} from "../app/es-demo/events/transponder-added-event";
import {RootModel} from "../app/es-demo/models/root-model";

console.log('\n\n------======== (' + Date() + ') ========------\n');

/**
 *
 */
describe('EventRepository class', () => {
  let rootModel: RootModel;
  beforeEach(() => {
    rootModel = new RootModel('Testing');
    const transponder = new Transponder('Transponder 1');
    rootModel.addTransponder(transponder);
  });

  /**
   *
   */
  describe('serializeEvent() ', () => {
    it('should remove transponder from the event object', function() {
      const customer = new CustomerAddedEvent(rootModel, 'Intelsat', 'id123');
      const result: string = EventRepository.serializeEvent(customer);

      expect(result).not.toContain('transponder');
    });
  });
  /**
   *
   */
  describe('deserializeEvent()', () => {
    it('should convert JSON object into a specific EsEvent object', function() {
      const originator = new Originator('James Pham');
      const customerAddedEvent = new CustomerAddedEvent(null, 'Intelsat', 'id123');
      const allocationAddedEvent = new AllocationAddedEvent(null, rootModel.transponders[0].id,
        0, 10, 10, 'Customer1',
        originator.id, 'Allocation 1');

      // Simulating how deserializeEvent() is used from real code
      const events: EsEvent[] = [customerAddedEvent, allocationAddedEvent];
      const parentId = 123;

      const jsonString: any = JSON.parse(JSON.stringify({events, parentId}));

      const deserializedEvent: EsEvent =
        EventRepository.deserializeEvent(jsonString.events.shift(), rootModel);

      expect(deserializedEvent instanceof CustomerAddedEvent).toBeTruthy();
    });
  });

  // describe('createNewTransponderEvent', () => {
  //   it('should a create a new transponder event in neo4j then delete it', function(done: DoneFn) {
  //     const promise = new Promise(function(resolve, reject) {
  //       const newTransponderAddedEvent = new TransponderAddedEvent('Transponder 5');
  //       const cmdOutput: any = EventRepository.createNewTransponderEvent(newTransponderAddedEvent);
  //       resolve(cmdOutput);
  //     }).then((cmdOutput: any) => {
  //       console.log(EventRepository.getNodeIdFromCmdOutput(cmdOutput));
  //       done();
  //     });
  //   });
  // });

  // describe('getChainOfEvents()', () => {
  //   it('given an eventId, should return the chain of events', function() {
  //     EventRepository.getChainOfEvents(140)
  //       .then((response) => {
  //         console.log(response);
  //       });
  //   });
  // });
});

/**
 * Server endpoints
 */
describe('Server endpoints', () => {
  let serverInstance: http.Server;

  beforeEach(function (done: DoneFn) {
    serverInstance = server.run(done, false);
  });
  afterEach(function (done: DoneFn) {
    serverInstance.close(done);
  });

  /**
   * Test /hello
   */
  describe('/hello', () => {
    it('should return a static test text', function (done: DoneFn) {
      expect(function() {
        fetch(appGlobal.url + '/hello').then(function (response: Response) {
          return response.text();
        }).then(function (response: any) {
          expect(response).toEqual('It worked!');
          done();
        });
      }).not.toThrow();
    });
  });


});
