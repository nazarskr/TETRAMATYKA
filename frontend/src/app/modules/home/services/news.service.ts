import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsItem } from '@shared/interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsUri = '/api/news';

  constructor(private http: HttpClient) { }

  getAllNewsItems(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.newsUri);
  }

  getNewsItemById(id: string): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.newsUri}/${id}`);
  }

  createNewsItem(data: FormData): Observable<NewsItem> {
    return this.http.post<NewsItem>(this.newsUri, data);
  }

  updateNewsItem(id: string, data: FormData): Observable<NewsItem> {
    return this.http.put<NewsItem>(`${this.newsUri}/${id}`, data);
  }

  deleteNewsItem(id: string): Observable<NewsItem> {
    return this.http.delete<NewsItem>(`${this.newsUri}/${id}`);
  }
}
