import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UbigeoModel } from 'src/app/models/ubigeo.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { GeneralService } from 'src/app/services/general.service';
import { ValidationService } from 'src/app/services/validation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {

  typePerson : string;
  chk : boolean = true;
  validateForm : FormGroup;
  chance : number = 0;
  showDetail : boolean = false;
  showAddresDetail : boolean = false;
  userModel : UsuarioModel;
  lstDepartamento : UbigeoModel[] = [];
  lstProvince : UbigeoModel[] = [];
  lstDistrict : UbigeoModel[] = [];

  constructor(private fb: FormBuilder,
              private _validationService : ValidationService,
              private _generalService :  GeneralService) {
                this.userModel = {}
               }

  ngOnInit() {
    this.buildForm();
    this.loadDepartmentCbo();
    this.validateDataTmp();
  }

  buildForm () {
    this.validateForm = this.fb.group({
      typePersonFormControl : [,],
      rucFormControl : [, {validators : [Validators.required, 
                                         Validators.pattern("^[0-9]{1,11}$"),
                                         Validators.maxLength(11)]}],
      dniFormControl : [, {validators : [Validators.required, 
                                         Validators.pattern("^[0-9]{1,8}$"),
                                         Validators.maxLength(8)]}],
      rucSunatFormControl : ['', {}],
      rznSocSunatFormControl : ['', {}],
      estContrSunatFormControl : ['', {}],
      condDomiSunatFormControl : ['', {}],
      tipoViaSunatFormControl : ['', {}],
      nombViaSunatFormControl : ['', {}],
      numDomicSunatFormControl : ['', {}],
      intDomicSunatFormControl : ['', {}],
      loteDomicSunatFormControl : ['', {}],
      departamentoSunatFormControl : ['', {}],
      mznDomicSunatFormControl : ['', {}],
      kmDomicSunatFormControl : ['', {}],
      ubigeoSunatFormControl : ['', {}],
      rznSocFormControl : ['', {validators : [Validators.required]}],
      denomComercFormControl : ['', {validators : [Validators.required]}],
      ciiuFormControl : ['', {validators : [Validators.required]}],
      expFormControl : ['', {validators : [Validators.required]}],
      roleFormControl : ['', {validators : [Validators.required]}],
      powerFormControl : ['', {validators : [Validators.required]}],
      dniEjecComercFormControl : ['', {validators : [Validators.required]}],
      departmentFormControl: [ '0', Validators.required  ],
      provinceFormControl: [ '0', Validators.required  ],
      districtFormControl: [ '0', Validators.required  ],
      nombViaFormControl: [ '', Validators.required  ],
      numFormControl: [ '', Validators.required  ],
      intFormControl: [ '', Validators.required  ],
      loteFormControl: [ '', Validators.required  ],
      mznaFormControl: [ '', Validators.required  ],
      kmFormControl: [ '', Validators.required  ]
    })
  }

  validateDataTmp(){
    let formTmp = localStorage.getItem('dataForm');
    if(formTmp){
      this.userModel = JSON.parse(atob(formTmp));
      this.setearDatosForm();
      this.showDetail = true
    }
  }

  setearDatosForm() {
    this.validateForm.patchValue({
      // typePersonFormControl: this.userModel.nuCoti,
      rucFormControl: this.userModel.rucSunat,
      dniFormControl: this.userModel.numDocAdic,
      rucSunatFormControl : this.userModel.rucSunat,
      rznSocSunatFormControl: this.userModel.razonSocial,
      estContrSunatFormControl : this.userModel.estContr,
      condDomiSunatFormControl : this.userModel.condDomi,
      tipoViaSunatFormControl : this.userModel.tipoVia,
      nombViaSunatFormControl : this.userModel.nombVia,
      numDomicSunatFormControl : this.userModel.numDomic,
      intDomicSunatFormControl : this.userModel.intDomic,
      loteDomicSunatFormControl : this.userModel.loteDomic,
      departamentoSunatFormControl : this.userModel.departamento,
      mznDomicSunatFormControl: this.userModel.mznDomic,
      kmDomicSunatFormControl: this.userModel.kmDomic,
      ubigeoSunatFormControl: this.userModel.ubigeo,
      nombViaFormControl: this.userModel.nombViaFC,
      numFormControl: this.userModel.numFC,
      intFormControl: this.userModel.intFC,
      loteFormControl: this.userModel.loteFC,
      mznaFormControl: this.userModel.mznaFC,
      kmFormControl: this.userModel.kmFC,
      departmentFormControl: this.userModel.dptoFC,
      provinceFormControl: this.userModel.provFC,
      districtFormControl: this.userModel.distFC,
      rznSocFormControl: this.userModel.rznSocFC,
      denomComercFormControl: this.userModel.denomComFC,
      ciiuFormControl: this.userModel.ciiuFC,
      expFormControl: this.userModel.expFC,
      roleFormControl : this.userModel.roleFc,
      powerFormControl : this.userModel.powerFC
    });
  }

  sendRuc(){
    let formResult : UsuarioModel = {};
    if(this.chance > 3){
      return Swal.fire('Error!', 'Usted ha llegado al maximo de 3 consultas por dia', 'error');
    }else {
      if(this.validateForm.get("rucFormControl").status == 'VALID' &&this.validateForm.get("dniFormControl").status == 'VALID'){
        const ruc = this.validateForm.get("rucFormControl").value;
        const docAdic = this.validateForm.get("dniFormControl").value;
        formResult = this._validationService.getRucDetail(ruc, docAdic);
        if(formResult.rucSunat == undefined){
          this.chance++;
          return Swal.fire('Aviso!', 'No se encontraron datos SUNAT', 'warning');
        }else {
          this.userModel = formResult;
          this.showDetail = true;
        }
      }else{
        this.chance++;
        return Swal.fire('Aviso!', 'Ingrese datos de busqueda', 'warning');
      }
      
    }
  }

  onChkChange(event) {
    this.showAddresDetail = !this.showAddresDetail ? true : false;
    if(!this.showAddresDetail){
      this.validateForm.get("nombViaFormControl").setValue(null);
      this.validateForm.get("numFormControl").setValue(null);
      this.validateForm.get("intFormControl").setValue(null);
      this.validateForm.get("loteFormControl").setValue(null);
      this.validateForm.get("mznaFormControl").setValue(null);
      this.validateForm.get("kmFormControl").setValue(null);
      this.validateForm.get("departmentFormControl").setValue(0);
      this.validateForm.get("provinceFormControl").setValue(0);
      this.validateForm.get("districtFormControl").setValue(0);
    }
    console.log(this.showAddresDetail)
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
    let codDepartamento = this.validateForm.get("departmentFormControl").value.coDepa;
    if (codDepartamento) this.loadProvince(codDepartamento);
  }

  loadProvince(codDepartamento : string){
    return this.lstProvince =  this._generalService.getProvince(codDepartamento);
  }

  selectProvince(){
    let codProv = this.validateForm.get("provinceFormControl").value.coProv;
    if (codProv) this.loadDistrict(codProv);
  }

  loadDistrict(codProv : string){
    return this.lstDistrict =  this._generalService.getDistrict(codProv);
  }

  get f() { return this.validateForm.controls; }

  getValueOfForm() : UsuarioModel {
    var usuarioModel: UsuarioModel = {};
    usuarioModel.tipoPersona = this.f.typePersonFormControl.value;
    usuarioModel.rucSunat = this.f.rucFormControl.value;
    usuarioModel.numDocAdic = this.f.dniFormControl .value;
    usuarioModel.rucSunat = this.f.rucSunatFormControl.value;
    usuarioModel.razonSocial = this.f.rznSocSunatFormControl.value;
    usuarioModel.estContr = this.f.estContrSunatFormControl.value;
    usuarioModel.condDomi = this.f.condDomiSunatFormControl.value;
    usuarioModel.tipoVia = this.f.tipoViaSunatFormControl.value;
    usuarioModel.nombVia = this.f.nombViaSunatFormControl.value;
    usuarioModel.numDomic = this.f.numDomicSunatFormControl.value; 
    usuarioModel.intDomic = this.f.intDomicSunatFormControl.value; 
    usuarioModel.loteDomic = this.f.loteDomicSunatFormControl.value; 
    usuarioModel.departamento = this.f.departamentoSunatFormControl.value; 
    usuarioModel.mznDomic = this.f.mznDomicSunatFormControl.value; 
    usuarioModel.kmDomic = this.f.kmDomicSunatFormControl.value; 
    usuarioModel.ubigeo = this.f.ubigeoSunatFormControl.value; 
    usuarioModel.nombViaFC = this.f.numFormControl.value;
    usuarioModel.loteFC = this.f.loteFormControl.value;
    usuarioModel.mznaFC = this.f.mznaFormControl.value;
    usuarioModel.kmFC = this.f.kmFormControl.value;
    usuarioModel.dptoFC = this.f.departmentFormControl.value;
    usuarioModel.provFC = this.f.provinceFormControl.value;
    usuarioModel.distFC = this.f.districtFormControl.value;
    usuarioModel.rznSocFC = this.f.rznSocFormControl.value; 
    usuarioModel.denomComFC = this.f.denomComercFormControl.value; 
    usuarioModel.ciiuFC = this.f.ciiuFormControl.value; 
    usuarioModel.expFC = this.f.expFormControl.value; 
    usuarioModel.roleFc = this.f.roleFormControl.value; 
    usuarioModel.powerFC = this.f.powerFormControl.value;
    return usuarioModel;
  }

  saveLocal(){
    var usuarioModel = this.getValueOfForm();
    localStorage.setItem('dataForm', btoa(JSON.stringify(usuarioModel)));
    return Swal.fire('Aviso!', 'No ha culminado el registro, puede continuar luego', 'warning');
  }

}
