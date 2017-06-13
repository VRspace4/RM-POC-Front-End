import {Transponder} from "./models/transponder";
import {CustomerModifiedEvent} from "./events/customer-modified-event";
import {CustomerAddedEvent} from "./events/customer-added-event";
import {Customer} from "./models/customer";
import {TransponderAddedEvent} from "./events/transponder-added-event";
import {TransponderModifiedEvent} from "./events/transponder-modified-event";
import {AllocationAddedEvent} from "./events/allocation-added-event";
import {Originator} from "./models/originator";
import {Allocation} from "./models/allocation";
import {TransponderService} from "./services/transponder.service";
import {RootModel} from "./models/root-model";
import {VerificationOutput} from "./models/verification-output";

describe('es-demo-models-events-services', () => {
  let rootModel: RootModel;

  beforeEach(() => {
    const transponder = new Transponder('Transponder 1');
    rootModel = new RootModel('Production');
    rootModel.addTransponder(transponder);
  });


  describe('Es-demo services', () => {

  });
});
