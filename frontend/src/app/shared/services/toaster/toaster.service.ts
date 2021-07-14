import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition
  };

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string): void {
    this.config.panelClass = 'show-message';
    this.snackBar.open(message, 'X', this.config);
  }

  showWarningMessage(message: string): void {
    this.config.panelClass = 'show-warning-message';
    this.snackBar.open(message, 'X', this.config);
  }

  showErrorMessage(message: string): void {
    this.config.panelClass = 'show-error-message';
    this.snackBar.open(message, 'X', this.config);
  }
}
