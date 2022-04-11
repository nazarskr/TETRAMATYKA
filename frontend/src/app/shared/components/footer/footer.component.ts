import {Component, OnInit} from '@angular/core';
import {Partner} from "@shared/interfaces/partners";
import {UnsubscribeOnDestroy} from "@shared/directives/unsubscribe-on-destroy";
import {PartnersService} from "@shared/services/partners/partners.service";
import {filter, takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {SimpleDialogComponent} from "@shared/components/simple-dialog/simple-dialog.component";
import {ToasterService} from "@shared/services/toaster/toaster.service";
import {AddPartnersComponent} from "@shared/components/footer/add-partners/add-partners.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends UnsubscribeOnDestroy implements OnInit {
  public footerLogos = [
    'NURT_logo.png', 'ucf_logo.png', 'logo_lmr.png', 'lviv_logo.png',
    'CUH_Logo_ukr.png', 'logotype_LEM.png', 'amp_logo.png',
    'EESEM_logo.png', 'audio_art.png', 'Lviv_misto_literatury.png',
    'logo_zemla.png', 'RadioGarage.png', 'krakow_logo.png', 'muzyka_centrum.png',
    'polish_institute.png', 'logo_iam.png', 'Ableton-Logo.png', 'oead.png', 'IFU_UA.png',
  ];

  public partners: Partner[] = [];

  constructor(
    private _partnersService: PartnersService,
    private _dialog: MatDialog,
    private _toaster: ToasterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getPartners();
  }

  getPartners(): void {
    this._partnersService.getPartners()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Partner[]) => {
        this.partners = res;
      })
  }

  openAddPartnersDialog(): void {
    const dialogRef = this._dialog.open(AddPartnersComponent, {
      width: '600px',
      data: {
        header: {
          en: 'Add partners',
          ua: 'Додати партнерів'
        },
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(res => !!res),
        takeUntil(this.destroy$)
      ).subscribe(() => {
      this.getPartners();
    })
  }

  openDeletePartnerDialog(id: string): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete partner',
        message: 'Are you sure you want to delete this partner?'
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(res => !!res),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.deletePartner(id);
      })
  }

  deletePartner(id: string): void {
    this._partnersService.deletePartner(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Partner deleted successfully');
      })
  }
}
