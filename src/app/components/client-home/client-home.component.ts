import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit,AfterViewInit  } from '@angular/core';

import { AppliedJobsService } from 'src/app/applied-jobs.service';
import { JobsdetailsService } from 'src/app/jobsdetails.service';
import { JobscountService } from 'src/app/services/jobscount.service';


@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit  {
  isClientHomeComponent = true;

  totalJobsCount!: number;
  totalApplicantsCount!: number;
  totalAppliedJobsCount!: number;
  notAppliedJobsCount!: number;
  jobsdataComponent: any;
  // images: string[] = [
  //   'assets/career.jpg',
  //   'assets/Jobs.jpg',
  //   'assets/Register.jpg'
  // ];
  // currentImage: string | undefined;

 
  companyAchievements = [
    {
      title: 'Reached 1 Million Customers',
      date: 'August 20, 2023',
      description: 'We are proud to announce that we have achieved a significant milestone of serving 1 million customers.'
    },
    {
      title: 'Awarded Best Employer',
      date: 'August 25, 2023',
      description: 'We are honored to be recognized as the best employer in the industry, thanks to our dedicated team.'
    },
    {
      title: 'Ranked Top in Customer Satisfaction',
      date: 'August 30, 2023',
      description: 'Our commitment to customer satisfaction has led us to be ranked as the top company in our sector.'
    },
    // Add more company achievements as needed
  ];

   // Store the achievements to be displayed
   maxVisibleAchievements = 2;
   visibleAchievements: any[] | undefined;
   filterOption: string = 'lastWeek';
  //Testimonilas
  // testimonials = [

  //   {

  //     profilePhoto: 'assets/Profile pht.jpg',

  //     name: 'Naresh',

  //     content: "I cannot express enough gratitude for the jobs portal. It revolutionized my job search experience. "

  //   },

  //   {

  //     profilePhoto: 'assets/Anjali.png',

  //     name: 'Anjali',

  //     content: "The jobs portal exceeded my expectations in every way possible. Its very great platform. "

  //   },

  //   {

  //     profilePhoto: 'assets/rizwana.png',

  //     name: 'Rizwana',

  //     content: "I'm very glad to get placed from Onlinejobsportal to Dell EMC corporation. I got placed just at my very less time.."

  //   },

  //   {

  //     profilePhoto: 'assets/chandra.png',

  //     name: 'Chandra',

  //     content: 'Iam very thankful to jobs portal.It Is a very good and geniune platform for freshers to find jobs...'

  //   },

  //   {

  //     profilePhoto: 'assets/prakyath.png',

  //     name: 'Prakhyath',

  //     content: "I had a great experience using the jobs portal to find my next career move..."  

  //   },

  //   {

  //     profilePhoto: 'assets/soumya.png',

  //     name: 'Soumya',

  //     content: 'I am very grateful to them for effectively and sincerely helping me to grab first ever job opportunity'

  //   },

  //   {

  //     profilePhoto: 'assets/Madhu.png',

  //     name: 'Madhu',

  //     content: 'Thank you onlinejobsportal for providing multiple opportunties in number of companies where I got place placed'

  //   },

  //   {

  //     profilePhoto: 'assets/srimathi.png',

  //     name: 'srimathi',

  //     content: 'I am extremely grateful to the jobs portal for helping me secure my dream job...'

  //   },

  //   {

  //     profilePhoto: 'assets/mounika.png',

  //     name: 'Mounika',

  //     content: "I have been searching for a job for months without any luck until I discovered the jobs portal."

  //   },

  //   {

  //     profilePhoto: 'assets/priyanka.png',

  //     name: 'Priyanka',

  //     content: "I can't thank the jobs portal enough for the fantastic opportunities"

  //   },

   

  //   {

  //     profilePhoto: 'assets/sandhya.pic.png',

  //     name: 'sandhya',

  //     content: "I had been struggling to find a job that matched my qualifications until I stumbled upon the jobs portal.."

  //   }

  // ];
  //Testimonials end....
  // currentSlideIndex = 0;
  // jobsList: any[] = [];
  // itemsPerPage: number = 4; 
  // currentPage: number = 1; 
  // totalPages: number = 0; 
  // pages: number[] = []; 
  
  // displayedJobsList: any[] = [];
  constructor(private jobsCountService: JobscountService) {
   
  }


  ngOnInit(): void {
    this.updateVisibleAchievements();
  }
  private updateVisibleAchievements(): void {
    this.visibleAchievements = this.companyAchievements.slice(0, this.maxVisibleAchievements);
  }
  // getFilteredAchievements(): void {
  //   const today = new Date();
  
  //   // Calculate the start date based on the selected filter option
  //   const startDate = new Date(today);
  //   if (this.filterOption === 'lastWeek') {
  //     startDate.setDate(today.getDate() - 7);
  //   } else if (this.filterOption === 'lastMonth') {
  //     startDate.setMonth(today.getMonth() - 1);
  //   } else if (this.filterOption === 'lastYear') {
  //     startDate.setFullYear(today.getFullYear() - 1);
  //   }
  
  //   // Filter the achievements based on the calculated start date
  //   this.visibleAchievements = this.companyAchievements.filter((achievement) => {
  //     const achievementDate = new Date(achievement.date);
  //     return achievementDate >= startDate && achievementDate <= today;
  //   });
  // }

  getIconForTitle(title: string): string {
    // Map achievement titles to Font Awesome icons
    switch (title.toLowerCase()) {
      case 'achievement 1':
        return 'fas fa-medal'; // Replace 'fas fa-medal' with the suitable icon class for achievement 1
      case 'achievement 2':
        return 'fas fa-trophy'; // Replace 'fas fa-trophy' with the suitable icon class for achievement 2
      case 'achievement 3':
        return 'fas fa-award'; // Replace 'fas fa-award' with the suitable icon class for achievement 3
      // Add more cases for other achievements as needed
      default:
        return 'fas fa-certificate'; // Default icon if no match found
    }
  }
 


  get hasHiddenAchievements(): boolean {
    return this.companyAchievements.length > this.maxVisibleAchievements;
  }

  showAllAchievements(): void {
    this.maxVisibleAchievements = this.companyAchievements.length;
    this.updateVisibleAchievements();
  }
 
  // updateDisplayedJobs() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   this.displayedJobsList = this.jobsList.slice(startIndex, endIndex);

  

  // }
  // toggleDetails(item: any) {
  //   item.showDetails = !item.showDetails;
  // }

  // previousPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.updateDisplayedJobs();
  //     this.generatePageNumbers(); 
  //     window.scrollTo(0, 0);
  //   }
  // }

  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.updateDisplayedJobs();
  //     this.generatePageNumbers(); 
  //     window.scrollTo(0, 0);
  //   }
  // }

  // goToPage(page: number) {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //     this.updateDisplayedJobs();
  //     // this.generatePageNumbers(); 
  //   }
  // }
 
  // generatePageNumbers() {
  //   this.pages = [];
  //   for (let i = 1; i <= this.totalPages; i++) {
  //     this.pages.push(i);
  //   }
  // }
  
  // istrue = false
  // ngOnInit(): void {
  //   this.jobsint.getmethod().subscribe(data => {
  //     this.jobsList = data;
      
  //     this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
  //     this.generatePageNumbers();
  //     this.updateDisplayedJobs();
  //     this.startCarousel();

      
  //   });


  //   setInterval(() => {
  //     this.currentSlideIndex = (this.currentSlideIndex + 1) % this.testimonials.length;
  //   }, 6000); 




   

  // }


  

  
  // startCarousel() {
  //   let currentIndex = 0;
  //   setInterval(() => {
  //     this.currentImage = this.images[currentIndex];
  //     currentIndex = (currentIndex + 1) % this.images.length;
  //   }, 3000); // Change image every 3 seconds
  // }


}
