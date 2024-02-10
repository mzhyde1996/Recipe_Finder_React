import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator, Image } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = () => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error in fetch: " + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setRecipes(data.meals || []);
        setIngredient('');
        setLoading(false);
      })
      .catch(err => console.error(err));
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, marginTop: 70 }}>
          <TextInput
            placeholder='Type ingredient'
            value={ingredient}
            onChangeText={text => setIngredient(text)}
          />
          <Button title="Fetch" onPress={fetchRecipes} />
        </View>
        <View style={{ flex: 6 }}>
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) =>
              <View style={{ marginLeft: 10, marginBottom: 5 }}>
                <Image source={{ uri: item.strMealThumb }} style={{ width: 50, height: 50, borderRadius: 25, marginBottom: 5 }} />
                <Text style={{ fontSize: 18 }}>{item.strMeal}</Text>
              </View>}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


