// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, catchError, } from 'rxjs';
// // jobscount.service.ts
// export interface RecentApplicantViewModel {
//   ApplicantName: string;         // Update 'applicantName' to 'ApplicantName'
//   ApplicantEmail: string;        // Update 'applicantEmail' to 'ApplicantEmail'
//   JobTitle: string;              // Update 'jobTitle' to 'JobTitle'
//   CompanyLocation: string;       // Update 'companyLocation' to 'CompanyLocation'
//   Skills: string;                // Update 'skills' to 'Skills'
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class JobscountService {
//   private apiUrl = 'https://localhost:7058/api/Jobs';
//   private ApiUrl = 'https://localhost:7058/api/ResumeClass'; // Use the correct API URL here
//   private RecentApplicant = 'https://localhost:7058/api/ResumeClass/RecentApplicants';


//   // private jobCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
//   // public jobCount$: Observable<number> = this.jobCountSubject.asObservable();
//  // private baseUrl = 'https://localhost:7058/api/Jobs/TotalAppliedJobsCount';

//   // private baseUrl ='https://localhost:7058/api/Jobs/count'
//   constructor(private http: HttpClient) {
//    // this.fetchJobCount();
//    }

//   //  private fetchJobCount() {
//   //   this.http.get<number>('https://localhost:7058/api/Jobs/count').subscribe(
//   //     (count) => {
//   //       this.jobCountSubject.next(count);
//   //     },
//   //     (error) => {
//   //       console.error('Failed to fetch job count:', error);
//   //     }
//   //   );
//   // }

//   getRecentApplicants(): Observable<RecentApplicantViewModel[]> {
//     return this.http.get<RecentApplicantViewModel[]>(this.RecentApplicant).pipe(
//       catchError((error: any) => {
//         console.error('Error fetching recent applicants:', error);
//         return [];
//       })
//     );
//   }
  
  
//   getTotalJobsCount(): Observable<number> {
//     return this.http.get<number>(`${this.apiUrl}/count`);
//   }
//   getTotalApplicantsCount(): Observable<number> {
//     return this.http.get<number>(`${this.ApiUrl}/TotalApplicantsCount`);
//   }
//   getTotalAppliedJobsCount(): Observable<number> {
//     return this.http.get<number>(`${this.apiUrl}/TotalAppliedJobsCount`);
//   }

//   getNotAppliedJobsCount(): Observable<number> {
//     return this.http.get<number>(`${this.apiUrl}/NotAppliedJobsCount`);
//   }
//   // getTotalAppliedJobsCount(): Observable<number> {
//   //   const url = `${this.baseUrl}/TotalAppliedJobsCount`;
//   //   return this.http.get<number>(url).pipe(
//   //     tap(count => console.log('Total Applied Jobs Count:', count)),
//   //     catchError(error => {
//   //       console.error('Error getting total applied jobs count:', error);
//   //       return of(0); // Return a default value in case of an error
//   //     })
//   //   );
//   // }
  
//   // getAppliedJobsCount(): Observable<number> {
//   //   return this.http.get<number>(`${this.baseUrl}/AppliedJobsCount`);
//   // }
 
//   // }


// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

export interface RecentApplicantViewModel {
  applicantName: string;
  applicantEmail: string;
  jobTitle: string;
  companyLocation: string;
  skills: string;
  applicationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobscountService {
  private apiUrl = 'https://localhost:7058/api/Jobs';
  private ApiUrl = 'https://localhost:7058/api/ResumeClass';
  private RecentApplicant = 'https://localhost:7058/api/ResumeClass/RecentApplicants';

  constructor(private http: HttpClient) {}

  getRecentApplicants(): Observable<RecentApplicantViewModel[]> {
    return this.http.get<RecentApplicantViewModel[]>(this.RecentApplicant).pipe(
      catchError((error: any) => {
        console.error('Error fetching recent applicants:', error);
        return [];
      })
    );
  }

  getTotalJobsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getTotalApplicantsCount(): Observable<number> {
    return this.http.get<number>(`${this.ApiUrl}/TotalApplicantsCount`);
  }

  getTotalAppliedJobsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/TotalAppliedJobsCount`);
  }

  getNotAppliedJobsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/NotAppliedJobsCount`);
  }
  getJobsLastWeekCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'last-week/count');
  }

  getJobsLastMonthCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'last-month/count');
  }

  getJobsLastYearCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'last-year/count');
  }
}
