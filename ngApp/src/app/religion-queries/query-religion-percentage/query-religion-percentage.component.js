"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var QueryReligionPercentageComponent = (function () {
    function QueryReligionPercentageComponent(http) {
        this.http = http;
        this.SelectCountry = new core_1.EventEmitter();
        this.SelectYear = new core_1.EventEmitter();
        // Pie
        this.pieChartLabels = [];
        this.pieChartData = [0];
        this.pieChartType = 'pie';
        this.isDataAvailable = false;
        this.thereAreRecords = false;
        this.selectedCountryName = 'Select a Country';
        this.selectedYear = 'Select a Year';
        this.groupReligions = false;
        this.displayAlert = false;
        this.hasSelectedCountry = false;
        this.hasSelectedYear = false;
    }
    QueryReligionPercentageComponent.prototype.ngOnInit = function () {
    };
    QueryReligionPercentageComponent.prototype.onSelectCountry = function (country) {
        if (country.name == null) {
            this.selectedCountryName = 'All Countries';
        }
        else {
            // Store the name of the country
            this.selectedCountryName = country.name;
        }
        console.log(this.selectedCountryName);
        this.hasSelectedCountry = true;
    };
    QueryReligionPercentageComponent.prototype.onSelectYear = function (year) {
        this.selectedYear = year;
        this.hasSelectedYear = true;
    };
    QueryReligionPercentageComponent.prototype.onSelectGroup = function (group) {
        this.groupReligions = group;
    };
    QueryReligionPercentageComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.hasSelectedYear && this.hasSelectedCountry) {
            this.isDataAvailable = false;
            this.http.get('/api_religion/queries/percentage' + '/' + this.selectedCountryName + '/' + this.selectedYear + '/' +
                this.groupReligions).subscribe(function (data) {
                _this.queryResults = data;
                var labels = [];
                var values = [];
                for (var _i = 0, _a = _this.queryResults; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    values.push(entry.number);
                    labels.push(entry.name);
                }
                // If there are no records
                if (values.length === 0) {
                    values = [1];
                    labels = ['No records'];
                    _this.thereAreRecords = false;
                }
                else {
                    _this.thereAreRecords = true;
                }
                // Change labels
                _this.pieChartLabels.length = 0;
                for (var i = 0; i < labels.length; i++) {
                    _this.pieChartLabels.push(labels[i]);
                }
                _this.pieChartData = values;
                _this.isDataAvailable = true;
            });
        }
        else {
            this.displayAlert = true;
        }
    };
    QueryReligionPercentageComponent.prototype.dismissAlert = function () {
        this.displayAlert = false;
    };
    // events
    QueryReligionPercentageComponent.prototype.chartClicked = function (e) {
        console.log(e + '%');
    };
    QueryReligionPercentageComponent.prototype.chartHovered = function (e) {
        console.log(e + '%');
    };
    __decorate([
        core_1.Input()
    ], QueryReligionPercentageComponent.prototype, "countries", void 0);
    __decorate([
        core_1.Input()
    ], QueryReligionPercentageComponent.prototype, "years", void 0);
    __decorate([
        core_1.Output()
    ], QueryReligionPercentageComponent.prototype, "SelectCountry", void 0);
    __decorate([
        core_1.Output()
    ], QueryReligionPercentageComponent.prototype, "SelectYear", void 0);
    QueryReligionPercentageComponent = __decorate([
        core_1.Component({
            selector: 'query-religion-percentage',
            templateUrl: './query-religion-percentage.component.html',
            styleUrls: ['./query-religion-percentage.component.css']
        })
    ], QueryReligionPercentageComponent);
    return QueryReligionPercentageComponent;
}());
exports.QueryReligionPercentageComponent = QueryReligionPercentageComponent;
