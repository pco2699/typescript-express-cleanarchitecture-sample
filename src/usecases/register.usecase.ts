import { FirebaseGateway, FirebaseGatewayToken } from '../gateways/firebase.gateway';
import { Inject, Service, Token } from 'typedi';
import UserRepository from '../repositories/user.repository';
import firebase from 'firebase';
import { User } from '../entity/user.entity';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { InternalServerError } from 'routing-controllers';
import { UserResponse } from '../viewmodel/userrequestresponse.viewmodel';

export interface RegisterUsecase {
  executeRegisterWithFirebase(email: string, password: string): Promise<firebase.User>;
  saveUser(firebase_user: firebase.User, name: string): Promise<UserResponse>;
}
export const RegisterUsecaseToken = new Token<RegisterUsecase>();

@Service(RegisterUsecaseToken)
class RegisterUsecaseImpl implements RegisterUsecase {
  constructor(@Inject(FirebaseGatewayToken) private readonly firebaseGateway: FirebaseGateway,
              @InjectRepository() private readonly userRepository: UserRepository) {
  }

  async executeRegisterWithFirebase(email: string, password: string) {
    await this.firebaseGateway.register(email, password);
    const user = this.firebaseGateway.getCurrentUser();
    if (!user) {
      throw new InternalServerError('failed to register user');
    }
    await user.sendEmailVerification(null);
    return user;
  }

  async saveUser(firebase_user: firebase.User, name: string) {
    const user = new User();

    user.email = firebase_user.email || '';
    user.name = name;
    user.firebase_uuid = firebase_user.uid;

    await this.userRepository.save(user);

    const userRes = new UserResponse();
    userRes.email = user.email;
    userRes.name = user.name;

    return userRes;
  }
}
