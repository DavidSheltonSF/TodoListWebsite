namespace backend.Repositories;
using backend.Models;

public interface ITodoRepository
{
  List<Todo> GetAll();
  Todo? GetById(int id);
  Todo Add(Todo data);
  Todo? Update(Todo data);
  Todo? Delete(int id);
}