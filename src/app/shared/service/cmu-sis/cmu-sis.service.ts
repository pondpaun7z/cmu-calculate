import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { AppConstantModule } from '../../../app-constant.module'

@Injectable()
export class CmuSisService {
  constructor(
    private http: Http) {}

  getStudentEnroll(email: string, password: string) {
    return this.http.post(
      `${AppConstantModule.API_ENDPOINT}/student/enrolled`,
      JSON.stringify({'params': {'UserName': email, 'Password': password}})
    ).map(response => response.json())
  }
}
