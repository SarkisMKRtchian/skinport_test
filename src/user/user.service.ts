import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { ApiKeysModel } from './models/api-keys.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(UserModel) private readonly userRespository: typeof UserModel,
        @InjectModel(ApiKeysModel) private readonly apiKeysRepository: typeof ApiKeysModel
    ) { }


    public async createUser(dto: CreateUserDto) {
        const user = await this.userRespository.create({ ...dto, password: await this.genPassword(dto.password) });
        const key = await this.genApiKey(user);
        await this.apiKeysRepository.create({ user_id: user.id, key });

        return user;
    }

    public async getByEmail(email: string) {
        return await this.userRespository.findOne({ where: { email } });
    }

    public async getById(id: number) {
        return await this.userRespository.findByPk(id);
    }

    public async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }


    private async genPassword(password: string) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    private async genApiKey(user: UserModel) {
        const salt = await bcrypt.genSalt();
        const apiKey = await bcrypt.hash(`${user.id}${user.email}${Date.now()}`, salt);

        return apiKey;
    }


}
