import {GeneralGlobals} from "../../../app/app.globals";
import fetch from 'node-fetch';
import {ResponseMessage} from "../../../app/es-demo/types/response-message";

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
  const bodyString = {
    events: [
      {
        name: 'CustomerAddedEvent',
        customerName: name
      }]
    };
  return fetch(controllerEventsUri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyString)
  }).then(function (response) {
    return response.json();
  }).then(function (object) {
    return object;
  });
};

export const removeCustomer = (id: string) => {
  const bodyString = {
    events: [
      {
        name: 'CustomerRemovedEvent',
        customerId: id
      }
    ]
  };
  return fetch(controllerEventsUri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyString)
  }).then(function (response) {
    return response.json();
  }).then(function (object) {
    return object;
  });
};

export const addTransponder = (name: string, powerLimit: number,
                                bandwidth: number) => {
  const bodyString = {
        events: [
          {
            name: 'TransponderAddedEvent',
            transponderName: name,
            powerLimit: powerLimit,
            bandwidth: bandwidth
          }
        ]
      };
  return fetch(controllerEventsUri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyString)
  }).then(function (response) {
    return response.json();
  }).then(function (object) {
    return object;
  });
};

export const removeTransponder = (id: string) => {
  const bodyString = {
    events: [
      {
        name: 'TransponderRemovedEvent',
        transponderId: id
      }
    ]
  };
  return fetch(controllerEventsUri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyString)
  }).then(function (response) {
    return response.json();
  }).then(function (object) {
    return object;
  });
};

export const addAllocation = (allocationName: string, startFrequency: number,
                               stopFrequency: number, powerUsage: number, transponderId: string,
                                customerId: string, originatorId: string) => {
  const bodyString = {
        events: [
          {
            name: 'AllocationAddedEvent',
            allocationName: allocationName,
            startFrequency: startFrequency,
            stopFrequency: stopFrequency,
            powerUsage: powerUsage,
            transponderId: transponderId,
            customerId: customerId,
            originatorId: originatorId
          }
        ]
      };
  return fetch(controllerEventsUri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyString)
  }).then(function (response) {
    return response.json();
  }).then(function (object) {
    return object;
  });
};

export const removeAllocation = (transponderId: string, allocationId: string) => {
  const bodyString = {
    events: [
      {
        name: 'AllocationRemovedEvent',
        transponderId: transponderId,
        allocationId: allocationId
      }
    ]
  };
  return fetch(controllerEventsUri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyString)
  }).then(function (response) {
    return response.json();
  }).then(function (object) {
    return object;
  });
};

export const resetRootModel = (name: string) => {
  const bodyString = {
        events: [
          {
            name: 'RootModelAddedEvent',
            rootModelName: name
          }
        ]
      };
  return fetch(controllerEventsUri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyString)
  }).then(function (response) {
    return response.json();
  }).then(function (object) {
    return object;
  });
};


export const addOriginator = (name: string) => {
  const bodyString = {
        events: [
          {
            name: 'OriginatorAddedEvent',
            originatorName: name
          }
        ]
      };
  return fetch(controllerEventsUri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyString)
  }).then(function (response) {
    return response.json();
  }).then(function (object) {
    return object;
  });
};

export const removeOriginator = (id: string) => {
  const bodyString = {
    events: [
      {
        name: 'OriginatorRemovedEvent',
        originatorId: id
      }
    ]
  };
  return fetch(controllerEventsUri, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyString)
  }).then(function (response) {
    return response.json();
  }).then(function (object) {
    return object;
  });
};
