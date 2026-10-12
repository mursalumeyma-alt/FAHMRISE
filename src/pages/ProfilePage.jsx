import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Printer, 
  Download, 
  BookOpen, 
  ShieldCheck, 
  Calendar,
  ExternalLink,
  Edit2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { api } from '../services/api';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import CertificateModal from '../components/common/CertificateModal';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { progress } = useProgress();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [country, setCountry] = useState(user?.country || 'Kenya');
  
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  
  // Dynamic Certificates
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [certModalOpen, setCertModalOpen] = useState(false);

  useEffect(() => {
    async function loadCerts() {
      try {
        const data = await api.certificates.getMyCertificates();
        setCertificates(data.certificates || []);
      } catch (err) {
        console.warn('Failed to load certificates on profile:', err);
      }
    }
    loadCerts();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateProfile({ name, bio, phone, country });
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleOpenCertificate = (cert) => {
    setSelectedCert(cert);
    setCertModalOpen(true);
  };

  const handleCertificateUpdated = async (updatedCert) => {
    setSelectedCert(updatedCert);
    try {
      const data = await api.certificates.getMyCertificates();
      setCertificates(data.certificates || []);
    } catch (err) {
      console.warn('Failed to reload certs:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Profile Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                alt={user?.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-emerald-500 shadow-glow flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user?.name}</h1>
                  <Badge variant="primary" size="xs">FAHMRISE Learner</Badge>
                  {(user?.email === 'demo@fahmrise.com' || user?.email === 'demo@somaivo.com') && (
                    <Badge variant="demo" size="xs">DEMO ACCOUNT</Badge>
                  )}
                </div>
                <p className="text-xs text-slate-400 max-w-md">{user?.bio || 'Understand. Learn. Rise. Mastering web development and practical digital skills.'}</p>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-2">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" /> {user?.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {user?.country || 'Kenya'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>

          </div>

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Full Name (used for certificates)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-slate-300 font-bold">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="2"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow transition-all"
                >
                  {saving ? 'Saving...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          )}

          {message && (
            <p className="mt-4 text-xs text-emerald-400 font-semibold">{message}</p>
          )}
        </div>

        {/* Certificate Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-bold text-white">Verified FAHMRISE Credentials</h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Official certificates of completion issued with immutable verification ID.
              </p>
            </div>
          </div>

          {certificates.length === 0 ? (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-3">
              <Award className="w-8 h-8 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">No Verified Certificates Yet</h4>
              <p className="text-xs text-slate-400">Complete 100% of any course to earn an official verifiable credential.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{cert.courseTitle}</h4>
                        <p className="text-[11px] text-slate-400 font-mono">ID: {cert.id}</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800">
                      VERIFIED ✓
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">{cert.formattedIssuedAt || cert.issuedAt}</span>
                    <button
                      onClick={() => handleOpenCertificate(cert)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow transition-all"
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Official Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        onCertificateUpdated={handleCertificateUpdated}
      />
    </div>
  );
}
