// import {MatDialogModule} from '@angular/material/dialog';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatButtonModule} from '@angular/material/button';
// import {MatCardModule} from '@angular/material/card';
// import {MatGridListModule} from '@angular/material/grid-list';
// import {MatIconModule} from '@angular/material/icon';
// import {MatInputModule} from '@angular/material/input';
// import {MatListModule} from '@angular/material/list';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatSliderModule} from '@angular/material/slider';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatToolbarModule} from '@angular/material/toolbar';

// import {NgModule} from '@angular/core';

// @NgModule({
//   imports: [
//     MatButtonModule,
//     MatMenuModule,
//     MatIconModule,
//     MatCardModule,
//     MatSliderModule,
//     MatProgressBarModule,
//     MatAutocompleteModule,
//     MatInputModule,
//     MatGridListModule,
//     MatSnackBarModule,
//     MatProgressSpinnerModule,
//     MatTooltipModule,
//     MatListModule,
//     MatDialogModule,
//     MatToolbarModule
//   ],
//   exports: [
//     MatButtonModule,
//     MatMenuModule,
//     MatIconModule,
//     MatCardModule,
//     MatSliderModule,
//     MatProgressBarModule,
//     MatAutocompleteModule,
//     MatInputModule,
//     MatGridListModule,
//     MatSnackBarModule,
//     MatProgressSpinnerModule,
//     MatTooltipModule,
//     MatListModule,
//     MatDialogModule,
//     MatToolbarModule
//   ],
// })

// export class MaterialModule {
// }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
   MatButtonModule,
   MatToolbarModule,
   MatIconModule,
   MatBadgeModule,
   MatSidenavModule,
   MatListModule,
   MatGridListModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatRadioModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatChipsModule,
   MatTooltipModule,
   MatTableModule,
   MatPaginatorModule,
   MatCardModule
} from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule
   ],
   providers: [
      MatDatepickerModule,
   ]
})

export class MaterialModule { }