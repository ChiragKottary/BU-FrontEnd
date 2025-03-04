import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() btnName: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() width: 'auto' | 'full' | 'half' = 'auto';
  @Input() active: boolean = false;
}
