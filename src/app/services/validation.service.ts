import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientModel } from "../models/client.model";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import _dataSunatJson  from '../utils/dataSunat.json' ;
import { UsuarioModel } from "../models/usuario.model";


@Injectable()
export class ValidationService {

    dataRucLst : {
        tipoPersona : number,
        rucSunat    : string,
        numDocAdic  : string,
        razonSocial : string,
        estContr    : string,
        condDomi    : string,
        tipoVia     : string,
        nombVia     : string,
        numDomic    : string,
        intDomic    : string,
        loteDomic   : string,
        departamento: string,
        mznDomic    : string,
        kmDomic     : string,
        ubigeo      : string,
    }[] = _dataSunatJson;

    constructor(
        private http: HttpClient
    ){}

    public getRucDetail(ruc: string, numDocAdic : string) : UsuarioModel {
        let user : UsuarioModel = {};
        _dataSunatJson.forEach(x=>{
            if(x.rucSunat ==ruc && x.numDocAdic == numDocAdic){
                user.tipoPersona = x.tipoPersona  ;
                user.rucSunat    = x.rucSunat     ;
                user.numDocAdic  = x.numDocAdic   ;
                user.razonSocial = x.razonSocial  ;
                user.estContr    = x.estContr     ;
                user.tipoVia     = x.tipoVia      ;
                user.nombVia     = x.nombVia      ;
                user.numDomic    = x.numDomic     ;
                user.intDomic    = x.intDomic     ;
                user.loteDomic   = x.loteDomic    ;
                user.departamento= x.departamento ;
                user.mznDomic    = x.mznDomic     ;
                user.kmDomic     = x.kmDomic      ;
                user.ubigeo      = x.ubigeo       ;
                user.condDomi    = x.condDomi       ;
            }
        })
        return user;
    }

}
