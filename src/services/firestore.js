import { useToast } from "@chakra-ui/react";
import { db } from "./firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

export const useFirestore = () => {
	const toast = useToast();

	const addDocument = async (collectionName, data) => {
		// Add a new document with a generated ID and data to "watchlist"
		const docRef = await addDoc(collection(db, collectionName), data);
		console.log("Document written with ID: ", docRef.id);
	};

	const addToWatchlist = async (userId, dataId, data) => {
		try {
			// Return early and not save to db if item already exists in db
			if (await checkIfInWatchlist(userId, dataId)) {
				toast({
					title: "Error",
					description: "Movie/Show is already in your watchlist",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				return false;
			}

			// Add movie/show to watchlist
			await setDoc(doc(db, "users", userId, "watchlist", dataId), data);

			toast({
				title: "Success",
				description: "Added to watchlist",
				status: "success",
				isClosable: true,
			});
		} catch (err) {
			console.log("Error adding watchlist to document: ", err);

			toast({
				title: "Error",
				description: "Unable to add movie/show to watchlist",
				status: "error",
				isClosable: true,
			});
		}
	};

	return {
		addDocument,
		addToWatchlist,
	};
};

const checkIfInWatchlist = async (userId, dataId) => {
	// Reference document from db
	const docRef = doc(
		db,
		"users",
		userId?.toString(),
		"watchlist",
		dataId?.toString()
	);

	// Obtain document snapshot from db
	const docSnap = await getDoc(docRef);

	// Check to see if document already exists in the db
	if (docSnap.exists()) {
		return true;
	} else {
		return false;
	}
};
