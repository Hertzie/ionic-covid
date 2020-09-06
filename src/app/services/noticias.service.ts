import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export default class NoticiasService {
  private baseUrl: string = "http://newsapi.org/v2/everything?q=coronavirus";
  private apiKey: string = "2f0d81a3ce5d498685bc58b32a3b8aa9";
  constructor(private http: HttpClient) {}

  getNoticias(
    pagina: number,
    idioma: string = "",
    fuente: string = "",
    pais: string = ""
  ): Observable<any[]> {
    // return this.http.get<any[]>(
    //   `http://newsapi.org/v2/everything?q=coronavirus&page=${pagina}&pageSize=100&language=es&sortBy=publishedAt&apiKey=${this.apiKey}`
    // );
    let url = `${this.baseUrl}&page=${pagina}`;

    if (idioma != "") {
      url += `&language=${idioma}`;
    }

    if (fuente != "") {
      url += `&sources=${fuente}`;
    }

    if (pais != "") {
      url += `&country=${pais}`;
    }

    url += `&apiKey=${this.apiKey}`;

    return this.http.get<any[]>(url);
  }

  getFuentes(): Observable<any[]> {
    return this.http.get<any[]>(
      `http://newsapi.org/v2/sources?apiKey=${this.apiKey}`
    );
  }
}
