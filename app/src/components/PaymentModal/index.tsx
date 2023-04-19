import { Modal, TextInput } from "react-native";

import { Container, OkButton } from "./styles";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";
import { api, apiPayment } from "../../utils/api";
import { useState } from "react";
import { Button } from "../Button";

interface PaymentModalProps {
    visible: boolean;
    setVisible: (set: boolean) => void;
    onConfirmedOrder: () => void;
}

export function PaymentModal({
    visible,
    onConfirmedOrder,
    setVisible,
}: PaymentModalProps) {
    const [numberCard, setNumberCard] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handlePay() {
        try {
            const payment = {
                username: "teste",
                numberCard: numberCard,
            };
            console.log({ payment });
            setIsLoading(true);

            await new Promise((resolve) => setTimeout(resolve, 3000));
            await apiPayment.post("/payment", payment);

            setIsLoading(false);
            setNumberCard("");
            onConfirmedOrder();
        } catch (err) {
            setIsLoading(false);
            setNumberCard("");
            setVisible(false);
            alert("Pagamento nao foi processado");
        }
    }

    return (
        <Modal visible={visible} animationType="fade">
            <Container>
                <Text
                    size={20}
                    weight="600"
                    color="#fff"
                    style={{ marginTop: 12 }}
                >
                    Digite o numero do seu cartao
                </Text>
                <TextInput
                    placeholder="Numero do cartao"
                    placeholderTextColor="#666"
                    keyboardType="number-pad"
                    onChangeText={setNumberCard}
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        padding: 8,
                        marginTop: 12,
                    }}
                />

                <Button
                    onPress={handlePay}
                    disabled={isLoading}
                    loading={isLoading}
                >
                    Pagar
                </Button>
            </Container>
        </Modal>
    );
}
