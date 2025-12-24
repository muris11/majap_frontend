 import { PageHeader } from "@/components/layout/page-header";
 import { Container } from "@/components/ui/container";
 import { Section } from "@/components/ui/section";
 
 export default function TermsOfServicePage() {
   return (
     <>
       <PageHeader
         title="Syarat dan Ketentuan"
         description="Syarat dan ketentuan penggunaan website MAJAP Polindra"
         breadcrumbs={[{ label: "Syarat dan Ketentuan" }]}
       />
 
       <Section className="bg-white">
         <Container>
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-gray-500 mb-8 text-center">
              Terakhir diperbarui: 22 Desember 2025
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Penerimaan Syarat</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dengan mengakses dan menggunakan website MAJAP Polindra, Anda menyetujui untuk terikat dengan syarat dan ketentuan ini. Jika Anda tidak setuju, Anda tidak diperbolehkan mengakses website ini.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Penggunaan Website</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Website ini ditujukan untuk memberikan informasi tentang kegiatan dan organisasi Mahasiswa Jabodetabek Politeknik Negeri Indramayu (MAJAP). Anda setuju untuk menggunakan website ini hanya untuk tujuan yang sah.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Konten</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Semua konten yang ditampilkan di website ini adalah milik MAJAP Polindra atau pemilik konten yang bersangkutan. Konten tidak boleh digunakan, disalin, atau didistribusikan tanpa izin tertulis.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Pengiriman Konten Pengguna</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Jika Anda mengirimkan pesan atau konten melalui formulir kontak, Anda bertanggung jawab atas keakuratan dan kepatutan konten tersebut. Kami berhak menghapus konten yang dianggap tidak pantas.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Tautan Eksternal</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Website ini mungkin berisi tautan ke website pihak ketiga. Kami tidak bertanggung jawab atas konten atau praktik privasi website tersebut.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Batasan Tanggung Jawab</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  MAJAP Polindra tidak bertanggung jawab atas kerugian yang timbul dari penggunaan atau ketidakmampuan menggunakan website ini.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Ketersediaan Website</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Kami berusaha menjaga website tetap tersedia, namun tidak menjamin bahwa website akan selalu dapat diakses atau bebas dari gangguan teknis.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Perubahan Ketentuan</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Kami berhak mengubah syarat dan ketentuan ini kapan saja. Penggunaan berkelanjutan atas website setelah perubahan berarti Anda menerima ketentuan yang diperbarui.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Hukum yang Berlaku</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Hubungi Kami</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini:
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="mailto:majappolindra@gmail.com" className="text-primary hover:underline">majappolindra@gmail.com</a>
                  <a href="https://instagram.com/majap_polindra" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@majap_polindra</a>
                </div>
              </div>
            </div>
           </div>
         </Container>
       </Section>
     </>
   );
 }
