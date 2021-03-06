import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientModel } from "../models/client.model";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProspectService {

    constructor(
        private http: HttpClient
    ){}


}
