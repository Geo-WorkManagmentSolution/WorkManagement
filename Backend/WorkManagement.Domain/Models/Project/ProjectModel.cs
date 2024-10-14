using System.ComponentModel.DataAnnotations;
using WorkManagement.Domain.Entity;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Models.Project
{
    public class ProjectModel
    {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public string ProjectNumber { get; set; }
        public string ProjectDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }


    }
}
