"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ui_updater_service_1 = require("./services/ui-updater.service");
var catalog_api_service_1 = require("../../es-demo/services/catalog-api.service");
var add_category_event_1 = require("../../es-demo/events/add-category-event");
var app_helpers_1 = require("../../app.helpers");
var add_branch_event_1 = require("../../es-demo/events/add-branch-event");
var EsDemoComponent = (function () {
    function EsDemoComponent() {
    }
    EsDemoComponent.prototype.ngOnInit = function () {
        ui_updater_service_1.UiUpdaterService.initialize();
        $('#addCategoryForm').validate({
            rules: {
                categoryName: {
                    required: true
                }
            },
            submitHandler: function (form) {
                var newCategoryName = $('#categoryName').val();
                var event = new add_category_event_1.AddCategoryEvent(ui_updater_service_1.UiUpdaterService._catalog, app_helpers_1.generateUUID(), newCategoryName);
                ui_updater_service_1.UiUpdaterService.processEvent(event);
                $('#modalAddCategory').modal('hide');
                ui_updater_service_1.UiUpdaterService.resetModalForms();
            }
        });
        $('#addBranchForm').validate({
            rules: {
                branchName: {
                    required: true
                }
            },
            submitHandler: function (form) {
                var name = $('#branchName').val();
                var event = new add_branch_event_1.AddBranchEvent(ui_updater_service_1.UiUpdaterService._catalog, name);
                ui_updater_service_1.UiUpdaterService.processEvent(event);
                $('#branchFormModal').modal('hide');
                ui_updater_service_1.UiUpdaterService.resetModalForms();
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
            submitHandler: function (form) {
                var id = $('#productId').val();
                var name = $('#productName').val();
                var price = $('#productPrice').val();
                var visible = $('#productVisible').val();
                var color = $('#productColor').val();
                var categoryId = $('#productCategory').val();
                if (id) {
                    ui_updater_service_1.UiUpdaterService.changeProduct(id, name, price, visible, color, categoryId);
                }
                else {
                    ui_updater_service_1.UiUpdaterService.addProduct(name, price, visible, color, categoryId || '');
                }
                $('#productFormModal').modal('hide');
                ui_updater_service_1.UiUpdaterService.resetModalForms();
            }
        });
        $('#btnAddProduct').click(function () {
            ui_updater_service_1.UiUpdaterService.resetModalForms();
        });
        $('#btnRemoveSelectedEvent').click(function () {
            swal({
                title: "Are you sure?",
                text: "Are you sure you want to remove the selected event?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Remove it",
                closeOnConfirm: false
            }, function () {
                ui_updater_service_1.UiUpdaterService.deleteEvent();
                swal("Removed", "The selected event has been removed.", "success");
            });
        });
        Ladda.bind('.ladda-button', { timeout: 1000 });
    };
    return EsDemoComponent;
}());
EsDemoComponent = __decorate([
    core_1.Component({
        selector: 'app-es-demo',
        templateUrl: './es-demo.component.html',
        styleUrls: ['./es-demo.component.css'],
        providers: [catalog_api_service_1.CatalogApiService]
    }),
    __metadata("design:paramtypes", [])
], EsDemoComponent);
exports.EsDemoComponent = EsDemoComponent;
//# sourceMappingURL=es-demo.component.js.map