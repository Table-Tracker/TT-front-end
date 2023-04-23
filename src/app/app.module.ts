import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule}  from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactReviewComponent } from './components/contact-review/contact-review.component';

import { AgmCoreModule } from '@agm/core';
import { RestaurantMapCardComponent } from './components/restaurant-map-card/restaurant-map-card.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ManagerProfileComponent } from './components/manager-profile/manager-profile.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { RestaurantPageComponent } from './components/restaurant-page/restaurant-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { InitialsPipe } from './pipes/initials.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';

const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: x => localStorage['token'],
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RestaurantCardComponent,
    SearchComponent,
    SignupComponent,
    ResetPasswordComponent,
    FaqComponent,
    ContactReviewComponent,
    RestaurantMapCardComponent,
    UserProfileComponent,
    ManagerProfileComponent,
    UserInfoComponent,
    RestaurantPageComponent,
    MenuComponent,
    MapComponent,
    InitialsPipe,
    TimeFormatPipe,
    ForgotPasswordComponent,
    NewPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    MatFormFieldModule,
    MatIconModule,
    BrowserAnimationsModule,
    
    NgxSliderModule,

    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatExpansionModule,
    MatSelectModule,
    TextFieldModule,
    MatDialogModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWfjzOxb-2roNizfHJah-t4P3oNffgoJA',
      libraries: ['places']
    }),
    MatDividerModule,
    MatListModule,
    TextFieldModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(iconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'googleIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/google-color.svg')
    );

    iconRegistry.addSvgIcon(
      'locationIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/location-sign-svgrepo-com.svg')
    );

    iconRegistry.addSvgIcon(
      'filledHeartIcon',
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/heart.svg')
    );
  }


}
