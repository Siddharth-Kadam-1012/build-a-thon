using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BankingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private static List<JobOpening> _jobs = new List<JobOpening>
        {
            new JobOpening 
            { 
                Id = 1, 
                Title = "Relationship Manager",
                Location = "India",
                Department = "Retail Banking",
                About = "As a Relationship Manager at YourBank, you will be responsible for developing and maintaining relationships with our valued customers. You will proactively identify their financial needs and offer tailored solutions to help them achieve their goals. We are seeking individuals with excellent communication skills, a strong sales acumen, and a passion for delivering exceptional customer service.",
                Requirements = new List<string>
                {
                    "Bachelor's degree in Business, Finance, or a related field",
                    "Minimum of 3 years of experience in sales or relationship management in the banking industry",
                    "Proven track record of meeting and exceeding sales targets",
                    "Excellent interpersonal and negotiation skills",
                    "Strong knowledge of banking products and services"
                }
            },
            new JobOpening 
            { 
                Id = 2, 
                Title = "Risk Analyst",
                Location = "India",
                Department = "Risk Management",
                About = "As a Risk Analyst at YourBank, you will play a vital role in identifying and assessing potential risks to our organization. You will analyze data, conduct risk assessments, and develop strategies to mitigate risks. We are looking for detail-oriented individuals with strong analytical skills and a solid understanding of risk management principles.",
                Requirements = new List<string>
                {
                    "Bachelor's degree in Finance, Economics, or a related field",
                    "Minimum of 2 years of experience in risk management or a similar role",
                    "Proficiency in risk analysis tools and techniques",
                    "Strong analytical and problem-solving skills",
                    "Knowledge of regulatory requirements and industry best practices"
                }
            },
            new JobOpening 
            { 
                Id = 3, 
                Title = "IT Security Specialist",
                Location = "India",
                Department = "Information Technology",
                About = "As an IT Security Specialist at YourBank, you will be responsible for ensuring the security and integrity of our information systems. You will develop and implement security protocols, conduct vulnerability assessments, and respond to security incidents. We are seeking individuals with a strong technical background, knowledge of cybersecurity best practices, and a commitment to maintaining the confidentiality of customer data.",
                Requirements = new List<string>
                {
                    "Bachelor's degree in Computer Science, Information Security, or a related field",
                    "Minimum of 5 years of experience in IT security or a similar role",
                    "In-depth knowledge of network security protocols and technologies",
                    "Familiarity with regulatory frameworks such as PCI DSS and GDPR",
                    "Professional certifications such as CISSP or CISM are preferred"
                }
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<JobOpening>> GetAll()
        {
            return Ok(_jobs);
        }

        [HttpGet("{id}")]
        public ActionResult<JobOpening> GetById(int id)
        {
            var job = _jobs.FirstOrDefault(j => j.Id == id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        [HttpPost]
        public ActionResult<JobOpening> Create(JobOpening job)
        {
            job.Id = _jobs.Any() ? _jobs.Max(j => j.Id) + 1 : 1;
            _jobs.Add(job);
            return CreatedAtAction(nameof(GetById), new { id = job.Id }, job);
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, JobOpening job)
        {
            var existingJob = _jobs.FirstOrDefault(j => j.Id == id);
            if (existingJob == null)
            {
                return NotFound();
            }

            existingJob.Title = job.Title;
            existingJob.Location = job.Location;
            existingJob.Department = job.Department;
            existingJob.About = job.About;
            existingJob.Requirements = job.Requirements;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var job = _jobs.FirstOrDefault(j => j.Id == id);
            if (job == null)
            {
                return NotFound();
            }

            _jobs.Remove(job);
            return NoContent();
        }
    }

    public class JobOpening
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string About { get; set; } = string.Empty;
        public List<string> Requirements { get; set; } = new List<string>();
    }
}
