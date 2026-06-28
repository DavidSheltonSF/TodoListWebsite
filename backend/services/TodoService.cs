using System.Reflection.Metadata.Ecma335;
using backend.Dtos;
using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class TodoService(ITodoRepository repository) : ITodoService
{
  private readonly ITodoRepository _repository = repository;

  public IEnumerable<Todo> GetAll()
  {
    return _repository.GetAll();
  }

  public Todo GetById(int id)
  {
    var todo = _repository.GetById(id)
    ?? throw new KeyNotFoundException($"Todo with id {id} was not found");
    return todo;
  }

  public Todo Create(CreateTodoDto data)
  {
    var todo = new Todo
    {
      Title = data.Title,
      IsCompleted = false
    };

    return _repository.Add(todo);
  }

  public Todo Update(int id, UpdateTodoDto data)
  {
    var todo = GetById(id) ?? throw new KeyNotFoundException("Todo not found");

    todo.Title = data.Title ?? todo.Title;
    todo.IsCompleted = data.IsCompleted ?? todo.IsCompleted;

    _repository.Update(todo);
    return todo;
  }

  public void Delete(int id)
{
  if(GetById(id) == null)
    throw new KeyNotFoundException("Todo not found");

    _repository.Delete(id);
  }
}