import { Modal } from "react-native";

import { Container, OkButton } from "./styles";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";

interface OrderConfirmedModalProps {
    visible: boolean;
    onOK: () => void;
}

export function OrderConfirmedModal({
    visible,
    onOK,
}: OrderConfirmedModalProps) {
    return (
        <Modal visible={visible} animationType="fade">
            <Container>
                <CheckCircle />
                <Text
                    size={20}
                    weight="600"
                    color="#fff"
                    style={{ marginTop: 12 }}
                >
                    Pedido confirmado
                </Text>
                <Text opacity={0.9} color="#fff" style={{ marginTop: 4 }}>
                    O pedido ja entrou na fila de producao
                </Text>

                <OkButton onPress={onOK}>
                    <Text color="#d73035" weight="600">
                        OK
                    </Text>
                </OkButton>
            </Container>
        </Modal>
    );
}
