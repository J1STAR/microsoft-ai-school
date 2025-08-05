import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  View,
  YStack,
  Button,
  Separator,
  H3,
  Form,
  Input,
  Text,
  Spinner,
  Label,
  XStack,
} from "tamagui";
import { useAuth } from "../hooks/useAuth";

const AnimatedYStack = (props: any) => (
  <YStack
    animation="medium"
    enterStyle={{ opacity: 0, y: -10 }}
    gap="$2"
    {...props}
  />
);

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off",
  );
  const { signUp, isSignedIn, isLoading } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  const handleSignUp = async () => {
    if (
      !isNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    setStatus("submitting");
    await signUp(name, email, password);
    setStatus("submitted");
  };

  // Validation functions
  const validateName = (text: string) => text.length > 1; // 이름은 2자 이상으로 가정
  const validateEmail = (text: string) => {
    const emailRegex =
      /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

    return emailRegex.test(text);
  };
  const validatePassword = (text: string) => text.length >= 8;
  const validateConfirmPassword = (text: string) => text === password;

  useEffect(() => setIsNameValid(validateName(name)), [name]);
  useEffect(() => setIsEmailValid(validateEmail(email)), [email]);
  useEffect(() => setIsPasswordValid(validatePassword(password)), [password]);
  useEffect(
    () => setIsConfirmPasswordValid(validateConfirmPassword(confirmPassword)),
    [confirmPassword, password],
  );

  const allFieldsValid =
    isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

  if (isLoading || isSignedIn) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <View flex={1} alignItems="center">
      <Form>
        <YStack width={420} gap="$4" padding="$4">
          <H3 textAlign="center">Create an Account</H3>

          <YStack>
            <Input
              id="name"
              placeholder="Name"
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </YStack>

          {isNameValid && (
            <AnimatedYStack>
              <Input
                id="email"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {email.length > 0 && !isEmailValid && (
                <Text color="$red10" fontSize={12}>
                  Please enter a valid email.
                </Text>
              )}
            </AnimatedYStack>
          )}

          {isNameValid && isEmailValid && (
            <AnimatedYStack>
              <Input
                placeholder="Password (min. 8 characters)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {password.length > 0 && !isPasswordValid && (
                <Text color="$red10" fontSize={12}>
                  Password must be at least 8 characters.
                </Text>
              )}
            </AnimatedYStack>
          )}

          {isNameValid && isEmailValid && isPasswordValid && (
            <AnimatedYStack>
              <Input
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              {confirmPassword.length > 0 && !isConfirmPasswordValid && (
                <Text color="$red10" fontSize={12}>
                  Passwords do not match.
                </Text>
              )}
            </AnimatedYStack>
          )}

          {allFieldsValid && (
            <AnimatedYStack>
              <Separator marginVertical="$2" />
              <Form.Trigger asChild>
                <Button
                  onPress={handleSignUp}
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? <Spinner /> : "Sign Up"}
                </Button>
              </Form.Trigger>
            </AnimatedYStack>
          )}

          <Button variant="outlined" onPress={() => router.push("/sign-in")}>
            Already have an account? Sign In
          </Button>
        </YStack>
      </Form>
    </View>
  );
}
