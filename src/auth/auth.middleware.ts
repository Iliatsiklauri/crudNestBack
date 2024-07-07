import { NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    // let cookie = req.headers.cookie.split('=');
    // console.log(cookie);

    next();
  }
}
