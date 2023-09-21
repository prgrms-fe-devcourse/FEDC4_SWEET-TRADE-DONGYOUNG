import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Avatar from '@/components/atoms/Avatar'
import { Card } from '@/components/atoms/Card'
import { Text } from '@/components/atoms/Text'
import { LikeDislikeCount } from '@/components/molcules/LikeDislikeCount'
import PostOptionsDropdown from '@/components/molcules/PostOptionsDropdown'
import APP_PATH from '@/config/paths'
import Post from '@/types/post'
import './index.scss'

export type CardPostItemProps = Pick<
  Post,
  '_id' | 'image' | 'author' | 'title' | 'description'
> & {
  isEqualUser?: boolean
}

export default function CardPostItem({
  _id,
  image,
  author,
  title,
  description,
  isEqualUser,
}: CardPostItemProps) {
  const [isDeleted, setIsDeleted] = useState(false)
  return (
    <>
      {!isDeleted && (
        <Card>
          <div className="content-container">
            <div className="content-container__header">
              <Link href={APP_PATH.userProfile(author._id)}>
                <Avatar text={author.fullName} size={1.25} src={image} />
              </Link>
              {isEqualUser && (
                <PostOptionsDropdown postId={_id} setIsDeleted={setIsDeleted} />
              )}
            </div>
            <Link href={`/post/${_id}`}>
              <Text textStyle="body1-bold">{title}</Text>
            </Link>
            {image ? (
              <div className="content-container__image-container">
                <Image src={image} alt="첨부 이미지" fill />
              </div>
            ) : (
              <Link href={APP_PATH.userProfile(_id)}>
                <Text
                  textStyle="body2"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 8,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {description}
                </Text>
              </Link>
            )}
            <LikeDislikeCount like={230} dislike={170} />
          </div>
        </Card>
      )}
    </>
  )
}
