import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[UnsubscribeOnDestroy]'
})

export class UnsubscribeOnDestroy implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
