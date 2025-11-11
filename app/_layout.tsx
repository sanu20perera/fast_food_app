// import { getCurrentUser } from '@/lib/appwrite';
// import { useFonts } from 'expo-font';
// import { Redirect, Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect, useState } from 'react';
// import './globals.css';
// import runSeed from '@/lib/seed';


// // Prevent splash screen from auto-hiding until resources are loaded
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {

//   // useEffect(() => {
//   //   // Only run in development
//   //   if (__DEV__) {
//   //     runSeed().catch(console.error);
//   //   }
//   // }, []);

//   const [fontsLoaded] = useFonts({
//     'QuickSand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
//     'QuickSand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
//     'QuickSand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
//     'QuickSand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
//     'QuickSand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
//   });

//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     const prepare = async () => {
//       try {
//         const user = await getCurrentUser();
//         setIsAuthenticated(!!user);
//       } catch (error) {
//         console.warn('Error checking auth:', error);
//       } finally {
//         // Hide splash only when fonts and auth are ready
//         if (fontsLoaded) {
//           await SplashScreen.hideAsync();
//         }
//       }
//     };
//     prepare();
//   }, [fontsLoaded]);

//   // Wait for fonts and auth check to complete
//   if (!fontsLoaded || isAuthenticated === null) {
//     return null; // Keep splash visible
//   }

//   // If user not logged in → redirect to sign-in page
//   if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />;

//   // If user logged in → show app
//   return <Stack screenOptions={{ headerShown: false }} />;
// }

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import './globals.css';
// import runSeed from '@/lib/seed';

// Prevent splash screen from auto-hiding until resources are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // useEffect(() => {
  //   // Only run in development
  //   if (__DEV__) {
  //     runSeed().catch(console.error);
  //   }
  // }, []);

  const [fontsLoaded] = useFonts({
    'QuickSand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'QuickSand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'QuickSand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'QuickSand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'QuickSand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
  });

  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {;
        await SplashScreen.hideAsync();
      }
    };

    hideSplash();
  }, [fontsLoaded]);

  // Wait for fonts to load
  if (!fontsLoaded) {
    return null; // Keep splash visible
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}