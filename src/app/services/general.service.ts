import { UbigeoModel } from 'src/app/models/ubigeo.model';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientModel } from "../models/client.model";
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import _departmentJson  from '../utils/department.json' ;
import _provinceJson  from '../utils/province.json' ;
import _districtJson  from '../utils/district.json' ;
import _domainJson  from '../utils/domain.json' ;


@Injectable()
export class GeneralService {

    departmentlist : {
        coDepa: String
        nombre_ubigeo: String;
        codigo_ubigeo: String;
        etiqueta_ubigeo: String;
        buscador_ubigeo: String;
        numero_hijos_ubigeo: String;
        nivel_ubigeo: String;
        id_padre_ubigeo: String;
    }[] = _departmentJson;

    provincelist : {
        coProv: String
        nombre_ubigeo: String;
        codigo_ubigeo: String;
        etiqueta_ubigeo: String;
        buscador_ubigeo: String;
        numero_hijos_ubigeo: String;
        nivel_ubigeo: String;
        id_padre_ubigeo: String;
    }[] = _provinceJson;

    districtlist : {
        coDist: String
        nombre_ubigeo: String;
        codigo_ubigeo: String;
        etiqueta_ubigeo: String;
        buscador_ubigeo: String;
        numero_hijos_ubigeo: String;
        nivel_ubigeo: String;
        id_padre_ubigeo: String;
    }[] = _districtJson;

    domainList : {
        id: number;
        value : string;
    }[] = _domainJson;

    constructor(
        private http: HttpClient
    ){}

    public getDomainList(){
        return _domainJson;
    }

    public getDepartment() {
        return _departmentJson;
    }

    public getProvince(codDepartamento : string): UbigeoModel[]{
        let lstProvince : UbigeoModel[] = [];
        _provinceJson.forEach(x=>{
            if(x.id_padre_ubigeo == codDepartamento){
                let ubigeo : UbigeoModel = {};
                ubigeo.coProv = x.coProv;
                ubigeo.nombre_ubigeo = x.nombre_ubigeo;
                lstProvince.push(ubigeo);
            }
            
        })
        return lstProvince;
    }

    public getDistrict(codProv : string): UbigeoModel[]{
        let lstDistrict : UbigeoModel[] = [];
        _districtJson.forEach(x=>{
            if(x.id_padre_ubigeo == codProv){
                let ubigeo : UbigeoModel = {};
                ubigeo.coDist = x.coDist;
                ubigeo.nombre_ubigeo = x.nombre_ubigeo;
                lstDistrict.push(ubigeo);
            }
            
        })
        return lstDistrict;
    }

}
