import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entity/user.entity';

@Service()
@EntityRepository(User)
export default class UserRepository extends Repository<User>  {
  public findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }

  public countByEmail(email: string): Promise<Number> {
    return this.count({ email });
  }

  public save<User>(user: User): Promise<User> {
    return super.save(user);
  }

}
