import Firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDhIvf1YwjFQLTVK_f6XRH3BOKAsD_KL9I',
  authDomain: 'sectiondb.firebaseapp.com',
  databaseURL: 'https://sectiondb.firebaseio.com'
}
const firebaseApp = Firebase.initializeApp(config)
const db = firebaseApp.database()
export default db
