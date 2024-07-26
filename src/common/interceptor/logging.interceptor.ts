import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const date = new Date();
        const req = context.switchToHttp().getRequest();
        const log = `메서드:${req.method} 주소:${req.originalUrl} 시각:${date.toLocaleString()}`

        console.log(`요청 : ${log}`)
        return next.handle().pipe(
            tap(() => {
                const date2 = new Date();
                const ms = date2.getTime() - date.getTime() + "ms"; // 시간차이
                console.log(`응답 : ${log} 응답속도 : ${ms}`)
            })
        )
    }
}