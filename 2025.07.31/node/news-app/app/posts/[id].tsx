import { useState, useEffect } from "react";
import { YStack, Text, Button, Spinner, H2, Paragraph, XStack } from "tamagui";
import { useLocalSearchParams, router } from "expo-router";

import { useAuth } from "../../hooks/useAuth";
import api from "../../utils/api";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export default function PostDetailScreen(): React.ReactNode {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const { session, isLoading } = useAuth();
  const { user } = session;

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!user) {
      router.replace("/");
    }
  }, [isLoading, user]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      setIsLoadingPost(true);
      try {
        const response = await api(
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

    if (user) {
      fetchPost();
    }
  }, [id, user]);

  const handleEdit = (): void => {
    router.push({
      pathname: "/posts/[id]/edit",
      params: { id },
    });
  };

  const handleGoBack = (): void => {
    router.push("/posts");
  };

  const isAuthor = user && post && user.id === post.author_id;

  if (isLoading || isLoadingPost) {
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
      <YStack gap="$2">
        <Text>{post.author}</Text>

        <YStack>
          <Text fontSize="$2">
            작성일자: {new Date(post.created_at).toLocaleString()}
          </Text>
          <Text fontSize="$2">
            수정일자: {new Date(post.updated_at).toLocaleString()}
          </Text>
        </YStack>
      </YStack>
      <Paragraph height="$20">{post.content}</Paragraph>
      <XStack gap="$4" justifyContent="flex-end">
        <Button onPress={handleGoBack}>목록으로</Button>
        {isAuthor && <Button onPress={handleEdit}>수정</Button>}
      </XStack>
    </YStack>
  );
}
