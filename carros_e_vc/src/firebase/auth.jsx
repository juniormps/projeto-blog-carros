// Criação da instância de autenticação do projeto no firebase

import { getAuth } from "firebase/auth";
import { app } from "./config"

export const auth = getAuth(app);
