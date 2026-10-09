import { servicesData } from "@/data/servicesData";


export default function ServicesGrid() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Serv<span className="bg-blue-600 text-white px-1">ices</span>
          </h2>
          <p className="text-gray-500 text-sm">v
            We Are The First Fully Accredited NABH Hospital in Entire Region
          </p>
        </div>

        {/* CSS Grid for the Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => {
            const Icon = service.icon;
            
            return (
              <div
                key={service.id}
                // The 'group' class allows child elements to react when this parent card is hovered
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:bg-blue-600 transition-all duration-300 ease-in-out flex flex-col items-center text-center cursor-pointer border border-gray-100"
              >
                {/* Icon Wrapper */}
                <div className="mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-green-50 group-hover:bg-white/20 transition-colors duration-300">
                  <Icon 
                    className="w-10 h-10 text-green-600 group-hover:text-white transition-colors duration-300" 
                    strokeWidth={1.5} 
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 group-hover:text-blue-50 text-sm leading-relaxed transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}