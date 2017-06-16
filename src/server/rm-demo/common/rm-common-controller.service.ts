import {RmCommonRepository} from "./rm-common-repository.service";
import {Neo4jGlobals} from "../../../app/app.globals";
import {KeyValue} from "../../../app/es-demo/types/key-value";
import {RootModelAddedEvent} from "../../../app/es-demo/events/root-model-added-event";
import {RmCommandController} from "../command/rm-command-controller.service";
import {RootModel} from "../../../app/es-demo/models/root-model";
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
import {TransponderAddedEvent} from "../../../app/es-demo/events/transponder-added-event";
import {RootModelModifiedEvent} from "../../../app/es-demo/events/root-model-modified-event";
import {EsEvent} from "../../../app/es-demo/events/es-event.abstract";
import {RmCommandRepository} from "../command/rm-command-repository.service";
import {ReturnWithVerification} from "../../../app/es-demo/types/return-with-verifcation";
import {VerificationOutput} from "../../../app/es-demo/types/verification-output";

export class RmCommonController {
  static _testVar: RootModel;



}
