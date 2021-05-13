import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const {keyword} = req.query;
    if (keyword) {
      next();
    } else {
      throw new NotFoundException("keyword not found") 
    }
  }
}
