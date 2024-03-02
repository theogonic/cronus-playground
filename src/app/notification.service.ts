import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  error(err: Error | string) {
    const message = typeof err === 'string' ? err : err.message;
    this.snackBar.open(message, 'Error', {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-warn'],
    });
  }

  success(msg: string) {
    this.snackBar.open(msg, 'Success', {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
  }
}
