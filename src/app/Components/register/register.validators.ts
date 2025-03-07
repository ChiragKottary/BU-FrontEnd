import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { FormStateService } from '../services/form-state.service';

export class CustomValidators {
  static createNameExistsValidator(formStateService: FormStateService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise(resolve => {
        const exists = formStateService.checkNameExists(control.value);
        resolve(exists ? { nameExists: true } : null);
      });
    };
  }

  static createPhoneExistsValidator(formStateService: FormStateService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise(resolve => {
        const exists = formStateService.checkPhoneExists(control.value);
        resolve(exists ? { phoneExists: true } : null);
      });
    };
  }

  static createEmailExistsValidator(formStateService: FormStateService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise(resolve => {
        const exists = formStateService.checkEmailExists(control.value);
        resolve(exists ? { emailExists: true } : null);
      });
    };
  }
} 