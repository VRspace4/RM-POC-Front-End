import { Component, OnInit } from '@angular/core';
import { UiUpdaterService } from './services/ui-updater.service';
import { UiGraphService } from './services/ui-graph.service';
import { CatalogApiService } from '../../es-demo/services/catalog-api.service';
import { VisNode } from '../../components/models/vis-node';
import { VisEdge } from '../../components/models/vis-edge';
import {AddCategoryEvent} from "../../es-demo/events/add-category-event";
import {generateUUID} from "../../app.helpers";
import {Catalog} from "../../es-demo/models/catalog";
import {Category} from "../../es-demo/models/category";
import {AddBranchEvent} from "../../es-demo/events/add-branch-event";

declare var $: any;
declare var url: any;
declare var vis: any;
declare var Ladda: any;
declare var swal: any;

@Component({
  selector: 'app-es-demo',
  templateUrl: './es-demo.component.html',
  styleUrls: ['./es-demo.component.css'],
  providers: [CatalogApiService]
})
export class EsDemoComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    UiUpdaterService.initialize();

    $('#addCategoryForm').validate({
      rules: {
        categoryName: {
          required: true
        }
      },
      submitHandler: function(form) {
        const newCategoryName = $('#categoryName').val();
        const event = new AddCategoryEvent(UiUpdaterService._catalog, generateUUID(), newCategoryName);
        UiUpdaterService.processEvent(event);
        $('#modalAddCategory').modal('hide');
        UiUpdaterService.resetModalForms();
      }
    });

    $('#addBranchForm').validate({
      rules: {
        branchName: {
          required: true
        }
      },
      submitHandler: function(form) {
        const name = $('#branchName').val();

        const event = new AddBranchEvent(UiUpdaterService._catalog, name);
        UiUpdaterService.processEvent(event);

        $('#branchFormModal').modal('hide');
        UiUpdaterService.resetModalForms();
      }
    });

    $('#addProductForm')
      .validate({
        rules: {
          productName: {
            required: true
          },
          productCategory: {
            required: true
          },
          productPrice: {
            required: true,
            number: true
          },
          productVisible: {
            required: true
          },
          productColor: {
            required: true
          }
        },
        submitHandler: function(form) {
          const id = $('#productId').val();
          const name = $('#productName').val();
          const price = $('#productPrice').val();
          const visible = $('#productVisible').val();
          const color = $('#productColor').val();
          const categoryId = $('#productCategory').val();

          if (id) {
            UiUpdaterService.changeProduct(id, name, price, visible, color, categoryId);
          } else {
            UiUpdaterService.addProduct(name, price, visible, color, categoryId || '');
          }

          $('#productFormModal').modal('hide');
          UiUpdaterService.resetModalForms();
        }
    });

    $('#btnAddProduct').click(() => {
      UiUpdaterService.resetModalForms();
    });

    $('#btnRemoveSelectedEvent').click(() => {
      swal({
        title: "Are you sure?",
        text: "Are you sure you want to remove the selected event?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Remove it",
        closeOnConfirm: false
      }, function () {
        UiUpdaterService.deleteEvent();
        swal("Removed", "The selected event has been removed.", "success");
      });
      });

    Ladda.bind('.ladda-button', {timeout: 1000});

  }



}
