import firebase from 'firebase';
import { Service, Token } from 'typedi';

export interface FirebaseGateway {
  register(email: string, password: string): Promise<firebase.auth.UserCredential>;
  getCurrentUser(): (firebase.User | null);
}
export const FirebaseGatewayToken = new Token<FirebaseGateway>();

@Service(FirebaseGatewayToken)
class FirebaseGatewayImpl implements FirebaseGateway {
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

  register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  getCurrentUser(): (firebase.User | null) {
    return this.firebase.auth().currentUser;
  }

}
