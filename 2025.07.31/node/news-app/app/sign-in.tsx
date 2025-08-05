import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  View,
  YStack,
  XStack,
  Button,
  Separator,
  H3,
  Image,
  Form,
  Input,
  Text,
  Spinner,
} from "tamagui";

import { useAuth } from "../hooks/useAuth";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off",
  );
  const { signIn, isSignedIn, isLoading } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  const handleSignIn = async () => {
    if (!isEmailValid || !isPasswordValid) {
      setStatus("off");
      alert("Invalid email or password");
      return;
    }

    setStatus("submitting");

    await signIn(email, password);
    
    setStatus("submitted");
  };

  const validateEmail = (text: string) => {
    const emailRegex =
      /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

    return emailRegex.test(text);
  };

  const validatePassword = (text: string) => {
    return text.length >= 8;
  };

  useEffect(() => {
    if (status === "submitting") {
      const timer = setTimeout(() => setStatus("off"), 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  useEffect(() => {
    setIsEmailValid(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(validatePassword(password));
  }, [password]);
  
  if (isLoading || isSignedIn) {
    return (
      <View
        width={"100%"}
        height={"100%"}
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <View
      width={"100%"}
      height={"100%"}
      justifyContent="center"
      alignItems="center"
    >
      <Form>
        <YStack width={420} gap="$4">
          <XStack gap="$4" alignItems="center" justifyContent="center">
            <Image
              source={require("../assets/images/react-logo.png")}
              width={32}
              height={32}
            />

            <H3 textAlign="center">My News App</H3>
          </XStack>

          <YStack gap="$2">
            <Input
              id="email"
              placeholder="Enter your email"
              backgroundColor={
                email.length === 0 || isEmailValid ? "white" : "$red2"
              }
              value={email}
              onChangeText={setEmail}
              autoFocus={true}
              keyboardType="email-address"
              returnKeyType="next"
            />

            <Text
              color={
                email.length === 0 || isEmailValid ? "transparent" : "$red9"
              }
              fontSize={12}
            >
              {email.length === 0 || isEmailValid ? " " : "Invalid email"}
            </Text>
          </YStack>

          <YStack gap="$2">
            <Input
              id="password"
              placeholder="Enter your password"
              backgroundColor={
                password.length === 0 || isPasswordValid ? "white" : "$red2"
              }
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <Text
              color={
                password.length === 0 || isPasswordValid
                  ? "transparent"
                  : "$red9"
              }
              fontSize={12}
            >
              {password.length === 0 || isPasswordValid
                ? " "
                : "Invalid password, must be at least 8 characters"}
            </Text>
          </YStack>

          <Separator marginTop={4} marginBottom={8} />

          <Form.Trigger asChild disabled={status === "submitting"}>
            <Button width={"100%"} onPress={handleSignIn}>
              {status === "submitting" ? <Spinner /> : "Sign In"}
            </Button>
          </Form.Trigger>
        </YStack>
      </Form>
    </View>
  );
}
