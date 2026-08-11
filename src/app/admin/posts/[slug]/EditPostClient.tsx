'use client'

import PostForm from '@/components/admin/PostForm'
import type { Post } from '@/types/content'

interface Props {
  initialData: Post
}

export default function EditPostClient({ initialData }: Props) {
  return <PostForm initialData={initialData} />
}
