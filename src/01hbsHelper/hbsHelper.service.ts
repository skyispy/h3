import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';

@Injectable()
export class HbsHelpers {
  static concat(...args: any[]) {
    // 마지막 인수는 Handlebars 옵션 객체이므로 제외하고 결합
    return args.slice(0, -1).join('');
  }
}