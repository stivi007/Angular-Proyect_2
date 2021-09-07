import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey:string= 'aFAbHAjSWDZLF0dMIhu7KVkoa1giTh3E';
  private APIurl:string='http://api.giphy.com/v1/gifs';
  private _historial:string[]=[];
  public resultados:Gif[]=[];

  get historial(){
    
    return [...this._historial];
  }

  constructor(private http:HttpClient){
    this._historial= JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('automatico')!) || [];
  }

  buscarGifs(query:string){
    query = query.toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this._historial));
      
    }

    const params = new HttpParams()
                                  .set('api_key',this.apikey)
                                  .set('limit','10')
                                  .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.APIurl}/search`,{params})
    .subscribe(res =>{
 
      this.resultados=res.data;
      localStorage.setItem('automatico',JSON.stringify(this.resultados));
    });

  }
}
