using backend.Dtos;
using backend.Models;
using backend.Services;
using backend.Types;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/todos")]
public class TodoController(ITodoService todoService) : ControllerBase
{
  private readonly ITodoService _service = todoService;

  [HttpGet]
  async public Task<IActionResult> GetAll(
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 10,
    [FromQuery] TodoFilter todoFilter =  TodoFilter.All
  )
  {
    Console.WriteLine(todoFilter);
    return Ok(await _service.GetAll(page, pageSize, todoFilter));
  }

  [HttpGet("{id}")]
  async public Task<IActionResult> GetById(int id)
  {
    var todo = await _service.GetById(id);
    return Ok(todo);
  }

  [HttpPost]
  async  public Task<IActionResult> Create(CreateTodoDto data)
  {
    return Ok(await _service.Create(data));
  }

  [HttpPatch("{id}")]
  async public Task<IActionResult> Update(int id, UpdateTodoDto data)
  {
    return Ok(await _service.Update(id, data));
  }

  [HttpPut("toggleCompletion/{id}")]
  async public Task<IActionResult> TogleCompletion(int id)
  {
    var todo = await _service.ToggleCompletion(id);
    return Ok(todo);
  }

  [HttpDelete("{id}")]
  async public Task<IActionResult> Delete(int id)
  {
   await _service.Delete(id);
    return NoContent();
  }

  [HttpGet("stats")]
  async public Task<IActionResult> GetStats()
  {
    return Ok(await _service.GetStats());
  }
}