import { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";

const orders: Order[] = [
  {
    _id: "6400d742c5bdbbcbdf1bdc33",
    table: "1",
    status: "WAITING",
    products: [
      {
        product: {
          name: "Pizza quatro queijos",
          imagePath: "1678123743184-quatro-queijos.png",
          price: 40,
        },
        quantity: 3,
        _id: "6400d742c5bdbbcbdf1bdc34",
      },
      {
        product: {
          name: "Coca cola ",
          imagePath: "1678123633563-coca-cola.png",
          price: 7,
        },
        quantity: 5,
        _id: "6400d742c5bdbbcbdf1bdc35",
      },
    ],
  },
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="🍴" title="Em preparação" orders={[]} />
      <OrdersBoard icon="✅" title="Pronto!" orders={[]} />
    </Container>
  );
}
