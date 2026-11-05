import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Send, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { language, openLegalDoc } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: '',
    consent: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg(language === 'es' ? 'Por favor completa todos los campos requeridos.' : 'Please fill out all required fields.');
      return;
    }
    if (!formData.consent) {
      setErrorMsg(language === 'es' ? 'Debes aceptar la política de privacidad para enviar el formulario.' : 'You must accept the privacy policy to submit.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
          <Mail className="w-4 h-4" />
          <span>{language === 'es' ? 'Contacto y Soporte' : 'Contact & Support'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'es' ? 'Contacta con CommissionPilot' : 'Get in Touch with CommissionPilot'}
        </h1>
        <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
          {language === 'es'
            ? '¿Tienes sugerencias sobre productos, deseas reportar una variación de precio o consultar condiciones de afiliación? Escríbenos.'
            : 'Have product suggestions, want to report an updated merchant price, or inquire about verified affiliate partnerships? Drop us a line.'}
        </p>
      </div>

      {submitted ? (
        <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-emerald-950">
            {language === 'es' ? '¡Mensaje Enviado con Éxito!' : 'Message Received Successfully!'}
          </h2>
          <p className="text-sm text-emerald-800 max-w-md mx-auto">
            {language === 'es'
              ? 'Gracias por contactarnos. Nuestro equipo editorial revisará tu mensaje y responderá a la dirección indicada.'
              : 'Thank you for reaching out. Our editorial team will review your message and reply promptly to your email address.'}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', subject: 'General Question', message: '', consent: false });
            }}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 underline"
          >
            {language === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-700">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {language === 'es' ? 'Nombre Completo' : 'Full Name'} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {language === 'es' ? 'Correo Electrónico' : 'Email Address'} <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@domain.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              {language === 'es' ? 'Motivo del Contacto' : 'Inquiry Reason'}
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white font-medium"
            >
              <option value="Product Feedback">{language === 'es' ? 'Sugerencia de Producto' : 'Product Feedback or Suggestion'}</option>
              <option value="Price Report">{language === 'es' ? 'Reportar Variación de Precio' : 'Report Price or Merchant Variation'}</option>
              <option value="Affiliate Network">{language === 'es' ? 'Consulta de Afiliación / Partnership' : 'Affiliate Network & Partnership Query'}</option>
              <option value="General Question">{language === 'es' ? 'Consulta General' : 'General Inquiry'}</option>
            </select>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              {language === 'es' ? 'Mensaje' : 'Message'} <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={language === 'es' ? 'Escribe aquí tu consulta o comentario...' : 'Type your detailed inquiry or note here...'}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* GDPR Consent Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="privacy-consent"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
            />
            <label htmlFor="privacy-consent" className="text-xs text-slate-600 leading-normal">
              {language === 'es' ? (
                <>
                  He leído y acepto la{' '}
                  <button
                    type="button"
                    onClick={() => openLegalDoc('privacidad')}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Política de Privacidad (RGPD)
                  </button>{' '}
                  para el tratamiento de mis datos de contacto con el fin de resolver mi consulta.
                </>
              ) : (
                <>
                  I have read and agree to the{' '}
                  <button
                    type="button"
                    onClick={() => openLegalDoc('privacidad')}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Privacy Policy (GDPR)
                  </button>{' '}
                  to process my contact information solely to respond to this request.
                </>
              )}
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
            >
              <span>{language === 'es' ? 'Enviar Mensaje' : 'Send Message'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>
      )}

      {/* Official Address & Info */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Titular responsable: <strong>Amin Ajrif</strong> (N.I.E. Z3277056K · Autónomo 100%)</span>
          </div>
          <a 
            href="https://www.linkedin.com/in/amin-ajrif-9464a2106" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            LinkedIn Perfil Oficial →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
          <div>
            <strong>Domicilio profesional:</strong> Provenza 148, Local, 08036 Barcelona, España
          </div>
          <div>
            <strong>Email directo:</strong> <a href="mailto:AMIN.AJRIF@gmail.com" className="text-blue-600 hover:underline">AMIN.AJRIF@gmail.com</a>
          </div>
        </div>
      </div>

    </div>
  );
};
