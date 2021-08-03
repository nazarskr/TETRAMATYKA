import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { ProgramItem } from "@shared/interfaces/program";
import { ProgramService } from "./services/program.service";
import { ToasterService } from "@shared/services/toaster/toaster.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent extends UnsubscribeOnDestroy implements OnInit {
  public programList: ProgramItem[] = [];

  get isAddNew(): boolean {
    return this.programList.some(item => !item._id);
  }

  constructor(
    private _programService: ProgramService,
    private _toaster: ToasterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.mockProgram();
  }

  mockProgram(): void {
    this.programList = [
      {
        _id: 'aaaaaaa',
        title: {
          ua: 'Виставка',
          en: 'Exhibition'
        },
        info: {
          ua: 'Ай Вейвей',
          en: 'Ai Weiwei'
        },
        eventFullDate: new Date().toISOString(),
        showDay: true
      },
      {
        _id: 'bbbbbbb',
        title: {
          ua: 'Виставка 2',
          en: 'Exhibition 2'
        },
        info: {
          ua: 'Демієн Гьорст',
          en: 'Damien Hirst'
        },
        eventFullDate: new Date().toISOString(),
        showDay: false
      }
    ];
  }

  getAllProgramItems(): void {
    this._programService.getAllProgramItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ProgramItem[]) => {
        this.programList = res;
      })
  }

  addProgramItem(): void {
    this.programList.push({
      title: {
        ua: '',
        en: ''
      },
      info: {
        ua: '',
        en: ''
      },
      eventFullDate: null,
      editable: true
    })
  }

  cancelCreate(): void {
    this.programList = this.programList.filter(item => item._id);
  }

}
