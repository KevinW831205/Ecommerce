import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterQueryService {
  query$: Observable<string>;


  constructor() { }

  getQuery(){
    return this.query$;
  }

  setQuery(query: string){
    this.query$ = of(query);
  }
}
