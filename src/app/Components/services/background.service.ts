import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private backgroundImage: string | null = null;

  constructor() {
    // Load saved background image from localStorage
    this.backgroundImage = localStorage.getItem('headerImage');
  }

  setBackgroundImage(image: string) {
    this.backgroundImage = image;
    localStorage.setItem('headerImage', image);
  }

  getBackgroundImage(): string | null {
    return this.backgroundImage;
  }
} 