import { useState } from "react";
import { Modal, TouchableOpacity, Platform } from "react-native";

import { Overlay, ModalBody, Header, Form, Input } from "./styles";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";

interface TableModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
    const [table, setTable] = useState("");

    return (
        <Modal transparent visible={visible} animationType="fade">
            <Overlay
                behavior={Platform.OS === "android" ? "height" : "padding"}
            >
                <ModalBody>
                    <Header>
                        <Text weight="600">Informe a mesa</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Close color="#666" />
                        </TouchableOpacity>
                    </Header>
                    <Form>
                        <Input
                            placeholder="Numero da mesa"
                            placeholderTextColor="#666"
                            keyboardType="number-pad"
                            onChangeText={setTable}
                        />
                        <Button
                            onPress={() => {
                                onSave(table);
                                setTable("");
                            }}
                            disabled={table.length === 0}
                        >
                            Salvar
                        </Button>
                    </Form>
                </ModalBody>
            </Overlay>
        </Modal>
    );
}
