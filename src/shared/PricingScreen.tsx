import { useState, useEffect } from 'preact/hooks';
import { supabase } from '../lib/supabase';
import { invokeEdgeFunction } from '../lib/edgeFunction';
import { toast } from '../lib/toast';
import { getReferralCode } from '../lib/referral';
import { PRICING_PLANS } from '../config/quizData';

function IconCrown(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>; }
function IconShieldCheck(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>; }
function IconLock(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>; }

interface PricingScreenProps {
  email: string;
  onBack?: () => void;
}

export default function PricingScreen({ email, onBack }: PricingScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState('quarterly');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [urgencySlots, setUrgencySlots] = useState(23);

  useEffect(() => {
    setUrgencySlots(23);
    const timer = setTimeout(function scheduleDecrease() {
      setUrgencySlots(prev => {
        if (prev <= 3) return prev;
        return prev - 1;
      });
      const nextDelay = 30000 + Math.floor(Math.random() * 45000);
      setTimeout(scheduleDecrease, nextDelay);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = async (planId: string) => {
    setIsSubscribing(true);
    try {
      const ttq = (window as any).ttq;
      if (ttq && typeof ttq.track === 'function') {
        ttq.track('InitiateCheckout');
      }
    } catch {}
    try {
      if (!supabase) throw new Error('Serviço indisponível');
      try { await supabase.auth.refreshSession(); } catch { /* ignore */ }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Sessão expirada. Faça login novamente.');
        window.location.href = 'https://mrcine.pro/login?redirect=/pricing';
        return;
      }
      const data = (await invokeEdgeFunction('stripe-checkout', {
        plan_id: planId, user_id: session.user.id,
        user_email: session.user.email || email,
        ref_code: getReferralCode() || undefined,
      })) as { url?: string };
      if (data?.url) { window.location.href = data.url; }
      else { throw new Error('URL de checkout não retornada'); }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao processar assinatura';
      if (message.includes('401') || message.includes('Authentication failed') || message.includes('Session expired')) {
        toast.error('Sessão expirada. Faça login novamente.');
        window.location.href = 'https://mrcine.pro/login?redirect=/pricing';
      } else { toast.error(message); }
    } finally { setIsSubscribing(false); }
  };

  return (
    <div className="animate-fade-in-up flex-1 flex flex-col pb-6 sm:pb-10">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-display text-xl sm:text-3xl font-light mb-3 sm:mb-4">Escolha seu acesso Pro</h2>
        <div className="inline-flex items-center gap-2 bg-[var(--accent-dim)] border border-[rgba(212,168,83,0.2)] text-[var(--accent)] px-4 py-2 rounded-full font-mono text-xs sm:text-sm tracking-[0.1em] uppercase">
          <IconCrown className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
          Preço de lançamento — vagas limitadas
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 mb-6 sm:mb-8">
        {PRICING_PLANS.map(plan => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            onTouchEnd={(e) => { e.preventDefault(); setSelectedPlan(plan.id); }}
            className={`relative p-4 sm:p-6 rounded-[var(--radius)] border cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? 'bg-[var(--accent-dim)] border-[var(--accent)]'
                : 'bg-[var(--surface)] border-[var(--border)] hover:border-[rgba(212,168,83,0.3)]'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent)] to-[#c49a3e] text-[var(--bg)] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Mais Popular
              </div>
            )}
            <div className="flex justify-between items-center pr-8 sm:pr-10">
              <div>
                <h3 className="text-base sm:text-xl font-bold mb-0.5 sm:mb-1">{plan.name}</h3>
                {plan.savings && <span className="text-[var(--success)] text-xs sm:text-sm font-medium">{plan.savings}</span>}
              </div>
              <div className="text-right">
                <div className="font-display text-lg sm:text-2xl font-semibold text-[var(--accent)]">{plan.price}</div>
                <div className="text-[var(--text-muted)] text-xs sm:text-sm">{plan.period}</div>
              </div>
            </div>
            <div className={`absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              selectedPlan === plan.id ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--text-muted)]'
            }`}>
              {selectedPlan === plan.id && <div className="w-2 h-2 rounded-full bg-[var(--bg)]" />}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => handleSubscribe(selectedPlan)}
        onTouchEnd={(e) => { e.preventDefault(); handleSubscribe(selectedPlan); }}
        disabled={isSubscribing}
        className={`cta-gold w-full py-4 sm:py-5 text-base sm:text-xl mb-3 sm:mb-4 ${isSubscribing ? 'opacity-50 cursor-not-allowed !transform-none !shadow-none' : ''}`}
      >
        {isSubscribing ? 'Processando...' : 'Assinar Agora'}
      </button>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
        <IconShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--success)] shrink-0" />
        <div>
          <h4 className="font-bold text-sm sm:text-base mb-1">Garantia de 7 Dias</h4>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
            Se você não sentir que economizou tempo e encontrou filmes melhores na primeira semana, devolvemos 100% do seu dinheiro. Sem perguntas.
          </p>
        </div>
      </div>

      <div className="urgency-bar mt-5">
        <span className="urgency-dot" />
        Oferta de lançamento — <strong>{urgencySlots} {urgencySlots === 1 ? 'vaga' : 'vagas'}</strong> restantes com esse preço
      </div>

      <div className="mt-4 sm:mt-6 flex justify-center items-center gap-2 text-[var(--text-muted)] text-xs sm:text-sm">
        <IconLock className="w-3 h-3 sm:w-4 sm:h-4" /> Pagamento 100% Seguro via Stripe
      </div>
    </div>
  );
}
