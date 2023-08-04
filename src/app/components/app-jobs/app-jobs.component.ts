import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppliedJobsService } from 'src/app/applied-jobs.service';
import { JobsdetailsService } from 'src/app/jobsdetails.service';
import { HighlightPipePipe } from 'src/app/highlight-pipe.pipe';
import { FilterPipe } from 'src/app/filter.pipe';
import { Job } from 'src/app/models/job';
interface HighlightedText {
  text: string;
  highlight: boolean;
}
@Component({
  selector: 'app-app-jobs',
  templateUrl: './app-jobs.component.html',
  providers: [HighlightPipePipe,FilterPipe],
  styleUrls: ['./app-jobs.component.scss']
})
export class AppJobsComponent implements OnInit {
  jobsList: any[] = [];
  itemsPerPage: number = 12; 
  currentPage: number = 1; 
  totalPages: number = 0; 
  pages: number[] = []; 
  
  searchQuery: string;

  searchResults: any[] | null = [];

  selectedResultIndex: number | null = null;

 
  displayedJobsList: any[] = [];
  

  showUploadPopupFlag: boolean = false;
  searchText: string = '';
  recentSearches: any;
  filteredJobs: any;
  jobs: any;
  currentJobForUpload: any;
  isUploadingResume: boolean | undefined;
  resumeData: any = {};
  
  



  constructor(private jobsint:JobsdetailsService, private appliedJobsService: AppliedJobsService, private http: HttpClient) { 
    this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
    this.generatePageNumbers();
    this.searchQuery = '';
   this.searchResults = [];
   this.filteredJobs = this.jobs;
  }
  updateDisplayedJobs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedJobsList = this.jobsList.slice(startIndex, endIndex);

  

  }
  toggleDetails(item: any) {
    item.showDetails = !item.showDetails;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
      window.scrollTo(0, 0);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
      window.scrollTo(0, 0);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedJobs();
      // this.generatePageNumbers(); 
    }
  }
 
  generatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  
  istrue = false
  ngOnInit(): void {
    this.jobsint.getmethod().subscribe(data => {
      this.jobsList = data;
      
      this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
      this.generatePageNumbers();
      this.updateDisplayedJobs();

      
    });
  }

  
  apply(item: any) {
    const endpoint = 'https://localhost:7058/api/Applied/ApplyForJob';
  
    this.http.post(endpoint, { jobsObj: item }).subscribe(
      response => {
        console.log('Applied for the job:', response);
        alert("Job applied success")
      
         item.applied=true
  
        
       
      }
    );

       }
      
       cancelUpload() {
        this.showUploadPopupFlag = false;
       
       }

       openUploadPopup(jobId: number) {
        this.showUploadPopupFlag = true;
        this.resumeData.jobId = jobId; 
      }



      onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.resumeData.resumeFile = file;
      }

      uploadResume() {
        const formData = new FormData();
        formData.append('Name', this.resumeData.name);
        formData.append('Email', this.resumeData.email);
        formData.append('ResumeFile', this.resumeData.resumeFile);
      
        const jobId = this.resumeData.jobId; 
      
        this.http.post(`https://localhost:7058/api/Resumes/${jobId}`, formData)
          .subscribe(
            response => {
             
              console.log('Resume uploaded successfully.');
              alert("Resume uploaded sucessfully")
             
              
            }
          );
      }



      //  showUploadPopup(job: any) {

      //   this.currentJobForUpload = job; // Set the current job for upload
    
      //   this.showUploadPopupFlag = true;
    
      // }
    
    
    
    
      // cancelUploadPopup() {
    
      //   this.showUploadPopupFlag = false;
    
      // }
    
    
    
    
      // saveResume(fileInput: any) {
    
      //   const file: File = fileInput.files[0];
    
    
    
    
      //   this.isUploadingResume = true; // Set the flag to indicate that resume is being uploaded
    
    
    
    
      //   this.jobsint.uploadResume(file).subscribe(
    
      //     response => {
    
      //       // Handle success response
    
      //       console.log('Resume uploaded successfully:', response);
    
      //       alert("Resume uploaded successfully");
    
      //       this.isUploadingResume = false; // Reset the flag once the resume is uploaded
    
      //       this.showUploadPopupFlag = false; // Close the upload popup
    
      //       if (this.currentJobForUpload) {
    
      //         this.currentJobForUpload.applied = true; // Mark the job as applied after successful upload
    
      //       }
    
      //     },
    
      //     error => {
    
      //       // Handle error response
    
      //       console.error('Error uploading resume:', error);
    
      //       alert("Error uploading resume");
    
      //       this.isUploadingResume = false; // Reset the flag in case of error
    
      //     }
    
      //   );
    
      // }
      search() {
        this.searchResults = this.jobsList.filter(job => {
          return job?.jobTitle?.toLowerCase().includes(this.searchText.toLowerCase());

        });
        if (this.searchText && !this.recentSearches.includes(this.searchText)) {
          this.recentSearches.unshift(this.searchText);
        }
        this.searchText = '';
      }
      
      selectResult() {
        if (this.searchResults && this.searchResults.length > 0) {
          const selectedResult = this.searchResults[0]; 
          // Assuming the first result is selected
          // Do something with the selected result, e.g., display details, navigate to a page, etc.
          // ...
          // Close the search or perform any other desired actions
         this.searchQuery = '';
          this.searchResults = null;
        }
      }
      clearSearch() {
        this.searchText = ''; // Clear the search text
        this.filteredJobs = this.jobs; // Reset the filtered jobs to show all jobs
        console.log('Clear search clicked');
      }
      onEnterPressed(event: any) {
        event.preventDefault();
        // Implement your logic when the enter key is pressed
        console.log('Enter key pressed');
        this.search(); // Call the search method on enter key press
      }
      highlightSearchText(text: string): string {
        if (!this.searchText || !text) {
          return text;
        }
      
        const searchRegex = new RegExp(this.searchText, 'gi');
        return text.replace(searchRegex, match => `<span class="highlight">${match}</span>`);
      }
      
      highlightText(text: string): HighlightedText[] {
        const highlightedText: HighlightedText[] = [];
      
        if (this.searchText && text) {
          const parts = text.split(new RegExp(`(${this.searchText})`, 'gi'));
      
          parts.forEach(part => {
            if (part.toLowerCase() === this.searchText.toLowerCase()) {
              highlightedText.push({ text: part, highlight: true });
            } else {
              highlightedText.push({ text: part, highlight: false });
            }
          });
        } else {
          highlightedText.push({ text: text, highlight: false });
        }
      
        return highlightedText;
      }
      
  
    }
