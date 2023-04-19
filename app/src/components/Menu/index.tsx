import { useState } from "react";
import { FlatList } from "react-native";
import { baseUrl } from "../../utils/api";

import {
    ProductContainer,
    ProductDetails,
    ProductImage,
    Separator,
    AddToCardButton,
} from "./styles";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Text } from "../Text";

import { Product } from "../../types/Product";

import { formatCurrency } from "../../utils/formatCurrency";

interface MenuProps {
    onAddToCart: (product: Product) => void;
    products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );

    function handleOpenModal(product: Product) {
        setIsModalVisible(true);
        setSelectedProduct(product);
    }

    return (
        <>
            <ProductModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                product={selectedProduct}
                onAddToCart={onAddToCart}
            />
            <FlatList
                style={{ marginTop: 32 }}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                data={products}
                keyExtractor={(product) => product._id}
                ItemSeparatorComponent={Separator}
                renderItem={({ item: product }) => (
                    <ProductContainer onPress={() => handleOpenModal(product)}>
                        <ProductImage
                            source={{
                                uri: `${baseUrl}/uploads/${product.imagePath}`,
                            }}
                        />
                        <ProductDetails>
                            <Text weight="600">{product.name}</Text>
                            <Text
                                color="#666"
                                size={14}
                                style={{ marginVertical: 8 }}
                            >
                                {product.description}
                            </Text>
                            <Text size={14} weight="600">
                                {formatCurrency(product.price)}
                            </Text>
                        </ProductDetails>
                        <AddToCardButton onPress={() => onAddToCart(product)}>
                            <PlusCircle />
                        </AddToCardButton>
                    </ProductContainer>
                )}
            />
        </>
    );
}
