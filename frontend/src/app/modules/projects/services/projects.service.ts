import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '@shared/interfaces/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUri = '/api/projects';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUri);
  }

  getAllProjectsShort(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectsUri}/short`);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.projectsUri}/${id}`);
  }

  createProject(data: FormData): Observable<Project> {
    return this.http.post<Project>(this.projectsUri, data);
  }

  updateProject(id: string, data: FormData): Observable<Project> {
    return this.http.put<Project>(`${this.projectsUri}/${id}`, data);
  }

  deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${this.projectsUri}/${id}`);
  }
}
