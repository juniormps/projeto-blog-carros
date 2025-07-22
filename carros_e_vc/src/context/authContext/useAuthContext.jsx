import { useContext } from "react";
import { AuthContext } from "./AuthContext"

export function useAuthContext() {

    const context = useContext(AuthContext)

    if (!context) {
        console.log("Contexto não encontrado")
    }

  return context

}