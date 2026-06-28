using backend.Dtos;
using backend.Models;

namespace backend.Services;

public interface ITodoService
{
  IEnumerable<Todo> GetAll();
  Todo GetById(int id);
  Todo Create(CreateTodoDto data);
  Todo Update(int id, UpdateTodoDto data);
  void Delete(int id);
}