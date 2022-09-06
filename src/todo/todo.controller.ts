import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '@prisma/client';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() postData: Todo): Promise<Todo> {
    return this.todoService.createTodo(postData);
  }

  @Get()
  async findAll() {
    return this.todoService.getAllTodo();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.todoService.getTodo(+id);
  }
  @Get(':id/user')
  async userGetTodo(@Param('id') id: string) {
    return this.todoService.userGetTodo(+id)
    }
    

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //   return this.todoService.update(+id, updateTodoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.deleteTodo(+id);
  }
}
