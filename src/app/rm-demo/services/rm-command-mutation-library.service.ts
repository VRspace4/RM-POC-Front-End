import {ResponseMessage} from "../../es-demo/types/response-message";
import {GeneralGlobals} from "../../app.globals";
import fetch from 'node-fetch';

const controllerEventsUri = `${GeneralGlobals.commandRestUri}/events`;

export class RmCommandMutation {
  static addCustomer(name: string): Promise<ResponseMessage> {
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
    }).then(function (object: ResponseMessage) {
      return object;
    });
  };

  static removeCustomer(id: string): Promise<ResponseMessage> {
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

  static addTransponder(name: string, powerLimit: number,
                                 bandwidth: number): Promise<ResponseMessage> {
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

  static removeTransponder(id: string): Promise<ResponseMessage> {
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

  static addAllocation(allocationName: string, startFrequency: number,
                                stopFrequency: number, powerUsage: number, transponderId: string,
                                customerId: string, originatorId: string): Promise<ResponseMessage> {
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

  static removeAllocation(transponderId: string, allocationId: string): Promise<ResponseMessage> {
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

  static resetRootModel(name: string): Promise<ResponseMessage> {
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


  static addOriginator(name: string): Promise<ResponseMessage> {
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

  static removeOriginator(id: string): Promise<ResponseMessage> {
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

} // end
