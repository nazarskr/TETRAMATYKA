import { Component, OnInit } from '@angular/core';
import { ProjectShort } from "@shared/interfaces/projects";
import { UnsubscribeOnDestroy } from "@shared/directives/unsubscribe-on-destroy";
import { ProjectsService } from "./services/projects.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends UnsubscribeOnDestroy implements OnInit {
  public projects: ProjectShort[] = [];

  constructor(private _projectsService: ProjectsService) {
    super();
  }

  ngOnInit(): void {
    this.getAllProjectsShort();
  }

  getAllProjectsShort(): void {
    this._projectsService.getAllProjectsShort()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ProjectShort[]) => {
        // TODO: remove mock
        //this.projects = res;
        this.projects = [
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8'},
          {title: {ua: 'Тестовийтест тест проект', en: 'Testtest test project'}, _id: '6123af2db57f9822c89e2ec8'},
        ]
      })
  }

}
