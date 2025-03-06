import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  
  private getStoredMembers(): any[] {
    return JSON.parse(localStorage.getItem('registeredMembers') || '[]');
  }

  nameExists(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
      return new Promise(resolve => {
        // Skip validation for empty strings
        if (!control.value || control.value.trim() === '') {
          resolve(null);
          return;
        }

        setTimeout(() => {
          const members = this.getStoredMembers();
          const exists = members.some(member => 
            member['Full Name']?.toLowerCase() === control.value?.toLowerCase()
          );
          resolve(exists ? { nameExists: true } : null);
        }, 500); // Simulate server delay
      });
    };
  }

  emailExists(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
      return new Promise(resolve => {
        setTimeout(() => {
          const members = this.getStoredMembers();
          const exists = members.some(member => 
            member['Email']?.toLowerCase() === control.value?.toLowerCase()
          );
          resolve(exists ? { emailExists: true } : null);
        }, 500);
      });
    };
  }

  phoneExists(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
      return new Promise(resolve => {
        setTimeout(() => {
          const members = this.getStoredMembers();
          const exists = members.some(member => 
            member['Phone Number'] === control.value
          );
          resolve(exists ? { phoneExists: true } : null);
        }, 500);
      });
    };
  }
} 