namespace backend.Repositories;

using backend.Dtos;
using backend.Models;

public class TodoRepository : ITodoRepository
{
  private static readonly List<Todo> _todos = [];
  public IEnumerable<Todo> GetAll()
  {
    return _todos;
  }

  public Todo? GetById(int id)
  {
    return _todos.FirstOrDefault((todo) => todo.Id == id);
  }

  public Todo Add(Todo todo)
  {
    todo.Id = _todos.Count;
    _todos.Add(todo);
    return todo;
  }

  public TodoStats GetStats()
  {

    return new TodoStats(_todos.Count,
    _todos.Count((todo) => todo.IsCompleted == true),
    _todos.Count((todo) => todo.IsCompleted == false));
  }

  public Todo? Update(Todo todo)
  {
    var existingTodo = GetById(todo.Id);

    if (existingTodo == null)
    {
      return null;
    }


    existingTodo.Title = todo.Title;
    existingTodo.IsCompleted = todo.IsCompleted;

    return existingTodo;
  }

  public void Delete(int id)
  {

    var todo = GetById(id);

    if (todo != null)
      _todos.Remove(todo);
  }
}