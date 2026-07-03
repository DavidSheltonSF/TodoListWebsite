using System.Reflection.Metadata.Ecma335;
using backend.Dtos;
using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class TodoService(ITodoRepository repository) : ITodoService
{
  private readonly ITodoRepository _repository = repository;

  async public Task<IEnumerable<Todo>> GetAll(int page, int pageSize)
  {
    return await _repository.GetAll(page, pageSize);
  }

  async public Task<Todo> GetById(int id)
  {
    var todo = await _repository.GetById(id)
    ?? throw new KeyNotFoundException($"Todo with id {id} was not found");
    return todo;
  }

  async public Task<TodoStats> GetStats()
  {
    return await _repository.GetStats();
  }

  async public Task<Todo> Create(CreateTodoDto data)
  {
    var todo = new Todo
    {
      Title = data.Title,
      IsCompleted = false,
      CreatedAt = DateTimeOffset.UtcNow
    };

    return await _repository.Add(todo);
  }

  async public Task<Todo> Update(int id, UpdateTodoDto data)
  {
    var todo = await GetById(id) ?? throw new KeyNotFoundException("Todo not found");

    todo.Title = data.Title ?? todo.Title;
    todo.IsCompleted = data.IsCompleted ?? todo.IsCompleted;

    await _repository.Update(todo);
    return todo;
  }

  async public Task<Todo> ToggleCompletion(int id)
  {
    var existingTodo = await GetById(id) ?? throw new KeyNotFoundException("Todo not found");

    var data = new UpdateTodoDto(Title: existingTodo.Title, IsCompleted: !existingTodo.IsCompleted );
    await Update(id, data);
    return existingTodo;
  }

  async public Task Delete(int id)
  {
    if (await GetById(id) == null)
      throw new KeyNotFoundException("Todo not found");

    await _repository.Delete(id);
  }
}