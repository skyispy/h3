import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';

@Injectable()
export class HbsHelpers {
  static concat(...args: any[]) {
    // 마지막 인수는 Handlebars 옵션 객체이므로 제외하고 결합
    return args.slice(0, -1).join('');
  }

  static formDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}. ${month}. ${day}`;
  }

  static starCount(count) {
    let star = "";
    switch(count) {
      case 1:
        star = "★☆☆☆☆";
        break;
      case 2:
        star = "★★☆☆☆";
        break;
      case 3:
        star = "★★★☆☆";
        break;
      case 4:
        star = "★★★★☆";
        break;
      case 5:
        star = "★★★★★";
        break;
    }
    return star;
  }

  static compareUser(id, loginUserId) {
    return id === loginUserId;
  }

  static priceComma(num) {
    const count = Math.floor(num / 1000);
    console.log(count)
    if(count > 0) {
      const stringNum = `${num}`;
      for(let i = 0; i < stringNum.length; i++) {
        console.log(stringNum.slice(0, stringNum.length));
      }
      console.log(stringNum);
      return `${num}`;
    }
  }
}
