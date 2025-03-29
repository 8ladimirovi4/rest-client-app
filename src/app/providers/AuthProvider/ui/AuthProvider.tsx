import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../../../firebase.ts';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { userActions } from 'shared/model/user.slice.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/StoreProvider/config/store.ts';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const authUser = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const usersRef = collection(db, 'users');
        const queryUser = query(usersRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(queryUser);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          dispatch(
            userActions.setUser({
              name: userData.name,
              uid: userData.uid,
              email: userData.email,
            })
          );
        } else {
          return null;
        }
      }
    });

    return () => {
      authUser();
    };
  }, [dispatch]);

  return <>{children}</>;
};
