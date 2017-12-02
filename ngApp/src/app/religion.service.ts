import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReligionService {
  private _getUrl = '/api_religion/religions';

  constructor(private _http: Http) {
  }

  getReligions() {
    return this._http.get(this._getUrl)
      .map((response: Response) => response.json());
  }
}

