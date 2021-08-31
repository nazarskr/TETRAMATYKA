import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item-details-primary',
  templateUrl: './item-details-primary.component.html',
  styleUrls: ['./item-details-primary.component.scss']
})
export class ItemDetailsPrimaryComponent implements OnInit {
  @Input() item: any;
  @Input() titleProp: string;
  @Input() descriptionProp: string;

  constructor() { }

  ngOnInit(): void {
  }

}
