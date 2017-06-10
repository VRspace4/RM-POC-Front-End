"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui_graph_service_1 = require("./ui-graph.service");
var catalog_api_service_1 = require("../../../es-demo/services/catalog-api.service");
var add_product_event_1 = require("../../../es-demo/events/add-product-event");
var app_helpers_1 = require("../../../app.helpers");
var remove_category_event_1 = require("../../../es-demo/events/remove-category-event");
var set_product_attribute_event_1 = require("../../../es-demo/events/set-product-attribute-event");
var remove_product_event_1 = require("../../../es-demo/events/remove-product-event");
var UiUpdaterService = (function () {
    function UiUpdaterService() {
    }
    UiUpdaterService.testFunc = function () {
        console.log('testFunc');
    };
    UiUpdaterService.initialize = function () {
        var _this = this;
        ui_graph_service_1.UiGraphService.initialize();
        var eventId = localStorage.getItem('eventId');
        if (eventId) {
            this._eventId = parseInt(eventId, 10);
            catalog_api_service_1.CatalogApiService.getCatalog(eventId).then(function (catalog) {
                _this._catalog = catalog;
                _this.updateGraphAndTables(catalog);
            });
        }
        else {
            catalog_api_service_1.CatalogApiService.getDefaultCatalog().then(function (catalog) {
                _this._eventId = catalog.eventId;
                _this._catalog = catalog;
                _this.updateGraphAndTables(catalog);
            });
        }
    };
    UiUpdaterService.updateGraphAndTables = function (catalog) {
        this.applyUpdatesToTables(catalog);
        catalog_api_service_1.CatalogApiService.getAllCatalogEvents(catalog.id).then(function (events) {
            ui_graph_service_1.UiGraphService.updateGraph(events, catalog.eventId, null);
        });
    };
    UiUpdaterService.processEvent = function (event) {
        return this.processEvents([event]);
    };
    UiUpdaterService.processEvents = function (events) {
        var _this = this;
        catalog_api_service_1.CatalogApiService.appendEvents(events, this._eventId).then(function (catalog) {
            _this._catalog = catalog;
            _this._eventId = catalog.eventId;
            _this.updateGraphAndTables(catalog);
        });
    };
    UiUpdaterService.deleteEvent = function () {
        var _this = this;
        catalog_api_service_1.CatalogApiService.deleteEvent(UiUpdaterService._eventId).then(function (catalog) {
            _this._catalog = catalog;
            _this._eventId = catalog.eventId || null;
            _this.updateGraphAndTables(catalog);
        });
    };
    UiUpdaterService.changeCatalog = function (eventId) {
        var _this = this;
        this._eventId = eventId;
        catalog_api_service_1.CatalogApiService.getCatalog(eventId).then(function (catalog) {
            _this.applyUpdatesToTables(catalog);
        });
    };
    UiUpdaterService.applyUpdatesToTables = function (catalog) {
        localStorage.setItem('eventId', catalog.eventId.toString());
        this.updateCategoryTable(catalog);
        this.updateProductTable(catalog);
        var categoriesSelect = $('#productCategory');
        categoriesSelect.empty();
        catalog.categories.forEach(function (category) {
            categoriesSelect.append($('<option></option>').val(category.id).html(category.name));
        });
        categoriesSelect.val('');
    };
    UiUpdaterService.updateCategoryTable = function (catalog) {
        var _this = this;
        var tbody = $('#tbody-categories');
        // Populate categoryId select fields in modal form(s)
        $('#productCategory').val(this._catalog.categories);
        tbody.empty();
        catalog.categories.forEach(function (category) {
            tbody
                .append($('<tr>')
                .append($('<td>')
                .append(category.id))
                .append($('<td>')
                .append(category.name))
                .append($('<td>')
                .append($('<button/>', {
                text: 'remove',
                class: 'btn btn-default btn-sm',
                click: function () {
                    _this.processEvent(new remove_category_event_1.RemoveCategoryEvent(catalog, category.id));
                }
            }))));
        });
    };
    UiUpdaterService.updateProductTable = function (catalog) {
        var _this = this;
        var tbody = $('#tbody-products');
        tbody.empty();
        catalog.products.forEach(function (product) {
            var categoryName = '';
            if (product.categoryId) {
                var category = catalog.getCategory(product.categoryId);
                if (category) {
                    categoryName = category.name;
                }
            }
            tbody
                .append($('<tr>')
                .append($('<td>')
                .append(product.id))
                .append($('<td>')
                .append(product.name))
                .append($('<td>')
                .append(categoryName))
                .append($('<td>')
                .append(product.price))
                .append($('<td>')
                .append(product.visible))
                .append($('<td>')
                .append(product.color))
                .append($('<td>')
                .append($('<button/>', {
                text: 'edit',
                class: 'btn btn-default btn-sm',
                click: function () {
                    _this.openUpdateForm(product);
                }
            }))
                .append($('<button/>', {
                text: 'remove',
                class: 'btn btn-default btn-sm',
                click: function () {
                    UiUpdaterService.processEvent(new remove_product_event_1.RemoveProductEvent(_this._catalog, product.id));
                }
            }))));
        });
    };
    UiUpdaterService.changeProduct = function (id, name, price, visible, color, categoryId) {
        var product = this._catalog.getProduct(id);
        var events = [];
        if (name !== (product.name || ''))
            events.push(new set_product_attribute_event_1.SetProductAttributeEvent(this._catalog, id, 'name', name));
        if (price !== (product.price || ''))
            events.push(new set_product_attribute_event_1.SetProductAttributeEvent(this._catalog, id, 'price', price.toString()));
        if (visible !== (product.visible || ''))
            events.push(new set_product_attribute_event_1.SetProductAttributeEvent(this._catalog, id, 'visible', visible));
        if (color !== (product.color || ''))
            events.push(new set_product_attribute_event_1.SetProductAttributeEvent(this._catalog, id, 'color', color));
        if (categoryId !== (product.categoryId || ''))
            events.push(new set_product_attribute_event_1.SetProductAttributeEvent(this._catalog, id, 'category', categoryId));
        // console.log('events = ', events);
        this.processEvents(events);
    };
    UiUpdaterService.openUpdateForm = function (product) {
        $('#productId').val(product.id);
        $('#productName').val(product.name);
        $('#productPrice').val(product.price);
        $('#productVisible').val(product.visible);
        $('#productColor').val(product.color);
        if (product.categoryId) {
            $('#productCategory').val(product.categoryId);
        }
        $('#productFormModal').modal('show');
    };
    UiUpdaterService.resetModalForms = function () {
        $('#categoryName').val('');
        $('#productName').val('');
        $('#productCategory').val('');
        $('#productPrice').val('');
        $('#productvisible').val('');
        $('#productColor').val('');
        $('#branchName').val('');
    };
    UiUpdaterService.addProduct = function (name, price, visible, color, categoryId) {
        var event = new add_product_event_1.AddProductEvent(this._catalog, app_helpers_1.generateUUID(), name, price, visible, color, categoryId);
        UiUpdaterService.processEvent(event);
    };
    return UiUpdaterService;
}());
exports.UiUpdaterService = UiUpdaterService;
//# sourceMappingURL=ui-updater.service.js.map