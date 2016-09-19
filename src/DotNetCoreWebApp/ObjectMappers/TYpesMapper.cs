using DotNetCoreLibrary.Core.Common.Utilities;

namespace DotNetCoreWebApp.ObjectMappers
{
    public static class TypesMapper
    {
        public static TDestination Map<TSource, TDestination>(TSource source)
            where TSource : new() where TDestination : new()
        {
            TDestination toReturn = new SimpleObjectMapper<TSource, TDestination>()
                .Map(source);
            return toReturn;
        }

    }
}
