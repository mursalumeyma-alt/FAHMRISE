import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Award, 
  BookOpen, 
  Activity, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Lock, 
  Unlock, 
  Eye, 
  FileText, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  UserCheck,
  Coins,
  Mail,
  Phone,
  Sparkles,
  GraduationCap,
  Edit3,
  DollarSign,
  Percent,
  Receipt,
  CreditCard,
  Layers,
  Settings,
  HelpCircle,
  Building
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/common/Badge';

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'certificates' | 'courses' | 'coaches' | 'audit'
  
  // Data states
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [coachApplications, setCoachApplications] = useState([]);
  const [coachRates, setCoachRates] = useState(null);
  
  // Loading & Filter states
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // User search & filters
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  // Certificate search & filters
  const [certSearch, setCertSearch] = useState('');
  const [certStatusFilter, setCertStatusFilter] = useState('all');

  // Coach search & filters
  const [coachSearch, setCoachSearch] = useState('');
  const [coachStatusFilter, setCoachStatusFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [rateEditModal, setRateEditModal] = useState({ open: false, oneMin: 500, oneMax: 1500, grpMin: 200, grpMax: 500, disclaimer: '' });

  // Revoke Modal State
  const [revokeModal, setRevokeModal] = useState({ open: false, certId: null, learnerName: null, reason: '' });

  // Revenue & Financial Commission States
  const [revenueSummary, setRevenueSummary] = useState(null);
  const [revenueLedger, setRevenueLedger] = useState([]);
  const [revenuePricing, setRevenuePricing] = useState({});
  const [revenueConfig, setRevenueConfig] = useState(null);
  const [courseProviders, setCourseProviders] = useState({});
  const [settlements, setSettlements] = useState([]);
  const [pricingDraft, setPricingDraft] = useState({});
  const [pricingDirty, setPricingDirty] = useState(false);
  const [configDraft, setConfigDraft] = useState({ platformShare: 30, providerShare: 70, minPayout: 1000 });
  const [configDirty, setConfigDirty] = useState(false);

  // Revenue filters
  const [revSearch, setRevSearch] = useState('');
  const [revCategoryFilter, setRevCategoryFilter] = useState('all');
  const [revStatusFilter, setRevStatusFilter] = useState('all');

  // Revenue Modals
  const [settlementModal, setSettlementModal] = useState({
    open: false,
    instructorId: '',
    instructorName: '',
    unsettledAmount: 0,
    notes: '',
    payoutMethod: 'M-Pesa / Bank Transfer',
    reference: ''
  });

  const [refundModal, setRefundModal] = useState({
    open: false,
    ledgerId: '',
    userName: '',
    courseTitle: '',
    grossAmount: 0,
    platformShare: 0,
    providerShare: 0,
    reason: '',
    refundAmount: 0
  });

  const [providerModal, setProviderModal] = useState({
    open: false,
    courseId: '',
    courseTitle: '',
    category: '',
    instructorId: '',
    courseType: 'instructor_led',
    customRate: 70
  });

  // Initial load
  useEffect(() => {
    if (user?.role === 'admin') {
      loadAllAdminData();
    }
  }, [user]);

  async function loadAllAdminData() {
    setLoading(true);
    setError(null);
    try {
      const [
        statsRes, 
        usersRes, 
        certsRes, 
        coursesRes, 
        logsRes, 
        coachesRes, 
        ratesRes,
        revSummaryRes,
        revLedgerRes,
        revPricingRes,
        revProvidersRes,
        revSettlementsRes
      ] = await Promise.all([
        api.admin.getStats().catch(() => ({ stats: null })),
        api.admin.getUsers().catch(() => ({ users: [] })),
        api.admin.getCertificates().catch(() => ({ certificates: [] })),
        api.books.getAll().catch(() => ({ books: [] })),
        api.admin.getAuditLogs({ limit: 50 }).catch(() => ({ logs: [] })),
        api.coaches.getApplications().catch(() => ({ applications: [] })),
        api.coaches.getRates().catch(() => ({ rates: null })),
        api.revenue.getSummary().catch(() => ({ summary: null })),
        api.revenue.getLedger().catch(() => ({ ledger: [] })),
        api.revenue.getPricing().catch(() => ({ categoryPricing: {}, revenueConfig: null })),
        api.revenue.getProviders().catch(() => ({ providers: {} })),
        api.revenue.getSettlements().catch(() => ({ settlements: [] }))
      ]);

      if (statsRes.stats) setStats(statsRes.stats);
      if (usersRes.users) setUsers(usersRes.users);
      if (certsRes.certificates) setCertificates(certsRes.certificates);
      if (coursesRes.books) setCourses(coursesRes.books);
      if (logsRes.logs) setAuditLogs(logsRes.logs);
      if (coachesRes.applications) setCoachApplications(coachesRes.applications);
      if (ratesRes.rates) {
        setCoachRates(ratesRes.rates);
        setRateEditModal(prev => ({
          ...prev,
          oneMin: ratesRes.rates.oneToOne?.min || 500,
          oneMax: ratesRes.rates.oneToOne?.max || 1500,
          grpMin: ratesRes.rates.smallGroup?.min || 200,
          grpMax: ratesRes.rates.smallGroup?.max || 500,
          disclaimer: ratesRes.rates.disclaimer || ''
        }));
      }

      // Revenue state initialization
      if (revSummaryRes.summary) setRevenueSummary(revSummaryRes.summary);
      if (revLedgerRes.ledger) setRevenueLedger(revLedgerRes.ledger);
      if (revPricingRes.categoryPricing) {
        setRevenuePricing(revPricingRes.categoryPricing);
        setPricingDraft(revPricingRes.categoryPricing);
      }
      if (revPricingRes.revenueConfig) {
        setRevenueConfig(revPricingRes.revenueConfig);
        setConfigDraft({
          platformShare: Math.round((revPricingRes.revenueConfig.platform_share_rate || 0.3) * 100),
          providerShare: Math.round((revPricingRes.revenueConfig.provider_share_rate || 0.7) * 100),
          minPayout: revPricingRes.revenueConfig.min_settlement_amount || 1000
        });
      }
      if (revProvidersRes.providers) setCourseProviders(revProvidersRes.providers);
      if (revSettlementsRes.settlements) setSettlements(revSettlementsRes.settlements);

    } catch (err) {
      setError(err.message || 'Failed to load administrative records.');
    } finally {
      setLoading(false);
    }
  }

  // Handle Coach Application Status Update (Approve / Reject)
  async function handleCoachAppStatus(appId, newStatus) {
    setActionLoading(true);
    try {
      await api.coaches.updateApplicationStatus(appId, newStatus, reviewNotes.trim());
      setSuccessMsg(`Coach application marked as ${newStatus}.`);
      setSelectedApp(null);
      setReviewNotes('');
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || `Failed to update coach application status`);
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Save Coach Rates
  async function handleSaveRates(e) {
    e.preventDefault();
    setActionLoading(true);
    try {
      const updatedRates = {
        oneToOne: { min: Number(rateEditModal.oneMin), max: Number(rateEditModal.oneMax), unit: 'per hour' },
        smallGroup: { min: Number(rateEditModal.grpMin), max: Number(rateEditModal.grpMax), unit: 'per learner / session' },
        specialized: { note: 'Custom rate based on expertise & session length' },
        disclaimer: rateEditModal.disclaimer.trim()
      };
      await api.coaches.updateRates(updatedRates);
      setSuccessMsg('Coach suggested rates successfully updated.');
      setRateEditModal(prev => ({ ...prev, open: false }));
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to update rates');
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Role Change
  async function handleRoleChange(userId, newRole) {
    setActionLoading(true);
    try {
      await api.admin.updateUserRole(userId, newRole);
      setSuccessMsg(`Role updated to ${newRole}`);
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to update user role');
    } finally {
      setActionLoading(false);
    }
  }

  // Handle User Suspension Toggle
  async function handleSuspensionToggle(userId, currentSuspended) {
    setActionLoading(true);
    try {
      await api.admin.toggleUserStatus(userId, !currentSuspended);
      setSuccessMsg(`User account ${!currentSuspended ? 'suspended' : 'reactivated'}`);
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to update user status');
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Certificate Revoke
  async function handleRevokeSubmit(e) {
    e.preventDefault();
    if (!revokeModal.reason.trim()) return;

    setActionLoading(true);
    try {
      await api.admin.revokeCertificate(revokeModal.certId, revokeModal.reason);
      setRevokeModal({ open: false, certId: null, learnerName: null, reason: '' });
      setSuccessMsg('Certificate marked as revoked.');
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to revoke certificate');
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Certificate Reinstate
  async function handleReinstateCert(certId) {
    setActionLoading(true);
    try {
      await api.admin.reinstateCertificate(certId);
      setSuccessMsg('Certificate reinstated to verified status.');
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to reinstate certificate');
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Course Publish Toggle
  async function handleCourseToggle(courseId, currentPublished) {
    setActionLoading(true);
    try {
      await api.admin.toggleCourseStatus(courseId, !currentPublished);
      setSuccessMsg(`Course ${!currentPublished ? 'published' : 'unpublished'}`);
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to toggle course publication status');
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Save Category Monthly Pricing
  async function handleSaveCategoryPricing(e) {
    if (e) e.preventDefault();
    setActionLoading(true);
    try {
      const sanitized = {};
      Object.keys(pricingDraft).forEach(cat => {
        sanitized[cat] = Number(pricingDraft[cat]) || 0;
      });
      await api.revenue.updateCategoryPricing(sanitized);
      setSuccessMsg('Category monthly prices updated successfully.');
      setPricingDirty(false);
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to update category pricing.');
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Save Revenue Config (Platform 30% / Provider 70%)
  async function handleSaveRevenueConfig(e) {
    if (e) e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        platform_share_rate: Number(configDraft.platformShare) / 100,
        provider_share_rate: Number(configDraft.providerShare) / 100,
        min_settlement_amount: Number(configDraft.minPayout) || 1000
      };
      await api.revenue.updateRevenueConfig(payload);
      setSuccessMsg('Platform commission & provider split configuration saved.');
      setConfigDirty(false);
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to update revenue config.');
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Save Course Provider Assignment & Split Rate
  async function handleSaveCourseProvider(e) {
    e.preventDefault();
    setActionLoading(true);
    try {
      await api.revenue.updateCourseProvider(providerModal.courseId, {
        instructorId: providerModal.instructorId,
        courseType: providerModal.courseType,
        customProviderShareRate: Number(providerModal.customRate) / 100
      });
      setSuccessMsg(`Course provider settings updated for ${providerModal.courseTitle}.`);
      setProviderModal(prev => ({ ...prev, open: false }));
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to update course provider settings.');
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Create Settlement Payout
  async function handleCreateSettlement(e) {
    e.preventDefault();
    setActionLoading(true);
    try {
      await api.revenue.createSettlement({
        instructorId: settlementModal.instructorId,
        notes: settlementModal.notes.trim(),
        payoutMethod: settlementModal.payoutMethod,
        reference: settlementModal.reference.trim()
      });
      setSuccessMsg(`Settlement payout recorded successfully for ${settlementModal.instructorName}.`);
      setSettlementModal({
        open: false,
        instructorId: '',
        instructorName: '',
        unsettledAmount: 0,
        notes: '',
        payoutMethod: 'M-Pesa / Bank Transfer',
        reference: ''
      });
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to create settlement payout.');
    } finally {
      setActionLoading(false);
    }
  }

  // Handle Process Refund & Reconcile Revenue Splits
  async function handleProcessRefund(e) {
    e.preventDefault();
    setActionLoading(true);
    try {
      await api.revenue.processRefund({
        ledgerId: refundModal.ledgerId,
        reason: refundModal.reason.trim(),
        refundAmount: refundModal.refundAmount ? Number(refundModal.refundAmount) : undefined
      });
      setSuccessMsg('Refund processed and ledger transaction reconciled.');
      setRefundModal({
        open: false,
        ledgerId: '',
        userName: '',
        courseTitle: '',
        grossAmount: 0,
        platformShare: 0,
        providerShare: 0,
        reason: '',
        refundAmount: 0
      });
      setTimeout(() => setSuccessMsg(null), 3000);
      loadAllAdminData();
    } catch (err) {
      setError(err.message || 'Failed to process refund.');
    } finally {
      setActionLoading(false);
    }
  }

  // Access Control Guard
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Restricted Access</h2>
          <p className="text-slate-400 text-sm mb-6">
            The FAHMRISE Administration Console is restricted to authorized academic board staff and administrators.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-colors"
          >
            Return to Learner Dashboard
          </a>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = !userSearch || 
      (u.name && u.name.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.country && u.country.toLowerCase().includes(userSearch.toLowerCase()));
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredCertificates = certificates.filter(c => {
    const matchesSearch = !certSearch ||
      (c.id && c.id.toLowerCase().includes(certSearch.toLowerCase())) ||
      (c.userName && c.userName.toLowerCase().includes(certSearch.toLowerCase())) ||
      (c.courseTitle && c.courseTitle.toLowerCase().includes(certSearch.toLowerCase()));
    const matchesStatus = certStatusFilter === 'all' || c.status === certStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCoachApps = coachApplications.filter(app => {
    const matchesSearch = !coachSearch ||
      (app.fullName && app.fullName.toLowerCase().includes(coachSearch.toLowerCase())) ||
      (app.email && app.email.toLowerCase().includes(coachSearch.toLowerCase())) ||
      (app.expertise && app.expertise.toLowerCase().includes(coachSearch.toLowerCase()));
    const matchesStatus = coachStatusFilter === 'all' || app.status === coachStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredRevenueLedger = revenueLedger.filter(tx => {
    const matchesSearch = !revSearch ||
      (tx.id && tx.id.toLowerCase().includes(revSearch.toLowerCase())) ||
      (tx.user_name && tx.user_name.toLowerCase().includes(revSearch.toLowerCase())) ||
      (tx.user_email && tx.user_email.toLowerCase().includes(revSearch.toLowerCase())) ||
      (tx.course_title && tx.course_title.toLowerCase().includes(revSearch.toLowerCase())) ||
      (tx.provider_name && tx.provider_name.toLowerCase().includes(revSearch.toLowerCase()));
    const matchesCategory = revCategoryFilter === 'all' || tx.category === revCategoryFilter;
    const matchesStatus = revStatusFilter === 'all' || tx.settlement_status === revStatusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">FAHMRISE Operations & Admin Control</h1>
                <p className="text-slate-400 text-sm mt-0.5">Understand. Learn. Rise. • Central Administration & Academic Verification</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllAdminData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">✕</button>
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-300">✕</button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'overview', label: 'KPI Analytics', icon: TrendingUp },
            { id: 'revenue', label: 'Revenue & 30/70 Splits', icon: Coins },
            { id: 'users', label: `Learners (${users.length})`, icon: Users },
            { id: 'certificates', label: `Certificates (${certificates.length})`, icon: Award },
            { id: 'courses', label: `Course Catalog (${courses.length})`, icon: BookOpen },
            { id: 'coaches', label: `Coach Applications (${coachApplications.length})`, icon: GraduationCap },
            { id: 'audit', label: `Security Audits (${auditLogs.length})`, icon: Activity }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider">Total Registered Learners</span>
                  <Users className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white">{stats?.totalLearners || 0}</div>
                <div className="text-xs text-slate-500 mt-2">Active students in catalog</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider">Active Enrollments</span>
                  <BookOpen className="w-5 h-5 text-teal-400" />
                </div>
                <div className="text-3xl font-bold text-white">{stats?.totalEnrollments || 0}</div>
                <div className="text-xs text-slate-500 mt-2">Course access grants</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider">Verified Certificates</span>
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-3xl font-bold text-white">{stats?.verifiedCertificates || 0}</div>
                <div className="text-xs text-slate-500 mt-2">{stats?.revokedCertificates || 0} revoked credentials</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider">Active Subscriptions</span>
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white">{stats?.activeSubscriptions || 0}</div>
                <div className="text-xs text-slate-500 mt-2">Monthly All-Access plans</div>
              </div>
            </div>

            {/* Recent Audit Actions Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Recent Administrative & Security Events</span>
                </h3>
                <button
                  onClick={() => setActiveTab('audit')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                >
                  <span>View All Logs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-slate-800/80">
                {(stats?.recentAuditLogs || []).slice(0, 5).map(log => (
                  <div key={log.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                    <div>
                      <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mr-2">
                        {log.action}
                      </span>
                      <span className="text-slate-300">{log.details || log.entity}</span>
                    </div>
                    <span className="text-slate-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
                {(!stats?.recentAuditLogs || stats.recentAuditLogs.length === 0) && (
                  <div className="py-6 text-center text-slate-500 text-sm">No audit logs recorded yet.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REVENUE & COMMISSION MANAGEMENT (30/70 SPLITS) */}
        {activeTab === 'revenue' && (
          <div className="space-y-8">
            {/* Top Financial KPI Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Gross Platform Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  KSh {(revenueSummary?.totalGrossRevenue || 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Total course enrollments</div>
              </div>

              <div className="bg-slate-900/90 border border-emerald-500/20 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">FAHMRISE (30%)</span>
                  <Percent className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  KSh {(revenueSummary?.totalPlatformCommission || 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Platform retained share</div>
              </div>

              <div className="bg-slate-900/90 border border-teal-500/20 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">Instructors (70%)</span>
                  <Users className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-2xl font-bold text-teal-300 font-mono">
                  KSh {(revenueSummary?.totalProviderRevenue || 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Total provider earnings</div>
              </div>

              <div className="bg-slate-900/90 border border-amber-500/20 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Pending Payouts</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-amber-400 font-mono">
                  KSh {(revenueSummary?.pendingSettlements || 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Awaiting batch settlement</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Settled Payouts</span>
                  <CheckCircle2 className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-2xl font-bold text-slate-200 font-mono">
                  KSh {(revenueSummary?.settledPayouts || 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Disbursed to instructors</div>
              </div>
            </div>

            {/* Category Pricing Configuration & Commission Model Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Category Monthly Pricing Table */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-white font-bold text-base">
                      <Coins className="w-5 h-5 text-emerald-400" />
                      <span>Category Monthly Pricing Configuration (KSh)</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Fixed central monthly course pricing and automatic 30/70 share preview
                    </p>
                  </div>
                  <button
                    onClick={handleSaveCategoryPricing}
                    disabled={actionLoading || !pricingDirty}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-950/40"
                  >
                    <span>Save Category Prices</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950/70 text-xs uppercase text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Monthly Price (KSh)</th>
                        <th className="py-3 px-3 text-emerald-400">Platform 30%</th>
                        <th className="py-3 px-3 text-teal-400">Instructor 70%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                      {Object.keys(pricingDraft).map(category => {
                        const price = Number(pricingDraft[category]) || 0;
                        const platformShare = Math.round(price * 0.3);
                        const providerShare = price - platformShare;

                        return (
                          <tr key={category} className="hover:bg-slate-800/30">
                            <td className="py-3 px-3 font-sans font-semibold text-white">
                              {category}
                            </td>
                            <td className="py-3 px-3">
                              <div className="relative max-w-[160px]">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-sans">KSh</span>
                                <input
                                  type="number"
                                  value={pricingDraft[category]}
                                  onChange={(e) => {
                                    setPricingDraft({ ...pricingDraft, [category]: e.target.value });
                                    setPricingDirty(true);
                                  }}
                                  className="w-full pl-11 pr-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                                />
                              </div>
                            </td>
                            <td className="py-3 px-3 font-semibold text-emerald-400">
                              KSh {platformShare.toLocaleString()}
                            </td>
                            <td className="py-3 px-3 font-semibold text-teal-300">
                              KSh {providerShare.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Commission Model & Settlement Policies */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-white font-bold text-base border-b border-slate-800 pb-3">
                    <Settings className="w-5 h-5 text-emerald-400" />
                    <span>Global Revenue Split Rules</span>
                  </div>
                  
                  <div className="space-y-4 pt-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        FAHMRISE Platform Commission Rate (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={configDraft.platformShare}
                          onChange={(e) => {
                            const pShare = Number(e.target.value);
                            setConfigDraft({
                              ...configDraft,
                              platformShare: pShare,
                              providerShare: Math.max(0, 100 - pShare)
                            });
                            setConfigDirty(true);
                          }}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Instructor / Provider Share Rate (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={configDraft.providerShare}
                          onChange={(e) => {
                            const prShare = Number(e.target.value);
                            setConfigDraft({
                              ...configDraft,
                              providerShare: prShare,
                              platformShare: Math.max(0, 100 - prShare)
                            });
                            setConfigDirty(true);
                          }}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Minimum Payout Threshold (KSh)
                      </label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-sans">KSh</span>
                        <input
                          type="number"
                          value={configDraft.minPayout}
                          onChange={(e) => {
                            setConfigDraft({ ...configDraft, minPayout: e.target.value });
                            setConfigDirty(true);
                          }}
                          className="w-full pl-11 pr-2 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={handleSaveRevenueConfig}
                    disabled={actionLoading || !configDirty}
                    className="w-full py-2.5 bg-slate-800 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow"
                  >
                    Save Commission Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Course-to-Instructor Mapping & Custom Split Settings */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-base font-bold text-white">Course Provider & Commission Split Assignments</h3>
                    <p className="text-xs text-slate-400">Map courses to approved instructors or mark as platform self-paced (100% FAHMRISE)</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/70 text-xs uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Course Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Delivery Mode</th>
                      <th className="py-3 px-4">Assigned Instructor</th>
                      <th className="py-3 px-4 text-center">Split Rule</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {courses.map(course => {
                      const providerInfo = courseProviders[course.id] || {
                        instructor_id: 'usr_instructor_01',
                        course_type: 'instructor_led',
                        custom_provider_share_rate: null
                      };

                      const assignedUser = users.find(u => u.id === providerInfo.instructor_id);
                      const isSelfPaced = providerInfo.course_type === 'self_paced';
                      const splitRate = isSelfPaced ? 0 : (providerInfo.custom_provider_share_rate !== null ? providerInfo.custom_provider_share_rate : 0.70);

                      return (
                        <tr key={course.id} className="hover:bg-slate-800/30">
                          <td className="py-3.5 px-4 font-semibold text-white">
                            {course.title}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 text-xs">
                            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                              {course.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              isSelfPaced 
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>
                              {isSelfPaced ? 'Self-Paced (Platform)' : 'Instructor-Led'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs">
                            {isSelfPaced ? (
                              <span className="text-slate-400 italic">FAHMRISE Academic Team</span>
                            ) : (
                              <div>
                                <span className="text-white font-medium">{assignedUser?.name || providerInfo.instructor_id}</span>
                                <span className="text-slate-500 block text-[11px]">{assignedUser?.email}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center font-mono text-xs">
                            <span className={`px-2 py-0.5 rounded-full font-bold ${
                              isSelfPaced 
                                ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                                : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                            }`}>
                              {isSelfPaced ? '100% Platform / 0% Provider' : `${Math.round((1 - splitRate) * 100)}% Platform / ${Math.round(splitRate * 100)}% Provider`}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setProviderModal({
                                  open: true,
                                  courseId: course.id,
                                  courseTitle: course.title,
                                  category: course.category,
                                  instructorId: providerInfo.instructor_id || 'usr_instructor_01',
                                  courseType: providerInfo.course_type || 'instructor_led',
                                  customRate: Math.round(splitRate * 100)
                                });
                              }}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Configure Split</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Ledger & Transaction Log */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-base font-bold text-white">Authoritative Financial Ledger</h3>
                    <p className="text-xs text-slate-400">Server-calculated revenue allocations, discounts, refunds, and settlement statuses</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      // Pre-fill settlement modal with first instructor that has pending balance
                      const pendingTx = revenueLedger.find(t => t.settlement_status === 'pending' && t.provider_id && t.provider_id !== 'fahmrise_platform');
                      if (pendingTx) {
                        setSettlementModal({
                          open: true,
                          instructorId: pendingTx.provider_id,
                          instructorName: pendingTx.provider_name || 'Instructor',
                          unsettledAmount: 0,
                          notes: 'Monthly batch disbursement',
                          payoutMethod: 'M-Pesa / Bank Transfer',
                          reference: `PAY-${Date.now().toString().slice(-6)}`
                        });
                      } else {
                        setSettlementModal({
                          open: true,
                          instructorId: 'usr_instructor_01',
                          instructorName: 'Ustadh Ahmed Hassan',
                          unsettledAmount: 0,
                          notes: 'Monthly batch disbursement',
                          payoutMethod: 'M-Pesa / Bank Transfer',
                          reference: `PAY-${Date.now().toString().slice(-6)}`
                        });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950/40 transition-all"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Create Settlement Payout</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by ID, student, course, instructor..."
                    value={revSearch}
                    onChange={(e) => setRevSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={revCategoryFilter}
                    onChange={(e) => setRevCategoryFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Islamic Studies">Islamic Studies</option>
                    <option value="Business">Business</option>
                    <option value="International Languages">International Languages</option>
                    <option value="Career Skills">Career Skills</option>
                  </select>

                  <select
                    value={revStatusFilter}
                    onChange={(e) => setRevStatusFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending Settlement</option>
                    <option value="settled">Settled</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              {/* Ledger Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/80 text-xs uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-3">Date & TX ID</th>
                      <th className="py-3 px-3">Student</th>
                      <th className="py-3 px-3">Course</th>
                      <th className="py-3 px-3 text-right">Gross</th>
                      <th className="py-3 px-3 text-right text-emerald-400">FAHMRISE (30%)</th>
                      <th className="py-3 px-3 text-right text-teal-400">Provider (70%)</th>
                      <th className="py-3 px-3">Instructor / Provider</th>
                      <th className="py-3 px-3 text-center">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
                    {filteredRevenueLedger.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-800/30">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-white">{new Date(tx.created_at).toLocaleDateString()}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{tx.id}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="text-white font-medium">{tx.user_name || 'Learner'}</div>
                          <div className="text-[10px] text-slate-500">{tx.user_email}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="text-slate-200 font-medium">{tx.course_title}</div>
                          <div className="text-[10px] text-slate-500">{tx.category}</div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-slate-200">
                          KSh {(tx.gross_amount || 0).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-emerald-400">
                          KSh {(tx.platform_share || 0).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-teal-300">
                          KSh {(tx.provider_share || 0).toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-slate-300">
                          {tx.provider_name || 'FAHMRISE Platform'}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            tx.settlement_status === 'settled'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : tx.settlement_status === 'refunded'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {tx.settlement_status === 'settled' && <CheckCircle2 className="w-3 h-3" />}
                            {tx.settlement_status === 'pending' && <Clock className="w-3 h-3" />}
                            {tx.settlement_status === 'refunded' && <AlertTriangle className="w-3 h-3" />}
                            <span className="capitalize">{tx.settlement_status || 'pending'}</span>
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {tx.settlement_status !== 'refunded' && (
                            <button
                              onClick={() => {
                                setRefundModal({
                                  open: true,
                                  ledgerId: tx.id,
                                  userName: tx.user_name || 'Learner',
                                  courseTitle: tx.course_title,
                                  grossAmount: tx.gross_amount,
                                  platformShare: tx.platform_share,
                                  providerShare: tx.provider_share,
                                  reason: '',
                                  refundAmount: tx.gross_amount
                                });
                              }}
                              className="px-2.5 py-1 bg-red-600/10 hover:bg-red-600/30 text-red-300 border border-red-500/20 rounded text-[11px] font-semibold transition-colors"
                            >
                              Refund
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}

                    {filteredRevenueLedger.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center py-8 text-slate-500 text-xs">
                          No revenue ledger transactions found matching filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Settlements History */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  <div>
                    <h3 className="text-base font-bold text-white">Disbursed Instructor Settlements</h3>
                    <p className="text-xs text-slate-400">Historical payout records and official transfer references</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/70 text-xs uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Settlement ID / Ref</th>
                      <th className="py-3 px-4">Instructor</th>
                      <th className="py-3 px-4 text-right">Amount (KSh)</th>
                      <th className="py-3 px-4">Method</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans text-xs">
                    {settlements.map(st => (
                      <tr key={st.id} className="hover:bg-slate-800/30">
                        <td className="py-3.5 px-4 text-slate-300">
                          {new Date(st.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-400 text-xs">
                          {st.reference || st.id}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-white">
                          {st.instructor_name || st.instructor_id}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                          KSh {(st.amount || 0).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {st.payout_method || 'M-Pesa / Bank Transfer'}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
                            Completed
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">
                          {st.notes || '—'}
                        </td>
                      </tr>
                    ))}

                    {settlements.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-slate-500 text-xs">
                          No settlement disbursements recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LEARNERS MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or country..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">All Roles</option>
                  <option value="learner">Learner</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/80 text-xs uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Learner Profile</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Registered</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${u.name}`}
                              alt={u.name}
                              className="w-9 h-9 rounded-full bg-slate-800 object-cover"
                            />
                            <div>
                              <div className="font-medium text-white">{u.name || 'Unnamed Learner'}</div>
                              <div className="text-xs text-slate-400">{u.email} • {u.country || 'Kenya'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={u.role || 'learner'}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            disabled={actionLoading || u.id === user.id}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                              u.role === 'admin'
                                ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                                : u.role === 'instructor'
                                ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            }`}
                          >
                            <option value="learner">Learner</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Administrator</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            u.status === 'suspended'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {u.status === 'suspended' ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                            <span>{u.status === 'suspended' ? 'Suspended' : 'Active'}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400">
                          {new Date(u.createdAt).toLocaleDateString('en-GB')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {u.id !== user.id && (
                            <button
                              onClick={() => handleSuspensionToggle(u.id, u.status === 'suspended')}
                              disabled={actionLoading}
                              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                                u.status === 'suspended'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                                  : 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                              }`}
                            >
                              {u.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-slate-500 text-sm">
                          No learner accounts match your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATES REGISTRY */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by Credential ID or Learner..."
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={certStatusFilter}
                  onChange={(e) => setCertStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="verified">Verified (Active)</option>
                  <option value="revoked">Revoked</option>
                </select>
              </div>
            </div>

            {/* Certificates Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/80 text-xs uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Credential ID</th>
                      <th className="px-6 py-4">Awarded Learner</th>
                      <th className="px-6 py-4">Course</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Issued Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredCertificates.map(c => {
                      const isRevoked = c.status === 'revoked';
                      return (
                        <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                              {c.certificateId || c.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-white">{c.userName}</div>
                            <div className="text-xs text-slate-400">{c.userEmail}</div>
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-slate-200">
                            {c.courseTitle}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              isRevoked
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>
                              {isRevoked ? <XCircle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                              <span>{isRevoked ? 'Revoked' : 'Verified Official'}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-400">
                            {c.formattedIssuedAt || new Date(c.issuedAt).toLocaleDateString('en-GB')}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <a
                              href={`/verify/${c.certificateId || c.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg inline-flex items-center gap-1 font-medium transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Verify</span>
                            </a>

                            {isRevoked ? (
                              <button
                                onClick={() => handleReinstateCert(c.id)}
                                disabled={actionLoading}
                                className="text-xs px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg font-medium transition-colors"
                              >
                                Reinstate
                              </button>
                            ) : (
                              <button
                                onClick={() => setRevokeModal({ open: true, certId: c.id, learnerName: c.userName, reason: '' })}
                                disabled={actionLoading}
                                className="text-xs px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors"
                              >
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {filteredCertificates.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-slate-500 text-sm">
                          No official certificates found matching search query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COURSES CATALOG CONTROL */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(c => (
                <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                        {c.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {c.price > 0 ? `${c.currency || 'KSh'} ${c.price}` : 'Free'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{c.title}</h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-4">{c.subtitle || c.description}</p>
                    <div className="text-xs text-slate-500 flex items-center gap-3">
                      <span>{c.lessons?.length || 10} Chapters</span>
                      <span>•</span>
                      <span>Level: {c.level || 'Beginner'}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className={`text-xs font-medium ${c.published !== false ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {c.published !== false ? '● Live / Published' : '○ Upcoming / Draft'}
                    </span>
                    <button
                      onClick={() => handleCourseToggle(c.id, c.published !== false)}
                      disabled={actionLoading}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                        c.published !== false
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                      }`}
                    >
                      {c.published !== false ? 'Unpublish' : 'Publish Live'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COACH APPLICATIONS & PRICING */}
        {activeTab === 'coaches' && (
          <div className="space-y-6">
            
            {/* Header / Rates Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Coins className="w-5 h-5 text-emerald-400" />
                    <span>Official Coach Pricing Guidelines (in KSh)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Suggested starting rates for planning purposes. You can configure the official brackets displayed on the public coach page.
                  </p>
                </div>
                <button
                  onClick={() => setRateEditModal(prev => ({ ...prev, open: true }))}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-lg shadow-emerald-950/40"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Rate Brackets</span>
                </button>
              </div>

              {/* Rate Badges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">1-on-1 Coaching</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                    KSh {coachRates?.oneToOne?.min || 500} – {coachRates?.oneToOne?.max || 1500} <span className="text-xs text-slate-400 font-sans font-normal">/ hr</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Personalized Tajweed & direct code mentorship</div>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Small Group Coaching</div>
                  <div className="text-xl font-bold text-teal-400 font-mono mt-1">
                    KSh {coachRates?.smallGroup?.min || 200} – {coachRates?.smallGroup?.max || 500} <span className="text-xs text-slate-400 font-sans font-normal">/ learner / session</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Cohorts of 3–8 learners in live halaqah / lab</div>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Specialized Track</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                    Custom Proposed Rate
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Based on syllabus depth and session length</div>
                </div>
              </div>

              {coachRates?.disclaimer && (
                <div className="text-[11px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5">
                  <span className="font-semibold text-amber-300">Active Public Disclaimer:</span> {coachRates.disclaimer}
                </div>
              )}
            </div>

            {/* Controls Bar: Search & Status Filters */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={coachSearch}
                  onChange={(e) => setCoachSearch(e.target.value)}
                  placeholder="Search coach applicants..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                {['all', 'pending', 'approved', 'rejected'].map(st => (
                  <button
                    key={st}
                    onClick={() => setCoachStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                      coachStatusFilter === st
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {st === 'all' ? `All (${coachApplications.length})` : `${st} (${coachApplications.filter(a => a.status === st).length})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/80 text-xs uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Applicant</th>
                      <th className="px-6 py-4">Expertise & Format</th>
                      <th className="px-6 py-4">Proposed Rate (KSh)</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Submitted</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredCoachApps.map(app => {
                      const isApproved = app.status === 'approved';
                      const isRejected = app.status === 'rejected';
                      const isPending = !isApproved && !isRejected;

                      return (
                        <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-white">{app.fullName}</div>
                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-500" />
                              <span>{app.email}</span>
                            </div>
                            {app.phone && (
                              <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-mono">
                                <Phone className="w-2.5 h-2.5" />
                                <span>{app.phone}</span>
                              </div>
                            )}
                          </td>

                          <td className="px-6 py-4">
                            <div className="font-medium text-emerald-300 text-xs">{app.expertise}</div>
                            <div className="text-[11px] text-slate-400 capitalize mt-0.5">
                              Format: {app.preferredFormat?.replace('_', ' ') || 'Both'}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="font-mono text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                              {app.preferredPrice || 'Propose in review'}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              isApproved 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : isRejected
                                ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}>
                              {isApproved && <CheckCircle2 className="w-3 h-3" />}
                              {isRejected && <XCircle className="w-3 h-3" />}
                              {isPending && <Clock className="w-3 h-3" />}
                              <span className="capitalize">{app.status || 'Pending'}</span>
                            </span>
                          </td>

                          <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                            {new Date(app.createdAt).toLocaleDateString('en-GB')}
                          </td>

                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedApp(app);
                                setReviewNotes(app.adminNotes || '');
                              }}
                              className="px-3 py-1.5 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Review</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredCoachApps.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-10 text-slate-500 text-sm">
                          No coach applications found matching query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: SECURITY AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/80 text-xs uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Timestamp</th>
                      <th className="px-6 py-4">Action</th>
                      <th className="px-6 py-4">Target Entity</th>
                      <th className="px-6 py-4">Details</th>
                      <th className="px-6 py-4">Origin IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-3.5 text-slate-400 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString('en-GB')}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-slate-300">
                          {log.entity} {log.entityId ? `(${log.entityId})` : ''}
                        </td>
                        <td className="px-6 py-3.5 text-slate-400 max-w-md truncate font-sans">
                          {log.details || '-'}
                        </td>
                        <td className="px-6 py-3.5 text-slate-500">
                          {log.ip || '127.0.0.1'}
                        </td>
                      </tr>
                    ))}
                    {auditLogs.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-slate-500 text-sm font-sans">
                          No audit entries found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Revocation Modal */}
        {revokeModal.open && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center gap-3 text-red-400 mb-3">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-bold text-white">Revoke Official Certificate</h3>
              </div>
              <p className="text-slate-400 text-xs mb-4">
                You are about to revoke the official certificate for <strong className="text-white">{revokeModal.learnerName}</strong> (ID: {revokeModal.certId}). This will flag the certificate as invalid in the public registry.
              </p>

              <form onSubmit={handleRevokeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Mandatory Reason for Revocation
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={revokeModal.reason}
                    onChange={(e) => setRevokeModal({ ...revokeModal, reason: e.target.value })}
                    placeholder="e.g. Academic integrity violation, administrative reissuance, duplicate record..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl p-3 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRevokeModal({ open: false, certId: null, learnerName: null, reason: '' })}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading || !revokeModal.reason.trim()}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    Confirm Revocation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Coach Application Review Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8 space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedApp.fullName}</h3>
                    <p className="text-xs text-slate-400">{selectedApp.email} • {selectedApp.phone || 'No phone provided'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-slate-400 hover:text-white text-lg p-1.5 rounded-lg hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              {/* Applicant Profile Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <span className="text-slate-500 uppercase font-semibold">Area of Expertise</span>
                  <div className="text-emerald-300 font-bold text-sm mt-1">{selectedApp.expertise}</div>
                </div>

                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <span className="text-slate-500 uppercase font-semibold">Preferred Format & Rate</span>
                  <div className="text-amber-300 font-bold text-sm mt-1 font-mono">
                    {selectedApp.preferredPrice} <span className="text-slate-400 font-sans font-normal">({selectedApp.preferredFormat?.replace('_', ' ')})</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl sm:col-span-2">
                  <span className="text-slate-500 uppercase font-semibold">Availability</span>
                  <div className="text-slate-200 font-medium text-xs mt-1">{selectedApp.availability || 'Flexible'}</div>
                </div>
              </div>

              {/* Qualifications */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Qualifications & Experience</label>
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                  {selectedApp.qualifications}
                </div>
              </div>

              {/* Proposal */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Introduction & Teaching Proposal</label>
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                  {selectedApp.proposal}
                </div>
              </div>

              {/* Admin Notes & Status */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Admin Review Notes</label>
                <textarea
                  rows="2"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add notes, rate agreement terms, or reason for decision..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              {/* Notice */}
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Approving this coach application upgrades the applicant to an <strong>Instructor</strong> role, enabling coach privileges and live halaqah sessions.
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Close
                </button>

                <div className="flex items-center gap-2">
                  {selectedApp.status !== 'rejected' && (
                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => handleCoachAppStatus(selectedApp.id, 'rejected')}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                    >
                      Reject Application
                    </button>
                  )}

                  {selectedApp.status !== 'approved' && (
                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => handleCoachAppStatus(selectedApp.id, 'approved')}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-950/40 disabled:opacity-50"
                    >
                      Approve Coach Application
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Rate Configuration Modal */}
        {rateEditModal.open && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <Coins className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-white">Configure Coach Planning Rates (KSh)</h3>
                </div>
                <button
                  onClick={() => setRateEditModal(prev => ({ ...prev, open: false }))}
                  className="text-slate-400 hover:text-white text-lg p-1 rounded hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveRates} className="space-y-4">
                
                {/* 1-on-1 Rates */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    One-to-One Rate Bracket (KSh / hr)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <span className="text-xs text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 font-mono">Min KSh</span>
                      <input
                        type="number"
                        value={rateEditModal.oneMin}
                        onChange={(e) => setRateEditModal({ ...rateEditModal, oneMin: e.target.value })}
                        required
                        className="w-full pl-16 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div className="relative">
                      <span className="text-xs text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 font-mono">Max KSh</span>
                      <input
                        type="number"
                        value={rateEditModal.oneMax}
                        onChange={(e) => setRateEditModal({ ...rateEditModal, oneMax: e.target.value })}
                        required
                        className="w-full pl-16 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Small Group Rates */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Small Group Rate Bracket (KSh / learner / session)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <span className="text-xs text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 font-mono">Min KSh</span>
                      <input
                        type="number"
                        value={rateEditModal.grpMin}
                        onChange={(e) => setRateEditModal({ ...rateEditModal, grpMin: e.target.value })}
                        required
                        className="w-full pl-16 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div className="relative">
                      <span className="text-xs text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 font-mono">Max KSh</span>
                      <input
                        type="number"
                        value={rateEditModal.grpMax}
                        onChange={(e) => setRateEditModal({ ...rateEditModal, grpMax: e.target.value })}
                        required
                        className="w-full pl-16 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Public Disclaimer */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Public Planning Rate Disclaimer
                  </label>
                  <textarea
                    rows="3"
                    value={rateEditModal.disclaimer}
                    onChange={(e) => setRateEditModal({ ...rateEditModal, disclaimer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setRateEditModal(prev => ({ ...prev, open: false }))}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/40"
                  >
                    Save Rate Configuration
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* 1. Settlement Payout Modal */}
        {settlementModal.open && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <Coins className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-white">Initiate Instructor Settlement Payout</h3>
                </div>
                <button
                  onClick={() => setSettlementModal(prev => ({ ...prev, open: false }))}
                  className="text-slate-400 hover:text-white text-lg p-1 rounded hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateSettlement} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Select Instructor
                  </label>
                  <select
                    value={settlementModal.instructorId}
                    onChange={(e) => {
                      const selectedUser = users.find(u => u.id === e.target.value);
                      setSettlementModal({
                        ...settlementModal,
                        instructorId: e.target.value,
                        instructorName: selectedUser ? selectedUser.name : e.target.value
                      });
                    }}
                    required
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">-- Choose Instructor --</option>
                    {users.filter(u => u.role === 'instructor' || u.role === 'admin').map(u => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Payout Method
                  </label>
                  <select
                    value={settlementModal.payoutMethod}
                    onChange={(e) => setSettlementModal({ ...settlementModal, payoutMethod: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="M-Pesa / Bank Transfer">M-Pesa / Bank Transfer</option>
                    <option value="M-Pesa Express">M-Pesa Express</option>
                    <option value="Direct EFT Bank Wire">Direct EFT Bank Wire</option>
                    <option value="Airtel Money">Airtel Money</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Transaction Reference / Receipt Number
                  </label>
                  <input
                    type="text"
                    value={settlementModal.reference}
                    onChange={(e) => setSettlementModal({ ...settlementModal, reference: e.target.value })}
                    placeholder="e.g. MPESA-QWERTY12345"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Disbursement Notes & Audit Details
                  </label>
                  <textarea
                    rows="2"
                    value={settlementModal.notes}
                    onChange={(e) => setSettlementModal({ ...settlementModal, notes: e.target.value })}
                    placeholder="e.g. Monthly batch settlement for eligible course revenue"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-300">
                  All pending ledger transactions for the selected instructor will automatically be marked as <strong>settled</strong> and locked against duplicate payout.
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSettlementModal(prev => ({ ...prev, open: false }))}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading || !settlementModal.instructorId}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/40"
                  >
                    Record & Complete Settlement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 2. Refund Processing Modal */}
        {refundModal.open && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-red-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-white">Process Refund & Reconcile Splits</h3>
                </div>
                <button
                  onClick={() => setRefundModal(prev => ({ ...prev, open: false }))}
                  className="text-slate-400 hover:text-white text-lg p-1 rounded hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleProcessRefund} className="space-y-4 text-xs">
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Transaction ID:</span>
                    <span className="font-mono text-white">{refundModal.ledgerId}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Student:</span>
                    <span className="text-white font-medium">{refundModal.userName}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Course:</span>
                    <span className="text-white font-medium">{refundModal.courseTitle}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 border-t border-slate-800/80 pt-1 mt-1 font-mono">
                    <span>Original Gross Amount:</span>
                    <span className="text-white font-bold">KSh {refundModal.grossAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1.5">
                    Refund Amount (KSh)
                  </label>
                  <input
                    type="number"
                    max={refundModal.grossAmount}
                    value={refundModal.refundAmount}
                    onChange={(e) => setRefundModal({ ...refundModal, refundAmount: e.target.value })}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1.5">
                    Mandatory Refund Reason
                  </label>
                  <textarea
                    rows="2"
                    required
                    value={refundModal.reason}
                    onChange={(e) => setRefundModal({ ...refundModal, reason: e.target.value })}
                    placeholder="e.g. Student requested cancellation within guarantee window"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[11px] text-red-300">
                  Processing this refund will deduct both FAHMRISE platform share (30%) and instructor share (70%) proportionally from the authoritative financial ledger.
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setRefundModal(prev => ({ ...prev, open: false }))}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading || !refundModal.reason.trim()}
                    className="px-5 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-950/40"
                  >
                    Confirm Reconciled Refund
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 3. Course Provider Mapping Modal */}
        {providerModal.open && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5 text-emerald-400">
                  <Building className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-white">Configure Course Provider & Split</h3>
                </div>
                <button
                  onClick={() => setProviderModal(prev => ({ ...prev, open: false }))}
                  className="text-slate-400 hover:text-white text-lg p-1 rounded hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveCourseProvider} className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Course</span>
                  <div className="text-white font-bold text-sm mt-0.5">{providerModal.courseTitle} ({providerModal.category})</div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1.5">
                    Course Delivery Mode
                  </label>
                  <select
                    value={providerModal.courseType}
                    onChange={(e) => setProviderModal({ ...providerModal, courseType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="instructor_led">Instructor-Led (30% FAHMRISE / 70% Provider)</option>
                    <option value="self_paced">Platform Self-Paced (100% FAHMRISE / 0% Provider)</option>
                    <option value="mixed">Mixed / Custom Commission Split</option>
                  </select>
                </div>

                {providerModal.courseType !== 'self_paced' && (
                  <>
                    <div>
                      <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1.5">
                        Assigned Instructor / Provider
                      </label>
                      <select
                        value={providerModal.instructorId}
                        onChange={(e) => setProviderModal({ ...providerModal, instructorId: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
                      >
                        {users.filter(u => u.role === 'instructor' || u.role === 'admin').map(u => (
                          <option key={u.id} value={u.id}>
                            {u.name} ({u.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold uppercase tracking-wider mb-1.5">
                        Provider Revenue Share Rate (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={providerModal.customRate}
                          onChange={(e) => setProviderModal({ ...providerModal, customRate: e.target.value })}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:border-emerald-500 focus:outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Platform will retain {100 - (Number(providerModal.customRate) || 70)}% commission.
                      </p>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setProviderModal(prev => ({ ...prev, open: false }))}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/40"
                  >
                    Save Provider Configuration
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

