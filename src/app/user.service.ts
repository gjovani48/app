import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string =  'http://localhost:80';

  constructor(private http: HttpClient) { }

  //get All users
    getUsers(): Observable <User[]>{

        return this.http.get<User[]>(this.url + '/users');

    }


    //find user By ID
    getOneUser(id): Observable <any>{

      return this.http.get<any>(this.url + '/users/' + id);

    }



    private headers = new HttpHeaders().set('Content-Type','application/json');

    addUsers(user): Observable <any>{

      return this.http.post<any>(

          this.url + '/users',
          user,
          {headers: this.headers}

        );
    }

    updateUsers(user,id): Observable <any>{

      return this.http.put<any>(

          this.url + '/users/'+id,
          user,
          {headers: this.headers}

        );
    }

    removeUsers(id): Observable <User[]>{

      return this.http.delete<any>(this.url + '/users/'+id);

    }

}
