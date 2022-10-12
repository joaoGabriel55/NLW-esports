import {
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { THEME } from "../../theme";
import { Heading } from "../Heading";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState<boolean>(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopying(true);

    await Clipboard.setStringAsync(discord);

    Alert.alert("Discord Copiado!");

    setIsCopying(false);
  }

  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <MaterialIcons
            name="check-circle"
            size={64}
            color={THEME.COLORS.SUCCESS}
          />
          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />
          <Text style={styles.label}>Add seu Discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            disabled={isCopying}
            onPress={handleCopyDiscordToClipboard}
          >
            <Text style={styles.discord}>
              {isCopying ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
