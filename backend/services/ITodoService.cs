using backend.Dtos;
using backend.Models;
using backend.Types;

namespace backend.Services;

public interface ITodoService
{
  Task<Page<Todo>> GetAll(int page, int pageSize, TodoFilter todoFilter);
  Task<Todo> GetById(int id);
  Task<TodoStats> GetStats();
  Task<Todo> Create(CreateTodoDto data);
  Task<Todo> Update(int id, UpdateTodoDto data);
  Task<Todo> ToggleCompletion(int id);
  Task Delete(int id);
}