using backend.Dtos;
using backend.Models;

interface TodoRepository
{
  List<Todo> GetAll();
  Todo GetById(string id);
  Todo Add(CreateTodoDto data);
  Todo? Update(UpdateTodoDto data);
  Todo? Delete(string id);
}