// import { Component, OnInit } from '@angular/core';
// import { Chart } from 'angular-highcharts';
// import { JobscountService, RecentApplicantViewModel } from 'src/app/services/jobscount.service';
// @Component({
//   selector: 'app-main',
//   templateUrl: './main.component.html',
//   styleUrls: ['./main.component.scss'],
// })
// export class MainComponent implements OnInit {
//   // chart: Chart;
//   recentApplicants: RecentApplicantViewModel[] = [];

//   constructor(private jobsCountService: JobscountService) {
//     // Initialize the chart with your configuration options
//     // this.chart = new Chart({
//     //   chart: {
//     //     type: 'line',
//     //     height: 325
//     //   },
//     //   title: {
//     //     text: 'Month wise sales'
//     //   },
//     //   xAxis: {
//     //     categories: [
//     //       'Jan',
//     //       'Feb',
//     //       'Mar',
//     //       'Apr',
//     //       'May',
//     //       'Jun',
//     //       'Jul',
//     //       'Aug',
//     //       'Sep',
//     //       'Oct',
//     //       'Nov',
//     //       'Dec'
//     //     ]
//     //   },
//     //   yAxis: {
//     //     title: {
//     //       text: 'Revenue in $'
//     //     }
//     //   },
//     //   series: [
//     //     {
//     //       name: "Arizona",
//     //       type: "line",
//     //       color: '#044342',
//     //       data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 196]
//     //     },
//     //     // Add more series if needed
//     //   ],
//     //   credits: {
//     //     enabled: false
//     //   }
//     // });
//   }

//   ngOnInit(): void {
//     this.getRecentApplicants();
//   }

//   getRecentApplicants(): void {
//     this.jobsCountService.getRecentApplicants()
//       .subscribe(applicants => this.recentApplicants = applicants);
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { JobscountService, RecentApplicantViewModel } from 'src/app/services/jobscount.service';

// @Component({
//   selector: 'app-main',
//   templateUrl: './main.component.html',
//   styleUrls: ['./main.component.scss'],
// })
// export class MainComponent implements OnInit {
//   recentApplicants: RecentApplicantViewModel[] = [];

//   constructor(private jobsCountService: JobscountService) {}

//   ngOnInit(): void {
//     this.getRecentApplicants();
//   }

//   getRecentApplicants(): void {
//     this.jobsCountService.getRecentApplicants().subscribe(
//       applicants => {
//         this.recentApplicants = applicants;
//       },
//       error => {
//         console.error('Error fetching recent applicants:', error);
//       }
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { JobscountService, RecentApplicantViewModel } from 'src/app/services/jobscount.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  recentApplicants: RecentApplicantViewModel[] = [];
  visibleApplicantCount = 10; // Number of applicants to show initially

  constructor(private jobsCountService: JobscountService) {}

  ngOnInit(): void {
    this.getRecentApplicants();
  }

  getRecentApplicants(): void {
    this.jobsCountService.getRecentApplicants().subscribe(
      applicants => {
        // Sort the applicants based on the most recent ones first (using the 'applicationDate' property)
        applicants.sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());
        // Limit the number of applicants to show
        this.recentApplicants = applicants.slice(0, this.visibleApplicantCount); // Use 'visibleApplicantCount' instead of 'maxRecentApplicantsToShow'
      },
      error => {
        console.error('Error fetching recent applicants:', error);
      }
    );
  }
  
  showMoreApplicants(): void {
    this.visibleApplicantCount += 10;
  }
}


