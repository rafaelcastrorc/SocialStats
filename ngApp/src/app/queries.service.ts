import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QueriesService {
  private _getUrl = '/api_religion/queries';

  constructor(private _http: Http) {
  }

  // Calls the server to return the number of followers of a  religion in a  country
  getNumberOfFollowers(country, year, religion) {
    return this._http.get(this._getUrl + '/' + country + '/' + year + '/' + religion)
      .map((response: Response) => response.json());
  }
}
