import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-details-secondary',
  templateUrl: './item-details-secondary.component.html',
  styleUrls: ['./item-details-secondary.component.scss']
})
export class ItemDetailsSecondaryComponent implements OnInit {
  @Input() item: any;
  @Input() titleProp: string;
  @Input() descriptionProp: string;

  constructor() { }

  ngOnInit(): void {
  }

}
