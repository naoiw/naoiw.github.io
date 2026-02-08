import Link from 'next/link'

const navItems = [
  { path: '/', name: 'home' },
  { path: '/blog', name: 'blog' },
  { path: '/tag', name: 'tag' },
  { path: '/product', name: 'product' },
]

export function Navbar() {
  return (
    <header className="mb-10 pb-4 border-b border-neutral-200 dark:border-neutral-800">
      <nav
        className="flex flex-row items-center gap-6 tracking-tight"
        aria-label="メインナビゲーション"
      >
        {navItems.map(({ path, name }) => (
          <Link
            key={path}
            href={path}
            className="transition-colors hover:text-neutral-800 dark:hover:text-neutral-200 py-2 px-1 font-medium"
          >
            {name}
          </Link>
        ))}
      </nav>
    </header>
  )
}
