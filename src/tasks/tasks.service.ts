import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   let tasks = this.getAllTasks();

  //   const { status, search } = filterDto;

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       const searchTerm = search.toLowerCase();
  //       if (
  //         task.title.toLowerCase().includes(searchTerm) ||
  //         task.description.toLowerCase().includes(searchTerm)
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }

  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    if (!task) {
      throw new InternalServerErrorException();
    }

    await this.tasksRepository.save(task);
    return task;
  }

  async updateTask(id: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);

    if (task.status !== TaskStatus.DONE) {
      task.title = createTaskDto.title;
      task.description = createTaskDto.description;
      await this.tasksRepository.save(task);
    }

    return task;
  }

  async updateStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    const { status } = updateTaskStatusDto;
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.tasksRepository.delete({ id });

    if (task.affected === 0) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }

    return;
  }
}
