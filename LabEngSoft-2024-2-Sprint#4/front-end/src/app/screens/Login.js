import { StyleSheet, View, Text, Image, StatusBar } from "react-native";
import { router } from "expo-router";
import CTextInput from "../components/CTextInput";
import CPassInput from "../components/CPassInput";
import CTextButton from "../components/CTextButton";
import logo from "../../../assets/logo.png";
import { useState } from "react";
import { post } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from "mobx-react-lite";
import userContext from "../contexts/user";

const Login = observer(() => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);

  const handleSubmit = async () => {
    setSenhaIncorreta(false);
    await post("login", { email: email, senha: senha }).then((data) => {
      if (data.status !== 200) {
        AsyncStorage.setItem("token", "");
        setSenhaIncorreta(true);
        return;
      }
      data.json().then((data) => {
        userContext.set(data);
        AsyncStorage.setItem("token", data.token);
        router.push("screens/Feed?logado=true");
      });
    });
  };

  return (
    <View style={{ ...styles.container, width: "100%" }}>
      <StatusBar backgroundColor="#FF7C33" barStyle="light-content" />
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />

        {senhaIncorreta && (
          <View style={styles.viewSenhaIncorreta}>
            <Text
              style={{ color: "#ff0022", fontWeight: "bold", fontSize: 20 }}
            >
              E-mail ou senha inválidos
            </Text>
          </View>
        )}

        <CTextInput
          placeholder="E-mail"
          setState={setEmail}
          error={senhaIncorreta}
        ></CTextInput>

        <CPassInput
          placeholder="Senha"
          setState={setSenha}
          error={senhaIncorreta}
        ></CPassInput>

        <View style={styles.viewLinks}>
          <Text style={{ color: "#a9a9a9" }}>
            Esqueceu sua senha?{" "}
            <Text
              style={{ color: "#a9a9a9", fontWeight: "bold" }}
              onPress={() => router.push("screens/RecuperarSenha")}
            >
              Clique aqui
            </Text>
          </Text>
        </View>

        <CTextButton
          buttonStyle={{
            backgroundColor: "#FF7C33",
          }}
          textStyle={{
            color: "#FFFFFF",
          }}
          text="Login"
          loading={loading}
          callback={() => {
            if (loading) return;
            setLoading(true);
            handleSubmit().finally(() => setLoading(false));
          }}
        ></CTextButton>

        <View style={styles.viewLinks}>
          <Text style={{ color: "#a9a9a9", justifyContent: "left" }}>
            Ainda não tem uma conta?{" "}
            <Text
              style={{ color: "#a9a9a9", fontWeight: "bold" }}
              onPress={() => router.push("screens/Cadastro")}
            >
              Cadastre-se
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  viewSenhaIncorreta: {
    display: "flex",
    width: "100%",
    margin: 5,
    alignItems: "center",
  },
  viewLinks: {
    display: "flex",
    width: "100%",
    margin: 5,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 10,
    marginLeft: 18,
    marginTop: -30,
    resizeMode: "contain",
  },
});

export default Login;
