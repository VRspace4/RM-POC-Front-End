import {UiGraphService} from './ui-graph.service';
import {CatalogApiService} from '../../../es-demo/services/catalog-api.service';
import {Catalog} from '../../../es-demo/models/catalog';
import {Category} from '../../../es-demo/models/category';
import {Product} from '../../../es-demo/models/product';
import * as appGlobal from '../../../app.globals';

declare var $: any;

export class UiUpdaterService {
  static _eventId: number;
  static _secondEventId: number;

  static testFunc(): void {
    localStorage.setItem('eventId', '35');
  }

  static setCatalog(eventId: number): void {
    this._eventId = eventId;
    CatalogApiService.getCatalog(eventId).then((catalog) => {
      this.update(catalog);
    });
  }

  static update(catalog: Catalog): void {
    this.updateCategoryTable(catalog);
    this.updateProductTable(catalog);

    const categoriesSelect = $('#productCategory');

    categoriesSelect.empty();
    catalog.categories.forEach((category) => {
      categoriesSelect.append($('<option></option>').val(category.id).html(category.name));
    });
    categoriesSelect.val('');

    CatalogApiService.getAllCatalogEvents(catalog.id).then((events) => {
      UiGraphService.update(events, catalog.eventId, null, (event, ctrl) => {
        if (ctrl) {
          this._secondEventId = event.id;
          $('#mergeEvents').prop('disabled', false);
        } else {
          $('#mergeEvents').prop('disabled', true);
          this.setCatalog(event.id);
        }
      });
    });
  }

  static updateCategoryTable(catalog: Catalog): void {
    const tbody = $('#tbody-categories');

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
              class: 'btn btn-primary',
              click: () => {
                //TODO
                //this.processEvent(new RemoveCategoryEvent(catalog, category.id));
                console.log('no idea...');
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
      if (product.category) {
        const category: Category = catalog.getCategory(product.category.id);

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
              class: 'btn btn-primary',
              click: () => {
                //TODO: UiUpdater.openUpdateForm(product);
              }
            }))
            .append($('<button/>', {
              text: 'remove',
              class: 'btn btn-primary',
              click: () => {
                //TODO: UiUpdater.processEvent(new RemoveProductEvent(catalog, product.id));
              }
            }))
          )
        );
    });
  }

}
