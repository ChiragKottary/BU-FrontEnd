import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.css']
})
export class LabelInputComponent {
  @Input({required:true}) control!: FormControl;
  @Input({required:true}) FieldName!: string;
  @Input() inputType: 'text' | 'textarea' = 'text';
  constructor(){
    
  }
}
