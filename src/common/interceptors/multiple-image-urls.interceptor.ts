import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { storageUtil } from '../utils/storage.util';

@Injectable()
export class MultipleImageUrlsInterceptor implements NestInterceptor {
    constructor(private seconds?: number) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
            .pipe(
                mergeMap(async (data) => {
                    await Promise.all(data.map(async(item) => {
                        if (item && item.imageUrl) {
                            const imageUrl = item.imageUrl;
                            item.imageUrl = await storageUtil.generateV4ReadSignedUrl(imageUrl, this.seconds);
                        }
                        return item;
                    }));

                    return data;
                })
            );
    }
}
