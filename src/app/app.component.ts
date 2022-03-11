import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { CheckboxRenderer } from "./checkbox-renderer.component";

@Component({
  selector: "my-app",
  template: `
    <ag-grid-angular
      #agGrid
      style="width: 100vw; height: 100vh;"
      id="myGrid"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [frameworkComponents]="frameworkComponents"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      { field: "athlete" },
      {
        headerName: "Registered - Checkbox",
        field: "registered",
        cellRenderer: "checkboxRenderer"
      },
      {
        headerName: "Registered - Boolean",
        field: "registered"
      }
    ];
    this.defaultColDef = {
      flex: 1
    };
    this.frameworkComponents = {
      checkboxRenderer: CheckboxRenderer
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe(data => {
        data = data.map(d => ({
          ...d,
          registered: Math.random() < 0.5
        }));
        this.rowData = data;
      });
  }
}
