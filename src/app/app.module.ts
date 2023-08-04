import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { JobsComponent } from './jobs/jobs.component';
//import { JobssectionComponent } from './jobssection/jobssection.component';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppSignupComponent } from './components/app-signup/app-signup.component';
import { ApptokenInterceptor } from './interceptors/apptoken.interceptor';
import { AppDashboardComponent } from './components/app-dashboard/app-dashboard.component';
import { AppJobsComponent } from './components/app-jobs/app-jobs.component';
import { AppAppliedComponent } from './components/app-applied/app-applied.component';
import { AppHomeComponent } from './components/app-home/app-home.component';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { HighlightPipePipe } from './highlight-pipe.pipe';
import { FilterPipe } from './filter.pipe';
import { CandidatessectionComponent } from './candidatessection/candidatessection.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//import { PostingjobsByMonthComponent } from './postingjobs-by-month/postingjobs-by-month.component';

import { PiechartComponent } from './admin/piechart/piechart.component';
import { MainComponent } from './admin/main/main.component';

import { JobsdataComponent } from './admin/jobsdata/jobsdata.component';
//import { BaseChartModule } from 'ng2-charts';
import { JobssectionComponent } from './components/jobssection/jobssection.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { HighchartsChartModule } from 'highcharts-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';













@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    JobsComponent,
    AppLoginComponent,
    AppSignupComponent,
    AppDashboardComponent,
    AppJobsComponent,
    AppAppliedComponent,
    AppHomeComponent,
    ClientHomeComponent,
    HighlightPipePipe,
    FilterPipe,
    CandidatessectionComponent,
  
    PiechartComponent,
    MainComponent,
  
    JobsdataComponent,
    JobssectionComponent,

      
  
  
   
    
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    FontAwesomeModule,
   // BaseChartModule,
    BrowserAnimationsModule,NgxChartsModule
   
  
    
   // SyncfusionDashboardsModule

    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  },
{provide:HTTP_INTERCEPTORS,
  useClass:ApptokenInterceptor,
  multi: true
}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
