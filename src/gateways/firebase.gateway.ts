import firebase from 'firebase';
import { Service, Token } from 'typedi';
import { InternalServerError } from 'routing-controllers';

export interface AuthGateway {
  register(email: string, password: string): void;
  getUUID(): string;
}
export const AuthGatewayToken = new Token<AuthGateway>();

@Service(AuthGatewayToken)
class FirebaseGateway implements AuthGateway {
  firebase: firebase.app.App;

  constructor() {
    this.firebase = firebase.initializeApp({
      apiKey: 'AIzaSyDXGS_8qqHXvbZAfFGZ0sppWRB9I029WWw',
      authDomain: 'typearc-sample.firebaseapp.com',
      databaseURL: 'https://typearc-sample.firebaseio.com',
      projectId: 'typearc-sample',
      storageBucket: '',
      messagingSenderId: '1088450655877',
    });
  }

  async register(email: string, password: string): Promise<void> {
    await this.firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = this.firebase.auth().currentUser;
    if (!user) {
      throw new InternalServerError('failed to register user');
    }
    await user.sendEmailVerification(null);
  }

  getUUID(): string {
    const user = this.firebase.auth().currentUser;
    if (!user) {
      throw new InternalServerError('failed to fetch user');
    }
    return user.uid;
  }

}
