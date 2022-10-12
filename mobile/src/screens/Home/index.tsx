import React from "react";
import { FlatList, Image } from "react-native";
import { styles } from "./styles";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameCardProps } from "../../@types/navigation";
import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { useGames } from "../../hooks/useGames";
import { Template } from "../Template";

export function Home() {
  const { games } = useGames();

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  return (
    <Template>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
        />
      </SafeAreaView>
    </Template>
  );
}
