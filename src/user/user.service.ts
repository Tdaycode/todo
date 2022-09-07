import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  
  async create(data: User): Promise<User> {
    if (data.email) {
      throw new BadRequestException("Email Already Exist")
    }
    return this.prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    let users = this.prisma.user.findMany();
    if (!users) {
      throw new NotFoundException("No user available")
    }
    return users
  }

  async findOne(id: number): Promise<User | null> {
    let user = this.prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      throw new NotFoundException(`No user with ${id}`)
    }
    return user
  }

  async update(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: { completed: true },
     
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}
