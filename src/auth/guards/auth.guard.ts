import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private readonly userService: UserService){}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        try{
            const token = req.headers.authorization.split(" ")[1];
            const decodeBase64 = Buffer.from(token, 'base64').toString('ascii');
            const [userId, apiKey] = decodeBase64.split(":");
            const user = await this.userService.getById(+userId);
            const {key} = await user.getApiKey();
            if(key !== apiKey) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            
            req.user = user;

            return true;
        }catch(exception){
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
    
}