import {RootModel} from "../../../app/es-demo/models/root-model";
import {RootModelAddedEvent} from "../../../app/es-demo/events/root-model-added-event";
import {RmCommandController} from "../command/rm-command-controller.service";
import {VerificationOutput} from "../../../app/es-demo/types/verification-output";
import {EsEvent} from "../../../app/es-demo/events/es-event.abstract";
import {ReturnWithVerification} from "../../../app/es-demo/types/return-with-verifcation";

export class RmQueryController {
  public static async processRawEventToRootModel(rawEvent: any, rootModel: RootModel): Promise<ReturnWithVerification<RootModel>> {
   return new Promise<ReturnWithVerification<RootModel>>( (resolve, reject) => {
     const processingResult = new VerificationOutput();
     let jsonEvent: EsEvent;
     try {
       jsonEvent = JSON.parse(rawEvent);
     } catch (e) {
       processingResult.passed = false;
       processingResult.failedMessage = 'Invalid JSON string';
     }

     if (jsonEvent) {
       const deserializationResult = RmCommandController.deserializeEvent(jsonEvent, null);
       if (deserializationResult.verificationResult.passed) {
         if (deserializationResult.output instanceof RootModelAddedEvent) {
           rootModel = deserializationResult.output.process();
         } else if (rootModel) {
           deserializationResult.output.rootModel = rootModel;
           deserializationResult.output.process();
         }
       } else {
         processingResult.passed = false;
         processingResult.failedMessage = `Unable to apply the raw event into the root model, ${rawEvent}.`
           + ` ${deserializationResult.verificationResult.failedMessage}`;
       }
     }

     resolve(new ReturnWithVerification(processingResult, rootModel));

   });
  }

}
