import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';



const MaterialComponents = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule
];

@NgModule({
  exports: [
    MaterialComponents,
    MatDialogModule
  ],
  imports: [
    MaterialComponents,
    MatDialogModule
  ]
})
export class MaterialModule { }
