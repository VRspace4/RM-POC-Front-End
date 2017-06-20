import { Injectable } from '@angular/core';

import { Product } from '../models/product';
import { Category } from '../models/category';
import { Catalog } from '../models/catalog';
import { CatalogEvent } from '../models/event-catalog';
import * as appGlobal from '../../app.globals';
import {UiUpdaterService} from "../../views/es-demo/services/ui-updater.service";

@Injectable()
export class CatalogApiService {

  public static getCatalog(eventId): Promise<Catalog> {
    return new Promise((resolve, reject) => {
      fetch(appGlobal.GeneralGlobals.serverHostname + '/catalog/' + eventId).then(function (response: Response) {
        return response.json();
      }).then(function (object: any) {
        const catalog = CatalogApiService.deserializeCatalog(object);
        UiUpdaterService._catalog = catalog;
        resolve(catalog);
      });
    });
  }

  static getDefaultCatalog(): Promise<Catalog> {
    return new Promise((resolve, reject) => {
      fetch(appGlobal.GeneralGlobals.serverHostname + '/default').then(function (response: Response) {
        return response.json();
      }).then(function (object) {
        resolve(CatalogApiService.deserializeCatalog(object));
      });
    });
  }

  public static getAllCatalogEvents(catalogId: string): Promise<CatalogEvent[]> {
    return new Promise((resolve, reject) => {
      fetch(appGlobal.GeneralGlobals.serverHostname + '/events/' + catalogId).then(function (response: Response) {
        return response.json();
      }).then(function (object: any) {
        resolve(object.events);
      });
    });
  }

  public static deserializeCatalog(object: any): Catalog {
    const catalog = new Catalog(object.id,
      object.name,
      object.categories.map((o) => new Category(o.id, o.name)),
      object.products.map((o) => new Product(o.id, o.name, o.price, o.visible, o.color, o.category)));

    catalog.eventId = object.eventId;
    return catalog;
  }

  public static deserializeCatalogEvents(jsonEvents: any): CatalogEvent[] {
    const catalogEvents = jsonEvents.map((event) => {
      return new CatalogEvent(event.catalogName,
        event.catalogId,
        event.name,
        event.id);
    })

    return catalogEvents;
  }

  static appendEvents(events: any[], parentId: number): Promise<Catalog> {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    events.forEach((event) => event.catalog = null);

    return new Promise((resolve, reject) => {
      const payload = {
        method: 'post',
        headers: myHeaders,
        body: JSON.stringify({events: events, parentId})
      };
      console.log('appendEvents', JSON.stringify({events: events, parentId}));
      fetch(appGlobal.GeneralGlobals.serverHostname + '/events/', payload).then(function (response: Response) {
        return response.json();
      }).then(function (object) {
        const catalog = CatalogApiService.deserializeCatalog(object);

        resolve(catalog);
      });
    });
  }

  static deleteEvent(eventId: number): Promise<Catalog> {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
      const payload = {
        method: 'delete',
        headers: myHeaders
      };

      fetch(appGlobal.GeneralGlobals.serverHostname + '/events/' + eventId, payload).then(function (response: Response) {
        return response.json();
      }).then(function (object: any) {
        const catalog = CatalogApiService.deserializeCatalog(object);

        resolve(catalog);
      });
    })
  }
}
