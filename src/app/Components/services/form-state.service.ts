import { Injectable } from '@angular/core';

export interface GridItem {
  field: boolean;
  fieldName: string;
  required: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private formFields: GridItem[] = [];
  private tempFields: GridItem[] = [];

  private initialFields: GridItem[] = [
    { field: true, fieldName: 'Full Name', required: true },
    { field: true, fieldName: 'Age', required: false },
    { field: true, fieldName: 'Email', required: true },
    { field: true, fieldName: 'Address', required: true }
  ];

  constructor() {
    this.formFields = [...this.initialFields];
    this.tempFields = [...this.initialFields];
  }

  // Configure page methods
  getTempFields(): GridItem[] {
    return [...this.tempFields];
  }

  reorderTempFields(start: number, end: number): void {
    const [removed] = this.tempFields.splice(start, 1);
    this.tempFields.splice(end, 0, removed);
  }

  toggleTempFieldVisibility(fieldName: string): void {
    const field = this.tempFields.find(f => f.fieldName === fieldName);
    if (field) {
      field.field = !field.field;
      if (!field.field) field.required = false;
    }
  }

  toggleTempFieldRequired(fieldName: string): void {
    const field = this.tempFields.find(f => f.fieldName === fieldName);
    if (field && field.field) {
      field.required = !field.required;
    }
  }

  saveChanges(): void {
    this.formFields = [...this.tempFields];
  }


  getFormFields(): GridItem[] {
    return [...this.formFields];
  }
} 