using System;
using System.Linq.Dynamic.Core;
using WorkManagement.Domain.Models;
using WorkManagmentSolution.EFCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


namespace WorkManagement.Service
{
    public class AdvanceSearchService
    {
        private readonly WorkManagementDbContext _dbContext;
        public AdvanceSearchService(WorkManagementDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<T> ApplySearch<T>(List<Criterion> criterias) where T : class
        {

            var query = _dbContext.Set<T>().AsQueryable();
            foreach (var criterion in criterias)
            {
                var filterExpression = $"{criterion.Field} {criterion.Operator} @0";
                query = query.Where(filterExpression, criterion.Value);

                if (!string.IsNullOrEmpty(criterion.NextOperator))
                {
                    query = criterion.NextOperator == "AND"
                        ? query.Where($"AND")
                        : query.Where($"OR");
                }
            }
            return query;
        }
    }
}
