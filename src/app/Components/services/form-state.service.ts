import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface GridItem {
  field: boolean;
  fieldName: string;
  required: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private formFieldsSubject = new BehaviorSubject<GridItem[]>([]);
  private tempFieldsSubject = new BehaviorSubject<GridItem[]>([]);
  
  formFields$ = this.formFieldsSubject.asObservable();
  tempFields$ = this.tempFieldsSubject.asObservable();

  private initialFields: GridItem[] = [
    { field: true, fieldName: 'Full Name', required: true },
    { field: true, fieldName: 'Age', required: false },
    { field: true, fieldName: 'Email', required: true },
    { field: true, fieldName: 'Address', required: true }
  ];

  constructor() {
    this.formFieldsSubject.next([...this.initialFields]);
    this.tempFieldsSubject.next([...this.initialFields]);
  }

  // Configure page methods
  getTempFields(): GridItem[] {
    return this.tempFieldsSubject.value;
  }

  reorderTempFields(start: number, end: number): void {
    const currentFields = [...this.tempFieldsSubject.value];
    const [removed] = currentFields.splice(start, 1);
    currentFields.splice(end, 0, removed);
    this.tempFieldsSubject.next(currentFields);
  }

  toggleTempFieldVisibility(fieldName: string): void {
    const currentFields = [...this.tempFieldsSubject.value];
    const field = currentFields.find(f => f.fieldName === fieldName);
    if (field) {
      field.field = !field.field;
      if (!field.field) field.required = false;
      this.tempFieldsSubject.next(currentFields);
    }
  }

  toggleTempFieldRequired(fieldName: string): void {
    const currentFields = [...this.tempFieldsSubject.value];
    const field = currentFields.find(f => f.fieldName === fieldName);
    if (field && field.field) {
      field.required = !field.required;
      this.tempFieldsSubject.next(currentFields);
    }
  }

  // Save changes from configure to register
  saveChanges(): void {
    const currentTempFields = [...this.tempFieldsSubject.value];
    this.formFieldsSubject.next(currentTempFields);
  }

  // Register page methods
  getFormFields(): Observable<GridItem[]> {
    return this.formFields$;
  }

  reorderFields(start: number, end: number): void {
    const currentFields = [...this.formFieldsSubject.value];
    const [removed] = currentFields.splice(start, 1);
    currentFields.splice(end, 0, removed);
    this.formFieldsSubject.next(currentFields);
  }

  toggleFieldVisibility(fieldName: string): void {
    const currentFields = [...this.formFieldsSubject.value];
    const field = currentFields.find(f => f.fieldName === fieldName);
    if (field) {
      field.field = !field.field;
      if (!field.field) field.required = false;
      this.formFieldsSubject.next(currentFields);
    }
  }

  toggleFieldRequired(fieldName: string): void {
    const currentFields = [...this.formFieldsSubject.value];
    const field = currentFields.find(f => f.fieldName === fieldName);
    if (field && field.field) {
      field.required = !field.required;
      this.formFieldsSubject.next(currentFields);
    }
  }
} 