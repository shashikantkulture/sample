'use client';

import React, { useState } from 'react';
import { Sparkles, UploadCloud, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { useAppStore } from '@/lib/store';

export default function CustomDesignPage() {
  const { addToast } = useAppStore();
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'bronze-sculpture',
    budget: '₹50,000 - ₹1,50,000',
    dimensions: '',
    finish: 'Antiqued Verdigris & Gold Wash',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({
      title: 'Commission Proposal Received',
      description: 'Our senior metallurgist and curator will review your dossier within 24 hours.',
      type: 'gold',
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a09] pt-24 pb-32 text-[#ede8df]">
      {/* Hero Header */}
      <div className="py-16 sm:py-24 border-b border-[#c5a059]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BESPOKE ATELIER COMMISSIONS</span>
          </div>
          <h1 className="font-serif-lux text-4xl sm:text-6xl text-[#f7f4ed] font-light">
            Custom Sculptures & Interior Pieces
          </h1>
          <p className="text-xs sm:text-sm text-[#a89b88] max-w-2xl mx-auto font-light leading-relaxed">
            Collaborate directly with our master foundry to produce bespoke lost-wax bronze castings, custom monumental sculptures, or architectural friezes tailored to your sanctuary.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {submitted ? (
          <div className="max-w-xl mx-auto p-10 sm:p-14 rounded-3xl bg-[#14120f] border border-[#c5a059]/40 text-center shadow-2xl space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center mx-auto text-[#c5a059]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059]">
              DOSSIER LODGED
            </span>
            <h2 className="font-serif-lux text-3xl sm:text-4xl text-[#f7f4ed]">
              Thank You for Your Vision
            </h2>
            <p className="text-xs sm:text-sm text-[#a89b88] leading-relaxed font-light">
              We have received your custom commission brief. Our master foundry artisan will prepare metallurgical drawings and contact you via email at <strong className="text-[#f7f4ed]">{form.email}</strong>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs uppercase tracking-widest text-[#c5a059] hover:underline pt-2"
            >
              Submit Another Commission Proposal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Context Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="font-serif-lux text-2xl text-[#f7f4ed] mb-3">
                  The Bespoke Journey
                </h3>
                <p className="text-xs sm:text-sm text-[#a89b88] leading-relaxed font-light">
                  From initial clay maquettes to final 1,150°C lost-wax furnace casting, each bespoke work is realized in consultation with architectural directors and private art advisors.
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#b8ab98]">
                <div className="p-4 rounded-xl bg-[#14120f] border border-white/5 space-y-1">
                  <strong className="text-[#dfba73] block uppercase tracking-wider text-[11px]">
                    01. Maquette & 3D Pre-visualization
                  </strong>
                  <p>Digital 3D CAD modeling and wax prototype validation before casting.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#14120f] border border-white/5 space-y-1">
                  <strong className="text-[#dfba73] block uppercase tracking-wider text-[11px]">
                    02. Foundry Pouring & Metallurgy
                  </strong>
                  <p>Cast in virgin high-grade bronze or sculptural brass alloys.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#14120f] border border-white/5 space-y-1">
                  <strong className="text-[#dfba73] block uppercase tracking-wider text-[11px]">
                    03. Bespoke Fire Patination
                  </strong>
                  <p>Custom verdigris, imperial brown, or antique burnished gold leaf treatments.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#c5a059]/20 bg-[#12100d] text-xs text-[#8c806f] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#c5a059] flex-shrink-0" />
                <span>NDA & Confidentiality honored for all private residential commissions.</span>
              </div>
            </div>

            {/* Right Commission Request Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-3xl bg-[#14120f] border border-[#c5a059]/25 shadow-2xl space-y-5"
              >
                <h3 className="font-serif-lux text-2xl text-[#f7f4ed] border-b border-white/5 pb-3">
                  Request Custom Design
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Julian Montgomery"
                      className="w-full bg-[#191613] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. julian@montgomery.art"
                      className="w-full bg-[#191613] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#191613] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1">
                      Commission Category
                    </label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full bg-[#191613] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                    >
                      <option value="bronze-sculpture">Custom Bronze Sculpture</option>
                      <option value="wall-frieze">Architectural Wall Frieze / Medallion</option>
                      <option value="luxury-urn">Custom Amphora Urn or Planter</option>
                      <option value="table-centerpiece">Monumental Table Centerpiece</option>
                      <option value="corporate-gifting">Corporate Heirloom Gifting</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1">
                      Projected Budget Tier
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-[#191613] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                    >
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                      <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000</option>
                      <option value="₹1,50,000 - ₹5,00,000">₹1,50,000 - ₹5,00,000</option>
                      <option value="₹5,00,000+">₹5,00,000+ (Monumental Installation)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1">
                      Target Dimensions (H x W x D)
                    </label>
                    <input
                      type="text"
                      value={form.dimensions}
                      onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                      placeholder="e.g. 60cm H x 40cm W"
                      className="w-full bg-[#191613] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1">
                    Sculptural Vision & Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe desired motifs, historical reference eras, surface texture, or spatial requirements..."
                    className="w-full bg-[#191613] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                  />
                </div>

                {/* Upload Architectural or Reference Image */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1">
                    Upload Reference Sketch / CAD File
                  </label>
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#c5a059]/30 rounded-xl p-5 hover:border-[#c5a059] transition-colors cursor-pointer bg-[#191613]/50">
                    <UploadCloud className="w-6 h-6 text-[#c5a059] mb-1.5" />
                    <span className="text-xs text-[#cfc4b2]">
                      {selectedFile ? selectedFile : 'Click to attach image, PDF, or reference photo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="pt-3">
                  <MagneticButton
                    variant="gold"
                    className="w-full py-4 text-xs font-semibold tracking-widest"
                  >
                    Submit Commission Proposal <ArrowRight className="w-4 h-4 ml-1.5" />
                  </MagneticButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
