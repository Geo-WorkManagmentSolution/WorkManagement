﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WorkManagement.Domain.Models;
using WorkManagementSolution.Employee;

namespace WorkManagement.Domain.Entity
{
    public class Project : FullyAuditableEntity
    {
        [Required]
        public string ProjectName { get; set; }
        public string? ProjectNumber { get; set; }
        public string? ProjectDescription { get; set; }
        public string? WorkOrderNumber { get; set; }
        public string? WorkOrderName { get; set; }
        public double? WorkOrderAmount { get; set; }
        public int? PeriodOfWorkInMonths { get; set; }
        public ProjectStatus? Status { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? WorkOrderDate { get; set; }
        // public List<ProjectWorkOrders> ProjectWorkOrderDocuments { get; set; }
    }

    public class ProjectWorkOrders : BaseEntity
    {
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public int? FileSize { get; set; }
        public byte[]? FileContent { get; set; }
        public FileType? FileType { get; set; }

        public int? ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project? Project { get; set; }
    }

    public enum ProjectStatus
    {
        Upcoming,
        Ongoing,
        Completed,
        OnHold,
        Closed
    }

    public class ProjectTask : FullyAuditableEntity
    {
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Notes { get; set; }
        public ProjectTaskStatus? Status { get; set; }
        public ProjectTaskPriorityStatus? Priority { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double? EstimatedHours { get; set; }
        public double? RemainingHours { get; set; }
        public double? CompletedHours { get; set; }
        public List<int>? AssignedEmployees { get; set; }
        public int? ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project? Project { get; set; }

    }

    public enum ProjectTaskStatus
    {
        New,
        Active,
        Completed,
        Removed

    }

    public enum ProjectTaskPriorityStatus
    {
        High,
        Medium,
        Low,

    }
}
