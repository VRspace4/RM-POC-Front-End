import {UiGraphService} from './ui-graph.service';
import {CatalogApiService} from '../../../es-demo/services/catalog-api.service';
import {Catalog} from '../../../es-demo/models/catalog';
import {Category} from '../../../es-demo/models/category';
import {Product} from '../../../es-demo/models/product';
import * as appGlobal from '../../../app.globals';
import {AddProductEvent} from "../../../es-demo/events/add-product-event";
import {generateUUID} from "../../../app.helpers";
import {RemoveCategoryEvent} from "../../../es-demo/events/remove-category-event";
import {SetProductAttributeEvent} from "../../../es-demo/events/set-product-attribute-event";
import {RemoveProductEvent} from "../../../es-demo/events/remove-product-event";

declare var $: any;

export class UiUpdaterService {
  static _eventId: number;
  static _secondEventId: number;
  static _catalog: Catalog;

  static testFunc(): void {
    console.log('testFunc');
  }

  static initialize(): void {
    UiGraphService.initialize();
    const eventId = localStorage.getItem('eventId');
    if (eventId) {
      this._eventId = parseInt(eventId, 10);
      CatalogApiService.getCatalog(eventId).then((catalog: Catalog) => {
        this._catalog = catalog;
        this.updateGraphAndTables(catalog);
      });
    } else {
      CatalogApiService.getDefaultCatalog().then((catalog: Catalog) => {
        this._eventId = catalog.eventId;
        this._catalog = catalog;
        this.updateGraphAndTables(catalog);

      });
    }
  }

  static updateGraphAndTables(catalog: Catalog): void {
    this.applyUpdatesToTables(catalog);
    CatalogApiService.getAllCatalogEvents(catalog.id).then((events) => {
      UiGraphService.updateGraph(events, catalog.eventId, null);
    });
  }

  static processEvent(event: any) {
    return this.processEvents([event]);
  }

  static processEvents(events: any[]): void {
    CatalogApiService.appendEvents(events, this._eventId).then((catalog: Catalog) => {
      this._catalog = catalog;
      this._eventId = catalog.eventId;
      this.updateGraphAndTables(catalog);
    });
  }

  static deleteEvent(): void {
    CatalogApiService.deleteEvent(UiUpdaterService._eventId).then((catalog: Catalog) => {
      this._catalog = catalog;
      this._eventId = catalog.eventId || null;

      this.updateGraphAndTables(catalog);
    })
  }

  static changeCatalog(eventId: number): void {
    this._eventId = eventId;
    CatalogApiService.getCatalog(eventId).then((catalog: Catalog) => {
      this.applyUpdatesToTables(catalog);
    });
  }

  static applyUpdatesToTables(catalog: Catalog): void {
    localStorage.setItem('eventId', catalog.eventId.toString());

    this.updateCategoryTable(catalog);
    this.updateProductTable(catalog);

    const categoriesSelect = $('#productCategory');

    categoriesSelect.empty();
    catalog.categories.forEach((category) => {
      categoriesSelect.append($('<option></option>').val(category.id).html(category.name));
    });
    categoriesSelect.val('');
  }

  static updateCategoryTable(catalog: Catalog): void {
    const tbody = $('#tbody-categories');

    // Populate categoryId select fields in modal form(s)
    $('#productCategory').val(this._catalog.categories);

    tbody.empty();
    catalog.categories.forEach((category) => {
      tbody
        .append($('<tr>')
          .append($('<td>')
            .append(category.id)
          )
          .append($('<td>')
            .append(category.name)
          )
          .append($('<td>')
            .append($('<button/>', {
              text: 'remove',
              class: 'btn btn-default btn-sm',
              click: () => {
                this.processEvent(new RemoveCategoryEvent(catalog, category.id));
              }
            }))
          )
        );
    });
  }

  static updateProductTable(catalog: Catalog): void {
    const tbody = $('#tbody-products');
    tbody.empty();
    catalog.products.forEach((product: Product) => {
      let categoryName = '';
      if (product.categoryId) {
        const category: Category = catalog.getCategory(product.categoryId);

        if (category) {
          categoryName = category.name;
        }
      }

      tbody
        .append($('<tr>')
          .append($('<td>')
            .append(product.id)
          )
          .append($('<td>')
            .append(product.name)
          )
          .append($('<td>')
            .append(categoryName)
          )
          .append($('<td>')
            .append(product.price)
          )
          .append($('<td>')
            .append(product.visible)
          )
          .append($('<td>')
            .append(product.color)
          )
          .append($('<td>')
            .append($('<button/>', {
              text: 'edit',
              class: 'btn btn-default btn-sm',
              click: () => {
                this.openUpdateForm(product);
              }
            }))
            .append($('<button/>', {
              text: 'remove',
              class: 'btn btn-default btn-sm',
              click: () => {
                UiUpdaterService.processEvent(new RemoveProductEvent(this._catalog, product.id));
              }
            }))
          )
        );
    });
  }

  static changeProduct(id: string, name: string, price: number, visible: string, color: string, categoryId: string)
  {
    const product = this._catalog.getProduct(id);
    let events: any[] = [];

    if (name !== (product.name || ''))
      events.push(new SetProductAttributeEvent(this._catalog, id, 'name', name));
    if (price !== (product.price || ''))
      events.push(new SetProductAttributeEvent(this._catalog, id, 'price', price.toString()));
    if (visible !== (product.visible || ''))
      events.push(new SetProductAttributeEvent(this._catalog, id, 'visible', visible));
    if (color !== (product.color || ''))
      events.push(new SetProductAttributeEvent(this._catalog, id, 'color', color));
    if (categoryId !== (product.categoryId || ''))
      events.push(new SetProductAttributeEvent(this._catalog, id, 'category', categoryId));

    // console.log('events = ', events);
    this.processEvents(events);
  }

  static openUpdateForm(product: Product) {
    $('#productId').val(product.id);
    $('#productName').val(product.name);
    $('#productPrice').val(product.price);
    $('#productVisible').val(product.visible);
    $('#productColor').val(product.color);

    if (product.categoryId) {
      $('#productCategory').val(product.categoryId);
    }

    $('#productFormModal').modal('show');
  }

  static resetModalForms() {
    $('#categoryName').val('');
    $('#productName').val('');
    $('#productCategory').val('');
    $('#productPrice').val('');
    $('#productvisible').val('');
    $('#productColor').val('');
    $('#branchName').val('');
  }

  static addProduct(name: string, price: number, visible: boolean, color: string, categoryId: string): void {
    const event = new AddProductEvent(this._catalog, generateUUID(),
                name, price, visible, color, categoryId);
    UiUpdaterService.processEvent(event);
  }
}
