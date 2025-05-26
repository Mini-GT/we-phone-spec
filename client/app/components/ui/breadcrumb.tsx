export default function Breadcrumbs() {
  return (
    <nav className="my-8 text-lg text-gray-400">
      <ol className="flex items-center space-x-2">
        <li>
          <a href="#" className="text-gray-600 hover:text-pink-200">
            Home
          </a>
        </li>
        <li>•</li>
        <li className="text-gray-500">Filter</li>
      </ol>
    </nav>
  );
};