import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { HealthzModule } from './healthz/healthz.module';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HealthzModule,
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'taskmaster',
      entities: [Task],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
