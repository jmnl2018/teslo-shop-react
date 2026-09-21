import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (
    productLike: Partial<Product> & { files?: File[] }
): Promise<Product> => {

    await sleep(1500);

    //     ... rest quiere decir el resto de propiedades de productLike
    // Ojo la palabra rest es olo una convención puede ser cualquier nombre, 
    //     no es obligatorio que se llame rest
    const { id, user, images = [], files = [], ...rest } = productLike;

    const isCreating = id === 'new';

    rest.stock = Number(rest.stock || 0);
    rest.price = Number(rest.price || 0);

    //Prepara las imagenes
    if (files.length > 0) {
        const newImageNames = await uploadFiles(files);
        images.push(...newImageNames);
    }

    const imagesToSave = images.map(image => {
        if (image.includes('http')) return image.split('/').pop() || '';  //Regrese el ultimo elemento
        return image;
    })

    /* 
        GET. Obtener/leer datos. No modifica nada en el servidor. Se puede cachear y repetir sin riesgo.
            Ej: traer la lista de productos
        POST. Crear un nuevo recurso. Envía datos en el body
            Ej: crear un producto nuevo
        PUT. Reemplazar un recurso completo. Si omites un campo, puede borrarse/quedar en default
            Ej: actualizar TODOS los campos de un producto
        PATCH. Actualizar parcialmente un recurso.Solo envías los campos que cambian
            Ej: cambiar solo el precio de un producto
        DELETE. Eliminar un recurso. Normalmente no lleva body.
            Ej: borrar un producto por id
        HEAD. Como GET pero solo trae los headers, sin el body. Útil para checks rápidos de tamaño o existencia
            Ej: verificar si un recurso existe sin descargarlo
        OPTIONS.Pregunta qué métodos/permite el servidor para esa ruta. Rara vez lo llamas tú manualmente
            Se usa mucho automáticamente en CORS (preflight)
    */

    const { data } = await tesloApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...rest,
            images: imagesToSave,
        }

    });

    return {
        ...data,
        images: data.images.map(image => {
            if (image.includes('http')) return image;
            return `${import.meta.env.VITE_API_URL}/files/product/${image}`
        })
    }

}

export interface FileUpLoadResponse {
    secureUrl: string;
    fileName: string;
}

const uploadFiles = async (files: File[]) => {

    const uploadPromises = files.map(async (file) => {

        const formData = new FormData();
        formData.append('file', file);

        //Se puede hacer tambien tesloApi.post pero para varias
        const { data } = await tesloApi<FileUpLoadResponse>({
            url: '/files/product',
            method: 'POST',
            data: formData
        })

        return data.fileName;
    })

    const uploadedFileNames = await Promise.all(uploadPromises);

    return uploadedFileNames;
}