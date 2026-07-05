namespace backend.Types;
public record Page<T>(IEnumerable<T> Items, int CurrentPage, int TotalPages, int NextPage);