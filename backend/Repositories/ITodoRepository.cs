namespace backend.Repositories;

using backend.Dtos;
using backend.Models;

public interface ITodoRepository
{
  Task<IEnumerable<Todo>> GetAll();
  Task<Todo?> GetById(int id);
  Task<TodoStats> GetStats();
  Task<Todo> Add(Todo todo);
  Task<Todo?> Update(Todo todo);
  Task Delete(int id);
}