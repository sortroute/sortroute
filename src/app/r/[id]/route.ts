import { NextResponse } from 'next/server'

const map: Record<string, string> = {
  beehiiv: 'https://example.com',
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const url = map[params.id]
  const target = url || '/'
  return NextResponse.redirect(target, { status: 302 })
}
