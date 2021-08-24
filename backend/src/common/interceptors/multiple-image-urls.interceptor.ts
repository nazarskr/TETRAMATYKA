import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import {forkJoin, from, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import { storageUtil } from '../utils/storage.util';

@Injectable()
export class MultipleImageUrlsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
            .pipe(
                mergeMap(async (data) => {
                    await Promise.all(data.map(async(item) => {
                        const imageUrl = item.imageUrl;
                        item.imageUrl = await storageUtil.generateV4ReadSignedUrl(imageUrl);
                        return item;
                    }));

                    return data;
                })
            );
    }
}
