import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ReportService {

    url_web_api: string;

    constructor(private _httpClient: HttpClient) { 
        this.url_web_api = "http://localhost:8080/";
        
      }

      public obtenerlistClient(pagina: number, registros: number): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('page',pagina.toString())
            .set('size', registros.toString());
        
        return this._httpClient.get(this.url_web_api + '/api', { params });
      }
}