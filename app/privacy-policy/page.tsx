 import { PageHeader } from "@/components/layout/page-header";
 import { Container } from "@/components/ui/container";
 import { Section } from "@/components/ui/section";
 
 export default function PrivacyPolicyPage() {
   return (
     <>
       <PageHeader
         title="Kebijakan Privasi"
         description="Kebijakan privasi dan perlindungan data MAJAP Polindra"
         breadcrumbs={[{ label: "Kebijakan Privasi" }]}
       />
 
       <Section className="bg-white">
         <Container>
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-gray-500 mb-8 text-center">
              Terakhir diperbarui: 22 Desember 2025
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Informasi yang Kami Kumpulkan</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  MAJAP Polindra mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                  <li>Nama lengkap</li>
                  <li>Alamat email</li>
                  <li>Pesan atau pertanyaan melalui formulir kontak</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Penggunaan Informasi</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Informasi yang kami kumpulkan digunakan untuk:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                  <li>Merespons pertanyaan dan permintaan Anda</li>
                  <li>Mengirimkan informasi terkait kegiatan MAJAP Polindra</li>
                  <li>Meningkatkan layanan dan pengalaman pengguna</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Perlindungan Data</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Kami berkomitmen untuk melindungi informasi pribadi Anda dengan menerapkan langkah-langkah keamanan yang wajar untuk mencegah akses tidak sah, pengungkapan, atau modifikasi data Anda.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Berbagi Informasi</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali jika diwajibkan oleh hukum.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Cookie</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Website kami mungkin menggunakan cookie untuk meningkatkan pengalaman browsing Anda. Anda dapat menonaktifkan cookie melalui pengaturan browser.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Hak Anda</h2>
                <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                  <li>Mengakses informasi pribadi yang kami simpan</li>
                  <li>Meminta koreksi data yang tidak akurat</li>
                  <li>Meminta penghapusan data pribadi Anda</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Perubahan Kebijakan</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diposting di halaman ini.
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Hubungi Kami</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Jika Anda memiliki pertanyaan tentang kebijakan privasi ini:
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="mailto:majapagram.com/majap_polindra" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@majap_polindra</a>
                </div>
              </div>
            </div>
           </div>
         </Container>
       </Section>
     </>
   );
 }
