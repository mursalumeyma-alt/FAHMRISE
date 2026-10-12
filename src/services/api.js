// Centralized API Service for FAHMRISE Frontend ("Understand. Learn. Rise.")

const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('fahmrise_token') || localStorage.getItem('somaivo_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || `HTTP error ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const api = {
  // Authentication & Profile
  auth: {
    async register(userData) {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return handleResponse(res);
    },

    async login(email, password) {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return handleResponse(res);
    },

    async getMe() {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async updateProfile(profileData) {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
      return handleResponse(res);
    },

    async forgotPassword(email) {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return handleResponse(res);
    },

    async resetPassword(token, newPassword) {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
      return handleResponse(res);
    },

    async changePassword(currentPassword, newPassword) {
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });
      return handleResponse(res);
    },

    async verifyEmail(token) {
      const res = await fetch(`${API_BASE}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      return handleResponse(res);
    }
  },

  // Books & Courses Curriculum
  books: {
    async getAll(params = {}) {
      const query = new URLSearchParams(params).toString();
      const url = `${API_BASE}/books${query ? `?${query}` : ''}`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getById(id) {
      const res = await fetch(`${API_BASE}/books/${id}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async enrollFree(id) {
      const res = await fetch(`${API_BASE}/books/${id}/enroll-free`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getLesson(bookId, lessonId) {
      const res = await fetch(`${API_BASE}/books/${bookId}/lessons/${lessonId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getPractice(bookId, practiceId) {
      const res = await fetch(`${API_BASE}/books/${bookId}/practice/${practiceId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getQuiz(bookId, quizId) {
      const res = await fetch(`${API_BASE}/books/${bookId}/quiz/${quizId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getAllProjects() {
      const res = await fetch(`${API_BASE}/books/projects/all`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getProjectById(projectId) {
      const res = await fetch(`${API_BASE}/books/projects/${projectId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    }
  },

  // Server-Side Quizzes & Assessments
  quiz: {
    async getQuiz(bookId, quizId) {
      const res = await fetch(`${API_BASE}/quiz/${bookId}/${quizId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async submitQuiz(bookId, quizId, answers) {
      const res = await fetch(`${API_BASE}/quiz/${bookId}/${quizId}/submit`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ answers })
      });
      return handleResponse(res);
    },

    async getAttempts(bookId, quizId) {
      const res = await fetch(`${API_BASE}/quiz/${bookId}/${quizId}/attempts`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    }
  },

  // Learner Progress
  progress: {
    async get(bookId) {
      const res = await fetch(`${API_BASE}/progress/${bookId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async markLessonComplete(data) {
      const res = await fetch(`${API_BASE}/progress/lesson`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },

    async saveExercise(data) {
      const res = await fetch(`${API_BASE}/progress/exercise`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },

    async saveQuiz(data) {
      const res = await fetch(`${API_BASE}/progress/quiz`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },

    async submitProject(data) {
      const res = await fetch(`${API_BASE}/progress/project`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },

    async resetProgress(bookId) {
      const res = await fetch(`${API_BASE}/progress/reset`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ bookId })
      });
      return handleResponse(res);
    }
  },

  // Certificates
  certificates: {
    async getMyCertificates() {
      const res = await fetch(`${API_BASE}/certificates/my-certificates`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getCourseCertificate(courseId) {
      const res = await fetch(`${API_BASE}/certificates/course/${courseId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async claimCertificate(courseId, learnerName = '') {
      const res = await fetch(`${API_BASE}/certificates/claim`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ courseId, learnerName })
      });
      return handleResponse(res);
    },

    async verifyCertificate(certificateId) {
      const res = await fetch(`${API_BASE}/certificates/verify/${certificateId}`);
      return handleResponse(res);
    }
  },

  // Notes
  notes: {
    async getNotes(params = {}) {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/notes${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async saveNote(noteData) {
      const res = await fetch(`${API_BASE}/notes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(noteData)
      });
      return handleResponse(res);
    },

    async deleteNote(noteId) {
      const res = await fetch(`${API_BASE}/notes/${noteId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    }
  },

  // Administrator Controls
  admin: {
    async getStats() {
      const res = await fetch(`${API_BASE}/admin/stats`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getUsers(params = {}) {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/admin/users${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async updateUserRole(userId, role) {
      const res = await fetch(`${API_BASE}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ role })
      });
      return handleResponse(res);
    },

    async toggleUserStatus(userId, isSuspended) {
      const res = await fetch(`${API_BASE}/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isSuspended })
      });
      return handleResponse(res);
    },

    async getCertificates(params = {}) {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/admin/certificates${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async revokeCertificate(certificateId, reason) {
      const res = await fetch(`${API_BASE}/admin/certificates/${certificateId}/revoke`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ reason })
      });
      return handleResponse(res);
    },

    async reinstateCertificate(certificateId) {
      const res = await fetch(`${API_BASE}/admin/certificates/${certificateId}/reinstate`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({})
      });
      return handleResponse(res);
    },

    async getAuditLogs(params = {}) {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/admin/audit-logs${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async toggleCourseStatus(courseId, published) {
      const res = await fetch(`${API_BASE}/admin/courses/${courseId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ published })
      });
      return handleResponse(res);
    }
  },

  // Payments & Subscription
  payments: {
    async initiateMpesa(data) {
      const res = await fetch(`${API_BASE}/payments/mpesa/stkpush`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },

    async processCard(data) {
      const res = await fetch(`${API_BASE}/payments/card/process`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },

    async checkStatus(paymentId) {
      const res = await fetch(`${API_BASE}/payments/status/${paymentId}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getSubscriptionStatus() {
      const res = await fetch(`${API_BASE}/payments/subscription/status`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    }
  },

  // AI Tutor
  ai: {
    async ask(message, context = {}) {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ message, context })
      });
      return handleResponse(res);
    },

    async explainCode(code, language = 'javascript') {
      const res = await fetch(`${API_BASE}/ai/explain-code`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ code, language })
      });
      return handleResponse(res);
    }
  },

  // Coach Management & Applications
  coaches: {
    async getRates() {
      const res = await fetch(`${API_BASE}/coaches/rates`);
      return handleResponse(res);
    },

    async apply(applicationData) {
      const res = await fetch(`${API_BASE}/coaches/apply`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(applicationData)
      });
      return handleResponse(res);
    },

    async getApplications(params = {}) {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/coaches/applications${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async updateApplicationStatus(id, status, adminNotes = '') {
      const res = await fetch(`${API_BASE}/coaches/applications/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, adminNotes })
      });
      return handleResponse(res);
    },

    async updateRates(rates) {
      const res = await fetch(`${API_BASE}/coaches/rates`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ rates })
      });
      return handleResponse(res);
    }
  },

  // Revenue Sharing & Financial Commission Controls
  revenue: {
    async getPublicPricing() {
      const res = await fetch(`${API_BASE}/revenue/public-pricing`);
      return handleResponse(res);
    },

    async getSummary(params = {}) {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/revenue/summary${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getLedger(params = {}) {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/revenue/ledger${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async getPricing() {
      const res = await fetch(`${API_BASE}/revenue/pricing`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async updateCategoryPricing(pricingData) {
      const res = await fetch(`${API_BASE}/revenue/pricing/categories`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(pricingData)
      });
      return handleResponse(res);
    },

    async updateRevenueConfig(configData) {
      const res = await fetch(`${API_BASE}/revenue/pricing/config`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(configData)
      });
      return handleResponse(res);
    },

    async getProviders() {
      const res = await fetch(`${API_BASE}/revenue/providers`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async updateCourseProvider(courseId, providerData) {
      const res = await fetch(`${API_BASE}/revenue/providers/${courseId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(providerData)
      });
      return handleResponse(res);
    },

    async getSettlements(params = {}) {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/revenue/settlements${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async createSettlement(settlementData) {
      const res = await fetch(`${API_BASE}/revenue/settlements`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(settlementData)
      });
      return handleResponse(res);
    },

    async processRefund(refundData) {
      const res = await fetch(`${API_BASE}/revenue/refund`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(refundData)
      });
      return handleResponse(res);
    },

    async getInstructorDashboard(instructorId = '') {
      const query = instructorId ? `?instructorId=${instructorId}` : '';
      const res = await fetch(`${API_BASE}/revenue/instructor/dashboard${query}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },

    async previewSplit(splitData) {
      const res = await fetch(`${API_BASE}/revenue/split/preview`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(splitData)
      });
      return handleResponse(res);
    }
  },

  // News & Language Immersion Feeds
  news: {
    async getByLanguage(language = 'somali') {
      const res = await fetch(`${API_BASE}/news/${encodeURIComponent(language)}`);
      return handleResponse(res);
    },
    async getAll() {
      const res = await fetch(`${API_BASE}/news`);
      return handleResponse(res);
    }
  },

  // Somali Learning Educational Curriculum & Resources
  somaliLearning: {
    async getCategories() {
      const res = await fetch(`${API_BASE}/somali-learning/categories`);
      return handleResponse(res);
    },
    async getLessons(params = {}) {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/somali-learning/lessons${query ? `?${query}` : ''}`);
      return handleResponse(res);
    },
    async getLessonById(id) {
      const res = await fetch(`${API_BASE}/somali-learning/lessons/${encodeURIComponent(id)}`);
      return handleResponse(res);
    },
    async getResources() {
      const res = await fetch(`${API_BASE}/somali-learning/resources`);
      return handleResponse(res);
    }
  }
};
