import * as cheerio from 'cheerio';
import axios from 'axios';
import xlsx from 'xlsx';

async function Job_Postings(){
    const result=await axios.get("https://www.freshersworld.com/jobs");
    //console.log(result);
    const jobDetails=cheerio.load(result.data);
    //console.log(jobDetails);
    const jobs=[];
    jobDetails(".col-md-12.col-lg-12.col-xs-12.padding-none.job-container.jobs-on-hover.top_space").each((index,ele)=>{
        const jobTitle=jobDetails(ele).find(".wrap-title.seo_title").text().trim();
        const companyName=jobDetails(ele).find(".latest-jobs-title.font-16.margin-none.inline-block.company-name").text().trim();
        const location=jobDetails(ele).find(".job-location.display-block.modal-open.job-details-span").text().trim();
        const postingDate=jobDetails(ele).find(".ago-text").text().trim();
        const experience=jobDetails(ele).find(".experience.job-details-span").text().trim();
        jobs.push({
            Title:jobTitle,
            Name:companyName,
            Location:location,
            Date:postingDate,
            exp:experience
        });
    });
    //console.log(jobs); 
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(jobs);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'jobs');

        // Write the workbook to a file
        xlsx.writeFile(workbook, 'Job_Postings.xlsx'); 
}
Job_Postings();
