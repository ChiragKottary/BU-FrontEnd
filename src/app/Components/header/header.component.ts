import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundService } from '../services/background.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedImage: string | null = null;

  constructor(
    private router: Router,
    private backgroundService: BackgroundService
  ) {}

  ngOnInit() {
    this.selectedImage = this.backgroundService.getBackgroundImage();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

   onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        this.selectedImage = imageData;
        this.backgroundService.setBackgroundImage(imageData);
        // Force app component to update
        window.dispatchEvent(new Event('backgroundImageChanged'));
      };
      reader.readAsDataURL(file);
    }
  }

  clearBackground(): void {
    this.selectedImage = null;
    this.backgroundService.setBackgroundImage('');
    localStorage.removeItem('headerImage');
    // Force app component to update
    window.dispatchEvent(new Event('backgroundImageChanged'));
  }
}
