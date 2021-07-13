import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ArchiveService } from '@shared/services/archive/archive.service';
import { ArchiveYear } from '@shared/interfaces/admin';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { takeUntil } from 'rxjs/operators';
import { ArchiveYearBlock, HarpString } from '@shared/interfaces/archive';
import { style, transition, trigger, useAnimation } from '@angular/animations';
import { harpStrings } from '@shared/constants/harp-strings';
import { harpAnimation } from '@shared/constants/harp-animation';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  animations: [
    trigger('trembling', [
      transition('stop => start', useAnimation(harpAnimation)),
      transition('start => stop', style({
        boxShadow: 'none',
        width: '2px',
        borderRadius: '0',
        transform: 'none'
      }))
    ]),
  ],
})
export class ArchiveComponent extends UnsubscribeOnDestroy implements OnInit, AfterViewInit {
  @ViewChildren('harpStringsRef') harpStringsRef: QueryList<ElementRef>;
  public archiveYearBlocks: ArchiveYearBlock[] = [];
  public harpStrings: HarpString[] = harpStrings;
  public canPlaySample = false;
  public audioContext: AudioContext;
  public playListBuffer: AudioBuffer[] = [];

  constructor(
    readonly _archiveService: ArchiveService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getArchiveYears();
    this.loadContext();
  }

  ngAfterViewInit(): void {
    this.defineStringsPosition();
  }

  getArchiveYears(): void {
    this._archiveService.getAllArchiveYears()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ArchiveYear[]) => {
        this.archiveYearBlocks = res.map(item => {
          return {
            archiveYear: item
          };
        });
      });
  }

  defineStringsPosition(): void {
    for (const [index, harpString] of this.harpStringsRef.toArray().entries()) {
      this.harpStrings[index].xPosition = harpString.nativeElement.offsetLeft;
    }
  }

  loadContext(): void {
    this.audioContext = new AudioContext();
    this.loadSamples();
  }

  async loadSamples(): Promise<any> {
    for (let i = 0; i < 12; i++) {
      const url = `assets/harp_samples/harp-${i}.mp3`;
      const request = new XMLHttpRequest();
      request.open('GET',  url, true);
      request.responseType = 'arraybuffer';

      request.onload = () => {
        this.audioContext.decodeAudioData(request.response, (buffer) => {
          if (!buffer) {
            alert('error decoding file data: ');
            return;
          }

          this.playListBuffer.push(buffer);
          if ( i === 11 ) {
            this.canPlaySample = true;
          }
        }, err => console.log(err));

      };
      await request.send();
    }
  }

  async preparePlayingSample(harpString: HarpString, index: number): Promise<any> {
    if (!this.canPlaySample) {
      return;
    }
    const element = this.harpStringsRef.toArray()[index].nativeElement;
    const source = await this.audioContext.createBufferSource();
    const sampleNumber = Math.floor(Math.random() * 11);
    source.buffer = this.playListBuffer[sampleNumber];
    await source.connect(this.audioContext.destination);
    harpString.trembling = false;
    this.playSample(element, source, harpString);
  }

  playSample(element: HTMLElement, sampleSource: AudioBufferSourceNode, harpString: HarpString): void {
    sampleSource.start();
    harpString.trembling = true;
  }

  finishStringAnimation(harpString: HarpString): void {
    harpString.trembling = false;
  }

  onResize(): void {
    this.defineStringsPosition();
  }
}
