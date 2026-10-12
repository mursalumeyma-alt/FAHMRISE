import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  Coins, 
  TrendingUp, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  RefreshCw, 
  Receipt, 
  Percent, 
  Lock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/common/Badge';

export default function InstructorDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadInstructorData();
    }
  }, [user]);

  async function loadInstructorData() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.revenue.getInstructorDashboard();
      setData(res.data);
    } catch (err) {
      console.error('Failed to load instructor financial profile:', err);
      setError(err.message || 'Unable to retrieve instructor revenue records.');
    } finally {
      setLoading(false);
    }
  }

  // If user is not an instructor or admin
  if (user && user.role !== 'instructor' && user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Instructor Access Only</h2>
          <p className="text-slate-400 text-sm mb-6">
            This dashboard is dedicated to approved FAHMRISE instructors and course providers for viewing revenue shares, student enrollments, and settlement payouts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/become-a-coach"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-sm transition-colors"
            >
              Apply as Instructor / Coach
            </Link>
            <Link
              to="/dashboard"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-sm transition-colors"
            >
              Learner Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Instructor Revenue & Commission Portal</h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  Understand. Learn. Rise. • Transparent 70% Revenue Share & Settlement Ledger
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadInstructorData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Ledger</span>
            </button>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 rounded-xl text-sm font-medium transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Console</span>
              </Link>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">✕</button>
          </div>
        )}

        {/* Transparent Agreement Callout */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold">
                <Percent className="w-3.5 h-3.5" />
                <span>Agreed Provider Rate: 70% Share</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Welcome, {data?.instructor?.name || user?.name || 'Instructor'}
              </h3>
              <p className="text-slate-300 text-sm max-w-2xl">
                As an approved FAHMRISE instructor, you receive <strong className="text-emerald-400 font-semibold">70% of eligible revenue</strong> for every learner enrolled in your instructor-led courses. The FAHMRISE platform retains 30% for hosting, AI infrastructure, payment gateway processing, and student support.
              </p>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-w-[200px] text-center">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Settlement Currency</span>
              <span className="text-2xl font-black text-emerald-400 mt-1">Kenyan Shillings</span>
              <span className="text-xs text-slate-500 mt-1">Paid via M-Pesa / Bank Transfer</span>
            </div>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider">Total Net Earnings (70%)</span>
              <Coins className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400">
              KSh {(data?.summary?.totalInstructorEarnings || 0).toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              From KSh {(data?.summary?.totalGrossRevenue || 0).toLocaleString()} gross course sales
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider">Pending Payouts</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-3xl font-bold text-amber-400">
              KSh {(data?.summary?.pendingPayout || 0).toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-2">Accrued & scheduled for next payout batch</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider">Settled & Paid Out</span>
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-3xl font-bold text-white">
              KSh {(data?.summary?.settledPayout || 0).toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-2">Disbursed to your registered account</div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-3">
              <span className="text-xs font-medium uppercase tracking-wider">Active Students Enrolled</span>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white">
              {(data?.summary?.totalStudents || 0).toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Across {data?.courses?.length || 0} assigned course{data?.courses?.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>

        {/* Assigned Courses Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">My Assigned Courses & Split Rates</h2>
            </div>
            <span className="text-xs text-slate-400">
              {data?.courses?.length || 0} Course{data?.courses?.length === 1 ? '' : 's'} Assigned
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400">Loading assigned courses...</div>
          ) : !data?.courses || data.courses.length === 0 ? (
            <div className="py-10 text-center text-slate-400 border border-dashed border-slate-800 rounded-xl">
              No courses are currently assigned to your instructor profile.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Course Title</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Monthly Price</th>
                    <th className="py-3.5 px-4">Your Split Rate</th>
                    <th className="py-3.5 px-4 text-center">Enrolled Students</th>
                    <th className="py-3.5 px-4 text-right">Gross Revenue</th>
                    <th className="py-3.5 px-4 text-right">Your Earnings (70%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4 font-medium text-white flex items-center gap-2">
                        <span>{course.title}</span>
                        <Link 
                          to={`/courses/${course.id}`} 
                          target="_blank" 
                          className="text-slate-500 hover:text-emerald-400"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-slate-400">
                        <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs">
                          {course.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-slate-200">
                        KSh {(course.monthlyPrice || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                          {Math.round((course.splitRate || 0.7) * 100)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-white">
                        {course.studentCount || 0}
                      </td>
                      <td className="py-4 px-4 text-right text-slate-300">
                        KSh {(course.grossRevenue || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-emerald-400">
                        KSh {(course.instructorEarnings || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Financial Transactions Ledger */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Receipt className="w-5 h-5 text-emerald-400" />
              <div>
                <h2 className="text-lg font-bold text-white">Enrollment Transactions & Commission Ledger</h2>
                <p className="text-xs text-slate-400">Real-time breakdown of every student enrollment in your courses</p>
              </div>
            </div>
            <span className="text-xs text-slate-400">
              {data?.ledger?.length || 0} Total Entries
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400">Loading transaction ledger...</div>
          ) : !data?.ledger || data.ledger.length === 0 ? (
            <div className="py-10 text-center text-slate-400 border border-dashed border-slate-800 rounded-xl">
              No transactions recorded for your assigned courses yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Date & Tx ID</th>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Course</th>
                    <th className="py-3.5 px-4 text-right">Gross Price</th>
                    <th className="py-3.5 px-4 text-right">FAHMRISE (30%)</th>
                    <th className="py-3.5 px-4 text-right font-bold text-emerald-400">Your Share (70%)</th>
                    <th className="py-3.5 px-4 text-center">Settlement Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.ledger.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium text-white">{new Date(tx.created_at).toLocaleDateString()}</div>
                        <div className="text-xs text-slate-500 font-mono">{tx.id}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-slate-200">{tx.user_name || 'Learner'}</div>
                        <div className="text-xs text-slate-500">{tx.user_email || '—'}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        <div className="font-medium">{tx.course_title}</div>
                        <div className="text-xs text-slate-500">{tx.category}</div>
                      </td>
                      <td className="py-4 px-4 text-right text-slate-300">
                        KSh {(tx.gross_amount || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right text-slate-400">
                        KSh {(tx.platform_share || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-emerald-400">
                        KSh {(tx.provider_share || 0).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          tx.settlement_status === 'settled'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : tx.settlement_status === 'refunded'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {tx.settlement_status === 'settled' && <CheckCircle2 className="w-3 h-3" />}
                          {tx.settlement_status === 'pending' && <Clock className="w-3 h-3" />}
                          {tx.settlement_status === 'refunded' && <AlertCircle className="w-3 h-3" />}
                          <span className="capitalize">{tx.settlement_status || 'pending'}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Settlement Payout History */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              <div>
                <h2 className="text-lg font-bold text-white">Settlement Payout History</h2>
                <p className="text-xs text-slate-400">Official disbursements transferred from FAHMRISE to your account</p>
              </div>
            </div>
            <span className="text-xs text-slate-400">
              {data?.settlements?.length || 0} Payouts Completed
            </span>
          </div>

          {!data?.settlements || data.settlements.length === 0 ? (
            <div className="py-8 text-center text-slate-400 border border-dashed border-slate-800 rounded-xl">
              No settlement payouts have been processed yet. Accrued pending balances will be paid in the next scheduled cycle.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Payout Date</th>
                    <th className="py-3 px-4">Settlement Ref</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4 text-right">Amount Disbursed</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.settlements.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">
                        {new Date(st.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-300">
                        {st.reference || st.id}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {st.payout_method || 'M-Pesa / Bank Transfer'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-400">
                        KSh {(st.amount || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                          Completed
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400 max-w-xs truncate">
                        {st.notes || 'Monthly instructor revenue settlement'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
