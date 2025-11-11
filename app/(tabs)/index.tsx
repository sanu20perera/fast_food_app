// import { images, offers } from "@/constants";
// import cn from 'clsx';
// import { Fragment } from "react";
// import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// // import './globals.css';
// import CartButton from "@/components/CartButton";

// export default function Index() {
//   return (
//     <SafeAreaView className="flex-1" bg-white>

//       <FlatList
//         data={offers}
//         renderItem={({ item, index }) => {
//           const isEven: boolean = index % 2 === 0;
//           return (
//             <View>
//               <Pressable
//                 className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
//                 style={{ backgroundColor: item.color }}
//                 android_ripple={{ color: "#ffff22" }}
//               >
//                 {({ pressed }) => (
//                   <Fragment>
//                     <View className={"h-full w-1/2"}>
//                       <Image source={item.image} className={"size-full"} resizeMode="contain" />
//                     </View>
//                     <View className={cn("offer-card_info", isEven ? 'pl-10' : 'pr-10')}>
//                       <Text className="h1-bold text-white leading-tight">{item.title}</Text>
//                       <Image source={images.arrowRight} className="size-10" resizeMode="contain" tintColor="#ffffff" />
//                     </View>
//                   </Fragment>
//                 )}
//               </Pressable>
//             </View>
//           );
//         }}
//         contentContainerClassName="pb-28 px-5"
//         ListHeaderComponent={() => (
//           <View className="flex-between flex-row w-full my-5">
//             <View className="flex-start">
//               <Text className="small-bold text-primary"> DELIVER TO</Text>
//               <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
//                 <Text className="paragraph-bold text-dark-100" >Croatia</Text>
//                 <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
//               </TouchableOpacity>
//             </View>

//             <CartButton/>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

import { images, offers } from "@/constants";
import cn from 'clsx';
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartButton from "@/components/CartButton";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">

      <FlatList
        data={offers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <View className="mb-6">
              <Pressable
                className={cn(
                  "rounded-2xl overflow-hidden",
                  "shadow-md",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    {/* Image Section */}
                    <View className="w-1/2 p-4 justify-center items-center">
                      <Image
                        source={item.image}
                        className="w-full h-36"
                        resizeMode="contain"
                      />
                    </View>

                    {/* Info Section */}
                    <View className={cn("flex-1 justify-center", isEven ? "pl-6" : "pr-6")}>
                      <Text className="text-4xl font-bold text-white mb-2">
                        {item.title}
                      </Text>
                      <TouchableOpacity
                        className={cn(
                          "flex-row items-center gap-x-2 mt-2",
                          pressed ? "opacity-70" : "opacity-100"
                        )}
                      >
                        <Text className="text-white font-semibold">Explore</Text>
                        <Image
                          source={images.arrowRight}
                          className="w-4 h-4"
                          resizeMode="contain"
                          tintColor="#ffffff"
                        />
                      </TouchableOpacity>
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 20 }}
        ListHeaderComponent={() => (
          <View className="flex-row justify-between items-center my-5">
            <View>
              <Text className="text-xs font-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-row items-center mt-1">
                <Text className="text-sm font-semibold text-gray-900">Croatia</Text>
                <Image source={images.arrowDown} className="w-3 h-3 ml-1" resizeMode="contain" />
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

