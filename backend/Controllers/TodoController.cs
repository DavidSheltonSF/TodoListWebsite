using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/todos")]
public class TodoController(ITodoService todoService) : ControllerBase
{
  private readonly ITodoService _service = todoService;

  [HttpGet]
  public IActionResult GetAll()
  {
    return Ok(_service.GetAll());
  }

  [HttpGet("{id}")]
  public IActionResult GetById(int id)
  {
    var todo = _service.GetById(id);
    return Ok(todo);
  }

  [HttpPost]
  public IActionResult Create(CreateTodoDto data)
  {
    return Ok(_service.Create(data));
  }

  [HttpPatch("{id}")]
  public IActionResult Update(int id, UpdateTodoDto data)
  {
    return Ok(_service.Update(id, data));
  }

  [HttpDelete("{id}")]
  public IActionResult Delete(int id)
  {
    _service.Delete(id);
    return NoContent();
  }

  [HttpGet("stats")]
  public IActionResult GetStats()
  {
    return Ok(_service.GetStats());
  }
}