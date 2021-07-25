import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from '@shared/directives/unsubscribe-on-destroy';
import { ArchiveYear } from '@shared/interfaces/admin';
import { ArchiveService } from '@shared/services/archive/archive.service';
import { filter, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { tableColumns } from '@shared/constants/table-columns';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from '@shared/components/simple-dialog/simple-dialog.component';
import { DataService } from '@shared/services/data/data.service';
import { ToasterService } from '@shared/services/toaster/toaster.service';

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
    private _archiveService: ArchiveService,
    private _dialog: MatDialog,
    private _dataService: DataService,
    private _toaster: ToasterService
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
      this._toaster.showWarningMessage('Select year');
      return;
    }
    this._archiveService.updateArchiveYears(this.archiveYears)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Archive years updated successfully');
        this.getAllArchiveYears();
        this.emitArchiveYearsUpdate();
      });
  }

  checkIfInvalid(): boolean {
    return !!this.archiveYears.find(archiveYear => !archiveYear.year);
  }

  openDeleteArchiveYearDialog(element: ArchiveYear): void {
    const dialogRef = this._dialog.open(SimpleDialogComponent, {
      data: {
        title: 'Delete archive year',
        message: `Are you sure you want to delete archive year ${element.year}?`
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => {
        this.deleteArchiveYear(element._id);
    });
  }

  deleteArchiveYear(id: string): void {
    this._archiveService.deleteArchiveYear(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._toaster.showMessage('Archive year deleted successfully');
        this.getAllArchiveYears();
        this.emitArchiveYearsUpdate();
      });
  }

  getYearsList(): void {
    this.yearsList = this._dataService.getYearsList();
  }

  emitArchiveYearsUpdate(): void {
    this._archiveService.archiveYearsUpdated$.next();
  }
}
