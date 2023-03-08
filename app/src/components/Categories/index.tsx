import { useState } from "react";
import { FlatList } from "react-native";

import { CategoryContainer, Icon } from "./styles";
import { Text } from "../Text";

import { Category } from "../../types/Category";

interface CategoriesProps {
    categories: Category[];
    onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
    const [selectedCategory, setSelectedCategory] = useState("");

    function handleSelectCategory(categoryId: string) {
        const category = selectedCategory === categoryId ? "" : categoryId;

        onSelectCategory(category);
        setSelectedCategory(category);
    }

    return (
        <FlatList
            contentContainerStyle={{ paddingRight: 24 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(categories) => categories._id}
            renderItem={({ item }) => {
                const isSelected = selectedCategory === item._id;
                return (
                    <CategoryContainer
                        onPress={() => handleSelectCategory(item._id)}
                    >
                        <Icon>
                            <Text opacity={isSelected ? 1 : 0.5}>
                                {item.icon}
                            </Text>
                        </Icon>
                        <Text
                            size={14}
                            weight="600"
                            opacity={isSelected ? 1 : 0.5}
                        >
                            {item.name}
                        </Text>
                    </CategoryContainer>
                );
            }}
        />
    );
}
