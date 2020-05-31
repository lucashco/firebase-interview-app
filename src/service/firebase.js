import * as firebase from 'firebase'

import { firebaseConfig } from '../config/firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore(firebaseApp);
