import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {


    constructor(private readonly userService: UserService) { }

    public async login(dto: AuthDto){
        const user = await this.userService.getByEmail(dto.email);
        if(!user) throw new HttpException('Incorrect login or password', HttpStatus.FORBIDDEN);
        const passwordEquals = await this.userService.comparePassword(dto.password, user.password);
        if(!passwordEquals) throw new HttpException('Incorrect login or password', HttpStatus.FORBIDDEN);
        const apiKey = await user.getApiKey();

        return {key: apiKey.key};
    }

    public async register(dto: AuthDto){
        const user = await this.userService.getByEmail(dto.email);
        if(user) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        const newUser = await this.userService.createUser(dto);
        const apiKey = await newUser.getApiKey();

        return {key: apiKey.key};
    }

}
