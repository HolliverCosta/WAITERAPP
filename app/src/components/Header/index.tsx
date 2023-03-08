import { TouchableOpacity } from "react-native";

import { Container, Content, OrderHeader, Table } from "./styles";
import { Text } from "../Text";

interface HeaderProps {
    selectedTable: string;
    onCancel: () => void;
}

export function Header({ selectedTable, onCancel }: HeaderProps) {
    return (
        <Container>
            {!selectedTable && (
                <>
                    <Text size={14} opacity={0.9}>
                        Bem vindo(a) ao{" "}
                    </Text>
                    <Text size={24} weight="700">
                        WAITER
                        <Text size={24}>APP</Text>
                    </Text>
                </>
            )}
            {selectedTable && (
                <>
                    <Content>
                        <OrderHeader>
                            <Text size={24} weight="600">
                                Pedido
                            </Text>
                            <TouchableOpacity onPress={onCancel}>
                                <Text color="#d73035" weight="600" size={14}>
                                    cancelar pedido
                                </Text>
                            </TouchableOpacity>
                        </OrderHeader>

                        <Table>
                            <Text color="#666">Mesa {selectedTable}</Text>
                        </Table>
                    </Content>
                </>
            )}
        </Container>
    );
}
