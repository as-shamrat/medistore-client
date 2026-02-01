import Link from "next/link";

export default function Hero() {
    return (
        <section className="bg-blue-50 py-28">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Your Trusted <span className="text-blue-600">Online Medicine Store</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    Order authentic medicines, health products, and wellness essentials
                    delivered safely right to your doorstep.
                </p>

                <div className="mt-10 flex justify-center flex-wrap gap-5">
                    <Link
                        href="/shop"
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
                    >
                        Shop Now
                    </Link>

                    <Link
                        href="/register"
                        className="px-8 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-300"
                    >
                        Become a Seller
                    </Link>
                </div>
            </div>
        </section>
    );
}
