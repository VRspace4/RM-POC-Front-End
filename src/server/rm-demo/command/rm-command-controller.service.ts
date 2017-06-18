import {RootModel} from "../../../app/es-demo/models/root-model";
import {EventRepository} from "../../event-repository";
import {EsEvent} from "../../../app/es-demo/events/es-event.abstract";
import {RmCommandRepository} from "./rm-command-repository.service";
import {RmCommonController} from "../common/rm-common-controller.service";
import {RootModelAddedEvent} from "../../../app/es-demo/events/root-model-added-event";
import {Neo4jGlobals, RmEventType} from "../../../app/app.globals";
import {TransponderAddedEvent} from "../../../app/es-demo/events/transponder-added-event";
import {VerificationOutput} from "../../../app/es-demo/types/verification-output";
import {ReturnWithVerification} from "../../../app/es-demo/types/return-with-verifcation";
import {AllocationRemovedEvent} from "../../../app/es-demo/events/allocation-removed-event";
import {AllocationModifiedEvent} from "../../../app/es-demo/events/allocation-modified-event";
import {AllocationAddedEvent} from "../../../app/es-demo/events/allocation-added-event";
import {OriginatorRemovedEvent} from "../../../app/es-demo/events/originator-removed-event";
import {OriginatorModifiedEvent} from "../../../app/es-demo/events/originator-modified-event";
import {OriginatorAddedEvent} from "../../../app/es-demo/events/originator-added-event";
import {CustomerRemovedEvent} from "../../../app/es-demo/events/customer-removed-event";
import {CustomerModifiedEvent} from "../../../app/es-demo/events/customer-modified-event";
import {CustomerAddedEvent} from "../../../app/es-demo/events/customer-added-event";
import {TransponderRemovedEvent} from "../../../app/es-demo/events/transponder-removed-event";
import {TransponderModifiedEvent} from "../../../app/es-demo/events/transponder-modified-event";
import {RootModelModifiedEvent} from "../../../app/es-demo/events/root-model-modified-event";
import {ResponseMessage, ResponseMessageType} from "../../../app/es-demo/types/response-message";
import {MainVariables} from "../../../app/es-demo/types/main-variables";
import {RmMessageProducer} from "./rm-message-producer.service";
import {EventAndMsgOffset} from "../../../app/es-demo/types/event-and-msg-offset.type";
import {generateUUID} from "../../../app/app.helpers";
import {ReturnWithResponseMsg} from "../../../app/es-demo/types/return-with-response-message.type";

export class RmCommandController {
  private static _rootModel: RootModel;
  static _lastEvent: EsEvent;
  static _lastEventId: number;


  /**
   * Does the following verification:
   * 1. Makes sure the event name is valid
   * 2. Makes sure the keys of the events are valid and matches the type it claims to be
   * @param events
   * @returns {ResponseMessage}
   */
  public static verifyEventsToBeCommitted(mainVariables: MainVariables, events: EsEvent[]): ReturnWithVerification<ResponseMessage> {
    const deserializationResults: VerificationOutput[] = [];
    const outputResponse = new ResponseMessage();
    const outputVerification = new VerificationOutput();

    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
          const result = this.deserializeEvent(events[i], mainVariables.rootModel);
          if (result.verificationResult.passed === true) {
            result.verificationResult = result.output.verifyEvent();
          }
          deserializationResults.push(result.verificationResult);
      }
    } else {
      const result = new VerificationOutput(false, `Must pass at least one event!`);
      deserializationResults.push(result);
    }

    let allPassed = true;
    const failOutputString: string[] = [];
    for (let i = 0; i < deserializationResults.length; i++) {
      if (deserializationResults[i].passed === false) {
        allPassed = false;
        failOutputString.push(deserializationResults[i].failedMessage);
      }
    }
    if (allPassed) {
      const eventList: string[] = [];
      events.forEach((event: EsEvent) => {
        eventList.push(event.name);
      });
      outputVerification.passed = true;
      outputResponse.type = ResponseMessageType[ResponseMessageType.success];
      outputResponse.title = `Events committed`;
      outputResponse.message = `The event(s) (${eventList}) have been committed.`;
    } else {
      outputVerification.passed = false;
      outputVerification.failedMessage = 'See ResponseMessage object';
      outputResponse.type = ResponseMessageType[ResponseMessageType.error];
      outputResponse.title = `Failed to process`;
      outputResponse.message = `Failed to process the following event(s). ${failOutputString}`;
    }

    return new ReturnWithVerification(outputVerification, outputResponse);
  }

  public static deserializeEvent(event: EsEvent, rootModel: RootModel): ReturnWithVerification<EsEvent> {
    let result = new VerificationOutput();
    let convertedEvent: EsEvent;

    switch (event.name) {
      case 'RootModelAddedEvent':
        const rootModelAddedEvent = <RootModelAddedEvent>event;
        convertedEvent = new RootModelAddedEvent(rootModel, rootModelAddedEvent.rootModelName,
          rootModelAddedEvent.rootModelId, rootModelAddedEvent.transponders,
          rootModelAddedEvent.customers, rootModelAddedEvent.originators);
        break;

      case 'RootModelModifiedEvent':
        const rootModelModifiedEvent = <RootModelModifiedEvent>event;
        convertedEvent = new RootModelModifiedEvent(rootModel,
          rootModelModifiedEvent.keys, rootModelModifiedEvent.values);
        break;

      case 'TransponderAddedEvent':
        const transponderAddedEvent = <TransponderAddedEvent>event;
        convertedEvent = new TransponderAddedEvent(rootModel, transponderAddedEvent.transponderName,
          transponderAddedEvent.transponderId, transponderAddedEvent.powerLimit, transponderAddedEvent.bandwidth);
        break;

      case 'TransponderModifiedEvent':
        const transponderModifiedEvent = <TransponderModifiedEvent>event;
        convertedEvent = new TransponderModifiedEvent(rootModel, transponderModifiedEvent.transponderId,
          transponderModifiedEvent.keys, transponderModifiedEvent.values);
        break;

      case 'TransponderRemovedEvent':
        const transponderRemovedEvent = <TransponderRemovedEvent>event;
        convertedEvent = new TransponderRemovedEvent(rootModel, transponderRemovedEvent.transponderId);
        break;

      case 'CustomerAddedEvent':
        const customerAddedEvent = <CustomerAddedEvent>event;
        convertedEvent = new CustomerAddedEvent(rootModel, customerAddedEvent.customerName,
          customerAddedEvent.customerId);
        break;

      case 'CustomerModifiedEvent':
        const customerModifiedEvent = <CustomerModifiedEvent>event;
        convertedEvent = new CustomerModifiedEvent(rootModel, customerModifiedEvent.customerId,
          customerModifiedEvent.keys, customerModifiedEvent.values);
        break;

      case 'CustomerRemovedEvent':
        convertedEvent = <CustomerRemovedEvent>event;
        break;

      case 'OriginatorAddedEvent':
        const originatorAddedEvent = <OriginatorAddedEvent>event;
        convertedEvent = new OriginatorAddedEvent(rootModel, originatorAddedEvent.originatorName,
          originatorAddedEvent.originatorId);
        break;

      case 'OriginatorModifiedEvent':
        const originatorModifiedEvent = <OriginatorModifiedEvent>event;
        convertedEvent = new OriginatorModifiedEvent(rootModel, originatorModifiedEvent.originatorId,
          originatorModifiedEvent.keys, originatorModifiedEvent.values);
        break;

      case 'OriginatorRemovedEvent':
        const originatorRemovedEvent = <OriginatorRemovedEvent>event;
        convertedEvent = new OriginatorRemovedEvent(rootModel, originatorRemovedEvent.originatorId);
        break;

      case 'AllocationAddedEvent':
        const allocationAddedEvent = <AllocationAddedEvent>event;
        convertedEvent = new AllocationAddedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.startFrequency,
          allocationAddedEvent.stopFrequency, allocationAddedEvent.powerUsage, allocationAddedEvent.customerId,
          allocationAddedEvent.originatorId, allocationAddedEvent.allocationName, allocationAddedEvent.allocationId);
        break;

      case 'AllocationModifiedEvent':
        const allocationModifiedEvent = <AllocationModifiedEvent>event;
        convertedEvent = new AllocationModifiedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.allocationId,
          allocationModifiedEvent.keys, allocationModifiedEvent.values);
        break;

      case 'AllocationRemovedEvent':
        const allocationRemovedEvent = <AllocationRemovedEvent>event;
        convertedEvent = new AllocationRemovedEvent(rootModel, allocationRemovedEvent.transponderId,
          allocationRemovedEvent.allocationId);
        break;

      default:
        result.passed = false;
        result.failedMessage = 'The event is invalid - [' + JSON.stringify(event) + ']!';
    }

    if (result.passed === true) {
      result = RmCommandController.verifyEventKeyNames(event, convertedEvent);
    }

    const output = new ReturnWithVerification(result, convertedEvent);

    return output;

  }


  static verifyEventKeyNames(eventObject: any, eventActual: EsEvent): VerificationOutput {
    const result = new VerificationOutput();

    for (const keyName in eventObject) {
      if (eventActual.hasOwnProperty(keyName) === false) {
        result.passed = false;
        result.failedMessage = `The key, ${keyName}, from the event is invalid!`;
        break;
      }
    }

    return result;
  }

  /**
   * 1. Attempt to retrieve the latest instance of root model from message broker
   * 2. If no instance, then produce the proper events to start the root model
   *    and create a new transponder. Then process the events to return the root model
   * 3. If an instance exist, process the event and return the root model
   */
  public static async start(mainVariables: MainVariables): Promise<RootModel> {
    return new Promise<RootModel>(async function(resolve, reject) {
      // Get all events and its offset number from message broker
      const eventChainAndOffset = await RmMessageProducer.fetchEventsFromOffset(39);
      // console.log(eventChainAndOffset);
      // const eventChainAndOffset = null;
      RmMessageProducer.createClient();
      await RmMessageProducer.startProducerClient();
      // Look for the latest instance of RootModelAddedEvent in reverse order
      let rootModelEventIndex: number = -1;
      let rootModelEventOffset: number = -1;
      for (let i = eventChainAndOffset.length - 1; i >= 0; i--) {
        if (eventChainAndOffset[i].event.name === RmEventType[RmEventType.RootModelAddedEvent]) {
          rootModelEventIndex = i;
          rootModelEventOffset = eventChainAndOffset[i].msgOffset;
          break;
        }
      }

      // Generate the starting sequence of events to create a new root model
      if (rootModelEventIndex === -1) {
        const rootModelAddedEvent = new RootModelAddedEvent(mainVariables.rootModel, 'Production');
        const transponderAddedEvent = new TransponderAddedEvent(null, 'Transponder 1');
        const customerAddedEvent = new CustomerAddedEvent(null, 'Intelsat');
        const originatorAddedEvent = new OriginatorAddedEvent(null, 'James Pham');

        RmMessageProducer.commitEvents([rootModelAddedEvent, transponderAddedEvent, customerAddedEvent, originatorAddedEvent])
          .then((result: ReturnWithResponseMsg<number>) => {
            console.log('Committed the following events to the message broker: ');
            console.log(result);
          });
      } else {
        const eventsToBeProcessed: EsEvent[] = [];
        for (let i = rootModelEventIndex; i < eventChainAndOffset.length; i++) {
          const result =  RmCommandController.deserializeEvent(eventChainAndOffset[i].event, mainVariables.rootModel);
          if (result.verificationResult.passed) {
            eventsToBeProcessed.push(result.output);
          } else {
            RmMessageProducer.stopProducer();
            reject(result.verificationResult.failedMessage);
            return null;
          }
        }

        mainVariables.rootModel = RmCommandController.processEventsToRootModel(eventsToBeProcessed);
        resolve(mainVariables.rootModel);
      }

    });
  }



  /**
   * Prepares the graph database and create a production event path if
   * it doesn't already exist. Then return the latest root model.
   * @returns {Promise<EsEvent[]>} the array of events from the production path
   */
  static async initializeTemp(): Promise<RootModel> {
    let rootModel: RootModel;

    // 1. Makes sure BranchAddedEvent exists
    const nodeRecord = await RmCommandRepository.ensureNodeExist(Neo4jGlobals.requiredBranchNodeName);

    if (nodeRecord.records.length <= 0) {
      console.error(new Error('Fail to ensure there is at least one BranchAddedEvent node in neo4j database!'));
    }

    // 2. Makes sure there's a production root model and is stored in the 'RM-Demo' Data node
    const dataKeyValue = await RmCommandRepository.getDataNode(Neo4jGlobals.rmDemoDataName);
    const productionRootModelIdIndex: boolean =
      dataKeyValue.key.includes(Neo4jGlobals.productionRootModelName);

    if (productionRootModelIdIndex === false) {
      // (2) Doesn't exist, do the following:
      // 2a. Create a new RootModelAddedEvent
      const date = new Date();
      const currentDate: string = '(' + date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear() + ')';
      const rootModelAddedEvent = new RootModelAddedEvent(null, 'Production ' + currentDate);
      const transponderAddedEvent = new TransponderAddedEvent(null, 'Transponder ' + currentDate);
      // *** latest root model is already set from within this function
      RmCommandController.insertEvents([rootModelAddedEvent, transponderAddedEvent],
        null, function (rootModelOutput: RootModel) {
          rootModel = rootModelOutput;
          // 2b. Insert into database data node
          RmCommandRepository.setDataNode(Neo4jGlobals.rmDemoDataName,
            Neo4jGlobals.productionRootModelName, rootModel.id);
        });
    } else {
      // (2) Production Root Model ID exists; retrieve the production root model
      const productionEventChain = await RmCommandRepository.getProductionEventChain();
      rootModel = this.processEventsToRootModel(productionEventChain);
    }

    return rootModel;
  }

  public static processEventsToRootModel(eventChain: EsEvent[]): RootModel {
    let rootModel: RootModel = null;

    eventChain.forEach((event) => {
      try {
        if (event instanceof RootModelAddedEvent) {
          rootModel = event.process();
        } else {
          event.rootModel = rootModel;
          event.process();
        }
      } catch (e) {
        console.error(`The event, ${event.name}, was unable to process! \n ${e}`);
      }
    });

    return rootModel;
  }



  /**
   * First make sure the event processing of the root model is valid.
   * Then insert the event, either new root model event or any other, and then returns
   * the root model object through a callback
   * @param eventObjects
   * @param parentId
   * @param resultCallback
   */
  static insertEvents(eventObjects: EsEvent [], parentId: number,
                      resultCallback: (rootModel: RootModel) => void) {
    if (eventObjects.length > 0) {
      const result = this.deserializeEvent(eventObjects.shift(), null);
      this._lastEvent = result.output;

      // Commit that event into the database
      this.processEvent(this._lastEvent, parentId)
        .then((eventId: number) => {
          // Commit successfully finished
          this._lastEventId = eventId;

          // Take the rootModel only if from RootModelAddedEvent, otherwise
          // apply the rootModel to the event.
          if (this._lastEvent instanceof RootModelAddedEvent) {
            this._rootModel = this._lastEvent.rootModel;
          } else {
            this._lastEvent.rootModel = this._rootModel;
          }
          this._lastEvent.process();

          // Continue to the next event
          this.insertEvents(eventObjects, eventId, resultCallback);
        });
    } else {
      resultCallback(this._rootModel);
    }
  }

  static processEvent(event: EsEvent, parentId: number): Promise<number> {
    let promise: Promise<number>;
    if (parentId) {
      promise = RmCommandRepository.appendToEventChain(event, parentId);
    } else {
      promise = RmCommandRepository.createNewRootModelEvent(<RootModelAddedEvent>event);
    }

    return new Promise((resolve, reject) => {
      promise.then((result: any) => {
        const eventId = result.records[0].get(0).identity.low;
        resolve(eventId);
      });
    });
  }

  static getRootModelFromEventId(eventId: number): Promise<RootModel> {
    return new Promise((resolve, reject) => {
      RmCommandRepository.getChainOfEvents(eventId).then((events: EsEvent[]) => {
        events.forEach((event: EsEvent) =>
          event.process());

        // apply this root model to the class level root model
        const rootModel: RootModel = events[0].rootModel;

        rootModel.eventId = eventId;
        resolve(rootModel);
      });
    });
  }


}
