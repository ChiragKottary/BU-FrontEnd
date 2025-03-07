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
  private registeredMembers: any[] = [];

  private initialFields: GridItem[] = [
    { field: true, fieldName: 'Full Name', required: true },
    { field: true, fieldName: 'Phone Number', required: false },
    { field: true, fieldName: 'Email', required: true },
    { field: true, fieldName: 'Address', required: true }
  ];

  constructor() {
    this.resetToDefault();
  }

  private resetToDefault(): void {
    const defaultFields: GridItem[] = [
      { field: true, fieldName: 'Full Name', required: true },
      { field: true, fieldName: 'Phone Number', required: true },
      { field: true, fieldName: 'Email', required: true },
      { field: true, fieldName: 'Address', required: false }
    ];
    this.formFields = [...defaultFields];
    this.tempFields = JSON.parse(JSON.stringify(defaultFields));
  }

  // Methods for temporary state (Configure page)
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
      if (!field.field) {
        field.required = false;
      }
    }
  }

  toggleTempFieldRequired(fieldName: string): void {
    const field = this.tempFields.find(f => f.fieldName === fieldName);
    if (field && field.field) {
      field.required = !field.required;
    }
  }

  // Save changes from temporary to permanent state
  saveChanges(): void {
    this.formFields = JSON.parse(JSON.stringify(this.tempFields));
  }

  // Cancel changes and reset temporary state
  cancelChanges(): void {
    this.tempFields = JSON.parse(JSON.stringify(this.formFields));
  }

  // Methods for permanent state (Register page)
  getFormFields(): GridItem[] {
    return this.formFields;
  }

  updateFormFields(fields: GridItem[]): void {
    this.formFields = fields;
  }

  // Storage methods
  saveRegisteredMember(formData: any): void {
    this.registeredMembers.push({
      ...formData,
      submittedAt: new Date().toISOString()
    });
  }

  getRegisteredMembers(): any[] {
    return this.registeredMembers;
  }

  // Validation methods
  checkNameExists(name: string): boolean {
    if (!name || name.trim() === '') return false;
    return this.registeredMembers.some(member =>
      member['Full Name']?.toLowerCase() === name.toLowerCase()
    );
  }

  checkPhoneExists(phone: string): boolean {
    if (!phone || phone.trim() === '') return false;
    return this.registeredMembers.some(member =>
      member['Phone Number'] === phone
    );
  }

  checkEmailExists(email: string): boolean {
    if (!email || email.trim() === '') return false;
    return this.registeredMembers.some(member =>
      member['Email']?.toLowerCase() === email.toLowerCase()
    );
  }
} 