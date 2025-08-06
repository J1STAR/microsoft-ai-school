import { useState, useEffect } from "react";
import { YStack, Text, Button, Spinner, H2, Paragraph, XStack } from "tamagui";
import { useLocalSearchParams, router } from "expo-router";

import { useAuth } from "../../hooks/useAuth";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
}

export default function PostDetailScreen(): React.ReactNode {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const { isSignedIn, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }
    if (!isSignedIn) {
      router.replace("/");
    }
  }, [isAuthLoading, isSignedIn]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      setIsLoadingPost(true);
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/posts/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );
        if (response.ok) {
          const data = await response.json();
          setPost(data.data);
        } else {
          console.error("Failed to fetch post");
          alert("Failed to load post.");
          router.back();
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("An unexpected error occurred.");
      } finally {
        setIsLoadingPost(false);
      }
    };

    if (isSignedIn) {
      fetchPost();
    }
  }, [id, isSignedIn]);

  const handleEdit = (): void => {
    router.push({
      pathname: "/posts/[id]/edit",
      params: { id },
    });
  };

  const handleGoBack = (): void => {
    router.push("/posts");
  };

  if (isAuthLoading || isLoadingPost) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  if (!post) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>Post not found.</Text>
      </YStack>
    );
  }

  return (
    <YStack
      gap="$4"
      p="$4"
      flex={1}
      maxWidth={960}
      width="100%"
      alignSelf="center"
    >
      <H2>{post.title}</H2>
      <Text>{post.author}</Text>
      <Paragraph height="$20">{post.content}</Paragraph>
      <XStack gap="$4" justifyContent="flex-end">
        <Button onPress={handleGoBack}>목록으로</Button>
        <Button onPress={handleEdit}>수정</Button>
      </XStack>
    </YStack>
  );
}
