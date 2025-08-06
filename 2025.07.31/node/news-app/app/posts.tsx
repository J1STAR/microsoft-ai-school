import { useState, useEffect } from "react";
import { Text, YStack, ScrollView, Button } from "tamagui";
import { router } from "expo-router";

import { useAuth } from "../hooks/useAuth";

interface Post {
  id: string;
  title: string;
  content: string;
  author_id: number;
}

export default function PostsScreen(): React.ReactNode {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isSignedIn, isLoading } = useAuth();

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/posts`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data.data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isSignedIn) {
      router.replace("/");
    } else {
      fetchPosts();
    }
  }, [isLoading, isSignedIn]);

  return (
    <ScrollView>
      <YStack gap="$4" p="$4" maxWidth={960} width="100%" alignSelf="center">
        <Button onPress={() => router.push("/posts/write")}>Write Post</Button>
        {posts.map((post) => (
          <YStack
            key={post.id}
            gap="$2"
            p="$4"
            borderWidth={1}
            borderColor="$borderColor"
            borderRadius="$4"
            backgroundColor="$background"
            hoverStyle={{ backgroundColor: "$backgroundHover" }}
            pressStyle={{ backgroundColor: "$backgroundPress" }}
            onPress={() =>
              router.push({
                pathname: "/posts/[id]",
                params: { id: post.id },
              })
            }
          >
            <Text fontSize="$6" fontWeight="bold">
              {post.title}
            </Text>
            <Text numberOfLines={2} ellipse>
              {post.content}
            </Text>
          </YStack>
        ))}
      </YStack>
    </ScrollView>
  );
}
