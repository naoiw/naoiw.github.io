import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="site-main">
      <h1>ページが見つかりません</h1>
      <p><Link href="/">トップページへ戻る</Link></p>
    </main>
  )
}
