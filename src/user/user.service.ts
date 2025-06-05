import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-pass.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';


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

  async changePassword(
    id: string,
    email,
    changePasswordDto: ChangePasswordDto
  ) {
    const { currentPassword, newPassword } = changePasswordDto;

    const userCheck = await this.userRepository.findOne({ where: { email } });

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (user.id !== userCheck.id && user.role != Role.ADMIN) {
      throw new UnauthorizedException("Not your profile");
    }
    if (currentPassword !== user.password) {
      throw new UnauthorizedException("User not found");
    }
    user.password = newPassword;

    return this.userRepository.save(user);
  }

  async findAllNonAdmins(): Promise<Omit<User, "password">[]> {
    const users = await this.userRepository.find({
      where: {
        role: Not(Role.ADMIN),
      },
    });

    return users.map(({ password, ...rest }) => rest);
  }
}
