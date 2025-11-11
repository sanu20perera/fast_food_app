// import { ID } from "react-native-appwrite";
// import { appwriteConfig, databases, storage } from "./appwrite";
// import dummyData from "./data";

// interface Category {
//     name: string;
//     description: string;
// }

// interface Customization {
//     name: string;
//     price: number;
//     type: "topping" | "side" | "size" | "crust" | string; // extend as needed
// }

// interface MenuItem {
//     name: string;
//     description: string;
//     image_url: string;
//     price: number;
//     rating: number;
//     calories: number;
//     protein: number;
//     category_name: string;
//     customizations: string[]; // list of customization names
// }

// interface DummyData {
//     categories: Category[];
//     customizations: Customization[];
//     menu: MenuItem[];
// }

// // ensure dummyData has correct shape
// const data = dummyData as DummyData;

// async function clearAll(collectionId: string): Promise<void> {
//     const list = await databases.listDocuments(
//         appwriteConfig.databaseId,
//         collectionId
//     );

//     await Promise.all(
//         list.documents.map((doc) =>
//             databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
//         )
//     );
// }

// async function clearStorage(): Promise<void> {
//     const list = await storage.listFiles(appwriteConfig.bucketId);

//     await Promise.all(
//         list.files.map((file) =>
//             storage.deleteFile(appwriteConfig.bucketId, file.$id)
//         )
//     );
// }

// async function uploadImageToStorage(imageUrl: string) {
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();

//     const fileObj = {
//         name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
//         type: blob.type,
//         size: blob.size,
//         uri: imageUrl,
//     };

//     const file = await storage.createFile(
//         appwriteConfig.bucketId,
//         ID.unique(),
//         fileObj
//     );

//     return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
// }

// async function seed(): Promise<void> {
//     // 1. Clear all
//     await clearAll(appwriteConfig.categoriesCollectionId);
//     await clearAll(appwriteConfig.customizationsCollectionId);
//     await clearAll(appwriteConfig.menuCollectionId);
//     await clearAll(appwriteConfig.menuCustomizationsCollectionId);
//     await clearStorage();

//     // 2. Create Categories
//     const categoryMap: Record<string, string> = {};
//     for (const cat of data.categories) {
//         const doc = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.categoriesCollectionId,
//             ID.unique(),
//             cat
//         );
//         categoryMap[cat.name] = doc.$id;
//     }

//     // 3. Create Customizations
//     const customizationMap: Record<string, string> = {};
//     for (const cus of data.customizations) {
//         const doc = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.customizationsCollectionId,
//             ID.unique(),
//             {
//                 name: cus.name,
//                 price: cus.price,
//                 type: cus.type,
//             }
//         );
//         customizationMap[cus.name] = doc.$id;
//     }

//     // 4. Create Menu Items
//     const menuMap: Record<string, string> = {};
//     for (const item of data.menu) {
//         const uploadedImage = await uploadImageToStorage(item.image_url);

//         const doc = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.menuCollectionId,
//             ID.unique(),
//             {
//                 name: item.name,
//                 description: item.description,
//                 image_url: uploadedImage,
//                 price: item.price,
//                 rating: item.rating,
//                 calories: item.calories,
//                 protein: item.protein,
//                 categories: categoryMap[item.category_name],
//             }
//         );

//         menuMap[item.name] = doc.$id;

//         // 5. Create menu_customizations
//         for (const cusName of item.customizations) {
//             await databases.createDocument(
//                 appwriteConfig.databaseId,
//                 appwriteConfig.menuCustomizationsCollectionId,
//                 ID.unique(),
//                 {
//                     menu: doc.$id,
//                     customizations: customizationMap[cusName],
//                 }
//             );
//         }
//     }

//     console.log("✅ Seeding complete.");
// }

// export default seed;


import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: "topping" | "side" | "size" | "crust" | string;
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  customizations: string[];
}

// Clear all documents from a collection
async function clearCollection(collectionId: string) {
  const list = await databases.listDocuments(appwriteConfig.databaseId, collectionId);
  await Promise.all(list.documents.map(doc =>
    databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
  ));
}

// Clear all files from the storage bucket
async function clearStorage() {
  const list = await storage.listFiles(appwriteConfig.bucketId);
  await Promise.all(list.files.map(file =>
    storage.deleteFile(appwriteConfig.bucketId, file.$id)
  ));
}

// Upload image to Appwrite Storage and return its URL
async function uploadImageToStorage(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const fileObj = {
      name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
      type: blob.type,
      size: blob.size,
      uri: imageUrl,
    };

    const file = await storage.createFile(appwriteConfig.bucketId, ID.unique(), fileObj);
    return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
  } catch (error) {
    console.error("Failed to upload image:", error);
    return imageUrl; // fallback to original URL
  }
}

// Main seed function
async function seed() {
  try {
    console.log("🔹 Clearing old data...");
    await clearCollection(appwriteConfig.categoriesCollectionId);
    await clearCollection(appwriteConfig.customizationsCollectionId);
    await clearCollection(appwriteConfig.menuCollectionId);
    await clearCollection(appwriteConfig.menuCustomizationsCollectionId);
    await clearStorage();

    console.log("🔹 Seeding categories...");
    const categoryMap: Record<string, string> = {};
    for (const cat of dummyData.categories) {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.categoriesCollectionId,
        ID.unique(),
        cat
      );
      categoryMap[cat.name] = doc.$id;
    }

    console.log("🔹 Seeding customizations...");
    const customizationMap: Record<string, string> = {};
    for (const cus of dummyData.customizations) {
      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.customizationsCollectionId,
        ID.unique(),
        cus
      );
      customizationMap[cus.name] = doc.$id;
    }

    console.log("🔹 Seeding menu items...");
    for (const item of dummyData.menu) {
      const uploadedImage = await uploadImageToStorage(item.image_url);

      const menuDoc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCollectionId,
        ID.unique(),
        {
          name: item.name,
          description: item.description,
          image_url: uploadedImage,
          price: item.price,
          rating: item.rating,
          calories: item.calories,
          protein: item.protein,
          categories: categoryMap[item.category_name],
        }
      );

      // Seed menu_customizations
      for (const cusName of item.customizations) {
        if (customizationMap[cusName]) {
          await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.menuCustomizationsCollectionId,
            ID.unique(),
            {
              menu: menuDoc.$id,
              customizations: customizationMap[cusName],
            }
          );
        }
      }
    }

    console.log("✅ Database seeding complete!");
  } catch (error) {
    console.error("❌ Failed to seed database:", error);
    throw error;
  }
}

export default seed;
