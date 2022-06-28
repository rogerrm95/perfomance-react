import { memo, useState } from 'react'
import dynamic from 'next/dynamic'

import { AddToWishListProps } from './AddToWishList'

type ProductItemProps = {
    product: {
        id: number,
        price: number,
        title: string,
        priceFormatted: string
    },
    onAddToWishList: (id: number) => void
}

// LAZY LOADING //
const AddToWishList = dynamic<AddToWishListProps>(() => {
    return import('./AddToWishList').then(mod => mod.AddToWishList)
}, {
    loading: () => <span>Carregando...</span>
})

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>

            <button style={{ marginLeft: '12px' }} onClick={() => setIsModalOpen(true)}>❤</button>

            { // Este componente só irá carregar no bundle, caso o usuário for utilizar //
                isModalOpen && (
                    <AddToWishList
                        onAddToWishList={() => onAddToWishList(product.id)}
                        onRequestClose={() => setIsModalOpen(false)}
                    />
                )
            }
        </div>
    )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product)
})