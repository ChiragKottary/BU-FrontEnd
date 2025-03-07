import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormStateService, GridItem } from '../services/form-state.service';
import { RowReorderEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {
  public gridData: GridItem[] = [];

  constructor(
    private router: Router,
    private formStateService: FormStateService
  ) { }

  ngOnInit() {
    this.loadGridData();
  }

  private loadGridData(): void {
    this.gridData = this.formStateService.getTempFields();
  }

  public onReOrder(event: RowReorderEvent): void {
    const start = event.draggedRows[0]?.rowIndex;
    const end = event.dropTargetRow?.rowIndex;

    if (start !== undefined && end !== undefined) {
      this.formStateService.reorderTempFields(start, end);
      this.loadGridData();
    }
  }

  public onFieldChange(dataItem: GridItem): void {
    this.formStateService.toggleTempFieldVisibility(dataItem.fieldName);
    this.loadGridData();
  }

  public onRequiredChange(dataItem: GridItem): void {
    this.formStateService.toggleTempFieldRequired(dataItem.fieldName);
    this.loadGridData();
  }

  sendRegisterData() {
    this.formStateService.saveChanges();
    this.router.navigate(['/register']);
  }

  cancelChanges() {
    this.formStateService.cancelChanges();
    this.loadGridData();
  }
}
