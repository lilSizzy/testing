import {initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    getDocs,
    query,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1o6CIWpkCOi3oNJMLzREkMNC0yeDCGiM",
  authDomain: "six-cloth.firebaseapp.com",
  projectId: "six-cloth",
  storageBucket: "six-cloth.appspot.com",
  messagingSenderId: "739892687116",
  appId: "1:739892687116:web:54344016455cc1f1cc1929"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); //xác nhận tài khoản = method getAuth và gán cho auth
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore(); // gán dữ liệu vô db (database)

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection (db,collectionKey); 
    const batch = writeBatch(db); // truyền vào database 

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef,object);
    });
    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapShot = await getDocs(q);
    const categoryMap = querySnapShot.docs.reduce((acc,docSnapShot) => {
        const {title,items} = docSnapShot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{});
    return categoryMap;
}

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {} 
) => {
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid); // Tạo Document trong database , userDocRef sẽ là database
    
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef); // Truy xuất dữ liệu trong database 
    console.log(userSnapShot);
    console.log(userSnapShot.exists()); //kiểm tra nếu dữ liệu này có trong database hay không

    if(!userSnapShot.exists()) { //Nếu userSnapshot k tồn tại
        const {displayName,email } = userAuth; // tạo 1 biến chứa displayname và email lấy từ userAuth
        const createdAt = new Date(); // gán ngày tạo vào createdAt
        try{ // setDoc (database , { hiển thị những dữ liệu gì (displayName, email , createdAt) })
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) { // nếu có lỗi thì
            console.log('error creating the user', error.message); 
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
 if (!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
 if (!email || !password) return;
    
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);
