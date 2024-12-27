import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Text } from '../../components/StyledText';
import { Image } from 'react-native-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import { CATEGORIES, CATEGORY_IMAGES, CATEGORY_NEWS } from './homeScreenConstants';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const selectedCategoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name;

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const getCategoryImages = (category) => CATEGORY_IMAGES[category] || [];
  const getCategoryNews = () => CATEGORY_NEWS;
  const handleCategorySelect = (categoryId) => setSelectedCategory(categoryId);

  const openModal = (imageUrl) => {
    setModalText(imageUrl);
    setModalVisible(true);
  };  

  const closeModal = () => setModalVisible(false);

  const [newsModalData, setNewsModalData] = useState({ imageUrl: '', title: '', description: '' });
  const [isNewsModalVisible, setNewsModalVisible] = useState(false);

  const openNewsModal = (imageUrl, title, description) => {
    setNewsModalData({ imageUrl, title, description });
    setNewsModalVisible(true);
  };

const closeNewsModal = () => setNewsModalVisible(false);

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

  const renderCardItem = ({ item }) => {
    const imageUrl = typeof item === 'string' ? item : item.imageUrl; 

    return (
      <TouchableOpacity 
        style={styles.cardItem}
        onPress={() => openModal(imageUrl)}
      >
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      </TouchableOpacity>
    );
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cardItem}
      onPress={() => openNewsModal(item.imageUrl, item.title, item.description)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.overlay}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <Text size={25} bold style={styles.selectedCategoryText}>
            {selectedCategoryName}
          </Text>
        )}
        <FlatList
          data={getCategoryImages(selectedCategoryName || '')}
          renderItem={renderCardItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />

         {/* news section */}
         <View style={styles.header}>
          <Text size={30} bold style={styles.title}>Today's News</Text>
        </View>
        <FlatList
          data={getCategoryNews()}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />

        {/* here all catory images and its title will be rendered one by one */}
        <View style={styles.header}>
          <Text size={30} bold style={styles.title}>Sports</Text>
        </View>
        <FlatList
          data={CATEGORY_IMAGES.Life}
          renderItem={renderCardItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />

        <View style={styles.header}>
          <Text size={30} bold style={styles.title}>Music</Text>
          </View>
        <FlatList
          data={CATEGORY_IMAGES.Music}
          renderItem={renderCardItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />

        <View style={styles.header}>
          <Text size={30} bold style={styles.title}>Tech</Text>
          </View>
        <FlatList
          data={CATEGORY_IMAGES.Tech}
          renderItem={renderCardItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />

        <View style={styles.header}>
          <Text size={30} bold style={styles.title}>News</Text>
          </View>
        <FlatList
          data={CATEGORY_IMAGES.News}
          renderItem={renderCardItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />

        <View style={styles.header}>
          <Text size={30} bold style={styles.title}>Life</Text>
          </View>
        <FlatList
          data={CATEGORY_IMAGES.Life}
          renderItem={renderCardItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
        />
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Image source={{ uri: modalText }} style={styles.modalImage} />
              <Text size={18} style={styles.modalText}>
                This is some random text for the image! The time now is {new Date().toLocaleTimeString()}.
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text size={18} bold style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* modal for news */}
        <Modal
          visible={isNewsModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeNewsModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Image source={{ uri: newsModalData.imageUrl }} style={styles.modalImage} />
              <Text size={18} bold style={styles.modalTitle}>{newsModalData.title}</Text>
              <Text size={16} style={styles.modalDescription}>{newsModalData.description}</Text>
              <TouchableOpacity onPress={closeNewsModal} style={styles.closeButton}>
                <Text size={18} bold style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)', 
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 16, 
    flexWrap: 'wrap', 
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 0,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryList: {
    marginBottom: 20,
  },
  selectedCategoryText: {
    marginVertical: 10,
  },
  categoryItem: {
    marginRight: 15,
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: 'white',
  },
  categoryIcon: {
    color: '#333',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
  },
  cardList: {
    marginBottom: 20,
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
