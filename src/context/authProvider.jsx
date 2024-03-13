import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	// signInWithEmailAndPassword,
	// EmailAuthProvider,
	signOut,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// TODO: Implement sign in with email and password - Might be correct already
	// const signInWithEmail = (email, password) => {
	// 	return signInWithEmailAndPassword(auth, email, password)
	// 		.then((userCredential) => {
	// 			const user = userCredential.user;
	// 			setUser(user);
	// 		})
	// 		.catch((err) => {
	// 			const errorCode = err.code;
	// 			const errorMessage = err.message;
	// 			console.log(
	// 				`ERROR CODE: ${errorCode} \n ------------ \n ERROR MESSAGE: ${errorMessage}`
	// 			);
	// 		});
	// };

	// Function to allow user to sign in with Google
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(provider);
	};

	// Function to allow user to log out
	const logout = () => {
		return signOut(auth);
	};

	useEffect(() => {
		// Event listener for any Firebase user auth changes
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
			} else {
				setUser(null);
			}
			setLoading(false);
		});
	}, []);

	return (
		<AuthContext.Provider value={(user, loading, signInWithGoogle, logout)}>
			{children}
		</AuthContext.Provider>
	);
};
