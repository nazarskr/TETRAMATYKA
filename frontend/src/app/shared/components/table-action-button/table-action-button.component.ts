import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-action-button',
  templateUrl: './table-action-button.component.html',
  styleUrls: ['./table-action-button.component.scss']
})
export class TableActionButtonComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() tooltipText: string;
  @Input() icon: string;
  @Input() cssClass: string = '';
  @Input() isDisabled: boolean = false;
  @Output() clickAction = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}
