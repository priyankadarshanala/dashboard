import { Component, Input,  OnInit,} from '@angular/core';
import {
  faBriefcase,
  faUsers,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { JobsdetailsService } from 'src/app/jobsdetails.service';
import { JobscountService } from 'src/app/services/jobscount.service';


@Component({
  selector: 'app-jobsdata',
  templateUrl: './jobsdata.component.html',
  styleUrls: ['./jobsdata.component.scss']
})
export class JobsdataComponent implements OnInit {
  @Input() totalJobsCount!: number;
  @Input() totalApplicantsCount!: number;
  @Input() totalAppliedJobsCount!: number;
  @Input() notAppliedJobsCount!: number;
  
  faBriefcase = faBriefcase;
  faUsers = faUsers;
  faCheck = faCheck;
  faTimes = faTimes;
 
  // jobCount$: Observable<number> = this.jobsCountService.jobCount$;
  // jobCount!: number;
  // totalAppliedJobsCount!: number  // Add this property to store the count of applied jobs
  
  // totalJobsCount!: number ;
 
  // notAppliedJobsCount!: number ;


  constructor( private jobsint:JobsdetailsService,private jobsCountService: JobscountService) { }

  ngOnInit(): void {
    this.getJobsCounts();
   
   // this.fetchCounts();

    
    // this.jobsCountService.jobCount$.subscribe((count) => {
    //   this.jobCount = count;
    // });
    // this.jobCount$.subscribe((count) => {
    //   this.jobCount = count;
    // });
    
    // this.jobsCountService.getAppliedJobsCount().subscribe((count) => {
    //   this.appliedJobsCount = count;
    // });
  }


  
  getJobsCounts(): void {
    this.jobsCountService.getTotalJobsCount().subscribe(
      (count) => {
        this.totalJobsCount = count;
      },
      (error) => {
        console.error('Error fetching total jobs count: ', error);
      }
    );
    this.jobsCountService.getTotalApplicantsCount().subscribe(
      (count) => {
        this.totalApplicantsCount = count;
      },
      (error) => {
        console.error('Error fetching total applicants count: ', error);
      }
    );

    this.jobsCountService.getTotalAppliedJobsCount().subscribe(
      (count) => {
        this.totalAppliedJobsCount = count;
      },
      (error) => {
        console.error('Error fetching total applied jobs count: ', error);
      }
    );

    this.jobsCountService.getNotAppliedJobsCount().subscribe(
      (count) => {
        this.notAppliedJobsCount = count;
      },
      (error) => {
        console.error('Error fetching not applied jobs count: ', error);
      }
    );
  }
  // fetchCounts(): void {
  //   this.jobsCountService.getTotalJobsCount().subscribe(
  //     count => this.totalJobsCount = count,
  //     error => console.error('Error fetching total jobs count: ', error)
  //   );

  //   this.jobsCountService.getTotalAppliedJobsCount().subscribe(
  //     count => this.totalAppliedJobsCount = count,
  //     error => console.error('Error fetching total applied jobs count: ', error)
  //   );

  //   this.jobsCountService.getNotAppliedJobsCount().subscribe(
  //     count => this.notAppliedJobsCount = count,
  //     error => console.error('Error fetching not applied jobs count: ', error)
  //   );
  // }
  // getAppliedJobsCount(): void {
  //   this.jobsCountService.getTotalAppliedJobsCount().subscribe(
  //     (count) => {
  //       console.log('Total Applied Jobs Count:', count);
  //       this.totalAppliedJobsCount = count;
  //     },
  //     (error) => {
  //       console.error('Error getting total applied jobs count:', error);
  //     }
  //   );
  // }
 
}

