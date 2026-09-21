import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";
import { useParams, useSearchParams } from "react-router";


export const useProducts = () => {

    // Todo: Viene lógica mas adelante

    const { gender } = useParams(); //el nombre gender es porque asi lo pusimo en el appRouter (:gender)
    const [searchParams] = useSearchParams();

    const query = searchParams.get('query') || undefined;  //Si no encuentra el limit poner valor de 9

    const limit = searchParams.get('limit') || 9;  //Si no encuentra el limit poner valor de 9
    const page = searchParams.get('page') || 1;  //Si no encuentra el limit poner valor de 9
    const sizes = searchParams.get('sizes') || undefined;

    const offset = (Number(page) - 1) * Number(limit);

    const price = searchParams.get('price') || 'any';

    let minPrice = undefined;
    let maxPrice = undefined;

    switch (price) {
        case 'any':
            break;
        case '0-50':
            minPrice = 0;
            maxPrice = 50;
            break;
        case '50-100':
            minPrice = 50;
            maxPrice = 100;
            break;
        case '100-200':
            minPrice = 100;
            maxPrice = 200;
            break;
        case '200+':
            minPrice = 200;
            maxPrice = undefined;
            break;
        default:
            break;
    }


    return useQuery({
        queryKey: ['products', { offset, limit, gender, sizes, minPrice, maxPrice, query }], //Cuando cambie  offset o limit cambian los productos
        queryFn: () => getProductsAction({
            limit: isNaN(+limit) ? 9 : limit,
            offset: isNaN(offset) ? 0 : offset,
            gender: gender,
            sizes: sizes,
            minPrice,
            maxPrice,
            query,
        }),
        staleTime: 1000 * 60 * 5, //Mantiene en cache por 5 minutos
    });
}
