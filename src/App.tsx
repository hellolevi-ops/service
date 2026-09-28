/**
 * 青藤国际 (Ivy Global Education & Advisory)
 * 垂直深耕型国际学者与留学研判体系 - 核心前端应用
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WeComDock } from './components/WeComDock';
import { LeadBookingModal } from './components/LeadBookingModal';
import { AdminLeadsDrawer } from './components/AdminLeadsDrawer';

// Views
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { UniversitiesView } from './views/UniversitiesView';
import { TracksView } from './views/TracksView';
import { CasesView } from './views/CasesView';
import { AdvisorsView } from './views/AdvisorsView';
import { ProcessFeesView } from './views/ProcessFeesView';
import { LabView } from './views/LabView';
import { GuidesView } from './views/GuidesView';
import { CommunityView } from './views/CommunityView';

import { INITIAL_LEADS, LeadSubmission, CaseStudyItem } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [extraSlug, setExtraSlug] = useState<string | undefined>(undefined);

  // Modals & Drawers
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingAdvisorId, setBookingAdvisorId] = useState<string | undefined>(undefined);
  const [bookingTrackId, setBookingTrackId] = useState<string | undefined>(undefined);
  const [prefilledAssessment, setPrefilledAssessment] = useState<any>(undefined);
  
  const [isWeComOpen, setIsWeComOpen] = useState<boolean>(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState<boolean>(false);
  const [selectedCaseModal, setSelectedCaseModal] = useState<CaseStudyItem | null>(null);

  // Leads state
  const [leads, setLeads] = useState<LeadSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('ivyglobal_leads_data');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ivyglobal_leads_data', JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  }, [leads]);

  // Handle navigation
  const handleNavigate = (tab: string, slug?: string) => {
    setCurrentTab(tab);
    setExtraSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open booking modal with prefilled params
  const handleOpenBooking = (advisorId?: string, trackId?: string) => {
    setBookingAdvisorId(advisorId);
    setBookingTrackId(trackId);
    setPrefilledAssessment(undefined);
    setIsBookingOpen(true);
  };

  // When assessment tool completes and user wants to transfer data to booking
  const handleBookingFromAssessment = (assessmentData: any) => {
    setBookingAdvisorId(undefined);
    setBookingTrackId(assessmentData.track);
    setPrefilledAssessment(assessmentData);
    setIsBookingOpen(true);
  };

  const handleLeadSubmitSuccess = (newLead: LeadSubmission) => {
    setLeads(prev => [newLead, ...prev]);
    setToastMessage(`预约已成功建立（${newLead.id}），学术督导 15 分钟内将与您联络！`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadSubmission['status']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600/15 selection:text-blue-700">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-blue-500/40 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Primary Top Bar Contract */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenWeCom={() => setIsWeComOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onOpenWeCom={() => setIsWeComOpen(true)}
            onSelectCase={(item) => setSelectedCaseModal(item)}
          />
        )}

        {currentTab === 'services' && (
          <ServicesView
            initialSubTab={extraSlug}
            onOpenBooking={handleOpenBooking}
            onOpenWeCom={() => setIsWeComOpen(true)}
          />
        )}

        {currentTab === 'universities' && (
          <UniversitiesView
            onOpenBooking={handleOpenBooking}
            onOpenWeCom={() => setIsWeComOpen(true)}
          />
        )}

        {currentTab === 'tracks' && (
          <TracksView
            initialTrackSlug={extraSlug}
            onOpenBooking={handleOpenBooking}
            onOpenWeCom={() => setIsWeComOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'cases' && (
          <CasesView
            selectedCaseModal={selectedCaseModal}
            onSelectCase={setSelectedCaseModal}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentTab === 'advisors' && (
          <AdvisorsView
            onOpenBooking={(advId) => handleOpenBooking(advId)}
            onViewCase={(caseSlug) => {
              handleNavigate('cases', caseSlug);
            }}
          />
        )}

        {currentTab === 'process-fees' && (
          <ProcessFeesView
            onOpenBooking={() => handleOpenBooking()}
            onOpenWeCom={() => setIsWeComOpen(true)}
          />
        )}

        {currentTab === 'lab' && (
          <LabView
            initialToolOrPlaybook={extraSlug}
            onOpenBooking={handleOpenBooking}
            onOpenWeCom={() => setIsWeComOpen(true)}
          />
        )}

        {currentTab === 'guides' && (
          <GuidesView
            initialSlug={extraSlug}
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentTab === 'community' && (
          <CommunityView
            onOpenBooking={() => handleOpenBooking()}
            onOpenWeCom={() => setIsWeComOpen(true)}
          />
        )}
      </main>

      {/* Global WeChat / WeCom Conversion Dock */}
      <WeComDock
        isOpenModal={isWeComOpen}
        onCloseModal={() => setIsWeComOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Modal: Lead Booking & 15m SLA reservation */}
      <LeadBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultAdvisorId={bookingAdvisorId}
        defaultTrackId={bookingTrackId}
        prefilledAssessment={prefilledAssessment}
        onSubmitSuccess={handleLeadSubmitSuccess}
      />

      {/* Drawer: Academic Supervision Leads Inspection */}
      <AdminLeadsDrawer
        isOpen={isAdminDrawerOpen}
        onClose={() => setIsAdminDrawerOpen(false)}
        leads={leads}
        onUpdateStatus={handleUpdateLeadStatus}
      />

      {/* Trust & Academic Footprint Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenWeCom={() => setIsWeComOpen(true)}
        onOpenAdminLeads={() => setIsAdminDrawerOpen(true)}
      />
    </div>
  );
}
