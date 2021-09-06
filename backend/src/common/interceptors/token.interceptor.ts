import {CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor<T> implements NestInterceptor<T> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
        const method = context.getArgs()[0].method;
        if (method !== 'GET') {
            const headers = context.getArgs()[0].headers;
            if (headers.authorization === process.env.TOKEN) {
                return next.handle();
            } else {
                throw new UnauthorizedException();
            }
        } else {
            return next.handle();
        }
    }
}
