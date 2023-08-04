import { Component,  OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Job } from 'src/app/models/job';
import { HighlightPipePipe } from 'src/app/highlight-pipe.pipe';
import { FilterPipe } from 'src/app/filter.pipe';
import { JobsdetailsService } from 'src/app/jobsdetails.service';

interface HighlightedText {
  text: string;
  highlight: boolean;
}


@Component({
  selector: 'app-jobssection',
  templateUrl: './jobssection.component.html',
  providers: [HighlightPipePipe, FilterPipe],
  styleUrls: ['./jobssection.component.scss']
})
export class JobssectionComponent implements OnInit {

  searchInput: string = '';



  jobsList: any[] = [];
  itemsPerPage: number = 12;
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  displayedJobsList: any[] = [];
  selectedJob: any = {};

  searchQuery: string;
  searchResults: any[] | null = [];
  searchText: string = '';
  filteredJobs: Job[] = [];
  jobs: any;
  recentSearches: any;

  showEditFormFlag = false;
  hasResults: boolean = true;



  constructor(private jobsint: JobsdetailsService, private location: Location, private http: HttpClient) {
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
      this.generatePageNumbers();
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
    // const email = 'Priyanka123@gmail.com';
    // const username = 'Priyanka';

    this.jobsint.getmethod().subscribe(data => {
      this.jobsList = data;
      this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
      this.generatePageNumbers();
      this.updateDisplayedJobs();
      // this.fetchJobsList();

    });
    // Call the getOrgJobs function with the provided email and username
    // this.jobsint.getOrgJobs(email, username).subscribe(
    //   (data) => {
    //     // Process the response data here
    //     this.jobsList = data;
    //     this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
    //     this.generatePageNumbers();
    //     this.updateDisplayedJobs();
    //   },
    //   (error) => {
    //     // Handle error if any
    //     console.error('API Error:', error);
    //   }
    // )

  }
  onFormSubmit(email: string, username: string) {
    // Call the getJobsByUser function with the provided email and username
    this.getJobsByUser(email, username);
  }

  getJobsByUser(email: string, username: string) {
    // Call the getOrgJobs function with the provided email and username
    this.jobsint.getOrgJobs(email, username).subscribe(
      (data) => {
        // Process the response data here
        this.jobsList = data;
        this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
        this.generatePageNumbers();
        this.updateDisplayedJobs();
      },
      (error) => {
        // Handle error if any
        console.error('API Error:', error);
      }
    );
  }
  // onSubmit(){
  //   console.log(this.selectedJob)
  // }
  showEditForm(job: any) {
    this.selectedJob = { ...job }; // Create a copy of the selected job to avoid modifying the original data directly
    this.showEditFormFlag = true;
  }

  hideEditForm(): void {
    this.showEditFormFlag = false;
  }

  cancelEditForm(): void {
    this.showEditFormFlag = false;

  }
  // fetchJobsList() {
  //   // Make an HTTP request to your ASP.NET API endpoint
  //   this.http.get<any[]>('https://localhost:7058/api/Jobs').subscribe(
  //     (response) => {
  //       // Assign the received data to the jobsList property
  //       this.jobsList = response;
  //     },
  //     (error) => {
  //       console.log('Error fetching jobs list:', error);
  //     }
  //   );
  // }


  onSubmit() {
    this.jobsint.editmethod(this.selectedJob.jobId, this.selectedJob).subscribe(
      (response) => {
        // Handle success response
        alert("Job updated successfully");
        console.log('Job updated successfully:', response);
        this.hideEditForm(); // Hide the edit form after successful update
        window.location.reload();
      }
    );
  }

  delete(jobId: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobsint.deletemethod(jobId).subscribe(
        (response) => {
          alert("Job Deleted Successfully")
          console.log("deleted", response)
          window.location.reload();
        }
      )
    }
  }


  search() {
    this.searchResults = this.jobsList.filter(job => {
      return job.jobTitle.toLowerCase().includes(this.searchText.toLowerCase());
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
    this.hasResults = true;
    console.log('Clear search clicked');
  }
  onEnterPressed(event: any) {
    event.preventDefault();
    // Implement your logic when the enter key is pressed
    console.log('Enter key pressed');
    this.search();
    if (event.key === 'Enter') {
      this.search(); // Call the search function when Enter is pressed
    } // Call the search method on enter key press
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





