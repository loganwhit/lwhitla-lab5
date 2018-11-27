import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatMenuModule, MatToolbarModule, MatCardModule, MatButtonToggleModule,MatTabsModule, MatListModule,MatDialogModule} from '@angular/material'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './core/auth.guard';
import {AdminGuard} from './core/admin.guard';
import {UserResolver} from './user/user.resolver';
import { StartComponent } from './start/start.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { StartItemComponent } from './start-item/start-item.component';
import { UserItemComponent } from './user-item/user-item.component';
import { CartComponent } from './cart/cart.component';
import {MatSelectModule} from '@angular/material/select';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReceiptComponent } from './receipt/receipt.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    StartComponent,
    AdminComponent,
    ProfileComponent,
    StartItemComponent,
    UserItemComponent,
    CartComponent,
    ReceiptComponent,
   
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTabsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule
   
  ],
  entryComponents:[StartItemComponent, UserItemComponent, ReceiptComponent],

  providers: [AuthGuard,UserResolver,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
