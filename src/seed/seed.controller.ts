import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  @ApiOkResponse({ description: 'Seed executed' })
  executeSeed() {
    return this.seedService.executeSeed();
  }
}
