import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackgroundService } from './Components/services/background.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Frontend-Project';
  backgroundImage: string | null = null;

  constructor(private backgroundService: BackgroundService) {}

  ngOnInit() {
    this.backgroundImage = this.backgroundService.getBackgroundImage();
    
    // Listen for background image changes
    window.addEventListener('backgroundImageChanged', this.updateBackgroundImage.bind(this));
  }

  ngOnDestroy() {
    // Clean up event listener
    window.removeEventListener('backgroundImageChanged', this.updateBackgroundImage.bind(this));
  }

  private updateBackgroundImage() {
    this.backgroundImage = this.backgroundService.getBackgroundImage();
  }
}
