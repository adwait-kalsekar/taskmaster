import { Controller, Get } from '@nestjs/common';

@Controller('healthz')
export class HealthzController {
  @Get()
  checkHealth(): object {
    return {
      message: 'Api Server is Up and Running',
    };
  }
}
