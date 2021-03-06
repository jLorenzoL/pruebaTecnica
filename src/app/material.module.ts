import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule,
         MatCardModule,
         MatMenuModule,
         MatButtonModule,
         MatToolbarModule,
         MatIconModule,
         MatInputModule,
         MatSelectModule,
         MatDialogModule,
         MatHint,
         MatLabel, 
         ErrorStateMatcher,
         ShowOnDirtyErrorStateMatcher,
         MatRadioModule,
         MatCheckboxModule} from '@angular/material';

const moduleMaterial = [
  MatFormFieldModule,
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatRadioModule,
  MatCardModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    moduleMaterial
  ],
  providers: [
  ],
  exports: [
    moduleMaterial
  ]
})
export class MaterialModule { }
