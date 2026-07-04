namespace backend.Repositories;

using backend.Dtos;
using backend.Models;
using backend.Types;

public interface ITodoRepository
{
  Task<IEnumerable<Todo>> GetAll(int page, int pageSize, TodoFilter todoFilter);
  Task<Todo?> GetById(int id);
  Task<TodoStats> GetStats();
  Task<Todo> Add(Todo todo);
  Task<Todo?> Update(Todo todo);
  Task Delete(int id);
}