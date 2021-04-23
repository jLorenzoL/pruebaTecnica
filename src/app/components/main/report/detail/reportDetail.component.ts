import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'reportDetail-modal',
  templateUrl: './reportDetail.component.html'
})
export class ReportDetailComponent implements OnInit {
    
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: string,
        private dialogRef: MatDialogRef<ReportDetailComponent>
    ){

    }

    ngOnInit(): void {
        console.log(this.data)
    }

}