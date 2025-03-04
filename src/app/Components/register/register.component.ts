import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface GridItem {
  field: boolean;
  fieldName: string;
  required: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterData: GridItem[] = [];
  memberForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.memberForm = this.fb.group({});
  }

  ngOnInit() {
    // Get data from localStorage
    const savedData = localStorage.getItem('registerData');
    if (savedData) {
      this.RegisterData = JSON.parse(savedData);
      this.initializeForm();
    }
  }

  private initializeForm() {
    const formControls: any = {};
    
    this.RegisterData.forEach(field => {
      if (field.field) { // Only add controls for visible fields
        formControls[field.fieldName] = ['', field.required ? [Validators.required] : []];
        
        // Add specific validations based on field name
        if (field.fieldName.toLowerCase() === 'email') {
          formControls[field.fieldName].push(Validators.email);
        }
        if (field.fieldName.toLowerCase() === 'mobile') {
          formControls[field.fieldName].push(Validators.pattern('^[0-9]{10}$'));
        }
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

  getErrorMessage(fieldName: string): string {
    const control = this.memberForm.get(fieldName);
    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required']) return `${fieldName} is required`;
    if (control.errors['email']) return 'Invalid email format';
    if (control.errors['pattern']) return 'Invalid format';

    return '';
  }
}
