import Image from "next/image";

const PartnersFooter = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h3 className="text-center text-sm uppercase tracking-wider mb-4">Parceiros Oficiais</h3>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {/* Prime */}
            <div className="flex items-center justify-center">
              <Image
                src="https://www.pngplay.com/wp-content/uploads/3/Amazon-Prime-Logo-PNG-HD-Quality.png"
                alt="Prime Video"
                width={80}
                height={30}
                className="brightness-200"
              />
            </div>

              {/* ESPN */}
              <div className="flex items-center justify-center">
              <Image
                src="https://logodownload.org/wp-content/uploads/2015/05/espn-logo-4.png"
                alt="ESPN"
                width={80}
                height={30}
                className="brightness-200"
              />
            </div>

            
            {/* Adidas */}
            <div className="flex items-center justify-center">
              <svg role="presentation" viewBox="100 100 50 32" xmlns="http://www.w3.org/2000/svg" className="w-12 h-8 brightness-200">
                <path fillRule="evenodd" clipRule="evenodd" d="M 150.07 131.439 L 131.925 100 L 122.206 105.606 L 137.112 131.439 L 150.07 131.439 Z M 132.781 131.439 L 120.797 110.692 L 111.078 116.298 L 119.823 131.439 L 132.781 131.439 Z M 109.718 121.401 L 115.509 131.439 L 102.551 131.439 L 100 127.007 L 109.718 121.401 Z" fill="white"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PartnersFooter; 