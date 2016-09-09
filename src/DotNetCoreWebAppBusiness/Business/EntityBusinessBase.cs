using System;
using System.Collections.Generic;
using Core.Common.Data.Models;
using Core.Common.Data.Interfaces;

namespace DotNetCoreWebApp.Business
{
    public abstract class EntityBusinessBase<TEntity>
        where TEntity : BaseObjectWithState, IObjectWithState, new()
    {
        protected virtual IEnumerable<TEntity> FindAllEntitiesByCriteria(                   
                    int? pageNumber,
                    int? pageSize,
                    out int totalRecords,
                    string sortColumn,
                    string sortDirection,
                    out int offset,
                    out int offsetUpperBound,
                    out int totalNumberOfPages,
                    OperationResult result,
                    string[] keywords)
                    {
                        throw new NotImplementedException();
                    }
    }
}