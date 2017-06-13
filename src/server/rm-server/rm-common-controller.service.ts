import {RmCommonRepository} from "./rm-common-repository.service";
import {Neo4jGlobals} from "../../app/app.globals";
import {KeyValue} from "../../app/es-demo/models/key-value";
import {RootModelAddedEvent} from "../../app/es-demo/events/root-model-added-event";
import {RmCommandController} from "./command/rm-command-controller.service";
import {RootModel} from "../../app/es-demo/models/root-model";
import {AllocationRemovedEvent} from "../../app/es-demo/events/allocation-removed-event";
import {AllocationModifiedEvent} from "../../app/es-demo/events/allocation-modified-event";
import {AllocationAddedEvent} from "../../app/es-demo/events/allocation-added-event";
import {OriginatorRemovedEvent} from "../../app/es-demo/events/originator-removed-event";
import {OriginatorModifiedEvent} from "../../app/es-demo/events/originator-modified-event";
import {OriginatorAddedEvent} from "../../app/es-demo/events/originator-added-event";
import {CustomerRemovedEvent} from "../../app/es-demo/events/customer-removed-event";
import {CustomerModifiedEvent} from "../../app/es-demo/events/customer-modified-event";
import {CustomerAddedEvent} from "../../app/es-demo/events/customer-added-event";
import {TransponderRemovedEvent} from "../../app/es-demo/events/transponder-removed-event";
import {TransponderModifiedEvent} from "../../app/es-demo/events/transponder-modified-event";
import {TransponderAddedEvent} from "../../app/es-demo/events/transponder-added-event";
import {RootModelModifiedEvent} from "../../app/es-demo/events/root-model-modified-event";
import {EsEvent} from "../../app/es-demo/events/es-event.abstract";
import {RmCommandRepository} from "./command/rm-command-repository.service";

export class RmCommonController {
  static initializeMaterializedView() {
    // 1. Makes sure BranchAddedEvent exists
    RmCommandRepository.ensureNodeExist(Neo4jGlobals.requiredBranchNodeName)
      .then((result: any) => {
        if (result.records.length <= 0) {
          console.error(new Error('Fail to ensure there is at least one BranchAddedEvent node in neo4j database!'));
        }
      });
    // 2. Makes sure there's a production root model and is stored in the 'RM-Demo' Data node
    RmCommonRepository.getDataNode(Neo4jGlobals.rmDemoDataName).then((result: KeyValue<string>) => {
      const productionRootModelIdIndex: boolean =
        result.key.includes(Neo4jGlobals.productionRootModelName);
      if (productionRootModelIdIndex === false) {
        // (2) Doesn't exist, do the following:
        // 2a. Create a new RootModelAddedEvent
        const date = new Date();
        const currentDate: string = '(' + date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear() + ')';
        const rootModelAddedEvent = new RootModelAddedEvent(null, 'Production ' + currentDate);
        const transponderAddedEvent = new TransponderAddedEvent(null, 'Transponder ' + currentDate);
        // *** latest root model is already set from within this function
        RmCommandController.insertEvents([rootModelAddedEvent, transponderAddedEvent],
                                            null, function (rootModel: RootModel) {
          // 2b. Insert into database data node
          RmCommonRepository.setDataNode(Neo4jGlobals.rmDemoDataName,
            Neo4jGlobals.productionRootModelName, rootModel.id);
        });
      } else {
        // (2) Production Root Model ID exists; retrieve the production root model
        RmCommandRepository.getProductionEventChain().then((events: EsEvent[]) => {
          RmCommandController._rootModel = events[0].rootModel;
          events.forEach((event) => {
            event.process();
            // *** latest root model is formed here
          });
        }).catch((e) => {
          console.error(e);
        });
      }
    }).catch((e) => {
      console.error(e);
    });
  }

  static deserializeEvent(event: EsEvent, rootModel: RootModel): EsEvent {
    switch (event.name) {

      case 'RootModelAddedEvent':
        const rootModelAddedEvent = <RootModelAddedEvent>event;
        return new RootModelAddedEvent(rootModel, rootModelAddedEvent.rootModelName,
          rootModelAddedEvent.rootModelId, rootModelAddedEvent.transponders,
          rootModelAddedEvent.customers, rootModelAddedEvent.originators);

      case 'RootModelModifiedEvent':
        const rootModelModifiedEvent = <RootModelModifiedEvent>event;
        return new RootModelModifiedEvent(rootModel,
          rootModelModifiedEvent.keys, rootModelModifiedEvent.values);

      case 'TransponderAddedEvent':
        const transponderAddedEvent = <TransponderAddedEvent>event;
        return new TransponderAddedEvent(rootModel, transponderAddedEvent.transponderName,
          transponderAddedEvent.transponderId);

      case 'TransponderModifiedEvent':
        const transponderModifiedEvent = <TransponderModifiedEvent>event;
        return new TransponderModifiedEvent(rootModel, transponderModifiedEvent.transponderId,
          transponderModifiedEvent.keys, transponderModifiedEvent.values);

      case 'TransponderRemovedEvent':
        const transponderRemovedEvent = <TransponderRemovedEvent>event;
        return new TransponderRemovedEvent(rootModel, transponderRemovedEvent.transponderId);

      case 'CustomerAddedEvent':
        const customerAddedEvent = <CustomerAddedEvent>event;
        return new CustomerAddedEvent(rootModel, customerAddedEvent.customerName,
          customerAddedEvent.customerId);

      case 'CustomerModifiedEvent':
        const customerModifiedEvent = <CustomerModifiedEvent>event;
        return new CustomerModifiedEvent(rootModel, customerModifiedEvent.customerId,
          customerModifiedEvent.keys, customerModifiedEvent.values);

      case 'CustomerRemovedEvent':
        const customerRemovedEvent = <CustomerRemovedEvent>event;
        return new CustomerRemovedEvent(rootModel, customerRemovedEvent.customerId);

      case 'OriginatorAddedEvent':
        const originatorAddedEvent = <OriginatorAddedEvent>event;
        return new OriginatorAddedEvent(rootModel, originatorAddedEvent.originatorName,
          originatorAddedEvent.originatorId);

      case 'OriginatorModifiedEvent':
        const originatorModifiedEvent = <OriginatorModifiedEvent>event;
        return new OriginatorModifiedEvent(rootModel, originatorModifiedEvent.originatorId,
          originatorModifiedEvent.keys, originatorModifiedEvent.values);

      case 'OriginatorRemovedEvent':
        const originatorRemovedEvent = <OriginatorRemovedEvent>event;
        return new OriginatorRemovedEvent(rootModel, originatorRemovedEvent.originatorId);

      case 'AllocationAddedEvent':
        const allocationAddedEvent = <AllocationAddedEvent>event;
        return new AllocationAddedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.startFrequency,
          allocationAddedEvent.stopFrequency, allocationAddedEvent.powerUsage, allocationAddedEvent.customerId,
          allocationAddedEvent.originatorId, allocationAddedEvent.allocationName,
          allocationAddedEvent.allocationId);

      case 'AllocationModifiedEvent':
        const allocationModifiedEvent = <AllocationModifiedEvent>event;
        return new AllocationModifiedEvent(rootModel, allocationAddedEvent.transponderId, allocationAddedEvent.allocationId,
          allocationModifiedEvent.keys, allocationModifiedEvent.values);

      case 'AllocationRemovedEvent':
        const allocationRemovedEvent = <AllocationRemovedEvent>event;
        return new AllocationRemovedEvent(rootModel, allocationRemovedEvent.transponderId,
          allocationRemovedEvent.allocationId);

      default:
        throw new Error('The event named, [' + event.name + '], has no handler. ' +
          'Please report this error.');
    }
  }

}
