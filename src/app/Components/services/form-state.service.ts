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
    { field: true, fieldName: 'Phone Number', required: false },
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

  // Storage methods
  saveToLocalStorage(formData: any): void {
    const existingData = this.getFromLocalStorage();
    existingData.push({
      ...formData,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('registeredMembers', JSON.stringify(existingData));
  }

  getFromLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem('registeredMembers') || '[]');
  }

  // Validation methods
  checkNameExists(name: string): boolean {
    if (!name || name.trim() === '') return false;
    const existingData = this.getFromLocalStorage();
    return existingData.some(member => 
      member['Full Name']?.toLowerCase() === name.toLowerCase()
    );
  }

  checkPhoneExists(phone: string): boolean {
    if (!phone || phone.trim() === '') return false;
    const existingData = this.getFromLocalStorage();
    return existingData.some(member => 
      member['Phone Number'] === phone
    );
  }

  checkEmailExists(email: string): boolean {
    if (!email || email.trim() === '') return false;
    const existingData = this.getFromLocalStorage();
    return existingData.some(member => 
      member['Email']?.toLowerCase() === email.toLowerCase()
    );
  }
} 