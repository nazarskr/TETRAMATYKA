import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "@shared/interfaces/dialog";
import { ParticipantShort } from "@shared/interfaces/participants";
import { ParticipantsService } from "../../../participants/services/participants/participants.service";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-existing-participant-modal',
  templateUrl: './existing-participant-modal.component.html',
  styleUrls: ['./existing-participant-modal.component.scss']
})
export class ExistingParticipantModalComponent extends UnsubscribeOnDestroy implements OnInit {
  public participants: ParticipantShort[] = [];
  public selectedParticipant: ParticipantShort;

  get lang(): string {
    return this._translateService.currentLang;
  }

  constructor(
    public dialogRef: MatDialogRef<ExistingParticipantModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _participantsService: ParticipantsService,
    private _toaster: ToasterService,
    private _translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.participants = this.data.participants;
  }

  saveSelectedParticipant(): void {
    if (!this.selectedParticipant) {
      this._toaster.showErrorMessage('Select participant or cancel');
      return;
    }

    this.dialogRef.close(this.selectedParticipant._id);
  }

}
