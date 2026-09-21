

export const ProductPage = () => {


    return (
        <>
            <h1 className="text-3xl font-montserrat">Produc Page</h1>

        </>

    )
}

/*
import { useCounterStore } from "@/auth/store/auth.store";
import { Button } from "@/components/ui/button";


export const ProductPage = () => {

    const { inc, dec, incBy, count } = useCounterStore();

    return (
        <>
            <h1 className="text-3xl font-montserrat">Contador: {count} </h1>
            <Button onClick={inc}>
                +1
            </Button>
            <Button onClick={dec}>
                -1
            </Button>
            <Button onClick={() => incBy(5)}>
                +5
            </Button>
        </>

    )
}
*/