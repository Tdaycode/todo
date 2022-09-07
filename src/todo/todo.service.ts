import { Injectable, BadRequestException, NotFoundException, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Todo, Prisma } from '@prisma/client';


@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) { }
  
  async getAllTodo(): Promise<Todo[]> {
    const todos = this.prisma.todo.findMany();
    if (!todos) {
      throw new NotFoundException("No todos available")
    }
    return todos
  }

    async getTodo(id: number): Promise<Todo | null> {
      const todo = this.prisma.todo.findUnique({ where: { id: Number(id) } });
      if (!todo) {
        throw new NotFoundException(`No todo with id ${id}`)
      }
      return todo
    }
  
  async createTodo(data: Todo): Promise<Todo> {
    if (!data) {
        throw new BadRequestException("Body details is required")
      }
    return this.prisma.todo.create({
      data,
    });
  }
  async userGetTodo(id: number): Promise<Todo[]> {
    const todo = this.prisma.todo.findMany({
      where:{ownerId: Number(id)}
    })
    if (!todo) {
      throw new BadRequestException("No todo found")
    }
    return todo

  } 
  async updateTodo(id: number, data: Todo): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id: Number(id) },
      data: { title: data.title, content: data.content, startdate: data.startdate,enddate: data.enddate },
    });
  }

  async deleteTodo(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id: Number(id) },
    });
  }
   
}
