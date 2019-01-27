import 'reflect-metadata';
import app from './app';
import errorhandler from 'errorhandler';
import { createConnection, useContainer as ormUseContainer } from 'typeorm';
import { useExpressServer, useContainer as routingUseContainer } from 'routing-controllers';

import { Container } from 'typedi';
import { ApiController } from './contollers/api.controller';
import { User } from './entity/user.entity';

routingUseContainer(Container);
ormUseContainer(Container);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorhandler());

/**
 * Start Express server.
 */

createConnection({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'test_user',
  password: 'P@ssw0rd',
  database: 'database_development',
  logging: true,
  logger: 'simple-console',
  entities: [
    User,
  ],
  synchronize: true,
}).then(async connection => {
  useExpressServer(app, {
    controllers: [ApiController],
  }).listen(
      app.get('port'), () => {
        console.log(
          '  App is running at port:%d in %s mode',
          app.get('port'),
          app.get('env'),
        );
        console.log('  Press CTRL-C to stop\n');
      },
    );
}).catch(error => console.log('TypeORM connection error: ', error));
