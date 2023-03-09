import { useState } from "react";
import { toast } from "react-toastify";

import { Board, OrdersContainer } from "./styles";
import { OrderModal } from "../OrderModal";

import { api } from "../../utils/api";

import { Order } from "../../types/Order";

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }
  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }
  async function handleCancelOrder() {
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado`);

    setIsLoading(false);
    setIsModalVisible(false);
  }
  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const newStatus =
      selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";

    await api.patch(`/orders/${selectedOrder?._id}`, { status: newStatus });

    toast.success(
      `O pedido da mesa ${selectedOrder?.table} teve o status alterado!`
    );

    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        order={selectedOrder}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
