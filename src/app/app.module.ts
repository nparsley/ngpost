import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatInputModule} from '@angular/material/input';
// import {MatCardModule} from '@angular/material/card';
// import {MatButtonModule} from '@angular/material/button';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatDialogModule} from '@angular/material/dialog';



import { AppComponent } from './app.component';
// import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
// import { PostListComponent } from './posts/post-list/post-list.component';
import { PostService } from './posts/posts.service';
import { AppRoutingModule } from './app.routing.module';
// import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/posts.module';
// import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    // PostCreateComponent,
    HeaderComponent,
    // PostListComponent,
    // LoginComponent,
    // SignupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    BrowserAnimationsModule,
    // MatInputModule,
    // MatCardModule,
    // MatButtonModule,
    // MatToolbarModule,
    // MatExpansionModule,
    // MatProgressSpinnerModule,
    HttpClientModule,
    // MatPaginatorModule,
    // MatDialogModule
    AngularMaterialModule,
    PostsModule,
    // AuthModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
