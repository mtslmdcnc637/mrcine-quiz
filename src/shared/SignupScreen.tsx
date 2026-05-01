import { useState } from 'preact/hooks';
import { supabase } from '../lib/supabase';
import { toast } from '../lib/toast';

function IconLock(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>; }
function IconArrowRight(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>; }

interface SignupScreenProps {
  email: string;
  name?: string;
  onSuccess: () => void;
  onBack?: () => void;
}

export default function SignupScreen({ email, name, onSuccess, onBack }: SignupScreenProps) {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    if (!email) { toast.error('E-mail não encontrado. Refaça o quiz.'); return; }
    if (password.length < 6) { toast.error('A senha deve ter pelo menos 6 caracteres.'); return; }
    if (!supabase) {
      toast.error('Serviço indisponível. Tente novamente em instantes.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username: name || 'Usuário' } },
      });
      if (signUpError) throw signUpError;
      if (signUpData.user) {
        await supabase.from('profiles').upsert(
          { id: signUpData.user.id, username: name || 'Usuário', xp: 0, level: 1 },
          { onConflict: 'id', ignoreDuplicates: true },
        );
      }
      await new Promise(resolve => setTimeout(resolve, 1500));
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        toast.success('Conta criada com sucesso!');
        onSuccess();
      } else {
        try {
          await supabase.auth.signInWithPassword({ email, password });
          await new Promise(resolve => setTimeout(resolve, 1000));
          const { data: { session: retrySession } } = await supabase.auth.getSession();
          if (retrySession) { toast.success('Login realizado!'); onSuccess(); }
          else { toast.error('Não foi possível fazer login. Tente novamente.'); }
        } catch {
          toast.error('Este e-mail já está cadastrado com outra senha. Faça login manualmente.');
          window.location.href = 'https://mrcine.pro/login?redirect=/pricing';
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao criar conta';
      toast.error(message);
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="animate-fade-in-up flex-1 flex flex-col items-center justify-center text-center pb-6 sm:pb-10">
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--accent)] to-[#c49a3e] flex items-center justify-center text-3xl sm:text-4xl shadow-[0_0_40px_var(--accent-glow)] mb-4 sm:mb-6">
        <IconLock className="w-7 h-7 sm:w-9 sm:h-9 text-[var(--bg)]" />
      </div>

      <h2 className="font-display text-xl sm:text-3xl font-light mb-2">Crie sua conta</h2>
      <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-6 sm:mb-8 max-w-md">
        Quase lá! Crie uma senha para acessar seu perfil cinematográfico completo, dicas diárias de filmes e muito mais.
      </p>

      <div className="w-full max-w-sm space-y-4 text-left">
        <div>
          <label className="text-xs sm:text-sm text-[var(--text-muted)] mb-1 block font-mono tracking-wider uppercase">E-mail</label>
          <input type="email" value={email} readOnly className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] py-3 sm:py-4 px-4 sm:px-5 text-[var(--text)] text-base sm:text-lg opacity-60 cursor-not-allowed" autocomplete="email" aria-label="E-mail" />
        </div>
        <div>
          <label className="text-xs sm:text-sm text-[var(--text-muted)] mb-1 block font-mono tracking-wider uppercase">Crie sua senha</label>
          <input
            type="password" placeholder="Mínimo 6 caracteres" value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] py-3 sm:py-4 px-4 sm:px-5 text-[var(--text)] text-base sm:text-lg placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
            autoFocus minlength={6}
            autocomplete="new-password"
            aria-label="Crie sua senha"
            onKeyDown={(e) => { if (e.key === 'Enter' && password.length >= 6) handleSignUp(); }}
          />
        </div>
        <button
          onClick={handleSignUp}
          disabled={isSubmitting || password.length < 6}
          className={`cta-gold w-full py-3.5 sm:py-4 text-base sm:text-lg ${isSubmitting || password.length < 6 ? 'opacity-50 cursor-not-allowed !transform-none !shadow-none' : ''}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Criando conta...
            </>
          ) : (
            <>Criar Conta e Continuar <IconArrowRight className="w-5 h-5" /></>
          )}
        </button>
      </div>
      <p className="mt-6 sm:mt-8 text-[var(--text-muted)] text-xs max-w-xs">
        Seus dados estão seguros conosco. Criamos essa conta para que você possa acessar seu perfil a qualquer momento.
      </p>
      {onBack && (
        <button
          onClick={onBack}
          className="mt-4 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          aria-label="Voltar para resultados"
        >
          ← Voltar aos resultados
        </button>
      )}
    </div>
  );
}
