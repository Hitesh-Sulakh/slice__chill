import { Menu } from './Menu';

export const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-primary to-orange-100">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Slice Chill</h1>
        <p className="text-2xl mb-8">Order your favorite Pizza, Drinks, and Bread</p>
        <p className="text-xl mb-12 opacity-90">
          Fast delivery. Fresh ingredients. Great taste.
        </p>
        <a
          href="/menu"
          className="inline-block bg-dark text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition"
        >
          Start Ordering Now
        </a>
      </div>

      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Popular Items
          </h2>
          <Menu />
        </div>
      </div>
    </div>
  );
};
