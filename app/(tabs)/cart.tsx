// import { View, Text } from 'react-native'
// import React from 'react'

// const cart = () => {
//   return (
//     <View>
//       <Text>cart</Text>
//     </View>
//   )
// }

// export default cart

import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import { useCartStore } from "@/store/cart.store";
import { PaymentInfoStripeProps } from '@/type';
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
const PaymentInfoStripe = ({ label, value, labelStyle, valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {
    const { items, getTotalItems, getTotalPrice } = useCartStore();

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={items}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerClassName="pb-28 px-5 pt-5"

                ListHeaderComponent={() => (
                    <View className="flex-row items-center justify-between px-1 py-4">
                        <TouchableOpacity onPress={() => router.back()} className="p-2">
                            <Ionicons name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text className="text-xl font-bold">Cart</Text>
                        <View style={{ width: 24 }} />
                    </View>
                )}

                ListEmptyComponent={() => (
                    <View className="items-center justify-center mt-10">
                        <Image
                            source={require('../../assets/images/empty-state.png')}
                            style={{ width: 300, height: 450, marginBottom: 10 }}
                            resizeMode="contain"
                        />
                        <Text className="text-2xl font-bold mb-2 text-gray-800"> Your Cart is Empty</Text>
                        <TouchableOpacity
                            onPress={() => router.push('/(tabs)/search')}
                            className="bg-orange-500 py-3 px-6 rounded-full"
                        >
                            <Text className="text-white font-bold text-base">Browse Menu</Text>
                        </TouchableOpacity>
                    </View>
                )}

                ListFooterComponent={() => totalItems > 0 && (
                    <View className="gap-5">
                        <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                            <Text className="h3-bold text-dark-100 mb-5">
                                Payment Summary
                            </Text>

                            <PaymentInfoStripe
                                label={`Total Items (${totalItems})`}
                                value={`$${totalPrice.toFixed(2)}`}
                            />
                            <PaymentInfoStripe
                                label={`Delivery Fee`}
                                value={`$5.00`}
                            />
                            <PaymentInfoStripe
                                label={`Discount`}
                                value={`- $0.50`}
                                valueStyle="!text-success"
                            />
                            <View className="border-t border-gray-300 my-2" />
                            <PaymentInfoStripe
                                label={`Total`}
                                value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                                labelStyle="base-bold !text-dark-100"
                                valueStyle="base-bold !text-dark-100 !text-right"
                            />
                        </View>

                        <CustomButton title="Order Now" />
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Cart
