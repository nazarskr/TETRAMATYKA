import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map } from "rxjs/operators";
import { from, Observable } from "rxjs";
import { UsersService } from "../../modules/users/users.service";
import { User } from "../../modules/users/schemas/user.schema";
import { JWTUtil } from "../utils/jwtUtil";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private usersService: UsersService,
        private jwtUtil: JWTUtil
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const payload = this.jwtUtil.decode(request.headers.authorization);

        return from(this.usersService.getUserInfoByEmail(payload.email)).pipe(
            map((user: User) => {
                let hasPermission: boolean = roles.indexOf(user.role) > -1;
                return user && hasPermission;
            })
        )
    }
}
