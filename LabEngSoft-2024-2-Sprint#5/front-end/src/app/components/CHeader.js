import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Animated,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faCircleUser,
  faMagnifyingGlass,
  faArrowRightFromBracket,
  faPlus,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import packageJson from "../../../package.json";
import { observer } from "mobx-react-lite";
import userContext from "../contexts/user";

const { width } = Dimensions.get("window");

const CHeader = observer((props) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current;

  const abrirMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  const deslogar = async () => {
    Alert.alert(
      "Atenção!",
      "Ao confirmar a saída você será desconectado de todas as sessões.",
      [
        {
          text: "Cancelar",
        },
        {
          text: "OK",
          onPress: async () => {
            userContext.set(null);
            AsyncStorage.setItem("token", "");
            router.push("screens/Feed?logado=false");
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          {props.goBack && (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconContainer}
            >
              <FontAwesomeIcon icon={faArrowLeft} size={28} color="#000" />
            </TouchableOpacity>
          )}

          {props.showText && props.titulo == "feed" ? (
            <FontAwesomeIcon style={{marginLeft: 10}} size={25} icon={faHouse} color="#FF7C33" />
          ) : props.showText ? (
            <Text style={styles.title}>{props.titulo}</Text>
          ) : (
            <Text style={styles.title}></Text>
          )}

          {props.showIcon && props.logado ? (
            <Pressable
              onPress={abrirMenu}
              style={[styles.iconContainer, styles.centerIcon]}
            >
              {userContext.user && userContext.user.foto ? (
                <Image
                  source={{ uri: userContext.user.foto }}
                  style={{ width: 35, height: 35, borderRadius: 35 }}
                />
              ) : (
                <FontAwesomeIcon icon={faCircleUser} size={35} color="#000" />
              )}
            </Pressable>
          ) : props.showIcon ? (
            <Pressable
              onPress={() => {
                router.push("screens/Login");
              }}
              style={[styles.iconContainer, styles.centerIcon]}
            >
              <Text style={styles.title}>Entrar</Text>
            </Pressable>
          ) : (
            <View style={{ width: 35, height: 35, borderRadius: 35 }} />
          )}
        </View>
        <View style={styles.topLine} />
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={menuVisible}
        onRequestClose={abrirMenu}
      >
        <Pressable style={styles.overlay} onPress={abrirMenu}>
          <Animated.View
            style={[styles.modal, { transform: [{ translateX: slideAnim }] }]}
          >
            <View style={styles.menu}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => {
                  router.push({ pathname: "screens/EditarUsuario" });
                }}
              >
                {userContext.user && userContext.user.foto ? (
                  <Image
                    source={{ uri: userContext.user.foto }}
                    style={{ width: 120, height: 120, borderRadius: 120 }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    size={120}
                    color="#000"
                  />
                )}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 15, fontStyle: "bold" }}>
                    {" "}
                    Meu Perfil
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.innerLine} />
              <View style={{ justifyContent: "flex-start" }}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    router.push("screens/Feed?logado=true");
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesomeIcon size={20} icon={faHouse} color="#FF7C33" />
                    <Text style={styles.menuText}> Início</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    abrirMenu();
                    router.push("screens/MinhasReclamacoes");
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesomeIcon
                      size={20}
                      icon={faMagnifyingGlass}
                      color="#FF7C33"
                    />
                    <Text style={styles.menuText}> Minhas reclamações</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    abrirMenu();
                    router.push({ pathname: "screens/CriarReclamacao" });
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesomeIcon size={20} icon={faPlus} color="#FF7C33" />
                    <Text style={styles.menuText}> Criar Reclamação</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    abrirMenu();
                    deslogar();
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesomeIcon
                      size={20}
                      icon={faArrowRightFromBracket}
                      color="#FF7C33"
                    />
                    <Text style={styles.menuText}> Sair</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.versao}>Versão: {packageJson.version}</Text>
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
  },
  topLine: {
    backgroundColor: "#FF7C33",
    height: 4,
    width: width,
  },
  innerLine: {
    backgroundColor: "#FF7C33",
    height: 4,
    width: "100%",
    marginTop: 30,
    marginBottom: 10,
  },
  centerIcon: {
    textAlign: "center",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 5,
    paddingRight: 5,
  },
  iconContainer: {
    paddingHorizontal: 5,
    paddingVertical: 7,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  modal: {
    position: "absolute",
    right: 0,
    top: 0,
    width: width - width / 3,
    height: "100%",
    backgroundColor: "#fff",
  },
  menu: {
    paddingTop: 50,
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    marginTop: 20,
  },
  menuText: {
    justifyContent: "flex-end",
    fontSize: 22,
    fontWeight: "bold",
  },
  versao: {
    fontSize: 13,
    textAlign: "center",
    color: "#555555",
    margin: 10,
  },
});

export default CHeader;
