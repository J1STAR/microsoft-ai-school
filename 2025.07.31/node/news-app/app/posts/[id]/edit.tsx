import { useState, useEffect } from "react";
import { YStack, Input, Button, Spinner, TextArea, H2, XStack } from "tamagui";
import { useLocalSearchParams, router } from "expo-router";

import { useAuth } from "../../../hooks/useAuth";
import api from "../../../utils/api";

interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
}

export default function EditPostScreen(): React.ReactNode {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
          setTitle(data.data.title);
          setContent(data.data.content);

          if (user && data.data.author_id !== user.id) {
            alert("수정할 권한이 없습니다.");
            router.replace("/posts");
          }
        } else {
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

  const handleUpdatePost = async () => {
    if (!user) {
      alert("Could not verify session. Please log in again.");
      return;
    }

    if (user && post && user.id !== post.author_id) {
      alert("수정할 권한이 없습니다.");
      router.replace("/posts");
      return;
    }

    try {
      const response = await api(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/posts/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title, content }),
        },
      );

      if (response.ok) {
        router.push({
          pathname: "/posts/[id]",
          params: { id },
        });
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("An unexpected error occurred.");
    }
  };

  const handleCancel = (): void => {
    router.back();
  };

  if (isLoading || isLoadingPost) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
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
      <H2>Edit Post</H2>
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        size="$4"
        backgroundColor="white"
      />
      <TextArea
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        size="$4"
        numberOfLines={10}
        height="$20"
        backgroundColor="white"
      />
      <XStack gap="$4" justifyContent="flex-end">
        <Button onPress={handleCancel}>취소</Button>
        <Button onPress={handleUpdatePost}>수정 완료</Button>
      </XStack>
    </YStack>
  );
}
