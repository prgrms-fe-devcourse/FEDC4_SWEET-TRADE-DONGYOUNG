import { NextRequest, NextResponse } from 'next/server'
import { apiServer } from '@/lib/axiosSever'

export async function GET(req: NextRequest) {
  const authorId = req.nextUrl.searchParams.get('authorId') ?? 'undefined'
  const limit = Number(req.nextUrl.searchParams.get('limit'))
  const offset = Number(req.nextUrl.searchParams.get('offset'))

  try {
    const { data } = await apiServer.get(
      `/posts/author/${authorId}?offset=${offset}&limit=${limit}`,
    )
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.message },
      { status: error.response.status },
    )
  }
}