import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { storageUtil } from '../utils/storage.util';

@Injectable()
export class ImageUrlInterceptor<T> implements NestInterceptor<T> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
        return next.handle()
            .pipe(
                mergeMap(async (data) => {
                    const imageUrl = data.imageUrl;
                    data.imageUrl = await storageUtil.generateV4ReadSignedUrl(imageUrl);
                    return data;
                })
            );
    }
}
