import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "@shared/interfaces/dialog";
import { ParticipantShort } from "@shared/interfaces/participants";
import { ParticipantsService } from "../../../participants/services/participants/participants.service";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import { TranslateService } from "@ngx-translate/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: 'app-existing-participant-modal',
  templateUrl: './existing-participant-modal.component.html',
  styleUrls: ['./existing-participant-modal.component.scss']
})
export class ExistingParticipantModalComponent extends UnsubscribeOnDestroy implements OnInit {
  public participants: ParticipantShort[] = [];
  public selectedParticipant: ParticipantShort;
  public participantControl = new FormControl();
  public filteredParticipants: Observable<ParticipantShort[]>;

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
    this.initAutocomplete();
  }

  initAutocomplete(): void {
    this.filteredParticipants = this.participantControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter (value: string | ParticipantShort): ParticipantShort[] {
    let filterValue;
    if (this.isParticipant(value)) {
      filterValue = value.fullName[this.lang].toLowerCase();
    } else {
      filterValue = value.toLowerCase();
    }

    return this.participants.filter((participant: ParticipantShort) => {
      return participant.fullName['en'].toLowerCase().includes(filterValue)
              || participant.fullName['ua'].toLowerCase().includes(filterValue);
    });
  }

  isParticipant(value: string | ParticipantShort): value is ParticipantShort {
    return !!(value as ParticipantShort).fullName;
  }

  saveSelectedParticipant(): void {
    if (!this.selectedParticipant) {
      this._toaster.showErrorMessage('Select participant or cancel');
      return;
    }

    this.dialogRef.close(this.selectedParticipant._id);
  }

  selectParticipant(): void {
    this.selectedParticipant = {...this.participantControl.value};
    this.participantControl.setValue(this.selectedParticipant.fullName[this.lang]);
  }

}
