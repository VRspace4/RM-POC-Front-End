"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var product_1 = require("../models/product");
var category_1 = require("../models/category");
var catalog_1 = require("../models/catalog");
var event_catalog_1 = require("../models/event-catalog");
var appGlobal = require("../../app.globals");
var ui_updater_service_1 = require("../../views/es-demo/services/ui-updater.service");
var CatalogApiService = CatalogApiService_1 = (function () {
    function CatalogApiService() {
    }
    CatalogApiService.getCatalog = function (eventId) {
        return new Promise(function (resolve, reject) {
            fetch(appGlobal.GeneralGlobals.serverHostname + '/catalog/' + eventId).then(function (response) {
                return response.json();
            }).then(function (object) {
                var catalog = CatalogApiService_1.deserializeCatalog(object);
                ui_updater_service_1.UiUpdaterService._catalog = catalog;
                resolve(catalog);
            });
        });
    };
    CatalogApiService.getDefaultCatalog = function () {
        return new Promise(function (resolve, reject) {
            fetch(appGlobal.GeneralGlobals.serverHostname + '/default').then(function (response) {
                return response.json();
            }).then(function (object) {
                resolve(CatalogApiService_1.deserializeCatalog(object));
            });
        });
    };
    CatalogApiService.getAllCatalogEvents = function (catalogId) {
        return new Promise(function (resolve, reject) {
            fetch(appGlobal.GeneralGlobals.serverHostname + '/events/' + catalogId).then(function (response) {
                return response.json();
            }).then(function (object) {
                resolve(object.events);
            });
        });
    };
    CatalogApiService.deserializeCatalog = function (object) {
        var catalog = new catalog_1.Catalog(object.id, object.name, object.categories.map(function (o) { return new category_1.Category(o.id, o.name); }), object.products.map(function (o) { return new product_1.Product(o.id, o.name, o.price, o.visible, o.color, o.category); }));
        catalog.eventId = object.eventId;
        return catalog;
    };
    CatalogApiService.deserializeCatalogEvents = function (jsonEvents) {
        var catalogEvents = jsonEvents.map(function (event) {
            return new event_catalog_1.CatalogEvent(event.catalogName, event.catalogId, event.name, event.id);
        });
        return catalogEvents;
    };
    CatalogApiService.appendEvents = function (events, parentId) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        events.forEach(function (event) { return event.catalog = null; });
        return new Promise(function (resolve, reject) {
            var payload = {
                method: 'post',
                headers: myHeaders,
                body: JSON.stringify({ events: events, parentId: parentId })
            };
            console.log('appendEvents', JSON.stringify({ events: events, parentId: parentId }));
            fetch(appGlobal.GeneralGlobals.serverHostname + '/events/', payload).then(function (response) {
                return response.json();
            }).then(function (object) {
                var catalog = CatalogApiService_1.deserializeCatalog(object);
                resolve(catalog);
            });
        });
    };
    CatalogApiService.deleteEvent = function (eventId) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            var payload = {
                method: 'delete',
                headers: myHeaders
            };
            fetch(appGlobal.GeneralGlobals.serverHostname + '/events/' + eventId, payload).then(function (response) {
                return response.json();
            }).then(function (object) {
                var catalog = CatalogApiService_1.deserializeCatalog(object);
                resolve(catalog);
            });
        });
    };
    return CatalogApiService;
}());
CatalogApiService = CatalogApiService_1 = __decorate([
    core_1.Injectable()
], CatalogApiService);
exports.CatalogApiService = CatalogApiService;
var CatalogApiService_1;
//# sourceMappingURL=catalog-api.service.js.map