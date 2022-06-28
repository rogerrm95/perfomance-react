export interface AddToWishListProps {
    onAddToWishList: () => void,
    onRequestClose: () => void
}

export function AddToWishList({onAddToWishList, onRequestClose}: AddToWishListProps) {
    return (
        <div>
            <span>
                Deseja adicionar aos favotiros ?
            </span>

            <button onClick={onAddToWishList}>Sim</button>

            <button onClick={onRequestClose}>Não</button>
        </div>
    )
}