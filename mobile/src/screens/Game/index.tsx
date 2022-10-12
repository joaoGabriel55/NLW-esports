import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameCardProps } from "../../@types/navigation";
import { THEME } from "../../theme";
import { Template } from "../Template";
import { styles } from "./styles";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { DuoCard } from "../../components/DuoCard";
import { useGameAds } from "../../hooks/useGameAds";
import { DuoMatch } from "../../components/DuoMatch";
import useDiscordUser from "../../hooks/useDiscordUser";

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameCardProps;

  const { ads } = useGameAds(game.id);
  const { discordDuoSelected, loadDiscordUser, clearDiscordDuoSelected } =
    useDiscordUser();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleLoadDiscordDuo(adsId: string) {
    await loadDiscordUser(adsId);
  }

  return (
    <Template>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />
        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            ads.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => handleLoadDiscordDuo(item.id)}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anuncios publicados ainda.
            </Text>
          )}
        />
        <DuoMatch
          discord={discordDuoSelected}
          visible={!!discordDuoSelected}
          onClose={clearDiscordDuoSelected}
        />
      </SafeAreaView>
    </Template>
  );
}
