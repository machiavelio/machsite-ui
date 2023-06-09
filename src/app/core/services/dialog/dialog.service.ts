import { Injectable, Type } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { race } from "rxjs";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private readonly matDialog: MatDialog) {}

  open<T>(component: Type<T>, config: MatDialogConfig = {}): MatDialogRef<T> {
    return this.openDialog(component, config);
  }

  openMini<T>(component: Type<T>, config: MatDialogConfig = {}): MatDialogRef<T> {
    config.width = "300px";

    return this.openDialog(component, config);
  }

  openSmall<T>(component: Type<T>, config: MatDialogConfig = {}): MatDialogRef<T> {
    config.width = "500px";

    return this.openDialog(component, config);
  }

  openMedium<T>(component: Type<T>, config: MatDialogConfig = {}): MatDialogRef<T> {
    config.width = "850px";

    return this.openDialog(component, config);
  }

  openLarge<T>(component: Type<T>, config: MatDialogConfig = {}): MatDialogRef<T> {
    config.width = "1200px";

    return this.openDialog(component, config);
  }

  openFull<T>(component: Type<T>, config: MatDialogConfig = {}): MatDialogRef<T> {
    config.width = "100dvw";
    config.height = "100dvh";

    return this.openDialog(component, config);
  }

  openConfirm(message?: string, yes?: string, no?: string) {
    const dialog = this.openMini(ConfirmDialogComponent);
    const instance = dialog.componentInstance;

    instance.message = message ?? instance.message;
    instance.yes = yes ?? instance.yes;
    instance.no = no ?? instance.no;

    instance.confirmed.subscribe(() => {
      dialog.close();
    });

    return {
      confirmed: instance.confirmed,
      yesed: instance.yesed,
      noed: instance.noed,
    };
  }

  private openDialog<T>(component: Type<T>, config: MatDialogConfig = {}): MatDialogRef<T> {
    config.maxWidth ??= "100dvw";
    config.maxHeight ??= "100dvh";
    config.autoFocus ??= true;
    config.restoreFocus ??= true;
    config.closeOnNavigation ??= true;
    config.disableClose ??= true;

    return this.matDialog.open(component, config) as MatDialogRef<T>;
  }
}
