import { useSmartphone } from '~/context/smartphoneContext';
import { Form, useFetcher, useNavigation } from 'react-router';
import { Spinner } from '~/components/spinner';
import type { FormPath, Smartphone } from '~/types/globals.type';
import { FormField } from '~/components/form/formField';
import { FormSection } from '~/components/form/formSection';
import type { ReactNode } from 'react';

type AddDeviceFormType = {
  style?: string
  children: ReactNode
} 

export default function AddDeviceForm({
  style = "h-[90vh] overflow-y-scroll",
  children
}: AddDeviceFormType) {
  const { smartphoneFormData: formData, setSmartphoneFormData: setFormData } = useSmartphone()
  const handleInputChange = (path: FormPath, value: string | number | boolean) => {
    setFormData(prev => {
      const newData = structuredClone(prev);
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

  return (
    <div className={`relative rounded-xl ${style}`}>
      <div className="relative w-full rounded-t-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 mb-8">
        <h1 className="text-3xl font-bold text-white">Phone Specifications Form</h1>
        {/* <p className="text-blue-100 mt-2">Enter detailed phone specifications</p> */}
      </div>  
      
      <div className="bg-white shadow-x w-[60vw]">
        <div className="flex h-full mx-8 justify-center">
          {formData.image?.trim() ? <img src={formData.image || undefined} alt={formData.name} className='h-[15vh]' /> : null}
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* Form Content */}
          <div className="flex-1 p-8">
            <div className="space-y-6">
              <FormSection title="Basic Information" gridStyle="grid-cols-2">
                <FormField
                  label="Phone Name *"
                  value={formData.name || ''}
                  onChange={(val) => handleInputChange('name', val)}
                />
                <FormField
                  label="Brand *"
                  value={formData.brand || ''}
                  onChange={(val) => handleInputChange('brand', val)}
                />
                <FormField
                  label="Views"
                  value={formData.views?.toString() || ''}
                  onChange={(val) => handleInputChange('views', parseInt(val) || 0)}
                  type="number"
                />
                <FormField
                  label="Likes"
                  value={formData.likes?.toString() || ''}
                  onChange={(val) => handleInputChange('likes', parseInt(val) || 0)}
                  type="number"
                />
              </FormSection>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <FormSection title="Launch Information" gridStyle="grid-cols-2">
                <FormField
                  label="Announced Date *"
                  value={formData.launch.announced || ''}
                  onChange={(val) => handleInputChange('launch.announced', val)}
                  placeholder="e.g., March 2024"
                />
                <FormField
                  label="Released Date *"
                  value={formData.launch.released || ''}
                  onChange={(val) => handleInputChange('launch.released', val)}
                  placeholder="e.g., April 2024"
                />
              </FormSection>

              <FormSection title="Body Specifications" gridStyle="grid-cols-2">
                <FormField
                  label="Dimensions *"
                  value={formData.specs.body.dimensions || ''}
                  onChange={(val) => handleInputChange('specs.body.dimensions', val)}
                  placeholder="e.g., 163.3 x 75.9 x 8.2 mm"
                />
                <FormField
                  label="Weight *"
                  value={formData.specs.body.weight || ''}
                  onChange={(val) => handleInputChange('specs.body.weight', val)}
                  placeholder="e.g., 194 g"
                />
                <FormField
                  label="Build *"
                  value={formData.specs.body.build || ''}
                  onChange={(val) => handleInputChange('specs.body.build', val)}
                  placeholder="e.g., Glass front, aluminum frame"
                />
                <FormField
                  label="SIM *"
                  value={formData.specs.body.sim || ''}
                  onChange={(val) => handleInputChange('specs.body.sim', val)}
                  placeholder="e.g., Dual SIM (Nano-SIM)"
                />
                <FormField
                  label="Resistance"
                  value={formData.specs.body.resistance || ''}
                  onChange={(val) => handleInputChange('specs.body.resistance', val)}
                  placeholder="e.g., IP68 dust/water resistant"
                />
              </FormSection>

              <FormSection title="Display Specifications" gridStyle="grid-cols-2">
                <FormField
                  label="Display Type *"
                  value={formData.specs.display.type || ''}
                  onChange={(val) => handleInputChange('specs.display.type', val)}
                  placeholder="e.g., Super Retina XDR OLED"
                />
                <FormField
                  label="Screen Size *"
                  value={formData.specs.display.size || ''}
                  onChange={(val) => handleInputChange('specs.display.size', val)}
                  placeholder="e.g., 6.7 inches"
                />
                <FormField
                  label="Resolution *"
                  value={formData.specs.display.resolution || ''}
                  onChange={(val) => handleInputChange('specs.display.resolution', val)}
                  placeholder="e.g., 1290 x 2796 pixels"
                />
                <FormField
                  label="Protection"
                  value={formData.specs.display.protection || ''}
                  onChange={(val) => handleInputChange('specs.display.protection', val)}
                  placeholder="e.g., Ceramic Shield glass"
                />
              </FormSection>

              <FormSection title="Platform Specifications">
                <FormField
                  label="Operating System *"
                  value={formData.specs.platform.os || ''}
                  onChange={(val) => handleInputChange('specs.platform.os', val)}
                  placeholder="e.g., iOS 17"
                />
                <FormField
                  label="Chipset *"
                  value={formData.specs.platform.chipset || ''}
                  onChange={(val) => handleInputChange('specs.platform.chipset', val)}
                  placeholder="e.g., Apple A17 Pro"
                />
                <FormField
                  label="CPU *"
                  value={formData.specs.platform.cpu || ''}
                  onChange={(val) => handleInputChange('specs.platform.cpu', val)}
                  placeholder="e.g., Hexa-core (2x3.78 GHz + 4x2.11 GHz)"
                />
                <FormField
                  label="GPU *"
                  value={formData.specs.platform.gpu || ''}
                  onChange={(val) => handleInputChange('specs.platform.gpu', val)}
                  placeholder="e.g., Apple GPU (6-core graphics)"
                />
              </FormSection>

              <FormSection title="Memory Specifications" gridStyle="grid-cols-2">
                <FormField
                  label="Internal Storage *"
                  value={formData.specs.memory.internal || ''}
                  onChange={(val) => handleInputChange('specs.memory.internal', val)}
                  placeholder="e.g., 256GB 8GB RAM"
                />
                <FormField
                  label="Card Slot *"
                  value={formData.specs.memory.cardSlot || ''}
                  onChange={(val) => handleInputChange('specs.memory.cardSlot', val)}
                  placeholder="e.g., Has Card Slot"
                />
              </FormSection>

              <FormSection title="Camera Specifications" gridStyle="grid-cols-2">
                <FormSection title="Main Camera">
                  <FormField
                    label="Triple Camera Setup *"
                    value={formData.specs.camera.main.triple || ''}
                    onChange={(val) => handleInputChange('specs.camera.main.triple', val)}
                    placeholder="e.g., 48 MP, f/1.78, 24mm (wide)"
                  />
                  <FormField
                    label="Features *"
                    value={formData.specs.camera.main.features || ''}
                    onChange={(val) => handleInputChange('specs.camera.main.features', val)}
                    placeholder="e.g., Dual-LED dual-tone flash, HDR"
                  />
                  <FormField
                    label="Video Recording *"
                    value={formData.specs.camera.main.video || ''}
                    onChange={(val) => handleInputChange('specs.camera.main.video', val)}
                    placeholder="e.g., 4K@24/25/30/60fps"
                  />
                </FormSection>

                <FormSection title="Selfie Camera">
                  <FormField
                    label="Single Camera *"
                    value={formData.specs.camera.selfie.single || ''}
                    onChange={(val) => handleInputChange('specs.camera.selfie.single', val)}
                    placeholder="e.g., 12 MP, f/1.9, 23mm (wide)"
                  />
                  <FormField
                    label="Features *"
                    value={formData.specs.camera.selfie.features || ''}
                    onChange={(val) => handleInputChange('specs.camera.selfie.features', val)}
                    placeholder="e.g., HDR, Dolby Vision HDR"
                  />
                  <FormField
                    label="Video Recording *"
                    value={formData.specs.camera.selfie.video || ''}
                    onChange={(val) => handleInputChange('specs.camera.selfie.video', val)}
                    placeholder="e.g., 4K@24/25/30/60fps"
                  />
                </FormSection>
              </FormSection>

              <FormSection title="Sound Specifications" gridStyle="grid-cols-2">
                <FormField
                  label="3.5mm Jack *"
                  value={formData.specs.sound.loudspeaker || ''}
                  onChange={(val) => handleInputChange('specs.sound.loudspeaker', val)}
                  placeholder="e.g., stereo speakers"
                />
                <FormField
                  label="Loudspeaker *"
                  value={formData.specs.sound.jack || ''}
                  onChange={(val) => handleInputChange('specs.sound.jack', val)}
                  placeholder="e.g., No"
                />
              </FormSection>

              <FormSection title="Connection Specifications" gridStyle="grid-cols-2">
                <FormField
                  label="Wlan *"
                  value={formData.specs.connection.wlan || ''}
                  onChange={(val) => handleInputChange('specs.connection.wlan', val)}
                  placeholder="e.g., Wi-Fi 802.11,  dual-band, Wi-Fi Direct"
                />
                <FormField
                  label="Bluetooth *"
                  value={formData.specs.connection.bluetooth || ''}
                  onChange={(val) => handleInputChange('specs.connection.bluetooth', val)}
                  placeholder="e.g., 5.3, A2DP, LE"
                />
                <FormField
                  label="NFC *"
                  value={formData.specs.connection.nfc || ''}
                  onChange={(val) => handleInputChange('specs.connection.nfc', val)}
                  placeholder="e.g., Yes, No, Unspecified"
                />
                <FormField
                  label="Infrared Port *"
                  value={formData.specs.connection.infraredPort || ''}
                  onChange={(val) => handleInputChange('specs.connection.infraredPort', val)}
                  placeholder="e.g., Yes, No, Unspecified"
                />
                <FormField
                  label="Radio *"
                  value={formData.specs.connection.radio || ''}
                  onChange={(val) => handleInputChange('specs.connection.radio', val)}
                  placeholder="e.g., Yes, No, Unspecified"
                />
                <FormField
                  label="USB *"
                  value={formData.specs.connection.USB || ''}
                  onChange={(val) => handleInputChange('specs.connection.USB', val)}
                  placeholder="e.g., USB Type-C 2.0, OTG"
                />
              </FormSection>

              <FormSection title="Features">
                <FormField
                  label="Sensors *"
                  value={formData.specs.features.sensors || ''}
                  onChange={(val) => handleInputChange('specs.features.sensors', val)}
                  placeholder="e.g., Fingerprint, accelerometer, gyro"
                />
              </FormSection>

              <FormSection title="Battery" gridStyle="grid-cols-2">
                <FormField
                  label="Type *"
                  value={formData.specs.battery.type || ''}
                  onChange={(val) => handleInputChange('specs.battery.type', val)}
                  placeholder="e.g., 5000 mAh, 3000 mAh, 2500 mAh"
                />
                <FormField
                  label="Charging *"
                  value={formData.specs.battery.charging || ''}
                  onChange={(val) => handleInputChange('specs.battery.charging', val)}
                  placeholder="e.g., 45W, 60W, 150W - Wired/Wireless"
                />
              </FormSection>

              <FormSection title="Misc">
                <FormField
                  label="Colors *"
                  value={formData.specs.misc.colors || ''}
                  onChange={(val) => handleInputChange('specs.misc.colors', val)}
                  placeholder="e.g., Red, Midnight Black etc."
                />
                <FormField
                  label="Models *"
                  value={formData.specs.misc.models || ''}
                  onChange={(val) => handleInputChange('specs.misc.models', val)}
                  placeholder="e.g., 2503FRA65G, SM-652F6 etc."
                />
              </FormSection>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}