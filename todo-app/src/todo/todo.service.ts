import {Injectable} from '@nestjs/common';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {Repository} from "typeorm";
import {Todo} from "./entities/todo.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}
  create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.insert(createTodoDto);
    return todo;
  }

  findAll() {
    const todos = this.todoRepository.find();
    return todos;
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({
      where: {
        id
      }
    })
    return todo;
  }

  async update(id: number) {
    const todo = await this.findOne(id);
    todo.completed = !todo.completed;
    this.todoRepository.save(todo);
    return this.todoRepository.save(todo);
  }

  async remove(id: number) {
    const t = await this.findOne(id);
    if (!t) {
      return {
        message: "Não encontrado!",
      };
    }
    this.todoRepository.delete(id)
    return {
      message: 'Removido com sucesso!'
    }
  }
}
