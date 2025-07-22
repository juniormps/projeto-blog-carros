//Banco de Dados - Firestore

import { getFirestore } from "firebase/firestore";
import { app } from "./config";

export const db = getFirestore(app);
