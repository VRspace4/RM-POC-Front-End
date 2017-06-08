import * as appGlobal from '../app/app.globals';
import * as server from './server';
import * as http from 'http';
import fetch from 'node-fetch';
import {Response} from 'node-fetch';

describe('server', () => {
  let serverInstance: http.Server;
  //
  beforeEach(function (done: DoneFn) {
    serverInstance = server.run(done);
  });
  afterEach(function (done: DoneFn) {
    serverInstance.close(done);
  });

  it('testing zzz', function (done: DoneFn) {
    fetch(appGlobal.url + '/hello').then(function (response: Response) {
      return response.text();
    }).then(function (response: any) {
      console.log("**** response = ", response);
      done();
    });
  });

  it('testing #2', function () {
    expect(true).toEqual(true);
  });
});
