"use client";

import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { IProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface IProductInfoProps {
  product: IProductWithTotalPrice;
}

const ProductInfo = ({ product }: IProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart } = useContext(CartContext);

  const addQuantityProduct = () => {
    setQuantity(quantity + 1);
  };

  const subtractQuantityProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const handleAddToCartClick = () => {
    addProductToCart({
      ...product,
      quantity,
    });
  };

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">
          R$ {Number(product.totalPrice).toFixed(2)}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>
      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75">
          R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          onClick={() => subtractQuantityProduct()}
          size="icon"
          variant="outline"
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button
          onClick={() => addQuantityProduct()}
          size="icon"
          variant="outline"
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{product.description}</p>
        <Button
          onClick={handleAddToCartClick}
          className="mt-8 font-bold uppercase"
        >
          Adicionar ao carrinho
        </Button>
        <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
          <div className="flex items-center gap-2">
            <TruckIcon />
            <div className="flex flex-col">
              <p className="text-xs">
                Entrega via <span className="font-bold">TechPacket®</span>
              </p>
              <p className="text-xs text-[#8162FF]">
                Envio para <span className="font-bold">todo Brasil</span>
              </p>
            </div>
          </div>
          <p className="text-xs font-bold">Frete grátis</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
