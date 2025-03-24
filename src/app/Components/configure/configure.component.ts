import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormStateService, GridItem } from '../services/form-state.service';
import { RowReorderEvent } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {
  public gridData: GridItem[] = [];

  constructor(
    private router: Router,
    private formStateService: FormStateService,
    private notificationService: NotificationService
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
    const navigate:boolean = this.allfieldsNotSelected(this.gridData);

    if (!navigate) {
      this.formStateService.saveChanges();
    this.router.navigate(['/register']);
    }else{
      this.notificationService.show({
        content: 'Please select at least one field',
        cssClass: 'error-notification fade-out',
        animation: { 
          type: 'fade',
          duration: 400
        },
        position: { 
          horizontal: 'center', 
          vertical: 'top' 
        },
        type: { 
          style: 'error', 
          icon: true 
        },
        closable: false,
        hideAfter: 2000
      });
    }
    
    
  }

  allfieldsNotSelected(data: GridItem[]): boolean {
    return data.every(item => item.field === false)
  }

  cancelChanges() {
    this.formStateService.cancelChanges();
    this.loadGridData();
  }
}
