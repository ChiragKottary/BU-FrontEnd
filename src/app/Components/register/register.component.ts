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
        validators.push(
          // Must be exactly 10 digits
          Validators.minLength(10),
          Validators.maxLength(10),
          // Must contain only numbers
          Validators.pattern(/^[0-9]+$/)
        );
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
        this.formStateService.saveRegisteredMember(formData);

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

  // Helper method to get stored data
  getStoredMembers(): any[] {
    return this.formStateService.getRegisteredMembers();
  }
}
