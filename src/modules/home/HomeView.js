import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Text } from '../../components/StyledText';
import { Image } from 'react-native-ui-lib';
const CATEGORIES = [
  {
    id: '1',
    name: 'Sports',
    icon: 'soccer-ball-o',
  },
  {
    id: '2',
    name: 'Music',
    icon: 'music',
  },
  {
    id: '3',
    name: 'Tech',
    icon: 'cogs',
  },
  {
    id: '4',
    name: 'News',
    icon: 'newspaper-o',
  },
  {
    id: '5',
    name: 'Life',
    icon: 'life-ring',
  },
];
const CATEGORY_IMAGES = {
  Sports: [
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
    'https://picsum.photos/200/200?random=3',
    'https://picsum.photos/200/200?random=13', 
    'https://picsum.photos/200/200?random=14', 
    'https://picsum.photos/200/200?random=15'
  ],
  Music: [
    'https://picsum.photos/200/200?random=4', 
    'https://picsum.photos/200/200?random=5', 
    'https://picsum.photos/200/200?random=6',
    'https://picsum.photos/200/200?random=13', 
    'https://picsum.photos/200/200?random=14', 
    'https://picsum.photos/200/200?random=15' 
  ],
  Tech: [
    'https://picsum.photos/200/200?random=7', 
    'https://picsum.photos/200/200?random=8', 
    'https://picsum.photos/200/200?random=9', 
    'https://picsum.photos/200/200?random=13', 
    'https://picsum.photos/200/200?random=14', 
    'https://picsum.photos/200/200?random=15'
  ],
  News: [
    'https://picsum.photos/200/200?random=10',
    'https://picsum.photos/200/200?random=11',
    'https://picsum.photos/200/200?random=12',
    'https://picsum.photos/200/200?random=13', 
    'https://picsum.photos/200/200?random=14', 
    'https://picsum.photos/200/200?random=15'
  ],
  Life: [
    'https://picsum.photos/200/200?random=13', 
    'https://picsum.photos/200/200?random=14', 
    'https://picsum.photos/200/200?random=15', 
    'https://picsum.photos/200/200?random=13', 
    'https://picsum.photos/200/200?random=14', 
    'https://picsum.photos/200/200?random=15'
  ],
};

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const selectedCategoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name;

  const getCategoryImages = (category) => {
    return CATEGORY_IMAGES[category] || [];
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        item.id === selectedCategory ? styles.selectedCategory : null,
      ]}
      onPress={() => handleCategorySelect(item.id)}
    >
      <Icon name={item.icon} style={styles.categoryIcon} size={30} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCardItem = ({ item }) => (
    <View>
    <TouchableOpacity style={styles.cardItem}>
      <Image source={{ uri: item }} style={styles.cardImage} />
    </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text size={30} bold style={styles.title}>Categories</Text>
      </View>
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
      {selectedCategoryName && (
        <Text size={25} bold style={styles.selectedCategory}>{selectedCategoryName}</Text>
      )}
      <FlatList
        data={getCategoryImages(CATEGORIES.find(c => c.id === selectedCategory)?.name || '')}
        renderItem={renderCardItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  categoryList: {
    marginBottom: 20,
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryItem: {
    marginRight: 15,
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  selectedCategory: {
    marginBottom: 20,
  },
  categoryIcon: {
    color: '#333',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 0,
  },
  cardList: {
    paddingBottom: 10,
  },
  cardItem: {
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

// export default function HomeScreen({ isExtended, setIsExtended }) {

//   // Handle Category Selection (Example)
//   const handleCategorySelect = (category) => {
//     console.log('Selected Category:', category.name);
//   };

//   // Render each category item
//   const renderCategoryItem = ({ item }) => {
//     return (
//       <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategorySelect(item)}>
//         {/* Use FontAwesomeIcon here */}
//         <Icon name={item.icon} style={styles.categoryIcon} size={40} />
//         <Text style={styles.categoryName}>{item.name}</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text size={30} bold style={styles.title}>Categories</Text>
//       </View>

//       {/* Horizontal List of Categories */}
//       <FlatList
//         data={CATEGORIES}
//         renderItem={renderCategoryItem}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.categoryList}
//       />

//       {/* Additional content like your home screen content can go here */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 40,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   categoryList: {
//     paddingVertical: 10,
//   },
//   categoryItem: {
//     marginRight: 20,
//     alignItems: 'center',
//   },
//   categoryIcon: {
//     color: '#333',  // Set the color for the icon
//     backgroundColor: '#f0f0f0',  // Background for the icon circle
//     borderRadius: 30,  // Round the background
//     padding: 10,  // Add some padding around the icon
//     marginBottom: 10,  // Space between the icon and text
//   },
//   categoryName: {
//     fontSize: 14,
//     color: '#333',
//   },
// });