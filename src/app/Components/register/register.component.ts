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
    this.formStateService.getFormFields().subscribe(fields => {
      this.formFields = fields;
      this.initializeForm();
    });
  }

  private initializeForm() {
    const formControls: any = {};
    this.fieldOrder = [];

    this.formFields.forEach(field => {
      if (field.field) {
        this.fieldOrder.push(field.fieldName);
        const validators = [];
        
        if (field.required) {
          validators.push(Validators.required);
        }

        if (field.fieldName === 'Full Name') {
          validators.push(Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/));
        }
        if (field.fieldName.toLowerCase() === 'age') {
          validators.push(Validators.pattern(/^(0*(?:[1-9][0-9]?|1[0-4][0-9]|150))$/));
        }
        if (field.fieldName.toLowerCase() === 'email') {
          validators.push(Validators.email);
        }

        formControls[field.fieldName] = ['', validators];
      }
    });

    this.memberForm = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.memberForm.valid) {
      console.log('Form submitted:', this.memberForm.value);
      // Handle form submission
    } else {
      this.markFormGroupTouched(this.memberForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // getErrorMessage(fieldName: string): string {
  //   const control = this.memberForm.get(fieldName);
  //   if (!control || !control.errors || !control.touched) return '';

  //   if (control.errors['required']) return `${fieldName} is required`;
  //   if (control.errors['email']) return 'Invalid email format';
  //   if (control.errors['pattern']) return 'Invalid format';

  //   return '';
  // }
}
