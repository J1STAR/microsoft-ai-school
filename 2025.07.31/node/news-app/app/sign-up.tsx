import { useEffect, useState, useCallback } from "react";
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
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const [status, setStatus] = useState<"off" | "submitting" | "submitted">(
    "off",
  );
  const { signUp, session, isLoading } = useAuth();
  const { user } = session;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (user) {
      router.replace("/");
    }
  }, [isLoading, user]);

  const handleSignUp = async () => {
    if (
      !isNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !isAddressValid ||
      !isPhoneNumberValid
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    setStatus("submitting");
    await signUp(name, email, password, address, phoneNumber);
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
  const validateConfirmPassword = useCallback(
    (text: string) => text === password,
    [password],
  );
  const validateAddress = (text: string) =>
    text.length > 0 && text.length <= 255;
  const validatePhoneNumber = (text: string) =>
    text.length > 0 && text.length <= 20;

  useEffect(() => setIsNameValid(validateName(name)), [name]);
  useEffect(() => setIsEmailValid(validateEmail(email)), [email]);
  useEffect(() => setIsPasswordValid(validatePassword(password)), [password]);
  useEffect(
    () => setIsConfirmPasswordValid(validateConfirmPassword(confirmPassword)),
    [confirmPassword, validateConfirmPassword],
  );
  useEffect(() => setIsAddressValid(validateAddress(address)), [address]);
  useEffect(
    () => setIsPhoneNumberValid(validatePhoneNumber(phoneNumber)),
    [phoneNumber],
  );

  const allFieldsValid =
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isAddressValid &&
    isPhoneNumberValid;

  if (isLoading || user) {
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

          {isNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid && (
              <AnimatedYStack>
                <Input
                  placeholder="Address"
                  value={address}
                  onChangeText={setAddress}
                />
                {address.length > 0 && !isAddressValid && (
                  <Text color="$red10" fontSize={12}>
                    Address must be less than 255 characters.
                  </Text>
                )}
              </AnimatedYStack>
            )}

          {isNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            isAddressValid && (
              <AnimatedYStack>
                <Input
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
                {phoneNumber.length > 0 && !isPhoneNumberValid && (
                  <Text color="$red10" fontSize={12}>
                    Phone number must be less than 20 characters.
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
