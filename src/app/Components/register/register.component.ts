import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
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
    private formStateService: FormStateService,
    private notificationService: NotificationService
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
      case 'Phone Number':
        validators.push(
          Validators.pattern(/^(?:\+\d{1,3}\s?)?(?:\(\d{1,4}\)\s?)?(?:\d{1,4}[-\s]?){1,}(?:\d{1,4})$/),
          Validators.minLength(10),
          Validators.maxLength(10)
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
      this.memberForm.reset();
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
