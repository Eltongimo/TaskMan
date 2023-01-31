

import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyB8Sr0F5zOh6vLOW_Byk4-oOHkhnwTdlmc",
    authDomain: "pomar-760de.firebaseapp.com",
    databaseURL: "https://pomar-760de-default-rtdb.firebaseio.com",
    projectId: "pomar-760de",
    storageBucket: "pomar-760de.appspot.com",
    messagingSenderId: "104258794029",
    appId: "1:104258794029:web:e279b2bde298ce451e3ea4"
  };

const app = initializeApp(firebaseConfig)
export const Storage = getStorage(app)
