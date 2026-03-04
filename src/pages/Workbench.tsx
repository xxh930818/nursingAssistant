import { useState } from "react";
import { User, Bell, AlertCircle, Timer, CheckCircle, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

export default function Workbench() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [punchedIn, setPunchedIn] = useState(false);
  const [activeDate, setActiveDate] = useState(24);

  const tabs = [
    { id: "pending", label: "待接收" },
    { id: "serving", label: "服务中" },
    { id: "completed", label: "已完成" },
  ];

  const dates = [
    { day: "周二", date: 24 },
    { day: "周三", date: 25 },
    { day: "周四", date: 26 },
    { day: "周五", date: 27 },
    { day: "周六", date: 28 },
  ];

  const handlePunchIn = () => {
    if (punchedIn) {
      toast.info("您已经签到过了");
      return;
    }
    setPunchedIn(true);
    toast.success("晚班签到成功！");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-white shadow-xl overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center bg-white p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-100">
        <div 
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          工作台
        </h2>
        <div className="flex w-10 items-center justify-end">
          <button 
            onClick={() => toast.info("暂无新通知")}
            className="flex size-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white">
        <div className="flex border-b border-slate-100 px-4 justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-4 flex-1 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <p className="text-sm font-bold">{tab.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Training Banner */}
        <div className="p-4">
          <div 
            className="relative overflow-hidden rounded-xl h-44 bg-slate-200 cursor-pointer group"
            onClick={() => toast.info("正在打开培训视频...")}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
            <img
              alt="Training banner"
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
            />
            <div className="absolute bottom-0 left-0 p-4 z-20">
              <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2">
                培训计划
              </span>
              <p className="text-white text-xl font-bold leading-tight">
                护理技能在线培训：<br />新入职护士必看手册
              </p>
            </div>
          </div>
        </div>

        {/* Dispatch Reminder Card */}
        {activeTab === "pending" && (
          <div className="px-4 pb-4">
            <div className="flex flex-col items-stretch justify-start rounded-xl shadow-sm border border-slate-100 bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="text-blue-600 w-5 h-5" />
                <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">待办提醒</p>
              </div>
              <p className="text-slate-900 text-lg font-bold leading-tight mb-1">今日派单提醒</p>
              <div className="flex items-center justify-between gap-4">
                <p className="text-slate-500 text-sm">您有 1 个待接收的居家养老服务订单，请尽快处理。</p>
                <Link
                  to="/order/1"
                  className="shrink-0 flex items-center justify-center rounded-lg h-9 px-4 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  立即查看
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Punch-in Widget (A/N Shifts) */}
        <div className="px-4 pb-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Timer className="text-blue-600 w-5 h-5" />
                <h3 className="font-bold text-slate-800">考勤打卡</h3>
              </div>
              <span className="text-xs bg-white px-2 py-1 rounded-full text-slate-500 shadow-sm">
                2023.10.24
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-[10px] text-slate-400 font-bold mb-1">白班 (A)</p>
                <p className="text-sm font-bold text-slate-700">08:00 - 20:00</p>
                <div className="mt-2 flex items-center gap-1 text-green-500">
                  <CheckCircle className="w-3 h-3" />
                  <span className="text-[10px] font-bold">已签到 07:52</span>
                </div>
              </div>
              <div className={`bg-white p-3 rounded-lg shadow-sm border-2 ${punchedIn ? 'border-green-500/20' : 'border-blue-600/20'}`}>
                <p className="text-[10px] text-slate-400 font-bold mb-1">晚班 (N)</p>
                <p className="text-sm font-bold text-slate-700">20:00 - 08:00</p>
                {punchedIn ? (
                  <div className="mt-2 flex items-center gap-1 text-green-500">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-[10px] font-bold">已签到 19:55</span>
                  </div>
                ) : (
                  <button 
                    onClick={handlePunchIn}
                    className="mt-2 w-full py-1 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded text-[10px] font-bold"
                  >
                    待签到
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar/Schedule View */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800">日程安排</h3>
            <button 
              onClick={() => toast.info("打开全月日历")}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              查看全月
            </button>
          </div>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {dates.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveDate(item.date)}
                className={`flex flex-col items-center justify-center min-w-[50px] h-16 rounded-xl transition-colors ${
                  activeDate === item.date
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white border border-slate-100 hover:bg-slate-50"
                }`}
              >
                <p className={`text-[10px] ${activeDate === item.date ? "opacity-80" : "text-slate-400"}`}>{item.day}</p>
                <p className={`text-lg font-bold ${activeDate !== item.date && "text-slate-700"}`}>
                  {item.date}
                </p>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {activeDate === 24 ? (
              <>
                <Link
                  to="/order/1"
                  className="flex items-center gap-4 p-3 bg-white rounded-xl border-l-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-center shrink-0">
                    <p className="text-sm font-bold text-slate-800">09:30</p>
                    <p className="text-[10px] text-slate-400">11:00</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">张大爷 - 康复护理</p>
                    <p className="text-[10px] text-slate-500">朝阳区幸福路22号</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </Link>

                <div 
                  onClick={() => toast.info("该服务尚未开始")}
                  className="flex items-center gap-4 p-3 bg-white rounded-xl border-l-4 border-slate-200 shadow-sm opacity-60 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="text-center shrink-0">
                    <p className="text-sm font-bold text-slate-800">14:00</p>
                    <p className="text-[10px] text-slate-400">15:30</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">王阿姨 - 基础生命体征监测</p>
                    <p className="text-[10px] text-slate-500">海淀区学院路15号</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                <Timer className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-sm">这一天没有安排服务</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
