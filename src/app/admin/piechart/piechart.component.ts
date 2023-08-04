// import { Component, Input, OnInit } from '@angular/core';
// import { Chart } from 'angular-highcharts';
// import { JobscountService } from 'src/app/services/jobscount.service';
// import * as Highcharts from 'highcharts';


// @Component({
//   selector: 'app-piechart',
//   templateUrl: './piechart.component.html',
//   styleUrls: ['./piechart.component.scss'],

// })
// export class PiechartComponent implements OnInit {
//  // Define the 'chart' property here with the appropriate data type for your chart library.
//   chart: Chart | undefined;
//   @Input() totalJobsCount!: number;
//   @Input() totalAppliedJobsCount!: number;
//   @Input() notAppliedJobsCount!: number;

//   constructor(private jobsCountService: JobscountService) {
//     this.chart = new Chart({
//       chart: {
//         type: 'pie',
//         height: 325
//       },
//       title: {
//         text: 'Posted Jobs'
//       },
//       xAxis: {
//         categories: [
//           'Electronics',
//           'Groceries',
//           'Cosmetics',
//           'Clothes',
//           'Appliances',
//         ]
//       },
//       yAxis: {
//         title: {
//           text: 'Revenue in %'
//         }
//       },
//       series: [
//        {
//         type: 'pie',
//         data: [
//           { name: 'NO.OF JOBPOSTINGS', y: this.totalJobsCount, color: '#044342' },
//           { name: 'NO.OF APPLICANTS', y: this.totalAppliedJobsCount, color: '#7e0505' },
//           { name: 'APPLIED JOBS', y: this.totalAppliedJobsCount, color: '#ed9e20' },
//           { name: 'NOT APPLIED JOBS', y: this.notAppliedJobsCount, color: '#6920fb' },
//           // ... other data ...
//         ],
//        }
//       ],
//       credits: {
//         enabled: false
//       }
//     })
//    }

//   ngOnInit(): void {
//       // Update the chart data with the input values
//       this.chart?.ref?.update({
//         series: [{
//           type: 'pie',
//           data: [
//             { name: 'NO.OF JOBPOSTINGS', y: this.totalJobsCount, color: '#044342' },
//             { name: 'NO.OF APPLICANTS', y: this.totalAppliedJobsCount, color: '#7e0505' },
//             { name: 'APPLIED JOBS', y: this.totalAppliedJobsCount, color: '#ed9e20' },
//             { name: 'NOT APPLIED JOBS', y: this.notAppliedJobsCount, color: '#6920fb' },
//             // ... other data ...
//           ],
//         }]
//       });

 
//   }


// }


// import { Component, OnInit } from '@angular/core';
// import { Chart } from 'angular-highcharts';

// @Component({
//   selector: 'app-piechart',
//   templateUrl: './piechart.component.html',
//   styleUrls: ['./piechart.component.scss'],

// })
// export class PiechartComponent implements OnInit{

//   chart = new Chart({
//     chart: {
//       type: 'pie',
//       height: 325
//     },
//     title: {
//       text: 'Category wise sales'
//     },
//     xAxis: {
//       categories: [
//         'Electronics',
//         'Groceries',
//         'Cosmetics',
//         'Clothes',
//         'Appliances',
//       ]
//     },
//     yAxis: {
//       title: {
//         text: 'Revenue in %'
//       }
//     },
//     series: [
//      {
//       type: 'pie',
//       data: [
//         {
//           name: 'Electronics',
//           y: 41.0,
//           color: '#044342',
//         },
//         {
//           name: 'Groceries',
//           y: 33.8,
//           color: '#7e0505',
//         },
//         {
//           name: 'Cosmetics',
//           y: 6.5,
//           color: '#ed9e20',
//         },
//         {
//           name: 'Clothes',
//           y: 15.2,
//           color: '#6920fb',
//         },
//         {
//           name: 'Appliances',
//           y: 3.5,
//           color: '#121212',
//         },
//       ]
//      }
//     ],
//     credits: {
//       enabled: false
//     }
//   })

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
// import { Component, Input, OnInit } from '@angular/core';
// //import { Chart } from 'chart.js';
import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements AfterViewInit {
  @ViewChild('pieCanvas') pieCanvas!: ElementRef;
  @Input() pieChartData: any; // Assuming the type for pieChartData. Replace 'any' with the actual type if possible.

  ngAfterViewInit(): void {
    const canvas = this.pieCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    // Function to draw the pie chart
    const drawPieChart = () => {
      const totalValue = this.pieChartData.values.reduce((acc: number, value: number) => acc + value, 0);
      let startAngle = 0;

      for (let i = 0; i < this.pieChartData.values.length; i++) {
        const percentage = this.pieChartData.values[i] / totalValue;
        const endAngle = startAngle + (percentage * 2 * Math.PI);

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 3, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = this.pieChartData.colors[i];
        ctx.fill();

        startAngle = endAngle;
      }
    };

    // Call the drawPieChart function to draw the pie chart
    drawPieChart();
  }
}
