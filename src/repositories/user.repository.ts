import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entity/user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  countByEmail(email: string): Promise<Number>;
  save<User>(user: User): Promise<User>;
}

@Service()
@EntityRepository(User)
export default class UserRepositoryImpl extends Repository<User> implements UserRepository {
  public findByEmail(email: string) {
    return this.findOne({ email });
  }

  public countByEmail(email: string) {
    return this.count({ email });
  }

  public save<User>(user: User) {
    return super.save(user);
  }

}
