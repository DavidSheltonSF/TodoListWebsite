namespace backend.Repositories;
using backend.Models;

public class TodoRepository : ITodoRepository
{
  private readonly List<Todo> _todos = [];
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