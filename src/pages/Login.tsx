import { useState, useEffect } from "react";
import { ArrowLeft, Smartphone, ShieldCheck, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleGetCode = () => {
    if (!phone || phone.length !== 11) {
      toast.error("请输入正确的11位手机号");
      return;
    }
    setCountdown(60);
    toast.success("验证码已发送，请注意查收");
    // Auto fill code for demo
    setTimeout(() => setCode("123456"), 1500);
  };

  const handleLogin = () => {
    if (!phone || phone.length !== 11) {
      toast.error("请输入正确的11位手机号");
      return;
    }
    if (!code || code.length !== 6) {
      toast.error("请输入6位验证码");
      return;
    }
    if (!agreed) {
      toast.error("请阅读并同意相关协议");
      return;
    }
    
    toast.success("登录成功");
    navigate("/");
  };

  const handleWechatLogin = () => {
    if (!agreed) {
      toast.error("请阅读并同意相关协议");
      return;
    }
    toast.success("微信授权成功");
    navigate("/");
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-white overflow-x-hidden max-w-md mx-auto">
      {/* Header Section */}
      <div className="flex items-center bg-white p-4 pb-2 justify-between">
        <div 
          className="text-slate-900 flex size-12 shrink-0 items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-6 h-6" />
        </div>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          登录/注册
        </h2>
      </div>

      <div className="flex flex-col flex-1 px-6">
        {/* Hero Title */}
        <div className="pt-10 pb-8">
          <h1 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight">
            欢迎回来
          </h1>
          <p className="text-slate-500 text-base font-normal leading-normal pt-2">
            护士/护理人员工作台
          </p>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-medium">手机号码</label>
            <div className="relative flex items-center">
              <Smartphone className="absolute left-4 text-slate-400 w-5 h-5" />
              <input
                className="form-input flex w-full rounded-xl text-slate-900 border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 h-14 pl-12 pr-4 text-base font-normal outline-none transition-all"
                placeholder="请输入您的11位手机号"
                type="tel"
                maxLength={11}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-medium">验证码</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <ShieldCheck className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                <input
                  className="form-input flex w-full rounded-xl text-slate-900 border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 h-14 pl-12 pr-4 text-base font-normal outline-none transition-all"
                  placeholder="短信验证码"
                  type="number"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.slice(0, 6))}
                />
              </div>
              <button 
                onClick={handleGetCode}
                disabled={countdown > 0}
                className={`flex min-w-[120px] cursor-pointer items-center justify-center rounded-xl h-14 px-4 text-sm font-bold transition-colors ${
                  countdown > 0 
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                    : "bg-blue-600/10 text-blue-600 hover:bg-blue-600/20"
                }`}
              >
                {countdown > 0 ? `${countdown}s 后重新获取` : "获取验证码"}
              </button>
            </div>
          </div>

          {/* Main Login Button */}
          <button
            onClick={handleLogin}
            className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-xl h-14 px-5 bg-blue-600 text-white text-base font-bold shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-transform"
          >
            <span>立即登录</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-6">
            <div className="h-[1px] flex-1 bg-slate-200"></div>
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">其他登录方式</span>
            <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>

          {/* WeChat Login Button */}
          <button 
            onClick={handleWechatLogin}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl h-14 px-5 bg-[#07C160] text-white text-base font-bold shadow-md shadow-green-500/10 active:scale-[0.98] transition-transform"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span>微信一键登录</span>
          </button>
        </div>

        {/* Policy Agreement */}
        <div className="mt-8 flex items-start gap-3">
          <input
            className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
            id="agreement"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label className="text-sm text-slate-500 leading-relaxed" htmlFor="agreement">
            我已阅读并同意 <a className="text-blue-600 font-medium hover:underline" href="#" onClick={(e) => { e.preventDefault(); toast.info("查看用户服务协议"); }}>《用户服务协议》</a>、
            <a className="text-blue-600 font-medium hover:underline" href="#" onClick={(e) => { e.preventDefault(); toast.info("查看隐私保护政策"); }}>《隐私保护政策》</a> 以及{" "}
            <a className="text-blue-600 font-medium hover:underline" href="#" onClick={(e) => { e.preventDefault(); toast.info("查看医疗从业人员行为守则"); }}>《医疗从业人员行为守则》</a>
          </label>
        </div>
      </div>

      {/* Footer Design Element */}
      <div className="mt-auto pb-10 flex justify-center opacity-20 grayscale pointer-events-none">
        <div className="relative w-24 h-24 rounded-full bg-blue-600/20 flex items-center justify-center">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
        </div>
      </div>
    </div>
  );
}
