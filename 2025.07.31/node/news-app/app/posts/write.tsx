import { useState, useEffect } from "react";
import { YStack, Input, Button, Text } from "tamagui";
import { router } from "expo-router";

import { useAuth } from "../../hooks/useAuth";

export default function CreatePostScreen(): React.ReactNode {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { isSignedIn, isLoading, csrfToken } = useAuth();

  const handleCreatePost = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/posts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({ title, content }),
        },
      );

      if (response.ok) {
        router.push("/posts");
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (isLoading) { return; }

    if (!isSignedIn) {
      router.replace("/");
    }
  }, [isLoading, isSignedIn]);

  return (
    <YStack gap="$4" p="$4" flex={1}>
      <Text fontSize="$8" fontWeight="bold">
        Create Post
      </Text>
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        size="$4"
        backgroundColor="white"
      />
      <Input
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        size="$4"
        multiline
        numberOfLines={4}
        backgroundColor="white"
      />
      <Button onPress={handleCreatePost} size="$4">
        작성 완료
      </Button>
    </YStack>
  );
}
