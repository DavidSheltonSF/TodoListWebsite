namespace backend.Repositories;
using backend.Models;

public interface ITodoRepository
{
  List<Todo> GetAll();
  Todo? GetById(int id);
  Todo Add(Todo todo);
  Todo? Update(Todo todo);
  void Delete(int id);
}