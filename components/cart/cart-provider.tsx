"use client";

import { createContext, useContext, useMemo, useRef, useState } from "react";
import { CartDialog } from "@/components/cart/cart-dialog";

export type CartLine = {
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (item: { name: string; price: number; image?: string }, quantity: number) => void;
  updateQuantity: (name: string, quantity: number) => void;
  removeItem: (name: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

// Mounts a single <dialog> once, same pattern as ReservationProvider — every
// trigger (nav icon, future card links) opens the same order summary.
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function addItem(item: { name: string; price: number; image?: string }, quantity: number) {
    setItems((prev) => {
      const existing = prev.find((line) => line.name === item.name);
      if (existing) {
        return prev.map((line) =>
          line.name === item.name ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }

  function updateQuantity(name: string, quantity: number) {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.name !== name)
        : prev.map((line) => (line.name === name ? { ...line, quantity } : line)),
    );
  }

  function removeItem(name: string) {
    setItems((prev) => prev.filter((line) => line.name !== name));
  }

  function clear() {
    setItems([]);
  }

  const itemCount = useMemo(() => items.reduce((sum, line) => sum + line.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, line) => sum + line.quantity * line.price, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clear,
        open: () => dialogRef.current?.showModal(),
        close: () => dialogRef.current?.close(),
      }}
    >
      {children}
      <CartDialog dialogRef={dialogRef} />
    </CartContext.Provider>
  );
}
