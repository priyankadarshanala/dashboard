import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ResumeViewModel {
  applicantName: string;
  applicantEmail: string;
  resumeFileName: string;
  resumeFileData: string; // This will be a base64 encoded string
}

 interface JobResumeViewModel {
  jobId: number;
  companyName: string;
  jobTitle: string;
  experience: string;
  skills: string;
  jobType: string;
  postedDate: string;
  location: string;
  jobDescription: string;
  resumes: ResumeViewModel[];
}




@Injectable({
  providedIn: 'root'
})
export class JobsdetailsService {

  selectedJob: any;
  

  constructor(private http:HttpClient) { }


baseUrl = 'https://localhost:7058/api/Jobs';
//Url='https://localhost:7058/api/JobsPost/GetOrgJobs'
Url = 'https://localhost:7058/api/Jobs'; // Getting from backend 
applicantUrl = "https://localhost:7058/api/applicant";
applyjobsurl = "https://localhost:7058/api/Applied/ApplyForJob";
getappliedurl = "https://localhost:7058/api/Applied/AppliedJobs";
private APIUrl = 'https://localhost:7058/api/JobsPost/GetOrgJobs';



  getOrgJobs(email: string, username: string): Observable<any> {
    // Construct the URL with the email and username as query parameters
    const url = `${this.APIUrl}?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`;
    
    // Make the HTTP GET request to the API
    return this.http.get<any>(url);
  }


//profile urls

profilepostUrl="https://localhost:7058/api/Profile";

resumeuploadUrl="https://localhost:7058/api/ResumeClass";
resumeget="https://localhost:7058/api/ResumeClass/8";
private apiUrl = 'https://localhost:7058/api/ResumeClass';

getmethod(): Observable<any>{
  return this.http.get<any>(this.Url)
}



getapplicant(): Observable<any>{
  return this.http.get<any>(this.applicantUrl)
}

postmethod(data:any): Observable<any>{

  return this.http.post(this.baseUrl,data)
}

getapplied(){
  return this.http.get(this.getappliedurl)
}
editmethod(jobId: number, data: any): Observable<any> {
  const editurl = `https://localhost:7058/api/Jobs/${jobId}`;
  return this.http.put(editurl, data);
}

deletemethod(jobId: number){
  const deleteurl = `https://localhost:7058/api/Jobs/${jobId}`;
  return this.http.delete(deleteurl)
}

uploadResume(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(this.resumeuploadUrl, formData);
}

getResumes(): Observable<JobResumeViewModel[]> {
  return this.http.get<JobResumeViewModel[]>(this.apiUrl);
}


}
