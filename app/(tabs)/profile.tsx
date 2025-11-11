// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { router } from 'expo-router'
// import { Ionicons } from '@expo/vector-icons'

// interface ProfileFieldProps {
//   icon: string;
//   label: string;
//   value: string;
//   iconColor: string;
// }

// const ProfileField = ({ icon, label, value, iconColor }: ProfileFieldProps) => (
//   <View className="flex-row items-start mb-6 px-5">
//     <View className="w-10 h-10 rounded-full items-center justify-center mr-4" style={{ backgroundColor: `${iconColor}15` }}>
//       <Ionicons name={icon as any} size={20} color={iconColor} />
//     </View>
//     <View className="flex-1">
//       <Text className="text-xs text-gray-400 mb-1">{label}</Text>
//       <Text className="text-base font-semibold text-gray-900">{value}</Text>
//     </View>
//   </View>
// )

// const Profile = () => {
//   const handleEditProfile = () => {
//     // Navigate to edit profile screen
//     console.log('Edit Profile')
//   }

//   const handleLogout = () => {
//     // Handle logout logic
//     console.log('Logout')
//     // router.replace('/(auth)/sign-in')
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       {/* Header */}
//       <View className="flex-row items-center justify-between px-5 py-4">
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text className="text-xl font-bold">Profile</Text>
//         <TouchableOpacity>
//           <Ionicons name="search-outline" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Profile Image */}
//         <View className="items-center mt-6 mb-8">
//           <View className="relative">
//             <Image
//               source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400' }}
//               className="w-32 h-32 rounded-full"
//             />
//             <TouchableOpacity 
//               className="absolute bottom-0 right-0 bg-orange-500 w-10 h-10 rounded-full items-center justify-center border-4 border-white"
//               onPress={() => console.log('Edit photo')}
//             >
//               <Ionicons name="pencil" size={18} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Profile Fields */}
//         <ProfileField
//           icon="person-outline"
//           label="Full Name"
//           value="Adrian Hajdin"
//           iconColor="#FF6B35"
//         />

//         <ProfileField
//           icon="mail-outline"
//           label="Email"
//           value="adrian@jsmastery.com"
//           iconColor="#FF6B35"
//         />

//         <ProfileField
//           icon="call-outline"
//           label="Phone number"
//           value="+1 555 123 4567"
//           iconColor="#FFA500"
//         />

//         <ProfileField
//           icon="location-outline"
//           label="Address 1 - (Home)"
//           value="123 Main Street, Springfield, IL 62704"
//           iconColor="#FFA500"
//         />

//         <ProfileField
//           icon="location-outline"
//           label="Address 2 - (Work)"
//           value="221B Rose Street, Foodville, FL 12345"
//           iconColor="#FFA500"
//         />

//         {/* Buttons */}
//         <View className="px-5 mt-6 mb-8">
//           {/* Edit Profile Button */}
//           <TouchableOpacity
//             onPress={handleEditProfile}
//             className="bg-white border-2 border-orange-500 py-4 rounded-full mb-4"
//           >
//             <Text className="text-orange-500 text-center font-bold text-base">
//               Edit Profile
//             </Text>
//           </TouchableOpacity>

//           {/* Logout Button */}
//           <TouchableOpacity
//             onPress={handleLogout}
//             className="bg-white border-2 border-red-500 py-4 rounded-full flex-row items-center justify-center"
//           >
//             <Ionicons name="log-out-outline" size={20} color="#EF4444" style={{ marginRight: 8 }} />
//             <Text className="text-red-500 text-center font-bold text-base">
//               Logout
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default Profile

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileFieldProps {
  icon: string;
  label: string;
  value: string;
  iconColor: string;
}

const ProfileField = ({ icon, label, value, iconColor }: ProfileFieldProps) => (
  <View className="flex-row items-start mb-6 px-5">
    <View
      className="w-10 h-10 rounded-full items-center justify-center mr-4"
      style={{ backgroundColor: `${iconColor}15` }}
    >
      <Ionicons name={icon as any} size={20} color={iconColor} />
    </View>
    <View className="flex-1">
      <Text className="text-xs text-gray-400 mb-1">{label}</Text>
      <Text className="text-base font-semibold text-gray-900">{value}</Text>
    </View>
  </View>
);

const Profile = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await AsyncStorage.getItem('userProfile');
      if (data) setUser(JSON.parse(data));
    };
    fetchUser();
  }, []);

  const handleEditProfile = () => {
    console.log('Edit Profile');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userProfile');
    router.replace('/(auth)/sign-in');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="relative flex-row items-center justify-center px-5 py-4 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="absolute left-5 p-2">
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-center">Profile</Text>
        <TouchableOpacity className="absolute right-5 p-2">
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Image */}
        <View className="items-center mt-6 mb-8">
          <View className="relative">
            <Image
              source={require('../../assets/images/avatar.png')}
              className="w-32 h-32 rounded-full"
            />

            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-orange-500 w-10 h-10 rounded-full items-center justify-center border-4 border-white"
              onPress={() => console.log('Edit photo')}
            >
              <Ionicons name="pencil" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Fields */}
        <ProfileField
          icon="person-outline"
          label="Full Name"
          value={user?.name || 'N/A'}
          iconColor="#FF6B35"
        />
        <ProfileField
          icon="mail-outline"
          label="Email"
          value={user?.email || 'N/A'}
          iconColor="#FF6B35"
        />
        <ProfileField
          icon="call-outline"
          label="Phone number"
          value="+1 555 123 4567"
          iconColor="#FFA500"
        />

        {/* Buttons */}
        <View className="px-5 mt-6 mb-8">
          <TouchableOpacity
            onPress={handleEditProfile}
            className="bg-white border-2 border-orange-500 py-4 rounded-full mb-4"
          >
            <Text className="text-orange-500 text-center font-bold text-base">
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-white border-2 border-red-500 py-4 rounded-full flex-row items-center justify-center"
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#EF4444"
              style={{ marginRight: 8 }}
            />
            <Text className="text-red-500 text-center font-bold text-base">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
