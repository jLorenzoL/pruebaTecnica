import { ReCaptchaV3Service } from 'ng-recaptcha';
import { DomainModel } from './../../../models/domain.model';
import { map } from 'rxjs/operators';
import { ProspectService } from './../../../services/prospect.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ClientModel } from 'src/app/models/client.model';
import { generateConfirmStructure, showMessage } from 'src/app/utils/utilities';
import Swal from 'sweetalert2';
import { GeneralService } from 'src/app/services/general.service';
import { Observable } from 'rxjs';
import { UbigeoModel } from 'src/app/models/ubigeo.model';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';
import { MailService } from 'src/app/services/mail.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styles: []
})

export class ProspectComponent implements OnInit  {

  prospectForm : FormGroup;
  lstDepartamento : UbigeoModel[] = [];
  lstProvince : UbigeoModel[] = [];
  lstDistrict : UbigeoModel[] = [];
  fldOtherMail : boolean = false;
  lstEmailActive : boolean = true;
  lstDomain = [];

  animal: string;
  name: string;

  siteKey : string;
  recaptcha : any[];


  constructor(
    private fb: FormBuilder,
    private _prospectService : ProspectService,
    private _generalService : GeneralService,
    private dialog: MatDialog,
    private http : MailService,
    private router: Router,
  ) { 
    // this.siteKey = '6LdnJnIaAAAAAP-C_GsxwCl-xguZH8RL1WH_EYjJ'
  }

  ngOnInit() {
     this.buildProspectForm();
     this.loadDepartmentCbo();
     this.loadDomain();
  }

  resolved(captchaResponse : any){
    this.recaptcha = captchaResponse;
  }

  buildProspectForm(){
    this.prospectForm = this.fb.group({
      nameFormControl: [ '', {validators : [Validators.required, Validators.pattern("^[a-zA-Z]+$")]}  ],
      LastNameFormControl: [ '', {validators : [Validators.required, Validators.pattern("^[a-zA-Z]+$")]}  ],
      LastNameMFormControl: [ '', {validators : [Validators.required, Validators.pattern("^[a-zA-Z]+$")]}  ],
      emailFormControl: [ '', { validators : [Validators.required,Validators.pattern("^[a-z0-9+_.-]+$") ]} ],
      listEmailFormControl: [ '0', Validators.required ],
      isRucFormControl: [ '0', Validators.required ],
      departmentFormControl: [ '0', Validators.required  ],
      provinceFormControl: [ '0', Validators.required  ],
      districtFormControl: [ '0', Validators.required  ],
    });
  }

  get f() { return this.prospectForm.controls; }

  getValuesOfForm() : ClientModel {
    var clientModel : ClientModel = {};
    clientModel.name = this.f.nameFormControl.value;
    clientModel.lastName = this.f.LastNameFormControl.value;
    clientModel.lastNameM = this.f.LastNameMFormControl.value;
    clientModel.email = this.f.emailFormControl.value;
    clientModel.isRuc = this.f.isRucFormControl.value;
    clientModel.location = this.f.districtFormControl.value;
    return clientModel;
  }

  async saveInformation(){
    if(this.recaptcha!=undefined || this.recaptcha!= null){
      let clientModel = this.getValuesOfForm();
      console.log(clientModel)
      var estructura: any = generateConfirmStructure(1);
      var result = await Swal.fire(estructura);
      if (result.isConfirmed && this.prospectForm.status == 'VALID') {
        this.router.navigate(['/login'])
      }else {
        var estructura: any = generateConfirmStructure(3);
        var result = await Swal.fire(estructura);
       
      }
    }else {
      var estructura: any = generateConfirmStructure(2);
      var result = await Swal.fire(estructura);
    }
    
  }
  
  loadDepartmentCbo(){
    return this.loadDepartmentList();
  }

  loadDepartmentList() {
    const lstDpto = this._generalService.getDepartment();
    lstDpto.forEach(x=>{
      let ubigeo : UbigeoModel = {};
      ubigeo.coDepa = x.coDepa;
      ubigeo.nombre_ubigeo = x.nombre_ubigeo;
      this.lstDepartamento.push(ubigeo);
    });
    
    console.log(this.lstDepartamento)
    return this.lstDepartamento;
    
  }

  selectDepartament(){
    let codDepartamento = this.f.departmentFormControl.value.coDepa;
    if (codDepartamento) this.loadProvince(codDepartamento);
  }

  loadProvince(codDepartamento : string){
    return this.lstProvince =  this._generalService.getProvince(codDepartamento);
  }

  selectProvince(){
    let codProv = this.f.provinceFormControl.value.coProv;
    if (codProv) this.loadDistrict(codProv);
  }

  loadDistrict(codProv : string){
    return this.lstDistrict =  this._generalService.getDistrict(codProv);
  }

  loadDomain(){
    return this.lstDomain = this._generalService.getDomainList();
  }

  selectEmail(){
    let idTypeEmail = this.f.listEmailFormControl.value.id;
    if(idTypeEmail == "5"){
      this.dialog.open(ModalComponent, {
        disableClose : true,
        closeOnNavigation : true
      }).afterClosed().subscribe(
        data=> {
          if(data != undefined){
            let newDomain : DomainModel = {};
            newDomain.id = this.lstDomain.length+data.id;
            newDomain.value = data.value;
            this.lstDomain.push(newDomain);
            this.prospectForm.get('listEmailFormControl').setValue(newDomain);
          }else {
            this.prospectForm.get('listEmailFormControl').setValue(0);
          }
        }
      )
    }
  }


}