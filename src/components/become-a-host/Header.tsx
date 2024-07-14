// components/Header.tsx
import SvgComponent from '../host/become-a-host/SvgComponent';

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b z-10">
      <div className="container mx-auto px-4 py-3">
        <SvgComponent />
      </div>
    </header>
  );
};

export default Header;