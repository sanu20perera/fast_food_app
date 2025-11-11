// // import CustomButton from '@/components/CustomButton'
// // import CustomInput from '@/components/CustomInput'
// // import { createUser } from '@/lib/appwrite'
// // import { Link, router } from 'expo-router'
// // import { useState } from 'react'
// // import { Alert, Text, View } from 'react-native'

// // const SignUp = () => {
// //     const [isSubmitting, setIsSubmitting] = useState(false);
// //     const [form, setForm] = useState({ name: '', email: '', password: '' });

// //     const submit = async () => {
// //         const { name, email, password } = form;
// //         if (!form.name || !form.email || !form.password) return Alert.alert('Error', 'Please enter valid email address & password');
// //         setIsSubmitting(true)
// //         try {
// //             //Call Appwrite sign Up function
// //             await createUser({ email, password, name });

// //             router.replace('/');
// //         } catch (error: any) {
// //             Alert.alert('Error', error.message);
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     }
// //     return (
// //         <View className="gap-10 bg-whte rounded-lg p-5 mt-5">

// //             <CustomInput
// //                 placeholder="Enter Your Full Name"
// //                 value={form.name}
// //                 onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
// //                 label="Full Name"
// //             />

// //             <CustomInput
// //                 placeholder="Enter Your Email"
// //                 value={form.email}
// //                 onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
// //                 label="Email"
// //                 keyboardType='email-address'
// //             />

// //             <CustomInput
// //                 placeholder="Enter Your Password"
// //                 value={form.password}
// //                 onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
// //                 label="Password"
// //                 secureTextEntry={true}
// //             />
// //             <CustomButton
// //                 title="Sign Up"
// //                 isLoading={isSubmitting}
// //                 onPress={submit}
// //             />
// //             <View className="flex justify-center mt-5 flex-row gap-2">
// //                 <Text className="base-regular text-gray-100"> Already have an account ?</Text>
// //                 <Link href="/(auth)/sign-in" className="base-bold text-primary"> Sign In</Link>
// //             </View>
// //         </View>
// //     )
// // }

// // export default SignUp

// import CustomButton from '@/components/CustomButton';
// import CustomInput from '@/components/CustomInput';
// import { createUser } from '@/lib/appwrite';
// import { Link, router } from 'expo-router';
// import { useState } from 'react';
// import { Alert, Text, View } from 'react-native';

// export default function SignUp() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [form, setForm] = useState({ name: '', email: '', password: '' });

//   const submit = async () => {
//     if (!form.name || !form.email || !form.password)
//       return Alert.alert('Error', 'Please fill all fields');

//     setIsSubmitting(true);
//     try {
//       await createUser(form);
//       router.replace('/(tabs)');
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <View className="gap-10 bg-white rounded-lg p-5 mt-5">
//       <CustomInput label="Full Name" value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} />
//       <CustomInput label="Email" value={form.email} onChangeText={(text) => setForm({ ...form, email: text })} />
//       <CustomInput label="Password" value={form.password} secureTextEntry onChangeText={(text) => setForm({ ...form, password: text })} />
//       <CustomButton title="Sign Up" onPress={submit} isLoading={isSubmitting} />
//       <View className="flex justify-center mt-5 flex-row gap-2">
//         <Text className="base-regular text-gray-100">Already have an account?</Text>
//         <Link href="/(auth)/sign-in" className="base-bold text-primary"> Sign In</Link>
//       </View>
//     </View>
//   );
// }

import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { createUser } from '@/lib/appwrite';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ to save user data locally

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async () => {
    if (!form.name || !form.email || !form.password)
      return Alert.alert('Error', 'Please fill all fields');

    setIsSubmitting(true);
    try {
      await createUser(form);

      // ✅ Save user info locally so Profile can read it
      await AsyncStorage.setItem('userProfile', JSON.stringify({
        name: form.name,
        email: form.email,
      }));

      // ✅ Navigate to main tabs
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Full Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <CustomInput
        label="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
      />
      <CustomInput
        label="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
      />
      <CustomButton title="Sign Up" onPress={submit} isLoading={isSubmitting} />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">Already have an account?</Text>
        <Link href="/(auth)/sign-in" className="base-bold text-primary"> Sign In</Link>
      </View>
    </View>
  );
}
