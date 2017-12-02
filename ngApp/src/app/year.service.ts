import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class YearService {
  private _getUrl = '/api_religion/years';

  constructor(private _http: Http) {
  }

  getYears() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }
}
