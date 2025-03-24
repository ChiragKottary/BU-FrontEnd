import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { FormStateService, GridItem } from '../services/form-state.service';
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
  private maxLengthConfig: { [key: string]: number } = {
    'Phone Number': 10,
    'Full Name': 25,
    'Email': 50,
  };
  private defaultMaxLength: number = 200;


  getMaxLength(fieldName: string): number {
    return this.maxLengthConfig[fieldName] || this.defaultMaxLength;
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
          Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)
        );
        asyncValidators.push(this.validationService.nameExists());
        break;
      case 'Phone Number':
        validators.push(

          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]+$/)
        );
        asyncValidators.push(this.validationService.phoneExists());
        break;
      case 'Email':
        validators.push(Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/));
        asyncValidators.push(this.validationService.emailExists());
        break;
      case 'Address':
        validators.push(Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ,.\-#]+$/));
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

        // Verify storage
        const isStoredInLocalStorage = this.verifyStorage();
        const storageStatus = isStoredInLocalStorage ? 'Data stored in localStorage' : 'Warning: Data not stored in localStorage';

        // Show success notification with storage status
        this.notificationService.show({
          content: `Registration Successful! ${storageStatus}`,
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
          hideAfter: 3000
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

  // Add method to verify storage
  private verifyStorage(): boolean {
    return this.formStateService.checkStoredData();
  }


}
