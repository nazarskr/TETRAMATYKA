import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { storageUtil } from '../utils/storage.util';

@Injectable()
export class ImageUrlInterceptor<T> implements NestInterceptor<T> {
    constructor(private seconds?: number) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
        return next.handle()
            .pipe(
                mergeMap(async (data) => {
                    if (data && data.imageUrl) {
                        const imageUrl = data.imageUrl;
                        data.imageUrl = await storageUtil.generateV4ReadSignedUrl(imageUrl, this.seconds);
                    }
                    return data;
                })
            );
    }
}
