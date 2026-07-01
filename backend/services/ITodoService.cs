using backend.Dtos;
using backend.Models;

namespace backend.Services;

public interface ITodoService
{
  Task<IEnumerable<Todo>> GetAll();
  Task<Todo> GetById(int id);
  Task<TodoStats> GetStats();
  Task<Todo> Create(CreateTodoDto data);
  Task<Todo> Update(int id, UpdateTodoDto data);
  Task<Todo> ToggleCompletion(int id);
  Task Delete(int id);
}