import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Fruit} from "../../models/fruit";

@Component({
  selector: 'app-fruit-dialog',
  templateUrl: './fruit-dialog.component.html',
  styleUrls: ['./fruit-dialog.component.scss']
})
export class FruitDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<FruitDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Fruit
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
