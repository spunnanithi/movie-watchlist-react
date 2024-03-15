import { useToast } from "@chakra-ui/react";
import { db } from "./firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export const useFirestore = () => {
	const toast = useToast();

	const addDocument = async (collectionName, data) => {
		// Add a new document with a generated ID and data to "watchlist"
		const docRef = await addDoc(collection(db, collectionName), data);
		console.log("Document written with ID: ", docRef.id);
	};

	const addToWatchlist = async (userId, dataId, data) => {
		try {
			await setDoc(doc(db, "users", userId, "watchlist", dataId), data);

			toast({
				title: "Success!",
				description: "Added to watchlist",
				status: "success",
				isClosable: true,
			});
		} catch (err) {
			console.log("Error adding watchlist to document: ", err);

			toast({
				title: "Error!",
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
