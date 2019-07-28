import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ALL_COMPONENTS } from './components/all-components';

@NgModule({
  declarations: [...ALL_COMPONENTS],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
