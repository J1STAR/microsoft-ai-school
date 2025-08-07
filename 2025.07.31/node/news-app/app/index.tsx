import { Link, useRouter } from "expo-router";
import {
  YStack,
  XStack,
  H1,
  Text,
  Button,
  Spinner,
  Paragraph,
  Separator,
} from "tamagui";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const { session, signOut, isLoading } = useAuth();
  const { user } = session;
  const router = useRouter();

  if (isLoading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  return (
    <YStack flex={1} space="$4" padding="$4" backgroundColor="$background">
      {/* Responsive Header / Navigation Bar */}
      <YStack
        paddingBottom="$3"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <XStack justifyContent="space-between" alignItems="center" width="100%">
          <H1
            color="$color"
            size="$8"
            pressStyle={{ opacity: 0.7 }}
            onPress={() => router.replace("/")}
            $sm={{ size: "$7" }} // 좁은 화면에서 제목 크기 줄임
          >
            My News App
          </H1>
          {user ? (
            <Button theme="red" onPress={() => signOut()}>
              Logout
            </Button>
          ) : (
            <Button onPress={() => router.push("/sign-in")}>Login</Button>
          )}
        </XStack>

        <XStack
          space="$4"
          alignItems="center"
          // 좁은 화면에서 상단 마진 추가
          $sm={{ marginTop: "$3" }}
        >
          <Link href="/news" asChild>
            <Text
              fontSize="$6"
              color="$blue10"
              hoverStyle={{ cursor: "pointer" }}
              pressStyle={{ color: "$blue8" }}
            >
              News
            </Text>
          </Link>
          {user && (
            <Link href="/posts" asChild>
              <Text
                fontSize="$6"
                color="$blue10"
                hoverStyle={{ cursor: "pointer" }}
                pressStyle={{ color: "$blue8" }}
              >
                Posts
              </Text>
            </Link>
          )}
        </XStack>
      </YStack>

      {/* Main Content */}
      <YStack space="$4" alignItems="flex-start" paddingTop="$4">
        {user ? (
          <YStack
            backgroundColor="$blue3"
            padding="$4"
            borderRadius="$4"
            width="100%"
            space="$2"
          >
            <H1 color="$color12" size="$7">
              Welcome, {user.name}!
            </H1>
            <Paragraph color="$color11">
              You are successfully logged in.
            </Paragraph>
            <Separator marginVertical="$2" />
            <Text color="$color10" fontSize="$5">
              Email: {user.email}
            </Text>
            <Text color="$color10" fontSize="$5">
              Name: {user.name}
            </Text>
          </YStack>
        ) : (
          <Paragraph color="$color11" fontSize="$6">
            Please log in to see your posts and more features.
          </Paragraph>
        )}
      </YStack>
    </YStack>
  );
};
