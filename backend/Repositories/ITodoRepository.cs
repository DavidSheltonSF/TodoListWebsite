namespace backend.Repositories;
using backend.Models;

public interface ITodoRepository
{
  List<Todo> GetAll();
  Todo GetById(string id);
  Todo Add(Todo data);
  Todo? Update(Todo data);
  Todo? Delete(string id);
}