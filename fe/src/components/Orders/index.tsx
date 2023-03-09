import { useEffect, useState } from "react";
import socketIo from "socket.io-client";

import { Container } from "./styles";
import { OrdersBoard } from "../OrdersBoard";

import { api } from "../../utils/api";

import { Order } from "../../types/Order";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const io = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });
    io.on("orders@new", (order) => {
      setOrders((prevState) => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get("/orders").then(({ data }) => {
      setOrders(data);
    });
  }, [orders]);

  const waiting = orders.filter((order) => order.status === "WAITING");

  const inProduction = orders.filter(
    (order) => order.status === "IN_PRODUCTION"
  );

  const done = orders.filter((order) => order.status === "DONE");

  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={waiting} />
      <OrdersBoard icon="🍴" title="Em preparação" orders={inProduction} />
      <OrdersBoard icon="✅" title="Pronto!" orders={done} />
    </Container>
  );
}
