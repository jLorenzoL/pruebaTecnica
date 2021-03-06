import { DomainModel } from './../../../models/domain.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {
  
  modalForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    protected ref: MatDialogRef<ModalComponent>,
  ) { }

  ngOnInit() {
    this.modalForm = this.fb.group({
      domainFormControl : [ '', {validators : [Validators.required, Validators.pattern("[a-z0-9.-]+$")]}  ],
    });
  }

  addDomain(){
    let newDomain : DomainModel = {}
    newDomain.id = 1;
    newDomain.value = this.modalForm.get('domainFormControl').value;
    this.ref.close(newDomain);
  }
  
  closeDialog(){
    this.ref.close();
  }

}
