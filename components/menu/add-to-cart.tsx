"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { useCart } from "@/components/cart/cart-provider";

export function AddToCart({ name, price, image }: { name: string; price: number; image?: string }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem({ name, price, image }, quantity);
    setQuantity(1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="mt-3 flex items-center gap-2">
      <QuantityStepper label={name} value={quantity} min={1} max={20} onChange={setQuantity} />
      <Button
        type="button"
        variant="primary"
        onClick={handleAdd}
        className="flex-1 justify-center px-4 py-2 text-sm"
      >
        {justAdded ? "Added" : "Add to order"}
      </Button>
    </div>
  );
}
