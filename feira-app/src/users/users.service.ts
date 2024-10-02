import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.repository.save(createUserDto);
    return user;
  }

  findAll() {
    const users = this.repository.find();
    return users;
  }

  findByEmail(email: string) {
    const user = this.repository.findOne({
      where: {
        email
      }
    });
    return user
  }

  findOne(id: number) {
    const user = this.repository.findOne({
      where: {
        id
      }
    });
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.repository.save({
      ...user,
      ...updateUserDto
    });
  }

  remove(id: number) {
    this.repository.delete(id);
    return {
      message: "Usuario deletado com sucesso!",
    }
  }
}
