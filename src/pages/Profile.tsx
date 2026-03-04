import { ArrowLeft, Settings, Star, Smile, AlertOctagon, BadgeCheck, Stethoscope, Wallet, HelpCircle, Shield, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

export default function Profile() {
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    toast.info(`正在打开${action}...`);
  };

  const handleLogout = () => {
    toast.success("已退出登录");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-white shadow-xl overflow-x-hidden pb-20">
      {/* Header */}
      <div className="flex items-center bg-white p-4 sticky top-0 z-10 border-b border-slate-100 justify-between">
        <div
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </div>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          个人中心
        </h2>
        <div className="flex w-10 items-center justify-end">
          <button 
            onClick={() => handleAction("设置")}
            className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-transparent text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div className="flex p-4 flex-col gap-4">
          <div className="flex w-full items-center gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 border-2 border-blue-600/20"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1594824436998-d40d59f12282?auto=format&fit=crop&q=80&w=200")',
              }}
            ></div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2">
                <p className="text-slate-900 text-xl font-bold">张美玲</p>
                <span className="bg-blue-600/10 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  已实名
                </span>
              </div>
              <p className="text-slate-500 text-sm">高级护理员 | 从业5年 | 擅长术后康复</p>
            </div>
            <button 
              onClick={() => handleAction("编辑资料")}
              className="flex items-center justify-center rounded-lg h-9 px-3 bg-blue-600 text-white text-xs font-bold transition-colors hover:bg-blue-600/90 active:scale-95"
            >
              编辑
            </button>
          </div>
        </div>

        {/* Performance Quick Stats */}
        <div className="flex gap-3 p-4 pt-0">
          <div className="flex flex-1 flex-col gap-1 rounded-xl p-4 bg-blue-600/5 border border-blue-600/10">
            <p className="text-slate-500 text-xs font-medium">服务评分</p>
            <div className="flex items-end gap-1">
              <p className="text-slate-900 text-2xl font-bold leading-none">4.9</p>
              <Star className="text-blue-600 w-4 h-4 fill-current pb-0.5" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1 rounded-xl p-4 bg-blue-600/5 border border-blue-600/10">
            <p className="text-slate-500 text-xs font-medium">累计订单</p>
            <p className="text-slate-900 text-2xl font-bold leading-none">1,284</p>
          </div>
        </div>

        {/* Performance Dashboard (Charts) */}
        <div className="px-4 py-2">
          <div className="bg-white rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-slate-900 font-bold">服务时长统计</h3>
              <div className="flex bg-slate-100 rounded-lg p-1 shadow-sm">
                <button className="px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded-md">周</button>
                <button 
                  onClick={() => toast.info("切换到月视图")}
                  className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  月
                </button>
              </div>
            </div>

            {/* Simple Bar Chart Visualization */}
            <div className="flex items-end justify-between h-32 gap-2 mb-2 px-2">
              <div className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full bg-blue-600/20 rounded-t-sm h-[40%] hover:bg-blue-600/40 transition-colors cursor-pointer" title="4.5h"></div>
                <span className="text-[10px] text-slate-400">一</span>
              </div>
              <div className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full bg-blue-600/20 rounded-t-sm h-[60%] hover:bg-blue-600/40 transition-colors cursor-pointer" title="6.0h"></div>
                <span className="text-[10px] text-slate-400">二</span>
              </div>
              <div className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full bg-blue-600/40 rounded-t-sm h-[85%] hover:bg-blue-600/60 transition-colors cursor-pointer" title="8.5h"></div>
                <span className="text-[10px] text-slate-400">三</span>
              </div>
              <div className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full bg-blue-600/20 rounded-t-sm h-[55%] hover:bg-blue-600/40 transition-colors cursor-pointer" title="5.5h"></div>
                <span className="text-[10px] text-slate-400">四</span>
              </div>
              <div className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full bg-blue-600 rounded-t-sm h-[95%] hover:bg-blue-700 transition-colors cursor-pointer" title="9.5h"></div>
                <span className="text-[10px] text-slate-900 font-bold">五</span>
              </div>
              <div className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full bg-blue-600/20 rounded-t-sm h-[30%] hover:bg-blue-600/40 transition-colors cursor-pointer" title="3.0h"></div>
                <span className="text-[10px] text-slate-400">六</span>
              </div>
              <div className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full bg-blue-600/20 rounded-t-sm h-[20%] hover:bg-blue-600/40 transition-colors cursor-pointer" title="2.0h"></div>
                <span className="text-[10px] text-slate-400">日</span>
              </div>
            </div>

            <div className="flex justify-around border-t border-slate-200 pt-4 mt-2">
              <div className="text-center">
                <p className="text-slate-400 text-[10px] uppercase">本周总计</p>
                <p className="text-slate-900 font-bold">42.5h</p>
              </div>
              <div className="text-center">
                <p className="text-slate-400 text-[10px] uppercase">环比增长</p>
                <p className="text-green-500 font-bold">+12%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Review Panel */}
        <div className="px-4 py-4">
          <h3 className="text-slate-900 font-bold mb-3">评价分析</h3>
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => handleAction("好评详情")}
              className="bg-white border border-slate-100 p-4 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Smile className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-900 text-lg font-bold leading-none">98%</p>
                <p className="text-slate-500 text-[10px] mt-1">好评率</p>
              </div>
            </div>
            <div 
              onClick={() => handleAction("差评详情")}
              className="bg-white border border-slate-100 p-4 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="size-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-900 text-lg font-bold leading-none">0</p>
                <p className="text-slate-500 text-[10px] mt-1">差评数</p>
              </div>
            </div>
          </div>
        </div>

        {/* Training & Certificates */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-900 font-bold">技能培训与证书</h3>
            <button 
              onClick={() => handleAction("上传资料")}
              className="text-blue-600 text-xs font-bold hover:underline"
            >
              上传资料
            </button>
          </div>
          <div className="space-y-3">
            <div 
              onClick={() => handleAction("证书详情")}
              className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="size-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900 text-sm font-bold">高级护理职业资格证</p>
                <p className="text-green-500 text-xs">已核验 · 有效期至 2026-12</p>
              </div>
              <ChevronRight className="text-slate-300 w-5 h-5" />
            </div>
            <div 
              onClick={() => handleAction("培训详情")}
              className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="size-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900 text-sm font-bold">急救技能 (CPR) 培训</p>
                <p className="text-slate-500 text-xs">培训日期: 2024-05-20</p>
              </div>
              <ChevronRight className="text-slate-300 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Action List */}
        <div className="px-4 py-6 space-y-1">
          <div 
            onClick={() => handleAction("我的收入")}
            className="flex items-center justify-between py-3 border-b border-slate-50 cursor-pointer hover:bg-slate-50 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <Wallet className="text-blue-600 w-5 h-5" />
              <span className="text-sm font-medium">我的收入</span>
            </div>
            <ChevronRight className="text-slate-300 w-5 h-5" />
          </div>
          <div 
            onClick={() => handleAction("客服与支持")}
            className="flex items-center justify-between py-3 border-b border-slate-50 cursor-pointer hover:bg-slate-50 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <HelpCircle className="text-blue-600 w-5 h-5" />
              <span className="text-sm font-medium">客服与支持</span>
            </div>
            <ChevronRight className="text-slate-300 w-5 h-5" />
          </div>
          <div 
            onClick={() => handleAction("平台规则")}
            className="flex items-center justify-between py-3 cursor-pointer hover:bg-slate-50 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3 text-slate-700">
              <Shield className="text-blue-600 w-5 h-5" />
              <span className="text-sm font-medium">平台规则</span>
            </div>
            <ChevronRight className="text-slate-300 w-5 h-5" />
          </div>
        </div>

        {/* Logout */}
        <div className="px-4 pb-10">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full py-3 rounded-xl border border-red-200 text-red-500 font-bold text-sm bg-red-50/50 hover:bg-red-50 transition-colors active:scale-[0.98]"
          >
            退出登录
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
