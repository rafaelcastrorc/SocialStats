"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var country_service_1 = require("../country.service");
var religion_service_1 = require("../religion.service");
var ReligionsComponent = (function () {
    function ReligionsComponent() {
        this.queries = [
            'Number of people who follow a religion in a country',
            'Religions present in the fewest countries',
            'Largest religion by country',
            'Percent of people who follow a religion in a country',
            'Change in religion over time'
        ];
        this.selectedQuery = 'Select a query from the right side panel';
    }
    ReligionsComponent.prototype.ngOnInit = function () {
    };
    ReligionsComponent.prototype.onSelectQuery = function (query) {
        this.selectedQuery = query;
        console.log(this.selectedQuery);
    };
    ReligionsComponent = __decorate([
        core_1.Component({
            selector: 'app-religions',
            templateUrl: './religions.component.html',
            styleUrls: ['./religions.component.css'],
            providers: [country_service_1.CountryService, religion_service_1.ReligionService],
        })
    ], ReligionsComponent);
    return ReligionsComponent;
}());
exports.ReligionsComponent = ReligionsComponent;
