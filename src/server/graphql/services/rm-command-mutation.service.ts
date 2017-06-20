import {GeneralGlobals} from "../../../app/app.globals";
import fetch from 'node-fetch';
import {ResponseMessage} from "../../../app/es-demo/types/response-message";
import {RmCommandMutation} from "../../../app/rm-demo/services/rm-command-mutation-library.service";

const controllerEventsUri = `${GeneralGlobals.commandRestUri}/events`;

export const sendHello = (name: string) => {
  return fetch(controllerEventsUri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name})
  }).then(function (response) {
    return response.text();
  }).then(function (object) {
    return object;
  });
};

export const addCustomer = (name: string) => {
  return RmCommandMutation.addCustomer(name)
    .then(function (object: ResponseMessage) {
      return object;
    });
};

export const removeCustomer = (id: string) => {
  return RmCommandMutation.removeCustomer(id)
    .then(function (object: ResponseMessage) {
      return object;
    });
};

export const addTransponder = (name: string, powerLimit: number,
                               bandwidth: number) => {
  return RmCommandMutation.addTransponder(name, powerLimit, bandwidth)
    .then(function (object: ResponseMessage) {
      return object;
    });
};

export const removeTransponder = (id: string) => {
  return RmCommandMutation.removeTransponder(id)
    .then(function (object: ResponseMessage) {
      return object;
    });
};

export const addAllocation = (allocationName: string, startFrequency: number,
                              stopFrequency: number, powerUsage: number, transponderId: string,
                              customerId: string, originatorId: string) => {
  return RmCommandMutation.addAllocation(allocationName, startFrequency,
    stopFrequency, powerUsage, transponderId,
    customerId, originatorId)
    .then(function (object: ResponseMessage) {
      return object;
    });
};

export const removeAllocation = (transponderId: string, allocationId: string) => {
  return RmCommandMutation.removeAllocation(transponderId, allocationId)
    .then(function (object: ResponseMessage) {
      return object;
    });
};

export const resetRootModel = (name: string) => {
  return RmCommandMutation.resetRootModel(name)
    .then(function (object: ResponseMessage) {
      return object;
    });
};


export const addOriginator = (name: string) => {
  return RmCommandMutation.addOriginator(name)
    .then(function (object: ResponseMessage) {
      return object;
    });
};

export const removeOriginator = (id: string) => {
  return RmCommandMutation.removeOriginator(id)
    .then(function (object: ResponseMessage) {
      return object;
    });
};
