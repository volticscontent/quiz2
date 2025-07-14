import Image from "next/image";

const PartnersFooter = () => {
  return (
    <footer className="bg-black text-white pb-2 pt-4">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h3 className="text-center text-sm uppercase tracking-wider mb-4">Official Partners</h3>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <img alt="Nike" width={80} height={30} className="brightness-200 rounded-full" src="/images/lognike.png" />
            </div>
            <div className="flex items-center justify-center">
              <img alt="Live Nation" width={80} height={30} className="border-radius-10 brightness-200" src="/images/logolivenation.png" />
            </div>
            <div className="flex items-center justify-center">
              <img alt="Sky Sports" width={120} height={40} className="brightness-200" src="/images/sky sports.png" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PartnersFooter; 