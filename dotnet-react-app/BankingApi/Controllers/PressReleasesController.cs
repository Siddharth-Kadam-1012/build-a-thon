using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BankingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PressReleasesController : ControllerBase
    {
        private static List<PressRelease> _pressReleases = new List<PressRelease>
        {
            new PressRelease
            {
                Id = 1,
                Title = "YourBank Launches New Rewards Program to Enhance Customer Loyalty and Satisfaction",
                Location = "India",
                Date = "06/11/2024",
                Description = "YourBank is pleased to announce the introduction of our new Rewards Program, aimed at rewarding our loyal customers and enhancing their banking experience. The program offers exclusive benefits, discounts, and personalized offers tailored to individual customer preferences. With this initiative, YourBank reaffirms its commitment to delivering exceptional value and building lasting relationships with our valued customers.",
                ImageUrl = "https://www.figma.com/api/mcp/asset/26d2235f-e716-42a8-926d-89776c3c2962"
            },
            new PressRelease
            {
                Id = 2,
                Title = "YourBank Expands Branch Network with Opening of New Location in Chennai",
                Location = "India",
                Date = "12/11/2024",
                Description = "YourBank is excited to announce the grand opening of our newest branch in [City]. This expansion is a testament to our continued commitment to serving our customers and providing them with convenient access to our comprehensive range of banking services. The new branch will feature state-of-the-art facilities, a team of dedicated professionals, and a personalized approach to banking, further strengthening our presence in the local community.",
                ImageUrl = "https://www.figma.com/api/mcp/asset/6100fb44-7ca6-4bc6-a1e6-d1a18eaeedb3"
            },
            new PressRelease
            {
                Id = 3,
                Title = "YourBank Partners with Local Nonprofit to Support Financial Education Initiatives",
                Location = "India",
                Date = "24/12/2024",
                Description = "YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainable practices into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.",
                ImageUrl = "https://www.figma.com/api/mcp/asset/b7ffe55e-076f-41ba-808a-98cc9d78c4ff"
            },
            new PressRelease
            {
                Id = 4,
                Title = "YourBank Launches Sustainable Banking Initiative to Promote Environmental Responsibility",
                Location = "India",
                Date = "28/12/2024",
                Description = "YourBank is excited to unveil our new Sustainable Banking Initiative, demonstrating our commitment to environmental responsibility. This initiative includes a range of sustainable banking products and services, such as green loans, eco-friendly investment options, and paperless banking solutions. By incorporating sustainable practices into our operations, we aim to contribute to a greener future while providing innovative banking solutions to our customers.",
                ImageUrl = "https://www.figma.com/api/mcp/asset/c77d69b3-0dea-4d70-954f-178e18af6c82"
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<PressRelease>> GetAll()
        {
            return Ok(_pressReleases);
        }

        [HttpGet("{id}")]
        public ActionResult<PressRelease> GetById(int id)
        {
            var pressRelease = _pressReleases.FirstOrDefault(p => p.Id == id);
            return pressRelease == null ? NotFound() : Ok(pressRelease);
        }

        [HttpPost]
        public ActionResult<PressRelease> Create(PressRelease pressRelease)
        {
            pressRelease.Id = _pressReleases.Any() ? _pressReleases.Max(p => p.Id) + 1 : 1;
            _pressReleases.Add(pressRelease);
            return CreatedAtAction(nameof(GetById), new { id = pressRelease.Id }, pressRelease);
        }

        [HttpPut("{id}")]
        public ActionResult<PressRelease> Update(int id, PressRelease pressRelease)
        {
            var existing = _pressReleases.FirstOrDefault(p => p.Id == id);
            if (existing == null) return NotFound();

            existing.Title = pressRelease.Title;
            existing.Location = pressRelease.Location;
            existing.Date = pressRelease.Date;
            existing.Description = pressRelease.Description;
            existing.ImageUrl = pressRelease.ImageUrl;

            return Ok(existing);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var pressRelease = _pressReleases.FirstOrDefault(p => p.Id == id);
            if (pressRelease == null) return NotFound();

            _pressReleases.Remove(pressRelease);
            return NoContent();
        }
    }

    public class PressRelease
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }
}
