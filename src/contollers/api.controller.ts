import { RegisterUsecase, RegisterUsecaseToken } from '../usecases/register.usecase';
import { Inject } from 'typedi';
import { Body, JsonController, Post } from 'routing-controllers';
import { UserRequest, UserResponse } from '../viewmodel/userrequestresponse.viewmodel';

@JsonController('/register')
export class ApiController {
  constructor(@Inject(RegisterUsecaseToken) private readonly registerUsecase: RegisterUsecase) {}

  @Post('/')
  async register(@Body({ required: true }) userReq: UserRequest): Promise<UserResponse> {
    const user = await this.registerUsecase.executeRegisterWithFirebase(userReq.email, userReq.password);
    return await this.registerUsecase.saveUser(user, userReq.name);
  }
}
