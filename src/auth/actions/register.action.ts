import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const registerAction = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {

    try {

        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            //No se necesita poner el valor de lavariable luego de :
            //Sobreentiende que se esta mandando un objeto que tiene 
            //la propiedad email que almacena el valor de la variables email y 
            // la propiedad password que apunta al valor de la variable password
            email,    //email: emaiL,
            password,   //password: password,
            fullName
        });

        return data;

    } catch (error) {

        console.log({ error });
        throw error;

    }

}