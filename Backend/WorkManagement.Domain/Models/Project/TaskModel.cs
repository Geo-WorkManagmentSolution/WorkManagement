using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkManagement.Domain.Entity;

namespace WorkManagement.Domain.Models.Project
{
    public class TaskModel
    {
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Notes { get; set; }
        public ProjectTaskStatus? Status { get; set; }
        public ProjectTaskPriorityStatus? Priority { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public double? EstimatedHours { get; set; }
        public double? RemainingHours { get; set; }
        public double? CompletedHours { get; set; }
        public List<int>? AssignedEmployees { get; set; }
        public int? ProjectId { get; set; }
    }

    public class TaskDashboardModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public ProjectTaskStatus? Status { get; set; }
        public ProjectTaskPriorityStatus? Priority { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public double? EstimatedHours { get; set; }
        public double? RemainingHours { get; set; }
        public double? CompletedHours { get; set; }
    }
}
