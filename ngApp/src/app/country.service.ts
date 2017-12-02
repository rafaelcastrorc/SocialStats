import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CountryService {
  private _getUrl = '/api_religion/countries';

  constructor(private _http: Http) {
  }

  getCountries() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());

  }
}

