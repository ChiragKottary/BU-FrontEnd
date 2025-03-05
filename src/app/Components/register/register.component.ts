import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormStateService, GridItem } from '../services/form-state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  memberForm: FormGroup;
  fieldOrder: string[] = [];
  formFields: GridItem[] = [];

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
    this.memberForm = this.fb.group({});
  }

  ngOnInit() {
    this.loadFormFields();
  }

  private loadFormFields(): void {
    this.formFields = this.formStateService.getFormFields();
    this.initializeForm();
  }

  private initializeForm(): void {
    const formControls: any = {};
    this.fieldOrder = [];

    this.formFields.forEach(field => {
      if (field.field) {
        this.fieldOrder.push(field.fieldName);
        const validators = this.getValidators(field);
        formControls[field.fieldName] = ['', validators];
      }
    });

    this.memberForm = this.fb.group(formControls);
  }

  private getValidators(field: GridItem): any[] {
    const validators = [];
    
    if (field.required) {
      validators.push(Validators.required);
    }

    switch (field.fieldName) {
      case 'Full Name':
        validators.push(
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z\s]+$/)
        );
        break;
      case 'Age':
        validators.push(
          Validators.pattern(/^(0*(?:[1-9][0-9]?|1[0-4][0-9]|150))$/)
        );
        break;
      case 'Email':
        validators.push(Validators.email);
        break;
    }

    return validators;
  }

  onSubmit(): void {
    if (this.memberForm.valid) {
      console.log('Form submitted:', this.memberForm.value);
    } else {
      this.markFormGroupTouched(this.memberForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
