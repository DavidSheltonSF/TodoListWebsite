namespace backend.Repositories;

using backend.Database;
using backend.Dtos;
using backend.Models;
using backend.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

public class TodoRepository(TodoDbContext context) : ITodoRepository
{
  private readonly TodoDbContext _context = context;

  async public Task<IEnumerable<Todo>> GetAll(int page, int pageSize, TodoFilter todoFilter)
  {

    IQueryable<Todo> query = _context.Todos;

    switch (todoFilter)
    {
      case TodoFilter.Done:
        query = query.Where((todo) => todo.IsCompleted);
        break;

      case TodoFilter.Remaining:
        query = query.Where((todo) => !todo.IsCompleted);
        break;

      default:
        break;
    }

    return await query
    .OrderByDescending((todo) => todo.CreatedAt)
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();
  }

 async public Task<Todo?> GetById(int id)
  {
    return await _context.Todos.FirstOrDefaultAsync((todo) => todo.Id == id);
  }

  async public Task<Todo> Add(Todo todo)
  {
    await _context.Todos.AddAsync(todo);
    await _context.SaveChangesAsync();
    return todo;
  }

 async public Task<TodoStats> GetStats()
  {
    var all = await _context.Todos.CountAsync();
    var done = await _context.Todos.CountAsync((todo) => todo.IsCompleted);
    return new TodoStats(
      all,
      done,
      all - done
    );
  }

  async public Task<Todo?> Update(Todo todo)
  {
  
    var existingTodo = await _context.Todos.FindAsync(todo.Id);

    if (existingTodo == null)
    {
      return null;
    }
    
    existingTodo.Title = todo.Title;
    existingTodo.IsCompleted = todo.IsCompleted;

    await _context.SaveChangesAsync();

    return existingTodo;
  }

  async public Task Delete(int id)
  {
    var todo = await _context.Todos.FindAsync(id) ?? throw new KeyNotFoundException("Todo not found");
    _context.Todos.Remove(todo);
    await _context.SaveChangesAsync();
  }
}