import Link from 'next/link'

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-gray-800">
                        ModernWeb
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#services" className="text-gray-600 hover:text-gray-800">Services</Link>
                        <Link href="#about" className="text-gray-600 hover:text-gray-800">About</Link>
                        <Link href="#contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header