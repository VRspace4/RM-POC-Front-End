import { Injectable } from '@angular/core';
import 'whatwg-fetch';

import { Product } from '../models/product';
import { Category } from '../models/category';
import { Catalog } from '../models/catalog';
import { CatalogEvent } from '../models/event-catalog';
import * as appGlobal from '../../app.globals';

@Injectable()
export class CatalogApiService {

  public static getCatalog(eventId): Promise<Catalog> {
    return new Promise((resolve, reject) => {
      fetch(appGlobal.url + '/catalog/' + eventId).then(function (response) {
        return response.json();
      }).then(function (object: any) {
        resolve(CatalogApiService.deserializeCatalog(object));
      });
    });
  }

  public static getAllCatalogEvents(catalogId: string): Promise<CatalogEvent[]> {
    return new Promise((resolve, reject) => {
      fetch(appGlobal.url + '/events/' + catalogId).then(function (response) {
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
}
