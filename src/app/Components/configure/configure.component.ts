import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormStateService, GridItem } from '../services/form-state.service';
import { RowReorderEvent } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit, OnDestroy {
  public gridData: GridItem[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private formStateService: FormStateService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.formStateService.tempFields$.subscribe(fields => {
        this.gridData = fields;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onReOrder(event: RowReorderEvent): void {
    const start = event.draggedRows[0]?.rowIndex;
    const end = event.dropTargetRow?.rowIndex;

    if (start !== undefined && end !== undefined) {
      this.formStateService.reorderTempFields(start, end);
    }
  }

  public onFieldChange(dataItem: GridItem): void {
    this.formStateService.toggleTempFieldVisibility(dataItem.fieldName);
  }

  public onRequiredChange(dataItem: GridItem): void {
    this.formStateService.toggleTempFieldRequired(dataItem.fieldName);
  }

  sendRegisterData() {
    this.formStateService.saveChanges();
    this.router.navigate(['/register']);
  }
}
