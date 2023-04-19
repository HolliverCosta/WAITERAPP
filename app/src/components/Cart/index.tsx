import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { baseUrl } from "../../utils/api";

import { Button } from "../Button";
import { PaymentModal } from "../PaymentModal";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { Text } from "../Text";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";

import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";

import { formatCurrency } from "../../utils/formatCurrency";
import {
    Actions,
    Item,
    ProductContainer,
    Image,
    QuantityContainer,
    ProductDetails,
    Summary,
    TotalContainer,
} from "./styles";
import { api } from "../../utils/api";

interface CartProps {
    cartItem: CartItem[];
    onAdd: (product: Product) => void;
    onDecrement: (product: Product) => void;
    onConfirmOrder: () => void;
    selectedTable: string;
}

export function Cart({
    cartItem,
    onAdd,
    onDecrement,
    onConfirmOrder,
    selectedTable,
}: CartProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const total = cartItem.reduce((acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.product.price;
    }, 0);

    async function handleConfirmOrder() {
        setIsLoading(true);
        const payload = {
            table: selectedTable,
            products: cartItem.map((cartItem) => ({
                product: cartItem.product._id,
                quantity: cartItem.quantity,
            })),
        };

        await api.post("/orders", payload);
        setIsLoading(false);
        setPaymentModalVisible(false);
        setIsModalVisible(true);
    }

    async function handlePaymentOrder() {
        setPaymentModalVisible(true);
    }

    function handleOK() {
        setIsModalVisible(false);
        onConfirmOrder();
    }
    return (
        <>
            <PaymentModal
                visible={paymentModalVisible}
                setVisible={setPaymentModalVisible}
                onConfirmedOrder={handleConfirmOrder}
            />
            <OrderConfirmedModal visible={isModalVisible} onOK={handleOK} />
            {cartItem.length > 0 && (
                <FlatList
                    data={cartItem}
                    keyExtractor={(cartItem) => cartItem.product._id}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20, maxHeight: 150 }}
                    renderItem={({ item: cartItem }) => (
                        <Item>
                            <ProductContainer>
                                <Image
                                    source={{
                                        uri: `${baseUrl}/uploads/${cartItem.product.imagePath}`,
                                    }}
                                />
                                <QuantityContainer>
                                    <Text size={14} color="#666">
                                        {cartItem.quantity}x
                                    </Text>
                                </QuantityContainer>
                                <ProductDetails>
                                    <Text size={14} weight="600">
                                        {cartItem.product.name}
                                    </Text>
                                    <Text
                                        size={14}
                                        color="#666"
                                        style={{ marginTop: 4 }}
                                    >
                                        {formatCurrency(cartItem.product.price)}
                                    </Text>
                                </ProductDetails>
                            </ProductContainer>
                            <Actions>
                                <TouchableOpacity
                                    style={{ marginRight: 24 }}
                                    onPress={() => onAdd(cartItem.product)}
                                >
                                    <PlusCircle />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        onDecrement(cartItem.product)
                                    }
                                >
                                    <MinusCircle />
                                </TouchableOpacity>
                            </Actions>
                        </Item>
                    )}
                />
            )}
            <Summary>
                <TotalContainer>
                    {cartItem.length > 0 ? (
                        <>
                            <Text color="#666">Total</Text>
                            <Text size={20} weight="600">
                                {formatCurrency(total)}
                            </Text>
                        </>
                    ) : (
                        <Text color="#999">Seu carrinho esta vazio</Text>
                    )}
                </TotalContainer>
                <Button
                    onPress={handlePaymentOrder}
                    disabled={cartItem.length === 0}
                    loading={isLoading}
                >
                    Ir para pagamento
                </Button>
            </Summary>
        </>
    );
}
