import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-indigo-500/10 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse duration-10000"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-cyan-500/10 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse duration-10000 delay-2000"></div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>

      {/* Logo and Brand Header */}
      <div className="relative z-10 text-center mb-8 animate-slide-in">
        <div className="inline-flex items-center justify-center p-3 bg-slate-900/60 rounded-2xl border border-slate-800/80 shadow-inner mb-4">
          <GraduationCap className="h-10 w-10 text-indigo-400 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent sm:text-4xl">
          EduSphere
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
          Welcome to the Student Record Management Portal. Sign in to access your administrative tools.
        </p>
      </div>

      {/* Clerk Login Component Card Container */}
      <div className="relative z-10 w-full max-w-[440px] animate-fade-in shadow-2xl">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[22px] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative bg-slate-900/40 backdrop-blur-xl border border-slate-800/40 rounded-[20px] overflow-hidden p-1">
          <SignIn
            appearance={{
              baseTheme: dark,
              elements: {
                card: 'bg-transparent border-0 shadow-none',
                headerTitle: 'text-slate-100 font-bold text-xl tracking-tight hidden', // Hide default title since we have a custom brand header
                headerSubtitle: 'text-slate-400 text-sm hidden',
                socialButtonsBlockButton: 'bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-850 hover:border-slate-700 transition-all duration-200 py-2.5 rounded-xl',
                formButtonPrimary: 'bg-gradient-to-r from-indigo-500 via-indigo-650 to-cyan-500 hover:opacity-95 text-white font-semibold py-2.5 rounded-xl border-0 transition-all duration-300 shadow-md shadow-indigo-500/10 focus:ring-2 focus:ring-indigo-500/40 active:scale-[0.98]',
                footerActionText: 'text-slate-400 text-xs',
                footerActionLink: 'text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-150',
                formFieldLabel: 'text-slate-300 text-xs font-medium mb-1',
                formFieldInput: 'bg-slate-950/80 border border-slate-850 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 text-slate-100 rounded-xl py-2.5 text-sm transition-all duration-200',
                dividerText: 'text-slate-500 text-xs uppercase font-semibold tracking-wider',
                dividerLine: 'bg-slate-800/60',
                identityPreviewText: 'text-slate-200',
                identityPreviewEditButtonIcon: 'text-indigo-400 hover:text-indigo-300',
                userButtonPopoverCard: 'bg-slate-900 border border-slate-800',
                userButtonPopoverActions: 'border-slate-800',
                userButtonPopoverActionButton: 'hover:bg-slate-800',
                userButtonPopoverActionButtonText: 'text-slate-200',
              }
            }}
          />
        </div>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 mt-8 text-center text-xs text-slate-500 tracking-wide">
        EduSphere © {new Date().getFullYear()} • Secure Portal Access
      </div>
    </div>
  );
};

export default Login;
