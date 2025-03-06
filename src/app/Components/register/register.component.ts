import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { FormStateService, GridItem } from '../services/form-state.service';
import { CustomValidators } from './register.validators';
import { ValidationService } from '../services/validation.service';

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
    private formStateService: FormStateService,
    private notificationService: NotificationService,
    private validationService: ValidationService
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
        const validatorConfig = this.getValidators(field);
        formControls[field.fieldName] = ['', {
          validators: validatorConfig.validators,
          asyncValidators: validatorConfig.asyncValidators
        }];
      }
    });

    this.memberForm = this.fb.group(formControls);
  }

  private getValidators(field: GridItem): { 
    validators: ValidatorFn[], 
    asyncValidators: AsyncValidatorFn[] 
  } {
    const validators: ValidatorFn[] = [];
    const asyncValidators: AsyncValidatorFn[] = [];
    
    if (field.required) {
      validators.push(Validators.required);
    }

    switch (field.fieldName) {
      case 'Full Name':
        validators.push(
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z\s]+$/)
        );
        asyncValidators.push(this.validationService.nameExists());
        break;
      case 'Phone Number':
        // Only add maxLength validator first
        validators.push(Validators.maxLength(10));
        // Custom validator that only checks pattern if length is valid
        validators.push((control: AbstractControl) => {
          if (!control.value) return null;
          if (control.value.length > 10) return null; // Let maxLength error take precedence
          
          const phonePattern = /^[0-9]{10}$/;
          return phonePattern.test(control.value) ? null : { invalidPhone: true };
        });
        asyncValidators.push(this.validationService.phoneExists());
        break;
      case 'Email':
        validators.push(Validators.email);
        asyncValidators.push(this.validationService.emailExists());
        break;
    }

    return { validators, asyncValidators };
  }

  onSubmit(): void {
    if (this.memberForm.valid) {
      const formData = this.memberForm.value;
      
      // Check if ALL fields are empty
      const allFieldsEmpty = Object.values(formData).every(value => 
        value === null || 
        value === undefined || 
        value === '' || 
        (typeof value === 'string' && value.trim() === '')
      );

      if (!allFieldsEmpty) {
        // Get existing data from localStorage or initialize empty array
        const existingData = JSON.parse(localStorage.getItem('registeredMembers') || '[]');
        
        // Add new form data with timestamp
        const newEntry = {
          ...formData,
          submittedAt: new Date().toISOString()
        };
        
        // Add to existing data
        existingData.push(newEntry);
        
        // Save back to localStorage
        localStorage.setItem('registeredMembers', JSON.stringify(existingData));

        // Show success notification
        this.notificationService.show({
          content: 'Registration Successful!',
          cssClass: 'success-notification fade-out',
          animation: { 
            type: 'fade',
            duration: 400
          },
          position: { 
            horizontal: 'center', 
            vertical: 'top' 
          },
          type: { 
            style: 'success', 
            icon: true 
          },
          closable: false,
          hideAfter: 2000
        });

        // Reset form after successful submission
        this.memberForm.reset();
      } else {
        // Show error notification for all empty fields
        this.notificationService.show({
          content: 'Please fill at least one field',
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

  // Helper method to get stored data (optional)
  getStoredMembers(): any[] {
    return JSON.parse(localStorage.getItem('registeredMembers') || '[]');
  }
}
