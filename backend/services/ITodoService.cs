using backend.Dtos;
using backend.Models;

namespace backend.Services;

public interface ITodoService
{
  IEnumerable<Todo> GetAll();
  Todo GetById(int id);
  TodoStats GetStats();
  Todo Create(CreateTodoDto data);
  Todo Update(int id, UpdateTodoDto data);
  Todo ToggleCompletion(int id);
  void Delete(int id);
}