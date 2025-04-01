import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      console.log("Post req dto: ", createUserDto);
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === "23505") {
        // PostgreSQL код ошибки для нарушения уникальности
        throw new ConflictException("Username or email already exists");
      } else {
        // Логируем другие ошибки
        console.error("Error creating user: ", error);
        throw new InternalServerErrorException("Something went wrong");
      }
    }
  }

  async findAll(role?: Role): Promise<Omit<User, "password">[] | undefined> {
    console.log("Get all users:", role);
    
     const users = role
       ? await this.userRepository.find({ where: { role } })
       : await this.userRepository.find();

     return users.map((user) => {
       const { password, ...userWithoutPassword } = user;
       return userWithoutPassword as Omit<User, "password">;
     });
  }

  findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user: User = await this.userRepository.findOne({ where: { id } });
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
