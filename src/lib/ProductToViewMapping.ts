import { Product } from './../DataTypes/product';
const productToViewMap: Record<string, string> ={
    gemstone: "/gem-view/:id",
    bracelet: "/mala-brace-view/:id",
    mala: "/mala-brace-view/:id",
    tribhuvani: "/tribhuvani-view/:id",
    rudraksha: "/rudra-view/:id",
    yantra: "/yantra-view/:id",
    books: "/books-view/:id"
};

export function getProductRelativeLink(product: Product ):string{
    const category = product.category.trim().toLowerCase();
    const routeTemplate = productToViewMap[category];
    if(!routeTemplate){
        return productToViewMap["gemstone"].replace(":id",product?.id ? product?.id: product?._id);
    }
    return routeTemplate.replace(":id", product.id);
}