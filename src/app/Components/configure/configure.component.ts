import { Component } from '@angular/core';
import { RowReorderEvent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';

interface GridItem {
  field: boolean;
  fieldName: string;
  required: boolean;
}

const sampleCustomers: GridItem[] = [
  { field: true, fieldName: 'name', required: true },
  { field: false, fieldName: 'age', required: false },
  { field: true, fieldName: 'email', required: true },
];

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css'],
})
export class ConfigureComponent {
  public gridData: GridItem[] = [...sampleCustomers];

  registerPage = false;

  constructor(private router: Router) {
    console.log('Initial gridData:', this.gridData);
  }

  public onReOrder(event: RowReorderEvent): void {
    console.log('RowReorderEvent:', event);

    const start = event.draggedRows[0]?.rowIndex;
    const end = event.dropTargetRow?.rowIndex;

    if (
      start !== undefined && end !== undefined &&
      start >= 0 && start < this.gridData.length &&
      end >= 0 && end < this.gridData.length
    ) {
      const item = this.gridData.splice(start, 1)[0];
      this.gridData.splice(end, 0, item);
    }

    console.log('Reordered gridData:', this.gridData);
  }

  public onFieldChange(dataItem: GridItem): void {
    dataItem.field = !dataItem.field;
    if (!dataItem.field) {
      dataItem.required = false;
    }
    console.log('Field checkbox changed:', dataItem);
  }

  public onRequiredChange(dataItem: GridItem): void {
    dataItem.required = !dataItem.required;
    console.log('Required checkbox changed:', dataItem);
  }

  sendRegisterData() {
    // Store the grid data in localStorage or a service
    localStorage.setItem('registerData', JSON.stringify(this.gridData));
    // Navigate to register page
    this.router.navigate(['/register']);
  }
}
