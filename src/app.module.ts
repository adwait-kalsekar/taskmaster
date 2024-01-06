import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { HealthzModule } from './healthz/healthz.module';

@Module({
  imports: [
    TasksModule,
    HealthzModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'taskmaster',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
