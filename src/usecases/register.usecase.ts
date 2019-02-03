import { AuthGateway, AuthGatewayToken } from '../gateways/firebase.gateway';
import { Inject, Service, Token } from 'typedi';
import UserRepository from '../repositories/user.repository';
import { User } from '../entity/user.entity';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserResponse } from '../viewmodel/userrequestresponse.viewmodel';

export interface RegisterUsecase {
  executeRegister(email: string, password: string): Promise<void>;
  saveUser(email: string, name: string): Promise<UserResponse>;
}
export const RegisterUsecaseToken = new Token<RegisterUsecase>();

@Service(RegisterUsecaseToken)
class RegisterUsecaseImpl implements RegisterUsecase {
  constructor(@Inject(AuthGatewayToken) private readonly authGateway: AuthGateway,
              @InjectRepository() private readonly userRepository: UserRepository) {
  }

  async executeRegister(email: string, password: string) {
    await this.authGateway.register(email, password);
  }

  async saveUser(email: string, name: string) {
    const user = new User();

    user.email = email;
    user.name = name;
    user.firebase_uuid = this.authGateway.getUUID();

    await this.userRepository.save(user);

    const userRes = new UserResponse();
    userRes.email = user.email;
    userRes.name = user.name;

    return userRes;
  }
}
