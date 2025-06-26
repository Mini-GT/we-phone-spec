import { useSmartphone } from '~/context/smartphoneContext';
import { Form, useFetcher } from 'react-router';

type FormPath = 
  | 'name'
  | 'brand' 
  | 'views'
  | 'likes'
  | 'description'
  | 'launch.announced'
  | 'launch.released'
  | 'specs.body.dimensions'
  | 'specs.body.weight'
  | 'specs.body.build'
  | 'specs.body.sim'
  | 'specs.body.resistance'
  | 'specs.display.type'
  | 'specs.display.size'
  | 'specs.display.resolution'
  | 'specs.display.protection'
  | 'specs.platform.os'
  | 'specs.platform.chipset'
  | 'specs.platform.cpu'
  | 'specs.platform.gpu'
  | 'specs.memory.cardSlot'
  | 'specs.memory.internal'
  | 'specs.camera.main.triple'
  | 'specs.camera.main.features'
  | 'specs.camera.main.video'
  | 'specs.camera.selfie.single'
  | 'specs.camera.selfie.features'
  | 'specs.camera.selfie.video'
  | 'specs.sound.loudspeaker'
  | 'specs.sound.jack'
  | 'specs.connection.wlan'
  | 'specs.connection.bluetooth'
  | 'specs.connection.nfc'
  | 'specs.connection.infraredPort'
  | 'specs.connection.radio'
  | 'specs.connection.USB'
  | 'specs.features.sensors'
  | 'specs.battery.type'
  | 'specs.battery.charging'
  | 'specs.misc.colors'
  | 'specs.misc.models';

export default function AddDeviceForm() {
  const fetcher = useFetcher()
  const { smartphoneFormData: formData, setSmartphoneFormData: setFormData } = useSmartphone()
  const handleInputChange = (path: FormPath, value: string | number | boolean) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };
  
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();


  //   // console.log('Form Data:', formData);
  //   // alert('Form submitted! Check console for data.');
  // };

  return (
    <div className="relative rounded-xl h-[90vh] overflow-y-scroll">
      <div className="relative rounded-t-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 mb-8">
        <h1 className="text-3xl font-bold text-white">Phone Specifications Form</h1>
        <p className="text-blue-100 mt-2">Enter detailed phone specifications</p>
      </div>  
      
      
      <div className="bg-white shadow-x w-[60vw]">
        <div className="flex h-full mx-8 justify-center">
          {formData.image?.trim() ? <img src={formData.image} alt={formData.name} className='h-[15vh]' /> : null}
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* Navigation Sidebar */}
          {/* <div className="lg:w-64 bg-gray-50 border-r border-gray-200">
            <nav className="p-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div> */}

          {/* Form Content */}
          <div className="flex-1 p-8">
            <form className="space-y-6">
              
              {/* Basic Info Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Name *</label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                    <input
                      type="text"
                      value={formData.brand || ""}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Views</label>
                    <input
                      type="number"
                      value={formData.views || ""}
                      onChange={(e) => handleInputChange('views', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Likes</label>
                    <input
                      type="number"
                      value={formData.likes || ""}
                      onChange={(e) => handleInputChange('likes', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    
                  />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Launch Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Announced Date *</label>
                      <input
                        type="text"
                        value={formData.launch.announced || ""}
                        onChange={(e) => handleInputChange('launch.announced', e.target.value)}
                        placeholder="e.g., March 2024"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Released Date *</label>
                      <input
                        type="text"
                        value={formData.launch.released || ""}
                        onChange={(e) => handleInputChange('launch.released', e.target.value)}
                        placeholder="e.g., April 2024"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Body Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions *</label>
                      <input
                        type="text"
                        value={formData.specs.body.dimensions || ""}
                        onChange={(e) => handleInputChange('specs.body.dimensions', e.target.value)}
                        placeholder="e.g., 163.3 x 75.9 x 8.2 mm"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight *</label>
                      <input
                        type="text"
                        value={formData.specs.body.weight || ""}
                        onChange={(e) => handleInputChange('specs.body.weight', e.target.value)}
                        placeholder="e.g., 194 g"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Build *</label>
                      <input
                        type="text"
                        value={formData.specs.body.build || ""}
                        onChange={(e) => handleInputChange('specs.body.build', e.target.value)}
                        placeholder="e.g., Glass front, aluminum frame"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SIM *</label>
                      <input
                        type="text"
                        value={formData.specs.body.sim || ""}
                        onChange={(e) => handleInputChange('specs.body.sim', e.target.value)}
                        placeholder="e.g., Dual SIM (Nano-SIM)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resistance</label>
                      <input
                        type="text"
                        value={formData.specs.body.resistance || ""}
                        onChange={(e) => handleInputChange('specs.body.resistance', e.target.value)}
                        placeholder="e.g., IP68 dust/water resistant"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Display Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Display Type *</label>
                      <input
                        type="text"
                        value={formData.specs.display.type || ""}
                        onChange={(e) => handleInputChange('specs.display.type', e.target.value)}
                        placeholder="e.g., Super Retina XDR OLED"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Screen Size *</label>
                      <input
                        type="text"
                        value={formData.specs.display.size || ""}
                        onChange={(e) => handleInputChange('specs.display.size', e.target.value)}
                        placeholder="e.g., 6.7 inches"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resolution *</label>
                      <input
                        type="text"
                        value={formData.specs.display.resolution || ""}
                        onChange={(e) => handleInputChange('specs.display.resolution', e.target.value)}
                        placeholder="e.g., 1290 x 2796 pixels"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Protection</label>
                      <input
                        type="text"
                        value={formData.specs.display.protection || ""}
                        onChange={(e) => handleInputChange('specs.display.protection', e.target.value)}
                        placeholder="e.g., Ceramic Shield glass"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Platform Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Operating System *</label>
                      <input
                        type="text"
                        value={formData.specs.platform.os || ""}
                        onChange={(e) => handleInputChange('specs.platform.os', e.target.value)}
                        placeholder="e.g., iOS 17"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chipset *</label>
                      <input
                        type="text"
                        value={formData.specs.platform.chipset || ""}
                        onChange={(e) => handleInputChange('specs.platform.chipset', e.target.value)}
                        placeholder="e.g., Apple A17 Pro"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CPU *</label>
                      <input
                        type="text"
                        value={formData.specs.platform.cpu || ""}
                        onChange={(e) => handleInputChange('specs.platform.cpu', e.target.value)}
                        placeholder="e.g., Hexa-core (2x3.78 GHz + 4x2.11 GHz)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GPU *</label>
                      <input
                        type="text"
                        value={formData.specs.platform.gpu || ""}
                        onChange={(e) => handleInputChange('specs.platform.gpu', e.target.value)}
                        placeholder="e.g., Apple GPU (6-core graphics)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Memory Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Internal Storage *</label>
                      <input
                        type="text"
                        value={formData.specs.memory.internal || ""}
                        onChange={(e) => handleInputChange('specs.memory.internal', e.target.value)}
                        placeholder="e.g., 256GB 8GB RAM"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Slot *</label>
                      <input
                        type="text"
                        value={formData.specs.memory.cardSlot || ""}
                        onChange={(e) => handleInputChange('specs.memory.cardSlot', e.target.value)}
                        placeholder="e.g., Has Card Slot"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Camera Specifications</h2>
                  
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Camera</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Triple Camera Setup *</label>
                      <input
                        type="text"
                        value={formData.specs.camera.main.triple || ""}
                        onChange={(e) => handleInputChange('specs.camera.main.triple', e.target.value)}
                        placeholder="e.g., 48 MP, f/1.78, 24mm (wide)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features *</label>
                      <input
                        type="text"
                        value={formData.specs.camera.main.features || ""}
                        onChange={(e) => handleInputChange('specs.camera.main.features', e.target.value)}
                        placeholder="e.g., Dual-LED dual-tone flash, HDR"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Recording *</label>
                      <input
                        type="text"
                        value={formData.specs.camera.main.video || ""}
                        onChange={(e) => handleInputChange('specs.camera.main.video', e.target.value)}
                        placeholder="e.g., 4K@24/25/30/60fps"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Selfie Camera</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Single Camera *</label>
                      <input
                        type="text"
                        value={formData.specs.camera.selfie.single || ""}
                        onChange={(e) => handleInputChange('specs.camera.selfie.single', e.target.value)}
                        placeholder="e.g., 12 MP, f/1.9, 23mm (wide)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features *</label>
                      <input
                        type="text"
                        value={formData.specs.camera.selfie.features || ""}
                        onChange={(e) => handleInputChange('specs.camera.selfie.features', e.target.value)}
                        placeholder="e.g., HDR, Dolby Vision HDR"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Recording *</label>
                      <input
                        type="text"
                        value={formData.specs.camera.selfie.video || ""}
                        onChange={(e) => handleInputChange('specs.camera.selfie.video', e.target.value)}
                        placeholder="e.g., 4K@24/25/30/60fps"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Sound Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loudspeaker *</label>
                      <input
                        type="text"
                        value={formData.specs.sound.loudspeaker || ""}
                        onChange={(e) => handleInputChange('specs.sound.loudspeaker', e.target.value)}
                        placeholder="e.g., stereo speakers"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loudspeaker *</label>
                      <input
                        type="text"
                        value={formData.specs.sound.jack || ""}
                        onChange={(e) => handleInputChange('specs.sound.loudspeaker', e.target.value)}
                        placeholder="e.g., stereo speakers"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Connection Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Wlan *</label>
                      <input
                        type="text"
                        value={formData.specs.connection.wlan || ""}
                        onChange={(e) => handleInputChange('specs.connection.wlan', e.target.value)}
                        placeholder="e.g., Wi-Fi 802.11,  dual-band, Wi-Fi Direct"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bluetooth *</label>
                      <input
                        type="text"
                        value={formData.specs.connection.bluetooth || ""}
                        onChange={(e) => handleInputChange('specs.connection.bluetooth', e.target.value)}
                        placeholder="e.g., 5.3, A2DP, LE"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">NFC *</label>
                      <input
                        type="text"
                        value={formData.specs.connection.nfc || ""}
                        onChange={(e) => handleInputChange('specs.connection.nfc', e.target.value)}
                        placeholder="e.g., Yes, No, Unspecified"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Infrared Port *</label>
                      <input
                        type="text"
                        value={formData.specs.connection.infraredPort || ""}
                        onChange={(e) => handleInputChange('specs.connection.infraredPort', e.target.value)}
                        placeholder="e.g., Yes, No, Unspecified"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Radio *</label>
                      <input
                        type="text"
                        value={formData.specs.connection.radio || ""}
                        onChange={(e) => handleInputChange('specs.connection.radio', e.target.value)}
                        placeholder="e.g., Yes, No, Unspecified"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">USB *</label>
                      <input
                        type="text"
                        value={formData.specs.connection.USB || ""}
                        onChange={(e) => handleInputChange('specs.connection.USB', e.target.value)}
                        placeholder="e.g., USB Type-C 2.0, OTG"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Features </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sensors *</label>
                      <input
                        type="text"
                        value={formData.specs.features.sensors || ""}
                        onChange={(e) => handleInputChange('specs.features.sensors', e.target.value)}
                        placeholder="e.g., Fingerprint, accelerometer, gyro"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Battery </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                      <input
                        type="text"
                        value={formData.specs.battery.type || ""}
                        onChange={(e) => handleInputChange('specs.battery.type', e.target.value)}
                        placeholder="e.g., 5000 mAh, 3000 mAh, 2500 mAh"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Charging *</label>
                      <input
                        type="text"
                        value={formData.specs.battery.charging || ""}
                        onChange={(e) => handleInputChange('specs.battery.charging', e.target.value)}
                        placeholder="e.g., 45W, 60W, 150W - Wired/Wireless"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Misc </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Colors *</label>
                      <input
                        type="text"
                        value={formData.specs.misc.colors || ""}
                        onChange={(e) => handleInputChange('specs.misc.colors', e.target.value)}
                        placeholder="e.g., Red, Midnight Black etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Models *</label>
                      <input
                        type="text"
                        value={formData.specs.misc.models || ""}
                        onChange={(e) => handleInputChange('specs.misc.models', e.target.value)}
                        placeholder="e.g., 2502FRA65G, SM-652F6 etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <Form method="post" action="/devices">
            <button name="deviceObj" value={JSON.stringify(formData)}>Click</button>
          </Form>
        </div>
      </div>
    </div>
  )
}