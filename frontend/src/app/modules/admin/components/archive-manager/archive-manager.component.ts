import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from '../../../shared/directives/unsubscribe-on-destroy';
import { ArchiveYear } from '../../../shared/interfaces/admin';
import { ArchiveService } from '../../../shared/services/archive/archive.service';
import { filter, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { tableColumns } from '../../../shared/constants/table-columns';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from '../../../shared/components/simple-dialog/simple-dialog.component';
import { DataService } from '../../../shared/services/data/data.service';

@Component({
  selector: 'app-archive-manager',
  templateUrl: './archive-manager.component.html',
  styleUrls: ['./archive-manager.component.scss']
})
export class ArchiveManagerComponent extends UnsubscribeOnDestroy implements OnInit {
  public archiveYears: ArchiveYear[] = [];
  public dataSource: MatTableDataSource<ArchiveYear>;
  public displayedColumns = tableColumns.archiveManager;

  public editMode = false;
  public yearsList: number[] = [];

  constructor(
    readonly _archiveService: ArchiveService,
    readonly _dialog: MatDialog,
    readonly _dataService: DataService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getYearsList();
    this.getAllArchiveYears();
  }

  getAllArchiveYears(): void {
    this._archiveService.getAllArchiveYears()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ArchiveYear[]) => {
        this.archiveYears = res;
        this.dataSource = new MatTableDataSource(this.archiveYears);
        this.editMode = false;
      });
  }

  addArchiveYear(): void {
    this.archiveYears.unshift({
      year: null,
      available: false,
      current: false
    });
    this.dataSource = new MatTableDataSource(this.archiveYears);
    this.editMode = true;
  }

  editArchiveYears(): void {
    this.editMode = true;
  }

  cancelEditing(): void {
    this.getAllArchiveYears();
  }

  changeCurrent(element: ArchiveYear): void {
    this.archiveYears.map(year => {
      year.current = false;
      return year;
    });
    element.current = true;
  }

  saveArchiveYears(): void {
    const formInvalid = this.checkIfInvalid();
    if (formInvalid) {
      alert('Please, select year');
      return;
    }
    this._archiveService.updateArchiveYears(this.archiveYears)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getAllArchiveYears();
      });
  }

  checkIfInvalid(): boolean {
    return !!this.archiveYears.find(archiveYear => !archiveYear.year);
  }

  openDeleteArchiveYearDialog(element: ArchiveYear): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent);

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.getAllArchiveYears();
    });
  }

  getYearsList(): void {
    this.yearsList = this._dataService.getYearsList();
  }

}
