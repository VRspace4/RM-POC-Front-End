import { Injectable } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';
import {DsGlobals} from "../app.globals";

@Injectable()
export class DsService {
  public dsInstance;

  constructor() {
    this.dsInstance = deepstream(DsGlobals.serverURI);
    this.dsInstance.login(null, () => {
      console.log('Connected to deepstream server at ' + DsGlobals.serverURI);
    });
  }
}
